<template>
	<view>
		<view class="flex jc-center">
			<k-avatar size="120" :toUserHome="false" @click="changeAvatar" :src="userInfo.avatar"></k-avatar>
		</view>
		
		<k-user-info :userInfo="userInfo" :edit="edit"></k-user-info>
		
		<k-button @click="modify">{{edit ? '保存信息' : '修改信息'}}</k-button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				edit: false,
			}
		},
		
		computed: {
			userInfo() {
				return this.$store.state.user
			}
		},
		
		methods: {
			modify() {
				if(this.edit) {
					let user = {
						...this.userInfo
					}
					delete user.avatar
					delete user.token
					this.$u.api.putUser(user).then( res => {
						for(let key in user) {
							this.$store.commit('putUser', {
								key,
								val: user[key]
							})
						}
					})
				}
				this.edit = !this.edit
				
			},
			
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					success: async res => {
						let path = res.tempFilePaths[0]
						let url = await this.$uploadFiles(path)
						this.$u.api.putUser({
							avatar: url
						}).then( res => {
							this.$store.commit('putUser', {
								key: 'avatar',
								val: url
							})
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
