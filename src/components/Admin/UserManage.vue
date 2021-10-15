<template>
	<div>
		<h1>
			ALLUSER
		</h1>
		<div>
			อิอิ
		</div>

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
	</div>
</template>

<script>
// import ShopStore from '@/store/Shop'
import AuthUser from "@/store/AuthUser";
export default {
	data() {
		return {
			allUser: [],
			id: ""
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
			
			console.log("sad",isid);
			swal({
				title: "warning",
				text: `Would you like to Ban ${name} ?`,
				icon: "warning",
				buttons: true,
				dangerMode: true
			}).then(async willRedeem => {
				if (willRedeem) {
					await swal("Successful", {
						icon: "success"
					});
					await AuthUser.dispatch("banUser", {
						id: isid,
						status: "BANNED"
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
				dangerMode: true
			}).then(async willRedeem => {
				if (willRedeem) {
					await swal("Successful", {
						icon: "success"
					});
					await AuthUser.dispatch("activeUser", {
						id: isid,
						status: "ACTIVE"
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
		}
	}
};
</script>
