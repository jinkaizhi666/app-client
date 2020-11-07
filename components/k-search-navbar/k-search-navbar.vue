<template>
	<view>
		<u-navbar :background="{backgroundColor: '#ebe9ee'}">
			<view style="width: 100%;" class="flex ai-center">
				<view class="flex ai-center  flex1" style="height: 60upx; overflow: hidden;">

					<!-- 搜索类型 -->
					<view v-if="types.length > 0" @click="typeShow = true " class="p-1 bg-white flex ai-center" style="border-radius: 100upx 0 0 100upx;">
						{{currentType}}
						<text class="iconfont icon-xiala fs-sm" style="padding-top: 10upx; padding-left: 5upx; padding-right: 10upx; border-right: 2upx solid #333333;"></text>
					</view>

					<!-- 搜索框 -->
					<input :auto-focus="true" @confirm="search" v-model="keyword" style="border-radius: 0 100upx 100upx 0; height: 60upx;" class="bg-white flex1 px-1 fs-md"
					 placeholder="请输入搜索内容" placeholder-class="fs-md" />
				</view>

				<!-- 搜索按钮 -->
				<view class="p-1">
					<k-button-mini @click="search">搜索</k-button-mini>
				</view>
			</view>
		</u-navbar>

		<!-- 选择分类sheet -->
		<u-action-sheet @click="selectType" :list="types" v-model="typeShow"></u-action-sheet>

	</view>
</template>

<script>
	export default {
		props: {
			searchType: String
		},
		
		data() {
			return {
				keyword: '',

				typeShow: false, //显示类型sheet

			}
		},

		created() {
			 if (this.searchType == 'job' && this.$store.state.jobSearchType.types.length == 0) {
				this.getJobTypes()
			}else if(this.$store.state.searchType.types.length == 0){
					this.getTypes()
			}
		},

		computed: {
			currentType() {
				if(this.searchType == 'job') {
					return this.$store.state.jobSearchType.currentType.text
				} else {
					return this.$store.state.searchType.currentType.text
				}
			},
			
			types() {
				if(this.searchType == 'job') {
					return this.$store.state.jobSearchType.types
				} else {
					return this.$store.state.searchType.types
				}
			}
		},

		methods: {
			selectType(index) {
				this.$sheetColor(this.types, index)
				let select = this.types[index]
				if(this.searchType == 'job') {
					this.$store.commit('set', {
						key: 'jobSearchType.currentType',
						val: select
					})
				} else {
					this.$store.commit('setSearchType', {
						key: 'currentType',
						val: select
					})
				}

			},

			getJobTypes() {
				this.$u.api.getTypes({
					type: 'job'
				}).then(res => {
					let types = res.map((item, index) => {
						return {
							text: item.name,
							color: '',
							fontSize: 28,
							_id: item._id
						}
					})

					types.unshift({
						text: '所有',
						color: 'blue',
						fontSize: 28,
						_id: ''
					})

					this.$store.commit('set', {
						key: 'jobSearchType.types',
						val: types
					})
					this.$store.commit('set', {
						key: 'jobSearchType.currentType',
						val: types[0]
					})
				})

			},

			getTypes() {
				this.$u.api.getTypes({
					type: 'goods'
				}).then(res => {
					let types = res.map((item, index) => {
						return {
							text: item.name,
							color: '',
							fontSize: 28,
							_id: item._id
						}
					})

					types.unshift({
						text: '所有',
						color: 'blue',
						fontSize: 28,
						_id: ''
					})
					this.$store.commit('setSearchType', {
						key: 'types',
						val: types
					})
					this.$store.commit('setSearchType', {
						key: 'currentType',
						val: types[0]
					})

				})
			},

			search() {
				this.$emit('search', this.keyword)
			},

		},



		}
</script>

<style>

</style>
