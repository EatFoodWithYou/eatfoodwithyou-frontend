<script src="AuthUser.js"></script>
<template>
	<div class="bg-editInfo bg-no-repeat font-prompt">
		<div>
			<div>
				<div class="text-center pt-16">
					<h2 class="text-6xl font-bold text-white">Edit</h2>
				</div>
				<div class="flex justify-center">
					<form @submit.prevent="edit" class="w-1/4 max-w-4xl">
						<div class="flex flex-wrap -mx-3 mb-5 mt-4">
							<div class="w-full px-3 md:mb-0">
								<label
									class="
										block
										tracking-wide
										text-white text-xl
										font-base
										mb-2
									"
								>
									Name
								</label>
								<input
									class="
										appearance-none
										block
										w-full
										bg-gray-200
										text-gray-900 text-xl
										border
										rounded
										py-3
										px-4
										mb-3
										leading-tight
										focus:outline-none focus:bg-white
									"
									type="text"
									v-model="form.name"
								/>
							</div>
							<div class="w-full md:w-2/4 px-3 md:mb-0">
								<label
									class="
										block
										uppercase
										tracking-wide
										text-white text-xl
										font-base
										mb-2
									"
								>
									Age
								</label>
								<input
									class="
										appearance-none
										block
										w-full
										bg-gray-200
										text-gray-900 text-xl
										border
										rounded
										py-3
										px-4
										mb-3
										leading-tight
										focus:outline-none focus:bg-white
									"
									type="number"
									v-model="form.age"
								/>
							</div>

							<div
								class="
									w-full
									md:w-2/4
									px-3
									md:mb-0
									justify-center
								"
							>
								<label
									class="
										block
										tracking-wide
										text-white text-xl
										font-base
										mb-2
									"
								>
									Gender
								</label>
								<div class="relative">
									<select
										class="
											block
											appearance-none
											w-full
											bg-gray-200
											border border-gray-200
											text-gray-900 text-xl
											py-3
											px-4
											pr-8
											rounded
											leading-tight
											focus:outline-none
											focus:bg-white
											focus:border-gray-500
										"
										v-model="form.gender"
									>
										<option>MALE</option>
										<option>FEMALE</option>
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
											text-white
										"
									>
										<svg
											class="
												fill-current
												h-4
												w-4
												text-black
											"
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
						</div>
					</form>
				</div>
				<div class="py-3 text-center text-black">
					<button
						@click="edit()"
						class="
							font-normal
							text-2xl
							p-2
							w-44
							rounded-full
							border-2 border-white
							text-white
							hover:bg-gray-100 hover:text-black
							transition
							duration-250
						"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
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
			console.log("USERID", this.currentUser.id);
			this.form.name = this.currentUser.name;
			this.form.age = this.currentUser.age;
			this.form.gender = this.currentUser.gender;
		},

		async edit() {
			if (
				this.form.name !== "" &&
				this.form.age !== "" &&
				this.form.gender !== ""
			) {
				let res = await AuthService.editInformation(
					this.form,
					this.currentUser.id
				);
				console.log(this.currentUser);
				console.log(2);
				console.log(res.data);
				AuthUser.dispatch("setUser", res.data);
				this.$swal("Edit Success", " ", "success");
				this.$router.push("/user-information");
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
