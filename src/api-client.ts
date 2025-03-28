import PocketBase from 'pocketbase'

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL)

export async function login(email: string, password: string) {
  await pb.collection('users').authWithPassword(email, password)
}

export function getAuthState() {
  return pb.authStore.isValid
}

export function logout() {
  pb.authStore.clear()
}
