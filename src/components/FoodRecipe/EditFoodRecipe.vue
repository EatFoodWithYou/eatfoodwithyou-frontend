<template>
	<div>
		<h1>แก้ไขรายการอาหาร</h1>
		<div>
			<div class="flex flex-row">
				<div>
					<img
						v-if="this.foodRecipeForm.photo"
						v-bind:src="this.foodRecipeForm.photo_url"
						ref="foodRecipeRef"
						width="250"
						height="200"
					/><img
						v-else
						src=""
						ref="foodRecipeRef"
						width="250"
						height="200"
					/>
				</div>
				<div>
					<div>
						<input
							type="text"
							v-model="foodRecipeForm.name"
							placeholder="ชื่ออาหาร"
						/>
					</div>
					<div>
						<textarea
							name="detail"
							id=""
							cols="30"
							rows="5"
							v-model="foodRecipeForm.detail"
							placeholder="รายละเอียดของสูตรอาหาร"
						></textarea>
					</div>
					<div>
						<input
							type="file"
							ref="recipePhoto"
							id="recipePhoto"
							@change="selectedRecipePhoto()"
						/>
					</div>
				</div>
			</div>
			<div>
				<h3>วัตถุดิบ</h3>
				<p>โดยปริมาณที่ใส่จะต้องเป็นปริมาณการทำต่อ 1 ที่</p>
				<div v-for="(ingredient, k) in ingredientForm" :key="k">
					<label for="number">{{ k + 1 }} </label>
					<span>
						<input
							type="text"
							v-model="ingredient.name"
							placeholder="ชื่อวัตถุดิบ"
						/>
						<input
							type="number"
							v-model="ingredient.quantity"
							placeholder="ปริมาณ"
							min="0"
						/>
						<input
							type="text"
							v-model="ingredient.unit"
							placeholder="หน่วย"
						/>
						<button
							@click="removeIngredient(k)"
							v-show="k || (!k && ingredientForm.length > 1)"
						>
							ลบ
						</button>
					</span>
				</div>
				<button @click="addIngredient()">เพิ่มวัตถุดิบ</button>
			</div>
			<div>
				<h3>ขั้นตอนการทำ</h3>
				<div
					v-for="(cookingProcess, k) in cookingProcessForm"
					:key="k"
					class="flex flex-row"
				>
					<div>
						<label for="number">{{ k + 1 }} </label>
						<textarea
							cols="30"
							rows="5"
							v-model="cookingProcess.process"
							placeholder="ขั้นตอนการทำ"
						></textarea>
					</div>
					<div>
						<img
							v-if="cookingProcess.photo"
							v-bind:src="cookingProcess.photo_url"
							ref="processRef"
							width="150"
							height="200"
						/>
						<img
							v-else
							src=""
							ref="processRef"
							width="150"
							height="200"
						/>
						<input
							type="file"
							ref="photo"
							id="processPhoto"
							@change="selectedFileProcess(k)"
						/>
					</div>
					<div>
						<button
							@click="removeProcess(k)"
							v-show="k || (!k && cookingProcessForm.length > 1)"
						>
							ลบ
						</button>
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
				<select
					name="categories"
					id="category"
					v-model="selectedCategory"
				>
					<option value="">กรุณาเลือกประเภทที่ต้องการ</option>
					<option
						v-for="(item, k) in allCategory"
						:key="k"
						:value="item.name"
					>
						{{ item.name }}
					</option>
				</select>
				<button @click="selectCategory">เลือก</button>
			</div>
			<div>
				<span>
					ประเภทของอาหารที่เลือกแล้ว :
					<p>{{ this.foodRecipeForm.category_names }}</p>
				</span>
				<button @click="clearSelectedCategories">ลบทั้งหมด</button>
			</div>
		</div>
		<div>
			<button type="submit" @click="updateFoodRecipe()">Update</button>
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
