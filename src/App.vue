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
]
</script>

<template>
  <main class="flex flex-col items-stretch justify-center h-screen">
    <UNavigationMenu :items="items" class="justify-center" />

    <div class="p-4 flex-1 overflow-y-scroll">
      <RouterView />
    </div>
  </main>
</template>

<style>
@import 'tailwindcss';
@import '@nuxt/ui';

@theme {
  --color-green-50: #effdf5;
  --color-green-100: #d9fbe8;
  --color-green-200: #b3f5d1;
  --color-green-300: #75edae;
  --color-green-400: #00dc82;
  --color-green-500: #00c16a;
  --color-green-600: #00a155;
  --color-green-700: #007f45;
  --color-green-800: #016538;
  --color-green-900: #0a5331;
  --color-green-950: #052e16;
}

:root {
  --ui-radius: var(--radius-sm);
}
</style>
