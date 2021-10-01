<template>
  <div>
      <h1>เพิ่มสูตรอาหารใหม่</h1>
      <div>
        <div>
          <label for="name">ชื่ออาหาร :</label>
          <input type="text" v-model="foodRecipeForm.name">
        </div>
        <div>
          <label for="detail">รายละเอียดของสูตร :</label>
          <textarea name="detail" id="" cols="30" rows="5" v-model="foodRecipeForm.detail"></textarea>
        </div>
        <div>
          <label for="recipePhoto">รูปภาพของสูตรอาหาร : </label>
          <input type="file" ref="recipePhoto" id="recipePhoto" @change="selectedRecipePhoto()">
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
          <div v-for="(input,k) in allCookingProcess" :key="k">
            <div>
            <label for="number">{{ k+1 }}  </label>
                <textarea cols="30" rows="5" v-model="input.process" placeholder="ขั้นตอนการทำ"></textarea>
                <button @click="removeProcess(k)" v-show="k || ( !k && allIngredient.length > 1) ">ลบ</button>
            </div>
            <div>
              <input type="file" ref="photo" id="processPhoto" @change="selectedFileProcess(k)">
            </div>
          </div>
            <button @click="addProcess()">เพิ่มวัตถุดิบ</button>
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
import CookingProcessService from '@/services/CookingProcess'
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
        user_id: 1
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
      ProcessFromdata: ""
    }
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
    },
    selectedRecipePhoto(){
      this.foodRecipeForm.photo = this.$refs.recipePhoto.files[0];
      // console.log(this.foodRecipeForm.photo);
    },
    async addNewFoodRecipe(){
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


      // for(let item of this.allCookingProcess){
      //         item.food_recipe_id = this.newFoodRecipe.id;
      //         this.createProcessDataFrom(item);
      //         let res2 = await CookingProcessService.createCookingProcess(this.ProcessFromdata);
      //           if(res2.success){
      //             addCookingProcessStatus = true;
      //           }
      //           else{
      //             this.$swal('Add new Food Recipe Failed', res2.message, 'error');
      //             addIngredientStatus = false;
      //             break;
      //           }
      //     }
    },
    createDataFrom(){
      this.foodRecipeFromData = new FormData();
      this.foodRecipeFromData.append('photo',this.foodRecipeForm.photo);
      this.foodRecipeFromData.append('name',this.foodRecipeForm.name);
      this.foodRecipeFromData.append('detail',this.foodRecipeForm.detail);
      this.foodRecipeFromData.append('user_id',this.foodRecipeForm.user_id);
      // for (var value of this.foodRecipeFromData.values()) {
      //   console.log(value);
      // }
    },
    createProcessDataFrom(item){
      console.log(item);
      this.ProcessFromdata = new FormData();
      this.ProcessFromdata.append('process',item.process);
      this.ProcessFromdata.append('food_recipe_id',item.food_recipe_id);
      this.ProcessFromdata.append('photo',item.photo);
      //       for (var value of this.ProcessFromdata.values()) {
      //   console.log(value);
      // }
    } 
  },
}
</script>

<style>

</style>