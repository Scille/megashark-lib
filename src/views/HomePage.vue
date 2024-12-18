<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-title class="title-h1-xl main-title">{{ $msTranslate('usage.title') }}</ion-title>
        <ion-title class="title-h1 main-title">{{ $msTranslate('usage.components.title') }}</ion-title>
        <!-- translation -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.translation.title') }}</ion-label>
          <div class="example-divider-content">
            <ms-dropdown
              class="dropdown"
              :options="localeOptions"
              :default-option-key="I18n.getLocale()"
              @change="changeLocale"
            />
          </div>
        </div>

        <!-- toggle -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.toggle.title') }}</ion-label>
          <div class="example-divider-content">
            <ms-boolean-toggle v-model="referenceValue" />
          </div>
        </div>

        <!-- Theme -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.theme.title') }}</ion-label>
          <div class="example-divider-content">
            <ms-dropdown
              class="dropdown"
              :options="msThemeOptions"
              :default-option-key="themeManager.theme"
              @change="themeManager.use($event.option.key)"
            />
          </div>
        </div>

        <!-- action-bar -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.actionBar.title') }}</ion-label>
          <div class="example-divider-content">
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
                :is-dropdown="true"
              />
            </ms-action-bar>
          </div>
        </div>

        <!-- progress bar -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.progressBar.title') }}</ion-label>
          <div class="example-divider-content">
            <ms-progress
              :progress="progress"
              :appearance="MsProgressAppearance.Bar"
              class="ms-progress"
            />
          </div>
          <div class="example-divider-content">
            <ms-progress
              :progress="progress"
              :appearance="MsProgressAppearance.Line"
              class="ms-progress"
            />
          </div>
          <div class="example-divider-content">
            <ms-progress
              :progress="progress"
              :appearance="MsProgressAppearance.ProgressBar"
              class="ms-progress"
            />
          </div>
        </div>

        <!-- dropdown -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.dropdown.title') }}</ion-label>
          <div class="example-divider-content">
            <ms-dropdown
              class="dropdown"
              :options="msDropdownOptions"
              :default-option-key="MsReportTheme.Info"
              @change="changeOption($event.option.key)"
            />
          </div>
        </div>

        <!-- images -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.image.title') }}</ion-label>
          <div class="example-divider-content">
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
          </div>
        </div>

        <!-- inputs -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.inputs.title') }}</ion-label>
          <div class="example-divider-content">
            <div class="example-divider-item">
              <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msInput.title') }}</ion-label>
              <ms-input
                label="usage.components.inputs.msInput.label"
                placeholder="usage.components.inputs.msInput.placeholder"
                name="inputExample"
                v-model="inputExample"
                ref="msInputRef"
                :validator="emailValidator"
              />
              <span v-if="msInputRef">
                {{ $msTranslate('usage.components.inputs.msInput.isValidEmail') }}
                {{ $msTranslate({ key: 'usage.components.inputs.msInput.validity', count: msInputRef.validity }) }}
              </span>
            </div>
            <div class="example-divider-item">
              <ms-textarea
                label="usage.components.inputs.msTextarea.label"
                placeholder="usage.components.inputs.msTextarea.placeholder"
                name="textareaExample"
                v-model="textareaExample"
                :maxlength="100"
                :show-count="true"
              />
            </div>
            <div class="example-divider-item">
              <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msSearchInput.title') }}</ion-label>
              <ms-search-input
                placeholder="lib.components.msSearchInput.placeholder"
                v-model="searchInputExample"
                :debounce="500"
                id="searchInputExample"
              />
              {{ searchInputExample }}
            </div>
            <div class="example-divider-item">
              <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msPasswordInput.title') }}</ion-label>
              <ms-password-input
                label="usage.components.inputs.msPasswordInput.label"
                v-model="passwordInputExample"
                name="passwordInputExample"
              />
            </div>
            <div class="example-divider-item">
              <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msChoosePasswordInput.title') }}</ion-label>
              <ms-choose-password-input
                password-label="usage.components.inputs.msChoosePasswordInput.label"
                @on-enter-keyup="onEnterKeyup($event)"
                ref="choosePasswordInput"
              />
            </div>
            <div class="example-divider-item">
              <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msPhoneNumberInput.title') }}</ion-label>
              <ms-phone-number-input
                @on-enter-keyup="onEnterKeyup($event)"
                ref="phoneNumberInput"
              />
            </div>
          </div>
        </div>

        <!-- sorter -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.sorter.title') }}</ion-label>
          <div class="example-divider-content">
            <ms-sorter
              :options="msSorterOptions"
              default-option="name"
              :sorter-labels="{ asc: 'Asc', desc: 'Desc' }"
              :sort-by-asc="false"
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
          </div>
        </div>

        <!-- checkbox -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.checkbox.title') }}</ion-label>
          <div class="example-divider-content">
            <ms-checkbox
              v-model="checkboxValue"
              label="usage.components.checkbox.label"
            />
            {{ $msTranslate('usage.components.checkbox.value') }} {{ checkboxValue }}
          </div>
        </div>

        <!-- spinner -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.spinner.title') }}</ion-label>
          <div class="example-divider-content">
            <ms-spinner title="lib.components.msSpinner.loading" />

            <ion-button @click="openSpinnerModal">
              {{ $msTranslate('usage.components.spinner.openModal') }}
            </ion-button>
          </div>
        </div>

        <!-- steppers -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.stepper.title') }}</ion-label>
          <div class="example-divider-content">ms-wizard-stepper</div>
        </div>

        <!-- informative-text -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.informativeText.title') }}</ion-label>
          <div class="example-divider-content">
            <ms-informative-text>
              {{ $msTranslate('usage.components.informativeText.message') }}
            </ms-informative-text>
          </div>
        </div>

        <!-- report-text -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.reportText.title') }}</ion-label>
          <div class="example-divider-content">
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
          </div>
        </div>

        <!-- information-tooltip -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.informationTooltip.title') }}</ion-label>
          <div class="example-divider-content">
            <ms-information-tooltip
              :text="$msTranslate('usage.components.informationTooltip.message')"
              class="information-icon"
              slot="end"
            />
          </div>
        </div>

        <!-- toast-->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.toast.title') }}</ion-label>
          <div class="example-divider-content">
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
          </div>
        </div>

        <!-- code validation -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.codeValidation.title') }}</ion-label>
          <div class="example-divider-content">
            <ms-code-validation-input
              :code-length="VALID_CODE.length"
              :validation-function="validationFunction"
            />
          </div>
        </div>

        <!-- address validation -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.address.title') }}</ion-label>
          <div class="example-divider-content">
            <div class="example-data">
              <ms-address-input
                class="address-input"
                ref="addressInput"
                label="usage.components.address.label"
                placeholder="usage.components.address.placeholder"
                @address-selected="onAddressSelected"
                :geoapify-api-key="GEOAPIFY_MOCKED_API_KEY"
              />
            </div>
          </div>
        </div>

        <!-- credit card -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.stripe.title') }}</ion-label>
          <template v-if="stripeService.isInitialized()">
            <div class="example-divider-content credit-card-content">
              <ms-checkbox v-model="cardRequireName">
                {{ $msTranslate('usage.components.stripe.requireNameLabel') }}
              </ms-checkbox>
              <div class="example-data">
                <ms-stripe-card-form
                  :require-name="cardRequireName"
                  class="stripe-card-form"
                  ref="stripeCardForm"
                />
                <ion-button
                  :disabled="!stripeCardForm?.isValid"
                  @click="createStripeCard"
                >
                  {{ $msTranslate('usage.components.stripe.submit') }}
                </ion-button>
              </div>
            </div>
            <div
              v-if="stripeCardDetails"
              class="example-divider-content"
            >
              <div class="example-data">
                <ms-stripe-card-details :card="stripeCardDetails" />
              </div>
            </div>
          </template>
          <template v-else>
            {{ $msTranslate('usage.components.stripe.notInit') }}
          </template>
        </div>

        <!-- summary item -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.summaryCard.title') }}</ion-label>
          <div class="example-divider-content">
            <div class="example-data">
              <ms-summary-card
                title="usage.components.summaryCard.example.title"
                :rows="[
                  {
                    item: createSummaryCardItem(
                      'usage.components.summaryCard.example.firstName.label',
                      'usage.components.summaryCard.example.firstName.value',
                    ),
                    secondItem: createSummaryCardItem(
                      'usage.components.summaryCard.example.lastName.label',
                      'usage.components.summaryCard.example.lastName.value',
                    ),
                  },
                  {
                    item: createSummaryCardItem(
                      'usage.components.summaryCard.example.job.label',
                      'usage.components.summaryCard.example.job.value',
                    ),
                  },
                ]"
                @update="console.log('update')"
              />
            </div>
          </div>
        </div>

        <!-- date time picker -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.components.dateTimePicker.title') }}</ion-label>
          <div class="example-divider-content">
            <div class="example-data">
              <ms-datetime-picker
                v-model="selectedDateTime"
                :min-date="DateTime.now().minus({ days: 7 }).toJSDate()"
                :max-date="DateTime.now().plus({ days: 7 }).toJSDate()"
              />
              {{ DateTime.fromJSDate(selectedDateTime).toISO() }}
            </div>
          </div>
        </div>

        <!-- transitions -->
        <ion-title class="title-h1 main-title">{{ $msTranslate('usage.transitions.title') }}</ion-title>

        <!-- slide-horizontal -->
        <div class="example-divider">
          <ion-label class="title-h2">{{ $msTranslate('usage.transitions.slideHorizontal.title') }}</ion-label>
          <div class="example-divider-content">
            <div class="example-data">
              <ion-button @click="onPreviousItemSlideHorizontalClick">
                {{ $msTranslate('usage.transitions.slideHorizontal.previousButton') }}
              </ion-button>
              <ion-button @click="onNextItemSlideHorizontalClick">
                {{ $msTranslate('usage.transitions.slideHorizontal.nextButton') }}
              </ion-button>
            </div>
          </div>
          <div class="example-divider-content">
            <div class="example-data">
              <slide-horizontal
                :appear-from="slideHorizontalPositions.appearFrom"
                :disappear-to="slideHorizontalPositions.disappearTo"
                class="slider-container"
              >
                <ion-label v-if="slideHorizontalItem === 0">{{ slideHorizontalItem }}</ion-label>
                <ion-label v-if="slideHorizontalItem === 1">{{ slideHorizontalItem }}</ion-label>
                <ion-label v-if="slideHorizontalItem === 2">{{ slideHorizontalItem }}</ion-label>
              </slide-horizontal>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonLabel, IonPage, modalController, IonButton, IonTitle } from '@ionic/vue';
