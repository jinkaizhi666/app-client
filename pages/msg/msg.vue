<template>
	<view>
		<!-- 导航栏 -->
		<k-nav-bar :fixed="false" :right="true">
			<view slot="left" class="top-bar-left flex ai-center">
				<text @click="toFriendList" class="iconfont icon-yonghu text-primary fs-xxxl"></text>
			</view>
			
			<view class="top-bar-center flex ai-center">
				<image src="../../static/images/logo.png" mode="widthFix"></image>
			</view>
			
			<view slot="right" class="top-bar-right flex ai-center">
				<image @click="toSearch" src="../../static/chat-imgs/search@2x.png" mode=""></image>
				<!-- <image src="../../static/chat-imgs/add group@2x.png" mode=""></image> -->
			</view>
			
		</k-nav-bar>



		<!-- 聊天列表 -->
		<view class="msg-list">
			
			<k-chat-list :list="chatList"></k-chat-list>

		</view>

	</view>
</template>

<script>
	import mock from '@/common/data.js'
	export default {
		data() {
			return {
				mock
			}
		},
		
		computed: {
			chatList() {
				return this.$store.state.chat.chatList
			}
		},
		
		methods: {
			toSearch() {
				uni.navigateTo({
					url: '/pages/msg/search-friend/search-friend'
				})
			},
			
			toFriendList() {
				uni.navigateTo({
					url: '/pages/msg/friend-list/friend-list'
				})
			},
		
			
		}
	}
</script>

<style scoped lang="scss">
	.top-bar-left {
		display: flex;

		image {
			width: 68rpx;
			height: 68rpx;
			border-radius: 16rpx;
		}
	}

	.top-bar-center {
		image {
			width: 70rpx;
		}
	}

	.top-bar-right {
		display: flex;

		image {
			width: 52rpx;
			height: 52rpx;

		}
	}



	.msg-list {
		margin-top: 10rpx;
		width: 100%;
	}
</style>
