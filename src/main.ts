import appEnUS from '@/locales/en-US.json';
import appFrFR from '@/locales/fr-FR.json';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { IonicVue } from '@ionic/vue';
import { I18n, MegaSharkPlugin } from '@megashark';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/display.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';

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
