<template>
	<view>
		<view class="flex jc-center px-5" :style="marginTop">
			<u-search @click="toSearch" :disabled="true" :show-action="false" bg-color="white" placeholder="请输入工作名称"></u-search>
		</view>
		
		<swiper style="width: 730upx; height: 350upx;" class="round2 m-1 shadow" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<image style="width: 730upx; height: 350upx;" src="/static/demo/Snipaste_2020-09-29_11-33-04.png" mode="scaleToFill"></image>
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
