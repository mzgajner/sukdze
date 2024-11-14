<script setup lang="ts">
import { Ref, ref } from 'vue'
import { useStorage } from '@vueuse/core'

import Card from './Card.vue'
import Header from './Header.vue'

type AppData = {
  cards: Record<
    string,
    {
      original: string
      translation: string
    }
  >
}

const editingCard = ref<string | null>(null)
const appData: Ref<AppData> = useStorage(
  'sukdzeData',
  {
    cards: {
      'db7773c1-bf41-4f7d-b285-dbf35688c5ec': {
        original: 'bla bla bla',
        translation: 'ha ha ha',
      },
    },
  },
  undefined,
  { deep: true },
)

function addNewCard() {
  const newCardId = crypto.randomUUID()
  appData.value.cards[newCardId] = {
    original: '',
    translation: '',
  }
  editingCard.value = newCardId
  console.log(appData.value)
}

function deleteCard(cardId: string) {
  delete appData.value.cards[cardId]
}
</script>

<template>
  <main class="flex flex-col items-stretch justify-center h-full">
    <Header />
    <div class="p-4 flex-1 shadow-inner">
      <Card
        v-for="(card, cardId) in appData.cards"
        :card="card"
        :editing="editingCard === cardId"
        @start-editing="editingCard = cardId"
        @stop-editing="editingCard = null"
        @delete="deleteCard(cardId)"
        class="w-full mb-2"
      />
      <div
        class="text-lg text-gray-600 flex items-center pl-1 justify-center border py-1 border-gray-400 rounded"
        @click="addNewCard"
      >
        Add new card
      </div>
    </div>
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
