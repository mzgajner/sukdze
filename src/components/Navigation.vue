<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
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
    v-if="!route.meta.hideNav"
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
