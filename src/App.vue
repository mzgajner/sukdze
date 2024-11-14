<script setup lang="ts">
import { useStorage } from '@vueuse/core'

import Header from './Header.vue'
import Card from './Card.vue'

const appData = useStorage('sukdzeData', {
  cards: {
    'db7773c1-bf41-4f7d-b285-dbf35688c5ec': {
      original: 'bla bla bla',
      translation: 'ha ha ha',
    },
  },
})
</script>

<template>
  <main class="flex flex-col items-stretch justify-center h-full">
    <Header />
    <div class="p-4 flex-1 shadow-inner">
      <Card
        v-for="(card, cardId) in appData.cards"
        :card="card"
        class="w-full"
      />
    </div>
    <Footer />
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

body {
  margin: 0;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    avenir next,
    avenir,
    segoe ui,
    helvetica neue,
    helvetica,
    Cantarell,
    Ubuntu,
    roboto,
    noto,
    arial,
    sans-serif;
  position: relative;
}
</style>

<!-- <style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style> -->
