<script src="AuthUser.js"></script>
<template>
	<div>
		<h2>EDIT</h2>
		<form @submit.prevent="edit">
			<div>
				<label for="name">ชื่อ : </label>
				<input type="name" v-model="form.name" placeholder="ชื่อ" />
			</div>
			<div>
				<label for="age">อายุ : </label>
				<input type="age" v-model="form.age" placeholder="อายุ" />
			</div>
			<div>
				<label for="gender">เพศ : </label>
				<select v-model="form.gender">
					<option disabled value="">เพศ</option>
					<option>MALE</option>
					<option>FEMALE</option>
				</select>
			</div>
			<div>
				<button>SubmitBUTTON</button>
			</div>
		</form>
	</div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import AuthService from "@/services/AuthService";
export default {
	data() {
		return {
			currentUser: "",
			form: {
				name: "",
				age: "",
				gender: "",
			},
		};
	},
	methods: {
		async fetchCurrentUser() {
			let res = await AuthService.fetchRecipes();
			this.currentUser = res.data;
			console.log(this.currentUser);
		},

		async edit() {
			if (
				this.form.name !== "" &&
				this.form.age !== "" &&
				this.form.gender !== ""
			) {
				let res = await AuthService.editInformation(this.form);
				console.log(this.currentUser);
				console.log(2);
				console.log(res.data);
				AuthUser.dispatch("setUser", res.data);
				this.$swal("Edit Success", " ", "success");
				this.$router.push("/userinfomation");
			} else {
				this.$swal("Edit Failed", "Fill up this form!", "error");
			}
		},
	},
	created() {
		this.fetchCurrentUser();
	},
};
</script>

<style></style>
