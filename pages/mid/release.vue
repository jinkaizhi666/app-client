<template>
	<view style="overflow: hidden;">
		
			<k-nav-bar iconColor="white" >
			
			</k-nav-bar>
		<!-- logo -->
		<view class="bg-white round2 flex jc-center ai-center" style="width: 680upx; height: 460upx; margin: 300upx auto 0 auto;">
			<image src="/static/images/logo.png" style="width: 360upx;" mode="widthFix"></image>
		</view>
		
		<!-- 遮罩层 -->
		<view class="" style="position: fixed; left: 0; top: 0; right: 0; bottom: 0; background-color: rgba(0,0,0, .3);">
			
		</view>
		
		<!-- 功能栏 -->
		<view class="flex round2 ai-center bg-white p-2" style="width: 730upx; position: fixed; bottom: 120upx; left: 10upx;">
			<view @click="action(item)" style="width: 140upx;" v-for="(item, index) in menus" :key="index" class="flex flex-column ai-center">
				<text :style="{color: item.color}" style="font-size: 80upx;" :class="item.icon"></text>
				<text>{{item.title}}</text>
			</view>
		</view>
		
	</view> 
</template>

<script>
	export default {
		data() {
			return {
				menus: [
					{
						icon: 'iconfont icon-jianzhi1',
						title: '发布兼职',
						to: "/pages/mid/release-job/release-job",
						color: '#ffd017'
					},
					{
						icon: 'iconfont icon-t-wwodeaixinjishi-wodexianzhiwupin',
						title: '闲置物品',
						to:  "/pages/mid/release-goods/release-goods",
						color: '#f37676'
					}
				]
			}
		},
		methods: {
			action(item) {
				uni.navigateTo({
					url: item.to
				})
			}
		},
		
		onLoad() {
			uni.showTabBar()
		}
	}
</script>

<style>

</style>
