<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-icon
    :slot="slot"
    :icon="informationCircle"
    class="icon"
    @click="openInformationTooltip($event, text)"
  />
</template>

<script setup lang="ts">
import { openInformationTooltip } from '@lib/components/ms-tooltip/utils';
import { Translatable } from '@lib/services';
import { IonIcon } from '@ionic/vue';
import { informationCircle } from 'ionicons/icons';

defineProps<{
  text: Translatable;
  slot: 'start' | 'end';
}>();
</script>

<style scoped lang="scss">
.icon {
  --color: var(--parsec-color-light-secondary-grey);

  &:hover {
    color: var(--parsec-color-light-secondary-text);
  }
}
</style>
