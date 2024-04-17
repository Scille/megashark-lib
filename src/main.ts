import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import appEnUS from '@/locales/en-US.json';
import appFrFR from '@/locales/fr-FR.json';

import { IonicVue } from '@ionic/vue';
import { TranslationPlugin, I18n } from '@lib/services/translation';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import '@lib/theme/global.scss';

I18n.init({
  defaultLocale: 'en-US',
  customAssets: {
    'fr-FR': appFrFR,
    'en-US': appEnUS
  },
});

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(TranslationPlugin);
  
router.isReady().then(() => {
  app.mount('#app');
});
