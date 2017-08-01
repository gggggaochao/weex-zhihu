// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as filters from './filters'
import mixins from './mixins'

// sync the router with the vuex store.
// this registers `store.state.route`
// sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)

new Vue(Vue.util.extend({ el: '#root', router }, App))

router.push('/')