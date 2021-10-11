<template>
  <div>
    <input class="p-1 bg-green-50" type="nameForSearch" v-model="form.nameForSearch" placeholder="ชื่อสูตรอาหารที่ต้องการค้นหา" >
    <router-link :to="{ name: 'SearchRecipes', params: { name: this.form.nameForSearch}}">ค้นหา</router-link>
<!--    <button class="p-1 bg-green-100">ค้นหา </button>-->
  </div>


</template>

<script>
export default {
  data() {
    return {
      form: {
        nameForSearch: '',
      }
    };
  },
  
}


</script>

<style>


</style>