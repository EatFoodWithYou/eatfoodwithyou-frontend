<template>
	<div>
		<div>
			<div class="absolute px-20 text-black bg-white -mt-10">
				<nav class="flex flex-col w-full min-h-full pb-8 bg-[#0C0B10]">
					<div class="text-xl font-semibold mt-7 pb-5">
						Food Category
					</div>
					<form class="text-lg font-normal">
						<input
							type="checkbox"
							id="1"
							value="lnwza"
							v-model="form.categoriesForSearch"
						/>
						<label class="px-4"> food 1</label><br />
						<input
							type="checkbox"
							id="2"
							value="2"
							v-model="form.categoriesForSearch"
						/>
						<label class="px-4"> food 2</label><br />
						<input
							type="checkbox"
							id="3"
							value="3"
							v-model="form.categoriesForSearch"
						/>
						<label class="px-4"> food 3</label><br />
						<input
							type="checkbox"
							id="4"
							value="4"
							v-model="form.categoriesForSearch"
						/>
						<label class="px-4"> food 4</label><br />
						<input
							type="checkbox"
							id="5"
							value="5"
							v-model="form.categoriesForSearch"
						/>
						<label class="px-4"> food 5</label><br />
						<input
							type="checkbox"
							id="6"
							value="6"
							v-model="form.categoriesForSearch"
						/>
						<label class="px-4"> food 6</label><br />
						<input
							type="checkbox"
							id="7"
							value="7"
							v-model="form.categoriesForSearch"
						/>
						<label class="px-4"> food 7</label><br />
						<input
							type="checkbox"
							id="8"
							value="8"
							v-model="form.categoriesForSearch"
						/>
						<label class="px-4"> food 8</label><br />
						<input
							type="checkbox"
							id="9"
							value="9"
							v-model="form.categoriesForSearch"
						/>
						<label class="px-4"> food 9</label><br />
						<input
							type="checkbox"
							id="10"
							value="10"
							v-model="form.categoriesForSearch"
						/>
						<label class="px-4"> food 10</label><br />
					</form>
					<div class="text-xl font-semibold mt-7 pb-6">Budget</div>
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
					</form>
				</nav>

				<router-link
					class="
						absolute
						font-base
						bg-gray-600
						text-white
						px-4
						py-2
						mt-2
						hover:bg-gray-700
						transition
						duration-200
					"
					:to="{
						name: 'SearchCategories',
						params: { category: this.form.categoriesForSearch },
					}"
					>ค้นหา</router-link
				>
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
export default {
	components: {
		Navbar,
		Random,
		SearchBar,
	},

	data() {
		return {
			form: {
				categoriesForSearch: [],
			},
		};
	},

	methods: {
		add() {
			this.$router.push("/recipe/add");
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
