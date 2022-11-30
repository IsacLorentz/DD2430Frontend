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
import PrimeInputNumber from "primevue/inputnumber";
import PrimeButton from "primevue/button";
import PrimeProgressSpinner from "primevue/progressspinner";
import PrimeDropdown from "primevue/dropdown";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component("PrimeDialog", PrimeDialog);
app.component("PrimeTabView", PrimeTabView);
app.component("PrimeTabPanel", PrimeTabPanel);
app.component("PrimeToast", PrimeToast);
app.component("PrimeInputNumber", PrimeInputNumber);
app.component("PrimeButton", PrimeButton);
app.component("PrimeProgressSpinner", PrimeProgressSpinner);
app.component("PrimeDropdown", PrimeDropdown);

app.mount("#app");
