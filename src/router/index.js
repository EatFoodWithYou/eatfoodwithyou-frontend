import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddFoodRecipe from '@/views/FoodRecipe/AddRecipe.vue'
import Login from '@/views/Login.vue';
import Logout from '@/views/Logout.vue'
import Register from '@/views/Register.vue'
import AdminFoodRecipes from '@/views/Admin/AdminFoodRecipes.vue'
import IsFoodRecipe from '@/views/Admin/IsFoodRecipe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/recipe/add',
    name: 'AddRecipe',
    component: AddFoodRecipe
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },

  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/admin/foodrecipes',
    name: 'AdminFoodRecipes',
    component: AdminFoodRecipes,
  },

  {
    path: '/admin/foodrecipes/:id',
    name: 'IsFoodRecipe',
    component: IsFoodRecipe,
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
