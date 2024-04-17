<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ms-modal
    :title="'SettingsModal.pageTitle'"
    :close-button="{ visible: true }"
  >
    <ion-page class="page">
      <!-- content -->
      <div class="page-content">
        <div class="menu">
          <!-- menu list -->
          <ion-radio-group
            v-model="settingTab"
            :value="SettingsTabs.General"
            class="menu-list"
          >
            <ion-radio
              slot="start"
              :value="SettingsTabs.General"
              class="menu-list__item"
            >
              <div class="item-container">
                <ion-icon :icon="cog" />
                <ion-text class="body">
                  {{ $msTranslate('SettingsModal.general') }}
                </ion-text>
              </div>
            </ion-radio>
            <ion-radio
              slot="start"
              :value="SettingsTabs.Advanced"
              class="menu-list__item"
              v-show="false"
            >
              <div class="item-container">
                <ion-icon :icon="options" />
                <ion-text class="body">
                  {{ $msTranslate('SettingsModal.advanced') }}
                </ion-text>
              </div>
            </ion-radio>
          </ion-radio-group>
          <!-- list item content -->
          <div class="menu-item-content">
            <!-- general -->
            <div
              v-if="settingTab === SettingsTabs.General"
              class="settings-general"
            >
              <ion-list class="settings-list">
                <!-- change lang -->
                <settings-option
                  :title="'SettingsModal.language.label'"
                  :description="'SettingsModal.language.description'"
                >
                  <ms-dropdown
                    class="dropdown"
                    :options="languageOptions"
                    :default-option-key="I18n.getLocale()"
                    @change="changeLang($event.option.key)"
                  />
                </settings-option>
                <!-- change theme -->
                <settings-option
                  :title="'SettingsModal.theme.label'"
                  :description="'SettingsModal.theme.description'"
                >
                  <ms-dropdown
                    class="dropdown"
                    :options="themeOptions"
                    :default-option-key="theme"
                    @change="changeTheme($event.option.key)"
                  />
                </settings-option>
              </ion-list>
            </div>
          </div>
        </div>
      </div>
    </ion-page>
  </ms-modal>
</template>

<script setup lang="ts">
import { MsDropdown, MsModal, MsOptions } from '@lib/components';
import SettingsOption from '@/views/settings/SettingsOption.vue';
import { Locale, I18n } from '@lib/services/translation';
import { toggleDarkMode } from '@lib/states/darkMode';
import { IonIcon, IonList, IonPage, IonRadio, IonRadioGroup, IonText } from '@ionic/vue';
import { cog, options } from 'ionicons/icons';
import { ref } from 'vue';

const languageOptions: MsOptions = new MsOptions([
  {
    key: 'en-US',
    label: 'SettingsModal.language.values.enUS',
  },
  {
    key: 'fr-FR',
    label: 'SettingsModal.language.values.frFR',
  },
]);

const themeOptions: MsOptions = new MsOptions([
  {
    key: 'dark',
    label: 'SettingsModal.theme.values.dark',
  },
  {
    key: 'light',
    label: 'SettingsModal.theme.values.light',
  },
  {
    key: 'system',
    label: 'SettingsModal.theme.values.system',
  },
]);

enum SettingsTabs {
  General = 'General',
  Advanced = 'Advanced',
}
const settingTab = ref(SettingsTabs.General);
const theme = ref('light');
const locale = ref('en-US');

async function changeLang(lang: Locale): Promise<void> {
  locale.value = lang;
  I18n.changeLocale(lang);
}

async function changeTheme(selectedTheme: string): Promise<void> {
  theme.value = selectedTheme;
  toggleDarkMode(selectedTheme);
}
</script>

<style lang="scss" scoped>
.page {
  --border-radius: var(--parsec-radius-8);
  --background: none;

  &-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .menu {
    display: flex;
    gap: 2rem;
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 11.25rem;

    // eslint-disable-next-line vue-scoped-css/no-unused-selector
    &__item {
      color: var(--parsec-color-light-secondary-grey);
      border-radius: var(--parsec-radius-6);

      .item-container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 0.75em;
        gap: 0.375rem;
      }

      &::part(container) {
        display: none;
      }

      &.radio-checked {
        color: var(--parsec-color-light-primary-600);
        background: var(--parsec-color-light-primary-30);
        box-shadow: inset 0px 0px 0px 1px var(--parsec-color-light-primary-600);
      }

      &:hover:not(.radio-checked) {
        background: var(--parsec-color-light-secondary-premiere);
        color: var(--parsec-color-light-secondary-text);
      }

      ion-icon {
        font-size: 1.25rem;
      }
    }
  }

  .menu-item-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 40rem;

    .settings-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding-top: 0px;
      padding-bottom: 0px;
    }
  }

  .dropdown {
    width: var(--popover-dropdown-settings-width);
  }
}
</style>
