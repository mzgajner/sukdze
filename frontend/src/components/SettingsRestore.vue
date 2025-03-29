<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import useSukdzeData from '#/composables/use-sukdze-data'
import {
  createCard,
  createTag,
  getUserId,
  Tag,
  Card,
  fetchTags,
} from '#/api-client'
import {} from '#/types'

const { refresh } = useSukdzeData()

const file = ref('')
const fileInput = useTemplateRef('fileInput')

function importFromFile() {
  const files = fileInput.value?.inputRef?.files
  const file = files?.length ? files[0] : null

  if (!file) return

  if (!confirm('Are you sure you want to proceed with the import?')) return

  const reader = new FileReader()
  reader.onload = async function () {
    const data = JSON.parse(reader.result as string)

    for (let i = 0; i < data.tags.length; i++) {
      await createTag({ label: data.tags[i].label, author: getUserId() })
    }

    const newTags = await fetchTags()

    const getNewTagId = (oldId: string) => {
      const oldTag = data.tags.find((tag: Tag) => tag.id === oldId)
      const newTag = newTags.find((tag) => (tag.label = oldTag.label))
      return newTag?.id
    }

    for (let i = 0; i < data.cards.length; i++) {
      await createCard({
        originalText: data.cards[i].originalText,
        translatedText: data.cards[i].translatedText,
        author: getUserId(),
        tags: data.cards[i].tags
          .map(getNewTagId)
          .filter((tagId: string) => tagId !== undefined),
      })
    }

    await refresh()
  }
  reader.readAsText(file)
}
</script>

<template>
  <div class="flex flex-col items-start">
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
      color="error"
      :disabled="!file"
      :variant="!file ? 'outline' : 'solid'"
      @click="importFromFile"
    />
  </div>
</template>
