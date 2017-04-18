import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/index.vue';
import found from '../pages/found.vue';
import lost from '../pages/lost.vue';
import advice from '../pages/advice.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/found',
      name: 'found',
      component: found
    },{
      path: '/lost',
      name: 'lost',
      component: lost
    }, {
      path: '/advice',
      name: 'advice',
      component: advice
    }
  ]
});
