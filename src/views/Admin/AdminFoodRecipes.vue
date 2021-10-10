<template>
    <div>
        <admin-food-recipes class=""></admin-food-recipes>
    </div>
</template>

<script>
import AdminFoodRecipes from '@/components/Admin/AdminFoodRecipes';
import AuthUser from '@/store/AuthUser'
export default {
    components: { AdminFoodRecipes },

    created() {
        
        if (!this.isAuthen()) {
            this.$swal("Please Login before using this feature", "warning");
            this.$router.push("/");
        }
        else if (!this.isAdmin())
        {
            this.$swal("You Not ADMIN !!!", "warning");
            this.$router.push("/")
        }
    } ,

     methods: {
        isAuthen() {
            return AuthUser.getters.isAuthen;
        },
        isAdmin() {
            // console.log("sad");
            // console.log(AuthUser.getters.isAdmin);
            return AuthUser.getters.isAdmin
        },
    }
};
    
</script>

<style>
/* .center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
} */
</style>