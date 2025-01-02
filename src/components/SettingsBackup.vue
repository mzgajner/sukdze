<script lang="ts" setup>
import useSukdzeData from '#/composables/use-sukdze-data'

const sukdzeData = useSukdzeData()

function download() {
  const file = new Blob([JSON.stringify(sukdzeData.value)], {
    type: 'application/json',
  })
  const a = document.createElement('a'),
    url = URL.createObjectURL(file)
  a.href = url
  a.download = 'sukdze-export.json'
  document.body.appendChild(a)
  a.click()
  setTimeout(function () {
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, 0)
}
</script>

<template>
  <UButton
    icon="i-ant-design:download-outlined"
    size="xl"
    label="Create a backup"
    @click="download"
  />
</template>
