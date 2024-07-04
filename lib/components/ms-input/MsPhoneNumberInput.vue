<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ms-input
    :label="label"
    :placeholder="placeholder"
    id="ms-phone-input"
    type="tel"
    @change="onChange"
    v-model="phoneNumber"
    :maxlength="24"
  />
</template>

<script setup lang="ts">
import { MsInput } from '@lib/components/ms-input';
import { Translatable } from '@lib/services';
import { ref } from 'vue';

interface Props {
  label?: Translatable;
  placeholder?: Translatable;
}

withDefaults(defineProps<Props>(), {
  label: 'lib.components.msPhoneNumberInput.label',
  placeholder: 'lib.components.msPhoneNumberInput.placeholder',
});

const emits = defineEmits<{
  (e: 'change', value: string): void;
}>();

defineExpose({
  setValue,
});

const phoneNumber = ref('');

function setValue(value: string): void {
  phoneNumber.value = value;
}

async function onChange(query: string): Promise<void> {
  emits('change', query);
}
</script>
