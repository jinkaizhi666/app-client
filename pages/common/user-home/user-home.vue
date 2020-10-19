<template>
	<view class="">
		<!-- <k-navbar /> -->
		<k-nav-bar :right="true" :fixed="false" title="个人主页">
			<k-button-mini v-if="$store.state.user._id != userInfo._id && !isFriend" slot="right" @click="addFriend">加好友</k-button-mini>
		</k-nav-bar>

		<view class="flex p-1">
			<k-avatar :toUserHome="false" size="120" src=""></k-avatar>
			<view class="flex flex-column jc-around weight1 pl-1">
				<text>{{userInfo.userName}}</text>
				<text>{{userInfo.account}}</text>
			</view>
		</view>

		<k-user-info :userInfo="userInfo"></k-user-info>
		
		<text class="pl-1">TA发布的闲置物品</text>

		<k-goods-list class="mt-1" :user="false" :goodsList="goodsList"></k-goods-list>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: this.$store.state.user,
				
				userId: '',

				goodsList: [],
				
			}
		},

		onLoad(query) {
			this.userId = query.userId
			this.init()
		},
		
		computed: {
			isFriend() {
				console.log(this.$store.state.user.friendList[0].friendId._id)
				let index = this.$store.state.user.friendList.findIndex( friend => {
					return friend.friendId._id == this.userId
				})
				return index == -1 ? false : true
			}
		},
		
		methods: {
			init() {
				this.$u.api.getReleaseGoods({
					userId: this.userId ? this.userId : this.$store.state.user._id
				}).then(res => {
					this.goodsList = res
				})

				if (this.userId != this.$store.state.user._id) {
					//获取别的用户信息
					this.$u.api.searchUser({
						userId: this.userId
					}).then( res => {
						this.userInfo = res
					})
				}

			},
			
			addFriend() {
				uni.navigateTo({
					url: '/pages/msg/search-friend/add-friend/add-friend?userInfo=' + this.$encode(this.userInfo)
				})
			}
		}

	}
</script>

<style>
</style>
