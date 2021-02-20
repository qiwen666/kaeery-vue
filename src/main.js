import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// import scss
import './assets/scss/style.scss';
import './assets/personal/style.css';

import permission from './permission';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
