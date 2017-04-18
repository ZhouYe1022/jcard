import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.filter('datetime', function(val) {
  if (!val) {
    return;
  }
  var d = new Date((new Date(val)).valueOf() + 28800000);
  return d.toLocaleString();
})
import App from './App.vue';
import router from './router';
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data() {
    return {};
  },
  render: h => h(App)
});
