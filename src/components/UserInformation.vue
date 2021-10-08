<template>
  <div>

    <div>
      <label for="name">ชื่อ :</label>
      {{ currentUser.user.name }}
    </div>

    <div>
      <label for="age">อายุ :</label>
      {{ currentUser.user.age }}
    </div>

    <div>
      <label for="gender">เพศ :</label>
      {{ currentUser.user.gender }}
    </div>

    <div>
      <label for="email">อีเมล :</label>
      {{ currentUser.user.email }}
    </div>


    <div>
      <button @click="goToEdit()">
        editInformation
      </button>
    </div>

    <h4> สูตรอาหารของคุณ </h4>
    <thead>
        <tr>
          <th>No.</th>
          <th>name</th>
          <th>detail</th>
          <th>photo</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for = "(food, index) in currentUserWithFoodRecipe.food_recipes" :key = "index">
          <td> {{ index+1 }}</td>
          <td> {{ food.name }}</td>
          <td> {{ food.detail }}</td>
          <td><img v-bind:src="food.photo_url" width="100" height="100"></td>
        </tr>
    </tbody>

    <div>
      <button>
        editRecipeForPreawEiei
      </button>
    </div>

  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import AuthService from "@/services/AuthService";

export default {
  data() {
    return {
      currentUser: '',
      currentUserWithFoodRecipe:"",
    };
  },
  methods: {
    async fetchCurrentUser () {
      this.currentUser = JSON.parse(JSON.stringify(AuthUser.getters.getCurrentUser));
      console.log("CurrentUser", this.currentUser);
      console.log("_______________")
      let res = await AuthService.fetchRecipes()
      this.currentUserWithFoodRecipe = res.data;
      console.log(this.currentUserWithFoodRecipe)
    },

    goToEdit() {
      this.$router.push('/editinformation');
    }

  },
  created() {
    this.fetchCurrentUser();
  }
};
</script>

<style>

</style>