<template>
  <div>
    <h2>Food Recipe ID : {{ this.id }}</h2>
  </div>
</template>

<script>
export default {
    data(){
      return {
        id:""
      }
    },
    created(){
      this.id = this.$route.params.id
    }
}
</script>

<style>

</style>