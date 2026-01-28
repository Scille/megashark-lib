<template>
  <ion-title class="title-h1 main-title">{{ $msTranslate('usage.components.title') }}</ion-title>

  <!-- action-bar -->
  <example-block title="usage.components.actionBar.title">
    <example-block-line>
      <ms-action-bar
        id="ms-action-bar-example"
        :buttons="actionBarButtons"
      />
    </example-block-line>
  </example-block>

  <!-- toggle -->
  <example-block title="usage.components.toggle.title">
    <example-block-line>
      <ms-boolean-toggle v-model="referenceValue" />
      <ms-grid-list-toggle v-model="displayView" />
    </example-block-line>
  </example-block>

  <!-- credit card -->
  <example-block title="usage.components.stripe.title">
    <template v-if="stripeService.isInitialized()">
      <example-block-line>
        <ms-checkbox
          v-model="cardRequireName"
        >
          {{ $msTranslate('usage.components.stripe.requireNameLabel') }}
        </ms-checkbox>
      </example-block-line>
      <example-block-line class="credit-card-content">
        <ms-stripe-card-form
          :require-name="cardRequireName"
          class="stripe-card-form"
          ref="stripeCardForm"
        />
        <ion-button
          :disabled="!stripeCardFormRef?.isValid"
          @click="createStripeCard"
        >
          {{ $msTranslate('usage.components.stripe.submit') }}
        </ion-button>
      </example-block-line>
      <example-block-line v-if="stripeCardDetails">
        <ms-stripe-card-details :card="stripeCardDetails" />
      </example-block-line>
    </template>
    <template v-else>
      <example-block-line>
        {{ $msTranslate('usage.components.stripe.notInit') }}
      </example-block-line>
    </template>
  </example-block>

  <!-- progress bar -->
  <example-block title="usage.components.progressBar.title">
    <example-block-line>
      <ms-progress
        :progress="progress"
        :appearance="MsProgressAppearance.Bar"
        class="ms-progress"
      />
    </example-block-line>
    <example-block-line>
      <ms-progress
        :progress="progress"
        :appearance="MsProgressAppearance.Line"
        class="ms-progress"
      />
    </example-block-line>
    <example-block-line>
      <ms-progress
        :progress="progress"
        :appearance="MsProgressAppearance.ProgressBar"
        class="ms-progress"
      />
    </example-block-line>
  </example-block>

  <!-- dropdown -->
  <example-block title="usage.components.dropdown.title">
    <example-block-line>
      <ms-dropdown
        class="dropdown"
        :title="'usage.components.dropdown.dropdownTitle'"
        :options="msDropdownOptions"
        :default-option-key="msReportTheme"
        @change="changeOption($event.option.key)"
      />
    </example-block-line>
  </example-block>

  <!-- images -->
  <example-block title="usage.components.image.title">
    <example-block-line>
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
    </example-block-line>
  </example-block>

  <!-- inputs -->
  <example-block title="usage.components.inputs.title">
    <example-block-line>
      <div class="input-item">
        <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msInput.title') }}</ion-label>
        <ms-input
          label="usage.components.inputs.msInput.label"
          placeholder="usage.components.inputs.msInput.placeholder"
          name="inputExample"
          v-model="inputExample"
          ref="msInput"
          :validator="emailValidator"
        />
        <span v-if="msInputRef">
          {{ $msTranslate('usage.components.inputs.msInput.isValidEmail') }}
          {{ $msTranslate({ key: 'usage.components.inputs.msInput.validity', count: msInputRef?.validity }) }}
        </span>
      </div>
      <div class="input-item">
        <ms-textarea
          label="usage.components.inputs.msTextarea.label"
          placeholder="usage.components.inputs.msTextarea.placeholder"
          name="textareaExample"
          v-model="textareaExample"
          :maxlength="100"
          :show-count="true"
        />
      </div>
      <div class="input-item">
        <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msSearchInput.title') }}</ion-label>
        <ms-search-input
          placeholder="lib.components.msSearchInput.placeholder"
          v-model="searchInputExample"
          :debounce="500"
          id="searchInputExample"
        />
        {{ searchInputExample }}
      </div>
      <div class="input-item">
        <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msPasswordInput.title') }}</ion-label>
        <ms-password-input
          label="usage.components.inputs.msPasswordInput.label"
          v-model="passwordInputExample"
          auto-complete-info="current-password"
          name="passwordInputExample"
        />
      </div>
      <div class="input-item">
        <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msChoosePasswordInput.title') }}</ion-label>
        <ms-choose-password-input
          password-label="usage.components.inputs.msChoosePasswordInput.label"
          @on-enter-keyup="onEnterKeyup($event)"
          ref="choosePasswordInput"
        />
      </div>
      <div class="input-item">
        <ion-label class="title-h3">{{ $msTranslate('usage.components.inputs.msPhoneNumberInput.title') }}</ion-label>
        <ms-phone-number-input
          @on-enter-keyup="onEnterKeyup($event)"
          ref="phoneNumberInput"
        />
      </div>
    </example-block-line>
  </example-block>

  <!-- sorter -->
  <example-block title="usage.components.sorter.title">
    <example-block-line>
      <ms-sorter
        :options="msSorterOptions"
        default-option="name"
        :sorter-labels="{ asc: 'Asc', desc: 'Desc' }"
        :sort-by-asc="false"
        @change="onSortChange($event)"
      />
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
    </example-block-line>
  </example-block>

  <!-- checkbox -->
  <example-block title="usage.components.checkbox.title">
    <example-block-line>
      <ms-checkbox
        v-model="checkboxValue"
      >
        {{ $msTranslate('usage.components.checkbox.value') }} {{ checkboxValue }}
      </ms-checkbox>
    </example-block-line>
  </example-block>

  <!-- spinner -->
  <example-block title="usage.components.spinner.title">
    <example-block-line>
      <ms-spinner title="lib.components.msSpinner.loading" />
      <ion-button @click="openSpinnerModal">
        {{ $msTranslate('usage.components.spinner.openModal') }}
      </ion-button>
    </example-block-line>
  </example-block>

  <!-- steppers -->
  <example-block title="usage.components.stepper.title">
    <example-block-line>ms-wizard-stepper</example-block-line>
    <ms-wizard-stepper
      :current-index="1"
      :titles="[
        'usage.components.stepper.msWizardStepper.step1',
        'usage.components.stepper.msWizardStepper.step2',
        'usage.components.stepper.msWizardStepper.step3',
      ]"
    />
  </example-block>

  <!-- informative-text -->
  <example-block title="usage.components.informativeText.title">
    <example-block-line>
      <ms-informative-text>
        {{ $msTranslate('usage.components.informativeText.message') }}
      </ms-informative-text>
    </example-block-line>
  </example-block>

  <!-- report-text -->
  <example-block title="usage.components.reportText.title">
    <example-block-line>
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
    </example-block-line>
  </example-block>

  <!-- information-tooltip -->
  <example-block title="usage.components.informationTooltip.title">
    <example-block-line>
      <ms-information-tooltip
        text="usage.components.informationTooltip.message"
        class="information-icon"
        slot="end"
      />
    </example-block-line>
    <example-block-line>
      <ion-button ref="mouseOverTooltipButton">{{ $msTranslate('usage.components.informationTooltip.mouseOverButton') }}</ion-button>
    </example-block-line>
  </example-block>

  <!-- code validation -->
  <example-block title="usage.components.codeValidation.title">
    <example-block-line>
      <ms-code-validation-input
        :code-length="VALID_CODE.length"
        :validation-function="validationFunction"
      />
    </example-block-line>
    <example-block-line>
      <ms-code-validation-input
        :code-length="8"
        :allowed-input="AllowedInput.UpperAlphaNumeric"
      />
    </example-block-line>
  </example-block>

  <!-- address validation -->
  <example-block title="usage.components.address.title">
    <example-block-line>
      <ms-address-input
        class="address-input"
        ref="addressInput"
        label="usage.components.address.label"
        placeholder="usage.components.address.placeholder"
        @address-selected="onAddressSelected"
        :geoapify-api-key="GEOAPIFY_MOCKED_API_KEY"
      />
    </example-block-line>
  </example-block>

  <!-- summary item -->
  <example-block title="usage.components.summaryCard.title">
    <example-block-line>
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
            item: createSummaryCardItem('usage.components.summaryCard.example.job.label', 'usage.components.summaryCard.example.job.value'),
          },
        ]"
        @update="console.log('update')"
      />
    </example-block-line>
  </example-block>

  <!-- date time picker -->
  <example-block title="usage.components.dateTimePicker.title">
    <example-block-line>
      <ms-datetime-picker
        v-model="selectedDateTime"
        :min-date="DateTime.now().minus({ days: 7 }).toJSDate()"
        :max-date="DateTime.now().plus({ days: 7 }).toJSDate()"
      />
      {{ DateTime.fromJSDate(selectedDateTime).toISO() }}
    </example-block-line>
  </example-block>

  <!-- slider -->
  <example-block title="usage.components.slider.title">
    <example-block-line>
      <ms-slider
        class="ms-slider"
        v-model="sliderStateStatic"
        :max-value="100"
        :increment-value="2"
      />
      {{ sliderStateStatic.progress }}
    </example-block-line>
    <example-block-line>
      <ms-slider
        class="ms-slider"
        v-model="sliderStatePlaying"
        :max-value="1000"
        @ready="console.log('ready')"
        @paused="console.log('paused')"
        @progressing="console.log('progressing')"
        @finished="onSliderFinished()"
      />
      <ion-button @click="onSliderPlayClicked()">
        <ion-icon :icon="sliderStatePlaying.paused === false ? pause : play" />
      </ion-button>
      {{ sliderStatePlaying.progress }}
    </example-block-line>
  </example-block>

  <!-- draggable -->
  <example-block title="usage.components.draggable.title">
    <example-block-line>
      <ion-button @click="enableDragging = !enableDragging">
        {{ enableDragging ? $msTranslate('usage.components.draggable.disable') : $msTranslate('usage.components.draggable.enable') }}
      </ion-button>
      <ion-button @click="draggableElementRef?.resetPosition()">
        {{ $msTranslate('usage.components.draggable.resetPosition') }}
      </ion-button>
    </example-block-line>
    <example-block-line>
      <ion-button @click="restrictDirection.up = !restrictDirection.up">
        {{
          restrictDirection.up ? $msTranslate('usage.components.draggable.enableUp') : $msTranslate('usage.components.draggable.disableUp')
        }}
      </ion-button>
      <ion-button @click="restrictDirection.down = !restrictDirection.down">
        {{
          restrictDirection.down
            ? $msTranslate('usage.components.draggable.enableDown')
            : $msTranslate('usage.components.draggable.disableDown')
        }}
      </ion-button>
      <ion-button @click="restrictDirection.left = !restrictDirection.left">
        {{
          restrictDirection.left
            ? $msTranslate('usage.components.draggable.enableLeft')
            : $msTranslate('usage.components.draggable.disableLeft')
        }}
      </ion-button>
      <ion-button @click="restrictDirection.right = !restrictDirection.right">
        {{
          restrictDirection.right
            ? $msTranslate('usage.components.draggable.enableRight')
            : $msTranslate('usage.components.draggable.disableRight')
        }}
      </ion-button>
    </example-block-line>
    <example-block-line>
      <ms-draggable
        class="ms-draggable"
        :disabled="!enableDragging"
        :restrict-direction="restrictDirection"
        ref="draggableElement"
      >
        <ms-image
          :image="LogoIconGradient"
          :title="$msTranslate('usage.components.draggable.dragMe')"
        />
      </ms-draggable>
    </example-block-line>
  </example-block>
