<template>
  <div class="">
    <div class="flex-auto">
        <div>
            <img v-bind:src="imageURL" width="250" height="250" class="m-10 h-48">
        </div>
        <div class="ml-25">
            <router-link :to="{ name: 'FoodRecipeInfor', params: { id: this.id}}">{{ name }}</router-link>
            <!-- <a href="">{{ name }}</a> -->
            <h5>สูตรอาหารโดย : {{ user_name }}</h5>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FoodRecipe",
  props: ["FoodRecipes", "endPoint"],
  watch: {
    FoodRecipes(val, OldVal){
      // console.log("------------------");
      // console.log(val);
      // console.log(OldVal);
      // console.log("------------------");
      this.validProductData();
    }
  },
  data() {
    return {
      name:"",
      datail:"",
      user_name:"",
      imageURL:"",
      id:""
    }
  },
  methods:{
    async validProductData() {
      this.id = this.FoodRecipes.id
      this.name = this.FoodRecipes.name || "FOODRECIPE NAME";
      this.user_name = this.FoodRecipes.user_name
      if(this.FoodRecipes.photo_url !== 'http://localhost:8000/storage/foodRecipe/')
        this.imageURL = this.FoodRecipes.photo_url
      else{
        this.imageURL = 'https://via.placeholder.com/250x250'
      }
    },
  },
  created(){
    // console.log(this.FoodRecipes);
    this.validProductData();
  }
}
</script>

<style lang="scss" scoped>
#flex {
  display: flex;
  flex-wrap: wrap;
}
</style>