// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const createListView = id => () => import('./views/CreateListView').then(m => m.default(id))

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/report/:reportId', component: createListView('0') },
      { path: '/', redirect: '/report/0' }
    ]
  })
}
