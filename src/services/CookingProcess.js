import Axios from "axios";
import AuthService from "./AuthService";
const api_endpoint =
	process.env.VUE_APP_SHOP_ENDPOINT || "http://localhost:8000";

export default {
	//     getApiHeader() {
	//         return {
	//             headers: {
	//                 Accept: "application/json",
	//             }
	//     }
	// },
	async createCookingProcess(data) {
		try {
			let url = `${api_endpoint}/api/processes/`;
			let jwt = AuthService.getJwt();
			// let body = {
			//     process: process,
			//     photo: photo,
			//     food_recipe_id:food_recipe_id
			// }
			// console.log(data);
			let res = await Axios.post(url, data, {
				headers: {
					"Content-Type": "multipart/form-data",
					Accept: "application/json",
					Authorization: `Bearer ${jwt}`,
				},
			});
			console.log(res);
			if (res.status === 201) {
				return {
					success: true,
					cookingProcess: res.data,
				};
			} else {
				console.log("NOT 200", res);
			}
		} catch (e) {
			console.log(e);
			if (e.response.status === 400) {
				console.log(e.response.data.message[0].messages[0].message);
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
};
