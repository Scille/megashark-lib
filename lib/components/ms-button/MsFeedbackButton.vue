<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-button
    v-bind="$attrs"
    @click="onClick"
    :disabled="state !== State.Normal"
  >
    <ion-icon
      :slot="iconPosition === 'left' ? 'start' : 'end'"
      v-if="currentTextAndIcon.icon"
      :icon="currentTextAndIcon.icon"
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

<style scoped lang="scss"></style>
