<template>
  <div class="bg-bgColor min-h-screen font-prompt">
    <div>
      <Navbar />
    </div>
    <div>
      <Random />
    </div>
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
