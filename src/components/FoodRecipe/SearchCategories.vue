<template>
	<div>
		<h1 class="flex justify-between text-xl font-normal text-gray-800 p-4">
			Categories : {{ this.categorySearchList }}
		</h1>
		<div
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
						<p>Category: {{ recipe.category_names }}</p>
					</div>
				</div>
			</div>
		</div>
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
	},
};
</script>

<style></style>
