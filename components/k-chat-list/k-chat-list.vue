<template>
	<view class="">

		
			<!-- //action滑块 -->
			<u-swipe-action style="mar" v-for="(item, index) in list" :index="index" :key="item._id" :show="showList[index]" @click="actionClick" @open="actionOpen(index)" :options="options">
				
					<view class="msg-wrap p-1 flex ai-center w-100">
						
			<view class="msg-left">
				<!-- 消息气泡 -->
				<view v-if="!!item.noReadNum" class="tip flex jc-center ai-center">{{item.noReadNum}}</view>
				<k-avatar mode="square" :toUserHome="item.chatType == 'user' ? true : false" :src="item.chatType == 'system.friendApply' ? '/static/chat-imgs/add-friend.png' : item.avatar "></k-avatar>
			</view>
			<view @click="to(item)" class="msg-right flex flex-column jc-between flex1">
				<view class="line-1 flex jc-between">
					<view style="width: 410upx;" class="name text-limit fs-lg weight1">{{item.userName}}</view>
					<view class="time text-icon fs-sm">
						<text>{{item.time}}</text>
					</view>
				</view>
				<view class="text-limit fs-sm line-2 pt-d5 text-icon">
					<text>{{item.data}}</text>
				</view>
			</view>
			
			</view>
			
			</u-swipe-action>
		

		

	</view>

</template>

<script>
	export default {
		props: {
			list: Array
		},
		data() {
			return {
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#e06c75'
						}
					}
				],
				
				showList: new Array(this.list.length).fill(false)
				
			};
		},
		
		methods: {
			to(item) {
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
				this.$store.dispatch('resetChatListItemNoReadNum',item._id)
				
			},
			
			actionClick(index1, index2) {
				console.log(index1, 'action', index2)
				let action = this.options[index2]
				if(action.text == '删除') {
					this.$store.state.chat.chat.delChatList(index1)
				}
				
			},
			
			actionOpen(index) {
				this.showList = this.showList.map( () => false)
				this.$set(this.showList, index, true)
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
