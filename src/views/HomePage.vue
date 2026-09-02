<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div class="flex">
          <ion-title class="main-title">{{ $msTranslate('usage.title') }}</ion-title>
          <!-- library categories -->
          <ms-dropdown
            class="dropdown"
            :options="categoryOptions"
            :default-option-key="Category.Components"
            @change="category = $event.option.key"
          />
        </div>

        <!-- components -->
        <components-page v-if="category === Category.Components" />

        <!-- services -->
        <services-page v-else-if="category === Category.Services" />

        <!-- transitions -->
        <transitions-page v-else-if="category === Category.Transitions" />

        <!-- responsive -->
        <responsive-page v-else-if="category === Category.Responsive" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import ComponentsPage from '@/views/ComponentsPage.vue';
import ResponsivePage from '@/views/ResponsivePage.vue';
import ServicesPage from '@/views/ServicesPage.vue';
import TransitionsPage from '@/views/TransitionsPage.vue';
import { IonContent, IonPage, IonTitle } from '@ionic/vue';
import { MsDropdown, MsOptions } from '@lib/components';
import { ref } from 'vue';

enum Category {
  Components,
  Services,
  Transitions,
  Responsive,
}

const categoryOptions: MsOptions = new MsOptions([
  { label: 'usage.categories.components', key: Category.Components },
  { label: 'usage.categories.services', key: Category.Services },
  { label: 'usage.categories.transitions', key: Category.Transitions },
  { label: 'usage.categories.responsive', key: Category.Responsive },
]);

const category = ref<Category>(Category.Components);
</script>

<style scoped lang="scss">
@use '@lib/theme' as ms;

#container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ms.spacing('gap-5xl');
  padding: ms.spacing('padding-7xl');
  background: ms.color('surface-base-default-secondary');

  @include ms.responsive-breakpoint('sm') {
    padding: ms.spacing('padding-5xl');
  }
}

.flex {
  display: flex;
  align-items: center;
  gap: ms.spacing('gap-5xl');
}

.main-title {
  @include ms.font('heading-h1');
}
</style>
