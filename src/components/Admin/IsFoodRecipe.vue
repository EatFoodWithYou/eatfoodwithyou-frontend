<template>
  <div>
    <h1>
      ....FoodRecipes....
    </h1>
    <div>
      อิอิ
    </div>

    <div class="conteiner">
      <div>
        <div>
          <img
            v-bind:src="isRecipes.photo_url"
            alt=""
            height="50px"
            width="100px"
          />
        </div>
        <div>
          <label for="">name : {{ isRecipes.name }}</label>
        </div>
        <div>
          <label for="">detail : {{ isRecipes.name }}</label>
        </div>
        <div>
          <label for="">user : {{ isRecipes.user_name }}</label>
        </div>
        <div>
           <label for="">CookingProcess</label>
        </div>

        <div v-for="CookingProcess in isRecipes.cooking_processes " :key="CookingProcess.id">
          
          <div>
            <label for="">No : {{ CookingProcess.id }} </label>
            <label for="">{{ CookingProcess.process }} </label>
            <div>
              <img
            v-bind:src="CookingProcess.photo_url"
            alt=""
            height="50px"
            width="100px"
          />
            </div>
            
          </div>
          
        </div>
        
        <div>
          <label for="">Ingredient</label>
        </div>
        <div v-for="Ingredient in isRecipes.ingredients " :key="Ingredient.id">
          
          <div>
            <label for="">name : {{ Ingredient.name }} </label>
            <label for="">unit : {{ Ingredient.unit }} </label>
            <label for="">quantity : {{ Ingredient.quantity }} </label>
          </div>
          
        </div>
        <div>
          <label for="">catagorys : {{ isRecipes.catagorys }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ShopStore from '@/store/Shop'
import recipe from "@/store/FoodRecipe";
export default {
  data() {
    return {
      isRecipes: "",
      id: "",
    };
  },
  async created() {
    
    this.id = this.$route.params.id;
    this.fetchRecipe(this.id);
    console.log("id", this.id);
    
  },
  methods: {
    async fetchRecipe(id) {
      let res = await recipe.dispatch("fetchCurrentRecipes", id);
      this.isRecipes = res;

      console.log(456);
      console.log(this.isRecipes);
    },
  },
};
</script>
<style>
.tt {
  background: indigo;
  color: aliceblue;
}
.box {
  margin: 10px;
}
</style>
