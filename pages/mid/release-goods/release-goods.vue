<template>
	<view>
		<!-- 导航栏 -->
		<k-nav-bar :fixed="false" title="发布闲置物品" :right="true">
			<k-button-mini @click="submit" slot="right">
				{{flag == 'modifyGoodsInfo' ? '确认修改' : '提交'}}
			</k-button-mini>
		</k-nav-bar>
		
		<u-form :model="form" ref="form">
			
		<view class="px-1">
			<u-form-item prop="title">
				<u-input v-model="form.title" placeholder="请输入标题"></u-input>
			</u-form-item>
			
			<u-form-item prop="desc">
			<u-input v-model="form.desc" type="textarea" placeholder="请说明转手的原因及物品描述"></u-input>
			</u-form-item>
			
			<text>请选择1-7张图片, 第一张将作为封面</text>
			<u-form-item prop="imgs">
			<u-upload :file-list="fileList" max-count="7" @on-remove="remove" @on-success="uploadOk" ref="upload" :action="$upload"></u-upload>
			</u-form-item>
		</view>

			<u-form-item prop="price">
		<u-field v-model="form.price" placeholder="请输入价格" label-width="40">
			<text slot="icon" class="iconfont icon-jiage text-error"></text>
		</u-field>
		</u-form-item>
		

		<view class="flex ai-center">
			<text class="iconfont icon-biaoqian text-primary" style="padding-left: 25upx;"></text>
			<u-form-item prop="tags">
			<view class="flex flex-wrap pl-1 ai-center">
				<u-tag class="m-d5" @close="removeTag(index)"  :closeable="true" mode="dark" v-for="(item, index) in form.tags"
			:key="index" :text="item" type="primary" />
			</view>
			</u-form-item>
		</view>
		
		</u-form>

		<view style="width: 600upx; margin: 20upx auto;" class="flex bg-white flex-wrap ai-center shadow p-1">
			<u-tag @click="addTag(item)" mode="dark" class=" m-d5" v-for="(item, index) in tags" :key="index" :text="item" type="primary" />
			<u-tag @click=" ziDingYiTagShow = true " mode="dark" class=" m-d5" text="自定义" bg-color="#6182dc" />
		</view>

		<view class="flex ai-center mt-3" style="padding-left: 25upx;">
			<text>分类: </text>
			<view class="flex ai-center" style="padding-bottom: 4upx;" @click="typeShow=true">
				<text class="pl-2">{{form.type.text}}</text>
				<text class="iconfont icon-xiala"></text>
			</view>

		</view>

		<!-- 自定义输入标签 -->
		<u-modal :show-cancel-button="true" @confirm="addTag(ziDingYiTagContent)" v-model="ziDingYiTagShow" content="请输入标签内容">
			<u-input class="mx-2" v-model="ziDingYiTagContent" placeholder="请输入标签"></u-input>
		</u-modal>

		<!-- 选择分类sheet -->
		<u-action-sheet @click="selectType" :list="types" v-model="typeShow"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ziDingYiTagShow: false,
				typeShow: false,
				ziDingYiTagContent: '',
				form: {
					imgs: [],
					title: '',
					desc: '',
					price: '',
					tags: [],
					type: ''
				},

				tags: ['不讲价', '九成新', '八成新', '有些旧', '功能没问题'],

				types: [],
				
				fileList: [],
				
				flag: '',
				
				rules: {
					title: {
						required: true,
						message: '标题不能为空',
						trigger: ['blur'],
					},
					desc: {
						required: true,
						message: '商品描述不能为空',
						trigger: ['blur'],
					},
					price: [
						{
							required: true,
							message: '价格不能为空',
							trigger: ['blur'],
						}
					],
					imgs: {
						type: 'array',
						min: 1,
						message: '请至少上传一张商品图片',
						trigger: ['blur'],
					},
					tags: [{
						type: 'array',
						min: 1,
						max: 3,
						message: '标签要在一到三个',
						trigger: ['blur'],
					}]
					
				}
			}
		},

		onLoad(query) {
			this.flag = query.flag
			this.init()
			this.form = this.$decode(query.goodsInfo)
			if(this.flag == 'modifyGoodsInfo') this.fileList = this.form.imgs.map( url => ({url}))
		},
		
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		
		methods: {
			init() {
				this.$u.api.getTypes({
					type: 'goods'
				}).then(res => {
				
					this.types = res.map( (item, index) => {
						return {
							text: item.name,
							color: index == 0 ? 'blue' : '',
							fontSize: 28,
							_id: item._id
						}
					})
					
					if(this.flag == 'modifyGoodsInfo') {
						let index = this.types.findIndex( item => item._id == this.form.type)
						this.form.type = this.types[index]
					} else {
						this.form.type = this.types[0]
					}
				})
			},
			// 提交
			submit() {
				this.$refs.form.setRules(this.rules)
				this.$refs.form.validate( valid => {
					if(!valid) return
					if(this.flag == 'modifyGoodsInfo') {
						this.$u.api.putGoods({
							...this.form,
							query: {
								goodsId: this.form._id
							}
						}).then(res => {
							uni.$emit('modifyGoodsInfo', this.form)
							this.$toast({
								title: '修改成功',
								back: true
							})
						})
					} else {
						this.$u.api.releaseGoods({
							title: this.form.title,
							desc: this.form.desc,
							imgs: this.form.imgs,
							tags: this.form.tags,
							price: this.form.price,
							type: this.form.type._id
						}).then( res => {
							uni.navigateBack()
						})
					}
					
					
				})
			},
			
			// 选择分类
			selectType(index) {
				this.$sheetColor(this.types, index)
				this.form.type = this.types[index]
			},
			
			// 图片上传成功加入formUrls
			uploadOk(data) {
				this.form.imgs.push(data.data)
			},
			
			// 删除图片
			remove(index) {
				this.form.imgs.splice(index, 1)
			},

			// 删除标签
			removeTag(index) {
				this.form.tags.splice(index, 1)
			},
			
			// 添加标签
			addTag(item) {
				this.form.tags.push(item)
				this.ziDingYiTagContent = ''
			}
		}
	}
</script>

<style>

</style>
