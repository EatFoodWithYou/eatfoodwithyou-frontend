<template>
  <div
    class="h-full w-full font-sans font-semibold text-white bg-backgroundColor items-center justify-center"
  >
    <div class="my-80">
      <h2 class="title text-6xl flex justify-center items-center">Log in</h2>
      <form class="my-10" @submit.prevent="login">
        <div class="flex text-2xl justify-center items-center text-black">
          <input
            class="py-2 px-4 rounded-lg w-1/5 min-w-max focus:outline-none focus:ring focus:border-backgroundButton"
            type="username"
            v-model="loginFrom.email"
            placeholder="Email"
          />
        </div>
        <div class="flex text-2xl justify-center items-center text-black mt-4">
          <input
            class="py-2 px-4 rounded-lg w-1/5 min-w-max focus:outline-none focus:ring focus:border-backgroundButton"
            type="password"
            v-model="loginFrom.password"
            placeholder="Password"
          />
        </div>
        <p class="flex text-lg justify-center items-center ml-28 mt-2">
          Don't have an account?&nbsp;
          <a @click="register"
            ><strong class="text-red-600 cursor-pointer hover:underline"
              >Sign Up</strong
            ></a
          >
        </p>
        <div class="flex text-2xl justify-center items-center">
          <button
            class="text-white my-3 bg-backgroundButton mt-5 p-1 pb-2 px-8 content-center rounded-full hover:bg-gray-500 transition duration-50 ease-in-out"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import ShopStore from '@/store/Shop'
import AuthUser from "@/store/AuthUser";
export default {
  data() {
    return {
      currentUser: "",
      loginFrom: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      let res = await AuthUser.dispatch("login", this.loginFrom);
      console.log(1);
      console.log(res);
      console.log(2);
      if (res.success) {
        this.$swal("Login Success", `Welcome, ${res.user.name}`, "success");
        // console.log(res.user);
        this.currentUser = res.user;
        console.log(this.currentUser);
        // console.log(this.currentUser);
        // ShopStore.dispatch('setCurrentUser',this.currentUser)
        this.$router.push("/");
      } else {
        this.$swal("Login Failed", res.error, "error");
      }
    },
    clearFrom() {
      this.loginFrom.email = "";
      this.loginFrom.password = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>>
