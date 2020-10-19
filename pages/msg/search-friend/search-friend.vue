<template>
	<view>
		<k-nav-bar :fixed="false">
			<u-search @search="searchUser" placeholder="请输入昵称或账号" v-model="keyword"></u-search>
		</k-nav-bar>
		
		<view class="px-1">
			<text class="fs-xl weight1">用户</text>
			<view v-for="(item, index) in userResult" :key="index" class="flex my-1 ai-center jc-between">
				<k-avatar :userId="item._id" :src="item.avatar"></k-avatar>
				<view class="flex1 flex flex-column pl-1 ">
					<view class="weight1 pb-d5">
						<text class="text-primary2">{{item.keyword}}</text>
						{{item.userName}}
					</view>
					<view class="fs-sm text-icon">
						<text class="text-primary2">{{item.keyword}}</text>
						{{item.account}}
					</view>
				</view>
				
				<k-button-mini @click="action(index)">加好友</k-button-mini>
				
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				list: [
					{}
				],
				userList: [],
				userResult: []
			}
		},
		
		computed: {
			
		},
		
		methods: {
			action(index) {
				let userInfo = this.userList[index]
				uni.navigateTo({
					url: '/pages/msg/search-friend/add-friend/add-friend?userInfo=' + this.$encode(userInfo)
				})
			},
			
			searchUser() {
				this.$u.api.searchUser({
					keyword: this.keyword.trim()
				}).then( res => {
					this.userList = res
						  let list = this.$u.deepClone(this.userList)
						  this.userResult = list.map( item => {
							  return {
								  avatar: item.avatar,
								  userName: item.userName.replace(this.keyword, ''),
								  account: item.account.replace(this.keyword, ''),
								  keyword: this.keyword,
								  _id: item._id
							  }
						  })
						  
					
				})
			}
			
		}
	}
</script>

<style>

</style>
