<script lang="ts" setup>
import { Tag } from '#/types'

const model = defineModel<string[]>()
defineProps<{ tags: Tag[] }>()
</script>

<template>
  <USelectMenu
    v-model="model"
    multiple
    placeholder="Tags"
    icon="i-ant-design:tags-outlined"
    size="lg"
    class="w-full"
    value-key="id"
    :search-input="false"
    :items="tags"
  />
</template>
