<template>
	<view class="text-error py-d5">
		<text class="text-error iconfont weight2 fs-md icon-jiage"></text>
		<text class="weight2 fs-xl pl-d4">{{price}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			price: {
				default: null
			}
		}
	}
</script>

<style>

</style>
