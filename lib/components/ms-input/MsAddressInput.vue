<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ms-input
    :label="label"
    :placeholder="placeholder"
    id="ms-address-input"
    @change="onChange"
    @ion-blur="onFocusLost"
    v-model="address"
    :debounce="timeBeforeQuery"
  />
</template>

<script setup lang="ts">
import { popoverController } from '@ionic/vue';
import { MsAddressDropdown, MsModalResult, MsInput } from '@lib/components';
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
const address = ref('');
let querying = false;

function setValue(value: string): void {
  address.value = value;
}

async function doQuery(query: string): Promise<void> {
  querying = true;
  const addressesFound = await geoapifyApi.autocomplete(query);
  if (addressesFound.length === 0) {
    return;
  }
  const popover = await popoverController.create({
    component: MsAddressDropdown,
    cssClass: 'address-dropdown-popover',
    componentProps: {
      // Limit ourselves to the first five
      addresses: addressesFound.slice(0, 5),
    },
    trigger: 'ms-address-input',
    side: 'bottom',
    alignment: 'start',
    showBackdrop: false,
  });
  await popover.present();
  const { role, data } = await popover.onDidDismiss();
  await popover.dismiss();
  if (role === MsModalResult.Confirm && data) {
    querying = false;
    emits('addressSelected', data.address as Address);
  }
  querying = false;
}

async function onFocusLost(): Promise<void> {
  if (address.value.length < props.minimumQueryLength || querying || !props.queryOnFocusLost) {
    return;
  }
  await doQuery(address.value);
}

async function onChange(query: string): Promise<void> {
  emits('change', query);
  if (query.length < props.minimumQueryLength || querying || props.queryOnFocusLost) {
    return;
  }
  await doQuery(query);
}
</script>
