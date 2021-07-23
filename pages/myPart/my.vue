<template>
	<view class="my">
		<view class="top">
			<view class="head u-flex">
				<image src="/static/common/image/tab-chat-selected.png" mode="" class="headIcon"></image>
				<view class="nameCon">
					<text class="name">九尺办呀爱好者</text>
					<text class="id">ID: 54566sad65456</text>
				</view>
			</view>
			<view class="main">
				<view class="item" @click="goContacts">
					<image src="/static/common/image/contacts.png" mode="" class="mainImg"></image>
					<text>联系人</text>
				</view>
				<view class="item" @click="goGoodsHome">
					<image src="/static/common/image/home.png" mode="" class="mainImg"></image>
					<text>闲置主页</text>
				</view>
				<view class="item"  @click="goGoodsList('received')">
					<image src="/static/common/image/received.png" mode="" class="mainImg"></image>
					<text>收到物品</text>
				</view>
				<view class="item" @click="goGoodsList('gave')">
					<image src="/static/common/image/give.png" mode="" class="mainImg"></image>
					<text>我的赠送</text>
				</view>
				
				
			</view>
		</view>
		<view class="body">
			<view class="item">
				<view class="left">
					<image src="/static/common/image/modifyMyName.png" mode="" class="bodyImg"></image>
					<text>修改名称</text>
				</view>
				<image src="/static/common/image/arrow.png" mode="" class="arrow"></image>
			</view>
			<view class="item" @click="goNotice">
				<view class="left">
					<image src="/static/common/image/notice.png" mode="" class="bodyImg"></image>
					<text>通知</text>
				</view>
				<image src="/static/common/image/arrow.png" mode="" class="arrow"></image>
			</view>
			<view class="item">
				<view class="left">
					<image src="/static/common/image/help.png" mode="" class="bodyImg"></image>
					<text>帮助与反馈</text>
				</view>
				<image src="/static/common/image/arrow.png" mode="" class="arrow"></image>
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
			goContacts(){
				uni.navigateTo({
					url:'./contacts' 
				})
			},
			goGoodsHome(){
				uni.navigateTo({
					url:'./goodsHome/goodsHome' 
				})
			},
			goNotice(){
				uni.navigateTo({
					url:'./notice' 
				})
			},
			goGoodsList(e){
				uni.navigateTo({
					url:'./goodsList?where=' + e
				})
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
		background: #F4FFFD;
	}
</style>
<style lang="scss" scoped>
	.my{
		padding: 0 40rpx;
		border-top: 1px solid #DBDEE3;
		.top{
			height: 416rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 8rpx 6rpx rgba(0, 0, 0, 0.08);
			border-radius: 20rpx;
			margin-top: 42rpx;
			padding-top: 60rpx;
			.head{
				margin-left: 7%;
				.headIcon{
					width:120rpx;
					height: 120rpx;
					border-radius: 120rpx;
				}
				.nameCon{
					margin-left: 40rpx;
					display: flex;
					flex-direction: column;
					.name{
						font-size: 36rpx;
						font-weight: 500;
						color: #333333;
						
					}
					.id{
						font-size: 24rpx;
						font-weight: 400;
						color: #666666;
						margin-top: 6rpx;
					}
				}
				
			}
			.main{
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				margin-top: 48rpx;
				.item{
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 26rpx;
					font-weight: 500;
					color: #333333;
					.mainImg{
						width: 84rpx;
						height: 84rpx;
						margin-bottom: 16rpx;
					}
				}
			}
		}
		.body{
			height: 350rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 8rpx 6rpx rgba(0, 0, 0, 0.08);
			border-radius: 20rpx;
			margin-top: 40rpx;
			padding: 0 50rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			.item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left{
					display: flex;
					align-items: center;
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					.bodyImg{
						width: 44rpx;
						height: 44rpx;
						margin-right: 20rpx;
					}
				}
				
				.arrow{
					width: 20rpx;
					height: 34rpx;
				}
			}
		}
	}
</style>