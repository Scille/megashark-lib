<template>
  <ion-title class="title-h1 main-title">{{ $msTranslate('usage.services.title') }}</ion-title>

  <!-- translation -->
  <example-block title="usage.services.translation.title">
    <example-block-line>
      <ms-dropdown
        class="dropdown"
        :options="localeOptions"
        :default-option-key="I18n.getLocale()"
        @change="changeLocale"
      />
      100.00 => {{ $msFormatCurrency(100.0) }}<br />
      13.37 => {{ $msFormatCurrency(13.37) }}<br />
      10000000 => {{ $msFormatCurrency(10000000) }}
    </example-block-line>
  </example-block>

  <!-- Theme -->
  <example-block title="usage.services.theme.title">
    <example-block-line>
      <ms-dropdown
        class="dropdown"
        :options="msThemeOptions"
        :default-option-key="themeManager.theme"
        @change="themeManager.use($event.option.key)"
      />
    </example-block-line>
  </example-block>

  <!-- toast-->
  <example-block title="usage.services.toast.title">
    <example-block-line>
      <ms-input
        label="usage.services.toast.offset"
        v-model="toastOffset"
      />
      <ms-dropdown
        class="dropdown"
        title="usage.services.toast.themeTitle"
        :options="msDropdownOptions"
        :default-option-key="toastTheme"
        @change="toastTheme = $event.option.key"
      />
      <ion-button @click="openToast">
        {{ $msTranslate('usage.services.toast.open') }}
      </ion-button>
      <ion-button @click="openToast(true)">
        {{ $msTranslate('usage.services.toast.openSmall') }}
      </ion-button>
    </example-block-line>
  </example-block>

  <!-- base64 -->
  <example-block title="usage.services.base64.encodeTitle">
    <example-block-line>
      <ms-input v-model="b64BaseString" />
      <ion-button
        @click="encodeToB64"
        :disabled="b64BaseString.length === 0"
      >
        {{ $msTranslate('usage.services.base64.encode') }}
      </ion-button>
      {{ b64EncodedResult }}
    </example-block-line>
  </example-block>
  <example-block title="usage.services.base64.decodeTitle">
    <example-block-line>
      <ms-input v-model="b64EncodedString" />
      <ion-button
        @click="decodeFromB64"
        :disabled="b64EncodedString.length === 0"
      >
        {{ $msTranslate('usage.services.base64.decode') }}
      </ion-button>
      {{ b64DecodedResult }}
    </example-block-line>
  </example-block>
</template>

<script setup lang="ts">
import { IonButton, IonTitle } from '@ionic/vue';
import { MsDropdown, MsInput, MsOptions, MsReportTheme, MsDropdownChangeEvent } from '@lib/components';
import { inject, ref } from 'vue';
import { I18n, LocaleOptions, ThemeOptions, ToastManager, Theme, ThemeManager, StripeService, StripeServiceKey } from '@lib/services';
import { Base64 } from '@lib/main';
import { ExampleBlock, ExampleBlockLine } from '@/views/example-block';

const msDropdownOptions: MsOptions = new MsOptions([
  {
    key: MsReportTheme.Info,
    label: 'usage.msReportTheme.info',
  },
  {
    key: MsReportTheme.Warning,
    label: 'usage.msReportTheme.warning',
  },
  {
    key: MsReportTheme.Error,
    label: 'usage.msReportTheme.error',
  },
  {
    key: MsReportTheme.Success,
    label: 'usage.msReportTheme.success',
  },
]);

const localeOptions: MsOptions = new MsOptions(LocaleOptions);
const msThemeOptions: MsOptions = new MsOptions(ThemeOptions);

const stripeService: StripeService = inject(StripeServiceKey)!;
const toastOffset = ref('0');
const toastManager = new ToastManager();
const toastTheme = ref(MsReportTheme.Success);
const themeManager = new ThemeManager(Theme.Light);
const b64BaseString = ref('/a/Ñ/ĩ');
const b64EncodedString = ref('');
const b64DecodedResult = ref('');
const b64EncodedResult = ref('');

function encodeToB64(): void {
  b64EncodedResult.value = Base64.encode(b64BaseString.value);
}

function decodeFromB64(): void {
  b64DecodedResult.value = Base64.decode(b64EncodedString.value);
}

async function openToast(smallDisplay?: boolean): Promise<void> {
  document.documentElement.style.setProperty('--ms-toast-offset', `${toastOffset.value}px`);

  await toastManager.createAndPresent({
    title: 'usage.services.toast.messageTitle',
    message: 'usage.services.toast.message',
    theme: toastTheme.value,
    smallDisplay: smallDisplay,
  });
}

async function changeLocale(event: MsDropdownChangeEvent): Promise<void> {
  I18n.changeLocale(event.option.key);
  stripeService.updateLocale(event.option.key);
}
</script>

<style scoped lang="scss">
.main-title {
  text-align: center;
  margin: 0;
  padding: 0;
  color: var(--parsec-color-light-primary-800);
}
</style>
