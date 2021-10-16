<template>
	<div id="app" class="overflow-hidden">
		<div class="bg-gray-200 bg-cover main-container min-h-screen">
			<div class="font-prompt">
				<div>
					<Navbar />
					<router-view />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
	components: {
		Navbar,
	},
};
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

#nav {
	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
