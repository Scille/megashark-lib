<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-button
    v-bind="$attrs"
    @click="onClick"
    class="feedback-button"
    :class="{
      'feedback-button--success': state === State.Success,
      'feedback-button--failure': state === State.Failure,
    }"
    :aria-disabled="state !== State.Normal"
    :slot="!currentTextAndIcon.text && currentTextAndIcon.icon ? 'icon-only' : ''"
  >
    <ion-icon
      :slot="iconPosition === 'left' ? 'start' : 'end'"
      v-if="currentTextAndIcon.icon"
      :icon="currentTextAndIcon.icon"
      :class="currentTextAndIcon.text ? (iconPosition === 'left' ? 'button-icon-left' : 'button-icon-right') : ''"
    />
    <span v-if="currentTextAndIcon.text">{{ $msTranslate(currentTextAndIcon.text) }}</span>
  </ion-button>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { Translatable } from '@lib/services';
import { checkmark, close } from 'ionicons/icons';
import { computed, ref } from 'vue';

enum State {
  Normal = 'normal',
  Success = 'success',
  Failure = 'failure',
}

type StateAttrs = { text: Translatable; icon: string } | { text: Translatable; icon?: string } | { text?: Translatable; icon: string };

const {
  callback,
  normalState,
  failureState = undefined,
  successState = undefined,
  timeout = 3000,
  iconPosition = 'left',
} = defineProps<{
  callback: (event: MouseEvent) => Promise<boolean | undefined>;
  normalState: StateAttrs;
  failureState?: StateAttrs;
  successState?: StateAttrs;
  timeout?: number;
  iconPosition?: 'left' | 'right';
}>();

const currentTextAndIcon = computed(() => {
  switch (state.value) {
    case State.Normal:
      return { text: normalState.text, icon: normalState.icon };
    case State.Success:
      return { text: successState?.text, icon: successState?.icon ?? checkmark };
    case State.Failure:
      return { text: failureState?.text, icon: failureState?.icon ?? close };
    default:
      return { text: '', icon: '' };
  }
});

const state = ref<State>(State.Normal);

async function onClick(event: MouseEvent): Promise<void> {
  if (state.value !== State.Normal) {
    return;
  }

  const result = await callback(event);

  if (result === undefined) {
    return;
  }

  if (result) {
    state.value = State.Success;
  } else {
    state.value = State.Failure;
  }

  setTimeout(() => {
    state.value = State.Normal;
  }, timeout);
}
</script>

<style scoped lang="scss">
@use '@lib/theme' as ms;

@mixin feedback-state($surface, $text, $icon) {
  --background: #{ms.color($surface)};
  --background-hover: #{ms.color($surface)};
  --background-activated: #{ms.color($surface)};
  --background-focused: #{ms.color($surface)};
  --border-color: #{ms.color($text)};
  --color: #{ms.color($text)};
  --color-hover: #{ms.color($text)};
  cursor: default;
  pointer-events: none;

  ion-icon {
    color: ms.color($icon);
  }
}

ion-button.feedback-button {
  &.feedback-button--success {
    @include feedback-state('surface-success-default-subtle', 'text-success-default', 'icon-success-default');
  }

  &.feedback-button--failure {
    @include feedback-state('surface-error-default-subtle', 'text-error-default', 'icon-error-default');
  }
}
</style>
