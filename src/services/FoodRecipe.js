import axios from "axios";
import Axios from "axios";
import AuthService from "./AuthService";
const api_endpoint =
	process.env.VUE_APP_SHOP_ENDPOINT || "http://localhost:8000";

export default {
	async createFoodRecipe(data) {
		try {
			let url = `${api_endpoint}/api/recipes/`;
			let jwt = AuthService.getJwt();
			let res = await Axios.post(url, data, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${jwt}`,
				},
			});
			// console.log(res);
			if (res.status === 201) {
				return {
					success: true,
					foodRecipe: res.data,
				};
			} else {
				console.log("NOT 200", res);
			}
		} catch (e) {
			console.log(e.response.data.errors);
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
	async getRecipesFromName(name) {
		let url = `${api_endpoint}/api/recipes/search/${name}`;
		let res = await Axios.get(url);
		return res.data;
	},

	async getFoodRecipe() {
		try {
			let url = `${api_endpoint}/api/recipes/`;
			let res = await Axios.get(url, null, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			if (res.status === 200) {
				return {
					success: true,
					foodRecipe: res.data,
				};
			} else {
				console.log("NOT 200", res);
			}
		} catch (e) {
			console.log(e.response.data.errors);
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

	async fetchAllRecipes() {
		try {
			const url = api_endpoint + "/api/recipes";
			const headers = AuthService.getApiHeader();
			const res = await Axios.get(url, headers);
			return res.data;
		} catch (e) {
			console.log(e.message);
		}
	},
	async fetchRecipeById(id) {
		try {
			const url = api_endpoint + `/api/recipes/${id}`;
			const headers = AuthService.getApiHeader();
			const res = await Axios.get(url, headers);
			return res.data;
		} catch (e) {
			console.log(e.message);
		}
	},

	async getCurrentRecipe(id) {
		try {
			let url = `${api_endpoint}/api/recipes/${id}`;
			//console.log();
			let res = await Axios.get(url, null, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			if (res.status === 200) {
				return {
					success: true,
					foodRecipe: res.data,
				};
			} else {
				console.log("NOT 200", res);
			}
		} catch (e) {
			console.log(e.response.data.errors);
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

	async deleteCurrent(id) {
		let url = `${api_endpoint}/api/recipes/${id}`;
		let jwt = AuthService.getJwt();
		console.log(jwt);
		await Axios.delete(url, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
	},

	async deleteFoodRecipe(id) {
		try {
			const url = `${api_endpoint}/api/recipes/${id}`;
			const headers = AuthService.getApiHeader();
			await Axios.delete(url, headers);
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

	async updateFoodRecipe(payload) {
		try {
			const url = `${api_endpoint}/api/recipes/${payload.get(
				"id"
			)}?_method=PUT`;
			const jwt = AuthService.getJwt();
			const res = await Axios.post(url, payload, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${jwt}`,
				},
			});
			return {
				success: true,
				foodRecipe: res,
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

	async likeFoodRecipe(data) {
		try {
			let url = `${api_endpoint}/api/likes/`;
			let jwt = AuthService.getJwt();
			let res = await Axios.post(url, data, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			// console.log(res);
			if (res.status === 201) {
				return {
					success: true,
					like: res.data,
				};
			} else {
				console.log("NOT 200", res);
			}
		} catch (e) {
			console.log(e.response.data.errors);
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
	async deleteLike(id) {
		// try
		// {
		let url = `${api_endpoint}/api/likes/${id}`;
		console.log("like url",url);
		let jwt = AuthService.getJwt();
		console.log(jwt);
		await Axios.delete(url, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
	},

	async searchFoodRecipeByCategories(payload) {
		const url = `${api_endpoint}/api/recipes/category/${payload}`;
		const headers = AuthService.getApiHeader();
		const res = await Axios.get(url, headers);
		return res.data;
	},
	async changeComment({ comment, id }) {
		//console.log("55555" , id);
		// console.log("66666" , comment);
		let url = `${api_endpoint}/api/comments/${id}`;
		// console.log("66666" , url);
		let jwt = AuthService.getJwt();
		let headers = AuthService.getApiHeader();
		// console.log("66666" , headers);
		let res = await Axios.put(url, { isComment: comment }, headers);
		console.log("is res", res);
		return res.data;
	},

	async getComment(id) {
		let url = `${api_endpoint}/api/recipe/comments/${id}`;
		let headers = AuthService.getApiHeader();

		let res = await Axios.get(url, null, headers);

		return res.data;
	},

	async addComment( user_id, food_id, comment) {
		try{
			let url = `${api_endpoint}/api/comments`
		let headers = AuthService.getApiHeader();
		let body = {
			user_id : user_id,
			food_recipe_id : food_id,
			isComment : comment
		}
		console.log("this is body",body);
		let res = await Axios.post(url, body, headers);
		console.log("res2",res)
		return res.data
		} catch (e) {
			console.log("this is error from try catch",e)
		}
	},

	async deleteComment(id) {
		try {
			const url = `${api_endpoint}/api/comments/${id}`;
			const headers = AuthService.getApiHeader();
			console.log("This is url", url);
			let res = await Axios.delete(url, headers);
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
