import { createApp } from 'vue';
import { createMetaManager } from 'vue-meta'
import { createI18n } from 'vue-i18n';
import Toaster from '@meforma/vue-toaster';
import IoniconsPlugin from './plugins/ionicons';
import App from './App.vue';
import router from './router';
import store from './store';
import locales from './common/locales';
import toTimer from './directives/toTimer';

// 👉 EKLENECEK
import ClientService from './services/ClientService';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: locales
});

// 👉 WS BAĞLANTISI BURADA BAŞLAR
ClientService.connect(import.meta.env.VUE_APP_WS_SERVER);

createApp(App)
  .use(i18n)
  .use(createMetaManager())
  .use(Toaster, {
    position: 'bottom',
    duration: 3000
  })
  .use(IoniconsPlugin)
  .directive('to-timer', toTimer)
  .use(router)
  .use(store)
  .mount('#app');
