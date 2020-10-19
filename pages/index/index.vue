<template>
	<view class="">

		<!-- 导航栏 -->
		<k-nav-bar :right="true" @rightClick="show = true" @leftClick="leftClick" :bg="false">
			<image slot="left" src="/static/images/more.png" style="width: 35upx;" mode="widthFix"></image>
			<image slot="right" src="/static/images/scholl.png" style="width: 45upx;" mode="widthFix"></image>
		</k-nav-bar>

		<!-- 蓝色背景 -->
		<view class="" style="width: 750rpx; height: 300upx; background-image: linear-gradient(0deg, #472F71, #6182DC);">

		</view>

		<!-- 浮动搜索框菜单 -->
		<view :style="top" style="position: absolute; width: 750upx; height: 280upx ;">

			<!-- 搜索框 -->
			<view class="flex jc-center" style="width: 750upx;">
				<view style="width: 600upx;">
					<u-search height="70" @click="search" :disabled="true" input-align="center" :show-action="false" placeholder="日照香炉生紫烟"
					 v-model="keyword"></u-search>
				</view>

			</view>

			<!-- 菜单 -->
			<view style="width: 600upx; margin: 30upx auto;" class="py-1 shadow bg-white round2 flex ai-center jc-around">
				<view @click="searchTypeName(item.title)" v-for="(item, index) in menus" style="width: 110upx; height: 120upx;" :key="index" class="flex flex-column jc-center ai-center">
					<text :style="{color: item.color}" style="font-size: 50upx;" :class="item.icon"></text>
					<text class="fs-sm">{{item.title}}</text>
				</view>
			</view>
		</view>

		<!-- 产品列表 -->
		<k-goods-list :style="marginTop" :goodsList="goodsList"></k-goods-list>
		

		<!-- 切换学校 -->
		<u-action-sheet @click="schollSheet" :list="rightIconSheet" v-model="show"></u-action-sheet>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				background: {
					backgroundColor: 'transparent'
				},
				keyword: '',
				rightIconSheet: [{
						text: '查看所有学校信息',
						color: '#6182dc',
						fontSize: 28,
					},
					{
						text: '只看我的学校',
						fontSize: 28,
					}
				],
				menus: [{
						icon: 'iconfont icon-shenghuoyongpin',
						title: '生活用品',
						to: '/pages/',
						color: '#966d32'
					},
					{
						icon: 'iconfont icon-jiaokeshu',
						title: '教科书',
						to: '/pages/',
						color: '#999999'
					},
					{
						icon: 'iconfont icon-dianzichanpin1',
						title: '电子产品',
						to: '/pages/',
					},
					{
						icon: 'iconfont icon-shuben',
						title: '书籍',
						to: '/pages/',
						color: '#cccccc'
					},
					{
						icon: 'iconfont icon-qita',
						title: '其他',
						to: '/pages/',
						color: '#e97878'
					}
				],
				
				goodsList: []
			};
		},

		computed: {
			// <!-- 浮动搜索框菜单 --> top
			top() {
				let height = 10
				// #ifdef APP-PLUS
				height = 40
				// #endif
				let navBarHeight = uni.upx2px(80)
				// console.log(navBarHeight)
				return `top: ${navBarHeight + height + 15}px`
			},
			// 商品列表margin-top
			marginTop() {
				// #ifdef APP-PLUS
				return `margin-top: ${ this.$statusBarHeight + uni.upx2px(120) }px`
				// #endif
				
				// #ifndef APP-PLUS
				return `margin-top: 120upx`
				// #endif
				
			}
		},

		methods: {
			// 跳转到搜索页面
			search() {
				uni.navigateTo({
					url: '/pages/common/search/search'
				})
			},
			
			// 切换学校信息
			schollSheet(index) {
				this.$sheetColor(this.rightIconSheet, index)
			},

			searchTypeName(typeName) {
				uni.navigateTo({
					url: '/pages/index/goods-search-result/goods-search-result?typeName=' + typeName
				})
				this.$store.commit('setSearchType', {
					key: 'currentType',
					
					val: {
						text: typeName
					}
				})
				
				
			},
			
			leftClick() {}
			
		},
		

		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onLoad() {
			this.$u.api.searchGoods({
				page: 1
			}).then( res => {
				this.goodsList = res
			})
		}
	};
</script>

<style scoped>

</style>
