export default {
	state: {
		...(uni.getStorageSync('user') || {}),
		avatar: '',
		token: uni.getStorageSync('token') || null,
		friendList: []
	},
	
	mutations: {
		login(state, {user, token}) {
			Object.assign(state, user)
			state.token = token
			uni.switchTab({
				url: '/pages/index/index'
			})
			uni.setStorage({
				key: 'token',
				data: token
			})
			uni.setStorage({
				key: 'user',
				data: user
			})
		},
		
		putUser(state, {key, val}) {
			state[key] = val
		}
		
	}
	
}