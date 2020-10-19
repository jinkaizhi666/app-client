<template>
	<view class="flex jc-center w-100 py-1">
		<image :animation="loadingAnimation" src="/static/images/logo.png" style="width: 50rpx; height: 50rpx;" mode=""></image>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				default: false
			},
			
		},
		
		data() {
			return {
				loadingAnimation: {},
				timer: ''
			};
		},
		
		watch: {
			show(val) {
				if(!val) this.$destroy()
			}
		},
		
		created() {
			this.showAnimation()
		},
		
		beforeDestroy() {
			clearInterval(this.timer)
		},
		
		methods: {
			showAnimation() {
				let animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'step-start'
				})
				let i = 1
				this.timer = setInterval( () => {
					animation.rotate(i * 30).step()
					this.loadingAnimation = animation.export()
					i ++
				}, 100)
			}
		}
		
	}
</script>

<style>

</style>
