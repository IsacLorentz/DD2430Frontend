import { createApp } from "vue/dist/vue.esm-bundler";
import router from "@/router";
import App from "./App.vue";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import PrimeDialog from "primevue/dialog";
import PrimeTabView from "primevue/tabview";
import PrimeTabPanel from "primevue/tabpanel";
import PrimeToast from "primevue/toast";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component("PrimeDialog", PrimeDialog);
app.component("PrimeTabView", PrimeTabView);
app.component("PrimeTabPanel", PrimeTabPanel);
app.component("PrimeToast", PrimeToast);

app.mount("#app");
