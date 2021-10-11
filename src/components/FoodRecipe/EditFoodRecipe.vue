<template>
  <div>
      <h1>แก้ไขรายการอาหาร</h1>
      <div>
        <div class="flex flex-row">
          <div>
            <img src="https://via.placeholder.com/250x200" ref="foodRecipeRef" width="250" height="200">
          </div>
          <div>
            <div>
              <input type="text" v-model="foodRecipeForm.name" placeholder="ชื่ออาหาร">
            </div>
            <div>
              <textarea name="detail" id="" cols="30" rows="5" v-model="foodRecipeForm.detail" placeholder="รายละเอียดของสูตรอาหาร"></textarea>
            </div>
            <div>
              <input type="file" ref="recipePhoto" id="recipePhoto" @change="selectedRecipePhoto()">
            </div>
          </div>
      </div>
        <div>
        <h3>วัตถุดิบ</h3> 
        <p>โดยปริมาณที่ใส่จะต้องเป็นปริมาณการทำต่อ 1 ที่</p>
          <div v-for="(input,k) in allIngredient" :key="k">
            <label for="number">{{ k+1 }}  </label>
              <span>
                <input type="text" v-model="input.name" placeholder="ชื่อวัตถุดิบ">
                <input type="number" v-model="input.quantity" placeholder="ปริมาณ" min="0">
                <input type="text" v-model="input.unit" placeholder="หน่วย">
                <button @click="removeIngredient(k)" v-show="k || ( !k && allIngredient.length > 1) ">ลบ</button>
              </span>
          </div>
          <button @click="addIngredient()">เพิ่มวัตถุดิบ</button>
        </div>
        <div>
          <h3>ขั้นตอนการทำ</h3>
          <div v-for="(input,k) in allCookingProcess" :key="k" class="flex flex-row">
            <div>
            <label for="number">{{ k+1 }}  </label>
                <textarea cols="30" rows="5" v-model="input.process" placeholder="ขั้นตอนการทำ"></textarea>
            </div>
            <div>
              <img src="https://via.placeholder.com/200x150" ref="processRef" width="150" height="200">
              <input type="file" ref="photo" id="processPhoto" @change="selectedFileProcess(k)">
            </div>
            <div>
              <button @click="removeProcess(k)" v-show="k || ( !k && allIngredient.length > 1) ">ลบ</button>
            </div>
          </div>
            <button @click="addProcess()">เพิ่มวัตถุดิบ</button>
        </div>
      </div>
      <div>
        <div>
          <h3>เลือกประเภทของอาหาร</h3>
        </div>
        <div>
          <select name="categories" id="category" v-model="selectedCategory">
            <option value="">กรุณาเลือกประเภทที่ต้องการ</option>
            <option v-for="(item,k) in allCategory" :key="k" :value="item.name">{{item.name }}</option>
          </select>
          <button @click="selectCategory">เลือก</button>
        </div>
        <div>
          <span> 
          ประเภทของอาหารที่เลือกแล้ว :
          <p>{{ this.foodRecipeForm.categories }}</p>
          </span> 
          <button @click="clearSelectedCategories">ลบทั้งหมด</button>
        </div>
      </div>
      <div>
        <button type="submit" @click="addNewFoodRecipe()">เพิ่มสูตรใหม่</button>
      </div>
  </div>
</template>

