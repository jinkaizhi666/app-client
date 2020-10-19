<template>
	<view >
		<!-- #ifdef APP-VUE -->
			<view class="" style="height: 40px;">
				
			</view>
		<!-- #endif -->
		<!-- 头像 -->
		<view class="flex p-1" >
			<k-avatar :src="$store.state.user.avatar" />
			<view class="flex weight2 pl-1 flex-column  jc-between">
				<view class="">
					{{$store.state.user.userName}}
				</view>
				<view class="">
					{{$store.state.user.account}}
				</view>
			</view>
		</view>
		
		<view class="flex flex-wrap bg-white shadow round1" style="width: 670upx; height: 140upx; margin: 0 auto;">
			<view v-for="(item, index) in cardMenu" :key="index" @click="action(item)" class="flex flex-column m-1 jc-between ai-center " style="width: 94upx; height: 100upx;">
				<view style="width: 94upx; height: 80upx;" class="flex ai-center jc-center">
					<image style="width: 60upx;" :src="item.src" mode="widthFix"></image>
				</view>
				<text class="fs-sm">{{item.title}}</text>
			</view>
		</view>
		
		<u-cell-group class="mt-2">
				<u-cell-item @click="feedback" icon="question-circle-fil" title="问题反馈"></u-cell-item>
				<u-cell-item @click="setting" icon="setting-fil" title="个人信息设置"></u-cell-item>
			</u-cell-group>
			
			<k-button @click="logout" color="red">退出登录</k-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardMenu: [
					{
						src: '/static/images/goumaiguode.png',
						title: '我购买的',
						to: '/pages/home/buy-history'
					},
					{
						src: '/static/images/jian-zhi-ji-lu.png',
						title: '兼职记录',
						to: '/pages/home/job-history/job-history'
					},
					
					{
						src: '/static/images/shou-cang.png',
						title: '收藏',
						to: '/pages/home/fav/fav'
					},
					{
						src: '/static/images/wo-de-fa-bu.png',
						title: '我的发布',
						to: '/pages/home/my-release/my-release'
					}
				]
			}
		},
		methods: {
			action(item) {
				switch (item.title) {
					case '我的发布' :
					uni.showActionSheet({
						itemList: ['闲置物品', '兼职工作'],
						success(res) {
							if(res.tapIndex == 0) {
								uni.navigateTo({
									url: '/pages/home/goods-release/goods-release'
								})
							}else if(res.tapIndex == 1) {
								uni.navigateTo({
									url: '/pages/home/job-release/job-release'
								})
							}
						}
					})
					break
					default :
					uni.navigateTo({
						url: item.to
					})
				}
			},
			
			logout() {
				uni.showModal({
					content: '确认要退出登录吗?',
					success(res) {
						if(res.confirm) {
							uni.removeStorage({
								key: 'token'
							})
							uni.removeStorage({
								key: 'user'
							})
							uni.reLaunch({
								url: '/pages/login-register/index'
							})
						}
					}
				})
				
			},
			
			feedback() {
				
			},
			
			setting() {
				uni.navigateTo({
					url: '/pages/home/person-info-setting/person-info-setting'
				})
			}
			
			
			
		},
		
		onLoad() {
			console.log(this.$user)
		}
	}
</script>

<style>

</style>
