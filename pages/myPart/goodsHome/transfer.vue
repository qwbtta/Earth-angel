<template>
	<view class="transfer">
		<view class="head">
			<text>该物品有以下朋友想要：</text>
		</view>
		<view class="main">
			<view class="item" v-for="item in [1,1,1,1,1,1,1]">
				<view class="itemLeft u-flex">
					<image src="/static/common/image/card1.png" mode="" class="itemImg"></image>
					<text class="name">隔壁阿花</text>
				</view>
				<button type="default" class="btn">赠送</button>
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

<style lang="scss" scoped>
	.transfer {
		.head {
			height: 86rpx;
			background: #F1F1F1;
			font-size: 28rpx;
			font-weight: 400;
			line-height: 86rpx;
			padding-left: 48rpx;
		}

		.main {
			padding: 4rpx 48rpx;

			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 44rpx;
				.itemLeft {
					.itemImg {
						width: 84rpx;
						height: 84rpx;
					}

					.name {
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
						margin-left: 20rpx;
					}
				}

				.btn {
					margin: 0;
					padding: 0;
					width: 88rpx;
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
	}
</style>
