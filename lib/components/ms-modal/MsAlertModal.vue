<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ms-modal
    :title="title"
    :subtitle="message"
    :theme="theme"
    :close-button="{ visible: false }"
    :confirm-button="{
      disabled: false,
      label: 'lib.components.msAlertModal.confirmButtonLabel',
      onClick: confirm,
    }"
    @on-enter-keyup="confirm()"
  />
</template>

<script setup lang="ts">
import MsModal from '@lib/components/ms-modal/MsModal.vue';
import { MsAlertModalConfig, MsModalResult } from '@lib/components/ms-modal/types';
import { modalController } from '@ionic/vue';

defineProps<MsAlertModalConfig>();

async function confirm(): Promise<boolean> {
  return modalController.dismiss(null, MsModalResult.Confirm);
}
</script>

<style lang="scss" scoped></style>
