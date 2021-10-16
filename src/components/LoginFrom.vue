<template>
	<div class="bg-gray-200 main-container min-h-screen">
		<div class="font-prompt">
			<div class="mt-48">
				<div class="text-center py-4 text-gray-800">
					<h2 class="text-7xl">Log in</h2>
				</div>
				<div class="flex justify-center">
					<form
						class="w-3/12 max-w-4xl"
						@submit.prevent="
							login(loginFrom.email, loginFrom.password)
						"
					>
						<div class="flex flex-wrap -mx-3 mb-5 mt-4">
							<div class="w-full md:w-full px-3 md:mb-0">
								<label
									class="
										block
										uppercase
										tracking-wide
										text-gray-800 text-xl
										mb-2
									"
								>
									Email
								</label>
								<div class="relative">
									<input
										class="
											appearance-none
											block
											w-full
											bg-white
											text-gray-700 text-xl
											border
											rounded
											py-3
											px-4
											mb-3
											leading-tight
											focus:outline-none focus:bg-white
										"
										type="text"
										v-model="loginFrom.email"
										placeholder="Email"
									/>
								</div>
							</div>
							<div class="w-full md:w-full px-3 md:mb-0">
								<label
									class="
										block
										uppercase
										tracking-wide
										text-gray-800 text-xl
										mb-2
									"
								>
									Password
								</label>
								<div class="relative">
									<input
										class="
											appearance-none
											block
											w-full
											bg-white
											text-gray-700 text-xl
											border
											rounded
											py-3
											px-4
											leading-tight
											focus:outline-none focus:bg-white
										"
										type="password"
										v-model="loginFrom.password"
										placeholder="Password"
									/>
								</div>
							</div>
						</div>
						<span
							class="
								lg:flex
								text-base
								lg:text-lg
								text-gray-800
								float-right
								-mt-3
								cursor-default
							"
							>Don’t have an account?&nbsp;<button
								@click="signup()"
								class="
									text-red-700
									font-semibold
									hover:text-red-500 hover:underline
								"
							>
								Sign up
							</button>
						</span>
						<div class="py-3 text-center mt-10 text-black">
							<button
								class="
									font-normal
									rounded-full
									text-2xl
									p-2
									w-44
									bg-navbarColor
									text-white
									hover:bg-gray-800
									transition
									duration-250
								"
							>
								Log in
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import ShopStore from '@/store/Shop'
import AuthUser from "@/store/AuthUser";
export default {
	data() {
		return {
			currentUser: "",
			loginFrom: {
				email: "",
				password: "",
			},
		};
	},
	methods: {
		async login() {
			//  console.log("it is loginform" ,this.loginFrom);
			if (this.loginFrom.email !== "" && this.loginFrom.password !== "") {
				let res = await AuthUser.dispatch("login", this.loginFrom);
				console.log(1);
				console.log(res);
				console.log(2);
				if (res.success) {
					this.$swal(
						"Login Success",
						`Welcome, ${res.user.name}`,
						"success"
					);
					// console.log(res.user);
					this.currentUser = res.user;
					console.log(this.currentUser);
					// console.log(this.currentUser);
					// ShopStore.dispatch('setCurrentUser',this.currentUser)
					this.$router.push("/");
				} else {
					this.$swal("Login Failed", res.message, "error");
				}
			} else {
				this.$swal(
					"Login Failed",
					"please enter you email or password",
					"error"
				);
			}
		},
		clearFrom() {
			this.loginFrom.email = "";
			this.loginFrom.password = "";
		},
		signup() {
			this.$router.push("/register");
		},
	},
};
</script>

<style lang="scss" scoped></style>
>
