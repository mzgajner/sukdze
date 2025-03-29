<script lang="ts" setup>
import { nextTick, useTemplateRef, watch } from 'vue'
import TagSelector from '#/components/TagSelector.vue'
import { Card } from '#/types'
import { deleteCard, updateCard } from '#/api-client'
import useSukdzeData from '#/composables/use-sukdze-data'

let cardBackup: Card | null = null

const { cards, tags } = useSukdzeData()

const { editing, card } = defineProps<{
  editing: boolean
  card: Card
}>()

const emit = defineEmits<{
  open: []
  close: []
  delete: []
  update: [Card]
}>()

const originalInputElement = useTemplateRef('original')
const translationInputElement = useTemplateRef('translation')

function scrollParentToTop() {
  const cardElement = originalInputElement.value?.inputRef!.closest(
    '[data-card-container]',
  )
  const scrollParent = cardElement.closest('[data-scroll-container]')!
  const requiredDistance = cardElement.offsetTop - 60
  scrollParent.scroll({ top: requiredDistance })
}

function setFocusToTranslation() {
  translationInputElement.value?.inputRef?.focus()
}
function setFocusToOriginal() {
  originalInputElement.value?.inputRef?.focus()
  scrollParentToTop()
}
watch(
  () => editing,
  async (newEditingValue) => {
    if (newEditingValue === true) {
      await nextTick()
      setFocusToOriginal()
      cardBackup = JSON.parse(JSON.stringify(card))
    }
  },
  { immediate: true },
)

async function handleSaveCard() {
  await updateCard(card)
  emit('close')
}

async function handleDeleteCard() {
  await deleteCard(card.id)
  const deleteIndex = cards.value.indexOf(card)
  cards.value.splice(deleteIndex, 1)
  emit('close')
}

function handleCancelEditing() {
  card.originalText = cardBackup?.originalText ?? ''
  card.translatedText = cardBackup?.translatedText ?? ''
  card.tags = cardBackup?.tags ?? []
  emit('close')
}
</script>

<template>
  <UCard v-if="editing" data-card-container>
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
        @keydown.enter="handleSaveCard"
      />
      <TagSelector v-model="card.tags" :tags="tags" />
    </div>
    <template #footer>
      <div class="flex gap-2 justify-between">
        <UButton
          icon="i-ant-design:delete-twotone"
          label="Delete"
          variant="subtle"
          color="error"
          loading-auto
          @click="handleDeleteCard"
        />
        <div class="flex-1"></div>
        <UButton
          label="Cancel"
          variant="ghost"
          color="neutral"
          @click="handleCancelEditing"
        />
        <UButton
          icon="i-ant-design:save-twotone"
          label="Save"
          loading-auto
          @click="handleSaveCard"
        />
      </div>
    </template>
  </UCard>
  <div v-else class="flex border-b border-(--ui-border)">
    <div class="flex-1 place-self-center select-none">
      {{ card.originalText }}
      <UIcon
        name="i-ant-design:arrow-right-outlined"
        class="text-(--ui-text-dimmed) text-sm inline-block mb-1 mx-0.5"
      />
      {{ card.translatedText }}
    </div>
    <UButton
      variant="link"
      icon="i-ant-design:edit-twotone"
      class="place-self-end"
      @click="$emit('open')"
    />
  </div>
</template>
