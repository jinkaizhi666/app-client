import Vue from 'vue'
import App from './App'

import uView from 'uview-ui';

import registerGlobalComponent from '@/util/init.js'
Vue.config.productionTip = false

import store from '@/store/index.js'

Vue.use(uView);


Vue.use(httpInterceptor)

App.mpType = 'app'

import init from '@/common/init.js'
Vue.use(init)


const app = new Vue({
    ...App,
	store
})
// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()
