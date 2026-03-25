<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <vue-date-picker
    v-bind="$attrs"
    class="datetime-picker"
    :locale="convertedLocale"
    :action-row="{ selectBtnLabel: I18n.translate('lib.components.msDatetimePicker.select') }"
  />
</template>

<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker';
import { Locale, I18n } from '@lib/services';
import { fr, enUS, Locale as DateFnsLocale } from 'date-fns/locale';
import { computed, ComputedRef } from 'vue';

const props = defineProps<{
  locale?: Locale;
}>();

const convertedLocale: ComputedRef<DateFnsLocale> = computed(() => {
  return props.locale === 'fr-FR' ? fr : enUS;
});
</script>

<style lang="scss" scoped></style>
