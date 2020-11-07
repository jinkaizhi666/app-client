<template>
	<view class="px-1">
		<u-navbar :background="{
			backgroundColor: '#f4f2f7'
		}" title="222">
			<text slot="right" @click="friendAction" class="fs-xxxl weight1 iconfont icon-gengduo pr-1"></text>
		</u-navbar>

		<!-- 商品 -->
		<!-- 	<u-sticky v-if=" info.goodsInfo " offset-top="0" :enable="true">
			<view class="flex ai-center border-bottom">
				<image :src="info.goodsImg" class="round2" mode="aspectFit" style="width: 180upx; height: 180upx;"></image>
				<view class="flex flex-column pl-1">
					<text class="weight1 py-1">{{info.title}}</text>
					<view class="text-error weight2">
						<text class="iconfont fs-lg icon-jiage"></text>
						<text class="">{{info.price}}</text>
					</view>
				</view>
			</view>
		</u-sticky> -->

		<!-- 消息区域 -->
		<scroll-view @scrolltoupper="loadMore" :scroll-with-animation="scrollAnimation" :scroll-into-view="scrollIntoView"
		 @click="scrollViewClick" :style="scrollViewStyle" scroll-y="true" class="mt-d5">
			<u-loadmore :icon="false" :load-text="loadText" :status="loadStatus"></u-loadmore>
			<view v-if="isLoading" style="position: fixed; top: 130rpx;" class="flex jc-center w-100 py-1">
				<k-loading :show="isLoading"></k-loading>
			</view>
			<k-msg :list="msgList"></k-msg>
		</scroll-view>

		<!-- 聊天功能区 -->
		<view class="py-1 bg-white" style="position: fixed; width: 750upx; bottom: 0; left: 0;">
			<!-- 内容区 -->
			<view class="flex ai-center" style="height: 80upx; box-sizing: border-box;">
				<!-- 语音键盘切换 -->
				<text v-if="moreAction.text" @click="action('audio')" style="font-size: 50upx;" class="mx-1 iconfont icon-yuyin text-icon "></text>
				<!-- 键盘 -->
				<text v-if="moreAction.audio" @click=" action('text')" style="font-size: 50upx;" class="mx-1 iconfont icon-jianpan"></text>
				<!-- 输入框 -->
				<textarea v-if="moreAction.text" @focus="inputText" class="bg-bg fs-md round2 pl-1" style="padding-top: 13upx ; height: 60upx; width: 450rpx;"
				 placeholder="请输入消息内容" v-model="inputVal" />
				<!-- 语音滑块 -->
				<view  @touchmove="touchMove" @touchstart="touchStart" @touchend="touchEnd" v-if="moreAction.audio" class="flex py-1 mx-3 round4 flex1 bg-primary text-white jc-center ai-center">
					<text >{{recordInfo.recording ? '正在录音...' : '按住不松开始录音'}}</text>
				</view>
				<!-- 表情 -->
				<text @click="emotionClick" style="font-size: 50upx;" class="iconfont icon-xiaolian text-icon fs-xxl mx-1" ></text>
				<!-- 打开关闭更多菜单 -->
					<text @click="actionMore" v-if="!inputVal" style="font-size: 50upx;" class="iconfont icon-plus text-icon fs-xxl mx-1" ></text>
					<k-button-mini v-if="inputVal" @click="sendMsg({type: 'text', data: inputVal})">发送</k-button-mini>
				</view>
				
				<!-- 更多菜单 -->
				<view style="overflow: hidden;" :style="moreZoneHeight" v-if="keyBoardHeight > 0">
					<!-- 表情 -->
							<swiper style="margin-top: 50upx;" v-if="moreAction.emotion "  :autoplay="false" :indicator-dots="true"  :interval="3000" :duration="1000">
								<swiper-item v-for="(itemArr, index) in emotionList" :key="index">
									<view class="flex flex-wrap">
										<image @click="sendMsg({
											type: 'emotion',
											data: src
										})" v-for="src in itemArr" :key="src" style="width: 130upx; height: 130upx;" class="m-d5" mode="scaleToFill" :src="src"></image>
									</view>
								</swiper-item>
							</swiper>
					
					<!-- 更多功能 -->
					<view v-if="moreAction.more" class="flex flex-wrap  ai-center" >
						<view @click="moreHandle(item)" v-for="(item, index) in moreHandleMenus" :key="index" class="flex flex-column ai-center m-1" style="width: 140upx; height: 180upx;">
							<text class="iconfont text-icon" :class="[item.icon]" style="font-size: 70upx;"></text>
							<text class="text-icon">{{item.title}}</text>
						</view>
					</view>
				</view>
			</view>
		
		<view v-if="recordInfo.recording" class="recording-bg">
			<view class="recording-info">
				<image style="width: 200rpx; margin-top: 200rpx;" src="/static/chat-imgs/recording.gif" mode="widthFix"></image>
				<view class="text-white fs-xxxl" style="margin-top: 100rpx;">
					{{recordInfo.time}}"
				</view>
				<view :style="{color: recordInfo.color ? 'red' : 'white'}" v-if="recordInfo.recording" class="fs-xxl mt-3 text-white">
					{{recordInfo.msg}}
				</view>
				<text id="recoid-close" class="iconfont close icon-guanbi text-error" style="font-size: 100rpx;"></text>
			</view>
		</view>
			
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import mock from '@/common/data.js'
	import mixin1 from '@/common/mixins/chat-room.js'
	
	export default {
		mixins: [mixin1],
		
		data() {
			return {
				recordManager: uni.getRecorderManager(),
				msgList: [],
				inputVal: '',
				emotionList: [], //表情包url数组
				mode: 'text', //当前底部内容区模式 text emotion more audio
				info: {},
				bottomShow: false,
				moreAction: {
					text: true,
					audio: false,
					emotion: false,
					more: false,
				},
				recordInfo: {
					time: 1,
					msg: '手指上滑取消录音',
					recording: false,
					color: '',
					calcel: false,
					url: '',
					touchEndE: ''
				},
				moreHandleMenus: [
					{
						title: '相册',
						icon: 'icon-xiangce'
					},
					{
						title: '相机',
						icon: 'icon-paishe'
					},
					{
						title: '语音通话',
						icon: 'icon-dianhua'
					},
					{
						title: '位置',
						icon: 'icon-weizhi'
					}
				
				],
				closeLocation: {
					x1: 0,
					x2: 0,
					y1: 0,
					y2: 0
				}
			}
		},
		
		computed: {
			...mapState(['keyBoardHeight']),
			
			moreZoneHeight() {
				return `height: ${this.keyBoardHeight}px`
			},
			
			scrollViewStyle() {
				let windowHeight = uni.getSystemInfoSync().windowHeight
				let height = windowHeight - 44 - this.keyBoardHeight - uni.upx2px(200)
				return `height: ${height}px`
			}
		},
		
		onBackPress() {
			if(this.moreAction.more || this.moreAction.emotion ) {
				this.close()
				return true
			} else {
				return false
			}
			
		},
		
		// watch: {
		// 	keyBoardHeight(newV) {
		// 		if(newV > 0) {
		// 			// console.log(newV)
		// 			setTimeout( () => {
		// 				this.goBottom()
		// 			}, 2000)
		// 		}
		// 	}
		// },
		
		methods: {
			init() {
				let src = '/static/emotion/one/'
				let total = 20
				let singleNum = 10
				let arr = []
				for(let i = 0; i < total / singleNum; i++) {
					arr[i] = []
					let start = i * singleNum
					for(let k = 0; k < singleNum; k++) {
						let index = start + k
						if(index >= total) break
						arr[i].push(src + index + '.gif')
					}
				}
				this.emotionList = arr
				
				let msgList = this.msgList
				this.msgList = msgList.map( (item, index) => {
									if(index + 1 != msgList.length) {
										return {
											...item,
											showTime: !this._isInDuration(msgList[index].created, msgList[index+1].created)
										}
									} else {
										return {
											...item,
											showTime: true
										}
									}
									
								})
			},
			
			actionMore() {
				if(this.moreAction.more) {
					this.close()
					this.moreAction.more = false
					return
				}
				this.action('more')
					this.tanQi()
				
			},
			
			inputText() {
				this.$store.commit('setKeyBoardHeight', 0)
			},
			
			// 更多菜单状态切换
			action(item) {
				switch (item) {
					case 'text' :
					this.moreAction.text = true
					this.moreAction.audio = false
					this.moreAction.emotion = false
					this.moreAction.more = false
					
					break
					
					case 'audio' :
					let platform = 'h5'
					// #ifndef H5
						platform = 'app'
					// #endif
					if(platform == 'h5') {
						this.$u.toast('h5不支持录音功能，录音请使用安卓')
						return
					}
					this.moreAction.audio = true
					this.moreAction.text = false
					this.moreAction.emotion = false
					this.moreAction.more = false
					this.close()
					break
					
					case 'emotion' :
					this.moreAction.emotion = true
					this.moreAction.more = false
					this.moreAction.audio = false
					this.moreAction.text = true
					break
					
					case 'more' :
					this.moreAction.more = true
					this.moreAction.emotion = false
					this.moreAction.audio = false
					this.moreAction.text = true
					break
				}
			},
			
			// 切换文本录音
			audioOrText() {
				if(this.mode == 'text') {
					this.mode = 'audio'
				}else if( this.mode == 'audio') {
					this.mode = 'text'
				}
			},
			
			// 点击表情
			emotionClick() {
				if(this.moreAction.emotion) {
					this.close()
					this.moreAction.emotion = false
					return
				}
				this.action('emotion')
				this.tanQi()
			},
			
			tanQi() {
				this.$store.commit('setKeyBoardHeight', 260)
			},
			
			close() {
				this.$store.commit('setKeyBoardHeight', 0)
				this.moreAction.emotion = false
				this.moreAction.more = false
			},
			
			// 点击聊天区关闭更多功能
			scrollViewClick() {
				this.close()
			},
			
			// 用户手指是否在取消按钮范围
			isCancelRecord(e) {
				console.log(e)
				let x = e.changedTouches[0].clientX
				let y = e.changedTouches[0].clientY
				let left = x > this.closeLocation.x1
				let right = x < this.closeLocation.x2
				let top = y > this.closeLocation.y1
				let bottom = y < this.closeLocation.y2
				if(left && right && top && bottom) {
					return true
				} else {
					return false
				}
			},
			
			// 录音中
			touchMove(e) {
				if(e && this.isCancelRecord(e)) {
					this.recordInfo.color = 'ok'
					this.recordInfo.msg = '松开手指取消录音'
				} else {
					this.recordInfo.color = ''
					this.recordInfo.msg = '松开手指发送录音'
				}
			},
			
			// 录音开始
			touchStart() {
				this.recordInfo.recording = true
				this.recordManager.start()
				this.recordTimer = setInterval( () => {
					this.recordInfo.time++
				}, 1000)
				const query = uni.createSelectorQuery().in(this);
				this.$nextTick( () => {
					query.select('#recoid-close').boundingClientRect(data => {
					
					}).exec(res => {
						let data = res[0]
						this.closeLocation = {
							x1: data.left,
							x2: data.left + data.width,
							y1: data.top,
							y2: data.top + data.height
						}
					});
				})
			},
			
			recordStop(e) {
				
				// 是否取消录音
				if(e && this.isCancelRecord(e)) {
					this.recordInfo.cancel = true
				}
				
				if(!this.recordInfo.cancel) {
					// 如果没有取消录音发送出去
					this.sendMsg({
						type: 'audio',
						data: this.recordInfo.url,
						options: {
							time: this.recordInfo.time
						}
					})
				}
				// 初始化录音参数
				this.recordInfo = {
					time: 1,
					msg: '手指上滑取消录音',
					recording: false,
					color: '',
					calcel: false,
					url: '',
					touchEndE: ''
				}
				clearInterval(this.recordTimer)
				
			},
			
			// 录音结束
			touchEnd(e) {
				this.recordInfo.recording = false
				this.recordInfo.touchEndE = e
				this.recordManager.stop()
				
			},
			
			getMsgHistory() {
				this.loadStatus = 'loading'
				if(!this.historyLoadMore) {
					this.isLoading = false
					this.loadStatus = 'nomore'
					return
				}
				
				const limit = 10
				let historyList = this.chat.getHistory(this.friendInfo._id)
				console.log('historyList', historyList)
				let startIndex = ((historyList.length - 1) - limit * this.msgPage++)
				startIndex = startIndex < 0 ? 0 : startIndex
				console.log(startIndex)
				if(startIndex == 0) this.historyLoadMore = false
				this.msgList = historyList.slice(startIndex, limit + startIndex + 1).concat(this.msgList)
				this.isLoading = false
				this.loadStatus = 'loadmore'
			}
		},

		onLoad(query) {
			this.getMsgHistory()
			 if(query.params) this.info = this.$decode(query.params)
				this.init()
				this.goBottom()
				this.recordManager.onStop( res => {
					this.recordInfo.url = res.tempFilePath
					this.recordStop(this.recordInfo.touchEndE)
				})
				
				uni.$on('updateMsgList', msg => {
					if(msg.fromId == this.friendInfo._id) {
						this.msgList.push(msg)
						this.goBottom()
					}
				})
				this.chat.createChat()
		},
		
		onUnload() {
			uni.$off('updateMsgList')
			this.chat.closeChat()
		}
	
	}
</script>

<style scoped>
.recording-bg {
	position: fixed;
	z-index: 100000;
	left: 0;
	right: 0;
	top: 0;
	bottom: 120rpx;
	background-color: rgba(0, 0, 0, 0.3);
}
.recording-info {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.close {
	position: fixed;
	bottom: 130rpx;
}
</style>
