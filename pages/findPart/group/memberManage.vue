<template>
	<view class="memberManage">
		<view class="headCard u-flex">
			<image src="/static/common/image/card1.png" mode="" class="cardImg"></image>
			<view class="info">
				<text class="groupName">颜控大学闲置物品交流群</text>
				<text class="groupId">ID：5233789568990</text>
			</view>
		</view>
		
		<view class="memberCon">
			<view class="memberItem" v-for="item in [1,2]">
				<image src="/static/common/image/card1.png" mode="" class="headIcon"></image>
				<text class="userName">隔壁阿花</text>
			</view>
			<view class="memberItem" @click="goEditMember('add')">
				<image src="/static/common/image/memberAdd.png" mode="" class="headIcon"></image>
				<text class="userName">添加</text>
			</view>
			<view class="memberItem" @click="goEditMember('delete')">
				<image src="/static/common/image/memberDelete.png" mode="" class="headIcon"></image>
				<text class="userName">删除</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			goEditMember(e){
				console.log(e);
				uni.navigateTo({
					url:'./eidtMemberNumber?do=' + e
				})
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
		background-color: #F6F6F6;
	}
</style>

<style lang="scss" scoped>
	.memberManage{
		padding-top: 16rpx;
		.headCard{
			width: 100%;
			height: 200rpx;
			background: #FFFFFF;	
			.cardImg{
				width: 108rpx;
				height: 108rpx;
				margin-left: 48rpx;
			}
			.info{
				display: flex;
				flex-direction: column;
				margin-left: 32rpx;
				.groupName{
					font-size: 32rpx;
					font-weight: 500;
					color: #000000;
				}
				.groupId{
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					margin-top: 8rpx;
				}
			}
		}
		
		.memberCon{
			display: flex;
			flex-wrap: wrap;
			margin-top: 16rpx;
			padding: 6rpx 24rpx 46rpx ;
			background-color: #FFFFFF;
			.headIcon{
				width: 84rpx;
				height: 84rpx;
			}
			.memberItem{
				margin: 0 28rpx;
				margin-top: 40rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.userName{
					font-size: 20rpx;
					font-weight: 400;
					color: #999999;
					margin-top: 8rpx;
				}
			}
		}
	}
</style>
