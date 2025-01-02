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
  <UNavigationMenu
    :items="items"
    variant="link"
    :ui="{
      link: 'text-base justify-center',
      linkLeadingIcon: 'size-6',
      list: 'justify-between',
      root: 'w-full [&>div]:min-w-full px-2 bg-[var(--ui-bg-elevated)]',
      item: 'w-1/3',
    }"
  />
</template>
