<template>
	<div>
		<div v-if="this.currentFood.deleted_at === null">
			<div class="flex justify-end text-xl font-medium text-gray-800 p-4">
				<!-- Food Recipe ID : {{ this.id }} -->
				<div v-show="isAuthen()" id="likeDiv">
					<input
						type="checkbox"
						id="checkbox"
						v-model="currentUserLike.status"
						@change="clickLike()"
					/>
					<label for="checkbox">
						<svg
							id="heart-svg"
							viewBox="467 392 58 57"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g
								id="Group"
								fill="none"
								fill-rule="evenodd"
								transform="translate(467 392)"
							>
								<path
									d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
									id="heart"
									fill="#707070"
								/>
								<circle
									id="main-circ"
									fill="#E2264D"
									opacity="0"
									cx="29.5"
									cy="29.5"
									r="1.5"
								/>

								<g
									id="grp7"
									opacity="0"
									transform="translate(7 6)"
								>
									<circle
										id="oval1"
										fill="#9CD8C3"
										cx="2"
										cy="6"
										r="2"
									/>
									<circle
										id="oval2"
										fill="#8CE8C3"
										cx="5"
										cy="2"
										r="2"
									/>
								</g>

								<g
									id="grp6"
									opacity="0"
									transform="translate(0 28)"
								>
									<circle
										id="oval1"
										fill="#CC8EF5"
										cx="2"
										cy="7"
										r="2"
									/>
									<circle
										id="oval2"
										fill="#91D2FA"
										cx="3"
										cy="2"
										r="2"
									/>
								</g>

								<g
									id="grp3"
									opacity="0"
									transform="translate(52 28)"
								>
									<circle
										id="oval2"
										fill="#9CD8C3"
										cx="2"
										cy="7"
										r="2"
									/>
									<circle
										id="oval1"
										fill="#8CE8C3"
										cx="4"
										cy="2"
										r="2"
									/>
								</g>

								<g
									id="grp2"
									opacity="0"
									transform="translate(44 6)"
								>
									<circle
										id="oval2"
										fill="#CC8EF5"
										cx="5"
										cy="6"
										r="2"
									/>
									<circle
										id="oval1"
										fill="#CC8EF5"
										cx="2"
										cy="2"
										r="2"
									/>
								</g>

								<g
									id="grp5"
									opacity="0"
									transform="translate(14 50)"
								>
									<circle
										id="oval1"
										fill="#91D2FA"
										cx="6"
										cy="5"
										r="2"
									/>
									<circle
										id="oval2"
										fill="#91D2FA"
										cx="2"
										cy="2"
										r="2"
									/>
								</g>

								<g
									id="grp4"
									opacity="0"
									transform="translate(35 50)"
								>
									<circle
										id="oval1"
										fill="#F48EA7"
										cx="6"
										cy="5"
										r="2"
									/>
									<circle
										id="oval2"
										fill="#F48EA7"
										cx="2"
										cy="2"
										r="2"
									/>
								</g>

								<g
									id="grp1"
									opacity="0"
									transform="translate(24)"
								>
									<circle
										id="oval1"
										fill="#9FC7FA"
										cx="2.5"
										cy="3"
										r="2"
									/>
									<circle
										id="oval2"
										fill="#9FC7FA"
										cx="7.5"
										cy="2"
										r="2"
									/>
								</g>
							</g>
						</svg>
					</label>
				</div>
				<div class="mt-4">
					{{ this.currentFood.total_like }}
				</div>
			</div>

			<div class="head" :class="isAuthen() ? '-mt-10' : '-mt-2'">
				<div class="text-center">
					<h2 class="text-6xl font-bold text-navbarColor">
						{{ this.currentFood.name }}
					</h2>
				</div>
				<div class="flex justify-center">
					<img
						v-if="this.currentFood.photo"
						class="h-96 w-full object-cover md:w-96 mt-6"
						v-bind:src="this.currentFood.photo_url"
						alt="Man looking at item at a store"
						width=""
					/>
					<img
						v-else
						class="h-96 w-full object-cover md:w-96 mt-6"
						src="https://via.placeholder.com/500x500"
						alt="Man looking at item at a store"
						width=""
					/>
				</div>
				<div class="flex justify-center mt-2">
					<h2 class="text-xl text-navbarColor">
						By : {{ this.currentFood.user_name }}
					</h2>
				</div>
				<div class="flex justify-center mt-2 text-center">
					<label class="text-xl text-navbarColor w-5/12">
						{{ this.currentFood.detail }}
					</label>
				</div>
				<div class="flex justify-center mt-2">
					<h2 class="text-xl text-navbarColor">
						Category : {{ this.currentFood.category_names }}
					</h2>
				</div>
			</div>

			<div class="mt-10">
				<div class="flex justify-center items-center space-x-2">
					<label
						class="font-normal text-lg text-navbarColor ml-40 mb-3"
						>Per/Serving
					</label>
					<input
						class="
							w-1/12
							appearance-none
							block
							bg-white
							text-gray-700 text-lg
							border
							rounded
							py-1
							px-1
							mb-3
							leading-tight
							text-center
							focus:outline-none focus:bg-white
						"
						v-model="inputServe"
						type="number"
						placeholder="Serve"
						id="ingredientQuantity"
					/>
					<button
						@click="plusPerServing()"
						class="text-xl font-semibold text-navbarColor"
					>
						<svg
							version="1.1"
							id="Layer_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							width="36px"
							height="36px"
							viewBox="10 5 36 36"
							enable-background="new 0 0 36 36"
							xml:space="preserve"
						>
							<path
								fill="#61B3C4"
								d="M 32, 0
           							h -28
         							c -2.25, 0,   -4, 1.75,   -4, 4
           							v 28
           							c 0, 2.25,   1.75, 4,   4, 4
           							h 28
           							c 2.25, 0,   4, -1.75,   4, -4
           							v -28
           							c 0, -2.25,   -1.75, -4,   -4, -4
           							z"
							/>
							<path
								fill="#FFFFFF"
								d="M 28, 20
        						   	h -8
        						   	v 8
        						 	h -4
        						   	v -8
        						   	h -8
        						   	v -4
        						   	h 8
        						   	v -8
        						   	h 4
        						   	v 8
        						   	h 8
        						   	v 4
        						   	z"
							/>
						</svg>
					</button>
					<button
						@click="minusPerServing()"
						class="text-xl font-semibold text-navbarColor"
					>
						<svg
							version="1.1"
							id="Layer_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							width="50px"
							height="50px"
							viewBox="35 5 50 50"
							enable-background="new 0 0 50 50"
							xml:space="preserve"
						>
							<path
								fill="#61B3C4"
								d="M 38.999, 7
          					   	H 11
          					   	c -2.25, 0,   -4, 1.75,   -4, 4
          					   	v 27.999
          					   	C 7, 41.249,   8.75, 43,   11, 43
          					   	h 27.999
          					   	C 41.249, 43,   43, 41.249,   43, 38.999
          					   	V 11
          					   	C 43, 8.75,   41.249, 7,   38.999, 7
          					   	z"
							/>
							<path
								fill="#FFFFFF"
								d="M 14.999,26.999
          					   	V 23
          					   	h 20.002
          					   	v 3.999
          					   	H 14.999
          					   	z"
							/>
						</svg>
					</button>
				</div>
				<div class="flex justify-center">
					<div class="w-1/3 bg-white rounded-lg shadow">
						<h1 class="text-lg text-black p-3">Ingredients</h1>
						<ul
							class="divide-y-2 divide-gray-100 border-t-2"
							v-for="(
								ingredient, index
							) in currentFood.ingredients"
							:key="index"
						>
							<li class="p-3">
								{{ ingredient.name }} -
								{{ ingredient.quantity * inputServe }}
								{{ ingredient.unit }}
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="cookingProcess flex justify-center">
				<h1 class="text-3xl font-bold text-navbarColor mt-4 pt-2 pb-6">
					Process
				</h1>
			</div>
			<div
				class="flex flex-wrap -mx-3 mb-5 justify-center"
				v-for="(process, index) in currentFood.cooking_processes"
				:key="index"
			>
				<label
					for="number"
					class="font-normal text-xl text-gray-800 py-1"
					>{{ index + 1 }}
				</label>
				<div class="px-3 md:mb-0 ml-5 bg-cover">
					<img
						v-if="process.photo"
						v-bind:src="process.photo_url"
						ref="processRef"
						width="150"
						height="150"
					/>
					<img
						v-else
						src="https://via.placeholder.com/150x150"
						ref="processRef"
						width="150"
						height="150"
					/>
				</div>
				<div class="w-3/12 px-3 md:mb-0 bg-white">
					<div class="w-full">
						<label
							class="
								appearance-none
								block
								w-full
								text-gray-700 text-xl
								rounded
								pt-3
								px-4
								mb-3
								leading-tight
							"
							placeholder="Process"
							rows="3"
							>{{ process.process }}</label
						>
					</div>
				</div>
			</div>
			<!-- <div class="flex justify-center w-full overflow-x-auto">
				<div
					class="flex flex-wrap -mx-3 mb-5 ml-40"
					v-for="(process, index) in currentFood.cooking_processes"
					:key="index"
				>
					<label
						for="number"
						class="absolute font-normal text-2xl text-gray-800 py-1"
						>{{ index + 1 }}
					</label>
					<div class="px-3 md:mb-0 ml-5 bg-cover">
						<img
							v-if="process.photo"
							v-bind:src="process.photo_url"
							ref="processRef"
							width="150"
							height="150"
						/>
						<img
							v-else
							src="https://via.placeholder.com/150x150"
							ref="processRef"
							width="150"
							height="150"
						/>
					</div>
					<div class="w-6/12 px-3 md:mb-0">
						<div class="w-full">
							<textarea
								class="
									appearance-none
									block
									w-full
									bg-white
									text-gray-700 text-xl
									border
									rounded
									py-3
									px-4
									mb-3
									leading-tight
									focus:outline-none focus:bg-white
								"
								placeholder="Process"
								rows="3"
								v-model="process.process"
							/>
						</div>
					</div>
				</div>
			</div> -->
			<div
				class="mt-10 text-2xl font-medium text-navbarColor p-4"
				id="commend"
			>
				<div class="pb-2 flex">Comment</div>
				<div
					v-for="(comment, index) in allComment"
					:key="index"
					class="bg-white text-black font-medium px-4 pt-2 text-lg"
				>
					<div>
						<span>
							{{ comment.user.name }}
							<button
								class="
									text-base
									px-2
									text-gray-400
									hover:text-gray-700
									duration-200
								"
								v-if="
									comment.user_id === currentUser.user.id &&
									!test(index)
								"
								@click="editComment(index, comment.isComment)"
								id="editCommend"
							>
								EDIT
							</button>
							<button
								class="
									text-base
									px-2
									text-red-300
									hover:text-red-500
									duration-200
								"
								v-if="
									(comment.user_id === currentUser.user.id &&
										!test(index)) ||
									currentUser.user.role === 'ADMIN'
								"
								@click="removeComment(comment.id)"
								id="deleteCommend"
							>
								DELETE
							</button>
						</span>
					</div>
					<div>
						<span>
							<div
								v-if="!test(index)"
								class="flex font-normal py-2"
								id="commendText"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 mt-0.5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 5l7 7-7 7M5 5l7 7-7 7"
									/>
								</svg>
								{{ comment.isComment }}
							</div>
							<div v-if="test(index)">
								<input
									class="bg-gray-200 w-4/12 px-4 py-2"
									type="text"
									placeholder=""
									v-model="textCancel"
									id="editCommendInput"
								/>
								<div>
									<button
										class="
											mr-3
											text-base text-blue-400
											hover:text-blue-700
											duration-200
										"
										@click="
											confirmEdit(
												textCancel,
												comment.id,
												index
											)
										"
										id="ConfrimEditCommend"
									>
										Confirm
									</button>
									<button
										@click="cancel()"
										class="
											mr-3
											text-base text-red-400
											hover:text-red-700
											duration-200
										"
									>
										Cancel
									</button>
								</div>
							</div>
						</span>
					</div>
				</div>
			</div>
			<div class="flex h-auto px-4 pb-16">
				<div class="w-1/2 bg-white p-2 rounded">
					<div class="p-3 w-full">
						<textarea
							rows="3"
							class="border p-2 rounded w-full"
							placeholder="Write a comment..."
							v-model="commentForm.comment"
							id="commendTextarea"
						></textarea>
					</div>

					<div class="flex justify-between mx-3">
						<div>
							<button
								class="
									px-4
									py-1
									bg-gray-800
									text-white
									rounded
									font-light
									hover:bg-gray-700
								"
								@click="
									postComment(
										currentUser.user.id,
										currentFood.id,
										commentForm.comment
									)
								"
								id="post"
							>
								Post
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="comment">
			Comment
			<input type="text" v-model="commentForm.comment" placeholder="แสดงความเห็น" />
			<button 
			class="bg-green-200"
			@click="
				postComment( currentUser.user.id, currentFood.id, commentForm.comment)
			">post</button>
		</div> -->
		<!-- <div>
			<input
				type="checkbox"
				id="checkbox"
				v-model="currentUserLike.status"
				@change="clickLike()"
				:disabled="!isAuthen()"
			/>
			<label for="checkbox">
				<svg
					id="heart-svg"
					viewBox="467 392 58 57"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g
						id="Group"
						fill="none"
						fill-rule="evenodd"
						transform="translate(467 392)"
					>
						<path
							d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
							id="heart"
							fill="#AAB8C2"
						/>
						<circle
							id="main-circ"
							fill="#E2264D"
							opacity="0"
							cx="29.5"
							cy="29.5"
							r="1.5"
						/>

			<div class="flex h-auto px-4 pb-16">
				<div class="w-1/2 bg-white p-2 rounded">
					<div class="p-3 w-full">
						<textarea
							rows="3"
							class="border p-2 rounded w-full"
							placeholder="Write a comment..."
						></textarea>
					</div>

					<div class="flex justify-between mx-3">
						<div>
							<button
								class="
									px-4
									py-1
									bg-gray-800
									text-white
									rounded
									font-light
									hover:bg-gray-700
								"
							>
								Post
							</button>
						</div>
					</div>
				</div>
			</div>
		</div> -->
		<div v-else class="animate-fade-in-down">
			<div class="text-center w-auto bg-white p-10 de">
				<h2 class="text-6xl font-bold text-red-500 py-16 delay-1000">
					This Recipe has been Deleted.
				</h2>
			</div>
		</div>
	</div>
