<script lang="ts" setup>
import { computed, ref } from 'vue'
import useSukdzeData from '#/composables/use-sukdze-data'
import confetti from 'canvas-confetti'

defineEmits<{ quit: [] }>()

const { cards } = useSukdzeData()

function shuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const shuffledCards = computed(() => {
  const cardArray = JSON.parse(JSON.stringify(cards.value ?? []))
  shuffleArray(cardArray)
  return cardArray
})

const currentPosition = ref(0)
const currentCard = computed(() => shuffledCards.value[currentPosition.value])
const cardFlipped = ref(false)

async function next() {
  cardFlipped.value = false
  currentPosition.value = Math.min(
    currentPosition.value + 1,
    shuffledCards.value.length - 1,
  )
}

async function previous() {
  cardFlipped.value = false
  currentPosition.value = Math.max(currentPosition.value - 1, 0)
}

function flipCard() {
  cardFlipped.value = !cardFlipped.value

  if (
    cardFlipped.value &&
    currentPosition.value === shuffledCards.value.length - 1
  )
    confetti()
}
</script>

<template>
  <div class="flex flex-col select-none h-full">
    <div class="perspective-[800px] flex items-center justify-center px-4 flex-1">
      <div
        :key="currentPosition"
        v-if="currentCard"
        class="transform-3d text-3xl rounded-lg shadow-xl w-full max-w-[50vh] aspect-square transition-transform duration-300 relative bg-yellow-500/10"
        :class="{ 'rotate-y-180': cardFlipped }"
        @click="flipCard"
      >
        <div
          class="absolute w-full h-full flex p-8 justify-center items-center text-6xl backface-hidden rotate-x-0"
        >
          {{ currentCard.originalText }}
        </div>
        <div
          class="absolute w-full h-full flex p-8 justify-center items-center text-6xl backface-hidden rotate-y-180 rotate-x-0 z-10"
        >
          {{ currentCard.translatedText }}
        </div>
      </div>
    </div>
    <div class="flex justify-between gap-2">
      <UButton
        block
        label="Previous"
        leading-icon="i-ant-design:left-circle-twotone"
        :disabled="currentPosition === 0"
        size="xl"
        @click="previous"
      />
      <UButton
        block
        label="Next"
        trailing-icon="i-ant-design:right-circle-twotone"
        :disabled="currentPosition === shuffledCards.length - 1"
        size="xl"
        @click="next"
      />
    </div>
  </div>
</template>
