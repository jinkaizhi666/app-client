import config from '@/common/config.js'
let token = uni.getStorageSync('token')
const install = (Vue) => {
	let vm = Vue.prototype.$u
	// 此为自定义配置参数，具体参数见上方说明
	
	console.log(config.baseUrl)
	
	Vue.prototype.$u.http.setConfig({
			baseUrl: config.baseUrl, // 请求的本域名 
			// method: 'POST',
			// 设置为json，返回后会对数据进行一次JSON.parse()
			dataType: 'json',
			showLoading: false, // 是否显示请求中的loading
			loadingText: '请求中...', // 请求loading中的文字提示
			loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
			originalData: false, // 是否在拦截器中返回服务端的原始数据
			loadingMask: false, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
			// 配置请求头信息
			header: {
				'content-type': 'application/json;charset=UTF-8',
			},
	});
	
	// 请求拦截部分，如配置，每次请求前都会执行，见上方说明
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// ......
		if(!token) token = uni.getStorageSync('token') 
		config.header.token = token
	
		
		// if(config.url.includes('/upload')) {
		// 	config.header['content-type'] = 'multipart/form-data'
		// }
		
		console.log(config)
		return config;
	}
	
	// 响应拦截，如配置，每次请求结束都会执行本方法
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if(res.code == 200 && res.msg != 'ok') {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
				vm.toast(res.msg)			
			return res.data;
		} else if(res.code == 400 && res.msg != "fail") {
			// 假设201为token失效，这里跳转登录
			vm.toast(res.msg);
		
			return false;
		} else if (typeof res.data === 'boolean'){
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return {
				result: res.data
			}
		} else if( res.code == 200 && res.data) {
			return res.data
		}
	}
	
}

export default {
	install
}