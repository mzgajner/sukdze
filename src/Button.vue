<script lang="ts" setup>
import { computed } from 'vue'
import Icon, { type SupportedIconName } from './Icon.vue'

type Variant = 'primary' | 'danger'
type Size = 'sm' | 'lg'

const { size = 'lg', variant = 'primary' } = defineProps<{
  icon?: SupportedIconName
  label: string
  size?: Size
  variant?: Variant
}>()

const dynamicClasses = computed(() => {
  const variantClasses = {
    primary: ['bg-blue-500', 'hover:bg-blue-700'],
    success: ['bg-green-500', 'hover:bg-green-700'],
    danger: ['bg-red-500', 'hover:bg-red-700'],
  }[variant]

  const sizeClasses = {
    sm: ['py-0.5', 'px-1.5', 'text-sm'],
    lg: ['py-2', 'px-4', 'text-sm'],
  }[size]

  return [...variantClasses, ...sizeClasses]
})
</script>
<template>
  <button class="text-white rounded whitespace-nowrap" :class="dynamicClasses">
    <Icon v-if="icon" :name="icon" />
    {{ label }}
  </button>
</template>
