<template>
	<div>
		<h2>Food Recipe ID : {{ this.id }}</h2>

		<div class="head">
			<h1>MENU : {{ this.currentFood.name }}</h1>
			<img
				class="h-48 w-full object-cover md:w-48"
				v-bind:src="this.currentFood.photo_url"
				alt="Man looking at item at a store"
			/>
			<h2>By: {{ this.currentFood.user_name }}.</h2>
			<!-- <div v-for="(tag,index) in currentFood" :key="index"> -->
			<h2>tag: {{ this.currentFood.category_names }} ..</h2>
			<!-- </div> -->
		</div>

		<div class="Ingredient">
			<h1>วัตถุดิบที่ใช้</h1>
			<thead>
				<tr>
					<th>No.</th>
					<th>วัตถุดิบ</th>
					<th>ปริมาณ</th>
					<th>หน่วย</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="(ingredient, index) in currentFood.ingredients"
					:key="index"
				>
					<td>{{ index + 1 }}</td>
					<td>{{ ingredient.name }}</td>
					<td>{{ ingredient.quantity }}</td>
					<td>{{ ingredient.unit }}</td>
				</tr>
			</tbody>
		</div>

		<div class="cookingProcess">
			<h1>ขั้นตอนการทำ</h1>
			<div
				v-for="(process, index) in currentFood.cooking_processes"
				:key="index"
			>
				<h2>{{ index + 1 }}</h2>
				<h2>{{ process.process }}</h2>
				<td v-if="process.photo !== null">
					<img
						class="h-48 w-full object-cover md:w-48"
						v-bind:src="`http://localhost:8000/storage/cookingProcess/${process.photo}`"
					/>
				</td>
			</div>
		</div>

		<div class="comment">
			Comment
			<input type="text" placeholder="แสดงความเห็น" />
		</div>
	</div>
</template>

<script>
import FoodRecipeStore from "@/store/FoodRecipe";

export default {
	data() {
		return {
			id: "",
			currentFood: "",
		};
	},
	created() {
		this.id = this.$route.params.id;
		console.log(this.id);
		this.fetchFood(this.id);

		//   let url = `http://localhost:8000/api/recipes/10`;
		//   let res= await axios.get(url,null,{
		//       headers: {
		//           'Content-Type': "multipart/form-data"
		//       }
		//   })
		//   console.log(res.data.data)
		//   this.food = res
	},
	methods: {
		async fetchFood(id) {
			let res = await FoodRecipeStore.dispatch("fetchFood", id);
			const currentFood = FoodRecipeStore.getters.getCurrentFood;
			this.currentFood = currentFood;
			console.log("now", this.currentFood);
			//  if(this.currentFood.photo_url !== null ){
			//      let this //localhost:8000/storage/foodRecipe/'
			//  }
		},
	},
};
</script>

<style></style>
