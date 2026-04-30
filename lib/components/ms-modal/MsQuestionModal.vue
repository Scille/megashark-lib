<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ms-modal
    v-if="isLargeDisplay"
    :title="title"
    :subtitle="subtitle"
    :close-button="{ visible: false }"
    :theme="yesIsDangerous ? MsReportTheme.Error : undefined"
    :cancel-button="{
      disabled: false,
      label: noText || 'lib.components.msQuestionModal.cancelButtonLabel',
      onClick: onNo,
    }"
    :confirm-button="{
      disabled: false,
      label: yesText || 'lib.components.msQuestionModal.confirmButtonLabel',
      onClick: onYes,
    }"
    @on-enter-keyup="onYes"
  />
  <ms-small-display-question-modal
    v-else
    :title="title"
    :subtitle="subtitle"
    :yes-text="yesText"
    :no-text="noText"
    :yes-is-dangerous="yesIsDangerous"
  />
</template>

<script setup lang="ts">
import { modalController } from '@ionic/vue';
import MsModal from '@lib/components/ms-modal/MsModal.vue';
import MsSmallDisplayQuestionModal from '@lib/components/ms-modal/MsSmallDisplayQuestionModal.vue';
import { MsModalResult } from '@lib/components/ms-modal/types';
import { MsReportTheme } from '@lib/components/ms-types';
import { Translatable, useWindowSize } from '@lib/services';

const { isLargeDisplay: isLargeDisplay } = useWindowSize();

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
