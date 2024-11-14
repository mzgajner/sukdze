<script lang="ts" setup>
import Button from './Button.vue'
import { nextTick, ref, useTemplateRef } from 'vue'

defineProps<{
  card: {
    original: string
    translation: string
  }
}>()

const editing = ref(false)
const originalInputElement = useTemplateRef('original')
const translationInputElement = useTemplateRef('translation')

async function startEditing() {
  editing.value = true
  await nextTick()
  originalInputElement.value?.focus()
}

function stopEditing() {
  editing.value = false
}

function moveFocusToTranslation() {
  translationInputElement.value?.focus()
}
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
          @keydown.enter="moveFocusToTranslation"
        />
        <input
          lang="ko-KR"
          ref="translation"
          v-model="card.translation"
          class="rounded px-1"
          placeholder="Translation"
          @keydown.enter="stopEditing"
        />
      </div>
      <div class="flex flex-col gap-2">
        <Button
          icon="trashCan"
          label="Delete"
          size="sm"
          variant="danger"
          @click="stopEditing"
        />
        <Button icon="floppyDisk" label="Save" size="sm" @click="stopEditing" />
      </div>
    </div>
    <div v-else class="flex items-end">
      <div class="flex-1 pl-1">
        {{ card.original }} - {{ card.translation }}
      </div>
      <Button icon="penToSquare" label="Edit" size="sm" @click="startEditing" />
    </div>
  </div>
</template>
