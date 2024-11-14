<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPenToSquare,
  faFloppyDisk,
  faTrashCan,
  faSquarePlus,
} from '@fortawesome/free-regular-svg-icons'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const icons = {
  penToSquare: faPenToSquare,
  floppyDisk: faFloppyDisk,
  trashCan: faTrashCan,
  squarePlus: faSquarePlus,
  arrowLeft: faArrowLeft,
  arrowRight: faArrowRight,
}

export type SupportedIconName = keyof typeof icons

defineProps<{ name: SupportedIconName }>()
</script>

<template>
  <FontAwesomeIcon :icon="icons[name]" />
</template>
