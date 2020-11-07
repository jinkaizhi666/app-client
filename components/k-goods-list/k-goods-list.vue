<template>
	<!-- 产品列表 -->
	<view class="flex jc-around flex-wrap" >
		<view @click="openGoodsDetail(index)" :key="index" v-for="(item, index) in goodsList" class="flex flex-column pl-1 bg-white mb-d5 round1">
			<image style="width: 350upx; height: 340upx;" :src="item.imgs[0]" mode=""></image>
			<text class="weight2 py-1 fs-sm text-ellipsis" style="width: 320upx;">{{item.title}}</text>
			<text class="weight2 text-error">
				<text class="iconfont icon-jiage fs-lg "></text> {{item.price}}
			</text>
			<view v-if=" user" class="pt-1 flex ai-center">
				<k-avatar :userId="item.sellerId._id" :src="$get(item, 'sellerId.avatar')" size="60"></k-avatar>
				<text class="fs-sm text-font2 pl-1 text-ellipsis" style="width: 200upx;">{{item.sellerId.userName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsList: Array,
			
			user: {
				type: Boolean,
				default: true
			}
		},
		
		data() {
			return {
				
			};
		},
		
		methods: {
			openGoodsDetail(index) {
				let goods = this.goodsList[index]
				uni.navigateTo({
					url: '/pages/index/goods-detail/goods-detail?goodsInfo=' + encodeURIComponent(JSON.stringify(goods))
				})  
			}
		}
		
	}
</script>

<style>

</style>
