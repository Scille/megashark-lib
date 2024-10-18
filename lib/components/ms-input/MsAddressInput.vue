<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="address-container">
    <ms-input
      :label="label"
      :placeholder="placeholder"
      id="ms-address-input"
      @change="onChange"
      @on-focus-changed="onFocusChanged"
      v-model="address"
      :debounce="timeBeforeQuery"
    />
    <ms-address-dropdown
      v-if="addressesFound.length > 0 && isFocused"
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
const isFocused = ref(false);
let querying = false;

function onFocusChanged(focused: boolean): void {
  /*
    We hide the dropdown is the focus is lost, but
    an element that is hidden is not clickable. So
    when the user tries to select an address, what happens is:
    Click outside the input > Focus lost > Dropdown hidden > Click not registering
    A little timeout "fixes" the problem.
  */
  setTimeout(() => {
    isFocused.value = focused;
  }, 100);
}

function setValue(value: string): void {
  address.value = value;
}

async function doQuery(query: string): Promise<void> {
  querying = true;
  const result = await geoapifyApi.autocomplete(query);
  addressesFound.value = result.slice(0, 5);
  isFocused.value = true;
  querying = false;
}

async function onChange(query: string): Promise<void> {
  emits('change', query);
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
