<template>
	<div>
		<!-- <h2>Food Recipe ID : {{ this.id }}</h2> -->
		<food-recipe-information></food-recipe-information>
	</div>
</template>

<script>
import FoodRecipeInformation from "../../components/FoodRecipe/FoodRecipeInformation.vue";
export default {
	components: {
		FoodRecipeInformation,
	},

	// data(){
	//   return {
	//     id:""
	//   }
	// },
	// created(){
	//   this.id = this.$route.params.id
	// }
};
</script>

<style></style>
