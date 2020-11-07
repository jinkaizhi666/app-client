<template>
	<view>
		<view class="flex jc-center px-5" :style="marginTop">
			<u-search @click="toSearch" :disabled="true" :show-action="false" bg-color="white" placeholder="请输入工作名称"></u-search>
		</view>
		
		<swiper style="width: 730upx; height: 350upx; margin: 10px auto;" class="round2 shadow" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(src, index) in swiperImg" :key="index">
				<image   style="width: 730upx; height: 350upx;" :src="src" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		
		<view class="px-1">
			<text class="weight1">职位推荐</text>
		</view>
		
		<k-job-list :list="jobList"></k-job-list>
		
		<u-loadmore class="py-1" :status="status" />
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobList: [],
				swiperImg: [
					'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2096239564,1303931083&fm=26&gp=0.jpg',
					'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2077176074,647425042&fm=26&gp=0.jpg'
				],
				page: 1,
				status: 'loadmore'
			}
		},
		
		onLoad() {
			this.getJobList()
		},
		
		methods: {
			getJobList() {
				if(this.status == 'nomore') return
				this.status = 'loading'
				this.$u.api.searchJob({
					page: this.page++
				}).then( res => {
					if( res.length > 0 && res.length % 10 == 0) {
						this.status = 'loadmore'
					}else {
						this.status = 'nomore'
					}
					this.jobList = this.jobList.concat(res)
				})
			},
			
			toSearch() {
				uni.navigateTo({
					url: '/pages/common/search/search?searchType=job'
				})
			}
			
		},
		
		computed: {
			marginTop() {
				let height = 0
				// #ifdef APP-VUE
					height = uni.getSystemInfoSync().statusBarHeight
				// #endif
				return `margin-top: ${height}px`
			}
		},
		
		onReachBottom() {
			this.getJobList()
		}
	}
</script>

<style>

</style>
