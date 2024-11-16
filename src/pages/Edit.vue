<script setup lang="ts">
import { ref } from 'vue'

import Card from '../Card.vue'
import appData from '../storage'

const editingCard = ref<string | null>(null)

function addNewCard() {
  const newCardId = crypto.randomUUID()
  appData.value.cards[newCardId] = {
    original: '',
    translation: '',
  }
  editingCard.value = newCardId
}

function deleteCard(cardId: string) {
  delete appData.value.cards[cardId]
}
</script>

<template>
  <div class="px-3 py-1 flex-1 overflow-y-scroll">
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
      <UButton
        block
        size="xl"
        variant="subtle"
        @click="addNewCard"
        label="Add new card"
      />
    </div>
  </div>
</template>
