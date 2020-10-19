<template>
	<view>
		<view :id="'msg-' + index" v-for="(item, index) in list" :key="index">
			<!-- 左边 -->
			<view v-if="!isSelf(item)" class="flex my-1">
				<k-avatar @click.stop="open('left')" :src=" item.to_avatar "></k-avatar>
				<view class="flex  ml-1  ai-center">
					<view v-if="item.type == 'text' || item.type == 'audio' " class="bg-white  p-1 round2" style="max-width: 380upx;">
						
						<!-- 文本消息 -->
						<text v-if="item.type == 'text'" >{{item.data}}</text>
						
						<!-- 录音消息 -->
						<view @click="playAudio(index)" v-else-if="item.type =='audio' " class="flex bg-white py-d5 px-1 round2 ai-center">
							<image style="width: 50rpx; height: 50rpx;" :src="recordPlayIndex == index ? '/static/chat-imgs/play.gif' : '/static/chat-imgs/audio.png' " mode="widthFix"></image>
							{{item.options.time}}
						</view>
						
					</view>
					<!-- 图片消息 -->
					<image @click="previewImg(item.data)" class="round2" style="max-width: 400rpx;" v-if="item.type == 'img' " :src="item.data" mode="widthFix"></image>
					<!-- 表情消息 -->
					<image @click="previewImg(item.data)" class="round2" style="max-width: 400rpx;"  v-else-if="item.type == 'emotion' " :src="item.data" mode="widthFix"></image>
					<!-- 位置消息 -->
					<view @click="toMapDetail(item.data)" style="max-width: 500rpx;"  v-else-if="item.type == 'location' " class="flex flex-column">
						<text>{{item.data.address}}</text>
						<image src="/static/demo/map.png" class="round2" style="max-width: 400rpx;" mode="widthFix"></image>
					</view>
					
				</view>
			</view>
			
			<!-- 右边 -->
			<view v-if="isSelf(item)" class="flex my-1 jc-end" >
				<view class="flex  mr-1 ai-center " >
					<view v-if="item.type == 'text' || item.type == 'audio' " class="bg-primary round2 p-1" style="max-width: 450upx;">
						<!-- 文本消息 -->
						<text v-if="item.type == 'text'" class="text-white">{{item.data}}</text>
						<!-- 录音消息 -->
						<view @click="playAudio(index)" v-else-if="item.type =='audio' " class="flex bg-white py-d5 px-1 round2 ai-center">
							<image style="width: 50rpx; height: 50rpx;" :src="recordPlayIndex == index ? '/static/chat-imgs/play.gif' : '/static/chat-imgs/audio.png' " mode="widthFix"></image>
							{{item.options.time}}
						</view>
						
					</view>
					
					<!-- 图片消息 -->
					<image @click="previewImg(item.data)" class="round2" style="max-width: 400rpx;"  v-if="item.type == 'img' " :src="item.data" mode="widthFix"></image>
					<!-- 表情消息 -->
					<image @click="previewImg(item.data)" class="round2" style="max-width: 400rpx;"  v-else-if="item.type == 'emotion' " :src="item.data" mode="widthFix"></image>
					<!-- 位置消息 -->
					<view @click="toMapDetail(item.data)" style="max-width: 500rpx;"  v-else-if="item.type == 'location' " class="flex flex-column">
						<text>{{item.data.address}}</text>
						<image src="/static/demo/map.png" class="round2" style="max-width: 400rpx;" mode="widthFix"></image>
					</view>
					
				</view>
				
				<k-avatar  @click.stop="open('right')" :src="item.from_avatar "></k-avatar>
			</view>
			
			<!-- 公共消息 系统消息 撤回消息 时间 -->
			<view class="my-2">
				<view v-if="item.showTime" class="flex jc-center fs-sm text-icon">
					{{_time(item.created)}}
				</view>
				<view v-if="item.sendFail" class="flex jc-center fs-sm text-icon">
					<text class="text-error fs-sm">消息发送失败</text>
				</view>
			</view>
				
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		
		data() {
			return {
				recordPlayIndex: -1 ,
				voicer: null
			}
		},
		
		computed: {
			imgs() {
				let urls = []
				this.list.forEach( item => {
					if(item.type == 'img' || item.type == 'emotion') {
						urls.push(item.data)
					}
				})
				return urls
			},
			
			recordImg(index) {
				if(index == this.recordPlayIndex) {
					return '/static/chat-imgs/audio.png'
				} 
				return '/static/chat-imgs/play.gif'
			},
		},
		
		methods: {
			toMapDetail({adress, longitude, latitude}) {
				uni.openLocation({
					adress,
					longitude,
					latitude
				})
			},
			
			 isSelf(item) {
				 // console.log(item.toId, this.$user._id)
				 return item.toId !== this.$user._id
			 },
			 
			 open(item) {
			 	
			 },
			 
			 playAudio(index) {
				let url = this.list[index].data
				if(!this.voicer) {
					this.voicer = uni.createInnerAudioContext()
					this.voicer.onPlay(function(){
						console.log('playing')
					})
					this.voicer.onError((res) => {
					  console.log(res.errMsg);
					  console.log(res.errCode);
					});
					this.voicer.onPause( () => {
						this.recordPlayIndex = -1
					})
					this.voicer.onStop( () => {
						this.recordPlayIndex = -1
					})
				} 
				if(!this.voicer.paused) {
					this.voicer.pause()
					this.recordPlayIndex = -1
					return
				}
				this.voicer.src = url
				this.recordPlayIndex = index
				this.voicer.play()
				console.log(url)
				
			 },
			 
			 previewImg(url) {
				 let index = this.imgs.findIndex( itemUrl => itemUrl == url)
				 uni.previewImage({
				 	urls: this.imgs,
					current: index
				 })
			 }
		},
	
	}
</script>

<style>

</style>
