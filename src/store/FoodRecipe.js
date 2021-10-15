import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import FoodRecipe from "../services/FoodRecipe";

const end_point =
	process.env.SHOP_VUE_APP_SHOP_ENDPOINT || "http://localhost:8000";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		newFoodRecipe: "",
		newCookingProcess: [],
		newIngredient: [],
		allFoodRecipes: [],
		currentFoodRecipe: "",
		currentFood: "",
		comment: ""
	},
	getters: {
		getNewFoodRecipe: state => state.newFoodRecipe,
		getNewCookingProcess: state => state.newCookingProcess,
		getNewIngredient: state => state.newIngredient,
		getAllFoodRecipes: state => state.allFoodRecipes,
		getCurrentFoodRecipe: state => state.currentFoodRecipe,
		getCurrentFood: state => state.currentFood,
		getComment: state => state.comment
	},
	mutations: {
		fetch(state, res) {
			state.allFoodRecipes = res.data;
		},
		fetchAfterDelete(state) {
			state.allFoodRecipes = state.allFoodRecipes;
		},
		fetchCurrentRecipe(state, { res }) {
			state.currentFood = res.data.data;
			// console.log("cur",state.currentFood);
		},
		editSuccess(state, { res, index }) {
			state.comment[index] = res;
		},
		fetchAllComment(state, body) {
			state.comment = body;
		}
	},
	actions: {
		async fetchFoodRecipes({ commit }) {
			let res = await FoodRecipe.getFoodRecipe();
			// console.log("123");
			// console.log(res.foodRecipe.data);
			commit("fetch", res);

			return res.foodRecipe.data;
		},

		async fetchCurrentRecipes({ commit }, id) {
			let res = await FoodRecipe.getCurrentRecipe(id);
			// console.log("123");
			// console.log(res);
			commit("fetch", res);

			return res.foodRecipe.data;
		},

		async deleteCurrentRecipes({ commit }, isid) {
			console.log("123");
			console.log(isid);
			await FoodRecipe.deleteCurrent(isid);
		},
		async fetchFood({ commit }, id) {
			try {
				const url = end_point + `/api/recipes/${id}`;
				console.log(url);
				//const headers = AuthService.getApiHeader();
				//console.log("find", res)

				let res = await axios.get(url);
				commit("fetchCurrentRecipe", { res });
				// console.log("find", res.data)
			} catch (e) {
				console.log(e.message);
			}
		},

		async editComment({ commit }, { comment, id, index }) {
			// console.log("123");
			// console.log("55555" , id);
			// console.log("66666" , comment);
			let res = await FoodRecipe.changeComment({ comment, id });
			commit("editSuccess", { res, index });
			console.log("5555", res);
			return res.isComment;
		},

		async fetchComment({ commit }, id) {
			let res = await FoodRecipe.getComment(id);
			console.log("is res", res);
			commit("fetchAllComment", res);
			return res;
		}
	},

	modules: {}
});
