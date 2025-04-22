<script lang="ts" setup>
async function refresh() {
  window.location.reload()
}
</script>

<template>
  <UButton
    icon="i-ant-design:reload-outlined"
    size="xl"
    label="Check for new version"
    color="primary"
    variant="solid"
    @click="refresh"
  />
</template>
