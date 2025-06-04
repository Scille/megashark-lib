<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-item-divider class="toolbar ion-margin-bottom secondary">
    <div class="action-bar">
      <div
        class="action-bar-buttons-list"
        ref="actionBarButtonsList"
      >
        <ms-action-bar-button
          v-for="(button, index) in buttons"
          :key="button.icon || index"
          :button-label="button.label"
          :icon="button.icon"
          :image="button.image"
          :is-dropdown="button.isDropdown"
          @click="button.onClick"
          ref="buttonComponentRefs"
        />
      </div>
      <ion-button
        id="action-bar-more-button"
        class="button-medium"
        @click="openPopover($event)"
      >
        <ion-icon
          slot="icon-only"
          class="more-icon__ellipsis"
          :icon="ellipsisHorizontal"
        />
        <ion-icon
          class="more-icon__chevron"
          slot="end"
          :icon="chevronDown"
        />
      </ion-button>
      <slot />
    </div>
  </ion-item-divider>
</template>

<script setup lang="ts">
import { IonItemDivider, popoverController, IonButton, IonIcon } from '@ionic/vue';
import { MsActionBarButton } from '@lib/components';
import { Translatable } from '@lib/services';
import { chevronDown, ellipsisHorizontal } from 'ionicons/icons';
import { ref, onMounted, nextTick, watch } from 'vue';
import MsActionBarPopover from '@lib/components/ms-action-bar/MsActionBarPopover.vue';

const props = defineProps<{
  buttons: {
    label: Translatable;
    icon?: string;
    image?: string;
    isDropdown?: boolean;
    onClick?: (event: MouseEvent) => Promise<void>;
  }[];
}>();

const buttonComponentRefs = ref<{ [key: string]: any }>({});
const buttonRefs = ref<HTMLElement[]>([]);
const visibleButtons = ref<any[]>([]);
const overflowButtons = ref<any[]>([]);
const actionBarButtonsList = ref<HTMLElement | null>(null);

// async function getButtonRef(component: any, index: number): Promise<void> {
//   await nextTick();
//   if (component?.actionBarButtonRef?.value) {
//     buttonRefs.value[index] = component.actionBarButtonRef.value;
//   } else {
//     console.warn(`[getButtonRef] Ref manquante pour index ${index}`, component);
//   }
// }

async function updateOverflowButton(): Promise<void> {
  nextTick(() => {
    const container = actionBarButtonsList.value;
    if (!container) {
      return;
    }
    const buttonContainerWidth = container.getBoundingClientRect().right;
    // console.log('container width:', buttonContainerWidth);

    visibleButtons.value = [];
    overflowButtons.value = [];

    console.log('Buttons:', buttonRefs.value.length);

    buttonRefs.value.forEach((btn, index) => {
      console.log(`Checking button ${index}`, btn);
      if (!btn) return;
      const btnRight = btn.getBoundingClientRect().right;
      console.warn(`[updateOverflowButton] btnRight ${index}:`, btnRight);
      console.warn(`[updateOverflowButton] buttonContainerWidth ${index} right:`, buttonContainerWidth);

      if (btnRight <= buttonContainerWidth) {
        visibleButtons.value.push({ ...props.buttons[index], isOverflow: false });
        console.warn(`[updateOverflowButton] Button ${index} is visible`);
      } else {
        overflowButtons.value.push({ ...props.buttons[index], isOverflow: true });
        console.warn(`[updateOverflowButton] Button ${index} is overflow`);
      }
    });
  });
}

onMounted(async () => {
  await nextTick();

  console.log('buttonComponentRefs (should be object):', buttonComponentRefs.value);

  buttonRefs.value = Object.values(buttonComponentRefs.value)
    .map((comp) => comp?.actionBarButtonRef?.value)
    .filter((el): el is HTMLElement => !!el);

  window.addEventListener('resize', updateOverflowButton);
  updateOverflowButton();
});
watch(
  () => props.buttons,
  () => {
    updateOverflowButton();
  },
);

async function openPopover(event: Event): Promise<void> {
  const popover = await popoverController.create({
    component: MsActionBarPopover,
    cssClass: 'sorter-popover',
    componentProps: {
      overflowButtons: overflowButtons.value,
    },
    event: event,
    alignment: 'end',
    showBackdrop: false,
  });
  await popover.present();
  await popover.onDidDismiss();
  await popover.dismiss();
}
</script>

<style scoped lang="scss">
.toolbar {
  margin: 0 1.25rem;
  padding: 0 1em;
  min-height: 3rem;
  background-color: var(--parsec-color-light-secondary-background);
  border-bottom: 1px solid var(--parsec-color-light-secondary-medium);
  border-radius: var(--parsec-radius-12);
  width: auto;
  width: -webkit-fill-available;
  --inner-padding-end: 0;
  box-shadow: none;
}

#action-bar-more-button {
  --background: transparent;
  --background-hover: var(--parsec-color-light-secondary-medium);
  --color: var(--parsec-color-light-secondary-text);
  margin-left: 0.5rem;
  min-height: 1rem;

  &::part(native) {
    padding: 0.25rem 0.5rem;
  }

  .more-icon__ellipsis {
    font-size: 1.125rem;
    color: var(--parsec-color-light-secondary-soft-text);
  }

  .more-icon__chevron {
    margin-inline: 0em;
    margin-left: 0.375rem;
    font-size: 1rem;
    color: var(--parsec-color-light-secondary-soft-text);
  }

  &:hover {
    .more-icon__chevron,
    .more-icon__ellipsis {
      color: var(--parsec-color-light-primary-600);
    }
  }
}

.action-bar-buttons-list {
  display: flex;
  align-items: center;
  overflow: hidden;
  gap: 0.5rem;
}
</style>
