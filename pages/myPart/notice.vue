<template>
	<view class="notice">
		<text class="title">待处理</text>
		<view class="main">
			<view class="noticeItem" v-for="item in [1,1,5,41]">
				<view class="left u-flex">
					<image src="/static/common/image/card1.png" mode="" class="itemImg"></image>
					<view class="info">
						<text class="user">叠翠峰小区闲置交流群</text>
						<text class="behavior">邀请你加入群聊</text>
					</view>
				</view>
				<button type="default" class="btn">同意</button>
			</view>
			
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
<style>
	page{
		height: 100%;
		background-color: #F1F1F1;
	}
</style> 

<style lang="scss" scoped>
	.notice{
		padding: 28rpx 48rpx ;
		.title{
			font-size: 32rpx;
			font-weight: 400;
			color: #000000;
		}
		.main{
			.noticeItem {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 80rpx;
				.left {
					.itemImg {
						width: 76rpx;
						height: 76rpx;
					}
					.info {
						display: flex;
						flex-direction: column;
						margin-left: 16rpx;
						.user {
							font-size: 28rpx;
							font-weight: 400;
							color: #000000;
						}
			
						.behavior {
							font-size: 20rpx;
							font-weight: 500;
							color: #333333;
							margin-top: 6rpx;
						}
					}
				}
			
				.btn {
					padding: 0;
					margin:0 ;
					background: #25EFCF;
					border: 2rpx solid #000000;
					width: 116rpx;
					height: 46rpx;
					border-radius: 24rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #333333;
					line-height: 46rpx;
				}
				
			}
		}
	}
</style>