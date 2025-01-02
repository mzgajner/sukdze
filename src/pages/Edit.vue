<script setup lang="ts">
import { computed, ref } from 'vue'

import CardItem from '../Card.vue'
import useSukdzeData from '../use-sukdze-data'
import type { Card } from '../types'

const editingCard = ref<string | null>(null)
const searchTerm = ref('')
const searchOpen = ref(false)
const sukdzeData = useSukdzeData()

function addNewCard() {
  const newCardId = crypto.randomUUID()
  sukdzeData.value.cards[newCardId] = {
    original: '',
    translation: '',
  }
  editingCard.value = newCardId
}

function deleteCard(cardId: string) {
  delete sukdzeData.value.cards[cardId]
}

function updateCard(cardId: string, card: Card) {
  sukdzeData.value.cards[cardId] = card
}

const sortedAndFilteredCards = computed(() =>
  Object.entries(sukdzeData.value.cards)
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
  <Teleport to="#top-nav">
    <div class="px-4 py-2 bg-[var(--ui-bg-elevated)]">
      <UInput
        v-model="searchTerm"
        size="xl"
        class="w-full"
        placeholder="Type to filter cards"
        icon="i-ant-design:search-outlined"
      >
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
    </div>
  </Teleport>
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
  </div>
</template>
