<template>
	<view>
		<!-- 导航栏 -->
		<k-nav-bar :fixed="false" title="发布兼职工作" :right="true">
			<k-button-mini @click="submit" slot="right">
				提交
			</k-button-mini>
		</k-nav-bar>

		<u-form :model="form" ref="form">
			<view class="p-1">
				<u-form-item prop="title">
					<u-input v-model="form.title" placeholder="请输入工作标题"></u-input>
				</u-form-item>
				<u-form-item prop="desc">
					<u-input type="textarea" v-model="form.desc" placeholder="请说明岗位要求和工作内容"></u-input>
				</u-form-item>
				<u-form-item prop="adress">
					<u-input placeholder="请输入工作地点" v-model="form.adress"></u-input>
				</u-form-item>
				<u-form-item prop="phone">
					<u-input placeholder="你的手机号" v-model="form.phone"></u-input>
				</u-form-item>
				<view class="flex ai-center my-1">
					<u-form-item prop="salary">
						<text class="iconfont text-error icon-jiage"></text>
						<input type="number" style="width: 200upx;" v-model="form.salary" class="pl-1 fs-md" placeholder-class="fs-sm text-icon" placeholder="请输入工资" />
						<u-number-box bg-color="white" :min="1" :max="30" v-model="salaryNum" @change="salaryNumChange"></u-number-box>
						<view class="pl-2 flex">
							{{salaryDate}}
							<text @click="salaryDateShow = true " class="pl-1 iconfont icon-xiala"></text>
						</view>
					</u-form-item>

					
				</view>
				<u-form-item prop="peopleNum">
					<u-input v-model="form.peopleNum" placeholder="招聘人数" type="number"></u-input>
				</u-form-item>


			<view class="flex ai-center">
				<text>职位类型</text>
			<view class="pl-2 flex">
				{{currentJobType.text}}
				<text @click="jobTypesShow = true " class="pl-1 iconfont icon-xiala"></text>
			</view>
			</view>

			</view>

		</u-form>
		
		<view class="flex jc-between m-1 pr-3">
			<u-button size="medium" class="ml-0" @click="dateShow = true ">选择开始日期</u-button>
			{{workTime[0] }}
		</view>
		
			<view class="flex m-1 jc-between pr-3">
			<u-button size="medium"  class="ml-0" @click="timeShow = true " >选择时间</u-button>
			{{workTime[1]}}
		</view>
		
		<min-popup  heightSize="500" @close="dateClose" :show="dateShow">
		    <min-picker 
		    :endTime="endTime"
		    :startTime="startTimes"
		    @sure="sure"
		    >
		    </min-picker>
		</min-popup>
		
		<u-select @confirm="timeConfirm" title="请选择工作时间" mode="mutil-column" v-model="timeShow" :list="timeList"></u-select>

		<u-action-sheet v-model="salaryDateShow" @click="salaryDateChange" :list="salaryDateOptions"></u-action-sheet>
		
		<u-action-sheet v-model="jobTypesShow" @click="jobTypesChange" :list="jobTypes"></u-action-sheet>
	
	</view>
</template>

