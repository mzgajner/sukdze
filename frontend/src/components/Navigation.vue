<script lang="ts" setup>
const items = [
  {
    label: 'Edit',
    icon: 'i-ant-design:edit-twotone',
    to: '/edit',
  },
  {
    label: 'Study',
    icon: 'i-ant-design:thunderbolt-twotone',
    to: '/study',
  },
  {
    label: 'Settings',
    icon: 'i-ant-design:setting-twotone',
    to: '/settings',
  },
]
</script>

<template>
  <UDropdownMenu :items="items" variant="link">
    <UButton
      icon="i-ant-design:menu-outlined"
      color="primary"
      variant="ghost"
      size="lg"
    />
  </UDropdownMenu>
</template>
