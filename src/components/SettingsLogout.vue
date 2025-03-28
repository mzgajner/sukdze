<script lang="ts" setup>
import { logout } from '#/api-client'
import { useRouter } from 'vue-router'

const router = useRouter()

async function handleLogout() {
  await logout()
  router.push('/login')
}
</script>

<template>
  <UButton
    icon="i-ant-design:logout-outlined"
    size="xl"
    label="Log out of Sukdze"
    color="error"
    variant="solid"
    @click="handleLogout"
  />
</template>
