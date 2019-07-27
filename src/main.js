import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import './theme/index.css';
import App from './App.vue';
import router from './router';
import store from './store/index';
import fetch from './common/js/fetch';
import currency from './common/js/util/currency';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.fetch = fetch;

Vue.filter('capitalize', function(value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});
Vue.filter('currency', currency);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
