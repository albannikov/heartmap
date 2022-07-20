import { createApp } from 'vue'
import App from './App.vue'
// import ymapPlugin from 'vue-yandex-maps/dist/vue-yandex-maps.esm.js';
import YmapPlugin from 'vue-yandex-maps'

const app = createApp(App)
app.use(YmapPlugin);
app.mount('#app');
