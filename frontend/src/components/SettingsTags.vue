<script lang="ts" setup>
import { ref } from 'vue'
import useSukdzeData from '#/composables/use-sukdze-data'
import { createTag, deleteTag, getUserId } from '#/api-client'
import { Tag } from '#/types'

const { tags, cards } = useSukdzeData()
const newTagInputValue = ref('')

async function handleSaveTag() {
  const label = newTagInputValue.value.trim()
  if (tags.value.find((tag) => tag.label === label)) {
    alert(`Tag “${label}” already exists.`)
  } else {
    const newTag = await createTag({ label, author: getUserId() })
    tags.value.push(newTag)
    newTagInputValue.value = ''
  }
}

async function handleDeleteTag(tag: Tag) {
  await deleteTag(tag.id)
  const deleteIndex = tags.value.indexOf(tag)
  tags.value.splice(deleteIndex, 1)

  cards.value.forEach((card) => {
    const cardDeleteIndex = card.tags.indexOf(tag.id)
    if (cardDeleteIndex > -1) card.tags.splice(cardDeleteIndex, 1)
  })
}
</script>

<template>
  <ul class="w-full">
    <li v-for="tag in tags" class="flex items-center gap-1 h-8 w-full my-2">
      <UIcon name="i-ant-design:tag-outlined" />
      <div class="flex-1">{{ tag.label }}</div>
      <UButton
        icon="i-ant-design:delete-twotone"
        color="error"
        variant="outline"
        auto-loading
        @click="handleDeleteTag(tag)"
      />
    </li>
  </ul>
  <div class="flex w-full mt-3">
    <UInput
      placeholder="Add a new tag"
      class="flex-1 mr-2"
      v-model="newTagInputValue"
      @keydown.enter="handleSaveTag"
    />
    <UButton @click="handleSaveTag" label="Save" />
  </div>
</template>
