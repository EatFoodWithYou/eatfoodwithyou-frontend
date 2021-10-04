<template>
  <div class="main-container">
    <h2 class="title">Login</h2>
    <form @submit.prevent="login" class="custom-form">
    <div>
        <label>email :</label>
        <input type="text" v-model="loginFrom.email" placeholder="username">
    </div>  
    <div>  
        <label>Password :</label>
        <input type="password" v-model="loginFrom.password" placeholder="password">
    </div>
    <button>Login</button>

    </form>
  </div>
</template>

<script>
// import ShopStore from '@/store/Shop'
import AuthUser from '@/store/AuthUser'
export default {
    data(){
        return {
            currentUser:'',
            loginFrom:{
                email:'',
                password:'',
            }
        }
    },
    methods: {
        async login(){
           
            let res = await AuthUser.dispatch('login' , this.loginFrom)
            console.log(1);
            console.log(res);
            console.log(2);
             if (res.success){
                this.$swal("Login Success" , `Welcome, ${res.user.name}`,"success")
                // console.log(res.user);
                this.currentUser = res.user
                console.log(this.currentUser);
                // console.log(this.currentUser);
                // ShopStore.dispatch('setCurrentUser',this.currentUser)
                this.$router.push("/")
            }
            else{
                this.$swal("Login Failed" , res.error,"error");
            }
        },
        clearFrom(){
            this.loginFrom.email = ''
            this.loginFrom.password = ''
        }
    }
}
</script>

<style lang="scss" scoped>
.main-container {
    text-align: center;
    .custom-form {
        width: 400px;
        label {
            width: 90px;
        }
        
    }
}



</style>>

