<script lang="ts" setup>
import { ref } from 'vue'
import useSukdzeData from '#/composables/use-sukdze-data'

const sukdzeData = useSukdzeData()
const newTagInputValue = ref('')

function saveTag() {
  if (!sukdzeData.value.tags) sukdzeData.value.tags = []

  const newTag = newTagInputValue.value.trim()
  if (sukdzeData.value.tags.includes(newTag)) {
    alert(`Tag “${newTag}” already exists.`)
  } else {
    sukdzeData.value.tags.push(newTag)
    newTagInputValue.value = ''
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
      v-model="newTagInputValue"
      @keydown.enter="saveTag"
    />
    <UButton @click="saveTag" label="Save" />
  </div>
</template>
