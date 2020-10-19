export default {
	_time(date) {
		let now = new Date()
		let formatDate = new Date(date)
		// 现在时间年月日时分秒
		let Y = now.getFullYear()
		let m = now.getMonth()
		let d = now.getDate()
		let h = now.getHours()
		let M = now.getMinutes()
		// 过去时间年月日时分秒
		let _Y = formatDate.getFullYear()
		let _m = formatDate.getMonth() + 1
		let _d = formatDate.getDate()
		let _h = formatDate.getHours()
		let _M = formatDate.getMinutes()
		
		if(_h < 10) _h = '0' + _h
		if(_M < 10) _M = '0' + _M
		if(_d < 10) _d = '0' + _d
		
		if(Y == _Y && m == M && d == _d) {
			
			
			return `${_h}:${_M}`
		} else if(Y == _Y && m == M && d == _d + 1) {
			return `昨天${_h}:${_M}`
		} else {
			return `${_Y}-${_m}-${_d} ${_h}:${_M}`
		}
		
	},
	
	_createDebouncer() {
		let flag = true
		return function(fn, delay = 1000) {
			if(!flag) return
			fn && fn()
			flag = false
			setTimeout( () => {
				flag = true
			}, delay)
		}
	},
	
	_isInDuration(time1, time2, duration = 300000) {
		let now = (new Date(time1)).getTime()
		let before = (new Date(time2)).getTime()
		if(Math.abs(now - before) > duration) {
			return false
		}
		return true
	}
	
}