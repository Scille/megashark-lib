<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ms-modal
    :title="title"
    :subtitle="subtitle"
    :close-button="{ visible: true }"
    :confirm-button="{
      label: okButtonText || 'lib.components.msPasswordInputModal.confirmButtonLabel',
      disabled: password.length === 0,
      onClick: confirm,
    }"
  >
    <ms-report-text
      v-if="additionalMessage"
      :theme="additionalMessage.theme"
    >
      <ms-rich-text :text="additionalMessage.message" />
    </ms-report-text>

    <ms-password-input
      :label="inputLabel"
      ref="passwordInput"
      auto-complete-info="current-password"
      v-model="password"
      @on-enter-keyup="confirm()"
    />
  </ms-modal>
</template>

<script setup lang="ts">
import { modalController } from '@ionic/vue';
import { MsPasswordInput } from '@lib/components/ms-input';
import MsModal from '@lib/components/ms-modal/MsModal.vue';
import { GetPasswordOptions, MsModalResult } from '@lib/components/ms-modal/types';
import { MsReportText, MsRichText } from '@lib/components/ms-text';
import { onMounted, ref, useTemplateRef } from 'vue';

defineProps<GetPasswordOptions>();

const password = ref('');
const passwordInputRef = useTemplateRef('passwordInput');

onMounted(() => {
  if (passwordInputRef.value) {
    passwordInputRef.value.setFocus();
  }
});

async function confirm(): Promise<boolean> {
  if (password.value.length === 0) {
    return false;
  }
  return await modalController.dismiss(password.value, MsModalResult.Confirm);
}
</script>

<style scoped lang="scss"></style>
