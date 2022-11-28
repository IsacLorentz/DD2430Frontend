import { createApp } from "vue/dist/vue.esm-bundler";
import router from "@/router";
import App from "./App.vue";
import PrimeVue from "primevue/config";

import PrimeDialog from "primevue/dialog";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.component("PrimeDialog", PrimeDialog);

app.mount("#app");
