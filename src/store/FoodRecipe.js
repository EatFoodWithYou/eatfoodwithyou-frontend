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
        currentFood: "",
    },
    getters:{
        getNewFoodRecipe: state => state.newFoodRecipe,
        getNewCookingProcess: state => state.newCookingProcess,
        getNewIngredient: state => state.newIngredient,
        getCurrentFood: state=>state.currentFood
    },
    mutations: {
        fetch(state, {res}){
            state.currentFood = res.data.data;
            // console.log("cur",state.currentFood);
        }
    },
    actions: {
        async fetchFood({commit}, id){
            try{
                const url = end_point + `/api/recipes/${id}`;
                console.log(url)
                //const headers = AuthService.getApiHeader();
                //console.log("find", res)

                let res = await axios.get(url);
                commit('fetch',{res})
                // console.log("find", res.data)
            }catch(e){
                console.log(e.message);
            }
    },
},
modules: {
}
})
   