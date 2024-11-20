export type Card = {
  original: string
  translation: string
}

export type AppData = {
  cards: Record<string, Card>
}
