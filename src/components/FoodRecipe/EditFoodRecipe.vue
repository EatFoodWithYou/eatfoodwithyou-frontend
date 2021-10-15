<template>
	<div class="min-h-screen font-prompt">
		<div>
			<div>
				<div class="text-center py-16">
					<h2 class="text-6xl font-bold text-white">Edit Recipe</h2>
				</div>
				<div class="flex justify-center">
					<div class="w-7/12">
						<div class="flex flex-wrap -mx-3 mb-5 ml-40">
							<div class="px-3 md:mb-0">
								<img
									v-if="this.foodRecipeForm.photo"
									v-bind:src="this.foodRecipeForm.photo_url"
									ref="foodRecipeRef"
									width="250"
									height="250"
								/><img
									v-else
									src="https://via.placeholder.com/250x250"
									ref="foodRecipeRef"
									width="250"
									height="250"
								/>
							</div>
							<div class="w-full md:w-1/2 px-3 md:mb-0">
								<input
									class="
										appearance-none
										block
										w-full
										bg-gray-200
										text-gray-700 text-xl
										border
										rounded
										py-3
										px-4
										mb-3
										leading-tight
										focus:outline-none focus:bg-white
									"
									type="text"
									v-model="foodRecipeForm.name"
									placeholder="Name"
								/>
								<div class="w-full mt-6">
									<textarea
										class="
											appearance-none
											block
											w-full
											bg-gray-200
											text-gray-700 text-xl
											border
											rounded
											py-3
											px-4
											mb-3
											leading-tight
											focus:outline-none focus:bg-white
										"
										placeholder="Detail"
										rows="4"
										v-model="foodRecipeForm.detail"
									/>
								</div>
								<div class="mt-5">
									<input
										class="cursor-pointer"
										type="file"
										ref="recipePhoto"
										id="recipePhoto"
										@change="selectedRecipePhoto()"
									/>
								</div>
							</div>
						</div>
						<h2
							class="
								flex
								font-bold
								text-4xl text-white
								ml-44
								pb-5
							"
						>
							Ingredient
							<p class="font-normal text-base ml-4 mt-3.5">
								Quantity per 1 serving
							</p>
						</h2>
						<div v-for="(ingredient, k) in ingredientForm" :key="k">
							<label
								for="number"
								class="
									absolute
									font-normal
									text-2xl text-white
									ml-40
									py-1
								"
								>{{ k + 1 }}
							</label>
							<div class="flex mt-0 space-x-1 ml-48">
								<input
									class="
										appearance-none
										block
										w-2/5
										bg-gray-200
										text-gray-700 text-lg
										border
										rounded
										py-2
										px-3
										mb-3
										leading-tight
										focus:outline-none focus:bg-white
									"
									type="text"
									v-model="ingredient.name"
									placeholder="Ingredient"
								/>
								<input
									class="
										appearance-none
										block
										w-1/6
										bg-gray-200
										text-gray-700 text-lg
										border
										rounded
										py-2
										px-3
										mb-3
										leading-tight
										focus:outline-none focus:bg-white
									"
									type="number"
									v-model="ingredient.quantity"
									placeholder="Quantity"
								/>
								<input
									class="
										appearance-none
										block
										w-1/6
										bg-gray-200
										text-gray-700 text-lg
										border
										rounded
										py-2
										px-3
										mb-3
										leading-tight
										focus:outline-none focus:bg-white
									"
									type="text"
									v-model="ingredient.unit"
									placeholder="Unit"
								/>
								<button
									@click="removeIngredient(k)"
									v-show="
										k || (!k && ingredientForm.length > 1)
									"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-8 w-8 text-white -mt-3 ml-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</button>
							</div>
						</div>
						<div class="text-center py-2">
							<button
								@click="addIngredient()"
								class="text-xl font-semibold text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</button>
						</div>
						<h2
							class="
								flex
								font-bold
								text-4xl text-white
								ml-44
								pb-5
							"
						>
							Process
						</h2>

						<div
							class="flex flex-wrap -mx-3 mb-5 ml-40"
							v-for="(cookingProcess, k) in cookingProcessForm"
							:key="k"
						>
							<label
								for="number"
								class="
									absolute
									font-normal
									text-2xl text-white
									py-1
								"
								>{{ k + 1 }}
							</label>
							<div class="px-3 md:mb-0 ml-5 bg-cover">
								<img
									v-if="cookingProcess.photo"
									v-bind:src="cookingProcess.photo_url"
									ref="processRef"
									width="150"
									height="150"
								/>
								<img
									v-else
									src="https://via.placeholder.com/150x150"
									ref="processRef"
									width="150"
									height="150"
								/>
							</div>
							<div class="w-6/12 px-3 md:mb-0">
								<div class="w-full">
									<textarea
										class="
											appearance-none
											block
											w-full
											bg-gray-200
											text-gray-700 text-xl
											border
											rounded
											py-3
											px-4
											mb-3
											leading-tight
											focus:outline-none focus:bg-white
										"
										placeholder="Process"
										rows="3"
										v-model="cookingProcess.process"
									/>
								</div>
								<div class="mt-5">
									<input
										class="cursor-pointer"
										type="file"
										ref="photo"
										id="processPhoto"
										@change="selectedFileProcess(k)"
									/>
								</div>
							</div>
							<button
								@click="removeProcess(k)"
								v-show="
									k || (!k && cookingProcessForm.length > 1)
								"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8 text-white -mt-10 ml-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</button>
						</div>
						<div class="text-center py-2">
							<button
								@click="addProcess()"
								class="text-xl font-semibold text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</button>
						</div>
						<h2
							class="
								flex
								font-bold
								text-4xl text-white
								ml-44
								pb-5
							"
						>
							Food Categories
						</h2>
						<div class="flex flex-wrap -mx-3 mb-5 ml-44">
							<div class="w-full md:w-1/2 px-3 md:mb-0">
								<div class="relative">
									<select
										class="
											block
											appearance-none
											w-full
											border
											bg-gray-200
											border-gray-200
											text-gray-700 text-xl
											py-2
											px-3
											pr-8
											rounded
											leading-tight
											focus:outline-none
											focus:bg-white
											focus:border-gray-500
										"
										name="categories"
										id="category"
										v-model="selectedCategory"
									>
										<option value="">
											Food Categories
										</option>
										<option
											v-for="(item, k) in allCategory"
											:key="k"
											:value="item.name"
										>
											{{ item.name }}
										</option>
									</select>
									<div
										class="
											pointer-events-none
											absolute
											inset-y-0
											right-0
											flex
											items-center
											px-2
											text-gray-700
										"
									>
										<svg
											class="fill-current h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path
												d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="py-3 text-center text-black">
					<button
						@click="updateFoodRecipe()"
						class="
							font-normal
							text-2xl
							py-2
							w-44
							rounded-full
							border-2 border-white
							text-white
							hover:bg-gray-100 hover:text-black
							transition
							duration-250
						"
					>
						Update
					</button>
				</div>
				<br />
			</div>
		</div>
	</div>