</template>

<script>
import FoodRecipeStore from "@/store/FoodRecipe";
import AuthUserStore from "@/store/AuthUser";
import FoodRecipeService from "../../services/FoodRecipe";
export default {
	components: {},
	data() {
		return {
			id: "",
			currentFood: "",
			currentUser: "",
			currentUserLike: {
				status: false,
				detail: null,
			},
			likeFrom: {
				user_id: 0,
				food_recipe_id: 0,
			},
			commentForm: {
				id: "",
				comment: "",
			},
			textCancel: "",
			commentList: "",
			allComment: "",
			inputServe: 1,
		};
	},
	async created() {
		this.id = this.$route.params.id;
		// console.log(this.id);
		await this.fetchFood(this.id);
		// console.log(this.currentFood);
		this.fetchCurrentUser();
		console.log("it is current user", this.currentUser);
		this.checkCurrentUserHasLike();
		this.fetchComments(this.id);
		//   let url = `http://localhost:8000/api/recipes/10`;
		//   let res= await axios.get(url,null,{
		//       headers: {
		//           'Content-Type': "multipart/form-data"
		//       }
		//   })
		console.log("it is currentFood", this.currentFood);

		this.commentList = this.currentFood.comments;
		//   this.food = res
	},
	methods: {
		async fetchFood(id) {
			let res = await FoodRecipeStore.dispatch("fetchFood", id);
			const currentFood = FoodRecipeStore.getters.getCurrentFood;
			this.currentFood = currentFood;
			// console.log("now", this.currentFood);
			//  if(this.currentFood.photo_url !== null ){
			//      let this //localhost:8000/storage/foodRecipe/'
			//  }
		},
		checkCurrentUserHasLike() {
			// console.log(this.currentFood.likes);
			for (let item of this.currentFood.likes) {
				if (item.user_id == this.currentUser.user.id) {
					// console.log("Like");
					this.currentUserLike.status = true;
					this.currentUserLike.detail = item;
				}
			}
		},
		async fetchComments(id) {
			let res = await FoodRecipeStore.dispatch("fetchComment", id);
			this.allComment = res;
		},
		async fetchCurrentUser() {
			this.currentUser = AuthUserStore.getters.getCurrentUser;
		},
		async clickLike() {
			if (this.currentUserLike.status !== true) {
				// console.log("Dislike");
				// console.log(this.currentUserLike.detail.id);
				let res = await FoodRecipeService.deleteLike(
					this.currentUserLike.detail.id
				);
				// console.log(res);
				await this.fetchFood(this.id);
				// console.log("before",this.currentFood);
				// console.log("new like");
				// console.log(this.currentUserLike);
			} else {
				// console.log("Like");
				// console.log(this.currentUser.user.id);
				// console.log(this.currentFood.id);
				this.likeFrom.user_id = this.currentUser.user.id;
				this.likeFrom.food_recipe_id = this.currentFood.id;
				// console.log(this.likeFrom);
				let res = await FoodRecipeService.likeFoodRecipe(this.likeFrom);
				// console.log(res);
				await this.fetchFood(this.id);
				// console.log("before",this.currentFood);
				await this.checkCurrentUserHasLike();
				// console.log("new like");
				// console.log(this.currentUserLike);
			}
		},
		setCurrentUserLikeNull() {
			this.currentUserLike = {
				status: false,
				detail: null,
			};
		},
		isAuthen() {
			return AuthUserStore.getters.isAuthen;
		},
		isAdmin() {
			return AuthUserStore.getters.isAdmin;
		},

		editComment(index, comment) {
			// if(id === )
			this.commentList = index;
			this.textCancel = comment;
			// if (this.editbar=== "active") {
			// 	this.editbar = "unactive";
			// } else {
			// 	this.editbar = "active";
			// }
			// console.log("it is editbar", this.editbar);
		},
		test(index) {
			if (this.commentList === index) {
				return true;
			}
			return false;
		},
		async confirmEdit(comment, id, index) {
			// console.log("it is comment 55555", comment);
			// console.log("it is id", id);
			// console.log("it is index", index);
			let res = await FoodRecipeStore.dispatch("editComment", {
				comment,
				id,
				index,
			});
			console.log("6666", res);
			this.textCancel = "";
			this.commentList = -1;
		},
		cancel() {
			// this.textCancel = ""
			this.commentList = -1;
			// if(this.commentList === index)
			// {
			// 	return false
			// }
			// return true
		},

		async postComment(user_id, food_recipe_id, comment) {
			if (this.currentUser.user.name !== undefined) {
				let res = await FoodRecipeService.addComment(
					user_id,
					food_recipe_id,
					comment
				);
				swal("Your comment has been post!", {
					icon: "success",
				});
				this.fetchComments(this.id);
				this.commentForm.comment = "";
			} else {
				swal("Please Login", {
					icon: "error",
				});
			}
		},

		async removeComment(index) {
			swal({
				title: "Are you sure?",
				text: "Once deleted, you will not be able to recover this comment",
				icon: "warning",
				dangerMode: true,
				buttons: true,
			}).then(async (willDelete) => {
				if (willDelete) {
					let res = await FoodRecipeService.deleteComment(index);
					if (res.success) {
						swal("Your comment has been deleted!", {
							icon: "success",
						});
						this.fetchComments(this.id);
					} else {
						this.$swal("Cannot Remove Comment.", "error");
					}
				}
			});
		},

		plusPerServing() {
			this.inputServe += 1;
		},

		minusPerServing() {
			if (this.inputServe > 1) {
				this.inputServe -= 1;
			} else {
				this.$swal("Sorry", "More than 1 Serving.", "error");
			}
		},
	},
};
</script>

