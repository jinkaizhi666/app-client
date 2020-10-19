import config from '@/common/config.js'
import commonUtils from '@/common/common-utils.js'

function unique(array) {
	// res用来存储结果
	var res = [];
	for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
		for (var j = 0, resLen = res.length; j < resLen; j++) {
			if (array[i] === res[j]) {
				break;
			}
		}
		// 如果array[i]是唯一的，那么执行完循环，j等于resLen
		if (j === resLen) {
			res.push(array[i])
		}
	}
	return res;
}

const token = uni.getStorageSync('token')

export default {
	...commonUtils,
	$s: {
		get(key) {
			return uni.getStorageSync(key)
		},

		set(key, val) {
			uni.setStorage({
				key,
				data: val
			})
		},

		clear() {
			uni.clearStorage()
		},

		del(key) {
			uni.removeStorage({
				key
			})
		},

		/**
		 * @param {string} 列表名字  
		 * @param {any} push的元素  
		 * @param {object} {
			 reserve: 是否插入数组前面 false,
			 set: 是否去重插入 false
		 }  
		 * */

		push(listName, item, options = {
			reserve: false,
			set: false
		}) {

			

			let {
				reserve,
				set
			} = options
			uni.getStorage({
				key: listName,
				success(res) {
					let list = res.data
					if (reserve) {
						list.unshift(item)
					} else {
						list.push(item)
					}
					if (set) list = unique(list)
					uni.setStorage({
						key: listName,
						data: list
					})
					console.log(list)
				},

				fail() {
					let list = []

					if (reserve) {
						list.unshift(item)
					} else {
						list.push(item)
					}
					if (set) list = unique(list)
					uni.setStorage({
						key: listName,
						data: list
					})

					console.log(list)
				}
			})
		}
	},
	
	$toast(options) {
		if(typeof opitons === 'string') {
			uni.showToast({
				icon: 'none',
				title: options,
				duration: 2000
			})
		} else if(typeof options === 'object') {
			let {title, duration = 2000, icon = 'none', back, url} = options
			uni.showToast({
				title,
				duration,
				icon:icon
			})
			if(back) {
				setTimeout( () => {
					uni.navigateBack()
				}, duration)
			} else if(url) {
				setTimeout( () => {
					uni.navigateTo({
						url
					})
				}, duration)
			}
		}
	},
	
	$uploadFiles(path) {
		return new Promise( (resolve, reject) => {
			uni.uploadFile({
				name: 'files',
				filePath: path,
				url: config.uploadUrl,
				success: res => {
					let data = JSON.parse(res.data)
					resolve(data.data)
				},
				fail: err => {
					reject(err)
				},
				header: {
					token
				}
			})
		} )
		
	},
	
	$back() {
		uni.navigateBack()
	}


}
