<template>
  <ion-title class="title-h1 main-title">{{ $msTranslate('usage.transitions.title') }}</ion-title>

  <!-- slide-horizontal -->
  <example-block title="usage.transitions.slideHorizontal.title">
    <example-block-line>
      <ion-button @click="onPreviousItemSlideHorizontalClick">
        {{ $msTranslate('usage.transitions.slideHorizontal.previousButton') }}
      </ion-button>
      <ion-button @click="onNextItemSlideHorizontalClick">
        {{ $msTranslate('usage.transitions.slideHorizontal.nextButton') }}
      </ion-button>
    </example-block-line>
    <example-block-line>
      <slide-horizontal
        :appear-from="slideHorizontalPositions.appearFrom"
        :disappear-to="slideHorizontalPositions.disappearTo"
        class="slider-container"
      >
        <ion-label v-if="slideHorizontalItem === 0">{{ slideHorizontalItem }}</ion-label>
        <ion-label v-if="slideHorizontalItem === 1">{{ slideHorizontalItem }}</ion-label>
        <ion-label v-if="slideHorizontalItem === 2">{{ slideHorizontalItem }}</ion-label>
      </slide-horizontal>
    </example-block-line>
  </example-block>
</template>

<script setup lang="ts">
import { IonLabel, IonButton, IonTitle } from '@ionic/vue';
import { Position, SlideHorizontal } from '@lib/transitions';
import { ref } from 'vue';
import { ExampleBlock, ExampleBlockLine } from '@/views/example-block';

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
.main-title {
  text-align: center;
  margin: 0;
  padding: 0;
  color: var(--parsec-color-light-primary-800);
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
