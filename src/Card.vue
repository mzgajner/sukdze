<script lang="ts" setup>
import Button from './Button.vue'
import { nextTick, useTemplateRef, watch } from 'vue'

const { editing } = defineProps<{
  editing: boolean
  card: {
    original: string
    translation: string
  }
}>()

defineExpose({ setFocusToOriginal })

const emit = defineEmits<{ startEditing: []; stopEditing: []; delete: [] }>()

const originalInputElement = useTemplateRef('original')
const translationInputElement = useTemplateRef('translation')

function setFocusToTranslation() {
  translationInputElement.value?.focus()
}
function setFocusToOriginal() {
  originalInputElement.value?.focus()
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
  <div class="bg-gray-200 p-2 rounded-md">
    <div v-if="editing" class="flex items-end">
      <div class="flex-1 pr-2 flex gap-2 flex-col">
        <input
          lang="sl-SI"
          ref="original"
          v-model="card.original"
          class="rounded px-1"
          placeholder="Original"
          @keydown.enter="setFocusToTranslation"
        />
        <input
          lang="ko-KR"
          ref="translation"
          v-model="card.translation"
          class="rounded px-1"
          placeholder="Translation"
          @keydown.enter="emit('stopEditing')"
        />
      </div>
      <div class="flex flex-col gap-2">
        <Button
          icon="trashCan"
          label="Delete"
          size="sm"
          variant="danger"
          @click="$emit('delete')"
        />
        <Button
          icon="floppyDisk"
          label="Save"
          size="sm"
          @click="$emit('stopEditing')"
        />
      </div>
    </div>
    <div v-else class="flex items-end">
      <div class="flex-1 pl-1">
        {{ card.original }} - {{ card.translation }}
      </div>
      <Button
        icon="penToSquare"
        label="Edit"
        size="sm"
        @click="$emit('startEditing')"
      />
    </div>
  </div>
</template>
