<template>
	<view  style=" background-color: transparent">
		
	
	<view  class="flex nav-bar jc-between ai-center px-1" style="z-index: 10000;  width: 750rpx; height: 80upx;">
		<!-- 左边 -->
		<view @click="$emit('leftClick')" class="flex jc-center ai-center circle" :class="[ bg ? 'bg' : '']" style=" width: 60upx; height: 60upx;">
			<slot name="left">
				<text :style="iconStyle" @click="back" class="iconfont icon-fanhui fs-xl weight3"></text>
			</slot>
		</view>
		
		<slot>
			<text v-if="title" class="weight1">{{title}}</text>
		</slot>
		
		<!-- 让标题居中占位 -->
		<view v-if="title && !right" class="">
			
		</view>
		
	
		<!-- 右边 -->
		<view v-if="right" :class="[ (bg ? 'bg' : '')]" class="flex jc-center pr-1 ai-center circle"  >
			<slot name="right">
			<view @click="$emit('more')"  style="width: 60upx; height: 60upx;" :style="iconStyle" class="iconfont icon-gengduo weight1 fs-xxxl"></view>
			</slot>
		</view>
	</view>
	
	
	<!-- 填充高度 -->
	<view v-if="!fixed" class="" :style="height">
		
	</view>
	
	</view>
</template>

<script>
	export default {
		props: {
			bg: {
				type: Boolean,
				default: false
			},
			right: {
				type: Boolean,
				default: false
			},
			iconColor: {
				default: 'black'
			},
			title: {
				default: ''
			},
			fixed: {
				default: true
			}
		},
		
		methods: {
			back() {
				uni.navigateBack()
			}
		},
		
		created() {
		},
		
		computed: {
			iconStyle() {
				return `color: ${this.iconColor}`
			},
			
			height() {
				let height = 10
				// #ifdef APP-PLUS
				height = this.$statusBarHeight
				// #endif
				let navBarHeight = uni.upx2px(80)
				return `height: ${navBarHeight + height }px`
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.bg {
		background-color: rgba(0,0,0,0.4);
	}
	/* #ifdef APP-PLUS */
	.nav-bar {
		position: absolute;
		left: 0;
		top: var(--status-bar-height);
	}
	/* #endif */
	/* #ifndef APP-PLUS */
	.nav-bar {
		position: absolute;
		top: 0px;
		left: 0;
	}
	/* #endif */
	
</style>
