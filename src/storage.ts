import { useStorage } from '@vueuse/core'
import { type AppData } from './types'
import { type Ref } from 'vue'

const appData: Ref<AppData> = useStorage(
  'sukdzeData',
  {
    cards: {
      'db7773c1-bf41-4f7d-b285-dbf35688c5ec': {
        original: '숙제',
        translation: 'Domača naloga',
      },
    },
  },
  undefined,
  { deep: true },
)

export default appData
