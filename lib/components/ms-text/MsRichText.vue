<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <span
    v-html="
      typeof text === 'string'
        ? t(text, { escapeParameter: true })
        : t(text.key, text.data as any | undefined, { plural: text.count, escapeParameter: true })
    "
  />
</template>

<script setup lang="ts">
import { Translatable } from '@lib/services';
import { useI18n } from 'vue-i18n';

defineProps<{
  text: Translatable;
}>();

const i18n = useI18n();
i18n.warnHtmlMessage = false;
const { t } = i18n;
</script>

<style scoped lang="scss"></style>