</template>

<script setup lang="ts">
import { IonLabel, modalController, IonButton, IonTitle, IonIcon } from '@ionic/vue';
import { cog, create, helpCircle, pause, play, warning } from 'ionicons/icons';
import {
  Answer,
  MsActionBar,
  MsDropdown,
  MsImage,
  MsChoosePasswordInput,
  MsCodeValidationInput,
  MsInput,
  MsWizardStepper,
  MsTextarea,
  MsPasswordInput,
  MsSearchInput,
  MsAlertModal,
  MsSorter,
  MsSpinner,
  MsInformativeText,
  MsGridListToggle,
  MsReportText,
  MsInformationTooltip,
  MsOptions,
  askQuestion,
  getPasswordFromUser,
  getTextFromUser,
  EmptyFolder,
  MsReportTheme,
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
  MsProgress,
  MsProgressAppearance,
  MsSummaryCard,
  createSummaryCardItem,
  openSpinnerModal as msOpenSpinnerModal,
  MsDatetimePicker,
  MsSlider,
  SliderState,
  DisplayState,
  MsDraggable,
  LockClosedIcon,
  attachMouseOverTooltip,
  AllowedInput,
} from '@lib/components';
import { DateTime } from 'luxon';
import { inject, ref, Ref, onMounted, computed, useTemplateRef } from 'vue';
import SettingsModal from '@/views/settings/SettingsModal.vue';
import { I18n, Address, GEOAPIFY_MOCKED_API_KEY, StripeService, StripeServiceKey, PaymentMethod, PaymentMethodResult } from '@lib/services';
import { IValidator, Validity } from '@lib/main';
import { ExampleBlock, ExampleBlockLine } from '@/views/example-block';
import { useWindowSize } from '@lib/services';

