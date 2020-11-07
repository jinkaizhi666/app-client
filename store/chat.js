import socket from '@/js_sdk/socket-io/weapp.socket.io.js'
import config from '@/common/config.js'
let token = uni.getStorageSync('token')
let user = uni.getStorageSync('user')
import Chat from '@/common/Chat.js'
import api from '@/common/http.api.js'

export default {
	state: {
		chatList: [], //所有会话列表
		currentFriendInfo:{}, //当前会话列表
		io: null, //socket.io实列对象
		chat: null,
		friendList: [],
		tabBarMsgNum: 0, //底部导航栏消息数量
	},
	
	mutations: { 
		initIo(state, io) {
			state.io = io
		},
		
		initChatObj(state, chat) {
			state.chat = chat
		},
		
		initTabBarMsgNum(state) {
			let num =  this._vm.$s.get('tabBarMsgNum') 
			state.tabBarMsgNum = num > 0 ? num : 0,
			uni.$emit('setTabBarMsgNum')
		},
		
		setTabBarMsgNum(state) {
			let num = 0
			state.chatList.forEach( chat => {
				num += chat.noReadNum
			})
			state.tabBarMsgNum = num
			this._vm.$s.set('tabBarMsgNum', num)
			uni.$emit('setTabBarMsgNum')
		},
		
		delFriend(state, index) {
			state.friendList.splice(index, 1)
			// Vue.set(state, 'friendList', state.friendList)
			// state.friendList = []
			// console.log('delFriend', index, state.friendList)
		},
		
		// 初始化好友列表
		setFriendList(state, friendList) {
			console.log(friendList)
			state.friendList = null
			state.friendList = friendList
		},
		
		// 进入聊天室 更新当前聊天好友信息
		startChat(state, friendInfo, index) {
			if(typeof friendInfo == 'string'){
				let index = state.friendList.findIndex( friend => friend.friendId._id == friendInfo)
				if(index == -1) {
					uni.showToast({
						title: '你们已经不是好友关系'
					})
					state.chat.delChatList(index)
					return
				}
				console.log(index, state.friendList, friendInfo)
				state.currentFriendInfo = state.friendList[index].friendId
				console.log(state.currentFriendInfo)
				return
			}
			state.currentFriendInfo = friendInfo
		},
		
		updateChatList(state, chatList) {
			state.chatList = chatList
		},
		
		commitResetChatListItemNoReadNum(state, i) {
			state.chatList[i].noReadNum = 0
		},
		
		
		
		
	},
	
	actions: {
		initChat({state, dispatch, commit, rootCommit}) {
			// let chatList = this._vm.$s.get('')
			let chatList = state.chat.getChatList()
			commit('updateChatList', chatList)
			commit('initTabBarMsgNum')
		},
		
		// 初始化socket
		connectSocket({state, dispatch, commit}) {
			// socket.io
			const  io = socket(`${config.socketUrl}?token=${token}`)
			commit('initIo', io)
			io.on('connect', function(){
				console.log('socket 连接成功!')
			})
			io.on('connect_error', function(){
				console.log('socket 出错!')
			})
			io.on('disconnect', function(){
				console.log('socket 断开!')
			})
			io.on('reconnect', function(){
				console.log('socket 重连!')
			})
			let userInfo = uni.getStorageSync('user') || {}
			
			let chat = new Chat(userInfo, this._vm)
			commit('initChatObj', chat)
			dispatch('handleChatEvent')
			dispatch('handleSocketMsg')
			dispatch('initChat')
			
			
		},
		
		// 处理更新state的chat事件
		handleChatEvent({commit, state}) {
			uni.$on('onUpdateChatList', newList =>{
				commit('updateChatList', newList)
				commit('setTabBarMsgNum')
			})
			
			uni.$on('setTabBarMsgNum', () => {
				if(state.tabBarMsgNum > 0) {
					uni.setTabBarBadge({
							text: String(state.tabBarMsgNum),
							// #ifdef H5
							index: 3
							// #endif
							// #ifndef H5
							index:2
							// #endif
						})
				}else {
					uni.removeTabBarBadge({
						// #ifdef H5
						index: 3
						// #endif
						// #ifndef H5
						index:2
						// #endif
					})
				}
			
			})
			
		},
		
		resetChatListItemNoReadNum({state, commit}, chatId) {
			for(let i = 0; i < state.chatList.length; i++) {
				if(state.chatList[i]._id == chatId) {
					console.log(i)
					commit('commitResetChatListItemNoReadNum', i)
					state.chat.setChatList(state.chatList, user._id)
				}
				
			}
			commit('setTabBarMsgNum')
		},
		
		// 获取好友列表
		getFriendList({commit, state, rootState }) {
				this._vm.$u.api.getFriendList().then( res =>{
					commit('setFriendList', res)
					// state.friendList = res
				})
		},
		
		// 处理收到的socket消息
		handleSocketMsg({state, dispatch, commit}) {
			let {io} = state
			io.on('connect', () => {
				console.log('socket已经连接')
				dispatch('getOfflineMsg')
			})  
			 
			io.emit('test', 'kkk')
			
			io.on('userMsg', message => {
				console.log('text~~~', message)
				console.log( uni.getStorageSync('user')._id)
				state.chat.updateChatList(message)
				uni.$emit('updateMsgList', message)
			})
		},
		
		getOfflineMsg() {
			this._vm.$u.api.getOfflineMsg().then()
		}
		
	},
	
}