<style scoped lang="scss">
svg {
	cursor: pointer;
	overflow: visible;
	width: 60px;
	#heart {
		transform-origin: center;
		animation: animateHeartOut 0.3s linear forwards;
	}
	#main-circ {
		transform-origin: 29.5px 29.5px;
	}
}

#checkbox {
	display: none;
}

#checkbox:checked + label svg {
	#heart {
		transform: scale(0.2);
		fill: #e2264d;
		animation: animateHeart 0.3s linear forwards 0.25s;
	}
	#main-circ {
		transition: all 2s;
		animation: animateCircle 0.3s linear forwards;
		opacity: 1;
	}
	#grp1 {
		opacity: 1;
		transition: 0.1s all 0.3s;
		#oval1 {
			transform: scale(0) translate(0, -30px);
			transform-origin: 0 0 0;
			transition: 0.5s transform 0.3s;
		}
		#oval2 {
			transform: scale(0) translate(10px, -50px);
			transform-origin: 0 0 0;
			transition: 1.5s transform 0.3s;
		}
	}
	#grp2 {
		opacity: 1;
		transition: 0.1s all 0.3s;
		#oval1 {
			transform: scale(0) translate(30px, -15px);
			transform-origin: 0 0 0;
			transition: 0.5s transform 0.3s;
		}
		#oval2 {
			transform: scale(0) translate(60px, -15px);
			transform-origin: 0 0 0;
			transition: 1.5s transform 0.3s;
		}
	}
	#grp3 {
		opacity: 1;
		transition: 0.1s all 0.3s;
		#oval1 {
			transform: scale(0) translate(30px, 0px);
			transform-origin: 0 0 0;
			transition: 0.5s transform 0.3s;
		}
		#oval2 {
			transform: scale(0) translate(60px, 10px);
			transform-origin: 0 0 0;
			transition: 1.5s transform 0.3s;
		}
	}
	#grp4 {
		opacity: 1;
		transition: 0.1s all 0.3s;
		#oval1 {
			transform: scale(0) translate(30px, 15px);
			transform-origin: 0 0 0;
			transition: 0.5s transform 0.3s;
		}
		#oval2 {
			transform: scale(0) translate(40px, 50px);
			transform-origin: 0 0 0;
			transition: 1.5s transform 0.3s;
		}
	}
	#grp5 {
		opacity: 1;
		transition: 0.1s all 0.3s;
		#oval1 {
			transform: scale(0) translate(-10px, 20px);
			transform-origin: 0 0 0;
			transition: 0.5s transform 0.3s;
		}
		#oval2 {
			transform: scale(0) translate(-60px, 30px);
			transform-origin: 0 0 0;
			transition: 1.5s transform 0.3s;
		}
	}
	#grp6 {
		opacity: 1;
		transition: 0.1s all 0.3s;
		#oval1 {
			transform: scale(0) translate(-30px, 0px);
			transform-origin: 0 0 0;
			transition: 0.5s transform 0.3s;
		}
		#oval2 {
			transform: scale(0) translate(-60px, -5px);
			transform-origin: 0 0 0;
			transition: 1.5s transform 0.3s;
		}
	}
	#grp7 {
		opacity: 1;
		transition: 0.1s all 0.3s;
		#oval1 {
			transform: scale(0) translate(-30px, -15px);
			transform-origin: 0 0 0;
			transition: 0.5s transform 0.3s;
		}
		#oval2 {
			transform: scale(0) translate(-55px, -30px);
			transform-origin: 0 0 0;
			transition: 1.5s transform 0.3s;
		}
	}
	#grp2 {
		opacity: 1;
		transition: 0.1s opacity 0.3s;
	}
	#grp3 {
		opacity: 1;
		transition: 0.1s opacity 0.3s;
	}
	#grp4 {
		opacity: 1;
		transition: 0.1s opacity 0.3s;
	}
	#grp5 {
		opacity: 1;
		transition: 0.1s opacity 0.3s;
	}
	#grp6 {
		opacity: 1;
		transition: 0.1s opacity 0.3s;
	}
	#grp7 {
		opacity: 1;
		transition: 0.1s opacity 0.3s;
	}
}

@keyframes animateCircle {
	40% {
		transform: scale(10);
		opacity: 1;
		fill: #dd4688;
	}
	55% {
		transform: scale(11);
		opacity: 1;
		fill: #d46abf;
	}
	65% {
		transform: scale(12);
		opacity: 1;
		fill: #cc8ef5;
	}
	75% {
		transform: scale(13);
		opacity: 1;
		fill: transparent;
		stroke: #cc8ef5;
		stroke-width: 0.5;
	}
	85% {
		transform: scale(17);
		opacity: 1;
		fill: transparent;
		stroke: #cc8ef5;
		stroke-width: 0.2;
	}
	95% {
		transform: scale(18);
		opacity: 1;
		fill: transparent;
		stroke: #cc8ef5;
		stroke-width: 0.1;
	}
	100% {
		transform: scale(19);
		opacity: 1;
		fill: transparent;
		stroke: #cc8ef5;
		stroke-width: 0;
	}
}

@keyframes animateHeart {
	0% {
		transform: scale(0.2);
	}
	40% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes animateHeartOut {
	0% {
		transform: scale(1.4);
	}
	100% {
		transform: scale(1);
	}
}
</style>
