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
          <th> Action </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(food, index) in currentUserWithFoodRecipe" :key = "index">
          <td> {{ index+1 }}</td>
          <td> {{ food.name }}</td>
          <td> {{ food.detail }}</td>
          <td><img v-bind:src="food.photo_url" width="100" height="100"></td>
          <td v-if="index !== editIndex">
          <button @click="goToEditRecipe(food)">Edit</button>
          <button @click="deleteRecipe">Delete</button>

        </td>
        </tr>
    </tbody>

    <!-- <div>
      <button>
        editRecipe
      </button>
    </div> -->

  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import AuthService from "@/services/AuthService";
import FoodRecipe from "@/services/FoodRecipe";

export default {
  data() {
    return {
      currentUser: '',
      currentUserWithFoodRecipe: [],
      editIndex: -1,
    };
  },
  created() {
    this.fetchCurrentUser();
    console.log("this.currentUser", this.currentUser.user);
  },
  methods: {
    async fetchCurrentUser () {
      this.currentUser = JSON.parse(JSON.stringify(AuthUser.getters.getCurrentUser));
      console.log("CurrentUser", this.currentUser);
      console.log("_______________")
      const res = await FoodRecipe.fetchAllRecipes()
      this.currentUserWithFoodRecipe = res.data.filter((recipe) => {
        return recipe.user_id === this.currentUser.user.id;
      })
    },

    goToEdit() {
      this.$router.push('/editinformation');
    },

    goToEditRecipe(food){
      this.$router.push(`/recipe/edit/${food.id}`);
    },

    deleteRecipe(food){
    this.$swal({
      title: "Delete this recipe?",
      icon: "warning",
      buttons: true,
    }).then((willDelete)=>{
      if(willDelete){
        this.deleteInStore(food)
        location.reload()
        swal("Delete success",{
          icon: "success",
        });
      }else{
        swal("can not delete ")
      }
    });
  },

  },

  
  async deleteInStore(food){
    await FoodRecipe.dispatch("deleteRecipe", food)
    
  },
};
</script>

<style>

</style>