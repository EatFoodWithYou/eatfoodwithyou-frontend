<template>
  <div>
    <h1>
      ....FoodRecipes....
    </h1>
    <div>
      อิอิ
    </div>

    <div class="conteiner">
      <table class="tt">
        <thead class="bg-dark text-white">
          <tr>
            <th colspan="6">ALL RECIPES</th>
          </tr>
          <tr>
            <th>picture</th>
            <th>No.</th>
            <th>NameRecipes</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody class="box">
          <tr v-for="food in foodRecipes" :key="food.id">
            <td>
              <img
                v-bind:src="food.photo_url"
                alt=""
                height="50px"
                width="100px"
              />
            </td>
            <td>{{ food.id }}</td>
            <td>{{ food.name }}</td>
            <td>{{ food.detail }}</td>
            <button @click="goInformationRecipe(food.id)">
              เพิ่มเติม
            </button>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import ShopStore from '@/store/Shop'
import Food from "@/store/FoodRecipe";
export default {
  data() {
    return {
      foodRecipes: [],
      id: "",
    };
  },
  async created() {
    this.fetchFood();
  },
  methods: {
    async fetchFood() {
      let res = await Food.dispatch("fetchFoodRecipes");
      this.foodRecipes = res;

      console.log(456);
      console.log(this.foodRecipes);
    },

    goInformationRecipe(id) {
      this.$router.push(`/admin/foodrecipes/${id}`);
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
