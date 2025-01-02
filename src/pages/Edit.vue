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
  const newCard = { original: '', translation: '', tags: [] }

  sukdzeData.value.cards[newCardId] = newCard
  editingCard.value = newCard
}

function deleteCard(card: Card) {
  const cards = sukdzeData.value.cards
  const idToDelete = Object.keys(cards).find((id) => cards[id] === card)!
  delete cards[idToDelete]
}

const sortedAndFilteredCards = computed(() =>
  Object.values(sukdzeData.value.cards)
    .sort((a, b) => {
      if (a.translation === '') return 1
      else if (b.translation === '') return -1
      else return a.translation.localeCompare(b.translation)
    })
    .filter((card: Card) => {
      if (!searchTerm.value) return true


const clearFilterTerm = () => (filterTerm.value = '')
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
            @click="clearFilterTerm()"
          />
        </template>
      </UInput>
    </div>
  </Teleport>
  <div>
    <CardItem
      v-for="card in sortedAndFilteredCards"
      :card="card"
      :editing="editingCard === card"
      @start-editing="editingCard = card"
      @stop-editing="editingCard = null"
      @delete="deleteCard(card)"
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
