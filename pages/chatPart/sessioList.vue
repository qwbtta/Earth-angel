<template>
	<view class="sessionList">
		<view class="main">
			<view class="listItem" v-for="item in [1,2,1,1,1,1,5,52,3]" @click="goChatPage">
				<image src="/static/common/image/tab-chat.png" mode="" class="headIcon"></image>

				<view class="list-main">
					<view class="list-main-head">
						<text class="name">大张伟</text>
						<view class="infoNum">
							11
						</view>
					</view>
					<view class="list-main-bottom">
						<text class="info">床前明月光，疑是地上霜</text>
						<text class="time"> 7:00 </text>
					</view>
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
		},
		methods:{
			goChatPage(){
				uni.navigateTo({
					url:'./chatPage'
				})
			}
		}
	}
</script>

<style>
	
</style>
<style lang="scss" scoped>
	.sessionList {
		padding: 0 40rpx;
		border-top: 1px solid #DBDEE3;
		.main {
			.listItem {
				height: 154rpx;
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #D8D8D8;
				.headIcon {
					width: 90rpx;
					height: 90rpx;
					border-radius: 90rpx;
					flex-shrink: 0;
				}

				.list-main {
					width: 100%;
					height: 80rpx;
					margin-left: 28rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.list-main-head {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.name {
							font-size: 14px;
							font-weight: 500;
							color: #333333;
						}

						.infoNum {
							text-align: center;
							line-height: 30rpx;
							width: 30rpx;
							height: 30rpx;
							border-radius: 30rpx;
							background: #F33E37;
							font-size: 20rpx;
							font-weight: 500;
							color: #FFFFFF;
						}
					}

					.list-main-bottom {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.info {
							font-size: 24rpx;
							font-weight: 400;
							color: #666666;
						}

						.time {
							font-size: 20rpx;
							font-weight: 400;
							color: #666666;
						}
					}
				}
			}
		}
	}
</style>
