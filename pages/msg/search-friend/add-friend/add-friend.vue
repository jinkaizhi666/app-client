<template>
	<view style="position: relative;">
		<k-nav-bar></k-nav-bar>
		
		<image style="width: 750rpx; filter: blur(16px); opacity: 0.6;" src="../../../../static/images/avatar.jpg" mode="widthFix"></image>
		
	<k-avatar  size="400" class="avatar circle"></k-avatar>
		
		<view class="flex flex-column ai-center fs-xl weight1">
			<text>{{userInfo.userName}}</text>
			<text>{{userInfo.account}}</text>
			<text class="fs-md">{{userInfo.desc}}</text>
		</view>
		
		<view class="add-btn w-100 flex jc-center">
			<k-button @click="addFriend">添加好友</k-button>
		</view>
		
		<view class="card" :animation="cardAnimation" :style="height">
			<view class="name">{{userInfo.userName}}</view>
			<textarea v-model="authMsg" placeholder="验证消息..." class="auth"></textarea>
			<view class="flex jc-between bottom-btn" :animation="addBtnAnimation">
				<k-button type="default" style="width: 200rpx;" @click="addFriend">取消</k-button>
				<k-button type="primary" style="width: 400rpx;" class="ml-2" @click="sendFriendApply">发送</k-button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardAnimation: {},
				addBtnAnimation: {},
				isClickAdd: false,
				cardHeight: 0,
				userInfo: {},
				authMsg: ''
			}
		},
		methods: {
			addFriend() {
				this.isClickAdd = !this.isClickAdd
				let cardAnimation = uni.createAnimation({
					duration:300
				})
				let addBtnAnimation = uni.createAnimation({
					duration:300,
					delay: 200
				})
			
				if(this.isClickAdd) {
					cardAnimation.bottom(0).step()
					addBtnAnimation.bottom(0).step()
				} else {
					cardAnimation.bottom(-this.cardHeight).step()
					addBtnAnimation.bottom(-uni.upx2px(120)).step()
				} 
				
				this.cardAnimation = cardAnimation.export()
				this.addBtnAnimation = addBtnAnimation.export()
				
				
			},
			
			sendFriendApply() {
				this.$u.api.addFriend({
					userId: this.$store.state.user._id,
					authMsg: this.authMsg,
					friendId: this.userInfo._id,
				}).then( res => {
					if(res.result === true) {
						return this.$u.api.sendMsg({
						     message: {
								 type: 'system.friendApply',
								 toId: this.userInfo._id
							 }
						})
					} else {
						return Promise.reject()
					}
					
				})
				this.$u.toast('已发送申请, 请等待对方验证')
			}
			
		},
		
		onLoad(query) {
			this.userInfo = this.$decode(query.userInfo)
		},
		
		computed: {
			height() {
				let windowHeight = uni.getSystemInfoSync().windowHeight
				let cardHeight = windowHeight - uni.upx2px(367)
				this.cardHeight = cardHeight
				
				return `height: ${cardHeight}px; bottom: -${cardHeight}px`
			}
		}
	}
</script>

<style lang="scss" scoped>
.avatar {
	position: absolute;
	z-index: 10;
	left: 175rpx;
	top: 120rpx;
}
.auth {
	width: 552rpx;
	height: 170rpx;
	margin: 20rpx auto;
	background-color: #eff0f3;
	border-radius: 20rpx;
	padding: 10rpx;
}
.add-btn{
	position: fixed;
	bottom: 30rpx;
}
.card{
	position: fixed;
	z-index: 9;
	bottom: 0;
	width: 100%;
	border-radius: 20rpx;
	background-color: white;
	// height: 850rpx;
	padding: 10rpx 20rpx;
	.name {
		font-size: 52rpx;
		color: $uni-text-color;
		margin-top: 168rpx;
		letter-spacing: -0.89px;
	}
	.bottom-btn{
		position: absolute;
		bottom: -120rpx;
		height: 120rpx;
		width: 100%;
		// bottom: 20rpx;
	}
}
</style>
