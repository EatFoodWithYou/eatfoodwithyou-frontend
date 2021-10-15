<template>
	<div class="sm:flex z-30">
		<div
			class="
				sm:flex sm:justify-between
				font-sans
				bg-navbarColor
				w-full
				py-1
			"
		>
			<div class="flex justify-between px-4 text-yellow-50 text-2xl">
				<a class="flex mb-3" href="http://localhost:8080/">
					<img
						class="block h-12 w-auto mt-1.5"
						src="../assets/logo.svg"
						alt="EFWY"
					/>
					<div class="hidden lg:block font-semibold px-5 mt-4">
						EAT FOOD WITH YOU
					</div>
					<div class="lg:hidden block font-semibold px-5 mt-3.5">
						EFWY
					</div>
				</a>
				<button @click="isOpen = !isOpen" class="flex sm:hidden mt-4">
					<font-awesome-icon
						:icon="['fas', 'bars']"
						class="text-white text-3xl"
						v-if="!isOpen"
					/>
					<font-awesome-icon
						:icon="['fas', 'times']"
						class="text-white text-3xl"
						v-if="isOpen"
					/>
				</button>
			</div>
			<div :class="isOpen ? 'block' : 'hidden'" class="sm:block pt-1">
				<div
					class="
						md:space-x-5
						sm:text-2xl
						text-xl text-center
						relative
						sm:flex
						font-prompt
					"
				>
					<a
						class="
							p-3
							block
							text-yellow-50
							hover:text-hoverColor
							sm:hover:bg-navbarColor
							hover:bg-navbarColor
							transition
							duration-250
						"
						href="http://localhost:8080/"
						>Home</a
					>
					<div class="flex justify-center">
						<button
							class="
								p-3
								block
								text-yellow-50
								hover:text-hoverColor
								sm:hover:bg-navbarColor
								hover:bg-navbarColor
								transition
								duration-250
							"
							@click="recipes()"
						>
							Recipes
						</button>
					</div>
					<div
						class="flex justify-center"
						v-if="isAuthen() && isAdmin()"
					>
						<button
							class="
								p-3
								block
								text-yellow-50
								hover:text-hoverColor
								sm:hover:bg-navbarColor
								hover:bg-navbarColor
								transition
								duration-250
							"
							@click="allRecipes()"
						>
							ALL Recipes
						</button>
					</div>
					<Account class="hidden sm:block" v-if="isAuthen()" />
					<button
						@click="login()"
						class="
							p-3
							block
							pr-8
							text-yellow-50
							sm:hover:text-hoverColor sm:hover:bg-navbarColor
							hover:bg-navbarColor
							transition
							duration-250
						"
						v-if="!isAuthen()"
					>
						Log in
					</button>
				</div>
				<div class="relative sm:hidden" v-if="isAuthen()">
					<div tabindex="-1" class="relative z-10 my-1">
						<div class="flex justify-center">
							<div class="flex items-center mt-3">
								<div class="flex justify-center text-center">
									<span
										class="
											pl-2
											mt-1
											text-bgColor
											font-prompt
											text-xl
											truncate
										"
										>{{ currentUser.user.name }}
									</span>
								</div>
							</div>
						</div>
						<div
							class="
								absolute
								top-auto
								right-0
								mt-2
								w-full
								text-left
								font-prompt
								text-white
								rounded-b-lg
								bg-navbarColor
								shadow-xl
								text-xl
							"
						>
							<button
								class="
									block
									w-full
									px-3
									py-2.5
									mt-2
									text-white
									hover:bg-bgColor hover:text-white
									transition
									duration-250
								"
								@click="info()"
							>
								Profile
							</button>

							<button
								@click="logout()"
								class="
									block
									w-full
									px-4
									py-2.5
									text-red-50
									bg-red-500
									hover:bg-red-600
									transition
									duration-250
								"
							>
								Log out
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import Account from "@/components/Account.vue";
import AuthService from "@/services/AuthService";

export default {
	data() {
		return {
			isOpen: false,
			currentUser: "",
			currentUserWithFoodRecipe: "",
		};
	},

	components: {
		Account,
	},

	methods: {
		async fetchCurrentUser() {
			this.currentUser = JSON.parse(
				JSON.stringify(AuthUser.getters.getCurrentUser)
			);
			console.log("CurrentUser", this.currentUser);
			// console.log("_______________");
			// let res = await AuthService.fetchRecipes();
			// this.currentUserWithFoodRecipe = res.data;
			// console.log(this.currentUserWithFoodRecipe);
		},
		isAuthen() {
			return AuthUser.getters.isAuthen;
		},
		isAdmin() {
			return AuthUser.getters.isAdmin;
		},

		login() {
			this.$router.push("/login");
		},
		logout() {
			this.$router.push("/logout");
		},
		info() {
			this.$router.push("/user-information");
		},
		recipes() {
			this.$router.push("/recipe");
		},
		allRecipes() {
			this.$router.push("/admin/foodrecipes");
		},
		edit() {
      	this.$router.push("/edit-information");
    },
	},
	created() {
		this.fetchCurrentUser();
	},
};
</script>

<style scoped lang="scss"></style>
