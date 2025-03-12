<template>
  <ion-title class="title-h1 main-title">{{ $msTranslate('usage.responsive.title') }}</ion-title>

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
        class="responsive-mixin-block responsive-mixin-block-wide"
        :class="{ 'no-overlap': noResponsiveMixinOverlap }"
      >
        {{ $msTranslate('usage.responsive.mixin.wide') }}
      </ion-label>
      <ion-label
        class="responsive-mixin-block responsive-mixin-block-ultra-wide"
        :class="{ 'no-overlap': noResponsiveMixinOverlap }"
      >
        {{ $msTranslate('usage.responsive.mixin.ultraWide') }}
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
        {{ $msTranslate('usage.responsive.windowWidth.shownOnLargeDisplays') }}
      </ion-label>
      <ion-label v-show="isSmallDisplay">
        {{ $msTranslate('usage.responsive.windowWidth.shownOnSmallDisplays') }}
      </ion-label>
    </example-block-line>
  </example-block>
</template>

<script setup lang="ts">
import { IonLabel, IonButton, IonTitle } from '@ionic/vue';
import { ref } from 'vue';
import { MsInformativeText } from '@lib/components';
import { useWindowSize } from '@lib/services';
import { ExampleBlock, ExampleBlockLine } from '@/views/example-block';

const { windowWidth, isLargeDisplay, isSmallDisplay } = useWindowSize();
const noResponsiveMixinOverlap = ref(false);
</script>

<style scoped lang="scss">
.main-title {
  text-align: center;
  margin: 0;
  padding: 0;
  color: var(--parsec-color-light-primary-800);
}

@import '@lib/theme/variables/responsive-mixin';

.responsive-mixin-block {
  display: none;
  padding: 0.5em;
  border-radius: 0.5em;
  background: blue;
  &-no-mixin {
    display: block;
    color: white;
  }

  @include breakpoint('ultra-wide') {
    background: #ff0000;
    &-ultra-wide {
      display: block;
    }

    &-no-mixin.no-overlap {
      display: none;
    }
  }

  @include breakpoint('wide') {
    background: #ff5500;
    &-wide {
      display: block;
    }

    &-ultra-wide.no-overlap {
      display: none;
    }
  }

  @include breakpoint('lg') {
    background: #ffaa00;
    &-lg {
      display: block;
    }

    &-wide.no-overlap {
      display: none;
    }
  }

  @include breakpoint('md') {
    background: #aaff00;
    &-md {
      display: block;
    }

    &-lg.no-overlap {
      display: none;
    }
  }

  @include breakpoint('sm') {
    background: #55ff00;
    &-sm {
      display: block;
    }

    &-md.no-overlap {
      display: none;
    }
  }

  @include breakpoint('xs') {
    background: #00ff00;
    &-xs {
      display: block;
    }

    &-sm.no-overlap {
      display: none;
    }
  }
}
</style>
