import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// };

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/search',
      name :'Search',
      component: () => import('@/views/search/index.vue')
    }
  ]
})
