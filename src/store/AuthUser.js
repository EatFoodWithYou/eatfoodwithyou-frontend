import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import AuthService from "@/services/AuthService"

const end_point = process.env.SHOP_VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000';

Vue.use(Vuex);

let auth_key = 'auth-shop';
let auth = JSON.parse(localStorage.getItem(auth_key));
const initialStateUser = {
    user: auth ? auth.user : '',
    jwt: auth ? auth.jwt : '',
    isAuthen: auth ? true : false,
};

export default new Vuex.Store({
    state: {
        currentUser: initialStateUser,
    },
    getters:{
        getCurrentUser : state => state.currentUser,
        isAuthen : state => state.currentUser.isAuthen
    },
    mutations: {
        setCurrentUser(state, body) 
        {
            state.currentUser.user = body.user,
            state.currentUser.jwt = body.jwt,
            state.currentUser.isAuthen = true;
            console.log(3)
            console.log(state.currentUser)
        },

        logoutSuccess(state)
        {
            
            console.log(1);
            console.log(state.currentUser);
            state.currentUser.user = '',
            state.currentUser.jwt = '',
            state.currentUser.isAuthen = false;
            // console.log(state.currentUser);
        }   
    },
    actions: {
        async login ({commit} ,{email , password})
        {
          console.log("is mail " + email + "and " + password);
          let res = await AuthService.login({ email , password})
          console.log(5);
          console.log(res);
          console.log(6);
          let body = {
            user : res.user ,
            jwt: res.jwt
            }
            
          console.log(res.success);  
          if (res.success)
          {
              commit('setCurrentUser' , body)
          }
          return res
        },

        async logout({ commit }) {
            AuthService.logout();
            commit('logoutSuccess');
        },

        async register({ commit },{email, password, firstname, lastname ,gender, role , age})
      {
        let res = await AuthService.register({email, password, firstname, lastname ,gender, role ,age})


        if(res.success){
            commit("loginSuccess", res)
        }
        return res
      }
    },
    modules: {
    }
})
  