<script lang="ts" setup>
import { computed, ref } from 'vue'
import Button from './Button.vue'

defineEmits<{ quit: [] }>()

const { cards } = defineProps<{
  cards: Record<string, { original: string; translation: string }>
}>()

function shuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const shuffledCards = computed(() => {
  const cardArray = Object.values(cards)
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
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="card flex items-center justify-center px-8 flex-1">
      <div
        :key="currentPosition"
        class="card-content text-3xl rounded-lg shadow-xl w-full aspect-square transition-transform duration-1000 relative bg-yellow-50"
        :class="{
          flip: cardFlipped,
        }"
        @click="cardFlipped = !cardFlipped"
      >
        <div
          class="card-front absolute w-full h-full flex p-8 justify-center items-center"
        >
          {{ currentCard.original }}
        </div>
        <div
          class="card-back absolute w-full h-full flex p-8 justify-center items-center"
        >
          {{ currentCard.translation }}
        </div>
      </div>
    </div>
    <div class="flex justify-between p-2">
      <Button
        label="Previous"
        icon="arrowLeft"
        :disabled="currentPosition === 0"
        @click="previous"
      />
      <Button label="Quit" variant="danger" @click="$emit('quit')" />
      <Button
        class="w-[6.625rem]"
        label="Next"
        icon="arrowRight"
        icon-after
        :disabled="currentPosition === shuffledCards.length - 1"
        @click="next"
      />
    </div>
  </div>
</template>

<style scoped>
.card {
  perspective: 800px;
}

.card-content {
  transform-style: preserve-3d;
}

.card-back {
  transform: rotateY(0.5turn);
}

.card-front,
.card-back {
  backface-visibility: hidden;
}

.flip {
  transform: rotateY(0.5turn);
}
</style>
