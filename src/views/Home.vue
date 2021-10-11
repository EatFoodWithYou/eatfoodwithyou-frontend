<template>
  <div class="home">
    <search-form></search-form>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <random-food-recipe></random-food-recipe>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import RandomFoodRecipe from "@/components/FoodRecipe/randomFoodRecipe.vue";
import SearchForm from "@/components/FoodRecipe/SearchForm.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    RandomFoodRecipe,
    SearchForm,
  },
};
</script>
