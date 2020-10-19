export default {
	data() {
		return {
			scrollIntoView: '',
			msg: {
				data: '',
				avatar: ''
			},
			msgPage: 1,
			scrollAnimation: false,
			isLoading: false,
			historyLoadMore: true,
			loadingAnimation: {},
			loadStatus: 'loadmore',
			loadText: {
				loadmore: '下拉加载历史记录',
				loading: '努力加载中',
				nomore: '没有更多消息了'
			},
			friendActionText: [
					'删除好友'
				]
		}
	},
	
	computed: {
		chat() {
			return this.$store.state.chat.chat
		},
		
		friendInfo() {
			return this.$store.state.chat.currentFriendInfo
		}
	},
	
	methods: {
		loadMore() {
			if(this.isLoading) return
			this.isLoading = true
			this.getMsgHistory()
		},
	
		friendAction() {
			uni.showActionSheet({
				itemList: friendActionText,
				success: res => {
					let action = this.friendActionText(res.tapIndex)
					if(action == '删除好友') {
						this.$u.api.delFriend({
							friendId: this.friendInfo._id
						})
					}
				}
			})
		},
		
		goBottom(index) {
			this.$nextTick(() => {
			let id = 'msg-' + (this.msgList.length - 1)
			this.scrollIntoView = id
			
			if(!this.scrollAnimation) {
				setTimeout(() => {
					this.scrollAnimation = true
				}, 1000)
			}
			
			})
		},
		
		addAnimation() {
			let animation = uni.createAnimation({
				duration:300
			})
			if(this.keyboardHeight == 0) {
				animation.height
			}
		},
		
		moreHandle(item) {
			switch (item.title) {
				case '相册' :
				this.chooseImg({
					type: 'album',
					count: 5
				}).then( urls => {
					urls.forEach( url => {
						this.sendMsg({
							type: 'img',
							data: url
						})
					})
				})
				break
				
				case '相机' :
				this.chooseImg({
					type: 'camera',
					count: 1
				}).then( urls => {
					urls.forEach( url => {
						this.sendMsg({
							type: 'img',
							data: url
						})
					})
				})
				break
				
				case '位置':
					this.getLocation()
				break
				
			}
		},
		
		getLocation() {
			uni.getLocation({
				geocode: true,
				success: res => {
					let {province, city, district, street, streetNum, poiName} = res.address
					let address = province + city + '\n' + district + street + streetNum + '\n' + poiName
					this.sendMsg({
						type: 'location',
						data: {
							latitude: res.latitude,
							longitude: res.longitude,
							address: address
						}
					})
				} 
			})
		},
		
		// 从相册选择图片
		chooseImg({count, type}) {
			return new Promise( resolve => {
				uni.chooseImage({
					success(res) {
						resolve(res.tempFilePaths)
					},
					count,
					sourceType: [type]
				})
			})
		},
		
		sendMsg({type, data, options}) {
			console.log('friendInfo', this.friendInfo)
			let msg = {
				  data,
				  fromAvatar: this.$store.state.user.avatar,
				  toAvatar: this.friendInfo.avatar,
				  toName: this.friendInfo.userName,
				  toId: this.friendInfo._id,
				  fromName: this.$store.state.user.userName,
				  fromId: this.$store.state.user._id,
				  created: 1601616425757,
				  type,
				  options,
				  chatType: 'user',
				  sendFail: false
				}
				
				this.chat.updateChatList(msg)
				this.msgList.push(msg)
				this.inputVal = ''
				this.goBottom()
		}
		
	}
}