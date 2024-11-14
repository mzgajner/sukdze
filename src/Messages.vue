<script lang="ts" setup>
import { watch, ref, nextTick, onMounted } from 'vue'
import { messages, Author } from './messages'

const props = defineProps<{ typing: boolean; lastUpdated: Date }>()
const messageBottom = ref<HTMLElement>()

async function scrollToBottom() {
  await nextTick()
  messageBottom.value?.scrollIntoView({ block: 'end' })
}

watch(() => props.lastUpdated, scrollToBottom)
onMounted(() => {
  scrollToBottom()
  window.visualViewport?.addEventListener('resize', scrollToBottom)
})
</script>

<template>
  <div class="messages">
    <div
      v-for="message in messages"
      class="message"
      :class="{ dark: message.author === Author.Us }"
    >
      {{ message.text }}
    </div>
    <div class="message" v-if="typing">
      <div class="typing typing-1"></div>
      <div class="typing typing-2"></div>
      <div class="typing typing-3"></div>
    </div>
    <div ref="messageBottom"></div>
  </div>
</template>

<style scoped>
.messages {
  flex: 1;
  padding: 0 1rem;
  background: #f7f7f7;
  flex-shrink: 2;
  overflow-y: auto;
  box-shadow:
    inset 0 2rem 2rem -2rem rgba(0, 0, 0, 0.05),
    inset 0 -2rem 2rem -2rem rgba(0, 0, 0, 0.05);
  width: 100%;
  white-space: pre-wrap;
}

.messages .message {
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  background: #fff;
  border-radius: 1.125rem 1.125rem 1.125rem 0;
  min-height: 2.25rem;
  width: fit-content;
  max-width: 66%;
  box-shadow:
    0 0 2rem rgba(0, 0, 0, 0.075),
    0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
  line-height: 1.5em;
}

.messages .message.dark {
  margin-left: auto;
  border-radius: 1.125rem 1.125rem 0 1.125rem;
  background: cornflowerblue;
  color: white;
}

.messages .message .typing {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.15rem;
  background: #ccc;
  border-radius: 50%;
}

.messages .message .typing.typing-1 {
  animation: typing 1.5s infinite;
}

.messages .message .typing.typing-2 {
  animation: typing 1.5s 250ms infinite;
}

.messages .message .typing.typing-3 {
  animation: typing 1.5s 500ms infinite;
}

@keyframes typing {
  0%,
  75%,
  100% {
    transform: translate(0, 0.25rem) scale(0.8);
    opacity: 0.5;
  }

  25% {
    transform: translate(0, -0.25rem) scale(1);
    opacity: 1;
  }
}
</style>
