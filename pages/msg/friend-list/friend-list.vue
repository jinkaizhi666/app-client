<template>
	<view class="p-1">
		<view v-for="(item, index) in friendList" :key="index" class="flex ai-center border-bottom">
			<k-avatar :src="item.friendId.avatar" :userId="item.friendId._id"></k-avatar>
			<view class="flex flex-column">
				<text @click="chat(item)" class="flex1 ml-1 py-1 text-limit fs-xl ">{{item.friendId.userName}}</text>
				<view style="width: 600upx;" class="flex jc-end ">
							<view  @click="clickAction(index)"  style="width: 60upx; height: 60upx;"  class="iconfont icon-gengduo weight1 fs-xxxl"></view>
				</view>
		
			</view>
		</view>
		
		<u-action-sheet @click="action" v-model="actionShow" :list="[{text: '删除好友'}]"></u-action-sheet>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				actionShow: false,
				actionIndex: -1
			}
		},
		
		computed: {
			...mapState({
				friendList: state => state.chat.friendList
			})
		},
		
		methods: {
			chat(item) {
				console.log('_id', item)
				this.$store.commit('startChat', item.friendId)
				uni.navigateTo({
					url: '/pages/common/chat-room/chat-room'
				})
			},
			
			clickAction(index) {
				this.actionIndex = index
				this.actionShow = true
			},
			
			action(index) {
				if(index == 0) {
					let friendId = this.friendList[this.actionIndex].friendId._id
					this.$u.api.delFriend({
						friendId
					}).then( () => {
						this.$store.commit('delFriend', index)
					})
				}
			}
			
		}
	}
</script>

<style>

</style>
