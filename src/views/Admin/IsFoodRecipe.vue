<template>
	<div>
		<is-food-recipe class=""></is-food-recipe>
	</div>
</template>

<script>
import IsFoodRecipe from "@/components/Admin/IsFoodRecipe";
export default {
	components: { IsFoodRecipe },
};
</script>

<style>
.center {
	margin: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
