<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <component
    :is="component"
    v-for="item in model.getItems()"
    :key="item.getUniqueId()"
    :item="item"
    :are-some-selected="model.someSelected"
    :is-selection-enabled="isSelectionEnabled"
    :show-options="showOptions"
    @menu-click="(item: any, event: Event, onFinished: () => void) => $emit('menuClick', item, event, onFinished)"
    @select="onItemSelectionChanged"
  />
</template>

<script setup lang="ts">
import { MsListModel, MsItemModel } from '@lib/components/ms-list/types';
import type { Component } from 'vue';

const props = defineProps<{
  model: MsListModel<MsItemModel>;
  component: Component;
  isSelectionEnabled?: boolean;
  showOptions?: boolean;
}>();

defineEmits<{
  (e: 'menuClick', item: any, event: Event, onFinished: () => void): void;
}>();

function onItemSelectionChanged(_item: MsItemModel, _selected: boolean): void {
  props.model.refreshSelection();
}
</script>
