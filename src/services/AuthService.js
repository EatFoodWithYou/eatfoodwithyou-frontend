import Axios from "axios";

const auth_key = "auth-shop";
let auth = JSON.parse(localStorage.getItem(auth_key));
let user = auth ? auth.data.user : "";
let jwt = auth ? auth.data.access_token : "";
const api_endpoint =
	process.env.VUE_APP_SHOP_ENDPOINT || "http://localhost:8000";

export default {
	isAuthen() {
		return user !== "" && jwt !== "";
	},
	isAdmin(role) {
		return role === "ADMIN";
	},
	getApiHeader() {
		if (jwt !== "") {
			return {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			};
		}
		return {};
	},
	getUser() {
		return user;
	},

	getJwt() {
		return jwt;
	},
	setUser() {
		auth = JSON.parse(localStorage.getItem(auth_key));
		user = auth ? auth.data.user : "";
		jwt = auth ? auth.data.access_token : "";
	},
	async login({ email, password }) {
		try {
			let url = api_endpoint + "/api/auth/login";

			let body = {
				email: email,
				password: password,
			};

			let res = await Axios.post(url, body);
			console.log(res.data.user.status);

			if (res.status === 200) {
				// console.log(res.data);
				if (res.data.user.status === "ACTIVE") {
					localStorage.setItem(auth_key, JSON.stringify(res));
					this.setUser();
					return {
						success: true,
						user: res.data.user,
						jwt: res.data.access_token,
						status: 200,
					};
				} else if (res.data.user.status === "BANNED") {
					return {
						success: false,
						user: "",
						jwt: "",
						status: 200,
						message: "YOU ACCOUNT BANNED!!!",
					};
				}
			} else {
				console.log("NOT 200", res);
			}
		} catch (e) {
			// console.log("sad");
			console.error(e);
			console.log(e.response.status);
			if (e.response.status === 401) {
				console.log("sohard");
				console.log(e.response.data);
				console.log("sohard");
				return {
					success: false,
					message: e.response.data.error,
					status: 401,
				};
			} else if (e.response.status === 422) {
				console.log("sohard");
				console.log(e.response.data);
				console.log("sohard");
				return {
					success: false,
					message1: "The email must be a valid email address",
					message2: "The password must be at least 6 characters.",
					status: 422,
				};
			}
			// throw e
		}
	},

	async register({
		email,
		password,
		firstname,
		lastname,
		gender,
		role,
		age,
	}) {
		try {
			let url = `${api_endpoint}/api/auth/register`;

			let body = {
				email: email,
				password: password,
				name: firstname + " " + lastname,
				age: age,
				gender: gender,
				role: role,
			};

			let res = await Axios.post(url, body);
			console.log("hard");
			console.log("it it it res", res);

			localStorage.setItem(auth_key, JSON.stringify(res));
			this.setUser();
			return {
				success: true,
				user: res.data.user,
				jwt: res.data.access_token,
			};
		} catch (e) {
			console.log("error");
			console.error(e);
			console.log(e.response);
			if (e.response.status === 400) {
				// console.log(e.response.data.message[0].messages[0].message);
				return {
					success: false,
					message: e.response.data,
				};
			} else {
				return;
			}
		}
	},

	async logout() {
		localStorage.removeItem(auth_key);
		// let url = `${api_endpoint}/api/auth/logout`;
	},

	async fetchUser({ id }) {
		let url = api_endpoint + "/users/" + id;
		let header = this.getApiHeader();
		let res = await Axios.get(url, header);
		return res.data;
	},

	async fetchRecipes() {
		let url = api_endpoint + "/api/auth/me";
		let header = this.getApiHeader();
		let res = await Axios.post(url, "", header);

		return res;
	},

	async editInformation({ name, age, gender }, id) {
		let url = `${api_endpoint}/api/auth/update/${id}`;
		console.log(url);
		let body = {
			name: name,
			age: age,
			gender: gender,
		};
		let header = this.getApiHeader();
		let res = await Axios.put(url, body, header);
		return res;
	},
	async allUser() {
		let url = `${api_endpoint}/api/auth/allUser`;
		let header = this.getApiHeader();
		let res = await Axios.get(url, header);
		return res.data;
	},

	async updateStatus({ id, status }) {
		// console.log("is id" ,id);
		// console.log("is status" ,status);
		let url = `${api_endpoint}/api/auth/updateStatus/${id}`;
		let header = this.getApiHeader();
		let res = await Axios.put(url, { status: status }, header);
		console.log("is res", res);
	},
};

// export const
