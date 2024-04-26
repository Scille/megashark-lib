import appEnUS from '@/locales/en-US.json';
import appFrFR from '@/locales/fr-FR.json';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { IonicVue } from '@ionic/vue';
import { I18n, MegaSharkPlugin } from '@megashark';

/* Theme variables */
// Manual import since we're not using the built library
import '@lib/theme/global.scss';

I18n.init({
  defaultLocale: 'en-US',
  customAssets: {
    'fr-FR': appFrFR,
    'en-US': appEnUS,
  },
});

const app = createApp(App).use(IonicVue).use(router).use(MegaSharkPlugin);

router.isReady().then(() => {
  app.mount('#app');
});
