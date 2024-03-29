import { createRouter, createWebHashHistory } from 'vue-router';
import Auth from "./components/Auth.vue"
import DashBoard from "./components/DashBoard.vue"
import Addpoint from "./components/Addpoint.vue"
import NotFound from "./components/404.vue"



export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: DashBoard },
        { path: '/login', component: Auth },   
        { path: '/addpoint', component: Addpoint },               
        { path: '/:pathMatch(.*)*', component: NotFound }
    ]
});