import { cog, create, lockClosed, helpCircle, warning } from 'ionicons/icons';
import {
  Answer,
  MsActionBar,
  MsActionBarButton,
  MsDropdown,
  MsImage,
  MsChoosePasswordInput,
  MsCodeValidationInput,
  MsInput,
  MsTextarea,
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
  MsBooleanToggle,
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
  MsCheckbox,
  MsAddressInput,
  MsPhoneNumberInput,
  MsStripeCardForm,
  MsStripeCardDetails,
  MsDropdownChangeEvent,
  MsProgress,
  MsProgressAppearance,
  MsSummaryCard,
  createSummaryCardItem,
  openSpinnerModal as msOpenSpinnerModal,
  MsDatetimePicker,
} from '@lib/components';
import { Position, SlideHorizontal } from '@lib/transitions';
import { DateTime } from 'luxon';
import { inject, ref, Ref, onMounted } from 'vue';
import SettingsModal from '@/views/settings/SettingsModal.vue';
import {
  I18n,
  LocaleOptions,
  Address,
  GEOAPIFY_MOCKED_API_KEY,
  ThemeOptions,
  ToastManager,
  Theme,
  ThemeManager,
  StripeService,
  StripeServiceKey,
  PaymentMethod,
  PaymentMethodResult,
} from '@lib/services';
import { IValidator, Validity } from '@lib/main';

