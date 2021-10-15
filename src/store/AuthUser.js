import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import AuthService from "@/services/AuthService";

const end_point =
	process.env.SHOP_VUE_APP_SHOP_ENDPOINT || "http://localhost:8000";

Vue.use(Vuex);

let auth_key = "auth-shop";
let auth = JSON.parse(localStorage.getItem(auth_key));
const initialStateUser = {
	user: auth ? auth.data.user : "",
	jwt: auth ? auth.data.access_token : "",
	isAuthen: auth ? true : false,
	isAdmin: auth ? auth.data.user.role === "ADMIN" : false,
};

export default new Vuex.Store({
    state: {
        currentUser: initialStateUser,
        allUser:[]
    },
    getters:{
        getCurrentUser : state => state.currentUser,
        getAllUser: state => state.AllUser ,
        isAuthen : state => state.currentUser.isAuthen,
        isAdmin : state => state.currentUser.isAdmin
    },
    mutations: {
        setCurrentUser(state, body) 
        {
            state.currentUser.user = body.user,
            state.currentUser.jwt = body.jwt,
            state.currentUser.isAuthen = true;
            // if (body.user.role === "ADMIN")
            // {
            //     state.currentUser.isAdmin = true
            // }
            // else
            // {
            //     state.currentUser.isAdmin = false
            // }
            state.currentUser.isAdmin = AuthService.isAdmin(body.user.role)
            
        },

		setUser(state, body) {
			console.log(state.currentUser);
			(state.currentUser.user = body.user), console.log(3);
			console.log(state.currentUser);
		},

		logoutSuccess(state) {
			
			state.currentUser.user = "",
			state.currentUser.jwt = "",
			state.currentUser.isAuthen = false,
			state.currentUser.isAdmin = false;
			
		},
        setAllUser(state , body)
        {
            state.allUser = body
        }

	},
	actions: {
		async login({ commit }, { email, password }) {
		
			let res = await AuthService.login({ email, password });
		
			let body = {
				user: res.user,
				jwt: res.jwt,
			};

			//console.log(res.success);
			if (res.success) {
				commit("setCurrentUser", body);
			}
			return res;
		},

		async logout({ commit }) {
			AuthService.logout();
			commit("logoutSuccess");
		},

		async register(
			{ commit },
			{ email, password, firstname, lastname, gender, role, age }
		) {
			let res = await AuthService.register({
				email,
				password,
				firstname,
				lastname,
				gender,
				role,
				age,
			});

			if (res.success) {
				commit("loginSuccess", res);
			}
			return res;
		},

		async setUser({ commit }, user) {
			commit("setUser", user);
		},
        async fetchAllUser({ commit })
        {
            let res = await AuthService.allUser()
            console.log("123");
            console.log(res);
            commit("setAllUser" , res)

            return res
        },

        async activeUser({commit} , {id , status})
        {
            console.log("123");
			console.log(id);
			await AuthService.updateStatus({id,status});
        },

        async banUser({commit} , {id , status})
        {
            console.log("123");
			console.log(id);
			await AuthService.updateStatus({id,status});
        }

	},
	modules: {},
});
