<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import useSukdzeData from '#/composables/use-sukdze-data'

const sukdzeData = useSukdzeData()

const file = ref('')

const fileInput = useTemplateRef('fileInput')

function importFromFile() {
  const files = fileInput.value?.inputRef?.files
  const file = files?.length ? files[0] : null

  if (!file) return

  if (
    !confirm('Restoring a backup will overwrite existing data, are you sure?')
  )
    return

  const reader = new FileReader()
  reader.onload = function () {
    const data = JSON.parse(reader.result as string)
    sukdzeData.value = data
  }
  reader.readAsText(file)
}
</script>

<template>
  <div>
    <UInput
      ref="fileInput"
      class="mb-2"
      type="file"
      size="xl"
      v-model="file"
      icon="i-heroicons-folder"
    />
    <UButton
      icon="i-ant-design:upload-outlined"
      size="xl"
      label="Restore from backup"
      color="error"
      :disabled="!file"
      :variant="!file ? 'outline' : 'solid'"
      @click="importFromFile"
    />
  </div>
</template>
