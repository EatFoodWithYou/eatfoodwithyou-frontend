<template>
	<div class="container">
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
						class="h-48 w-full object-cover md:w-48"
						v-bind:src="this.foodRecipe.photo_url"
						alt="Man looking at item at a store"
					/>
				</div>
				<div class="p-8">
					<router-link
						:to="{
							name: 'FoodRecipeInfor',
							params: { id: this.foodRecipe.id },
						}"
						class="
							block
							mt-1
							text-lg
							leading-tight
							font-medium
							text-black
							hover:underline
						"
						>{{ this.foodRecipe.name }}</router-link
					>
					<!-- <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{{ this.foodRecipe.name }}</a> -->
					<p class="mt-2 text-gray-500">
						{{ this.foodRecipe.detail }}
					</p>
				</div>
			</div>
		</div>
		<div>
			<button @click="fetchRandomFoodRecipes" class="object object-right">
				Refresh
			</button>
			<div
				class="
					flex flex-warp
					bg-white
					rounded-xl
					shadow-md
					overflow-hidden
				"
			>
				<food-recipe-item
					v-for="(foodRecipe, index) in randomFoodRecipe"
					v-bind:key="index"
					:FoodRecipes="foodRecipe"
					:endPoint="endPoint"
				>
				</food-recipe-item>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import foodRecipeItem from "./foodRecipeItem.vue";
export default {
	components: { foodRecipeItem },
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
	},
	async created() {
		await this.fetchRandomFoodRecipes();
		await this.fetchRandomFoodRecipe();
	},
};
</script>

<style>
#flex {
	display: flex;
	flex-wrap: wrap;
}
</style>
