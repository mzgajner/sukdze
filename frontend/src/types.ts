export type Card = {
  original: string
  translation: string
  tags?: string[]
}

export type AppData = {
  cards: Record<string, Card>
  tags: string[]
}
