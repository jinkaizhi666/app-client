<template>
	<view style="position: relative; height: 100%;">
		
		<k-nav-bar v-if="needLogin">
			<view @click="$back" slot="left" class="iconfont weight3 fs-xxxl icon-guanbi1" >
				
			</view>
		</k-nav-bar>
		
		
		
		<view class="logo-bg flex jc-center" style="background-image: linear-gradient(-45deg, #6182DC, #7C95E6, #35B5E3);">
			<view class="flex flex-column mt-2 ai-center" style="width: 400upx; height: 295upx;">
				<image src="/static/images/logo.png" style="width: 240upx; height: 240upx" class="" mode=""></image>
				<text class="text-font1 fs-xxxl mt-1">校享享源共享平台</text>
			</view>
		</view>

		<!-- 登录卡片 -->
		<view class="card shadow round">
			<view style="height: 350upx; overflow: hidden;">
				<scroll-view :show-scrollbar="true" scroll-y="true" style="height: 350upx;">

					<!-- 登录界面 -->
					<u-form :model="loginForm" ref="loginForm">
						<view class="" v-if="type == 'login' " style="margin-top: 80upx;">
							<view class="flex ml-5 mr-5 ai-center">
								<image src="/static/images/yonghu@2x.png" style="width: 32upx; height: 32upx" mode=""></image>
								<u-form-item prop="account">
									<u-input placeholder-style="font-size: 30upx" class="ml-2" v-model="loginForm.account" placeholder="请输入账号" />
								</u-form-item>
							</view>

							<view class="flex ml-5 mr-5 ai-center" style="margin-top: 80upx;">
								<image src="/static/images/suo@2x.png" style="width: 32upx; height: 32upx" mode=""></image>
								<u-form-item prop="pwd">
									<u-input placeholder-style="font-size: 30upx" type="password" class="ml-2" v-model="loginForm.pwd" placeholder="请输入密码" />
								</u-form-item>
							</view>
						</view>
					</u-form>

					<!-- 注册 -->
					<view class="" v-if="type == 'register' " style="margin-top: 40upx;">
						<u-form :model="registerForm" ref="registerForm">
							<view class="flex ml-5 ai-center">
								<image src="/static/images/yonghu@2x.png" style="width: 32upx; height: 32upx" mode=""></image>
								<u-form-item prop="account">
									<u-input placeholder-style="font-size: 30upx" class="ml-2" v-model="registerForm.account" placeholder="请输入邮箱地址" />
								</u-form-item>

							</view>
							<view class="flex ml-5 mr-5 ai-center">
								<image src="/static/images/suo@2x.png" style="width: 32upx; height: 32upx" mode=""></image>
								<u-form-item prop="pwd">
									<u-input placeholder-style="font-size: 30upx" type="password" class="ml-2" v-model="registerForm.pwd"
									 placeholder="请输入密码" />
								</u-form-item>

							</view>
							<view class="flex ml-5 mr-5 ai-center">
								<image src="/static/images/suo@2x.png" style="width: 32upx; height: 32upx" mode=""></image>
								<u-form-item prop="pwd2">
									<u-input placeholder-style="font-size: 30upx" type="password" class="ml-2" v-model="registerForm.pwd2"
									 placeholder="请重复输入密码" />
								</u-form-item>
							</view>
							<view class="flex ml-5 ai-center">
								<image src="/static/images/code.png" style="width: 32upx; height: 32upx" mode=""></image>
								<u-form-item>
									<u-input placeholder-style="font-size: 30upx" class="ml-2" v-model="registerForm.code" placeholder="请输入验证码" />
								</u-form-item>
								<k-button-mini @click="getCode" class="mr-3">
									获取
								</k-button-mini>
							</view>
						</u-form>
					</view>
				</scroll-view>
			</view>

			<view class="flex row-reserve pr-3 mt-2">
				<text @click="resetPwd">忘记密码</text>
			</view>
			<u-button @click="loginOrReg" style="margin: 20upx auto; width: 500upx;" class="round4" type="primary">{{type == 'login' ? '登录' : '注册'}}</u-button>
			<view class="flex row-reserve pr-3 mt-1">
				<text @click="changeType">{{type == 'login' ? '没有密码? 立即注册' : '返回登录'}}</text>
			</view>
		</view>
		<!-- 第三方登录 -->
		<view class="bottom">
			<view class="flex jc-around ai-center">
				<view class="thread bg-icon">
				</view>
				<text class="fs-xxl">快捷登录</text>
				<view class="thread bg-icon">
				</view>
			</view>
			<!-- qq微信图标 -->
			<view class="flex mt-1 jc-around">
				<image @click="authLogin('qq')" src="/static/images/qq.png" style="width: 100upx; height: 100upx;" mode=""></image>
				<image @click="authLogin('wechat')" src="/static/images/wechat.png" style="width: 100upx; height: 100upx;" mode=""></image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginForm: {
					account: '',
					pwd: ''
				},
				registerForm: {
					account: '',
					pwd: '',
					pwd2: '',
					code: ''
				},
				needLogin: false,
				type: 'login',
				rules: {
					account: [{
							required: true,
							message: '请输入邮箱',
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['blur'],
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: ['blur']
						}
					],
					pwd: [{
							required: true,
							message: '请输入密码',
							trigger: ['blur'],
						},
						{
							min: 8,
							max: 16,
							message: '密码长度必须在8-16位',
							trigger: ['blur']
						},
						{
							pattern: /^[0-9a-zA-Z]*$/g,
							message: '密码只能包含数字和大小写字母',
							trigger: ['blur']
						}
					],
					pwd2: [{
							required: true,
							message: '此项不能为空',
							trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.form.newPwd;
							},
							message: '两次输入密码不一致',
							trigger: ['blur', 'change'],
						}

					],
					code: [{
						required: true,
						message: '请输入验证码',
						trigger: ['blur', 'change'],
					}]

				}
			}
		},

		methods: {
			// 获取验证码
			getCode() {
				console.log('我执行了')
				this.$u.api.getCode({
					adress: this.registerForm.account
				})
			},

			changeType() {
				if (this.type == 'login') {
					this.type = 'register'
					this.$nextTick(() => {
						this.$refs.registerForm.setRules(this.rules);
					})
					return
				}
				if (this.type == 'register') return this.type = 'login'
			},

			// 跳转重置密码页面
			resetPwd() {
				uni.navigateTo({
					url: '/pages/login-register/reset-pwd'
				})
			},

			// 登录和注册
			async loginOrReg() {

				if (this.type == 'login') {
					this.$refs.loginForm.validate(valid => {
						if(!valid) return
							this.$u.api.login(this.loginForm).then(res => {
								this.$store.commit('login', {
									user: res.user,
									token: res.token
								})
							})
					})

				} else {
					let result = await this.$refs.registerForm.validate()
					if (!result) return
					this.$u.api.register({
						...this.registerForm

					}).then(res => {
					
						uni.showToast({
							icon: 'none',
							title: '已为您自动登录'
						})
						this.$store.commit('login', {
							user: res.user,
							token: res.token
						})
					})


				}

			},

			authLogin(type) {
					this.$u.api.login({
						
					}).then( res => {
						console.log(res)
					})
					console.log('request')
			
			}
		},

		onReady() {
			if (this.type == 'login') {
				this.$refs.loginForm.setRules(this.rules)
			}
		},

		onLoad(query) {
			let token = uni.getStorageSync('token')
			if (token) uni.switchTab({
				url: '/pages/index/index'
			})
			if(query.needLogin) this.needLogin = query.needLogin
		}
	}
</script>

<style scoped>
	.logo-bg {
		width: 750upx;
		height: 500upx;
	}

	.card {
		width: 690upx;
		height: 600upx;
		position: absolute;
		background-color: white;
		z-index: 10;
		top: 380upx;
		/* left: 30upx; */
		left: 50%;
		margin-left: -345upx;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 750upx;
		height: 200upx;
	}

	.thread {
		height: 3upx;
		width: 240upx;
	}
</style>
