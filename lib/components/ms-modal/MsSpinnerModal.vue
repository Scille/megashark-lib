<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ms-modal :close-button="{ visible: false }">
    <ion-text
      v-if="label"
      class="subtitles-normal spinner-label__text"
    >
      {{ $msTranslate(label) }}
    </ion-text>
    <ms-spinner />
  </ms-modal>
</template>

<script setup lang="ts">
import { IonText } from '@ionic/vue';
import MsModal from '@lib/components/ms-modal/MsModal.vue';
import MsSpinner from '@lib/components/ms-spinner/MsSpinner.vue';
import { Translatable } from '@lib/services';

defineProps<{
  label?: Translatable;
}>();
</script>

<style lang="scss" scoped></style>
