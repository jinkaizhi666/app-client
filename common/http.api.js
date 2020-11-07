// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let getUrls = {
	getTypes: '/get-types',
	searchGoods: '/search-goods',
	isFav: '/is-fav', //查询是否收藏
	getFav: '/get-fav',
	getReleaseGoods: '/get-release-goods',
	getUserInfo: '/user-info',
	searchJob: '/search-job',
	getJobOrder: '/job-order',
	getJobBaoMing: '/job-bao-ming',
	searchUser: '/search-user',
	getApplyList: '/get-friend-apply',
	getFriendList: '/get-friend-list',
	getOfflineMsg: '/offline-msg'
}

let postUrls = {
	register: '/register',
	getCode: '/get-code',
	login: '/login',
	releaseGoods: '/release-goods',
	fav: '/fav',
	releaseJob: '/release-job',
	genJobOrder: '/gen-job-order',
	addFriend: '/add-friend',
	sendMsg: '/send-msg'
	
}

let putUrls = {
	resetPwd: '/reset-pwd',
	putUser: '/user-info',
	putGoods: '/put-goods',
	handleFriendApply: '/handle-friend-apply'
}

let deleteUrls = {
	deleteFav: '/delete-fav',
	delFriend: '/del-friend',
}

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
let apis
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	vm.$u.api = {}
	let api = vm.$u.api
	for(let key in postUrls) {
		let url = postUrls[key]
		api[key] = (params = {}) => {
			if(!params.query) return vm.$u.post(url, params)
			return vm.$u.post(url + vm.$u.queryParams(params.query) , params)
		};
	}
	
	for(let key in putUrls) {
		let url = putUrls[key]
		api[key] = (params = {}) => {
			if(!params.query) return vm.$u.put(url, params)
			return vm.$u.put(url + vm.$u.queryParams(params.query) , params)
		};
	}
	
	for(let key in getUrls) { 
		let url = getUrls[key]
		api[key] = (params = {}) => vm.$u.get(url, params);
	}
	
	for(let key in deleteUrls) {
		let url = deleteUrls[key]
		api[key] = (params = {}) => {
			if(!params.query) return vm.$u.delete(url, params)
			return vm.$u.put(url + vm.$u.queryParams(params.query) , params)
		};
	}
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	return api
	console.log(apis)
}

export default {
	install
}