<template>
	<div class="bg-bgColor font-prompt">
		<div>
			<div>
				<div class="text-center py-10 pt-16">
					<h2 class="text-6xl font-bold text-white">
						{{ currentUserWithFoodRecipe.name }}
						<button
							@click="goToEdit()"
							class="
								p-3
								text-2xl
								absolute
								right-24
								cursor-pointer
								bg-white
								text-navbarColor
								hover:bg-gray-200
								transition
								duration-250
							"
						>
							<font-awesome-icon :icon="['fas', 'edit']" />
							แก้ไขข้อมูล
						</button>
					</h2>
				</div>
				<div class="flex justify-center">
					<div class="w-1/4 max-w-4xl text-center">
						<div class="flex flex-wrap -mx-3 mb-5 mt-4">
							<div class="w-full px-3 md:mb-0">
								<label
									class="
										block
										tracking-wide
										text-gray-100 text-3xl
										font-bold
										mb-2
									"
								>
									Age :
									{{ currentUserWithFoodRecipe.age }} yrs
								</label>
							</div>
						</div>
						<div class="flex flex-wrap -mx-3 mb-5 mt-4">
							<div class="w-full px-3 md:mb-0">
								<label
									class="
										block
										tracking-wide
										text-gray-100 text-3xl
										font-bold
										mb-2
									"
								>
									Gender :
									{{ this.currentUserWithFoodRecipe.gender }}
								</label>
							</div>
						</div>
						<div class="flex flex-wrap -mx-3 mb-5 mt-4">
							<div class="w-full px-3 md:mb-0">
								<label
									class="
										block
										tracking-wide
										text-gray-100 text-3xl
										font-bold
										mb-2
									"
								>
									Email :
									{{ currentUserWithFoodRecipe.email }}
								</label>
							</div>
						</div>
						<div class="w-full px-3 md:mb-0">
							<label
								class="
									block
									tracking-wide
									text-white text-2xl
									font-bold
									mt-10
								"
							>
								Your Recipes
							</label>
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
									v-for="(
										food, index
									) in currentUserWithFoodRecipe.food_recipes"
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
									<td>
										<img
											v-if="food.photo"
											v-bind:src="food.photo_url"
											width="100"
											height="100"
										/>
										<img
											v-else
											src=""
											width="100"
											height="100"
										/>
									</td>
									<td v-if="index !== editIndex">
										<button @click="goToEditRecipe(food)">
											Edit
										</button>
										<button @click="deleteRecipe(food)">
											Delete
										</button>
									</td>
								</tr>
							</tbody>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import AuthService from "@/services/AuthService";
import FoodRecipeService from "@/services/FoodRecipe";

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
			var deleteFoodId = food.id;
			this.$swal({
				title: "Delete this recipe?",
				icon: "warning",
				buttons: true,
			}).then(async (willDelete) => {
				if (willDelete) {
					const res = await FoodRecipeService.deleteFoodRecipe(
						deleteFoodId
					);
					if (res.success) {
						swal("Delete success", {
							icon: "success",
						});
						this.$router.go();
					} else {
						this.$swal("Cannot Delete This Recipe.", "error");
					}
				}
			});
		},
	},
};
</script>

<style></style>
