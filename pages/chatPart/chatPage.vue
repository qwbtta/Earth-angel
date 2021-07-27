<template>
	<view class="chatPage">
		<u-navbar title="大张伟"></u-navbar>
		<view class="head u-flex">
			<image src="/static/common/image/card1.png" mode="aspectFit" class="goodsImg"></image>
			<view class="info">
				<text class="title">不规则设计感花瓶</text>
				<text class="tips">赠送之前聊一聊</text>
			</view>
		</view>
		<view class="footer">
			<image src="" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chatPage{
		.head{
			width: 750rpx;
			height: 176rpx;
			background: #DAFFF9;
			.goodsImg{
				width: 116rpx;
				height: 116rpx;
				margin-left: 48rpx;
				
			}
			.info{
				display: flex;
				flex-direction: column;
				margin-left: 32rpx;
				.title{
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
				}
				.tips{
					font-size: 28rpx;
					font-weight: 400;
					color: #666666;
					margin-top: 8rpx;
				}
			}
		}
	}
</style>
