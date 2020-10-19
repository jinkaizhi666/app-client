<template>
	<view>
		
		<k-job-list :history="true" :list="list"></k-job-list>
		<u-loadmore :status="status"></u-loadmore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				status: 'loadmore'
			}
		},
		methods: {
			getJobList() {
				if(this.status == 'nomore') return
				this.status = 'loading'
				this.$u.api.getJobOrder({
					page: this.page ++
				}).then( res => {
					if(res.length > 0 && res.length % 10 == 0) {
						this.status = 'loadmore'
					}else {
						this.status = 'nomore'
					}
					let data = res.map( item => {
						return {
							...item.jobId,
							created: item.created,
							publishBy: item.userId,
							status: item.status
						}
					})
					
					this.list = this.list.concat(data)
					console.log(this.list)
					
					
				})
			}
		},
		
		onReachBottom() {
			this.getJobList()
		},
		
		onLoad() {
			this.getJobList()
		}
	}
</script>

<style>

</style>
