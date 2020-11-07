<template>
	<view class="px-1">
		<u-tabs bg-color="#f4f2f7" bar-width="70" active-color="#472f71" :list="list" :is-scroll="false" :current="tabIndex" @change="change"></u-tabs>
		
		<swiper style="width: 100%;" :style="swiperHeight" @change="swiperChange" :current="swiperIndex">
			<swiper-item>
				
				<k-goods-fav :release="false" @delFav="delFav" :favList="goodsFavList"></k-goods-fav>
				
				
			</swiper-item>
			<swiper-item>
				
				<k-job-list @delFav="delFav" :list="jobFavList" class="mt-1"></k-job-list>
				
			</swiper-item>
		</swiper>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
					name: '闲置物品'
				}, {
					name: '兼职'
				}
				],
				
				goodsFavList: [],
				jobFavList: [],
				tabIndex: 0,
				swiperIndex: 0
			}
		},
		methods: {	
			init() {
				this.$u.api.getFav({
					type: 'goods'
				}).then( res => {
					this.goodsFavList = res.itemIds
				})
				
				
			},
			
			delFav({type, index}) {
				
				if(type == 'goods'){
					this.goodsFavList.splice(index, 1)
				}else if(type == 'job') {
					this.jobFavList.splice(index, 1)
				}
				console.log(type, index, this.goodsFavList)
			},
			
			getJobFav() {
				this.$u.api.getFav({
					type: 'job'
				}).then( res => {
					this.jobFavList = res.itemIds
				})
			},
			
			change(index) {
				this.swiperIndex = index
				this.tabIndex = index
			},
			
			
			
			swiperChange(e) {
				this.tabIndex = e.detail.current
				this.swiperIndex = e.detail.current
				if(this.jobFavList.length == 0) {
					this.getJobFav()
				} 
			},
			
			
		},
		
		computed: {
			swiperHeight() {
				let info = uni.getSystemInfoSync()
				let height = info.windowHeight - uni.upx2px(80)
				return `height: ${height}px`
			}
		},
		
	
		
		onLoad() {
			this.init()
			uni.$on('updateJobFav', () => {
				this.getJobFav()
			})
			
		},
		
		onUnload() {
			uni.$off('updateJobFav')
		}
		
	}
</script>

<style>

</style>
