<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="address-container">
    <ms-input
      :label="label"
      :placeholder="placeholder"
      id="ms-address-input"
      @change="onChange"
      @on-focus-lost="handleFocusLost"
      @on-focus="handleFocus"
      v-model="address"
      :debounce="timeBeforeQuery"
    />
    <ms-address-dropdown
      v-if="addressesFound.length > 0 && !lostFocus"
      :addresses="addressesFound"
      @address-selected="onAddressSelected"
      class="address-dropdown"
    />
  </div>
</template>

<script setup lang="ts">
import { MsAddressDropdown, MsInput } from '@lib/components';
import { Address, GeoapifyAPI, Translatable } from '@lib/services';
import { ref } from 'vue';

interface Props {
  geoapifyApiKey: string;
  label?: Translatable;
  placeholder?: Translatable;
  minimumQueryLength?: number;
  queryOnFocusLost?: boolean;
  timeBeforeQuery?: number;
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  placeholder: undefined,
  timeBeforeQuery: 1500,
  queryOnFocusLost: false,
  minimumQueryLength: 10,
});

const emits = defineEmits<{
  (e: 'addressSelected', address: Address): void;
  (e: 'change', value: string): void;
}>();

defineExpose({
  setValue,
});

const geoapifyApi = new GeoapifyAPI(props.geoapifyApiKey);
const addressesFound = ref<Array<Address>>([]);
const address = ref('');
const lostFocus = ref(true);
let querying = false;

function handleFocusLost(): void {
  // Wait a bit to let the click event on the dropdown to be processed
  setTimeout(() => {
    lostFocus.value = true;
  }, 100);
}

function handleFocus(): void {
  lostFocus.value = false;
}

function setValue(value: string): void {
  address.value = value;
}

async function doQuery(query: string): Promise<void> {
  querying = true;
  const result = await geoapifyApi.autocomplete(query);
  addressesFound.value = result.slice(0, 5);
  querying = false;
}

async function onChange(query: string): Promise<void> {
  emits('change', query);
  handleFocus();
  if (query.length < props.minimumQueryLength || querying || props.queryOnFocusLost) {
    return;
  }
  await doQuery(query);
}

async function onAddressSelected(addr: Address): Promise<void> {
  addressesFound.value = [];
  address.value = addr.address;
  emits('addressSelected', addr);
}
</script>

<style lang="scss" scoped>
.address-container {
  position: relative;
}
</style>
