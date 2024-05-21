<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-list class="ms-row-list">
    <ion-list-header
      class="ms-row-list-header"
      lines="full"
    >
      <ion-label
        class="ms-row-list-header__label label-selected"
        v-if="isSelectionEnabled"
      >
        <ms-checkbox
          @change="model.selectAll($event)"
          :checked="model.allSelected.value"
          :indeterminate="model.someSelected.value && !model.allSelected.value"
        />
      </ion-label>
      <ion-label
        v-for="header in headers"
        :key="header.title"
        class="user-list-header__label cell-title label-name"
        :class="header.className"
      >
        {{ $msTranslate(header.title) }}
      </ion-label>
    </ion-list-header>
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
  </ion-list>
</template>

<script setup lang="ts">
import { MsListModel, MsItemModel } from '@lib/components/ms-list/types';
import { MsCheckbox } from '@lib/components';
import { IonListHeader, IonLabel, IonList } from '@ionic/vue';
import type { Component } from 'vue';

const props = defineProps<{
  model: MsListModel<MsItemModel>;
  component: Component;
  isSelectionEnabled?: boolean;
  showOptions?: boolean;
  headers: Array<{ title: string; className?: string }>;
}>();

defineEmits<{
  (e: 'menuClick', item: any, event: Event, onFinished: () => void): void;
}>();

function onItemSelectionChanged(_item: MsItemModel, _selected: boolean): void {
  props.model.refreshSelection();
}
</script>
