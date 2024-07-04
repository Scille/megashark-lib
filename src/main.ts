import App from '@/App.vue';
import appEnUS from '@/locales/en-US.json';
import appFrFR from '@/locales/fr-FR.json';
import router from '@/router';
import { createApp } from 'vue';

import { IonicVue } from '@ionic/vue';
import { Environment, EnvironmentType, MegaSharkPlugin } from '@megashark';

/* Theme variables */
// Manual import since we're not using the built library
import '@lib/theme/global.scss';
// Local project global styles
import '@/global.scss';

const megasharkPlugin = new MegaSharkPlugin({
  i18n: {
    defaultLocale: 'en-US',
    customAssets: {
      'fr-FR': appFrFR,
      'en-US': appEnUS,
    },
  },
  stripeConfig: {
    publishableKey: Environment.get('STRIPE_PUBLISHABLE_KEY', 'pk_test_FAKE') ?? '',
    environment: EnvironmentType.Development,
    locale: 'en-US',
  },
});

await megasharkPlugin.init();

const app = createApp(App).use(IonicVue).use(router).use(megasharkPlugin);

router.isReady().then(() => {
  app.mount('#app');
});
