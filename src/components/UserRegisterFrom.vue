<template>
	<div class="bg-bgColor main-container min-h-screen">
		<div class="font-prompt">
			<div class="mt-20">
				<div class="text-center py-4 text-white">
					<h2 class="text-7xl">Register</h2>
				</div>
				<div class="flex justify-center">
					<form class="w-3/12 max-w-4xl" @submit.prevent="register">
						<div class="flex flex-wrap -mx-3 mb-5 mt-4">
							<div class="w-full md:w-full px-3 md:mb-0">
								<label
									class="
										block
										uppercase
										tracking-wide
										text-white text-xl
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
											bg-gray-200
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
										v-model="registerForm.email"
										autocomplete="off"
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
										text-white text-xl
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
											bg-gray-200
											text-gray-700 text-xl
											border
											rounded
											py-3
											px-4
											leading-tight
											focus:outline-none focus:bg-white
										"
										type="password"
										v-model="registerForm.password"
										autocomplete="off"
										placeholder="Password"
									/>
								</div>
							</div>
							<div class="w-full md:w-full px-3 md:mb-0 mt-3">
								<label
									class="
										block
										uppercase
										tracking-wide
										text-white text-xl
										mb-2
									"
								>
									Confirm Password
								</label>
								<div class="relative">
									<input
										class="
											appearance-none
											block
											w-full
											bg-gray-200
											text-gray-700 text-xl
											border
											rounded
											py-3
											px-4
											leading-tight
											focus:outline-none focus:bg-white
										"
										type="password"
										v-model="confirm_password"
										autocomplete="off"
										placeholder="Confirm Password"
									/>
								</div>
							</div>
							<div class="w-full md:w-1/2 px-3 md:mb-0 mt-3">
								<label
									class="
										block
										uppercase
										tracking-wide
										text-white text-xl
										mb-2
									"
								>
									FirstName
								</label>
								<div class="relative">
									<input
										class="
											appearance-none
											block
											w-full
											bg-gray-200
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
										v-model="registerForm.firstname"
										autocomplete="off"
										placeholder="Firstname"
									/>
								</div>
							</div>
							<div class="w-full md:w-1/2 px-3 md:mb-0 mt-3">
								<label
									class="
										block
										uppercase
										tracking-wide
										text-white text-xl
										mb-2
									"
								>
									lastname
								</label>
								<div class="relative">
									<input
										class="
											appearance-none
											block
											w-full
											bg-gray-200
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
										v-model="registerForm.lastname"
										autocomplete="off"
										placeholder="lastname"
									/>
								</div>
							</div>
							<div class="w-full md:w-1/2 px-3 md:mb-0">
								<label
									class="
										block
										uppercase
										tracking-wide
										text-white text-xl
										mb-2
									"
								>
									Age
								</label>
								<div class="relative">
									<input
										class="
											appearance-none
											block
											w-full
											bg-gray-200
											text-gray-700 text-xl
											border
											rounded
											py-3
											px-4
											mb-3
											leading-tight
											focus:outline-none focus:bg-white
										"
										type="number"
										v-model="registerForm.age"
										autocomplete="off"
										placeholder="Age"
									/>
								</div>
							</div>
							<div class="w-full md:w-1/2 px-3 md:mb-0">
								<label
									class="
										block
										uppercase
										tracking-wide
										text-white text-xl
										mb-2
									"
								>
									Gender
								</label>
								<div class="relative">
									<select
										class="
											block
											appearance-none
											w-full
											bg-gray-200
											border border-gray-200
											text-gray-700 text-xl
											py-3
											px-4
											pr-8
											rounded
											leading-tight
											focus:outline-none
											focus:bg-white
											focus:border-gray-500
										"
										v-model="registerForm.gender"
									>
										<option value="MALE">Male</option>
										<option value="FEMALE">Female</option>
										<option>Unspecified</option>
									</select>
									<div
										class="
											pointer-events-none
											absolute
											inset-y-0
											right-0
											flex
											items-center
											px-2
											text-gray-700
										"
									>
										<svg
											class="fill-current h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path
												d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
						<span
							class="
								lg:flex
								text-base
								lg:text-lg
								text-white
								float-right
								-mt-7
								cursor-default
							"
							>Already have an account?&nbsp;<button
								@click="login()"
								class="
									text-red-700
									font-semibold
									hover:text-red-500 hover:underline
								"
							>
								Log in
							</button>
						</span>
						<div class="py-3 text-center text-black">
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
								Sign up
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
export default {
	data() {
		return {
			allUser: [],
			currentUser: "",
			edit: false,
			confirm_password: "",
			registerForm: {
				email: "",
				password: "",
				firstname: "",
				lastname: "",
				age: 0,
				gender: "",
				role: "USER",
			},
		};
	},
	methods: {
		async register() {
			console.log(this.registerForm);
			if (this.checkNull()) {
				if (this.registerForm.password === this.confirm_password) {
					let res = await AuthUser.dispatch(
						"register",
						this.registerForm
					);
					console.log(56);
					console.log(res);
					if (res.success) {
						this.$swal(
							"Register Success",
							`Welcome ${res.user.username}`,
							"success"
						);
						this.$router.push("/");
					} else {
						this.$swal("Register Failed", res.message, "error");
					}
				} else {
					this.$swal(
						"Register Failed",
						"Your password and confirm password is not match!",
						"error"
					);
				}
			} else {
				this.$swal(
					"Register Failed",
					"Please check that the information you have entered is complete.",
					"error"
				);
			}
		},
		login() {
			this.$router.push("/login");
		},

		checkNull() {
			return (
				this.registerForm.email !== "" &&
				this.registerForm.password !== "" &&
				this.registerForm.confirm_password !== "" &&
				this.registerForm.firstname !== "" &&
				this.registerForm.lastname !== "" &&
				this.registerForm.age !== 0 &&
				this.registerForm.gender !== "" &&
				this.registerForm.role !== ""
			);
		},
	},
};
</script>

<style lang="scss" scoped></style>
>
