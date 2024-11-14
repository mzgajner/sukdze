<script lang="ts" setup>
import { computed } from 'vue'
import Icon, { type SupportedIconName } from './Icon.vue'

type Variant = 'primary' | 'danger'
type Size = 'sm' | 'lg'

const {
  size = 'lg',
  variant = 'primary',
  iconAfter = false,
  disabled = false,
} = defineProps<{
  icon?: SupportedIconName
  label: string
  size?: Size
  variant?: Variant
  iconAfter?: boolean
  disabled?: boolean
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

  const disabledClasses = disabled
    ? ['cursor-not-allowed', 'pointer-events-none', 'opacity-50']
    : []

  return [...variantClasses, ...sizeClasses, ...disabledClasses]
})
</script>
<template>
  <button class="text-white rounded whitespace-nowrap" :class="dynamicClasses">
    <Icon v-if="icon && !iconAfter" :name="icon" class="mr-1" />
    {{ label }}
    <Icon v-if="icon && iconAfter" :name="icon" class="ml-1" />
  </button>
</template>
