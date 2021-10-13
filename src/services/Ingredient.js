import Axios from "axios";
import AuthService from "./AuthService";
const api_endpoint =
	process.env.VUE_APP_SHOP_ENDPOINT || "http://localhost:8000";

export default {
	getApiHeader() {
		return {
			headers: {
				Accept: application / json,
			},
		};
	},
	async createIngredient({ name, quantity, unit, food_recipe_id }) {
		try {
			let url = `${api_endpoint}/api/ingredients/`;
			let body = {
				name: name,
				quantity: quantity,
				unit: unit,
				food_recipe_id: food_recipe_id,
			};
			let header = AuthService.getApiHeader();
			let res = await Axios.post(url, body, header);
			console.log(res);
			if (res.status === 201) {
				return {
					success: true,
					ingredient: res.data,
				};
			} else {
				console.log("NOT 200", res);
			}
		} catch (e) {
			console.log(e);
			if (e.response.status === 400) {
				// console.log(e.response.data.message[0].messages[0].message);
				return {
					success: false,
					message: res.message,
				};
			} else {
				let error = "";
				for (let items in e.response.data.errors) {
					// console.log(`${e.response.data.errors[items]}`);
					error = error + `${e.response.data.errors[items]}` + "\n";
				}
				// console.log(error);
				return {
					success: false,
					message: error,
				};
			}
		}
	},
	async updateIngredient(payload) {
		try {
			const url = `${api_endpoint}/api/ingredients/${payload.id}`;
			const headers = AuthService.getApiHeader();
			const res = await Axios.put(url, payload, headers);
			return {
				success: true,
				ingredient: res,
			};
		} catch (e) {
			if (e.response.status === 400) {
				return {
					success: false,
					message: res.message,
				};
			} else {
				let error = "";
				for (let items in e.response.data.errors) {
					error = error + `${e.response.data.errors[items]}` + "\n";
				}
				return {
					success: false,
					message: error,
				};
			}
		}
	},
	async deleteIngredient(id) {
		try {
			const url = `${api_endpoint}/api/ingredients/${id}`;
			const headers = AuthService.getApiHeader();
			const res = await Axios.delete(url, headers);
			return { success: true };
		} catch (e) {
			if (e.response.status === 400) {
				return {
					success: false,
					message: res.message,
				};
			} else {
				let error = "";
				for (let items in e.response.data.errors) {
					error = error + `${e.response.data.errors[items]}` + "\n";
				}
				return {
					success: false,
					message: error,
				};
			}
		}
	},
};