const referenceValue = ref<Answer>(Answer.No);
const { isLargeDisplay } = useWindowSize();

const msDropdownOptions: MsOptions = new MsOptions([
  {
    key: MsReportTheme.Info,
    label: 'usage.msReportTheme.info',
    description: 'usage.components.dropdown.smallDescription',
  },
  {
    key: MsReportTheme.Warning,
    label: 'usage.msReportTheme.warning',
  },
  {
    key: MsReportTheme.Error,
    label: 'usage.msReportTheme.error',
    description: 'usage.components.dropdown.bigDescription',
  },
  {
    key: MsReportTheme.Success,
    label: 'usage.msReportTheme.success',
  },
  {
    key: 'usage.components.dropdown.disabled',
    label: 'usage.components.dropdown.disabled',
    disabled: true,
    disabledReason: 'usage.components.dropdown.disabledReason',
    description: 'usage.components.dropdown.smallDescription',
  },
]);

const stripeService: StripeService = inject(StripeServiceKey)!;

const inputExample = ref('');
const msInputRef = useTemplateRef('msInput');
const textareaExample = ref('');
const passwordInputExample = ref('');
const searchInputExample = ref('');
const msReportTheme = ref(MsReportTheme.Info);
const checkboxValue = ref(true);
const addressInputRef = useTemplateRef('addressInput');
const VALID_CODE = ['1', '2', '3', '4', '5', '7'];
const progress = ref(0);
const sliderStateStatic = ref<SliderState>({ progress: 50 });
const sliderStatePlaying = ref<SliderState>({ progress: 0, paused: true });
const stripeCardFormRef = useTemplateRef('stripeCardForm');
const stripeCardDetails = ref<PaymentMethod.Card>();
const selectedDateTime = ref(DateTime.now().toJSDate());
const cardRequireName = ref(false);
const enableDragging = ref(true);
const displayView = ref(DisplayState.List);
const restrictDirection = ref({ up: false, down: false, left: false, right: false });
const draggableElementRef = useTemplateRef('draggableElement');
const mouseOverTooltipButtonRef = useTemplateRef('mouseOverTooltipButton');

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

