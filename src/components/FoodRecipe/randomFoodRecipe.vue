<template>
	<div>
		<div class="flex justify-center ml-12 mt-10">
			<div class=" w-5/6 h-full lg:flex justify-end">
				<div
					class="h-48 lg:h-80 lg:w-80 flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden cursor-pointer"
					@click="goToRecipe()"
					v-bind:style="{
						backgroundImage:
							'url(' + this.foodRecipe.photo_url + ')'
					}"
					title="Mountain"
				></div>
				<div
					class="lg:w-3/5 w-autof bordor-0 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal cursor-pointer"
					@click="goToRecipe()"
				>
					<div class="mb-8">
						<p class="text-lg text-gray-600 flex items-center">
							Recommended
						</p>
						<div class="text-gray-900 font-bold text-4xl mb-2">
							{{ this.foodRecipe.name }}
						</div>
						<p class="text-gray-700 text-2xl">
							{{ this.foodRecipe.detail }}
						</p>
					</div>
					<div class="flex items-center">
						<div class="text-lg">
							<p class="text-gray-900 leading-none">
								{{ this.foodRecipe.user_name }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- <div
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
		</div> -->
	<!-- </div> -->
	<!-- <div class="container">
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
							params: { id: this.foodRecipe.id }
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
	</div> -->
</template>

<script>
import axios from "axios";
import FoodRecipeItem from "./foodRecipeItem.vue";
export default {
	components: { FoodRecipeItem },
	data() {
		return {
			randomFoodRecipe: "",
			endPoint: "http://localhost:8000",
			foodRecipe: ""
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

		goToRecipe() {
			this.$router.push({
				name: "FoodRecipeInfor",
				params: { id: this.foodRecipe.id }
			});
		}
	},

	async created() {
		await this.fetchRandomFoodRecipes();
		await this.fetchRandomFoodRecipe();
	}
};
</script>

<style>
#flex {
	display: flex;
	flex-wrap: wrap;
}
</style>
