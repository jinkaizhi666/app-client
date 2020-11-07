<template>
	<view class="">
							<view  v-for="(item, index) in list" :key="item._id" class="msg-wrap p-1 flex ai-center w-100">
							<!-- <view v-if="item.type == 'friendApply' " class="">
								
							</view>	 -->	
							<view class="msg-left">
								<!-- 消息气泡 -->
								<view v-if="!!item.noReadNum" class="tip flex jc-center ai-center">{{item.noReadNum}}</view>
								<k-avatar mode="square" :toUserHome="item.chatType == 'user' ? true : false" :src="item.chatType == 'system.friendApply' ? '/static/chat-imgs/add-friend.png' : item.avatar "></k-avatar>
							</view>
							<view @click="to(item, index)" class="msg-right flex flex-column jc-between flex1">
								<view class="line-1 flex jc-between">
									<view style="width: 410upx;" class="name text-limit fs-lg weight1">{{item.userName}}</view>
									<view class="time text-icon fs-sm">
										<text>{{item.time}}</text>
									</view>
								</view>
								<view class="text-limit flex ai-center fs-sm line-2 pt-d5 text-icon">
									<view style="width: 550upx;" class="text-limit">{{item.data}}</view>
									<text style="font-size: 50upx;" @click.stop="actionShow(index)">...</text>
								</view>
							</view>
							
							</view>
							<u-action-sheet @click="actionClick" v-model="show" :list="[{text: '删除'}]"></u-action-sheet>
							
	</view>

</template>

<script>
	import uniSwiperAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwiperItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		components: {
			uniSwiperAction,
			uniSwiperItem
		},
		props: {
			list: Array
		},
		data() {
			return {
				show: false,
				actionIndex: -1
			};
		},
		
		methods: {
			to(item, index) {
				switch (item.chatType) {
					case 'system.friendApply' :
						uni.navigateTo({
							url: '/pages/msg/friend-apply/friend-apply'
						})
					break
					
					case 'user' :
					uni.navigateTo({
						url: '/pages/common/chat-room/chat-room'
					})
					this.$store.commit('startChat', item._id)
					break
					
				}
				this.$store.dispatch('resetChatListItemNoReadNum',item._id, index)
				
			},
			
			actionClick(index) {
				if(index === 0) {
					this.$store.state.chat.chat.delChatList(this.actionIndex)
				}
			},
		
			actionShow(index) {
				this.actionIndex = index
				this.show = true
			}
			
		},
		
	}
</script>

<style scoped lang="scss">
	.msg-wrap {
		height: 120rpx;

		.msg-left {
			position: relative;

			.tip {
				font-size: 22rpx;
				position: absolute;
				right: -6rpx;
				top: -6rpx;
				background-color: $uni-color-error;
				color: white;
				height: 36rpx;
				min-width: 36rpx;
				z-index: 10;
				border-radius: $uni-border-radius-circle;

			}

			// image {
			// 	border-radius: $uni-border-radius-base;
			// 	width: 96rpx;
			// 	height: 96rpx;
			// }
		}
		
	}
</style>
