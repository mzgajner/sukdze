<script lang="ts" setup>
import useSukdzeData from './use-sukdze-data'

const model = defineModel<string[]>()
const sukdzeData = useSukdzeData()
</script>

<template>
  <USelectMenu
    v-model="model"
    multiple
    placeholder="Tags"
    :search-input="false"
    :items="sukdzeData.tags"
  />
</template>
