export enum Author {
  Us,
  Them,
}

type Message = {
  author: Author
  text: string
}

const DEFAULT_MESSAGES = [
  {
    author: Author.Them,
    text: 'Čao, šefica 👋',
  },
  {
    author: Author.Them,
    text: 'Javi, če boš kaj rabla',
  },
]

const wrongTexts = [
  'Ne štekam...',
  'Kaj je to?',
  'Prvič slišim',
  'Na-a',
  'Nimam pojma',
  'Ne vem kaj naj bi to blo',
  'Wtf',
  '🤷',
  'Nimam blage veze',
  'Od kod ti to?',
  'Ne vem',
  'Kaj je to?',
  'Lol, ne',
  'Ne',
  'Nič ne najdem v bazi',
  'Joj, ne',
  'Ne razumem',
  'Žal...',
  '???',
  'Nep',
  'Ne, nič',
  'Ne najdem',
  'To mi pa ni znano',
  'A si ziher?',
  'Dvomim.',
  'Ne, ne, ne',
  'Ah, to ni nič',
  'Ne bi vedel',
]

function loadMessages() {
  const localStorageMessages = localStorage.getItem('police-messages')

  if (localStorageMessages) {
    return JSON.parse(localStorageMessages)
  } else {
    return DEFAULT_MESSAGES
  }
}

function loadWrongIndex() {
  const wrongIndexString = localStorage.getItem('wrongIndex')

  if (wrongIndexString) {
    return JSON.parse(wrongIndexString)
  } else {
    return 0
  }
}
let wrongTextIndex = loadWrongIndex()

export const messages: Message[] = loadMessages()

function addMessage(author: Author, text: string) {
  messages.push({ author, text })
  localStorage.setItem('police-messages', JSON.stringify(messages))
}

export function addOurMessage(text: string) {
  addMessage(Author.Us, text)
}

export function addTheirMessage(text: string) {
  addMessage(Author.Them, text)
}

export function addTheirWrongMessage() {
  const nextWrongText = wrongTexts[wrongTextIndex]
  addMessage(Author.Them, nextWrongText)
  wrongTextIndex = (wrongTextIndex + 1) % wrongTexts.length
  localStorage.setItem('wrongIndex', JSON.stringify(wrongTextIndex))
}
