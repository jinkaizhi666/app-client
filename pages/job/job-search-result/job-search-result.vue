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
			
			search(keyword) {
				
				this.searchOptions.page = 1
				this.searchOptions.keyword = keyword
				this.searchOptions.type = this.$store.state.jobSearchType.currentType._id
				this.getList()
			}
			
		},
		
		onLoad(query) {
			this.searchOptions.keyword = query.keyword
			this.searchOptions.type = query.type
			this.getList()
		}
	}
</script>

<style>

</style>
