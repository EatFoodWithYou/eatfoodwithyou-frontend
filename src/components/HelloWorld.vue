<template>
	<div>
		<div>
			<div class="absolute px-20 text-black bg-white -mt-10 ">
				<nav class="flex flex-col w-full min-h-full pb-8 bg-[#0C0B10]">
					<div class="text-xl font-semibold mt-7 pb-5">
						Food Category
					</div>
					<form class="text-lg font-normal">
						<input type="checkbox" />
						<label class="px-4"> food 1</label><br />
						<input type="checkbox" />
						<label class="px-4"> food 2</label><br />
						<input type="checkbox" />
						<label class="px-4"> food 3</label><br />
						<input type="checkbox" />
						<label class="px-4"> food 4</label><br />
						<input type="checkbox" />
						<label class="px-4"> food 5</label><br />
						<input type="checkbox" />
						<label class="px-4"> food 6</label><br />
						<input type="checkbox" />
						<label class="px-4"> food 7</label><br />
						<input type="checkbox" />
						<label class="px-4"> food 8</label><br />
						<input type="checkbox" />
						<label class="px-4"> food 9</label><br />
						<input type="checkbox" />
						<label class="px-4"> food 10</label><br />
					</form>
					<div class="text-xl font-semibold mt-7 pb-6">
						Budget
					</div>
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
			</div>
			<div class="flex justify-center mt-10 mr-44">
				<div class="text-5xl font-bold px-6">
					Menu
				</div>
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
					border-2
					border-white
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
		SearchBar
	},

	methods: {
		add() {
			this.$router.push("/recipe/add");
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
