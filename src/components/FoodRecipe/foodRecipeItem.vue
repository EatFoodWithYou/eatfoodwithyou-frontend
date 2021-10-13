<template>
	<div class="main-container h-96 w-1/3">
		<div class="font-prompt">
			<div class="flex-auto">
				<div>
					<div class="bg-red-400">
						<img
							v-bind:src="imageURL"
							width="250"
							height="250"
							class="m-48 h-48"
						/>
					</div>
					<router-link
						:to="{
							name: 'FoodRecipeInfor',
							params: { id: this.id },
						}"
						>{{ name }}
					</router-link>
					<h5>สูตรอาหารโดย : {{ user_name }}</h5>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "FoodRecipe",
	props: ["FoodRecipes", "endPoint"],
	watch: {
		FoodRecipes(val, OldVal) {
			// console.log("------------------");
			// console.log(val);
			// console.log(OldVal);
			// console.log("------------------");
			this.validProductData();
		},
	},

	data() {
		return {
			name: "",
			datail: "",
			user_name: "",
			imageURL: "",
			id: "",
		};
	},
	methods: {
		async validProductData() {
			this.id = this.FoodRecipes.id;
			this.name = this.FoodRecipes.name || "FOODRECIPE NAME";
			this.user_name = this.FoodRecipes.user_name;
			if (
				this.FoodRecipes.photo_url !==
				"http://localhost:8000/storage/foodRecipe/"
			)
				this.imageURL = this.FoodRecipes.photo_url;
			else {
				this.imageURL = "https://via.placeholder.com/250x250";
			}
		},
	},

	created() {
		// console.log(this.FoodRecipes);
		this.validProductData();
	},
};
</script>

<style lang="scss" scoped>
#flex {
	display: flex;
	flex-wrap: wrap;
}
</style>
