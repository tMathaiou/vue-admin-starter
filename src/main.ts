import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
// STYLES
import 'bootstrap/scss/bootstrap.scss';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-toastification/dist/index.css';
import './assets/scss/base.scss';
// EXTERNAL LIBRARIES
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEdit, faHome, faSignOutAlt, faTrashAlt, faUsers} from '@fortawesome/free-solid-svg-icons';
import i18n from './i18n';
import VueSweetalert2 from 'vue-sweetalert2';
import Vuelidate from 'vuelidate';
import Axios from 'axios';
import Toast from 'vue-toastification';

(window as any).axios = Axios;

Vue.use(Toast);
Vue.use(Vuelidate);
Vue.use(VueSweetalert2);

library.add(
  faHome,
  faUsers,
  faSignOutAlt,
  faEdit,
  faTrashAlt,
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
