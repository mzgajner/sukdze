<script lang="ts" setup>
defineProps<{ title: string; description?: string }>()
</script>

<template>
  <div
    class="[&:not(:last-child)]:border-b border-default [&:not(:last-child)]:pb-8 [&:not(:last-child)]:mb-6"
  >
    <div class="font-semibold text-lg mb-2">{{ title }}</div>
    <div v-if="description" class="mb-2">{{ description }}</div>
    <slot />
  </div>
</template>
