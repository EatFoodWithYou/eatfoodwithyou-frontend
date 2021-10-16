<template>
	<div class="bg-userBg bg-no-repeat font-prompt">
		<div>
			<div>
				<div class="text-center py-10 pt-16">
					<h2 class="text-6xl font-bold text-white">
						{{ this.currentUserWithFoodRecipe.name }}
						<button
							@click="goToEdit()"
							class="
								p-3
								text-2xl
								absolute
								right-24
								cursor-pointer
								bg-white
								text-gray-800
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
					<div class="w-full max-w-4xl text-center">
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
									{{ this.currentUserWithFoodRecipe.age }} yrs
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
									{{ this.currentUserWithFoodRecipe.email }}
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
							<div class="block w-full overflow-x-auto">
								<table
									class="
										mt-6
										items-center
										bg-transparent
										w-full
										border-collapse
										cursor
										bg-white
									"
								>
									<thead>
										<tr>
											<th
												class="
													px-6
													bg-blueGray-50
													text-black
													align-middle
													border-b
													border-solid
													border-blueGray-100
													py-3
													text-base
													uppercase
													whitespace-nowrap
													font-medium
													text-center
												"
											>
												No.
											</th>
											<th
												class="
													px-6
													bg-blueGray-50
													text-black
													align-middle
													border-b
													border-solid
													border-blueGray-100
													py-3
													text-base
													uppercase
													whitespace-nowrap
													font-medium
													text-center
												"
											>
												Name
											</th>
											<th
												class="
													px-6
													bg-blueGray-50
													text-black
													align-middle
													border-b
													border-r
													border-solid
													border-blueGray-100
													py-3
													text-base
													uppercase
													whitespace-nowrap
													font-medium
													text-center
												"
											>
												Photo
											</th>
											<th
												class="
													px-6
													bg-blueGray-50
													text-transparent
													align-middle
													border-b
													border-solid
													border-blueGray-100
													py-3
													text-base
													uppercase
													whitespace-nowrap
													font-medium
													text-center
												"
											>
												Edit
											</th>
											<th
												class="
													px-6
													bg-blueGray-50
													text-transparent
													align-middle
													border-b
													border-solid
													border-blueGray-100
													py-3
													text-base
													uppercase
													whitespace-nowrap
													font-medium
													text-center
												"
											>
												Delete
											</th>
										</tr>
									</thead>

									<tbody>
										<tr
											class="text-center"
											v-for="(
												food, index
											) in currentUserWithFoodRecipe.food_recipes"
											:key="index"
										>
											<td
												class="
													border-t-0
													px-6
													align-middle
													border-l-0 border-r-0
													text-base
													whitespace-nowrap
													p-4
												"
											>
												{{ food.id }}
											</td>
											<td
												class="
													border-t-0
													px-6
													align-middle
													border-l-0 border-r-0
													text-base
													whitespace-nowrap
													p-4
												"
											>
												{{ food.name }}
											</td>
											<td
												class="
													flex
													border-t-0
													justify-center
													border-l-0 border-r-0
													text-base
													whitespace-nowrap
													py-3
												"
											>
												<img
													v-if="food.photo"
													v-bind:src="food.photo_url"
													width="100"
													height="100"
												/>
												<img
													v-else
													src="https://via.placeholder.com/100x100"
													width="100"
													height="100"
												/>
											</td>
											<td
												class="
													border-t-0
													px-6
													align-middle
													border-l-0 border-r-0
													text-lg
													whitespace-nowrap
													p-4
												"
												v-if="index !== editIndex"
											>
												<button
													@click="
														goToEditRecipe(food)
													"
													class="
														text-blue-300
														hover:text-blue-500
														duration-200
													"
												>
													Edit
												</button>
											</td>
											<td
												class="
													border-t-0
													px-6
													align-middle
													border-l-0 border-r-0
													text-lg
													whitespace-nowrap
													p-4
												"
												v-if="index !== editIndex"
											>
												<button
													@click="deleteRecipe(food)"
													class="
														text-red-300
														hover:text-red-500
														duration-200
													"
												>
													Delete
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
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
			this.currentUser = this.currentUser;
			console.log("CurrentUser2", this.currentUser);
			let res = await AuthService.fetchRecipes();
			console.log("RESDATA", this.res);
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
						swal("Deleted", {
							icon: "success",
						}).then((result) => {
							if (result) this.$router.go();
						});
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
