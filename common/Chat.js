import commonUtils from '@/common/util.js'
import utils from '@/common/util.js'
// import apis from '@/common/http.api.js'
import $store from '@/store/index.js'

export default class Chat {
	constructor(userInfo, vm) {
		this.vm = vm
		this.userInfo = userInfo
		// this.friendInfo = friendInfo
		this.isCurrentChat = false
	}
	
	// 进入聊天室创建聊天对象
	createChat() {
		this.isCurrentChat = true
	}
	
	closeChat() {
		this.isCurrentChat = false
	}
	
	getChatList() {
		return utils.$s.get('chatList_' + this.userInfo._id) || []
	}
	
	formatChatListData(message, isMeSendMsg) {
		console.log(message)
		let data = message.data
		let noReadNum = 0
		switch(message.type) {
			case 'img' :
				data = '[图片]'
			break
			
			case 'emotion' :
				data = '[表情]'
			break
			
			case 'location' :
				data = '[位置信息]'
			break
			
			case 'audio' :
				data = '[录音消息]'
			break
			
			case 'system.friendApply' :
			console.log('收到好友申请!!!')
				return {
					_id: 'system.friendApply',
					// avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2866953378,474015488&fm=11&gp=0.jpg',
					userName: '+好友请求列表+',
					data: '[点击查看好友申请列表]',
					noReadNum: 0,
					chatType: 'system.friendApply',
					time: commonUtils._time(Date.now())
				}
			break
			
			case 'system.friendApply.agree' :
				data = '你们已经成为好友，可以开始聊天了！'
				if(isMeSendMsg) noReadNum = 1
				$store.dispatch('getFriendList')
			break
		}
		
		return {
			_id: isMeSendMsg ? message.toId : message.fromId,
			avatar: isMeSendMsg ? message.toAvatar : message.fromAvatar,
			userName: isMeSendMsg ? message.toName : message.fromName,
			data,
			noReadNum,
			chatType: message.chatType,
			time: commonUtils._time(Date.now())
		}
	}
	
	/*
	{
	  data: '你好啊',
	  fromAvatar: '',
	  toAvatar: '',
	  toId: '5f6c995d5c32cd61588a3248',
	  fromId: '',
	  fromName: '',
	  toName: '',
	  created: Date.now(),
	  type: 'text',
	  chatType: [user, system]
	},
	*/
	
	addHistory(message, friendId) {
		utils.$s.push('history_' + this.userInfo._id + '_' + friendId, message)
	}
	
	getHistory(friendId) {
		return utils.$s.get('history_' + this.userInfo._id + '_' + friendId) || []
	}
	
	setChatList(chatList, userId) {
		utils.$s.set('chatList_' + userId, chatList)
	}
	
	delChatList(index) {
		let chatList = this.getChatList()
		chatList.splice(index, 1)
		this.setChatList(chatList, this.userInfo._id)
		uni.$emit('onUpdateChatList', chatList)
	}
	
	async updateChatList(message) {
		let chatList = this.getChatList()
		let friendInfo = $store.state.chat.currentFriendInfo
		let isMeSendMsg = message.toId != this.userInfo._id
		console.log( message.toId !== this.userInfo._id)
		
		let friendId = isMeSendMsg ? message.toId : message.fromId
		this.friendId = friendId
		// console.log(chatList, 'jjj')
		let index
		let chatData = this.formatChatListData(message, isMeSendMsg)
		// if(isMeSendMsg) {
			index = chatList.findIndex( chat => chat._id == chatData._id )
		// }else {
			// index = chatList.findIndex( chat => chat._id == chatData._id )
		// }
		let isInChatList = index == -1 ? false : true
		
		let isCurrentChatMsg //是否是当前聊天对象发的消息
		// $store
		if(this.isCurrentChat) {
			isCurrentChatMsg = isMeSendMsg ? message.toId == friendInfo._id : message.fromId == friendInfo._id
		}
		if(isMeSendMsg && (message.type== 'img' || message.type== 'audio')) {
			let uploadUrl
			try{
				uploadUrl = await utils.$uploadFiles(message.data)
			}catch(e){
				message.sendFail = true
			}
			message.data = uploadUrl
		}
		
		if(isMeSendMsg && isInChatList) {
			chatList[index] = chatData
			console.log('我发送的当前聊天', index)
		} else if(isMeSendMsg && !isInChatList) {
			chatList.push(chatData)
			console.log('我发送的不是当前聊天')
		}
		
		if(!isMeSendMsg && isInChatList) {
			if(!isCurrentChatMsg) chatData.noReadNum = chatList[index].noReadNum + 1
			chatList[index] = chatData
			console.log('我接受的当前聊天')
		} else if(!isMeSendMsg && !isInChatList) {
			chatData.noReadNum = 1
			chatList.push(chatData)
			console.log('我接受的非当前聊天')
		}
		
		this.addHistory(message, friendId)
		this.setChatList(chatList, this.userInfo._id)
		
		if(isMeSendMsg) {
			this.vm.$u.api.sendMsg({
				message
			}).then( res => {
				
			})
		}
		
		console.log('chatlist', chatList)
		
		uni.$emit('onUpdateChatList', chatList)
		
		
	}
}