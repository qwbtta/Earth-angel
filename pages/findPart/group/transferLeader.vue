<template>
	<view class="transferLeader">
		<view class="head">
			<text>将群主移交给以下任意群成员：</text>
		</view>
		<view class="main">
			<view class="item u-flex" v-for="item in [1,1,1,1,1]">

				<image src="/static/common/image/card1.png" mode="" class="headIcon"></image>


				<view class="itemRight">
					<text class="name">隔壁阿花</text>
					<button type="default" class="btn">移交</button>
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

<style lang="scss" scoped>
	.transferLeader {
		.head {
			width: 100%;
			height: 86rpx;
			background: #F1F1F1;
			font-size: 28rpx;
			font-weight: 400;
			color: #000000;
			line-height: 86rpx;
			padding-left: 48rpx;
		}

		.main {
			padding: 0 48rpx;
			margin-top: 4rpx;

			.item {
			margin-top: 44rpx;
				.headIcon {
					width: 84rpx;
					height: 84rpx;
					flex-shrink: 0;
				}

				.itemRight {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-left: 20rpx;
					width: 100%;

					.name {
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
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
	}
</style>
