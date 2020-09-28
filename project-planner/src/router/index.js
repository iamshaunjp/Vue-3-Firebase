import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddProject from '../views/AddProject.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'AddProject',
    component: AddProject
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
