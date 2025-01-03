<script lang="ts" setup>
import { nextTick, useTemplateRef, watch } from 'vue'
import { Card } from '#/types.ts'
import TagSelector from '#/components/TagSelector.vue'

const { editing, card } = defineProps<{
  editing: boolean
  card: Card
}>()

defineExpose({ setFocusToOriginal })
defineEmits<{ startEditing: []; stopEditing: []; delete: []; update: [Card] }>()

const originalInputElement = useTemplateRef('original')
const translationInputElement = useTemplateRef('translation')

function setFocusToTranslation() {
  translationInputElement.value?.inputRef?.focus()
}
function setFocusToOriginal() {
  originalInputElement.value?.inputRef?.focus()
}

watch(
  () => editing,
  async (newEditingValue) => {
    if (newEditingValue !== true) return
    await nextTick()
    setFocusToOriginal()
  },
  { immediate: true },
)
</script>

<template>
  <UCard v-if="editing">
    <div class="flex-1 flex gap-2 flex-col">
      <UInput
        lang="sl-SI"
        ref="original"
        v-model="card.original"
        placeholder="Original"
        @keydown.enter="setFocusToTranslation"
      />
      <UInput
        lang="ko-KR"
        ref="translation"
        v-model="card.translation"
        placeholder="Translation"
        @keydown.enter="$emit('stopEditing')"
      />
      <TagSelector v-model="card.tags" />
    </div>
    <template #footer>
      <div class="flex gap-2 justify-end">
        <UButton
          icon="i-ant-design:delete-twotone"
          label="Delete"
          variant="outline"
          color="error"
          class="rounded-lg"
          @click="$emit('delete')"
        />
        <UButton
          icon="i-ant-design:save-twotone"
          label="Save"
          @click="$emit('stopEditing')"
        />
      </div>
    </template>
  </UCard>
  <UCard v-else>
    <div class="flex">
      <div class="flex-1 place-self-center select-none">
        {{ card.original }} - {{ card.translation }}
      </div>
      <UButton
        icon="i-ant-design:edit-twotone"
        class="place-self-end"
        @click="$emit('startEditing')"
      />
    </div>
  </UCard>
</template>
