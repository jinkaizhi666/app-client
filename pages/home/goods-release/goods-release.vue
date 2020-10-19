<template>
	<view>
		
		<k-goods-fav :release="true" :favList="list"></k-goods-fav>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		
		onLoad() {
			this.$u.api.getReleaseGoods({
				userId: this.$store.state.user._id
			}).then( res => {
				this.list = res
			})
			
			uni.$on('modifyGoodsInfo', (goodsInfo) => {
				let index = this.list.findIndex( item => item._id == goodsInfo._id)
				this.$set(this.list, index, goodsInfo)
			})
			
		},
		
		onUnload() {
			uni.$off('modifyGoodsInfo')
		},
		
		methods: {
			
		}
	}
</script>

<style>

</style>