const actionBarButtons = computed(() => {
  const actionArray = [];

  actionArray.push(
    {
      label: 'usage.components.actionBar.buttons.alert.title',
      icon: warning,
      onClick: async (): Promise<void> => {
        await openAlertModal();
      },
    },
    {
      label: 'usage.components.actionBar.buttons.alert.title',
      icon: warning,
      onClick: async (): Promise<void> => {
        await openAlertModal(true);
      },
    },
    {
      label: 'usage.components.actionBar.buttons.askQuestion.title',
      icon: helpCircle,
      onClick: async (): Promise<void> => {
        await openQuestionModal();
      },
    },
    {
      label: 'usage.components.actionBar.buttons.getText.title',
      icon: create,
      onClick: async (): Promise<void> => {
        await openTextInputModal();
      },
    },
    {
      label: 'usage.components.actionBar.buttons.getPassword.title',
      image: LockClosedIcon,
      onClick: async (): Promise<void> => {
        await openPasswordInputModal();
      },
    },
    {
      label: 'usage.components.actionBar.buttons.settings.title',
      icon: cog,
      onClick: async (): Promise<void> => {
        await openSettingsModal();
      },
    },
    {
      label: 'usage.components.actionBar.buttons.importDocument.title',
      image: DocumentImport,
      isDropdown: true,
    },
  );

  return actionArray;
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

onMounted(async () => {
  // Simulate some progress
  setInterval(() => {
    progress.value = (progress.value + 6) % 100;
  }, 300);
  setInterval(() => {
    if (sliderStatePlaying.value.progress < 1000 && !sliderStatePlaying.value.paused) {
      sliderStatePlaying.value.progress += 1;
    } else {
      sliderStatePlaying.value.paused = true;
    }
  }, 100);

  await attachMouseOverTooltip(mouseOverTooltipButtonRef.value?.$el, 'usage.components.informationTooltip.mouseOverMessage');
});

function changeOption(key: MsReportTheme): void {
  msReportTheme.value = key;
}

function onEnterKeyup(event: any): void {
  console.log('onEnterKeyup', event);
}

async function openSettingsModal(): Promise<void> {
  const modal = await modalController.create({
    component: SettingsModal,
    cssClass: 'settings-modal',
    showBackdrop: true,
    handle: false,
    breakpoints: isLargeDisplay.value ? undefined : [1],
    expandToScroll: false,
    initialBreakpoint: isLargeDisplay.value ? undefined : 1,
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

async function openAlertModal(withTitle?: boolean): Promise<void> {
  const modal = await modalController.create({
    component: MsAlertModal,
    canDismiss: true,
    cssClass: 'information-modal',
    componentProps: {
      theme: msReportTheme.value,
      message: 'alert message',
      title: withTitle ? 'alert title' : undefined,
    },
  });
  await modal.present();
  await modal.onWillDismiss();
  await modal.dismiss();
}

async function openPasswordInputModal(): Promise<void> {
  await getPasswordFromUser(
    {
      title: 'usage.components.modals.getPassword.passwordNeeded',
      subtitle: { key: 'usage.components.modals.getPassword.enterPassword' },
      inputLabel: 'usage.components.modals.getPassword.password',
      okButtonText: 'usage.components.modals.getPassword.validate',
    },
    isLargeDisplay.value,
  );
}

async function openQuestionModal(): Promise<void> {
  await askQuestion('title', 'subtitle', {
    yesIsDangerous: true,
    yesText: 'yes',
    noText: 'no',
  });
}

async function openTextInputModal(): Promise<void> {
  await getTextFromUser(
    {
      title: 'usage.components.modals.askQuestion.title',
      trim: true,
      inputLabel: 'usage.components.modals.askQuestion.label',
      placeholder: 'usage.components.modals.askQuestion.placeholder',
      okButtonText: 'usage.components.modals.askQuestion.create',
    },
    isLargeDisplay.value,
  );
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

async function onAddressSelected(addr: Address): Promise<void> {
  if (addressInputRef.value) {
    addressInputRef.value.setValue(
      `${addr.address} ${addr.address2 ? addr.address2 : ''}, ${addr.postalCode} ${addr.city}, ${addr.country}`,
    );
  }
}

async function validationFunction(code: Array<string>): Promise<boolean> {
  return code.length === VALID_CODE.length && code.every((value, index) => value === VALID_CODE[index]);
}

async function createStripeCard(): Promise<void> {
  if (stripeCardFormRef.value) {
    const result: PaymentMethodResult | undefined = await stripeCardFormRef.value.submit();
    if (result) {
      stripeCardDetails.value = result.paymentMethod?.card;
    }
  }
}

function onSliderFinished(): void {
  console.log('finished');
}

function onSliderPlayClicked(): void {
  if (sliderStatePlaying.value.progress < 1000) {
    sliderStatePlaying.value.paused = !sliderStatePlaying.value.paused;
  } else {
    sliderStatePlaying.value.progress = 0;
    sliderStatePlaying.value.paused = false;
  }
}
</script>

<style scoped lang="scss">
.ms-progress {
  width: 16em;
}

.ms-slider {
  width: 24em;
}

.main-title {
  text-align: center;
  margin: 0;
  padding: 0;
  color: var(--parsec-color-light-primary-800);
}

.input-item {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: var(--parsec-color-light-secondary-white);
  flex-shrink: 1;
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
