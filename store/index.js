import Vuex from 'vuex'
import Vue from 'vue'
import user from './user.js'
import chat from './chat.js'

Vue.use(Vuex)

let store = new Vuex.Store({
	state: {
		keyBoardHeight: 0,
		
		searchType: {
			currentType: {
				text: '所有',
				_id: ''
			}, //name _id
			types: []
		},
		
		jobSearchType: {
			currentType: {
				text: '所有',
				_id: ''
			}, //name _id
			types: []
		},
		
	},
	
	mutations: {
		setKeyBoardHeight(state, height) {
			state.keyBoardHeight = height
		},
		
		setSearchType(state, {key, val}) {
			state.searchType[key]  = val
		},
		
		set(state, {key, val}) {
			let propsStr = `state.${key} = ${JSON.stringify(val)}`
			eval(propsStr)
		}
	},
	
	actions: {
		init({commit, dispatch}) {
			let token = uni.getStorageSync('token')
			function initChat() {
				dispatch("connectSocket")
				dispatch("getFriendList")
			}
			if(token) {
				initChat()
			}
			
			uni.$on('connectSocket', () => {
				initChat()
			})
		},
	
	},
	
	modules: {
		user,
		chat
	}
})

export default store