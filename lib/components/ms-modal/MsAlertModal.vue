<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ms-modal
    :title="title"
    :theme="theme"
    :close-button="{ visible: false }"
    :confirm-button="{
      disabled: false,
      label: 'lib.components.msAlertModal.confirmButtonLabel',
      onClick: confirm,
    }"
    @on-enter-keyup="confirm()"
  >
    <ms-report-text :theme="theme">
      {{ $msTranslate(message) }}
    </ms-report-text>
  </ms-modal>
</template>

<script setup lang="ts">
import { MsReportText } from '@lib/components/ms-text';
import MsModal from '@lib/components/ms-modal/MsModal.vue';
import { MsAlertModalConfig, MsModalResult } from '@lib/components/ms-modal/types';
import { modalController } from '@ionic/vue';

defineProps<MsAlertModalConfig>();

async function confirm(): Promise<boolean> {
  return modalController.dismiss(null, MsModalResult.Confirm);
}
</script>

<style lang="scss" scoped></style>
