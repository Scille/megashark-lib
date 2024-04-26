<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
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
          </ms-action-bar>
        </ion-item-divider>
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.dropdown.title') }}</ion-label>
          <ms-dropdown
            class="dropdown"
            :options="msDropdownOptions"
            :default-option-key="MsReportTheme.Info"
            @change="changeOption($event.option.key)"
          />
        </ion-item-divider>
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.image.title') }}</ion-label>
          <div class="example-data">
            <ms-image :image="EmptyFolder" />
            <ms-image :image="SwapArrows" />
            <ms-image :image="NoNotification" />
            <ms-image :image="NoImportInProgress" />
          </div>
        </ion-item-divider>
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.inputs.title') }}</ion-label>
          <ion-item-divider class="example-divider">
            <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msInput.title') }}</ion-label>
            <ms-input
              label="CreateOrganization.fullname"
              placeholder="CreateOrganization.fullnamePlaceholder"
              name="inputExample"
              v-model="inputExample"
              @change="$emit('fieldUpdate')"
              @on-enter-keyup="$emit('onEnterKeyup', $event)"
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
              label="Password.password"
              v-model="passwordInputExample"
              name="passwordInputExample"
              @on-enter-keyup="$emit('onEnterKeyup', $event)"
            />
          </ion-item-divider>
          <ion-item-divider class="example-divider">
            <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msChoosePasswordInput.title') }}</ion-label>
            <ms-choose-password-input
              password-label="Password.newPassword"
              @on-enter-keyup="onEnterKeyup($event)"
              ref="choosePasswordInput"
            />
          </ion-item-divider>
        </ion-item-divider>
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.sorter.title') }}</ion-label>
          <ms-sorter
            :options="msSorterOptions"
            default-option="name"
            :sorter-labels="msSorterLabels"
            @change="onSortChange($event)"
          />
          <div class="example-data">
            <div
              v-for="item in msSorterExampleData"
              :key="item.name"
            >
              <ion-label>{{ $msTranslate('usage.components.sorter.name') }}: {{ item.name }}</ion-label>
              <ion-label
                >{{ $msTranslate('usage.components.sorter.birthDate') }}:
                {{ $msTranslate(I18n.formatDate(item.birthDate, 'short')) }}</ion-label
              >
              <ion-label>{{ $msTranslate('usage.components.sorter.age') }}: {{ item.age }}</ion-label>
            </div>
          </div>
        </ion-item-divider>
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.spinner.title') }}</ion-label>
          <ms-spinner title="lib.components.msSpinner.loading" />
        </ion-item-divider>
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.stepper.title') }}</ion-label>
          ms-wizard-stepper
        </ion-item-divider>
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.informativeText.title') }}</ion-label>
          <ms-informative-text>
            {{ $msTranslate('ExportRecoveryDevicePage.subtitles.newPassword') }}
          </ms-informative-text>
        </ion-item-divider>
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.reportText.title') }}</ion-label>
          <ms-report-text :theme="msReportTheme">
            {{ $msTranslate('Authentication.keyringInfo') }}
          </ms-report-text>
        </ion-item-divider>
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.informationTooltip.title') }}</ion-label>
          <ms-information-tooltip
            :text="$msTranslate('FoldersPage.ImportFile.failedDetails')"
            class="information-icon"
            slot="end"
          />
        </ion-item-divider>
        <ion-item-divider class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.gridListToggle.title') }}</ion-label>
          <ms-grid-list-toggle
            v-model="displayView"
            @update:model-value="onDisplayStateChange($event)"
          />
        </ion-item-divider>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonLabel, IonPage, IonItemDivider, modalController } from '@ionic/vue';
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
  MsGridListToggle,
  MsInformationTooltip,
  MsOptions,
  askQuestion,
  getPasswordFromUser,
  getTextFromUser,
  EmptyFolder,
  DisplayState,
  MsReportTheme,
  MsAlertModalConfig,
  MsSorterChangeEvent,
  NoNotification,
  NoImportInProgress,
  SwapArrows,
} from '@lib/components';
import { I18n } from '@lib/services/translation';
import { DateTime } from 'luxon';
import { ref, Ref } from 'vue';
import SettingsModal from './settings/SettingsModal.vue';

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

const inputExample = ref('');
const passwordInputExample = ref('');
const searchIInputExample = ref('');
const displayView = ref(DisplayState.List);
const msReportTheme = ref(MsReportTheme.Info);

const msSorterOptions: MsOptions = new MsOptions([
  { label: 'usage.components.sorter.name', key: 'name' },
  { label: 'usage.components.sorter.birthDate', key: 'birthDate' },
  { label: 'usage.components.sorter.age', key: 'age' },
]);

const msSorterLabels = {
  asc: 'FoldersPage.sort.asc',
  desc: 'FoldersPage.sort.desc',
};
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
    title: 'PasswordInputModal.passwordNeeded',
    subtitle: { key: 'PasswordInputModal.enterPassword' },
    inputLabel: 'PasswordInputModal.password',
    okButtonText: 'PasswordInputModal.validate',
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
    title: 'UsersPage.CreateUserInvitationModal.pageTitle',
    trim: true,
    inputLabel: 'UsersPage.CreateUserInvitationModal.label',
    placeholder: 'UsersPage.CreateUserInvitationModal.placeholder',
    okButtonText: 'UsersPage.CreateUserInvitationModal.create',
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

function onDisplayStateChange(event: any): void {
  console.log('onDisplayStateChange', event);
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
}
</style>
