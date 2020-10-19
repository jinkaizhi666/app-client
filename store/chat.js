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
		
		// 初始化好友列表
		setFriendList(state, friendList) {
			console.log(friendList)
			state.friendList = friendList
		},
		
		// 进入聊天室 更新当前聊天好友信息
		startChat(state, friendInfo) {
			if(typeof friendInfo == 'string'){
				let index = state.friendList.findIndex( friend => friend.friendId._id == friendInfo)
				console.log(index, state.friendList, friendInfo)
				state.currentFriendInfo = state.friendList[index].friendId
				console.log(index, friendInfo)
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
		initChat({state, commit, rootCommit}) {
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
							index: 3
						})
				}else {
					uni.removeTabBarBadge({
						index: 3
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