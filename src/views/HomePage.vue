<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <!-- translation -->
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.translation.title') }}</ion-label>
          <ms-dropdown
            class="dropdown"
            :options="localeOptions"
            :default-option-key="I18n.getLocale()"
            @change="I18n.changeLocale($event.option.key)"
          />
        </ion-item-divider>

        <!-- Theme -->
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.theme.title') }}</ion-label>
          <ms-dropdown
            class="dropdown"
            :options="msThemeOptions"
            :default-option-key="themeManager.theme"
            @change="themeManager.use($event.option.key)"
          />
        </ion-item-divider>
        <!-- action-bar -->
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.actionBar.title') }}</ion-label>
          <ms-action-bar id="ms-action-bar-example">
            <ms-action-bar-button
              id="action-bar-button-example"
              button-label="usage.components.actionBar.buttons.alert.title"
              :icon="warning"
              @click="openAlertModal()"
            />
            <ms-action-bar-button
              id="action-bar-button-example"
              button-label="usage.components.actionBar.buttons.askQuestion.title"
              :icon="helpCircle"
              @click="openQuestionModal()"
            />
            <ms-action-bar-button
              id="action-bar-button-example"
              button-label="usage.components.actionBar.buttons.getText.title"
              :icon="create"
              @click="openTextInputModal()"
            />
            <ms-action-bar-button
              id="action-bar-button-example"
              button-label="usage.components.actionBar.buttons.getPassword.title"
              :icon="lockClosed"
              @click="openPasswordInputModal()"
            />
            <ms-action-bar-button
              id="action-bar-button-example"
              button-label="usage.components.actionBar.buttons.settings.title"
              :icon="cog"
              @click="openSettingsModal()"
            />
            <ms-action-bar-button
              id="action-bar-button-example"
              button-label="usage.components.actionBar.buttons.importDocument.title"
              :image="DocumentImport"
            />
          </ms-action-bar>
        </ion-item-divider>

        <!-- dropdown -->
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.dropdown.title') }}</ion-label>
          <ms-dropdown
            class="dropdown"
            :options="msDropdownOptions"
            :default-option-key="MsReportTheme.Info"
            @change="changeOption($event.option.key)"
          />
        </ion-item-divider>

        <!-- images -->
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.image.title') }}</ion-label>
          <div class="example-data">
            <ms-image :image="ChevronExpand" />
            <ms-image :image="Device" />
            <ms-image :image="DocumentImport" />
            <ms-image :image="EmptyFolder" />
            <ms-image :image="FileImport" />
            <ms-image :image="Folder" />
            <ms-image :image="LogoIconGradient" />
            <ms-image :image="LogoRowWhite" />
            <ms-image :image="NoActiveUser" />
            <ms-image :image="NoImportDone" />
            <ms-image :image="NoImportError" />
            <ms-image :image="NoImportInProgress" />
            <ms-image :image="NoInvitation" />
            <ms-image :image="NoNotification" />
            <ms-image :image="NoOrganization" />
            <ms-image :image="NoRevokedUser" />
            <ms-image :image="NoWorkspace" />
            <ms-image :image="PasswordLock" />
            <ms-image :image="SwapArrows" />
            <ms-image :image="WavyCaretUp" />
          </div>
        </ion-item-divider>

        <!-- inputs -->
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.inputs.title') }}</ion-label>
          <ion-item-divider class="example-divider">
            <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msInput.title') }}</ion-label>
            <ms-input
              label="usage.components.inputs.msInput.label"
              placeholder="usage.components.inputs.msInput.placeholder"
              name="inputExample"
              v-model="inputExample"
            />
          </ion-item-divider>
          <ion-item-divider class="example-divider">
            <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msSearchInput.title') }}</ion-label>
            <ms-search-input
              placeholder="lib.components.msSearchInput.placeholder"
              v-model="searchIInputExample"
              id="searchInputExample"
            />
          </ion-item-divider>
          <ion-item-divider class="example-divider">
            <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msPasswordInput.title') }}</ion-label>
            <ms-password-input
              label="usage.components.inputs.msPasswordInput.label"
              v-model="passwordInputExample"
              name="passwordInputExample"
            />
          </ion-item-divider>
          <ion-item-divider class="example-divider">
            <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msChoosePasswordInput.title') }}</ion-label>
            <ms-choose-password-input
              password-label="usage.components.inputs.msChoosePasswordInput.label"
              @on-enter-keyup="onEnterKeyup($event)"
              ref="choosePasswordInput"
            />
          </ion-item-divider>
        </ion-item-divider>

        <!-- sorter -->
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.sorter.title') }}</ion-label>
          <ms-sorter
            :options="msSorterOptions"
            default-option="name"
            @change="onSortChange($event)"
          />
          <div class="example-data">
            <div
              v-for="item in msSorterExampleData"
              :key="item.name"
            >
              <ion-label>{{ $msTranslate('usage.components.sorter.name') }}: {{ item.name }}</ion-label>
              <ion-label>
                {{ $msTranslate('usage.components.sorter.birthDate') }}:
                {{ $msTranslate(I18n.formatDate(item.birthDate, 'short')) }}
              </ion-label>
              <ion-label>{{ $msTranslate('usage.components.sorter.age') }}: {{ item.age }}</ion-label>
            </div>
          </div>
        </ion-item-divider>

        <!-- spinner -->
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.spinner.title') }}</ion-label>
          <ms-spinner title="lib.components.msSpinner.loading" />
        </ion-item-divider>

        <!-- steppers -->
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.stepper.title') }}</ion-label>
          ms-wizard-stepper
        </ion-item-divider>

        <!-- informative-text -->
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.informativeText.title') }}</ion-label>
          <ms-informative-text>
            {{ $msTranslate('usage.components.informativeText.message') }}
          </ms-informative-text>
        </ion-item-divider>

        <!-- report-text -->
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.reportText.title') }}</ion-label>
          <ms-report-text :theme="msReportTheme">
            <i18n-t
              keypath="usage.components.reportText.message"
              scope="global"
            >
              <template #important>
                <strong>{{ $msTranslate('usage.components.reportText.important') }}</strong>
              </template>
            </i18n-t>
          </ms-report-text>
        </ion-item-divider>

        <!-- information-tooltip -->
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.informationTooltip.title') }}</ion-label>
          <ms-information-tooltip
            :text="$msTranslate('usage.components.informationTooltip.message')"
            class="information-icon"
            slot="end"
          />
        </ion-item-divider>

        <!-- toast-->
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.toast.title') }}</ion-label>
          <div class="example-data">
            <ms-input
              label="usage.components.toast.offset"
              v-model="toastOffset"
            />
            <ms-dropdown
              class="dropdown"
              title="usage.components.toast.themeTitle"
              :options="msDropdownOptions"
              :default-option-key="toastTheme"
              @change="toastTheme = $event.option.key"
            />
            <ion-button @click="openToast">
              {{ $msTranslate('usage.components.toast.open') }}
            </ion-button>
          </div>
        </ion-item-divider>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonLabel, IonPage, IonItemDivider, modalController, IonButton } from '@ionic/vue';
