<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div
    class="container-textinfo report-text"
    :class="props.theme ?? MsReportTheme.Info"
  >
    <ion-icon
      :icon="getIcon()"
      size="default"
      class="container-textinfo__icon report-text__icon"
    />
    <ion-text class="container-textinfo__text report-text__text">
      <slot />
    </ion-text>
  </div>
</template>

<script setup lang="ts">
import { IonIcon, IonText } from '@ionic/vue';
import { MsReportTheme } from '@lib/components/ms-types';
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
  --ms-alert-text-background-color: #{ms.color('surface-information-default-subtle')};
  --ms-alert-text-icon-color: #{ms.color('icon-information-default')};
}

.ms-success {
  --ms-alert-text-background-color: #{ms.color('surface-success-default-subtle')};
  --ms-alert-text-icon-color: #{ms.color('icon-success-default')};
}

.ms-warning {
  --ms-alert-text-background-color: #{ms.color('surface-warning-default-subtle')};
  --ms-alert-text-icon-color: #{ms.color('icon-warning-default')};
}

.ms-error {
  --ms-alert-text-background-color: #{ms.color('surface-error-default-subtle')};
  --ms-alert-text-icon-color: #{ms.color('icon-error-default')};
}

.report-text {
  display: flex;
  align-items: center;
  gap: ms.spacing('gap-lg');
  border-radius: ms.radius('lg');
  background-color: var(--ms-alert-text-background-color);
  @include ms.font('body-lg-medium');

  @include ms.responsive-breakpoint('sm') {
    padding: ms.spacing('padding-lg') ms.spacing('padding-2xl');
    border: none;
  }

  &__icon {
    color: var(--ms-alert-text-icon-color);
    font-size: ms.size('sm');
    min-width: ms.size('sm');
  }

  &__text {
    color: ms.color('text-base-body');
  }

  &.ms-info,
  &.ms-success,
  &.ms-warning,
  &.ms-error {
    padding: ms.spacing('padding-2xl') ms.spacing('padding-3xl');
  }
}
</style>
