<script setup lang="ts">
import { computed, ref } from 'vue'

import CardItem from '../Card.vue'
import appData from '../storage'
import type { Card } from '../types'

const editingCard = ref<string | null>(null)
const searchTerm = ref('')
const searchOpen = ref(false)

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

const sortedAndFilteredCards = computed(() =>
  Object.entries(appData.value.cards)
    .map(([cardId, card]) => ({ ...card, id: cardId }))
    .sort((a, b) => {
      if (a.translation === '') return 1
      else if (b.translation === '') return -1
      else return a.translation.localeCompare(b.translation)
    })
    .filter((card: Card) => {
      if (!searchTerm.value) return true

      const term = searchTerm.value.toLocaleLowerCase()
      const word = `${card.original} - ${card.translation}`.toLocaleLowerCase()

      return word.includes(term)
    }),
)

function clearAndClose() {
  searchTerm.value = ''
  searchOpen.value = false
}
</script>

<template>
  <div>
    <CardItem
      v-for="card in sortedAndFilteredCards"
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
    <UPopover :content="{ align: 'end' }" v-model:open="searchOpen">
      <UButton
        icon="i-ant-design:search-outlined"
        class="rounded-full fixed top-4 right-8"
        variant="subtle"
      />

      <template #content>
        <UInput v-model="searchTerm" size="xl" class="m-2">
          <template v-if="searchTerm?.length" #trailing>
            <UButton
              color="neutral"
              variant="link"
              icon="i-ant-design:close-circle-outlined"
              aria-label="Clear input"
              @click="clearAndClose"
            />
          </template>
        </UInput>
      </template>
    </UPopover>
  </div>
</template>
