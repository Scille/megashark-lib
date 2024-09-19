<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ms-modal :close-button="{ visible: false }">
    <ion-text class="subtitles-normal spinner-label__text">{{ label }}</ion-text>
    <ms-spinner />
  </ms-modal>
</template>

<script setup lang="ts">
import MsModal from '@lib/components/ms-modal/MsModal.vue';
import { Translatable } from '@lib/services';
import MsSpinner from '@lib/components/ms-spinner/MsSpinner.vue';

defineProps<{
  label?: Translatable;
}>();
</script>

<style lang="scss" scoped></style>
