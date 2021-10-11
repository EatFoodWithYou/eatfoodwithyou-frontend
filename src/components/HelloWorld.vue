<template>
  <div>
    <div>
      <button
        @click="add()"
        class="py-4 w-auto transition duration-200 bg-red-400 text-text-white hover:bg-red-500 hover:text-white cursor-pointer"
      >
        Add Recipes
      </button>
    </div>
    <Random />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Random from "@/components/FoodRecipe/randomFoodRecipe.vue";
export default {
  components: {
    Navbar,
    Random,
  },

  methods: {
    add() {
      this.$router.push("/recipe/add");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
