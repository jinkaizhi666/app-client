<template>
	<view>
		
		<view v-for="(item, index) in favList" :key="index" class="flex round1 bg-white shadow p-1 mt-1 w-100">
			<image @click="toGoodsDetail(index)" style="width: 240upx; height: 260upx;" :src="item.imgs[0]" mode="widthFix"></image>
			<view class="flex jc-between  pl-1 flex-column" style="width: 500upx;">
				<text class="text-limit">{{item.title}}</text>
				<k-price :price="item.price" />
					<view class="flex ai-center"     style=" width: 480upx;" >
						<k-avatar size="70" :src="item.sellerId.avatar"></k-avatar>
						<text class="flex1 pl-1">{{item.sellerId.userName}}</text>
							<text @click="showAction(index)" style="font-size: 50upx; "  class="iconfont  icon-gengduo weight3 "></text>
					</view>
			</view>
		</view>
		
		<u-action-sheet @click="action" v-model="sheetShow" :list="actions"></u-action-sheet>
		
	</view>
</template>

<script>
	export default {
		props: {
			favList: Array,
			release: {
				type: Boolean,
				default: true
			}
		},
		
		data() {
			return {
				sheetShow: false,
				actions: [
					{
						text: '删除'
					}
				],
				actionIndex: 0
				
			};
		},
		
		created() {
			if(this.release) {
				this.actions.unshift({
						text: '修改信息'
					})
			}
			
			
		},
		
		methods: {
			toGoodsDetail(index) {
				let goodsInfo = this.favList[index]
				
				uni.navigateTo({
					url: '/pages/index/goods-detail/goods-detail?goodsInfo=' + this.$encode(goodsInfo)
				})
			},
			
			showAction(index) {
				this.sheetShow = true
				this.actionIndex = index
			},
			
			action(index) {
				let info = this.actions[index]
				console.log(info)
				
				switch (info.text) {
					case '删除' :
						let goodsInfo = this.favList[this.actionIndex]
						this.$u.api.deleteFav({
							favId: goodsInfo._id,
							type: 'goods',
						}).then( () => {
							// this.favList.splice(index, 1)
							// this.$destroy()
							console.log('destroy', this.$emit)
							this.$emit('delFav', {
								type: 'goods',
								index: this.actionIndex
							})
						})
					break
					
					case '修改信息' :
						let modifyGoodsInfo = this.favList[this.actionIndex]
						uni.navigateTo({
							url: '/pages/mid/release-goods/release-goods?flag=modifyGoodsInfo&goodsInfo=' + this.$encode(modifyGoodsInfo)
						})
					break
				}
				
					
			}
			
		}
	}
</script>

<style>

</style>
