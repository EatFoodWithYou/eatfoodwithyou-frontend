import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddFoodRecipe from "@/views/FoodRecipe/AddRecipe.vue";
import Login from "@/views/Login.vue";
import Logout from "@/views/Logout.vue";
import Register from "@/views/Register.vue";
import UserInfo from "@/views/UserInfo.vue";
import EditInfo from "@/views/EditInfo.vue";
import FoodRecipeInfomarion from "@/views/FoodRecipe/foodRecipeInformation.vue";
import foodRecipeItem from "@/views/FoodRecipe/foodRecipeItem.vue";
import SearchRecipes from "@/views/FoodRecipe/SearchRecipes";
import AdminFoodRecipes from '@/views/Admin/AdminFoodRecipes.vue'
import UserManage from '@/views/Admin/UserManagement.vue'
import EditFoodRecipe from '@/views/FoodRecipe/EditRecipe.vue'


// import IsFoodRecipe from '@/views/Admin/IsFoodRecipe.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/recipe/add",
    name: "AddRecipe",
    component: AddFoodRecipe,
  },

  {
    path: '/recipe/edit/:id',
    name: 'EditRecipe',
    component: EditFoodRecipe
  }, 

  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: '/admin/foodrecipes',
    name: 'AdminFoodRecipes',
    component: AdminFoodRecipes,
  },

  // {
  //   path: '/admin/foodrecipes/:id',
  //   name: 'IsFoodRecipe',
  //   component: IsFoodRecipe,
  // },
  {
    path: '/admin/user-manage',
    name: 'UserManage',
    component: UserManage,
  },
  


  {
    path: "/user-information",
    name: "UserInfo",
    component: UserInfo,
  },

  {
    path: "/edit-information",
    name: "EditInfo",
    component: EditInfo,
  },

  {
    path: '/recipe/:name',
    name: 'SearchRecipes',
    component: SearchRecipes,
  },


  {
    path: '/recipe/:id/information',
    name: 'FoodRecipeInfor',
    component: FoodRecipeInfomarion,
  },

  {
    path: "/recipe",
    name: "foodRecipeItem",
    component: foodRecipeItem,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
