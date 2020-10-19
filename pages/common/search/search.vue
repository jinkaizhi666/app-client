<template>
	<view class="p-1">
		<!-- 导航栏搜索 -->
		<k-search-navbar :searchType="searchType" @search="search"></k-search-navbar>


		<!-- 历史记录 -->
		<view class="flex ai-center jc-between">
			<text class="text-icon">历史记录</text>
			<!-- 删除历史记录 -->
			<text @click="clearHistory" class="iconfont text-icon icon-lajitong"></text>
		</view>
		<view class="flex flex-wrap my-1">
			<u-tag @click="historySearch(item)" class="m-d5" v-for="(item, index) in historyList" :key="index" bg-color="white"
			 color="black" border-color="white" :text="item"></u-tag>
		</view>

		<!-- 大家都在搜 -->
		<view class="flex ai-center jc-between">
			<text class="text-icon">大家都在搜</text>
		</view>
		<view class="flex flex-wrap my-1">
			<u-tag bg-color="white" color="black" border-color="white" text="热水壶"></u-tag>
		</view>



	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				historyList: [], //历史列表
				searchType: '', //'goods' job
			}
		},

		computed: {
			...mapState({
				currentType: state => state.searchType.currentType
			})
		},

		methods: {
			init() {
				if(this.searchType == 'job') {
					this.historyList = this.$s.get('jobSearchHistory')
				} else {
					this.historyList = this.$s.get('goodsSearchHistory')
				}
			},

			historySearch(keyword) {
				uni.navigateTo({
					url: `/pages/index/goods-search-result/goods-search-result?keyword=${keyword}&type=${this.currentType._id}`
				})
			},

			search(keyword) {
				// 生成搜索历史记录
			
				if (this.searchType == 'job') {
					if(keyword.trim() != '') {
						this.$s.push('jobSearchHistory', keyword, {
							reserve: true,
							set: true
						})
					}
					
					uni.navigateTo({
						url: `/pages/job/job-search-result/job-search-result?keyword=${keyword}&type=${this.currentType._id}`
					})
					console.log('job')


				} else {
					if(keyword.trim() != '') {
						this.$s.push('goodsSearchHistory', keyword, {
							reserve: true,
							set: true
						})
					}
					
					uni.navigateTo({
						url: `/pages/index/goods-search-result/goods-search-result?keyword=${keyword}&type=${this.currentType._id}`
					})


				}
			},

			clearHistory() {
				uni.showModal({
					content: '确认要清除历史记录吗?',
					success: res => {
						if (res.confirm) {
							this.historyList = []
							if (this.searchType == 'job') {
								this.$s.del('jobSearchHistory')
							} else {
								this.$s.del('goodsSearchHistory')
							}
						}
					}
				})
			}
		},

		onLoad(query) {
			this.init()
			this.searchType = query.searchType

		},


		onUnload() {
			this.$store.commit('set', {
				key: this.searchType == 'job' ? 'jobSearchType' : 'searchType',
				val: {
					currentType: {
						text: '所有',
						_id: ''
					}, //name _id
					types: []
				}
			})
		}

	}
</script>

<style>
</style>
