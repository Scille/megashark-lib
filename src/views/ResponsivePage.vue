<template>
  <ion-title class="main-title">{{ $msTranslate('usage.responsive.title') }}</ion-title>

  <!-- responsive mixin -->
  <example-block title="usage.responsive.mixin.title">
    <example-block-line>
      <ion-button @click="noResponsiveMixinOverlap = !noResponsiveMixinOverlap">
        {{
          noResponsiveMixinOverlap
            ? $msTranslate('usage.responsive.mixin.enableOverlap')
            : $msTranslate('usage.responsive.mixin.disableOverlap')
        }}
      </ion-button>
    </example-block-line>
    <example-block-line>
      <ms-informative-text>
        {{ $msTranslate('usage.responsive.mixin.overlapExplanation') }}
      </ms-informative-text>
    </example-block-line>
    <example-block-line>
      <ion-label
        class="responsive-mixin-block responsive-mixin-block-xs"
        :class="{ 'no-overlap': noResponsiveMixinOverlap }"
      >
        {{ $msTranslate('usage.responsive.mixin.xs') }}
      </ion-label>
      <ion-label
        class="responsive-mixin-block responsive-mixin-block-sm"
        :class="{ 'no-overlap': noResponsiveMixinOverlap }"
      >
        {{ $msTranslate('usage.responsive.mixin.sm') }}
      </ion-label>
      <ion-label
        class="responsive-mixin-block responsive-mixin-block-md"
        :class="{ 'no-overlap': noResponsiveMixinOverlap }"
      >
        {{ $msTranslate('usage.responsive.mixin.md') }}
      </ion-label>
      <ion-label
        class="responsive-mixin-block responsive-mixin-block-lg"
        :class="{ 'no-overlap': noResponsiveMixinOverlap }"
      >
        {{ $msTranslate('usage.responsive.mixin.lg') }}
      </ion-label>
      <ion-label
        class="responsive-mixin-block responsive-mixin-block-xl"
        :class="{ 'no-overlap': noResponsiveMixinOverlap }"
      >
        {{ $msTranslate('usage.responsive.mixin.xl') }}
      </ion-label>
      <ion-label
        class="responsive-mixin-block responsive-mixin-block-xxl"
        :class="{ 'no-overlap': noResponsiveMixinOverlap }"
      >
        {{ $msTranslate('usage.responsive.mixin.xxl') }}
      </ion-label>
      <ion-label
        class="responsive-mixin-block responsive-mixin-block-no-mixin"
        :class="{ 'no-overlap': noResponsiveMixinOverlap }"
      >
        {{ $msTranslate('usage.responsive.mixin.noMixin') }}
      </ion-label>
    </example-block-line>
  </example-block>

  <!-- window width -->
  <example-block title="usage.responsive.windowWidth.title">
    <example-block-line>
      <ion-label>
        {{ $msTranslate({ key: 'usage.responsive.windowWidth.label', data: { width: windowWidth } }) }}
      </ion-label>
      <ion-label>
        {{ $msTranslate({ key: 'usage.responsive.windowWidth.largeWindow', data: { value: isLargeDisplay } }) }}
      </ion-label>
      <ion-label>
        {{ $msTranslate({ key: 'usage.responsive.windowWidth.smallWindow', data: { value: isSmallDisplay } }) }}
      </ion-label>
      <ion-label v-show="isLargeDisplay">
        {{ $msTranslate('usage.responsive.windowWidth.shownOnLargeWindows') }}
      </ion-label>
      <ion-label v-show="isSmallDisplay">
        {{ $msTranslate('usage.responsive.windowWidth.shownOnSmallWindows') }}
      </ion-label>
    </example-block-line>
  </example-block>
</template>

<script setup lang="ts">
import { ExampleBlock, ExampleBlockLine } from '@/views/example-block';
import { IonButton, IonLabel, IonTitle } from '@ionic/vue';
import { MsInformativeText } from '@lib/components';
import { useWindowSize } from '@lib/services';
import { ref } from 'vue';

const { windowWidth, isLargeDisplay, isSmallDisplay } = useWindowSize();
const noResponsiveMixinOverlap = ref(false);
</script>

<style scoped lang="scss">
@use '@lib/theme' as ms;

.responsive-mixin-block {
  display: none;
  padding: ms.spacing('padding-lg');
  border-radius: ms.radius('lg');
  background: ms.color('surface-brand-default');
  &-no-mixin {
    display: block;
    color: ms.color('text-on-color-label');
  }

  @include ms.responsive-breakpoint('xxl') {
    background: ms.color('surface-brand-default-pressed');
    color: ms.color('text-brand-on-color');
    &-xxl {
      display: block;
    }

    &-no-mixin.no-overlap {
      display: none;
    }
  }

  @include ms.responsive-breakpoint('xl') {
    background: ms.color('surface-brand-default-hover');
    &-xl {
      display: block;
    }

    &-xxl.no-overlap {
      display: none;
    }
  }

  @include ms.responsive-breakpoint('lg') {
    background: ms.color('surface-brand-default');

    &-lg {
      display: block;
    }

    &-xl.no-overlap {
      display: none;
    }
  }

  @include ms.responsive-breakpoint('md') {
    color: ms.color('text-base-body');
    &-md {
      display: block;
    }

    &-lg.no-overlap {
      display: none;
    }
  }

  @include ms.responsive-breakpoint('sm') {
    background: ms.color('surface-brand-default');
    opacity: ms.opacity('20');

    &-sm {
      display: block;
    }

    &-md.no-overlap {
      display: none;
    }
  }

  @include ms.responsive-breakpoint('xs') {
    background: ms.color('surface-brand-default');
    opacity: ms.opacity('10');

    &-xs {
      display: block;
    }

    &-sm.no-overlap {
      display: none;
    }
  }
}
</style>
