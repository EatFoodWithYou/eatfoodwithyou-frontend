import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import loginFrom from "@/components/LoginFrom.vue";
import { Axios } from "axios";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

const route = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
];

describe("Login", () => {
	it("render Login Page", () => {
		const { getByTestId } = render(loginFrom);
		expect(getByTestId("title")).toHaveTextContent("Log in");
	});

	it("render and input email password", async () => {
		const { getByTestId } = render(loginFrom);
		const email = "user@test.com";
		const password = "123456789";
		await fireEvent.update(getByTestId("email"), email);
		await fireEvent.update(getByTestId("password"), password);
		expect(getByTestId("email")).toHaveValue(email);
		expect(getByTestId("password")).toHaveValue(password);
		// await fireEvent.click(getByTestId('submit'));
		// const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || "http://localhost:8000";
		// let url = api_endpoint + "/api/auth/login";
		// expect(Axios.post).toHaveBeenCalledWith(url,
		//     {
		//     email,
		//     password,
		// });
	});

	it("render input and submit login", async () => {
		const { getByTestId } = render(
			loginFrom,
			{ route },
			(vue, store, route)
		);
		const email = "user@test.com";
		const password = "123456789";
		await fireEvent.update(getByTestId("email"), email);
		await fireEvent.update(getByTestId("password"), password);
		await fireEvent.click(getByTestId("submit"));
		// const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || "http://localhost:8000";
		// let url = api_endpoint + "/api/auth/login";
		// expect(getByTestId(''))
		// expect(router.getRoutes()).toHaveLength(1);
		// expect(Axios.post).toHaveBeenCalledWith('http://localhost:8000/api/auth/login',
		//     {
		//     "email" : email,
		//     "password" : password,
		// });
	});
});
