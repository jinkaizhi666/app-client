<template>
	<view style="position: fixed; bottom: 0; left: 0; width: 750upx; height: 100upx; overflow: hidden;" class="flex ai-center px-1 row-reserve bg-white">
		<k-button-mini @click="$emit('openChat')" class="m-1">{{type == 'goods' ? '我想要' : '咨询'}}</k-button-mini>
		<k-button-mini @click="$emit('buy')" type="error" class="mr-1">{{type == 'goods' ? '立即购买' : '报名'}}</k-button-mini>
		<view class="ml-0 flex1 flex ai-center">
			<text class="iconfont icon-shoucang fs-xxxl" :class="[ isFav ? 'text-error' : 'text-icon']"></text>
			<k-button-mini @click="$emit('fav')" type="primary" class="m-1">{{isFav ? '取消收藏' : '点击收藏'}}</k-button-mini>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			isFav: Boolean,
			
			type: {
				type: String,
				default: 'goods'
			}
		}
		
	}
</script>

<style>

</style>
