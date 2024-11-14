<script setup lang="ts">
import { Ref, ref } from 'vue'
import { useStorage } from '@vueuse/core'

import Card from './Card.vue'
import StudyMode from './StudyMode.vue'
import Button from './Button.vue'

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
        original: '숙제',
        translation: 'Domača naloga',
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

const studying = ref(false)
</script>

<template>
  <main class="flex flex-col items-stretch justify-center h-screen">
    <StudyMode
      v-if="studying"
      :cards="appData.cards"
      @quit="studying = false"
    />
    <template v-else>
      <div class="flex px-3 py-1 justify-between items-center">
        <div class="text-lg text-center">Sukdze</div>
        <Button size="sm" label="Study" @click="studying = true" />
      </div>

      <div class="p-3 flex-1 shadow-inner overflow-y-scroll">
        <div class="">
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
      </div>
    </template>
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