import { cog, create, lockClosed, helpCircle, warning } from 'ionicons/icons';
import {
  MsActionBar,
  MsActionBarButton,
  MsDropdown,
  MsImage,
  MsChoosePasswordInput,
  MsInput,
  MsPasswordInput,
  MsSearchInput,
  MsAlertModal,
  MsSorter,
  MsSpinner,
  MsInformativeText,
  MsReportText,
  MsInformationTooltip,
  MsOptions,
  askQuestion,
  getPasswordFromUser,
  getTextFromUser,
  EmptyFolder,
  MsReportTheme,
  MsAlertModalConfig,
  MsSorterChangeEvent,
  NoNotification,
  NoImportInProgress,
  SwapArrows,
  Device,
  FileImport,
  Folder,
  LogoIconGradient,
  LogoRowWhite,
  NoActiveUser,
  NoImportDone,
  NoImportError,
  NoInvitation,
  NoOrganization,
  NoRevokedUser,
  NoWorkspace,
  PasswordLock,
  WavyCaretUp,
  ChevronExpand,
  DocumentImport,
} from '@lib/components';
import { I18n, LocaleOptions } from '@lib/services/translation';
import { DateTime } from 'luxon';
import { ref, Ref } from 'vue';
import SettingsModal from '@/views/settings/SettingsModal.vue';
import { ThemeOptions, ToastManager } from '@lib/services';
import { Theme, ThemeManager } from '@lib/services';

const msDropdownOptions: MsOptions = new MsOptions([
  {
    key: MsReportTheme.Info,
    label: 'usage.components.msReportTheme.info',
  },
  {
    key: MsReportTheme.Warning,
    label: 'usage.components.msReportTheme.warning',
  },
  {
    key: MsReportTheme.Error,
    label: 'usage.components.msReportTheme.error',
  },
  {
    key: MsReportTheme.Success,
    label: 'usage.components.msReportTheme.success',
  },
]);