<script>
	import minPicker from '@/components/min-picker/min-picker.vue'
	import minPopup from '@/components/min-picker/min-popup.vue'
	
	export default {
		components: {
			minPopup,
			minPicker
		},
		
		data() {
			return {
				startTimes:[2020,6,1],
				endTime: 2046,
				dateShow:false,
				timeList: [
				],
				timeShow: false,
				form: {
					title: '',
					desc: '',
					adress: '',
					phone: this.$store.state.user.phone || '',
					salary: '',
					peopleNum: '',
					salaryDesc: '',
					settlement: '',
					workTime: '',
					type: ''
				},
				workTime: [],
				calendarShow: false,
				salaryDateShow: false,
				jobTypes: [],
				jobTypesShow: false,
				currentJobType: '',
				salaryDateOptions: [{
						text: '天',
						color: ''
					},
					{
						text: '周',
						color: ''
					},
					{
						text: '月',
						color: ''
					},
					{
						text: '小时',
						color: ''
					}
				],

				salaryDate: '天',

				salaryNum: 1,
				
				rules: {
					title: {
						required: true,
						message: '标题不能为空',
						trigger: ['blur']
					},
					desc: {
						required: true,
						message: '该项不能为空',
						trigger: ['change','blur']
					},
					adress: {
						required: true,
						message: '该项不能为空',
						trigger: ['change','blur']
					},
					phone: [
						{
							required: true,
							message: '该项不能为空',
							trigger: ['change','blur']
						},
						{
							validator: (rule, val) => {
								return this.$u.test.mobile(val)
							},
							message: '无效的手机号码',
							trigger: ['change','blur']
						}
					],
					peopleNum: {
						required: true,
						message: '该项不能为空',
						trigger: ['change','blur']
					},
					salary: {
						required: true,
						message: '工资不能为空',
						trigger: ['change','blur']
					}
				}

			}
		},
		
		onLoad() {
			this.$u.api.getTypes({
				type: 'job'
			}).then( res => {
				this.jobTypes = res.map( item => {
					return {
						text: item.name,
						color: '',
						_id: item._id
					}
				})
				
				this.currentJobType = this.jobTypes[0]
				this.jobTypes[0].color = 'blue'
			})
			this.init()
		},
		
		methods: {
			init() {
				let arr = new Array([], [])
				let hour = 24
				let minutes = 60
				
				for(let i = 0; i < arr.length; i++) {
					if(i == 0) {
						for(let k = 0; k < hour; k ++) {
							arr[i].push({
								label: `${k}时`,
								value: `${k}时`
							})
						}
					} else if(i == 1) {
						for(let k = 0; k < minutes; k++) {
							arr[i].push({
								label: `${k}分`,
								value:`${k}分`
							})
						}
					}
				}
				
				this.timeList = arr
			},
			
			timeConfirm(e) {
				this.workTime[1] = e[0].value + e[1].value
			},
			
			// 工资日期数量改变
			salaryNumChange(e, a, b) {
				this.salaryNum = e.value
			},
			
			sure(e) {
				this.workTime[0] = `${e.a}年${e.b}月${e.c}日`
				this.dateShow = false
			},
			
			dateClose() {
				this.dateShow = false
			},
			
			// 工资日期改变
			salaryDateChange(index) {
				this.$sheetColor(this.salaryDateOptions, index)
				this.salaryDate = this.salaryDateOptions[index].text
			},
			
			computedSettlement() {
				let result = (this.salaryDate == '天' || this.salaryDate == '小时' ? '日' :  this.salaryDate )+ '结'
				return result
			},
			
			submit() {
				this.$refs.form.validate( valid => {
					if(!valid) return
				
					// 提交发布工作
					this.form.salaryDesc = this.salaryNum + '/' + this.salaryDate
					this.form.settlement = this.computedSettlement()
					if(!this.workTime[0] || !this.workTime[1]) {
						 uni.showToast({
							 icon: 'none',
							 title: '请选择工作时间'
						 })
						 return
					}
					
					this.form.workTime = this.workTime[0] + ' ' + this.workTime[1]
					this.form.type = this.currentJobType._id
					this.$u.api.releaseJob(this.form).then( res => {
						this.$toast({
							title: '发布成功',
							back: true
						})
					})
					
					// 手机号更新到vuex 本 服务器
					if(!this.$store.state.user.phone) {
						let user = this.$s.get('user')
							user.phone = this.form.phone
						this.$s.set('user', user)
						this.$store.commit('putUser', {
							key: 'phone',
							val: this.form.phone
						})
						
						this.$u.api.putUser({
							phone: this.form.phone
						})
					}
					
				})
			},
			
			// 工作类型改变
			jobTypesChange(index) {
				this.$sheetColor(this.jobTypes, index)
				let item = this.jobTypes[index]
				this.currentJobType = item
				
			}

		},
		
		onReady() {
			this.$refs.form.setRules(this.rules)
		}
		
	}
</script>

<style>

</style>
