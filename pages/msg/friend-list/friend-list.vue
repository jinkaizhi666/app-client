<template>
	<view class="p-1">
		<view v-for="(item, index) in friendList" :key="index" class="flex ai-center border-bottom">
			<k-avatar :src="item.friendId.avatar" :userId="item.friendId._id"></k-avatar>
			<text @click="chat(item)" class="flex1 ml-1 py-1 text-limit fs-xl ">{{item.friendId.userName}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		
		computed: {
			friendList() {
				return this.$store.state.chat.friendList
			}
		},
		
		onLoad() {
			// this.init()
		},
		
		methods: {
			chat(item) {
				console.log('_id', item)
				this.$store.commit('startChat', item.friendId)
				uni.navigateTo({
					url: '/pages/common/chat-room/chat-room'
				})
			}
			
		}
	}
</script>

<style>

</style>
