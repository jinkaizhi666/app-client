<template>
	<view class="p-1">
		<text>报名人数: {{`   ${baoMingNum}/${peopleNum}`}}</text>
		
		<view v-for="(item, index) in baoMingUsers" :key="index" class="flex ai-center">
			<k-avatar :src="item.avatar" ></k-avatar>
			<text class="pl-1 flex1 weight1">{{item.realName}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baoMingUsers: [],
				
				jobId: '',
				baoMingNum: '',
				peopleNum: ''
			}
		},
		methods: {
			init() {
				this.$u.api.getJobBaoMing({
					jobId: this.jobId
				}).then( res => {
					let data = res.userList.map( item => {
						return {
							realName: item.userId.realName,
							avatar: item.userId.avatar,
							baoMingNum: res.length,
							userInfo: item.sellerId
						}
					})
					let baoMingNum = res.userList.length
					let peopleNum = res.job.peopleNum
					this.baoMingNum = baoMingNum
					this.peopleNum = peopleNum
					this.baoMingUsers = data
					
				})
			}
		},
		
		onLoad(query) {
			this.jobId = query.jobId
			this.init()
		}
	}
</script>

<style>

</style>
