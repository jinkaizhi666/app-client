<template>
	<view style="padding: 30upx;">
		<u-form label-width="140" :model="form" ref="form">

			<u-form-item label="账号" prop="account">
				<u-input v-model="form.account" placeholder="请输入邮箱地址"></u-input>
			</u-form-item>
			<u-form-item label="新密码" prop="newPwd">
				<u-input type="password" v-model="form.newPwd" placeholder="请输入新密码"></u-input>
			</u-form-item>
			<u-form-item label="重复密码" prop="newPwd2">
				<u-input type="password" placeholder="请重复密码" v-model="form.newPwd2"></u-input>
			</u-form-item>
			<view class="flex ai-center">
				<u-form-item label="验证码" prop="code">
					<u-input v-model="form.code" placeholder="邮箱验证码"></u-input>
				</u-form-item>
				<u-button @click="getCode" type="primary" class="mr-3" shape="circle" size="mini">获取</u-button>
			</view>
		</u-form>
		<k-button @click="resetPwd"> 重置密码 </k-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					account: '',
					newPwd: '',
					newPwd2: '',
					code: ''
				},
				
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
					newPwd: [{
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
					newPwd2: [{
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
			getCode() {
				if(this.$u.test.email(this.form.account)) {
						this.$u.api.getCode({
							adress: this.form.account
						}).then( res => {
							
					})
				} else {
					this.$u.toast('请输入正确邮箱地址')
				}
					
			
			},

			resetPwd() { 
				this.$refs.form.validate(valid => {
					if(!valid) return
					this.$u.api.resetPwd({
						pwd: this.form.newPwd,
						code: this.form.code,
						account: this.form.account
					}).then( res => {
						uni.navigateBack()
					})
				})
			}
		},

		onReady() {
			this.$refs.form.setRules(this.rules)
		}
	}
</script>

<style>

</style>
