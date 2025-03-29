import PocketBase, { type RecordService } from 'pocketbase'

export interface Card {
  author: string
  collectionId: string
  collectionName: string
  created: string
  id: string
  originalText: string
  tags: string[]
  translatedText: string
  updated: string
}

export interface Tag {
  author: string
  collectionId: string
  collectionName: string
  created: string
  id: string
  label: string
  updated: string
}

interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService // default fallback for any other collection
  collection(idOrName: 'cards'): RecordService<Card>
  collection(idOrName: 'tags'): RecordService<Tag>
}

const pb = new PocketBase(
  import.meta.env.VITE_POCKETBASE_URL,
) as TypedPocketBase

export async function login(email: string, password: string) {
  await pb.collection('users').authWithPassword(email, password)
}

export const getAuthState = () => pb.authStore.isValid
export const getUserId = () => pb.authStore.record?.id ?? ''

export function logout() {
  pb.authStore.clear()
}

// Cards
export async function fetchCards() {
  return await pb.collection('cards').getFullList({
    sort: 'translatedText',
  })
}

export async function updateCard(card: Card) {
  return await pb.collection('cards').update(card.id, card)
}

export async function createCard(
  card: Pick<Card, 'translatedText' | 'originalText' | 'tags' | 'author'>,
) {
  return await pb.collection('cards').create(card)
}

export async function deleteCard(cardId: string) {
  return await pb.collection('cards').delete(cardId)
}

// TAGS
export async function fetchTags() {
  return await pb.collection('tags').getFullList({
    sort: 'label',
  })
}

export async function createTag(tag: Pick<Tag, 'label' | 'author'>) {
  return await pb.collection('tags').create(tag)
}

export async function deleteTag(tagId: string) {
  return await pb.collection('tags').delete(tagId)
}
