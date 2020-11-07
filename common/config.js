// let env = 'dev' //dev prod
let env = 'prod' //dev prod

let host = '192.168.0.2'
let port = 7001
if(env != 'dev') host = '59.110.240.201'
let baseUrl
// #ifndef H5
	baseUrl = 'http://' + host + ':' + port
	// #endif
	// #ifdef H5
	baseUrl = '/api'
	// #endif
    let filePath
	if(env == 'dev') filePath = '/static/demo/'
	else filePath = ''

// if(env == 'dev') {
// } else if(env == 'prod') {
// 	var socketUrl = 'ws://' + host + ':' + port + '/ws'
// }
// var socketUrl = 'ws://' + host + ':' + port + '/'
var socketUrl = 'http://' + host + ':' + port + '/'
	
export default {
	baseUrl,
	socketUrl,
	filePath,
	uploadUrl: `${baseUrl}/upload`
}