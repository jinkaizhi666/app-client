let host = '192.168.0.2'
let port = 7001
let env = 'dev' //dev prod

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

const socketUrl = 'http://' + host + ':' + port + '/'
	
export default {
	baseUrl,
	socketUrl,
	filePath,
	uploadUrl: `${baseUrl}/upload`
}