import { createApp } from 'vue'
import Login from './Login.vue'

const login = createApp(Login);
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/dist/style.css";

login.use(SnackbarService);
login.component("vue3-snackbar", Vue3Snackbar);
login.mount("#login");






// createApp(App).mount('#app')






