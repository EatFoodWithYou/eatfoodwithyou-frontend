<template>
  <div>
    <h1>
      ....FoodRecipes....
    </h1>
    <div>
      อิอิ
    </div>

    <div class="conteiner">
      <table class="bg-indigo-400 text-white">
        <thead class="bg-dark text-white">
          <tr>
            <th colspan="6">ALL RECIPES</th>
          </tr>
          <tr>
            <th> picture </th>
            <th> No. </th>
            <th> NameRecipes </th>
            <th> Details </th>
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
            <button class="bg-red-800" @click="deleteRecipe(food.id , food.name)">
              DELETE
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
import AuthUser from "@/store/AuthUser"
export default {
  data() {
    return {
      foodRecipes: [],
      id: "",
    };
  },
  async created() {
    this.fetchFood();
    // if (!this.isAuthen()) {
    //   this.$swal("Please Login before using this feature", "warning");
    //   this.$router.push("/");
    // }
    // else if (!this.isAdmin())
    // {
    //   this.$swal("You not Admin", "warning");
    //   this.$router.push("/");
    // }

  },
  methods: {
    async fetchFood() {
      let res = await Food.dispatch("fetchFoodRecipes");
      this.foodRecipes = res;

      // console.log(456);
      // console.log(this.foodRecipes);
    },

    async deleteRecipe(isid , name) {
      // this.$router.push(`/admin/foodrecipes/${id}`);
      console.log("2");
      console.log(isid);
       swal({
            title: "warning",
            text: `Would you like to Delete ${name} ?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then(async (willRedeem) => {
            if (willRedeem) {
              await swal("Successful", {
                icon: "success",
              });
              await Food.dispatch("deleteCurrentRecipes", isid);
              await this.fetchFood();
            } else {
              swal("Canceled");
            }
          });


    },
    isAuthen() {
      return AuthUser.getters.isAuthen;
    },
    isAdmin() {
      return AuthUser.getters.isAdmin;
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
