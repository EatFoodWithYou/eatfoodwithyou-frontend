<script src="AuthUser.js"></script>
<template>
  <div>
    <h2>EDIT</h2>
    <form @submit.prevent="edit">
      <div>
        <label for="name">ชื่อ : </label>
        <input type="name" v-model="form.name" placeholder="ชื่อ">
      </div>
      <div>
        <label for="age">อายุ : </label>
        <input type="age" v-model="form.age" placeholder="อายุ">
      </div>
      <div>
        <label for="gender">เพศ : </label>
        <select v-model="form.gender">
          <option disabled value="">เพศ</option>
          <option>MALE</option>
          <option>FEMALE</option>
        </select>
      </div>
      <div>
        <button>
          SubmitBUTTON
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import AuthService from "@/services/AuthService";
export default {
  data() {
    return {
      currentUser: '',
      form : {
        name:'',
        age:'',
        gender:'',
      }
    };
  },
  methods: {
    fetchCurrentUser () {
      this.currentUser = JSON.parse(JSON.stringify(AuthUser.getters.getCurrentUser));
      console.log("CurrentUserInEdit", this.currentUser);
    },

    async edit(){
      let res = await AuthService.editInformation(this.form)
      console.log(this.form.name)
      console.log(this.form.age)
      console.log(this.form.gender)
      console.log(res.data)

    }

  },
  created() {
    this.fetchCurrentUser();
  }
};

</script>

<style>

</style>