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
      <ms-rich-text :text="message" />
    </ms-report-text>
  </ms-modal>
</template>

<script setup lang="ts">
import { modalController } from '@ionic/vue';
import MsModal from '@lib/components/ms-modal/MsModal.vue';
import { MsAlertModalConfig, MsModalResult } from '@lib/components/ms-modal/types';
import { MsReportText, MsRichText } from '@lib/components/ms-text';

defineProps<MsAlertModalConfig>();

async function confirm(): Promise<boolean> {
  return modalController.dismiss(null, MsModalResult.Confirm);
}
</script>

<style lang="scss" scoped></style>
