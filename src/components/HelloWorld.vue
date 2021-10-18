<template>
	<div class="bg-heroBg bg-auto bg-no-repeat">
		<div>
			<div class="absolute px-14 text-black bg-white">
				<nav class="flex flex-col w-full min-h-full pb-8 bg-[#0C0B10]">
					<div class="text-xl font-semibold mt-6 pb-4">
						Food Categories
					</div>
					<div v-for="(category, index) in categoryList" :key="index">
						<input
							type="checkbox"
							v-model="category.active"
							@click="checkboxToggle(index)"
						/>
						<label class="px-4">{{ category.name }}</label
						><br />
					</div>
					<!-- <div class="text-xl font-semibold mt-4 pb-4">Budget</div>
					<form class="text-lg font-normal">
						<input type="checkbox" />
						<label class="px-4"> &lt; 100 </label><br />
						<input type="checkbox" />
						<label class="px-4"> 100 - 250</label><br />
						<input type="checkbox" />
						<label class="px-4"> 251 - 500 </label><br />
						<input type="checkbox" />
						<label class="px-4"> 500 > </label><br />
						<input type="checkbox" />
						<label class="px-4"> 1000 > </label><br />
					</form> -->
					<button
						@click="searchCategory()"
						class="border mt-4 py-1 hover:bg-gray-50 bg-gray-100"
					>
						Filter
					</button>
				</nav>
			</div>
			<div class="flex justify-center">
				<div class="flex mt-6">
					<div class="text-5xl font-bold px-6 text-white mt-2">
						Menu
					</div>
					<SearchBar />
				</div>
				<button
					@click="add()"
					class="
						py-4
						px-4
						w-auto
						transition
						duration-200
						bg-transparent bg-white
						text-navbarColor
						hover:bg-gray-100 hover:text-gray-500
						cursor-pointer
						rounded-full
						ml-28
						mt-6
						text-2xl
					"
				>
					Add Recipes
				</button>
			</div>
			<Random />
			<RandomFoodTable />
		</div>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Random from "@/components/FoodRecipe/randomFoodRecipe.vue";
import RandomFoodTable from "@/components/FoodRecipe/randomFoodTable.vue";
import SearchBar from "@/components/FoodRecipe/SearchForm.vue";
import CategoriesService from "../services/Categories";
export default {
	components: {
		Navbar,
		Random,
		SearchBar,
		RandomFoodTable,
	},
	data() {
		return {
			categoryList: [],
			categoryCheckbox: [],
		};
	},
	async created() {
		this.categoryList = await CategoriesService.getAllCategories();
		this.categoryList = this.categoryList.categories;
		for (let i = 0; i < this.categoryList.length; i++) {
			this.categoryCheckbox[i] = false;
		}
		// console.log("category", this.categoryList);
	},
	methods: {
		add() {
			this.$router.push("/recipe/add");
		},
		searchCategory() {
			let categorySearchList = "";
			let count = 0;
			for (let i = 0; i < this.categoryCheckbox.length; i++) {
				if (this.categoryCheckbox[i] === true) {
					if (count === 0) {
						categorySearchList += this.categoryList[i].name;
						count += 1;
					} else {
						categorySearchList += `, ${this.categoryList[i].name}`;
					}
				}
			}
			// console.log("search", categorySearchList);
			this.$router.push({
				// path: "recipes/category/",
				name: "SearchCategories",
				params: { categories: categorySearchList },
			});
		},
		checkboxToggle(index) {
			this.categoryCheckbox[index] = !this.categoryCheckbox[index];
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
