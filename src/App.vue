<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';
import { toggleDarkMode } from '@lib/states/darkMode';

onMounted(async (): Promise<void> => {
  toggleDarkMode('light');
});
</script>