const referenceValue = ref<Answer>(Answer.No);

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

const stripeService: StripeService = inject(StripeServiceKey)!;

const inputExample = ref('');
const msInputRef = ref();
const textareaExample = ref('');
const passwordInputExample = ref('');
const searchInputExample = ref('');
const msReportTheme = ref(MsReportTheme.Info);
const toastOffset = ref('0');
const toastManager = new ToastManager();
const toastTheme = ref(MsReportTheme.Success);
const themeManager = new ThemeManager(Theme.Light);
const checkboxValue = ref(true);
const addressInput = ref();
const phoneNumberInput = ref();
const VALID_CODE = ['1', '2', '3', '4', '5', '7'];
const progress = ref(0);
const stripeCardForm = ref();
const stripeCardDetails = ref<PaymentMethod.Card>();
const selectedDateTime = ref(DateTime.now().toJSDate());
const cardRequireName = ref(false);

const msSorterOptions: MsOptions = new MsOptions([
  { label: 'usage.components.sorter.name', key: 'name' },
  { label: 'usage.components.sorter.birthDate', key: 'birthDate' },
  { label: 'usage.components.sorter.age', key: 'age' },
]);

const emailValidator: IValidator = async function (value: string) {
  value = value.trim();
  if (value.length === 0) {
    return { validity: Validity.Intermediate };
  }
  // Not valid at all, just for the exemple
  return /^[a-z0-9.-_]+@[a-z0-9.-_]+\.[a-z]{1,6}$/.test(value)
    ? { validity: Validity.Valid }
    : { validity: Validity.Invalid, reason: 'usage.components.inputs.msInput.invalidEmail' };
};

