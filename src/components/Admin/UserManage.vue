<template>
	<div class="bg-gray-200 font-prompt">
		<div>
			<div>
				<div class="text-center py-10 pt-16">
					<h2 class="text-6xl font-bold text-gray-800">All Users</h2>
				</div>
				<div class="flex justify-center">
					<div class="w-full max-w-6xl pb-16">
						<div class="block w-full overflow-x-hidden">
							<table
								class="
									mt-6
									items-center
									bg-transparent
									w-full
									border-collapse
									cursor
									bg-white
								"
							>
								<thead>
									<tr>
										<th
											class="
												px-6
												bg-blueGray-50
												text-black
												align-middle
												border-b
												border-solid
												border-blueGray-100
												py-3
												text-base
												uppercase
												whitespace-nowrap
												font-medium
												text-center
											"
										>
											No.
										</th>
										<th
											class="
												px-6
												bg-blueGray-50
												text-black
												align-middle
												border-b
												border-solid
												border-blueGray-100
												py-3
												text-base
												uppercase
												whitespace-nowrap
												font-medium
												text-center
											"
										>
											Name
										</th>
										<th
											class="
												px-6
												bg-blueGray-50
												text-black
												align-middle
												border-b
												border-r-2
												border-solid
												border-blueGray-100
												py-3
												text-base
												uppercase
												whitespace-nowrap
												font-medium
												text-center
											"
										>
											Status
										</th>

										<th
											class="
												px-6
												bg-blueGray-50
												align-middle
												text-transparent
												border-b
												border-solid
												border-blueGray-100
												py-3
												text-base
												uppercase
												whitespace-nowrap
												font-medium
												text-center
											"
										>
											Manage
										</th>
									</tr>
								</thead>

								<tbody>
									<tr v-for="user in allUser" :key="user.id">
										<td
											class="
												text-center
												px-6
												align-middle
												border-l-0 border-r-2
												text-base
												whitespace-nowrap
												p-4
											"
										>
											{{ user.id }}
										</td>
										<td
											class="
												px-6
												border-l-0 border-r-2
												text-base
												whitespace-nowrap
											"
										>
											{{ user.name }}
										</td>
										<td
											class="
												px-6
												border-l-0 border-r-2
												text-base
												whitespace-nowrap
												text-center
											"
											:class="
												user.status === 'ACTIVE'
													? 'text-green-500'
													: 'text-red-500'
											"
										>
											{{ user.status }}
										</td>
										<td
											class="
												px-6
												border-l-0 border-r-2
												text-base
												whitespace-nowrap
											"
										>
											<div
												class="
													flex
													justify-center
													cursor-pointer
													text-red-500
													hover:text-red-400
													duration-100
												"
												@click="
													banUser(user.id, user.name)
												"
												v-if="user.status === 'ACTIVE'"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
													/>
												</svg>
											</div>
											<div
												class="
													flex
													justify-center
													cursor-pointer
													text-green-500
													hover:text-green-400
													duration-100
													text-center
												"
												@click="
													activeUser(
														user.id,
														user.name
													)
												"
												v-if="user.status === 'BANNED'"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- <div>
		<h1>ALLUSER</h1>
		<div>อิอิ</div>

		<div class="conteiner">
			<table class="bg-indigo-400 text-white">
				<thead class="bg-dark text-white">
					<tr>
						<th colspan="6">ALLUSER</th>
					</tr>
					<tr>
						<th>No.</th>
						<th>Name</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody class="box">
					<tr v-for="user in allUser" :key="user.id">
						<td>{{ user.id }}</td>
						<td>{{ user.name }}</td>
						<td>{{ user.status }}</td>
						<button
							class="ml-2 bg-red-800"
							@click="banUser(user.id, user.name)"
							v-if="user.status === 'ACTIVE'"
						>
							BAN
						</button>
						<button
							class="ml-2 bg-green-500"
							@click="activeUser(user.id, user.name)"
							v-if="user.status === 'BANNED'"
						>
							ACTIVE
						</button>
					</tr>
				</tbody>
			</table>
		</div>
	</div> -->
</template>

<script>
// import ShopStore from '@/store/Shop'
import AuthUser from "@/store/AuthUser";
export default {
	data() {
		return {
			allUser: [],
			id: "",
		};
	},
	async created() {
		this.fetchAllUser();
		// if (!this.isAuthen()) {
		//   this.$swal("Please Login before using this feature", "warning");
		//   this.$router.push("/");
		// }
		// else if (!this.isAdmin())
		// {
		//   this.$swal("You not Admin", "warning");
		//   this.$router.push("/");
		// }
	},
	methods: {
		async fetchAllUser() {
			let res = await AuthUser.dispatch("fetchAllUser");
			this.allUser = res;

			//   console.log(456);
			//   console.log(this.allUser);
		},

		async banUser(isid, name) {
			// this.$router.push(`/admin/foodrecipes/${id}`);

			console.log("sad", isid);
			swal({
				title: "warning",
				text: `Would you like to Ban ${name} ?`,
				icon: "warning",
				buttons: true,
				dangerMode: true,
			}).then(async (willRedeem) => {
				if (willRedeem) {
					await swal("Successful", {
						icon: "success",
					});
					await AuthUser.dispatch("banUser", {
						id: isid,
						status: "BANNED",
					});
					await this.fetchAllUser();
				} else {
					swal("Canceled");
				}
			});
		},

		async activeUser(isid, name) {
			// this.$router.push(`/admin/foodrecipes/${id}`);
			console.log("2");
			console.log(isid);

			swal({
				title: "warning",
				text: `Would you like to Active ${name} ?`,
				icon: "warning",
				buttons: true,
				dangerMode: true,
			}).then(async (willRedeem) => {
				if (willRedeem) {
					await swal("Successful", {
						icon: "success",
					});
					await AuthUser.dispatch("activeUser", {
						id: isid,
						status: "ACTIVE",
					});
					await this.fetchAllUser();
				} else {
					swal("Canceled");
				}
			});
		},

		isAuthen() {
			return AuthUser.getters.isAuthen;
		},
		isAdmin() {
			return AuthUser.getters.isAdmin;
		},
	},
};
</script>
