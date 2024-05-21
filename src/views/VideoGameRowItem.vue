<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ms-row-item
    :item="item"
    :are-some-selected="$attrs.areSomeSelected as Ref<boolean>"
    :is-selection-enabled="$attrs.isSelectionEnabled as boolean"
    :show-options="$attrs.showOptions as boolean"
  >
    <div class="video-game-name">
      <ion-label class="video-game-name__label cell">
        <span class="main-cell">
          {{ item.name }}
        </span>
      </ion-label>
    </div>

    <div class="video-game-developer">
      <span>{{ item.developer }}</span>
    </div>
  </ms-row-item>
</template>

<script setup lang="ts">
import { IonLabel } from '@ionic/vue';
import { Ref } from 'vue';
import { MsRowItem } from '@lib/components';
import { VideoGame } from '@/views/types';

defineProps<{
  item: VideoGame;
}>();
</script>

<style scoped lang="scss">
.video-game-name {
  padding: 0.5rem 1rem;
  width: auto;
  flex-grow: 1;
  min-width: 11.25rem;
  max-width: 25rem;

  &__label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    overflow: hidden;

    .main-cell {
      white-space: nowrap;
      overflow: hidden;
    }
  }
}

.video-game-developer {
  min-width: 11.5rem;
  max-width: 10vw;
  width: auto;
  flex-grow: 2;
}
</style>
