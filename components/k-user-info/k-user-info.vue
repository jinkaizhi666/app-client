<template>
	<view>
			<u-field :disabled="!edit" v-model="userInfo.gender" label="性别" placeholder="">
			</u-field>
			<u-field :disabled="!edit" v-model="userInfo.age" label="年龄" placeholder="">
			</u-field>
			<u-field :disabled="!edit" v-model="userInfo.grade" label="年级" placeholder="">
			</u-field>
			<u-field :disabled="!edit" v-model="userInfo.scholl" label="学校" placeholder="">
			</u-field>
			<u-field :disabled="!edit" v-model="userInfo.phone" label="手机号码" placeholder="">
			</u-field>
			<u-field :disabled="!edit" v-model="userInfo.skill" label="擅长技能" placeholder="">
			</u-field>
		
		<view class="m-1">
			<view>个人简介</view>
			<u-input :disabled="!edit" placeholder="这个人太懒了, 什么都没有写" type="textarea">
				{{userInfo.desc}}
			</u-input>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			edit: {
				default: false
			},
			
			userInfo: Object
		}
		
	}
</script>

<style>

</style>
