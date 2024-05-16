import App from '@/App.vue';
import appEnUS from '@/locales/en-US.json';
import appFrFR from '@/locales/fr-FR.json';
import router from '@/router';
import { createApp } from 'vue';

import { IonicVue } from '@ionic/vue';
import { MegaSharkPlugin } from '@megashark';

/* Theme variables */
// Manual import since we're not using the built library
import '@lib/theme/global.scss';
// Local project global styles
import '@/global.scss';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(MegaSharkPlugin, {
    i18n: {
      defaultLocale: 'en-US',
      customAssets: {
        'fr-FR': appFrFR,
        'en-US': appEnUS,
      },
    },
  });

router.isReady().then(() => {
  app.mount('#app');
});
