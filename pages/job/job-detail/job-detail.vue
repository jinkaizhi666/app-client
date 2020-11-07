<template>
	<view>
		<!-- 工作基本信息 -->
		<view style="margin: 10upx auto; width: 670upx;" class="p-1 round2 bg-white shadow">
			<text>{{jobInfo.title}}</text>
			<view class="flex my-1 ai-center">
				<text class="pr-1">{{jobInfo.salaryDesc}}</text>
				<u-tag color="white" type="primary" :text="jobInfo.settlement"></u-tag>
				<k-price :price="jobInfo.salary" class="pl-1"></k-price>
			</view>
			
			<view class="flex fs-sm jc-between">
				<text>{{jobInfo.adress}}</text>
				<text>招聘人数: {{baoMingInfo}}</text>
			</view>
			
		</view>
		
		<view class="p-1">
	
		<!-- 发布者 -->
		<view class="flex ai-center">
			<k-avatar :src="jobInfo.publishBy.avatar"></k-avatar>
			<text class="ml-1">{{jobInfo.publishBy.userName}}</text>
		</view>
		
		<!-- 工作时间 -->
		<text >工作时间: {{jobInfo.workTime}}</text>
		
		<!-- 工作描述 -->
		<view class="flex flex-column">
			<text class="fs-lg my-1 weight1">职位详情</text>
			<text>{{jobInfo.desc}}</text>
		</view>
		
		</view>
		
		<!-- 底部栏 -->
		<k-bottom :publishId="this.jobInfo.publishBy._id" type="job" @buy="baoming" @fav="fav" @openChat="openChat" :isFav="isFav"></k-bottom>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobInfo: '',
				baoMingInfo: '',
				publisher: '',
				isFav: false
				
			}
		},
		
		onLoad(query) {
			this.jobInfo = this.$decode(query.jobInfo)
			this.$u.api.getJobOrder({
				jobId: this.jobInfo._id
			}).then( res => {
				this.baoMingInfo = `${res.length}/${this.jobInfo.peopleNum}`
			})
			this.init()
		},
		
		methods: {
			init() {
				// 是否收藏
				this.$u.api.isFav({
					type: 'job',
					favId: this.jobInfo._id
				}).then( res => {
					this.isFav = res.result
				})
			},
			
			openChat() {
				uni.navigateTo({
					url: '/pages/common/chat-room/chat-room?type=job&params=' + this.$encode({
						user: {
							avatar: this.jobInfo.publishBy.avatar,
							_id: this.jobInfo.publishBy._id,
							userName: this.jobInfo.publishBy.userName
						}
					})
				})
			},
			
			fav() {
				if(this.isFav) { //取消收藏
					this.$u.api.deleteFav({
						favId: this.jobInfo._id,
						type: 'job',
					}).then( () => {
						this.isFav = false
						uni.$emit('updateJobFav')
					})
				} else { //收藏
					this.$u.api.fav({
						favId: this.jobInfo._id,
						type: 'job',
					}).then( () => {
						this.isFav = true
					})
				}
				
			},
			
			baoming() {
				uni.showModal({
					content: '确认报名该工作吗? 报名后可以在 我的 => 报名兼职 查看',
					success: (res) => {
						if(res.confirm) {
							this.$u.api.genJobOrder({
								jobId: this.jobInfo._id
							}).then( res => {
								this.$u.toast('报名成功')
							})
						}
					}
				})
			}
			
		}
	}
</script>

<style>

</style>