const localeOptions: MsOptions = new MsOptions(LocaleOptions);
const msThemeOptions: MsOptions = new MsOptions(ThemeOptions);

const inputExample = ref('');
const passwordInputExample = ref('');
const searchIInputExample = ref('');
const msReportTheme = ref(MsReportTheme.Info);
const toastOffset = ref('0');
const toastManager = new ToastManager();
const toastTheme = ref(MsReportTheme.Success);
const themeManager = new ThemeManager(Theme.Light);

const msSorterOptions: MsOptions = new MsOptions([
  { label: 'usage.components.sorter.name', key: 'name' },
  { label: 'usage.components.sorter.birthDate', key: 'birthDate' },
  { label: 'usage.components.sorter.age', key: 'age' },
]);

interface MsSorterExampleData {
  name: string;
  birthDate: DateTime;
  age: number;
}

const msSorterExampleData: Ref<MsSorterExampleData[]> = ref([
  { name: 'Jack', birthDate: DateTime.utc(2004, 1, 1), age: 20 },
  { name: 'Jane', birthDate: DateTime.utc(1999, 1, 1), age: 25 },
  { name: 'John', birthDate: DateTime.utc(1994, 1, 1), age: 30 },
]);

const alertModalConfig: Ref<MsAlertModalConfig> = ref({
  theme: msReportTheme.value,
  message: 'alert example',
});

function changeOption(key: MsReportTheme): void {
  msReportTheme.value = key;
  alertModalConfig.value.theme = key;
}

function onEnterKeyup(event: any): void {
  console.log('onEnterKeyup', event);
}

async function openSettingsModal(): Promise<void> {
  const modal = await modalController.create({
    component: SettingsModal,
    cssClass: 'settings-modal',
  });
  await modal.present();
  await modal.onWillDismiss();
  await modal.dismiss();
}

async function openAlertModal(): Promise<void> {
  const modal = await modalController.create({
    component: MsAlertModal,
    canDismiss: true,
    cssClass: 'information-modal',
    componentProps: alertModalConfig.value,
  });
  await modal.present();
  await modal.onWillDismiss();
  await modal.dismiss();
}

async function openPasswordInputModal(): Promise<void> {
  await getPasswordFromUser({
    title: 'usage.components.modals.getPassword.passwordNeeded',
    subtitle: { key: 'usage.components.modals.getPassword.enterPassword' },
    inputLabel: 'usage.components.modals.getPassword.password',
    okButtonText: 'usage.components.modals.getPassword.validate',
  });
}

async function openQuestionModal(): Promise<void> {
  await askQuestion('title', 'subtitle', {
    yesIsDangerous: true,
    yesText: 'yes',
    noText: 'no',
  });
}

async function openTextInputModal(): Promise<void> {
  await getTextFromUser({
    title: 'usage.components.modals.askQuestion.title',
    trim: true,
    inputLabel: 'usage.components.modals.askQuestion.label',
    placeholder: 'usage.components.modals.askQuestion.placeholder',
    okButtonText: 'usage.components.modals.askQuestion.create',
  });
}

function onSortChange(event: MsSorterChangeEvent): void {
  const sortKey = event.option.key as keyof MsSorterExampleData;
  msSorterExampleData.value.sort((a, b) => {
    if (event.sortByAsc) {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    } else {
      return a[sortKey] < b[sortKey] ? 1 : -1;
    }
  });
}

async function openToast(): Promise<void> {
  document.documentElement.style.setProperty('--ms-toast-offset', `${toastOffset.value}px`);

  await toastManager.createAndPresent({
    title: 'usage.components.toast.messageTitle',
    message: 'usage.components.toast.message',
    theme: toastTheme.value,
  });
}
</script>

<style scoped>
.example-divider {
  margin: 0.5rem;
  padding: 0.75em 1em;
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: var(--parsec-color-light-secondary-background);
  border: 1px solid var(--parsec-color-light-secondary-disabled);
  border-radius: var(--parsec-radius-12);
  width: -webkit-fill-available;
  --inner-padding-end: 0;
}

.example-data {
  display: flex;
  align-items: center;
  margin: 0.5rem;
  gap: 2.5em;
  flex-wrap: wrap;
}
</style>
