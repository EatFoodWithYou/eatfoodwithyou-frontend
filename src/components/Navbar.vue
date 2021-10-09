<template>
  <div class="sm:flex">
    <div
      class="sm:flex sm:justify-between font-sans bg-navbarColor w-full py-1"
    >
      <div class="flex justify-between px-4 text-yellow-50 text-3xl">
        <a class="flex mb-3" href="http://localhost:8080/">
          <img
            class="block h-12 w-auto mt-1.5"
            src="../assets/logo.svg"
            alt="EFWY"
          />
          <div class="hidden lg:block font-semibold px-5 mt-4">
            EAT FOOD WITH YOU
          </div>
          <div class="lg:hidden block font-semibold px-5 mt-3.5">
            EFWY
          </div>
        </a>
        <button @click="isOpen = !isOpen" class="sm:absolute sm:hidden">
          <font-awesome-icon
            :icon="['fas', 'bars']"
            class="text-white text-3xl"
            v-if="!isOpen"
          />
          <font-awesome-icon
            :icon="['fas', 'times']"
            class="text-white text-3xl"
            v-if="isOpen"
          />
        </button>
      </div>
      <div :class="isOpen ? 'block' : 'hidden'" class="sm:block pt-1">
        <div
          class="md:space-x-5 sm:text-2xl text-xl relative sm:flex font-prompt"
        >
          <a
            class="p-3 block text-yellow-50 sm:hover:text-hoverColor sm:hover:bg-navbarColor hover:bg-navbarColor transition duration-250"
            href="http://localhost:8080/"
            >Home</a
          >
          <button
            class="p-3 block text-yellow-50 sm:hover:text-hoverColor sm:hover:bg-navbarColor hover:bg-navbarColor transition duration-250"
            @click="recipes()"
          >
            Recipes
          </button>
          <Account class="hidden sm:block" v-if="isAuthen()" />
          <button
            @click="login()"
            class="p-3 block pr-8 text-yellow-50 sm:hover:text-hoverColor sm:hover:bg-navbarColor hover:bg-navbarColor transition duration-250"
            v-if="!isAuthen()"
          >
            Log in
          </button>
        </div>
        <div class="relative sm:hidden" v-if="isAuthen()">
          <div tabindex="-1" class="relative z-10 my-1 ">
            <div class="flex items-center mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute h-12 w-12 ml-2 rounded-full text-yellow-50 "
                fill="none"
                viewBox="0 -1.5 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span
                class="ml-16 pl-2 mt-1 text-white font-prompt text-xl truncate"
                >Yean Arj
              </span>
            </div>
            <div
              class="absolute top-auto right-0 mt-2 w-full text-left font-prompt text-white rounded-b-lg bg-navbarColor shadow-xl text-xl "
            >
              <button
                class="block px-3 py-2.5 mt-2 text-white hover:bg-bgColor hover:text-white transition duration-250"
                @click="info()"
              >
                Profile
              </button>
              <button
                class="block px-3 py-2.5 text-white hover:bg-bgColor hover:text-white transition duration-250 "
                @click="edit()"
              >
                Setting
              </button>
              <button
                @click="logout()"
                class="block px-4 py-2.5 text-red-50 bg-red-500 hover:bg-red-600 transition duration-250"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import Account from "@/components/Account.vue";
export default {
  components: {
    Account,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    isAuthen() {
      return AuthUser.getters.isAuthen;
    },
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.$router.push("/logout");
    },
    info() {
      this.$router.push("/user-information");
    },
    edit() {
      this.$router.push("/edit-information");
    },
    recipes() {
      this.$router.push("/recipe");
    },
  },
};
</script>

<style scoped lang="scss"></style>
