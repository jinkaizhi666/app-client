<template>
	<u-button v-bind="$attrs" @click="$emit('click')" style="margin: 20upx auto; width: 500upx;" class="round4 custom-style" :type="type"> 
		<slot></slot>
	</u-button>
</template>


<script>
	export default {
		props: {
			type: {
				default: 'primary'
			}
		}
	}
	
</script>

<style scoped>
.custom-style {
		/* color: #606266; */
		/* width: 400rpx; */
		border-width: 0;
	}
</style>