<script>
import FoodRecipeService from '@/services/FoodRecipe';
import IngredientService from '@/services/Ingredient';
import CookingProcessService from '@/services/CookingProcess';
import AuthUserStore from '@/store/AuthUser';
import CategoriesService from '@/services/Categories';
export default {
  data() {
    return {
      allIngredient : [
        {
          name: "",
          quantity: 0,
          unit: "",
          food_recipe_id:0
        }
      ],
      foodRecipeForm: {
        name: "",
        detail: "",
        photo: null,
        user_id: 0,
        categories:""
      },
      allCookingProcess : [
        {
          process: "",
          photo: null,
          food_recipe_id:0
        }
      ],
      newFoodRecipe:"",
      foodRecipeFromData:'',
      ProcessFromdata: "",
      currentUser:"",
      allCategory:"",
      selectedCategory: "",
      allSelectedCategory: [],
    }
  },
  async created(){
    if (this.isAuthen() === false) {
            this.$swal('You are not logged in.', 'Please login and go to this page again', 'error');
            this.$router.push('/login');
    }
    this.getCurrentUser()
    // console.log(this.currentUser);
    this.foodRecipeForm.user_id = this.currentUser.user.id
    // await this.fetchCategories()
    // console.log(this.allCategory);
    // console.log("params",this.$route.params.id);
    const res = await FoodRecipeService.fetchRecipeById(this.$route.params.id);
    console.log("data",res.data);
    console.log("cooking",res.data.cooking_processes[0].process);

    this.foodRecipeForm.name = res.data.name;
    this.foodRecipeForm.detail = res.data.detail;
    //this.foodRecipeForm.photo = res.selectedFileProcess(k);
    this.foodRecipeForm.categories = res.data.categories_names;
    this.allCookingProcess[0].process = res.data.cooking_processes[0].process;
    
    
    //console.log(this.foodRecipeForm.detail);
  },
  methods: {
    addIngredient() {
      this.allIngredient.push({
          name: "",
          quantity: 0,
          unit: "",
          food_recipe_id:0
          });
      console.log(this.allIngredient);
    },
    removeIngredient(index) {
      this.allIngredient.splice(index,1);
    },
    addProcess() {
      this.allCookingProcess.push({
          process: "",
          photo: null,
          food_recipe_id:0
          });
    },
    removeProcess(index) {
      this.allCookingProcess.splice(index,1);
    },
    selectedFileProcess(index){
      // console.log(index);
      // console.log(this.allCookingProcess[index]);
      // console.log(this.$refs.photo[index].files[0]);
      this.allCookingProcess[index].photo = this.$refs.photo[index].files[0];
      let url = URL.createObjectURL(this.allCookingProcess[index].photo);
      this.$refs.processRef[index].src = url;
    },
    selectedRecipePhoto(){
      this.foodRecipeForm.photo = this.$refs.recipePhoto.files[0];
      let url = URL.createObjectURL(this.foodRecipeForm.photo);
      this.$refs.foodRecipeRef.src = url;
      // console.log(this.foodRecipeForm.photo);
    },
    async addNewFoodRecipe(){
      if(this.checkNullValue()){
        this.createDataFrom();
        let res = await FoodRecipeService.createFoodRecipe(this.foodRecipeFromData);
        // console.log(res);
        // console.log(this.newFoodRecipe);
        if (res.success) {
          this.newFoodRecipe = res.foodRecipe.data;
          // this.$swal('Add new Food Recipe Success', `${res.data.name}`, 'success');
          let addIngredientStatus = true
          for(let item of this.allIngredient){
            // console.log(this.newFoodRecipe.id);
            item.food_recipe_id = this.newFoodRecipe.id
            // console.log(item);
            let res1 = await IngredientService.createIngredient(item);
            if(res1.success) {
              addIngredientStatus = true;
            }
            else{
              this.$swal('Add new Food Recipe Failed', res1.message, 'error');
              addIngredientStatus = false;
              break;
            }
          }
          if(addIngredientStatus){
            let addCookingProcessStatus = false;
            for(let item of this.allCookingProcess){
                item.food_recipe_id = this.newFoodRecipe.id;
                this.createProcessDataFrom(item);
                let res2 = await CookingProcessService.createCookingProcess(this.ProcessFromdata);
                  if(res2.success){
                    addCookingProcessStatus = true;
                  }
                  else{
                    this.$swal('Add new Food Recipe Failed', res2.message, 'error');
                    addIngredientStatus = false;
                    break;
                  }
            }
          }
          if(addIngredientStatus == true || addCookingProcessStatus == true)
          {
            this.$swal('Add new Food Recipe Success', `${this.newFoodRecipe.name}`, 'success');
          }
        } else {
          console.log(res);
          this.$swal('Add new Food Recipe Failed', res.message, 'error');
        }
      }
      else{
        this.$swal(
                    'Add new Food Recipe Failed',
                    'Please check that the information you have entered is complete.',
                    'error',
                );
      }
    },
    createDataFrom(){
      this.foodRecipeFromData = new FormData();
      this.foodRecipeFromData.append('photo',this.foodRecipeForm.photo);
      this.foodRecipeFromData.append('name',this.foodRecipeForm.name);
      this.foodRecipeFromData.append('detail',this.foodRecipeForm.detail);
      this.foodRecipeFromData.append('user_id',this.foodRecipeForm.user_id);
      this.foodRecipeFromData.append('categories',this.foodRecipeForm.categories);
      // for (var value of this.foodRecipeFromData.values()) {
      //   console.log(value);
      // }
    },
    createProcessDataFrom(item){
      this.ProcessFromdata = new FormData();
      this.ProcessFromdata.append('process',item.process);
      this.ProcessFromdata.append('food_recipe_id',item.food_recipe_id);
      this.ProcessFromdata.append('photo',item.photo);
      //       for (var value of this.ProcessFromdata.values()) {
      //   console.log(value);
      // }
    },
    getCurrentUser(){
      this.currentUser = AuthUserStore.getters.getCurrentUser;
    },
    checkNullValue(){
      return (
        this.foodRecipeForm.name !== '' &&
        this.foodRecipeForm.detail !== '' && 
        (this.checkIngredientNull()) &&
        (this.checkProcessNull())
      )
    },
    isAuthen(){
      return AuthUserStore.getters.isAuthen;
    },
    checkIngredientNull(){
      let isNull = true;
      for(let item of this.allIngredient){
        if(item.name === '' || item.quantity === 0 || item.unit === '')
        {
          isNull = false;
        }
      }
      return isNull;
    },
    checkProcessNull(){
      for(let item of this.allCookingProcess){
        if(item.process === '')
        {
          return false;
        }
      }
      return true;
    },
    async fetchCategories(){
      let categories = await CategoriesService.getAllCategories();
      this.allCategory =  categories.categories
      console.log(this.allCategory);
    },
    selectCategory(){
        if(this.selectedCategory !== "" && !(this.allSelectedCategory.includes(this.selectedCategory))){
        this.allSelectedCategory.push(this.selectedCategory);
        if(this.foodRecipeForm.categories == ""){
          this.foodRecipeForm.categories = this.selectedCategory;
        }else{
          this.foodRecipeForm.categories = this.foodRecipeForm.categories + " ," + this.selectedCategory
        }
        }
        // console.log(this.foodRecipeForm.categories);
        // this.setCategoriesString();
    },
    clearSelectedCategories(){
      this.allSelectedCategory = [];
      this.foodRecipeForm.categories =""
    },
  },
}
</script>

<style>

</style>