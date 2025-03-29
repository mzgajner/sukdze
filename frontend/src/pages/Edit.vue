<script setup lang="ts">
import { computed, ref } from 'vue'

import WordCard from '#/components/WordCard.vue'
import TagSelector from '#/components/TagSelector.vue'
import { getUserId, createCard } from '#/api-client'
import useSukdzeData from '#/composables/use-sukdze-data'
import { Card } from '#/types'

const editingCard = ref<Card | null>(null)
const filterTerm = ref('')
const filterTags = ref<string[]>([])

const { cards, tags, isFetched } = useSukdzeData()

async function handleAddNewCard() {
  const newCard = await createCard({
    originalText: '',
    translatedText: '',
    tags: [],
    author: getUserId(),
  })
  cards.value.push(newCard)
  editingCard.value = newCard
}

const sortedAndFilteredCards = computed(() =>
  cards.value
    .sort((a, b) => {
      if (a.translatedText === '') return 1
      else if (b.translatedText === '') return -1
      else return a.translatedText.localeCompare(b.translatedText, 'sl-SI')
    })
    .filter((card: Card) => {
      let termMatches = true
      let tagsMatch = true

      if (filterTerm.value) {
        const term = filterTerm.value.toLocaleLowerCase()
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
  <div v-else>
    <WordCard
      v-for="card in sortedAndFilteredCards"
      :card="card"
      :editing="editingCard === card"
      @open="editingCard = card"
      @close="editingCard = null"
      class="w-full mb-2"
    />
    <UButton
      block
      size="xl"
      variant="subtle"
      label="Add new card"
      loading-auto
      @click="handleAddNewCard"
    />
  </div>
</template>
