<template>
	<view class="">
		
		<view v-for="(item, index) in applyList" class="flex jc-center " :class="[delCard == item._id ? 'animate__animated animate__slideOutRight' : '']">
			<view class="bg-white p-1 round2 shadow" style="width: 700rpx;">
				<view class="flex ai-end jc-around">
					<k-button-mini bgColor="#ffeced" color="#d93025" @click="handleApply('reject',item)">拒绝</k-button-mini>
					<k-avatar :src="item.userId.avatar" size="120"></k-avatar>
					<k-button-mini @click="handleApply('ok', item)">同意</k-button-mini>
				</view>
				<view class="flex flex-column mt-1 ai-center">
					<view class="text-limit weight1 fs-xl">
						{{item.userId.userName}}
					</view>
					<view class="text-limit fs-sm text-icon">
						{{$u.date(item.created, 'yyyy-mm-dd hh-MM')}}
					</view>
				</view>
				<view class="text-font2 p-1 mx-2 my-1" style="background-color: #f1f2f5;">
					{{item.authMsg ? item.authMsg : '对方没有发送验证消息'}}
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				applyList: [],
				delCard: ''
			}
		},
		
		onLoad() {
			this.getApplyList()
		},
		
		methods: {
			getApplyList() {
				this.$u.api.getApplyList().then( res =>{
					this.applyList = res
				})
			},
			
			handleApply(action, item) {
				this.$u.api.handleFriendApply({
					status: action,
					friendId: item.userId._id
				}).then( res => {
					this.delCard = item._id
				})
				
			}
			
		}
	}
</script>

<style>

</style>
