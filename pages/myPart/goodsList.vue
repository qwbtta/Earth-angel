<template>
	<view class="goodsList">
		
		<u-navbar :title="title"></u-navbar>

		<view class="goodsItem" v-for="item in [1,2,2,1,1,1,1,1,1,1,1,1]">
			<view class="left u-flex">
				<image src="/static/common/image/card1.png" mode="" class="itemImg"></image>
				<view class="describe">
					<text class="title">复古机械手表99新</text>
					<text class="who">来自"大张伟"的赠送</text>
				</view>
			</view>
			<view class="buttonCon">
				<button type="default" class="btn">删除记录</button>
				<button type="default" class="btn">联系朋友</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: ""
			}
		},
		onLoad(options) {
			console.log(options.where);
			if (options.where == "received") {
				this.title = "收到物品"
			} else if (options.where == "gave") {
				this.title = "我的赠送"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodsList {
		padding: 0 48rpx 100rpx;

		.btn {
			padding: 0;
			background: #25EFCF;
			border: 2rpx solid #000000;
			font-weight: 500;
			width: 116rpx;
			height: 46rpx;
			border-radius: 8rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #333333;
			line-height: 46rpx;
		}

		.goodsItem {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 44rpx;

			.left {
				.itemImg {
					width: 132rpx;
					height: 132rpx;
				}

				.describe {
					display: flex;
					flex-direction: column;
					margin-left: 36rpx;

					.title {
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
					}

					.who {
						font-size: 26rpx;
						font-weight: 500;
						color: #2F2F2F;
						margin-top: 6rpx;
					}
				}
			}

			.buttonCon {
				height: 100rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
	}
</style>
