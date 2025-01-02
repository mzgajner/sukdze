<script setup lang="ts">
import { computed, ref } from 'vue'

import CardItem from '../Card.vue'
import useSukdzeData from '../use-sukdze-data'
import type { Card } from '../types'
import TagSelector from '../TagSelector.vue'

const editingCard = ref<Card | null>(null)
const filterTerm = ref('')
const filterTags = ref<string[]>([])
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
      let termMatches = true
      let tagsMatch = true

      if (filterTerm.value) {
        const term = filterTerm.value.toLocaleLowerCase()
        const word =
          `${card.original} - ${card.translation}`.toLocaleLowerCase()
        termMatches = word.includes(term)
      }

      if (filterTags.value.length > 0) {
        const tagsFromFilter = new Set(filterTags.value)
        const tagsFromCard = new Set(card.tags ?? [])

        tagsMatch = tagsFromFilter.intersection(tagsFromCard).size > 0
      }

      return termMatches && tagsMatch
    }),
)

const clearFilterTerm = () => (filterTerm.value = '')
</script>

<template>
  <Teleport to="#top-nav">
    <div class="px-4 py-2 bg-[var(--ui-bg-elevated)] flex gap-2">
      <UInput
        v-model="filterTerm"
        size="lg"
        class="w-1/2 flex-shrink-0"
        placeholder="Type to filter"
        icon="i-ant-design:search-outlined"
      >
        <template v-if="filterTerm?.length" #trailing>
          <UButton
            color="neutral"
            variant="link"
            icon="i-ant-design:close-circle-outlined"
            aria-label="Clear input"
            @click="clearFilterTerm()"
          />
        </template>
      </UInput>
      <div class="w-1/2">
        <TagSelector v-model="filterTags" />
      </div>
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
