<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ms-modal
    :title="title"
    :subtitle="subtitle"
    :close-button="{ visible: false }"
    :cancel-button="{
      disabled: false,
      label: noText || 'lib.components.msQuestionModal.cancelButtonLabel',
      onClick: onNo,
    }"
    :confirm-button="{
      disabled: false,
      label: yesText || 'lib.components.msQuestionModal.confirmButtonLabel',
      onClick: onYes,
      theme: yesIsDangerous ? MsReportTheme.Error : undefined,
    }"
    @on-enter-keyup="onYes"
  />
</template>

<script setup lang="ts">
import MsModal from '@lib/components/ms-modal/MsModal.vue';
import { MsModalResult } from '@lib/components/ms-modal/types';
import { MsReportTheme } from '@lib/components/ms-types';
import { Translatable } from '@lib/services';
import { modalController } from '@ionic/vue';

defineProps<{
  title: Translatable;
  subtitle: Translatable;
  yesText?: Translatable;
  noText?: Translatable;
  yesIsDangerous?: boolean;
}>();

async function onYes(): Promise<boolean> {
  const res = await modalController.dismiss(null, MsModalResult.Confirm);
  return res;
}

async function onNo(): Promise<boolean> {
  return await modalController.dismiss(null, MsModalResult.Cancel);
}
</script>

<style lang="scss" scoped></style>
