<template>
	<div>
		<div>
			<div class="absolute px-20 text-black bg-white -mt-10">
				<nav class="flex flex-col w-full min-h-full pb-8 bg-[#0C0B10]">
					<div class="text-xl font-semibold mt-7 pb-5">
						Food Category
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
					<button @click="searchCategory()" class="border">
						Filter
					</button>
					<!-- <div class="text-xl font-semibold mt-7 pb-6">Budget</div>
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
				</nav>
			</div>
			<div class="flex justify-center mt-10 mr-44">
				<div class="text-5xl font-bold px-6">Menu</div>
				<SearchBar />
				<button
					@click="add()"
					class="
						py-4
						px-4
						w-auto
						transition
						duration-200
						bg-transparent
						border-2 border-white
						text-white
						hover:bg-navbarColor
						cursor-pointer
						rounded-full
						ml-28
					"
				>
					Add Recipes
				</button>
			</div>
			<Random />
		</div>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Random from "@/components/FoodRecipe/randomFoodRecipe.vue";
import SearchBar from "@/components/FoodRecipe/SearchForm.vue";
import CategoriesService from "../services/Categories";
export default {
	components: {
		Navbar,
		Random,
		SearchBar,
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