enum SlideHorizontalItem {
  First,
  Second,
  Third,
}

const slideHorizontalItem = ref(SlideHorizontalItem.First);
const slideHorizontalPositions = ref({
  appearFrom: Position.Left,
  disappearTo: Position.Right,
});

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

onMounted(async () => {
  // Simulate some progress
  setInterval(() => {
    progress.value = (progress.value + 6) % 100;
  }, 300);
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

async function openSpinnerModal(): Promise<void> {
  const modal = await msOpenSpinnerModal('usage.components.spinner.modalLabel');

  setTimeout(async () => {
    await modal.dismiss();
  }, 2000);
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

async function onAddressSelected(addr: Address): Promise<void> {
  addressInput.value.setValue(`${addr.address} ${addr.address2 ? addr.address2 : ''}, ${addr.postalCode} ${addr.city}, ${addr.country}`);
}

async function changeLocale(event: MsDropdownChangeEvent): Promise<void> {
  I18n.changeLocale(event.option.key);
  stripeService.updateLocale(event.option.key);
}

async function validationFunction(code: Array<string>): Promise<boolean> {
  return code.length === VALID_CODE.length && code.every((value, index) => value === VALID_CODE[index]);
}

async function createStripeCard(): Promise<void> {
  const result: PaymentMethodResult = await stripeCardForm.value.submit();
  stripeCardDetails.value = result?.paymentMethod?.card;
}

function onPreviousItemSlideHorizontalClick(): void {
  slideHorizontalPositions.value = {
    appearFrom: Position.Right,
    disappearTo: Position.Left,
  };
  slideHorizontalItem.value = (slideHorizontalItem.value - 1 + 3) % 3;
}

function onNextItemSlideHorizontalClick(): void {
  slideHorizontalPositions.value = {
    appearFrom: Position.Left,
    disappearTo: Position.Right,
  };
  slideHorizontalItem.value = (slideHorizontalItem.value + 1) % 3;
}
</script>

<style scoped lang="scss">
.ms-progress {
  width: 16em;
}

.main-title {
  text-align: center;
  margin: 0;
  padding: 0;
  color: var(--parsec-color-light-primary-800);
}
#container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2rem;
  padding: 3rem;
  background: var(--parsec-color-light-secondary-background);
}

.example-divider {
  // multiple lines for cross-browser compatibility
  width: 100%;
  width: -webkit-fill-available;
  width: -moz-available;
  width: stretch;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: var(--parsec-color-light-secondary-white);
  border-radius: var(--parsec-radius-12);
  box-shadow: var(--parsec-shadow-light);
  --inner-padding-end: 0;
  overflow: visible;

  ion-label.title-h2 {
    background: var(--parsec-color-light-secondary-medium);
    color: var(--parsec-color-light-secondary-text);
    width: 100%;
    border-radius: var(--parsec-radius-8) var(--parsec-radius-8) 0 0;
    margin: 0;
    padding: 0.75em 1rem;
  }

  &-item {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: var(--parsec-color-light-secondary-white);
    flex-shrink: 0;
  }

  &-content {
    padding: 1rem;
    display: flex;
    gap: 1em;
    align-items: center;
    flex-wrap: wrap;
  }
}

.example-data {
  display: flex;
  align-items: center;
  margin: 0.5rem;
  gap: 2.5em;
  flex-wrap: wrap;
}

.address-input {
  width: 50em;
}

.stripe-card-form {
  width: 50em;
}

.credit-card-content {
  flex-direction: column;
  align-items: start;
}

.slider-container ion-label {
  width: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5em;
  background-color: red;
}
</style>
