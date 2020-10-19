<template>
	<view @click="click" :style="style" style="height: 50rpx; padding-left: 30rpx; padding-right: 30rpx;"  class="fs-sm py-0  flex ai-center jc-center round5">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			type: {
				default: 'primary'
			},
			
			bgColor: {
				default: '#472f71'
			},
			
			color: {
				default: 'white'
			}
			
		},
		
		data() {
			return {
				debounce: ''
			}
		},
		
		created() {
			this.debounce = this._createDebouncer()
			// console.log(this._createDebounce, this.debounce)
		},
		
		computed: {
			style() {
				return `background-color: ${this.bgColor}; color: ${this.color}`
			}
		},
		
		methods: {
			click() {
				this.debounce( () => {
						this.$emit('click')
				})
			}
		}
	}
	
</script>

<style>

</style>
