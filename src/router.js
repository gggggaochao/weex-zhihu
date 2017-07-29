// import Vue from 'vue'
import Router from 'vue-router'
import HomeView from './views/HomeView.vue'
import DetailView from './views/DetailView.vue'
import Propagation from './views/Propagation.vue'
import ListDetail from './views/ListDetail.vue'
import List from './views/List.vue'
import Iconfont from './views/Iconfont.vue'
import Test from './views/Test.vue'

Vue.use(Router)


export default new Router({
  // mode: 'abstract',
  routes: [
    { path: '/home', component: HomeView },
    { path: '/detail', component: DetailView },
    { path: '/propagation', component: Propagation },
    { path: '/list', component: List },
    { path: '/listDetail/:id', name: '/listDetail', component: ListDetail },
    // { path: '/listDetail/9523910', component: ListDetail },
    { path: '/iconfont', component: Iconfont},
    { path: '/test', component: Test},
    { path: '/', redirect: '/test' },
  ]
})
