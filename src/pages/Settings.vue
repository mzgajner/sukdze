<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import useSukdzeData from '../use-sukdze-data'

const file = ref('')
const fileInput = useTemplateRef('fileInput')
const sukdzeData = useSukdzeData()
const newTagName = ref('')

function download() {
  const file = new Blob([JSON.stringify(sukdzeData.value)], {
    type: 'application/json',
  })
  const a = document.createElement('a'),
    url = URL.createObjectURL(file)
  a.href = url
  a.download = 'sukdze-export.json'
  document.body.appendChild(a)
  a.click()
  setTimeout(function () {
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, 0)
}

function importFromFile() {
  const files = fileInput.value?.inputRef?.files
  const file = files?.length ? files[0] : null

  if (!file) return

  if (
    !confirm('Restoring a backup will overwrite existing data, are you sure?')
  )
    return

  const reader = new FileReader()
  reader.onload = function () {
    const data = JSON.parse(reader.result as string)
    sukdzeData.value = data
  }
  reader.readAsText(file)
}

function saveTag() {
  if (sukdzeData.value.tags.includes(newTagName.value)) {
    alert('Tag already exists')
  } else {
    sukdzeData.value.tags.push(newTagName.value)
    newTagName.value = ''
  }
}

function deleteTag(tag: string) {
  const deleteIndex = sukdzeData.value.tags.indexOf(tag)
  sukdzeData.value.tags.splice(deleteIndex, 1)

  Object.values(sukdzeData.value.cards).forEach((card) => {
    if (!card.tags) return

    const cardDeleteIndex = card.tags?.indexOf(tag)
    if (cardDeleteIndex !== undefined && cardDeleteIndex > -1)
      card.tags.splice(cardDeleteIndex, 1)
  })
}
</script>

<template>
  <div class="flex flex-col select-none">
    <div class="font-semibold text-lg mb-2">Backup</div>
    <div class="flex flex-col items-start">
      <div class="mb-2">
        Create a backup of all your stored data and download it.
      </div>
      <UButton
        icon="i-ant-design:download-outlined"
        size="xl"
        label="Create a backup"
        @click="download"
      />

      <USeparator class="mt-8 mb-6" />

      <div class="font-semibold text-lg mb-2">Restore</div>
      <div class="mb-2">Restore data from a previously created backup.</div>
      <UInput
        ref="fileInput"
        class="mb-2"
        type="file"
        size="xl"
        v-model="file"
        icon="i-heroicons-folder"
      />
      <UButton
        icon="i-ant-design:upload-outlined"
        size="xl"
        label="Restore from backup"
        class="mb-2"
        color="error"
        :disabled="!file"
        :variant="!file ? 'outline' : 'solid'"
        @click="importFromFile"
      />

      <USeparator class="mt-8 mb-6" />

      <div class="font-semibold text-lg mb-2">Tags</div>

      <ul class="w-full">
        <li
          v-for="tag in sukdzeData.tags"
          class="flex items-center gap-1 h-8 w-full my-2"
        >
          <UIcon name="i-ant-design:tag-outlined" />
          <div class="flex-1">{{ tag }}</div>
          <UButton
            icon="i-ant-design:delete-twotone"
            color="error"
            variant="outline"
            @click="deleteTag(tag)"
          />
        </li>
      </ul>
      <div class="flex w-full mt-3">
        <UInput
          placeholder="Add a new tag"
          class="flex-1 mr-2"
          v-model="newTagName"
          @keydown.enter="saveTag"
        />
        <UButton @click="saveTag" label="Save" />
      </div>
    </div>
  </div>
</template>
