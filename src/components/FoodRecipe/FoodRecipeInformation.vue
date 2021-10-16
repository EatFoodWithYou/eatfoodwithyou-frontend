<template>
	<div class="ml-12 mt-6">
		

		<div class=" grid justify-items-center ">
			
			<img
				class="h-60  object-cover w-3/5 rounded-lg"
				v-bind:src="this.currentFood.photo_url"
				alt="Man looking at item at a store"
			/>
			
		</div>
		<div class=" grid justify-items-center ">
		
			<div class="bg-white w-3/5 mt-4 rounded-t-lg">
				
				
				<h1 class="pt-4 ml-12 text-5xl font-extrabold">{{ this.currentFood.name }}</h1>
				<!-- <h2 class="ml-12">Food Recipe ID : {{ this.id }}</h2> -->
				<h2 class="pt-2 ml-12 text-3xl">By: {{ this.currentFood.user_name }}.</h2>
				<!-- <div v-for="(tag,index) in currentFood" :key="index"> -->
				<h2 class=" pt-2 pb-4 ml-12 text-3xl">tag: {{ this.currentFood.category_names }} ..</h2>
				<!-- </div> -->
			</div>

			<div class="bg-gray-100 w-3/5 ">
				<h1 class="pt-4 ml-12 text-3xl font-semibold pb-4">วัตถุดิบที่ใช้</h1>
				

				<div class="w-full pb-4">
					<table class=" w-full">
						<tbody >
							<tr
								v-for="(ingredient, index) in currentFood.ingredients"
								:key="index"  
							>
								
								<td class="w-1/2 pl-12 text-2xl pb-2 font-medium">{{ ingredient.name }}</td>
								<td class="w-1/4 text-center text-2xl font-medium">{{ ingredient.quantity }}</td>
								<td class="w-1/4 text-left pl-10 text-2xl font-medium">{{ ingredient.unit }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="cookingProcess bg-white w-3/5 rounded-b-lg ">
				<h1 class="pt-4 ml-12 text-3xl font-semibold pb-4">ขั้นตอนการทำ</h1>
				<div
					v-for="(process, index) in currentFood.cooking_processes"
					:key="index"
				>
					<h2 class=" ml-20 pt-4 text-2xl font-medium">{{ index + 1 }} {{ process.process }}</h2>
					<td v-if="process.photo !== null">
						<img
							class="h-60 w-full object-cover md:w-96 ml-20 pt-4 mb-4"
							v-bind:src="`http://localhost:8000/storage/cookingProcess/${process.photo}`"
						/>
					</td>
				</div>
			</div>
		
		
			<div class="bg-white w-3/5 mt-10 rounded-lg">
				<h1 class="ml-6 pt-4 text-3xl font-semibold">Comment</h1> 
				<div v-for="(comment, index) in allComment" :key="index" class="">
					<div class="bg-blue-200 mt-4 mb-4 ml-4 w-3/5 rounded-lg" >
						<div>
							<span class="ml-6 mr-6 text-2xl font-medium">
								{{ comment.user.name }}
								<button
									class="bg-blue-200 rounded-lg text-xl ml-12"
									v-if="
										comment.user_id === currentUser.user.id &&
										!test(index)
									"
									@click="editComment(index, comment.isComment)"
								>
									EDIT
								</button>
							</span>
						</div>
						<div>
							<span >
								<div v-if="!test(index)" class="ml-6 mr-6 pb-1 text-xl font-normal">
									<p class="break-all">{{ comment.isComment }}</p>
									
								</div>
								<div v-if="test(index)">
									<input
										type="text"
										placeholder=""
										v-model="textCancel"
										class="ml-6 w-3/5 mb-1 text-xl"
									/>
									
									<button
										class="mx-2 text-xl"
										@click="
											confirmEdit(textCancel, comment.id, index)
										"
									>
										confirm
									</button>
									<button @click="cancel()" class="text-xl">cancel</button>
								</div>
								
							</span>
						</div>
					</div>
				</div>
			</div>

			<div class="comment">
				Comment
				<input type="text" placeholder="แสดงความเห็น" />
			</div>
		</div>
		<div>
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

						<g id="grp7" opacity="0" transform="translate(7 6)">
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

						<g id="grp6" opacity="0" transform="translate(0 28)">
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

						<g id="grp3" opacity="0" transform="translate(52 28)">
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

						<g id="grp2" opacity="0" transform="translate(44 6)">
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

						<g id="grp5" opacity="0" transform="translate(14 50)">
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

						<g id="grp4" opacity="0" transform="translate(35 50)">
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

						<g id="grp1" opacity="0" transform="translate(24)">
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

		<!-- <div>
			HELLO WORLD
		</div> -->
	</div>
</template>

<script>
import FoodRecipeStore from "@/store/FoodRecipe";
import AuthUserStore from "@/store/AuthUser";
import FoodRecipeService from "../../services/FoodRecipe";
export default {
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
			textCancel: "",
			commentList: "",
			allComment: "",
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
			console.log("it is comment 55555", comment);
			console.log("it is id", id);
			console.log("it is index", index);
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
