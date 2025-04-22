<script setup lang="ts">
import { computed, ref } from 'vue'
import { refDebounced } from '@vueuse/core'

import WordCard from '#/components/WordCard.vue'
import TagSelector from '#/components/TagSelector.vue'
import { getUserId, createCard } from '#/api-client'
import useSukdzeData from '#/composables/use-sukdze-data'
import { Card } from '#/types'

const editingMode = ref<'CREATE' | 'EDIT'>('EDIT')
const editingCard = ref<Card | null>(null)
const filterTerm = ref('')
const debouncedFilterTerm = refDebounced(filterTerm, 500)
const filterTags = ref<string[]>([])

const { cards, tags, isFetched } = useSukdzeData()

async function addNewCard() {
  const newCard = await createCard({
    originalText: '',
    translatedText: '',
    tags: [],
    author: getUserId(),
  })
  cards.value.push(newCard)
  editingMode.value = 'CREATE'
  editingCard.value = newCard
}

function editCard(card: Card) {
  editingMode.value = 'EDIT'
  editingCard.value = card
}

const sortedAndFilteredCards = computed(() =>
  cards.value
    .sort((a, b) => a.translatedText.localeCompare(b.translatedText, 'sl-SI'))
    .filter((card: Card) => {
      let termMatches = true
      let tagsMatch = true

      if (debouncedFilterTerm.value) {
        const term = debouncedFilterTerm.value.toLocaleLowerCase()
        const word =
          `${card.originalText} - ${card.translatedText}`.toLocaleLowerCase()
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
</script>

<template>
  <Teleport to="#top-nav">
    <div class="flex gap-2">
      <UInput
        v-model="filterTerm"
        size="lg"
        class="w-1/2 flex-shrink-0"
        placeholder="Type to filter"
        type="search"
        icon="i-ant-design:search-outlined"
      />

      <div class="w-1/2">
        <TagSelector v-model="filterTags" :tags="tags" />
      </div>
    </div>
  </Teleport>
  <div
    v-if="!isFetched"
    class="flex flex-col items-center justify-center h-full"
  >
    <UIcon
      name="i-ant-design:loading-outlined"
      class="animate-spin size-8 mb-2"
    />
    <div>Loading data …</div>
  </div>
  <div v-else class="pb-12">
    <WordEditingModal
      v-if="editingCard !== null"
      :mode="editingMode"
      :card="editingCard"
      @close="editingCard = null"
    />
    <WordCard
      v-for="card in sortedAndFilteredCards"
      :card="card"
      @edit="editCard(card)"
      class="w-full mb-2"
    />
    <UButton
      class="rounded-full fixed bottom-4 right-4"
      size="xl"
      icon="i-ant-design:plus-outlined"
      loading-auto
      @click="addNewCard"
    />
  </div>
</template>
