import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Cart from '../views/Cart'
import History from '../utils/history'

Vue.use(History);
Vue.use(VueRouter);

//扩展VueRouter,添加到goBack方法
VueRouter.prototype.goBack = function () {
  this.isBack = true;
  this.back();
};
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      auth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    //如果能拿到token，则说明这个人肯定是登录过的
    const token = localStorage.getItem('token');
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.path}
      })
    }
  } else {
    //不需要登录验证的
    next()
  }
});

//每次从路由出来之后
router.afterEach((to, from, next) => {
  if (router.isBack) {
    History.pop();
    router.isBack = false;
    router.transitionName = 'route-back';
  } else {
    History.push(to.path);
    router.transitionName = 'route-forward';
  }
});

export default router
