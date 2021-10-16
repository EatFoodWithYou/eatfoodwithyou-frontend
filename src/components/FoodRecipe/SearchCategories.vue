<template>
	<div>
		<h1 class="flex justify-between text-xl font-normal text-gray-800 p-4">
			Categories : {{ this.categorySearchList }}
		</h1>
		<div class="flex flex-wrap w-full">
			<div
				class="pl-6"
				v-for="(recipe, index) in food_recipes"
				:key="index"
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
					@click="goToRecipe(recipe.id)"
				>
					<img
						v-if="recipe.photo"
						v-bind:src="recipe.photo_url"
						alt=""
						class="rounded-t-lg"
					/>
					<img
						v-else
						src="https://via.placeholder.com/300x225"
						alt=""
						class="rounded-t-lg"
					/>
					<div class="p-6">
						<h2 class="font-semibold mb-2 text-lg text-black">
							{{ recipe.name }}
						</h2>
						<p class="text-black mt-4">
							{{ recipe.user.name }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<!-- <div
			class="container"
			v-for="(recipe, index) in food_recipes"
			:key="index"
		>
			<div
				class="
					max-w-md
					mx-auto
					bg-white
					rounded-xl
					shadow-md
					overflow-hidden
					md:max-w-2xl
				"
			>
				<div class="md:flex">
					<div class="md:flex-shrink-0">
						<img
							v-if="recipe.photo"
							class="h-48 w-full object-cover md:w-48"
							v-bind:src="recipe.photo_url"
							alt="image"
						/>
						<img
							v-else
							class="h-48 w-full object-cover md:w-48"
							src=""
							alt="image"
						/>
					</div>
					<div class="p-8">
						<h1
							class="
								block
								mt-1
								text-3xl
								leading-tight
								font-extrabold
								text-black
								hover:underline
							"
						>
							{{ recipe.name }}
						</h1>
						<p class="mt-2 text-gray-500">{{ recipe.detail }}</p>
					</div>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
import FoodRecipeService from "../../services/FoodRecipe";
export default {
	data() {
		return {
			categories_name: "",
			categorySearchList: [],
			food_recipes: [],
		};
	},
	async created() {
		this.categorySearchList = this.$route.params.categories;
		this.food_recipes =
			await FoodRecipeService.searchFoodRecipeByCategories(
				this.categorySearchList
			);
		console.log(this.food_recipes);
	},
	methods: {
		goToRecipe(id) {
			this.$router.push({
				name: "FoodRecipeInfor",
				params: { id: id },
			});
		},
	},
};
</script>

<style></style>
