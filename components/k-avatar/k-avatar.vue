<template>
	<view  @click.stop="">
		<u-avatar @click="click" v-bind="$attrs" :src=" src || $user.avatar || '/static/images/avatar.jpg' "></u-avatar>
	</view>
</template>

<script>
	export default {
		props: {
			src: String,
			
			toUserHome: {
				default: true
			},
			userId: {
				default: ''
			},
			animation: Object
		},
		
		methods: {
			click(e) {
				if(this.toUserHome) {
					uni.navigateTo({
						url: '/pages/common/user-home/user-home?userId=' + this.userId
					})
				}else {
					this.$emit('click')
				}
			}
		}
	}
</script>

<style>

</style>
