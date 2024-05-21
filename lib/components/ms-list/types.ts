// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { Ref, ref } from 'vue';

export interface MsItemModel {
  isSelected: boolean;
  isSelectable: boolean;
  isDisabled: boolean;

  getUniqueId(): number | string;
}

export class MsListModel<T extends MsItemModel> {
  items: Array<T>;
  someSelected: Ref<boolean>;
  allSelected: Ref<boolean>;

  constructor(items: Array<T> = []) {
    this.items = items;
    this.someSelected = ref(false);
    this.allSelected = ref(false);
  }

  selectAll(select: boolean): void {
    for (const item of this.items) {
      if (item.isSelectable && !item.isDisabled) {
        item.isSelected = select;
      }
    }
    this.refreshSelection();
  }

  getItems(): Array<T> {
    return this.items;
  }

  getItemsCount(): number {
    return this.items.length;
  }

  refreshSelection(): void {
    const selectedCount = this.items.filter((item) => item.isSelected).length;
    this.someSelected.value = selectedCount > 0;
    this.allSelected.value = selectedCount > 0 && selectedCount === this.items.filter((item) => item.isSelectable).length;
  }

  getItem(searchFunction: (i: T) => boolean): T | undefined {
    return this.items.find(searchFunction);
  }

  clear(): void {
    this.items = [];
    this.refreshSelection();
  }

  append(item: T): void {
    this.items.push(item);
    this.refreshSelection();
  }

  replace(items: Array<T>): void {
    this.items = items;
    this.refreshSelection();
  }
}
