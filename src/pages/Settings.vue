<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import useSukdzeData from '../use-sukdze-data'

const file = ref('')
const fileInput = useTemplateRef('fileInput')
const sukdzeData = useSukdzeData()

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
    </div>
  </div>
</template>
