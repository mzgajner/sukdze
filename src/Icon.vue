<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPenToSquare,
  faFloppyDisk,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons'

const icons = {
  penToSquare: faPenToSquare,
  floppyDisk: faFloppyDisk,
  trashCan: faTrashCan,
}

export type SupportedIconName = keyof typeof icons

defineProps<{ name: SupportedIconName }>()
</script>

<template>
  <FontAwesomeIcon :icon="icons[name]" />
</template>
