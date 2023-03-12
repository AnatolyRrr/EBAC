import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import './shared/lib/validation/index';

const pinia = createPinia();

createApp(App).use(pinia).mount("#app");
