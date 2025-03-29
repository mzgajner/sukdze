<script lang="ts" setup>
import { login } from '#/api-client'
import { ClientResponseError } from 'pocketbase'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  email: '',
  password: '',
})

const NO_ERRORS = { email: false, password: false, general: false }
const errors = ref<Record<string, boolean | string>>(NO_ERRORS)

async function handleLogin() {
  errors.value = NO_ERRORS
  try {
    await login(state.email, state.password)
    router.push('/edit')
  } catch (error) {
    if (error instanceof ClientResponseError) {
      errors.value = {
        email: error.response.data.identity?.message ?? true,
        password: error.response.data.password?.message ?? true,
        general: error.message ?? false,
      }
    }
  }
}
</script>

<template>
  <div class="flex justify-center items-center h-full">
    <UCard class="w-80">
      <template #header>
        <div class="text-xl font-bold">Login</div>
      </template>

      <UForm :state="state">
        <UFormField label="Email" required :error="errors.email">
          <UInput
            placeholder="Enter your email"
            class="w-full"
            v-model="state.email"
          />
        </UFormField>
        <UFormField
          label="Password"
          required
          class="mt-4"
          :error="errors.password"
        >
          <UInput
            placeholder="Enter your password"
            type="password"
            class="w-full"
            v-model="state.password"
            @keyup.enter="handleLogin"
          />
        </UFormField>
      </UForm>

      <UAlert
        v-if="errors.general"
        class="mt-4"
        color="error"
        variant="soft"
        :description="errors.general as string"
        icon="i-ant-design:exclamation-circle-outlined"
      />

      <template #footer>
        <UButton
          @click="handleLogin"
          label="Log in"
          size="xl"
          loading-auto
          icon="i-ant-design:login-outlined"
        />
      </template>
    </UCard>
  </div>
</template>
