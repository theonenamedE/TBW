import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ListView from '@/views/ListView.vue'
import DetailsView from '@/views/DetailsView.vue'
import AddView from '@/views/AddView.vue'
import WatchView from '@/views/WatchView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/list',
    name: 'list',
    component: ListView,
  },
  {
    path: '/details/:id',
    name: 'details',
    component: DetailsView,
  },
  {
    path: '/add',
    name: 'add',
    component: AddView,
  },
  {
    path: '/watch/:name/:id',
    name: 'watch',
    component: WatchView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
