import { createApp, h } from 'vue'
import App from './App.vue'
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/dist/style.css";
import router from './router';

const app = createApp(App);
app.use(router);
app.use(SnackbarService);
app.component("vue3-snackbar", Vue3Snackbar);
app.mount("#app");


