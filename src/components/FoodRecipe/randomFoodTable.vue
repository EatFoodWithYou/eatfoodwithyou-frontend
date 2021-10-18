<template>
	<section class="py-1">
		<div class="w-full xl:w-4/6 xl:mb-0 px-3 mx-auto mr-36 mt-6">
			<div>
				<h1 class="flex text-2xl font-medium text-white pb-6">
					Random Recipes
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="
							h-8
							w-8
							ml-2
							cursor-pointer
							hover:text-gray-400
							transition
							duration-200
						"
						@click="fetchRandomFoodRecipes()"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
				</h1>
			</div>
			<div class="flex flex-wrap w-full">
				<div
					class="pr-5"
					v-for="(foodRecipe, index) in randomFoodRecipe"
					v-bind:key="index"
				>
					<div
						class="
							bg-white
							rounded-lg
							shadow-lg
							h-80
							w-72
							cursor-pointer
						"
						@click="goToRecipe(foodRecipe.id)"
					>
						<img
							v-if="foodRecipe.photo"
							v-bind:src="foodRecipe.photo_url"
							alt=""
							class="rounded-t-lg"
						/>
						<img
							v-else
							src="https://via.placeholder.com/300x225"
							alt=""
							class="rounded-t-lg "
						/>
						<div class="p-6">
							<h2 class="font-semibold mb-2 text-lg text-black">
								{{ foodRecipe.name }}
							</h2>
							<p class="text-black mt-4">
								{{ foodRecipe.user_name }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			randomFoodRecipe: "",
			endPoint: "http://localhost:8000",
			foodRecipe: "",
		};
	},
	methods: {
		async fetchRandomFoodRecipes() {
			let res = await axios.get(
				"http://localhost:8000/api/recipes/randoms"
			);
			// console.log(res);
			this.randomFoodRecipe = res.data.data;
			// console.log(this.randomFoodRecipe);
		},
		async fetchRandomFoodRecipe() {
			let res = await axios.get(
				"http://localhost:8000/api/recipes/random"
			);
			// console.log(res);
			this.foodRecipe = res.data.data;
			if (
				this.foodRecipe.photo_url ===
				"http://localhost:8000/storage/foodRecipe/"
			)
				this.foodRecipe.photo_url =
					"https://via.placeholder.com/250x250";
			// console.log(this.randomFoodRecipe);
		},

		goToRecipe(id) {
			this.$router.push({
				name: "FoodRecipeInfor",
				params: { id: id },
			});
		},
	},

	async created() {
		await this.fetchRandomFoodRecipes();
		await this.fetchRandomFoodRecipe();
	},
};
</script>
