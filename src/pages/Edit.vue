<script setup lang="ts">
import { computed, ref } from 'vue'

import CardItem from '../Card.vue'
import appData from '../storage'
import type { Card } from '../types'

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

function updateCard(cardId: string, card: Card) {
  appData.value.cards[cardId] = card
}

const sortedCards = computed(() =>
  Object.entries(appData.value.cards)
    .map(([cardId, card]) => ({ ...card, id: cardId }))
    .sort((a, b) => {
      if (a.translation === '') return 1
      else if (b.translation === '') return -1
      else return a.translation.localeCompare(b.translation)
    }),
)
</script>

<template>
  <div>
    <CardItem
      v-for="card in sortedCards"
      :card="card"
      :editing="editingCard === card.id"
      @start-editing="editingCard = card.id"
      @stop-editing="editingCard = null"
      @delete="deleteCard(card.id)"
      @update="updateCard(card.id, $event)"
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
</template>
