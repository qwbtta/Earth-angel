<template>
	<view class="search">
		<view class="card">
			<view class="head">

				<image src="/static/common/image/card1.png" mode="" class="headIcon"></image>


				<view class="headRight">
					<view class="info">
						<text class="name">九尺板鸭爱好者</text>
						<text class="id">ID：526878657899</text>
					</view>
					<button type="default" class="add">加为好友</button>
				</view>

			</view>
			<u-divider half-width="240" color="#333333" fontSize="20" border-color="#D8D8D8">TA的闲置</u-divider>
			
			<view class="footer">
				<view class="item" v-for="item in [1,1,1,1]">
					<image src="/static/common/image/card1.png" mode="aspectFit" class="goodsImg"></image>
					<text class="title">北欧复古沙发</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>
<style>
	page {
		height: 100%;
		background: #F7F7F7;
	}
</style>

<style lang="scss" scoped>
	.search {
		.card {
			width: 90%;
			height: 450rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 16rpx 4rpx rgba(0, 0, 0, 0.12);
			border-radius: 20rpx;
			margin: 100rpx auto;
			padding: 30rpx 50rpx 0;

			.head {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;
				.headIcon {
					width: 122rpx;
					height: 122rpx;
					flex-shrink: 0;
				}

				.headRight {
					width: 100%;
						display: flex;
						justify-content: space-between;
						margin-left: 24rpx;
					.info {
						display: flex;
						flex-direction: column;

						.name {
							font-size: 36rpx;
							font-weight: 500;
							color: #333333;
						}

						.id {
							font-size: 24rpx;
							font-weight: 400;
							color: #666666;
						}

					}

					.add {
						margin: 0;
						padding: 0;
						width: 128rpx;
						height: 52rpx;
						background: #25EFCF;
						border-radius: 8rpx;
						border: 2rpx solid #000000;
						font-size: 28rpx;
						font-weight: 500;
						color: #000000;
						line-height: 52rpx;
					}
				}
			}
			.footer{
				display: flex;
				justify-content: space-between;
				margin-top: 24rpx;
				.item{
					display: flex;
					flex-direction: column;
					align-items: center;
					.goodsImg{
						width: 126rpx;
						height: 126rpx;
					}
					.title{
						font-size: 22rpx;
						font-weight: 500;
						color: #333333;
						margin-top: 20rpx;
					}
				}
			}
		}
	}
</style>
