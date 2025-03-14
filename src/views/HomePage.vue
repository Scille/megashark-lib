<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-title class="title-h1-xl main-title">{{ $msTranslate('usage.title') }}</ion-title>

        <!-- library categories -->
        <ms-dropdown
          class="dropdown"
          :options="categoryOptions"
          :default-option-key="Category.Components"
          @change="category = $event.option.key"
        />

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
import { IonContent, IonPage, IonTitle } from '@ionic/vue';
import { MsDropdown, MsOptions } from '@lib/components';
import { ref } from 'vue';
import ComponentsPage from '@/views/ComponentsPage.vue';
import ServicesPage from '@/views/ServicesPage.vue';
import ResponsivePage from '@/views/ResponsivePage.vue';
import TransitionsPage from '@/views/TransitionsPage.vue';

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
.main-title {
  text-align: center;
  margin: 0;
  padding: 0;
  color: var(--parsec-color-light-primary-800);
}

ion-content {
  --background: var(--parsec-color-light-secondary-background);
}

#container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2rem;
  padding: 3rem;
  background: var(--parsec-color-light-secondary-background);
}
</style>
