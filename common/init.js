import config from '@/common/config.js'
import {mapState} from 'vuex'
import utils from '@/common/util.js'
function install (Vue) {
	
		let token = uni.getStorageSync('token')
	
	for(let key in utils) {
		let func = utils[key]
		Vue.prototype[key] = func
	}
	
	
	
	Vue.prototype.$user = uni.getStorageSync('user')
	
	Vue.prototype.$filePath = file => {
		if(file.includes('http://')) return file
		return config.filePath + file
	}
	// #ifdef APP-PLUS
		Vue.prototype.$statusBarHeight = uni.getSystemInfoSync().statusBarHeight 
	// #endif
	Vue.prototype.$upload = `${config.baseUrl}/upload?token=${token}`
	
	Vue.prototype.$sheetColor = (list, index) => {
		let item = list[index]
		list.forEach(item => {
			item.color = ''
		})
		item.color = '#6182dc'
	}
	
	Vue.prototype.$encode = (data) => {
		return encodeURIComponent(JSON.stringify(data))
	}
	
	Vue.prototype.$decode = (data) => {
		return JSON.parse(decodeURIComponent(data))
	}
	
	Vue.prototype.$mapState = mapState
	
	Vue.prototype.$color = {
		primary: '#472f71',
		primary2: '#5e7ed6',
		primary3: '#ecdd9e',
		warning: '#ff9900',
		success: '#19be6b',
		info: '#909399',
		error: '#fa3534',
		bg: '#f4f2f7',
		icon: '#999999',
		font1: '#333333',
		font2: '#666'
	}
}


export default {
	install
}