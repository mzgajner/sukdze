<script lang="ts" setup>
import Navigation from '#/components/Navigation.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <UApp>
    <main class="flex flex-col items-stretch justify-center h-screen">
      <div
        v-if="!route.meta.hideNavigation"
        class="flex p-2 sm:px-4 bg-elevated"
      >
        <div class="flex-1 pr-2" id="top-nav" />
        <Navigation />
      </div>
      <div class="p-4 flex-1 overflow-y-scroll">
        <RouterView />
      </div>
    </main>
  </UApp>
</template>

<style>
@import 'tailwindcss';
@import '@nuxt/ui';
</style>
