<template>
	<div class="relative">
		<button
			v-if="isOpen"
			@click="isOpen = false"
			class="
				cursor-default
				fixed
				inset-0
				bg-black
				opacity-20
				h-full
				w-screen
				z-10
			"
		></button>
		<button
			@click="isOpen = !isOpen"
			tabindex="-1"
			class="relative z-40 my-1"
		>
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-10 w-10 mb-1 mt-0.5 md:mr-7 sm:mr-3 text-yellow-50"
					fill="none"
					viewBox="0 -1 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
		</button>
		<div
			v-if="isOpen"
			class="
				absolute
				w-64
				top-auto
				mt-2
				font-prompt
				transform
				-translate-x-full
				transition
				duration-200
				ease-in-out
				z-40
			"
		>
			<div
				class="
					relative
					min-h-screen
					ml-16
					left-2
					
					cursor-default
					pointer-events-none
					
				"
			>
				<!-- sidebar -->
				<div
					class="
						cursor-default
						pointer-events-none
						bg-navbarColor
						text-blue-100
						w-64
						space-y-6
						py-7
						absolute
						inset-y-0
						left-0
						
					"
				>
					<!-- logo -->
					<span
						class="
							text-white
							flex
							justify-center
							space-x-2
							px-4
							cursor-default
							pointer-events-none
						"
					>
						<img
							class="block h-24 w-auto mb-2"
							src="../assets/logo.svg"
							alt="EFWY"
						/>
					</span>

					<!-- nav -->
					<nav
						class="
							flex flex-wrap
							text-center
							py-2
							w-full
							pointer-events-auto
						"
					>
						<span
							class="
								py-4
								w-full
								transition
								text-bgColor
								duration-200
							"
						>
							{{ currentUser.user.name }}
						</span>
						<button
							@click="info()"
							class="
								py-4
								w-full
								transition
								duration-200
								text-white
								hover:bg-bgColor hover:text-white
								cursor-pointer
							"
						>
							Profile
						</button>

						<button
							@click="logout()"
							class="
								py-4
								w-full
								transition
								duration-200
								bg-red-400
								text-text-white
								hover:bg-red-500 hover:text-white
								cursor-pointer
							"
						>
							Log out
						</button>
					</nav>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import AuthService from "@/services/AuthService";
export default {
	data() {
		return {
			isOpen: false,
			currentUser: "",
			currentUserWithFoodRecipe: ""
		};
	},
	methods: {
		async fetchCurrentUser() {
			this.currentUser = JSON.parse(
				JSON.stringify(AuthUser.getters.getCurrentUser)
			);
			console.log("CurrentUser", this.currentUser);
			console.log("_______________");
			let res = await AuthService.fetchRecipes();
			this.currentUserWithFoodRecipe = res.data;
			console.log(this.currentUserWithFoodRecipe);
		},
		isAuthen() {
			return AuthUser.getters.isAuthen;
		},
		logout() {
			this.$router.push("/logout");
		},
		info() {
			this.$router.push("/user-information");
		}
	},
	created() {
		this.fetchCurrentUser();
		const btn = document.querySelector(".mobile-menu-button");
		const sidebar = document.querySelector(".sidebar");

		// add our event listener for the click
		// btn.addEventListener("click", () => {
		//   sidebar.classList.toggle("-translate-x-full");
		// });
	}
};
</script>

<style></style>
