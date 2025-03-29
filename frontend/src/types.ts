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

export interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService // default fallback for any other collection
  collection(idOrName: 'cards'): RecordService<Card>
  collection(idOrName: 'tags'): RecordService<Tag>
}
