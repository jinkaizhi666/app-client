<template>
	<view class="">
		
	<view @click="openDetail(index)" v-for="(item, index) in list" class="shadow m-1 bg-white p-1">
		
		<view class="flex jc-between">
			<view style="width: 550upx;">
				<text class="weight2 text-limit">{{item.title}}</text>
			</view>
			<text class="weight2">{{item.salaryDesc}}</text>
		</view>
		
		<view class="flex ai-center jc-between">
			<u-tag class="my-1" :bg-color="$color.primary2" color="white" :text="item.settlement"></u-tag>
			<text v-if="history" :class="[item.status == 'pending' ? 'text-primary2' : (item.status == 'ok' ? 'text-success' : 'text-error')]">{{item.status == 'pending' ? '已经报名' : (item.status == 'ok' ? '已结束' : '订单取消')}}</text>
			<k-button-mini @click="lookBaoMing(index)" v-if="release">查看报名情况</k-button-mini>
			<k-price :price="item.salary"></k-price>
		</view>
		
		<view class="flex jc-between">
			<text class="text-limit fs-sm text-info">{{$get(item, 'publishBy.userName')}}</text>
			<text v-if="history" class="text-limit fs-sm text-info">{{$u.date(item.created, 'yyyy-mm-dd hh-MM')}}</text>
			<text class="text-limit fs-sm text-info">{{item.adress}}</text>
		</view>
	</view>
	
	</view>
</template>

<script>
	export default {
		props: {
			release: {
				default: false
			},
			list: Array,
			history: false
		},
		
		methods: {
			openDetail(index) {
				uni.navigateTo({
					url: '/pages/job/job-detail/job-detail?jobInfo=' + this.$encode(this.list[index])
				})
			},
			
			lookBaoMing(index) {
				console.log(this.list[index])
				uni.navigateTo({
					url: '/pages/home/job-release/bao-ming-qing-kuang/bao-ming-qing-kuang?jobId=' + this.list[index]._id
				})
			}
			
		},
		
		
	}
</script>

<style>

</style>
