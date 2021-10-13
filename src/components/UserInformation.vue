<template>
	<div>
		<div>
			<label for="name">ชื่อ :</label>
			{{ currentUserWithFoodRecipe.name }}
		</div>

		<div>
			<label for="age">อายุ :</label>
			{{ currentUserWithFoodRecipe.age }}
		</div>

		<div>
			<label for="gender">เพศ :</label>
			{{ this.currentUserWithFoodRecipe.gender }}
		</div>

		<div>
			<label for="email">อีเมล :</label>
			{{ currentUserWithFoodRecipe.email }}
		</div>

		<div>
			<button @click="goToEdit()">editInformation</button>
		</div>

		<h4>สูตรอาหารของคุณ</h4>
		<thead>
			<tr>
				<th>No.</th>
				<th>name</th>
				<th>detail</th>
				<th>photo</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="(food, index) in currentUserWithFoodRecipe.food_recipes"
				:key="index"
			>
				<td>{{ index + 1 }}</td>
				<td>
					<router-link
						:to="{
							name: 'FoodRecipeInfor',
							params: { id: food.id },
						}"
						class="
							block
							mt-1
							text-lg
							leading-tight
							font-medium
							text-black
							hover:underline
						"
						>{{ food.name }}</router-link
					>
				</td>
				<td>{{ food.detail }}</td>
				<td v-if="food.photo">
					<img v-bind:src="food.photo_url" width="100" height="100" />
				</td>
				<td v-else>
					<img src="" width="100" height="100" />
				</td>
				<td v-if="index !== editIndex">
					<button @click="goToEditRecipe(food)">Edit</button>
					<button @click="deleteRecipe">Delete</button>
				</td>
			</tr>
		</tbody>
	</div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import AuthService from "@/services/AuthService";
import FoodRecipe from "@/services/FoodRecipe";

export default {
	data() {
		return {
			currentUser: "",
			currentUserWithFoodRecipe: "",
			editIndex: -1,
		};
	},
	created() {
		this.fetchCurrentUser();
	},
	methods: {
		async fetchCurrentUser() {
			this.currentUser = JSON.parse(
				JSON.stringify(AuthUser.getters.getCurrentUser)
			);
			this.currentUser = this.currentUser.user;
			console.log("CurrentUser2", this.currentUser);
			// console.log("_______________")
			let res = await AuthService.fetchRecipes();
			// console.log(res);
			this.currentUserWithFoodRecipe = res.data;
		},

		goToEdit() {
			this.$router.push("/edit-information");
		},

		goToEditRecipe(food) {
			this.$router.push(`/recipe/edit/${food.id}`);
		},

		deleteRecipe(food) {
			this.$swal({
				title: "Delete this recipe?",
				icon: "warning",
				buttons: true,
			}).then((willDelete) => {
				if (willDelete) {
					this.deleteInStore(food);
					location.reload();
					swal("Delete success", {
						icon: "success",
					});
				} else {
					swal("can not delete ");
				}
			});
		},
	},

	async deleteInStore(food) {
		await FoodRecipe.dispatch("deleteRecipe", food);
	},
};
</script>

<style></style>
