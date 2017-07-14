// import Vue from 'vue'
import Router from 'vue-router'
import HomeView from './views/HomeView.vue'
import DetailView from './views/DetailView.vue'
import Propagation from './views/Propagation.vue'
import ListDetail from './views/ListDetail.vue'
import List from './views/List.vue'

Vue.use(Router)


export default new Router({
  // mode: 'abstract',
  routes: [
    { path: '/home', component: HomeView },
    { path: '/detail', component: DetailView },
    { path: '/propagation', component: Propagation },
    { path: '/list', component: List },
    // { path: '/listDetail', component: ListDetail },
    { path: '/listDetail/:id', name: '/listDetail', component: ListDetail },
    // { path: '/listDetail/9522324', component: ListDetail },
    { path: '/', redirect: '/list' },
  ]
})