</template>

<script>
import FoodRecipeService from "@/services/FoodRecipe";
import IngredientService from "@/services/Ingredient";
import CookingProcessService from "@/services/CookingProcess";
import AuthUserStore from "@/store/AuthUser";
import CategoriesService from "@/services/Categories";
export default {
	data() {
		return {
			api_end_point:
				process.env.VUE_APP_SHOP_ENDPOINT || "http://localhost:8000",
			currentUser: "",
			foodRecipeForm: {
				id: "",
				name: "",
				detail: "",
				user_id: "",
				photo: "",
				photo_url: "",
				category_names: "",
			},
			ingredientForm: [
				{
					id: "",
					name: "",
					quantity: "",
					unit: "",
				},
			],
			cookingProcessForm: [
				{
					id: "",
					photo: "",
					photo_url: "",
					process: "",
				},
			],
			formData: "",
			ProcessDataForm: "",
			selectedCategory: "",
			allCategory: [],
			allSelectedCategory: [],
		};
	},
	async created() {
		if (this.isAuthen() === false) {
			this.$swal(
				"You are not logged in.",
				"Please login and go to this page again",
				"error"
			);
			return this.$router.push("/login");
		}
		this.getCurrentUser();
		const res = await FoodRecipeService.fetchRecipeById(
			this.$route.params.id
		);
		this.setFoodRecipeForm(res.data);
		this.fetchCategories();
		console.log("res", res.data);
		// console.log("recipeForm", this.foodRecipeForm);
		this.ingredientForm = res.data.ingredients;
		this.cookingProcessForm = res.data.cooking_processes;
	},
	methods: {
		isAuthen() {
			return AuthUserStore.getters.isAuthen;
		},
		getCurrentUser() {
			this.currentUser = AuthUserStore.getters.getCurrentUser;
		},
		selectedRecipePhoto() {
			this.foodRecipeForm.photo = this.$refs.recipePhoto.files[0];
			let url = URL.createObjectURL(this.foodRecipeForm.photo);
			this.$refs.foodRecipeRef.src = url;
			this.foodRecipeForm.photo_url = url;
			// console.log("after select photo", this.foodRecipeForm);
		},
		setFoodRecipeForm(res) {
			this.foodRecipeForm.id = res.id;
			this.foodRecipeForm.name = res.name;
			this.foodRecipeForm.detail = res.detail;
			this.foodRecipeForm.user_id = res.user_id;
			this.foodRecipeForm.category_names = res.category_names;
			this.foodRecipeForm.photo = res.photo;
			this.foodRecipeForm.photo_url = res.photo_url;
		},
		addIngredient() {
			this.ingredientForm.push({
				name: "",
				quantity: 0,
				unit: "",
				food_recipe_id: -1,
			});
		},
		removeIngredient(index) {
			var ingredientIndex = index;
			if (this.ingredientForm[index].id !== undefined) {
				var removeIngredientId = this.ingredientForm[index].id;
				swal({
					title: "Are you sure?",
					text: "Once deleted, you will not be able to recover this ingredient",
					icon: "warning",
					dangerMode: true,
					buttons: true,
				}).then(async (willDelete) => {
					if (willDelete) {
						const res = await IngredientService.deleteIngredient(
							removeIngredientId
						);
						if (res.success) {
							this.ingredientForm.splice(ingredientIndex, 1);
							swal("Your ingredient has been deleted!", {
								icon: "success",
							});
						} else {
							this.$swal("Cannot Remove Ingredient.", "error");
						}
					}
				});
			} else {
				swal({
					title: "Are you sure?",
					text: "Once deleted, you will not be able to recover this ingredient",
					icon: "warning",
					dangerMode: true,
					buttons: true,
				}).then(async (willDelete) => {
					if (willDelete) {
						this.ingredientForm.splice(ingredientIndex, 1);
						swal("Your ingredient has been deleted!", {
							icon: "success",
						});
					}
				});
			}
		},
		addProcess() {
			this.cookingProcessForm.push({
				process: "",
				photo: null,
				food_recipe_id: -1,
			});
		},
		removeProcess(index) {
			var cookingProcessIndex = index;
			if (this.cookingProcessForm[index].id !== undefined) {
				var removeCookingProcessId = this.cookingProcessForm[index].id;
				swal({
					title: "Are you sure?",
					text: "Once deleted, you will not be able to recover this cooking process",
					icon: "warning",
					dangerMode: true,
					buttons: true,
				}).then(async (willDelete) => {
					if (willDelete) {
						const res =
							await CookingProcessService.deleteCookingProcess(
								removeCookingProcessId
							);
						if (res.success) {
							this.cookingProcessForm.splice(
								cookingProcessIndex,
								1
							);
							swal("Your cooking process has been deleted!", {
								icon: "success",
							});
						} else {
							this.$swal(
								"Cannot Remove cooking process.",
								"error"
							);
						}
					}
				});
			} else {
				swal({
					title: "Are you sure?",
					text: "Once deleted, you will not be able to recover this cooking process",
					icon: "warning",
					dangerMode: true,
					buttons: true,
				}).then(async (willDelete) => {
					if (willDelete) {
						this.cookingProcessForm.splice(cookingProcessIndex, 1);
						swal("Your cooking process has been deleted!", {
							icon: "success",
						});
					}
				});
			}
		},
		selectedFileProcess(index) {
			this.cookingProcessForm[index].photo =
				this.$refs.photo[index].files[0];
			let url = URL.createObjectURL(this.cookingProcessForm[index].photo);
			this.$refs.processRef[index].src = url;
			this.cookingProcessForm[index].photo_url = url;
		},
		checkNullValue() {
			return (
				this.foodRecipeForm.name !== "" &&
				this.foodRecipeForm.detail !== "" &&
				this.checkIngredientNull() &&
				this.checkProcessNull()
			);
		},
		checkIngredientNull() {
			let isNull = true;
			for (let item of this.ingredientForm) {
				if (
					item.name === "" ||
					item.quantity === 0 ||
					item.unit === ""
				) {
					isNull = false;
				}
			}
			return isNull;
		},
		checkProcessNull() {
			for (let item of this.cookingProcessForm) {
				if (item.process === "") {
					return false;
				}
			}
			return true;
		},
		async updateFoodRecipe() {
			if (this.checkNullValue()) {
				this.createDataForm();
				const res = await FoodRecipeService.updateFoodRecipe(
					this.formData
				);
				if (res.success) {
					let res1 = false;
					for (let item of this.ingredientForm) {
						item.food_recipe_id = this.foodRecipeForm.id;
						if (item.id !== undefined) {
							res1 = await IngredientService.updateIngredient(
								item
							);
						} else {
							res1 = await IngredientService.createIngredient(
								item
							);
						}
						if (res1.success === false) {
							this.$swal(
								"Update Food Recipe Failed",
								res1.message,
								"error"
							);
							break;
						}
					}
					let res2 = false;
					if (res1.success) {
						for (let item of this.cookingProcessForm) {
							item.food_recipe_id = this.foodRecipeForm.id;
							this.createProcessDataFrom(item);
							if (item.id !== undefined) {
								res2 =
									await CookingProcessService.updateCookingProcess(
										this.ProcessDataForm
									);
							} else {
								res2 =
									await CookingProcessService.createCookingProcess(
										this.ProcessDataForm
									);
							}
							if (res2.success === false) {
								this.$swal(
									"Update Food Recipe Failed",
									res1.message,
									"error"
								);
								break;
							}
						}
					}
					if (res1.success && res2.success) {
						this.$swal(
							"Update Food Recipe Success",
							`${this.foodRecipeForm.name}`,
							"success"
						);
						this.$router.push("/user-information");
					}
				} else {
					this.$swal(
						"Update Food Recipe Failed",
						res.message,
						"error"
					);
				}
			} else {
				this.$swal(
					"Update Food Recipe Failed",
					"Please check that the information you have entered is complete.",
					"error"
				);
			}
		},
		createDataForm() {
			this.formData = new FormData();
			this.formData.append("id", this.foodRecipeForm.id);
			this.formData.append("name", this.foodRecipeForm.name);
			this.formData.append("detail", this.foodRecipeForm.detail);
			this.formData.append("photo", this.foodRecipeForm.photo);
			this.formData.append(
				"categories",
				this.foodRecipeForm.category_names
			);
		},
		createProcessDataFrom(item) {
			this.ProcessDataForm = new FormData();
			this.ProcessDataForm.append("id", item.id);
			this.ProcessDataForm.append("process", item.process);
			this.ProcessDataForm.append("food_recipe_id", item.food_recipe_id);
			this.ProcessDataForm.append("photo", item.photo);
			// console.log("formData", this.formData);
		},
		async fetchCategories() {
			const categories = await CategoriesService.getAllCategories();
			this.allCategory = categories.categories;
		},
		selectCategory() {
			if (
				!this.foodRecipeForm.category_names.includes(
					this.selectedCategory
				)
			) {
				if (this.foodRecipeForm.category_names === "") {
					this.foodRecipeForm.category_names = this.selectedCategory;
				} else {
					this.foodRecipeForm.category_names =
						this.foodRecipeForm.category_names +
						", " +
						this.selectedCategory;
				}
			}
		},
		clearSelectedCategories() {
			this.foodRecipeForm.category_names = "";
		},
	},
};
</script>

<style></style>
