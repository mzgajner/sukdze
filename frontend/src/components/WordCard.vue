<script lang="ts" setup>
import { Card } from '#/types'

defineProps<{ card: Card }>()
defineEmits<{ edit: [] }>()
</script>

<template>
  <div class="flex border-b border-(--ui-border)">
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
      @click="$emit('edit')"
    />
  </div>
</template>
