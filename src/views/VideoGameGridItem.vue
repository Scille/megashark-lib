<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ms-grid-item
    :item="item"
    :are-some-selected="$attrs.areSomeSelected as Ref<boolean>"
    :is-selection-enabled="$attrs.isSelectionEnabled as boolean"
    :show-options="$attrs.showOptions as boolean"
  >
    {{ item.name }}
    {{ item.developer }}
  </ms-grid-item>
</template>

<script setup lang="ts">
import { MsGridItem } from '@lib/components';
import { VideoGame } from '@/views/types';
import { Ref } from 'vue';

defineProps<{
  item: VideoGame;
}>();
</script>

<style scoped lang="scss"></style>
