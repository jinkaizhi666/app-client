<template>
	<view>
		<k-search-navbar searchType="job"  @search="search"></k-search-navbar>
		
		<k-job-list :list="list"></k-job-list>
		
		<u-loadmore :status="status"></u-loadmore>
		
	</view>
</template>

<script>
	
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				searchOptions: {
					page: 1,
					keyword: '',
					type: '',
					sort: 'created/-1'
				},
				status: 'loadmore',
				
				list: []
				
			}
		},
		
		computed: {
			...mapState({
				currentType: state => state.jobSearchType.currentType,
			})
		},
		
		methods: {
			getList() {
				if(this.status == 'nomore' && this.searchOptions.page != 1) return
				this.status = 'loading'
				this.searchOptions.type = this.currentType._id
				this.$u.api.searchJob(this.searchOptions).then( res => {
					if(res.length > 0 && res.length % 10 == 0) {
						this.status = 'loadmore'
					} else {
						this.status = 'nomore'
					}
					this.list = res
					
				})
			},
			
			search() {
				this.searchOptions.page = 1
				this.getList()
			}
			
		},
		
		onLoad() {
			this.getList()
		}
	}
</script>

<style>

</style>
