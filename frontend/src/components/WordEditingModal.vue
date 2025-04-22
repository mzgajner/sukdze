<script lang="ts" setup>
import { useTemplateRef, onMounted } from 'vue'

import useSukdzeData from '#/composables/use-sukdze-data'
import { Card } from '#/types'
import TagSelector from '#/components/TagSelector.vue'
import {
  deleteCard as apiDeleteCard,
  updateCard as apiUpdateCard,
} from '#/api-client'

let cardBackup: Card | null = null

const { card, mode } = defineProps<{ card: Card; mode: 'CREATE' | 'EDIT' }>()
const emit = defineEmits<{
  close: []
}>()

const { cards, tags } = useSukdzeData()

const originalInputElement = useTemplateRef('original')
const translationInputElement = useTemplateRef('translation')

function setFocusToTranslation() {
  translationInputElement.value?.inputRef?.focus()
}
function setFocusToOriginal() {
  originalInputElement.value?.inputRef?.focus()
}
onMounted(() => {
  setFocusToOriginal()
  cardBackup = JSON.parse(JSON.stringify(card))
})

async function saveCard() {
  await apiUpdateCard(card)
  emit('close')
}

async function deleteCard() {
  await apiDeleteCard(card.id)
  const deleteIndex = cards.value.indexOf(card)
  cards.value.splice(deleteIndex, 1)
  emit('close')
}

function resetCard() {
  card.originalText = cardBackup?.originalText ?? ''
  card.translatedText = cardBackup?.translatedText ?? ''
  card.tags = cardBackup?.tags ?? []
  emit('close')
}

async function cancelEditing() {
  if (mode === 'CREATE') await deleteCard()
  else resetCard()
}

async function maybeClose(newOpenState: boolean) {
  if (newOpenState === false) {
    await cancelEditing()
  }
}
</script>

<template>
  <UModal
    :title="mode === 'EDIT' ? 'Edit card' : 'Create new card'"
    description=""
    :transition="false"
    :open="true"
    @update:open="maybeClose"
  >
    <template #body>
      <div class="flex-1 flex gap-2 flex-col">
        <UInput
          lang="sl-SI"
          ref="original"
          v-model="card.originalText"
          placeholder="Original"
          @keydown.enter="setFocusToTranslation"
        />
        <UInput
          lang="ko-KR"
          ref="translation"
          v-model="card.translatedText"
          placeholder="Translation"
          @keydown.enter="saveCard"
        />
        <TagSelector v-model="card.tags" :tags="tags" />
      </div>
    </template>
    <template #footer>
      <UButton
        icon="i-ant-design:delete-twotone"
        label="Delete"
        variant="subtle"
        color="error"
        loading-auto
        @click="deleteCard"
      />
      <div class="flex-1"></div>
      <UButton
        label="Cancel"
        variant="ghost"
        color="neutral"
        loading-auto
        @click="cancelEditing"
      />
      <UButton
        icon="i-ant-design:save-twotone"
        label="Save"
        loading-auto
        @click="saveCard"
      />
    </template>
  </UModal>
</template>
