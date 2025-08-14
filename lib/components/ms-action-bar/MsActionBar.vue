<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-item-divider class="toolbar ion-margin-bottom secondary">
    <div class="action-bar">
      <div class="action-bar-buttons-content">
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
            :ref="(button) => defineButtonRef(button, index)"
            :style="{ display: buttonVisibilityStates[index] ? 'flex' : 'none' }"
          />
          <ion-button
            id="action-bar-more-button"
            class="button-medium"
            @click="openPopover($event)"
            v-show="hiddenButtons.length > 0"
            ref="actionBarMoreButtonRef"
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
        </div>
      </div>
      <slot />
    </div>
  </ion-item-divider>
</template>

<script setup lang="ts">
import { IonItemDivider, popoverController, IonButton, IonIcon } from '@ionic/vue';
import { MsActionBarButton } from '@lib/components';
import { Translatable } from '@lib/services';
import { chevronDown, ellipsisHorizontal } from 'ionicons/icons';
import { ref, onMounted, nextTick, watch, computed, onUnmounted, useTemplateRef } from 'vue';
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

const buttonComponentRefs = ref<any[]>([]);
const actionBarButtonsList = useTemplateRef('actionBarButtonsList');
const buttonVisibilityStates = ref<boolean[]>([]);
const hiddenButtons = computed(() => {
  return props.buttons.filter((_, index) => isButtonHidden(index));
});

function isButtonHidden(index: number): boolean {
  return buttonVisibilityStates.value[index] === false;
}

function defineButtonRef(button: any, index: number): void {
  if (button) {
    buttonComponentRefs.value[index] = button;
  }
}

function initializeVisibility(): void {
  buttonVisibilityStates.value = new Array(props.buttons.length).fill(true);
}

async function isButtonVisible(): Promise<void> {
  if (!actionBarButtonsList.value || buttonComponentRefs.value.length === 0) {
    return;
  }

  initializeVisibility();

  await nextTick();

  const containerRect = actionBarButtonsList.value.getBoundingClientRect();
  const moreButtonWidth = 60;
  const containerRight = containerRect.right - moreButtonWidth;

  const newVisibilityStates: boolean[] = [];

  // Calculer la visibilité en fonction de l'espace disponible
  for (let index = 0; index < props.buttons.length; index++) {
    const buttonComponent = buttonComponentRefs.value[index];

    if (!buttonComponent) {
      newVisibilityStates[index] = false;
      continue;
    }

    // Obtenir l'élément DOM du bouton
    const buttonElement = buttonComponent?.actionBarButtonRef?.value || buttonComponent?.$el;

    if (!buttonElement) {
      newVisibilityStates[index] = false;
      continue;
    }

    const buttonRect = buttonElement.getBoundingClientRect();

    const isFullyVisible = buttonRect.right <= containerRight;

    if (isFullyVisible) {
      newVisibilityStates[index] = true;
    } else {
      // Ce bouton et tous les suivants seront en overflow
      for (let j = index; j < props.buttons.length; j++) {
        newVisibilityStates[j] = false;
      }
      break;
    }
  }
  // Appliquer les nouveaux états en une seule fois pour éviter les saccades
  requestAnimationFrame(() => {
    buttonVisibilityStates.value = newVisibilityStates;
  });
}

let checkTimeout: number | null = null;

function checkVisibilityWithDebounce(): void {
  if (checkTimeout) {
    clearTimeout(checkTimeout);
  }

  checkTimeout = window.setTimeout(() => {
    isButtonVisible();
  }, 50);
}

// Observers pour détecter les changements automatiquement
let mutationObserver: MutationObserver | null = null;
let resizeObserver: ResizeObserver | null = null;

function setupObservers(): void {
  if (!actionBarButtonsList.value) return;

  // 1. Observer les changements DOM dans la liste des boutons
  mutationObserver = new MutationObserver((mutations) => {
    let shouldRecheck = false;

    mutations.forEach((mutation) => {
      // Changements d'enfants (ajout/suppression de boutons)
      if (mutation.type === 'childList') {
        shouldRecheck = true;
      }

      // Changements d'attributs (style, class, etc.)
      if (mutation.type === 'attributes' && (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
        shouldRecheck = true;
      }
    });

    if (shouldRecheck) {
      checkVisibilityWithDebounce();
    }
  });

  mutationObserver.observe(actionBarButtonsList.value, {
    childList: true, // Changements d'enfants
    subtree: true, // Changements dans les sous-éléments
    attributes: true, // Changements d'attributs
    attributeFilter: ['style', 'class', 'data-v-key'], // Surveiller les attributs importants
  });

  // 2. Observer les changements de taille du conteneur
  resizeObserver = new ResizeObserver(() => {
    checkVisibilityWithDebounce();
  });

  resizeObserver.observe(actionBarButtonsList.value);

  // 3. Observer aussi le conteneur parent pour détecter les changements de layout
  const parentContainer = actionBarButtonsList.value.closest('.action-bar');
  if (parentContainer) {
    resizeObserver.observe(parentContainer);
  }
}

function cleanupObservers(): void {
  if (mutationObserver) {
    mutationObserver.disconnect();
    mutationObserver = null;
  }

  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }

  if (checkTimeout) {
    clearTimeout(checkTimeout);
    checkTimeout = null;
  }
}

// ========================================
// EVENT HANDLERS (garde le resize en backup)
// ========================================

let resizeTimeout: number | null = null;

function handleResize(): void {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }

  resizeTimeout = window.setTimeout(() => {
    isButtonVisible();
  }, 16);
}

async function openPopover(event: Event): Promise<void> {
  const popover = await popoverController.create({
    component: MsActionBarPopover,
    cssClass: 'sorter-popover',
    componentProps: {
      hiddenButtons: hiddenButtons.value,
    },
    event: event,
    alignment: 'end',
    showBackdrop: false,
  });
  await popover.present();
  await popover.onDidDismiss();
}

// Lifecycle
onMounted(async () => {
  initializeVisibility();

  // Attendre que tout soit rendu
  await nextTick();

  // Délai pour s'assurer que tous les composants sont rendus
  setTimeout(() => {
    isButtonVisible();
  }, 10);

  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  cleanupObservers();
  window.removeEventListener('resize', handleResize);
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }
});

// Watchers
watch(
  () => props.buttons,
  async () => {
    initializeVisibility();
    await nextTick();
    await isButtonVisible();
    cleanupObservers();
    setTimeout(setupObservers, 50); // Assurer que les observers sont mis en place après le rendu
  },
  { deep: true },
);
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

.action-bar {
  display: flex;
  gap: 0.5rem;
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

.action-bar-buttons-content {
  display: flex;
  width: 100%;
}

.action-bar-buttons-list {
  width: calc(100% - 2rem);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
