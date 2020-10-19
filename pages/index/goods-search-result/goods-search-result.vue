<template>
	<view>
		<k-search-navbar searchType="goods" @typesChange="typesChange" @search="search"></k-search-navbar>
		<!-- 价格 时间排序 -->
		<u-dropdown class="bg-white">
			<u-dropdown-item @change="sort" title="排序" v-model="sortHeightLight" :options="options"></u-dropdown-item>
		</u-dropdown>

		<view class="m-d5">

		</view>
		<!-- 商品搜索结果列表 -->
		<k-goods-list :goodsList="goodsList"></k-goods-list>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				
				searchOptions: {
					keyword: '',
					sort: 'created/-1'
				},

				sortHeightLight: '',
				options: [
					{
						label: '价格从低到高',
						value: 'price/1',
					},
					{
						label: '价格从高到低',
						value: 'price/-1',
					},
					{
						label: '最新发布的',
						value: 'created/-1',
					},
					{
						label: '最早发布的',
						value: 'created/1',
					}
				],
				goodsList: []
			}
		},

		onLoad(query) {
			this.searchOptions.keyword = query.keyword
				this.searchGoodsList(query.typeName)
		},

		computed: {
			currentTypeId() {
				return this.$store.state.searchType.currentType._id
			},
		},
		

		methods: {
		

			searchGoodsList(typeName) {
				let {sort, keyword} = this.searchOptions
				
				this.page = 1
				this.$u.api.searchGoods({
					page: this.page,
					type: typeName ? '' : this.currentTypeId,
					keyword,
					sort,
					typeName: typeName ? typeName : ''
				}).then(res => {
					this.goodsList = res
				})

			},

			typesChange(item) {
				this.searchOptions.type = item._id
			},

			search(keyword) {
				this.searchOptions.keyword = keyword
				// 生成搜索历史记录
				this.searchGoodsList(this.searchOptions)
			},

			sort(value) {
				this.searchOptions.sort = value
				this.searchGoodsList(this.searchOptions)
			}

		},


	}
</script>

<style>

</style>
