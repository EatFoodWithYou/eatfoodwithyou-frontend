<template>
	<div class="mt-2">
		<input
			class="
				p-1
				bg-gray-100
				text-xl
				mt-2
				px-4
				focus:outline-none focus:bg-white
			"
			type="nameForSearch"
			v-model="form.nameForSearch"
			placeholder="Search.."
		/>
		<router-link
			class="
				absolute
				font-base
				bg-gray-600
				text-white
				px-4
				py-1.5
				mt-2
				hover:bg-gray-700
				transition
				duration-200
			"
			:to="{
				name: 'SearchRecipes',
				params: { name: this.form.nameForSearch },
			}"
			>ค้นหา</router-link
		>
		<!--    <button class="p-1 bg-green-100">ค้นหา </button>-->
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				nameForSearch: "",
			},
		};
	},
};
</script>

<style></style>
