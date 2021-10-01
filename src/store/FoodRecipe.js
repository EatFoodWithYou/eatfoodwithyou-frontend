import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const end_point = process.env.SHOP_VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        newFoodRecipe :"",
        newCookingProcess : [],
        newIngredient: [],
    },
    getters:{
        getNewFoodRecipe: state => state.newFoodRecipe,
        getNewCookingProcess: state => state.newCookingProcess,
        getNewIngredient: state => state.newIngredient,
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
  