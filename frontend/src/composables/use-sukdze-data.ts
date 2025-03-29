import { ref } from 'vue'
import { fetchCards, fetchTags } from '#/api-client'
import { Card, Tag } from '#/types'

const cards = ref<Card[]>([])
const tags = ref<Tag[]>([])
let isFetched = ref(false)
let isFetching = ref(false)

async function initialize() {
  if (!isFetched.value && !isFetching.value) {
    isFetching.value = true
    await fetchCardsAndTags()
    isFetched.value = true
  }
}

async function fetchCardsAndTags() {
  const cardFetching = fetchCards()
  const tagFetching = fetchTags()
  const [cardsResult, tagsResult] = await Promise.all([
    cardFetching,
    tagFetching,
  ])

  cards.value = cardsResult
  tags.value = tagsResult
}

export default function () {
  initialize()

  return { cards, tags, isFetched, isFetching, refresh: fetchCardsAndTags }
}
