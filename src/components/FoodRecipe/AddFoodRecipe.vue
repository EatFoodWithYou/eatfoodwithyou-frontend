<template>
	<div class="min-h-screen font-prompt bg-addBg bg-no-repeat">
		<div>
			<div>
				<div class="text-center py-16">
					<h2 class="text-6xl font-bold text-white">
						Add New Recipe
					</h2>
				</div>
				<div class="flex justify-center">
					<div class="w-7/12">
						<div class="flex flex-wrap -mx-3 mb-5 ml-40">
							<div class="px-3 md:mb-0">
								<img
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
										bg-white
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
									minlength="3"
								/>
								<div class="w-full mt-6">
									<textarea
										class="
											appearance-none
											block
											w-full
											bg-white
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
										minlength="5"
									/>
								</div>
								<div class="mt-5">
									<input
										class="cursor-pointer text-white"
										type="file"
										ref="recipePhoto"
										id="recipePhoto"
										@change="selectedRecipePhoto()"
										accept="image/*"
									/>
								</div>
							</div>
						</div>
						<h2
							class="
								flex
								font-bold
								text-4xl text-navbarColor
								ml-44
								pb-5
							"
						>
							Ingredient
							<p class="font-normal text-base ml-4 mt-3.5">
								Quantity per 1 serving
							</p>
						</h2>
						<div v-for="(input, k) in allIngredient" :key="k">
							<label
								for="number"
								class="
									absolute
									font-normal
									text-2xl text-navbarColor
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
										bg-white
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
									v-model="input.name"
									placeholder="Ingredient"
									minlength="3"
								/>
								<input
									class="
										appearance-none
										block
										w-1/6
										bg-white
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
									v-model="input.quantity"
									placeholder="Quantity"
								/>
								<input
									class="
										appearance-none
										block
										w-1/6
										bg-white
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
									v-model="input.unit"
									placeholder="Unit"
								/>
								<button
									@click="removeIngredient(k)"
									v-show="
										k || (!k && allIngredient.length > 1)
									"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="
											h-8
											w-8
											text-navbarColor
											-mt-3
											ml-2
										"
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
								class="text-xl font-semibold text-navbarColor"
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
								text-4xl text-navbarColor
								ml-44
								pb-5
							"
						>
							Process
						</h2>

						<div
							class="flex flex-wrap -mx-3 mb-5 ml-40"
							v-for="(input, k) in allCookingProcess"
							:key="k"
						>
							<label
								for="number"
								class="
									absolute
									font-normal
									text-2xl text-navbarColor
									py-1
								"
								>{{ k + 1 }}
							</label>
							<div class="px-3 md:mb-0 ml-5">
								<img
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
											bg-white
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
										v-model="input.process"
									/>
								</div>
								<div class="mt-5">
									<input
										class="cursor-pointer"
										type="file"
										ref="photo"
										id="processPhoto"
										@change="selectedFileProcess(k)"
										accept="image/*"
									/>
								</div>
							</div>
							<button
								@click="removeProcess(k)"
								v-show="
									k || (!k && allCookingProcess.length > 1)
								"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8 text-navbarColor -mt-10 ml-2"
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
								class="text-xl font-semibold text-navbarColor"
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
								text-4xl text-navbarColor
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
											bg-white
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
										v-model="selectedCategory"
									>
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
							<button
								@click="selectCategory()"
								class="
									text-blue-600
									hover:text-blue-400
									duration-200
								"
							>
								Select
							</button>
						</div>
						<span class="ml-48 flex flex-wrap -mt-3">
							Selected :&nbsp;
							<p>{{ this.foodRecipeForm.categories }}</p>
						</span>
						<button
							@click="clearSelectedCategories"
							class="
								ml-48
								text-red-500
								hover:text-red-400
								text-lg
								duration-200
							"
						>
							Clear Selected
						</button>
					</div>
				</div>
				<div class="py-3 text-center text-black">
					<button
						@click="addNewFoodRecipe()"
						class="
							font-normal
							text-2xl
							py-2
							w-44
							rounded-full
							border-2 border-navbarColor
							text-navbarColor
							hover:bg-navbarColor hover:text-white
							transition
							duration-250
						"
					>
						Add
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
			allIngredient: [
				{
					name: "",
					quantity: "",
					unit: "",
					food_recipe_id: "",
				},
			],
			foodRecipeForm: {
				name: "",
				detail: "",
				photo: null,
				user_id: 0,
				categories: "",
			},
			allCookingProcess: [
				{
					process: "",
					photo: null,
					food_recipe_id: 0,
				},
			],
			newFoodRecipe: "",
			foodRecipeFromData: "",
			ProcessFromdata: "",
			currentUser: "",
			allCategory: "",
			selectedCategory: "",
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
			this.$router.push("/login");
		}

		this.getCurrentUser();
		// console.log(this.currentUser);
		this.foodRecipeForm.user_id = this.currentUser.user.id;
		await this.fetchCategories();
		console.log(this.allCategory);
		// console.log(this.foodRecipeForm);
	},
	methods: {
		addIngredient() {
			this.allIngredient.push({
				name: "",
				quantity: "",
				unit: "",
				food_recipe_id: 0,
			});
			console.log(this.allIngredient);
		},
		removeIngredient(index) {
			this.allIngredient.splice(index, 1);
		},
		addProcess() {
			this.allCookingProcess.push({
				process: "",
				photo: null,
				food_recipe_id: 0,
			});
		},
		removeProcess(index) {
			this.allCookingProcess.splice(index, 1);
		},
		selectedFileProcess(index) {
			// console.log(index);
			// console.log(this.allCookingProcess[index]);
			// console.log(this.$refs.photo[index].files[0]);
			this.allCookingProcess[index].photo =
				this.$refs.photo[index].files[0];
			let url = URL.createObjectURL(this.allCookingProcess[index].photo);
			this.$refs.processRef[index].src = url;
		},
		selectedRecipePhoto() {
			this.foodRecipeForm.photo = this.$refs.recipePhoto.files[0];
			let url = URL.createObjectURL(this.foodRecipeForm.photo);
			this.$refs.foodRecipeRef.src = url;
			// console.log(this.foodRecipeForm.photo);
		},
		async addNewFoodRecipe() {
			if (this.checkNullValue()) {
				this.createDataFrom();
				let res = await FoodRecipeService.createFoodRecipe(
					this.foodRecipeFromData
				);
				// console.log(res);
				// console.log(this.newFoodRecipe);
				if (res.success) {
					this.newFoodRecipe = res.foodRecipe.data;
					// this.$swal('Add new Food Recipe Success', `${res.data.name}`, 'success');
					let addIngredientStatus = true;
					for (let item of this.allIngredient) {
						// console.log(this.newFoodRecipe.id);
						item.food_recipe_id = this.newFoodRecipe.id;
						// console.log(item);
						let res1 = await IngredientService.createIngredient(
							item
						);
						if (res1.success) {
							addIngredientStatus = true;
						} else {
							this.$swal(
								"Add new Food Recipe Failed",
								res1.message,
								"error"
							);
							addIngredientStatus = false;
							break;
						}
					}
					if (addIngredientStatus) {
						let addCookingProcessStatus = false;
						for (let item of this.allCookingProcess) {
							item.food_recipe_id = this.newFoodRecipe.id;
							this.createProcessDataFrom(item);
							let res2 =
								await CookingProcessService.createCookingProcess(
									this.ProcessFromdata
								);
							if (res2.success) {
								addCookingProcessStatus = true;
							} else {
								this.$swal(
									"Add new Food Recipe Failed",
									res2.message,
									"error"
								);
								addIngredientStatus = false;
								break;
							}
						}
					}
					if (
						addIngredientStatus == true ||
						addCookingProcessStatus == true
					) {
						this.$swal(
							"Add new Food Recipe Success",
							`${this.newFoodRecipe.name}`,
							"success"
						);
						this.$router.push("/");
					}
				} else {
					console.log(res);
					this.$swal(
						"Add new Food Recipe Failed",
						res.message,
						"error"
					);
				}
			} else {
				this.$swal(
					"Add new Food Recipe Failed",
					"Please check that the information you have entered is complete.",
					"error"
				);
			}
		},
		createDataFrom() {
			this.foodRecipeFromData = new FormData();
			this.foodRecipeFromData.append("photo", this.foodRecipeForm.photo);
			this.foodRecipeFromData.append("name", this.foodRecipeForm.name);
			this.foodRecipeFromData.append(
				"detail",
				this.foodRecipeForm.detail
			);
			this.foodRecipeFromData.append(
				"user_id",
				this.foodRecipeForm.user_id
			);
			this.foodRecipeFromData.append(
				"categories",
				this.foodRecipeForm.categories
			);
			// for (var value of this.foodRecipeFromData.values()) {
			//   console.log(value);
			// }
		},
		createProcessDataFrom(item) {
			this.ProcessFromdata = new FormData();
			this.ProcessFromdata.append("process", item.process);
			this.ProcessFromdata.append("food_recipe_id", item.food_recipe_id);
			this.ProcessFromdata.append("photo", item.photo);
			//       for (var value of this.ProcessFromdata.values()) {
			//   console.log(value);
			// }
		},
		getCurrentUser() {
			this.currentUser = AuthUserStore.getters.getCurrentUser;
		},
		checkNullValue() {
			return (
				this.foodRecipeForm.name !== "" &&
				this.foodRecipeForm.detail !== "" &&
				this.checkIngredientNull() &&
				this.checkProcessNull()
			);
		},
		isAuthen() {
			return AuthUserStore.getters.isAuthen;
		},
		checkIngredientNull() {
			let isNull = true;
			for (let item of this.allIngredient) {
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
			for (let item of this.allCookingProcess) {
				if (item.process === "") {
					return false;
				}
			}
			return true;
		},
		async fetchCategories() {
			let categories = await CategoriesService.getAllCategories();
			this.allCategory = categories.categories;
			console.log(this.allCategory);
		},
		selectCategory() {
			if (
				this.selectedCategory !== "" &&
				!this.allSelectedCategory.includes(this.selectedCategory)
			) {
				this.allSelectedCategory.push(this.selectedCategory);
				if (this.foodRecipeForm.categories == "") {
					this.foodRecipeForm.categories = this.selectedCategory;
				} else {
					this.foodRecipeForm.categories =
						this.foodRecipeForm.categories +
						", " +
						this.selectedCategory;
				}
			}
			// console.log(this.foodRecipeForm.categories);
			// this.setCategoriesString();
		},
		clearSelectedCategories() {
			this.allSelectedCategory = [];
			this.foodRecipeForm.categories = "";
		},
	},
};
</script>

<style></style>
