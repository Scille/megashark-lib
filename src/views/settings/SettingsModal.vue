<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ms-modal
    :title="'usage.components.modals.settings.pageTitle'"
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
                  {{ $msTranslate('usage.components.modals.settings.general') }}
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
                  {{ $msTranslate('usage.components.modals.settings.advanced') }}
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
                  :title="'usage.components.modals.settings.language.label'"
                  :description="'usage.components.modals.settings.language.description'"
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
                  :title="'usage.components.modals.settings.theme.label'"
                  :description="'usage.components.modals.settings.theme.description'"
                >
                  <ms-dropdown
                    class="dropdown"
                    :options="themeOptions"
                    :default-option-key="themeManager.theme"
                    @change="themeManager.use($event.option.key)"
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
import { Locale, I18n, LocaleOptions, Theme, ThemeManager, ThemeOptions } from '@lib/services';
import { IonIcon, IonList, IonPage, IonRadio, IonRadioGroup, IonText } from '@ionic/vue';
import { cog, options } from 'ionicons/icons';
import { ref } from 'vue';

const languageOptions: MsOptions = new MsOptions(LocaleOptions);
const themeOptions: MsOptions = new MsOptions(ThemeOptions);
const themeManager = new ThemeManager(Theme.Light);

enum SettingsTabs {
  General = 'General',
  Advanced = 'Advanced',
}
const settingTab = ref(SettingsTabs.General);
const locale = ref('en-US');

async function changeLang(lang: Locale): Promise<void> {
  locale.value = lang;
  I18n.changeLocale(lang);
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
