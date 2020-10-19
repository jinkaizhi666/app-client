<template>
	<view class="p-1">
		<!-- 用户信息 -->
		<view class="flex ai-center">
			<k-avatar @click="openUserInfo" :src="goodsInfo.sellerId.avatar"></k-avatar>
			<text class="pl-1 weight2">{{goodsInfo.sellerId.userName}}</text>
		</view>
		
		<text class="pt-1">{{goodsInfo.title}}</text>
		
		<!-- 产品价格信息 -->
		<view class="mt-1">
			<view class="text-error py-d5">
				<text class="text-error iconfont icon-jiage"></text>
				<text>{{goodsInfo.price}}</text>
			</view>
			<text class="my-3">{{goodsInfo.type.name}}</text>
		</view>
		
		<!-- 产品标签 -->
		<view class="flex mt-1 flex-wrap">
			<u-tag mode="dark" type="primary" class="mr-d5 mb-d5" v-for="(item, index) in goodsInfo.tags" :text="item"></u-tag>
		</view>
		
		<view class="my-1 pr-1">
			<text class="">{{goodsInfo.desc}}</text>
		</view>
	
		
		<!-- 产品详情图 -->
		
		<image :src="item" v-for="(item, index) in goodsInfo.imgs" :key="index" mode="widthFix" style="width: 720upx;"></image>
		
		<!-- 底部栏 -->
		<k-bottom @buy="buy" @fav="fav" @openChat="openChat" :isFav="isFav"></k-bottom>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: {},
				
				isFav: false
			}
		},
		methods: {
			openUserInfo() {
				uni.navigateTo({
					url: '/pages/common/user-home/user-home'
				})
			},
			
			openChat() {
				uni.navigateTo({
					url: '/pages/common/chat-room/chat-room?type=goods&params=' + this.$encode({
						goodsImg: this.goodsInfo.imgs[0],
						title: this.goodsInfo.title,
						price: this.goodsInfo.price,
						seller: {
							avatar: this.goodsInfo.sellerId.avatar,
							_id: this.goodsInfo.sellerId._id,
							userName: this.goodsInfo.sellerId.userName
						}
					})
				})
				this.$store.commit('startChat', this.goodsInfo.sellerId)
				
			},
			
			fav() {
				if(this.isFav) { //取消收藏
					this.$u.api.deleteFav({
						favId: this.goodsInfo._id,
						type: 'goods',
					}).then( () => {
						this.isFav = false
					})
				} else { //收藏
					this.$u.api.fav({
						favId: this.goodsInfo._id,
						type: 'goods',
					}).then( () => {
						this.isFav = true
					})
				}
				
			},
			
			buy() {
				
			}
			
		},
		
		onLoad(query) {
			uni.setNavigationBarTitle({
				title: '物品详情'
			})
			this.goodsInfo = JSON.parse(decodeURIComponent(query.goodsInfo))
			// 是否收藏
			this.$u.api.isFav({
				type: 'goods',
				favId: this.goodsInfo._id
			}).then( res => {
				this.isFav = res.result
			})
		}
	}
</script>

<style>

</style>
