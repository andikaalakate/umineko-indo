import { createApp } from "vue";

import "@assets/style.css";

import App from "./App.vue";
import router from "./router";

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

const app = createApp(App);
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

app.use(router);
app.use(VuePlyr, {
    plyr: {}
})

app.mount("#app");
