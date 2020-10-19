<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			uni.onTabBarMidButtonTap( () => {
				uni.navigateTo({
					url: '/pages/mid/release'
				})
			})
			
			uni.onKeyboardHeightChange( height => {
				if(height > this.$store.state.keyBoardHeight) {
					this.$store.commit('setKeyBoardHeight', height)
				} 
			})
			
			// 连接socket
			this.$store.dispatch('init')
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f2f7;
		font-size: 24upx;
	}
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	
	@import "/static/css/global.scss";
	
	@import "/static/css/iconfont.css";
	
	@import  "/static/css/animation.css"
</style>
