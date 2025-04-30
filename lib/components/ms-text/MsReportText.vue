<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div
    class="container-textinfo"
    :class="props.theme ?? MsReportTheme.Info"
  >
    <ion-icon
      :icon="getIcon()"
      size="default"
      class="container-textinfo__icon"
    />
    <ion-text class="body container-textinfo__text">
      <slot />
    </ion-text>
  </div>
</template>

<script setup lang="ts">
import { MsReportTheme } from '@lib/components/ms-types';
import { IonIcon, IonText } from '@ionic/vue';
import { checkmarkCircle, closeCircle, informationCircle, warning } from 'ionicons/icons';

const props = defineProps<{
  theme?: MsReportTheme;
}>();

function getIcon(): string {
  switch (props.theme) {
    case MsReportTheme.Info:
      return informationCircle;
    case MsReportTheme.Success:
      return checkmarkCircle;
    case MsReportTheme.Warning:
      return warning;
    case MsReportTheme.Error:
      return closeCircle;
  }
  return informationCircle;
}
</script>

<style scoped lang="scss">
@use '@lib/theme' as ms;
.ms-info {
  --ms-alert-text-background-color: var(--parsec-color-light-info-50);
  --ms-alert-text-icon-color: var(--parsec-color-light-info-700);
}

.ms-success {
  --ms-alert-text-background-color: var(--parsec-color-light-success-50);
  --ms-alert-text-icon-color: var(--parsec-color-light-success-700);
}

.ms-warning {
  --ms-alert-text-background-color: var(--parsec-color-light-warning-50);
  --ms-alert-text-icon-color: var(--parsec-color-light-warning-700);
}

.ms-error {
  --ms-alert-text-background-color: var(--parsec-color-light-danger-50);
  --ms-alert-text-icon-color: var(--parsec-color-light-danger-700);
}

.container-textinfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  background-color: var(--ms-alert-text-background-color);

  @include ms.responsive-breakpoint('sm') {
    padding: 0.5rem 0.75rem;
    border-radius: var(--parsec-radius-8);
    border: none;
  }

  &__icon {
    color: var(--ms-alert-text-icon-color);
    font-size: 1.25rem;
    min-width: 1.25rem;
  }

  &__text {
    color: var(--parsec-color-light-secondary-text);
  }
  &.ms-info,
  &.ms-success,
  &.ms-warning,
  &.ms-error {
    border-radius: 0 var(--parsec-radius-4) var(--parsec-radius-4) 0;
    border-left: 2px solid var(--ms-alert-text-icon-color);
    padding: 1em;
  }
}
</style>
