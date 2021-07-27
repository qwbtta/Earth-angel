<template>
	<view class="groupManage">
		<view class="head">
			<view class="item">
				<image src="/static/common/image/card1.png" mode="" class="headImg"></image>
				<text class="headText">移交群主</text>
			</view>
			<view class="item">
				<image src="/static/common/image/card2.png" mode="" class="headImg"></image>
				<text class="headText">移除成员</text>
			</view>
			<view class="item">
				<image src="/static/common/image/card3.png" mode="" class="headImg"></image>
				<text class="headText">发布群公告</text>
			</view>
		</view>

		<view class="cellArea">
			<view class="cell" @click="goEditGroupName">
				<view class="u-flex">
					<image src="/static/common/image/modify.png" mode="aspectFit" class="cellImg"></image>
					<text class="title">修改群名</text>
				</view>

				<image src="/static/common/image/arrow.png" mode="" class="cellArrow"></image>
			</view>
			<view class="cell">
				<view class="u-flex">
					<image src="/static/common/image/modify-group-headIcon.png" mode="aspectFit" class="cellImg"></image>
					<text class="title">修改群头像</text>
				</view>

				<image src="/static/common/image/arrow.png" mode="" class="cellArrow"></image>
			</view>
			<view class="cell">
				<view class="u-flex">
					<image src="/static/common/image/delete.png" mode="aspectFit" class="cellImg"></image>
					<text class="title">删除物品</text>
				</view>

				<image src="/static/common/image/arrow.png" mode="" class="cellArrow"></image>
			</view>
			<view class="cell" @click="showUngroup = true">
				<view class="u-flex">
					<image src="/static/common/image/dissolution.png" mode="aspectFit" class="cellImg"></image>
					<text class="title">解散群</text>
				</view>

				<image src="/static/common/image/arrow.png" mode="" class="cellArrow"></image>
			</view>
			<view class="cell">
				<view class="u-flex">
					<image src="/static/common/image/exit.png" mode="aspectFit" class="cellImg"></image>
					<text class="title">退出群聊</text>
				</view>

				<image src="/static/common/image/arrow.png" mode="" class="cellArrow"></image>
			</view>
		</view>
	
	<u-popup v-model="showUngroup" mode="center" border-radius="12">
		<view class="popupMain">
			<view class="popupHead">
				<text>确定要解散群组？</text>
			</view>
			<view class="popupFooter u-flex">
				<view class="popupFooterItem" @click="showUngroup = false">
					取消
				</view>
				<view class="popupFooterItem confirm" @click="confirm">
					确定
				</view>
			</view>
		</view>
		
	</u-popup>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
			showUngroup:true
			}
		},
		methods:{
			goEditGroupName(){
				uni.navigateTo({
					url:'./editGroupName'
				})
			},
			confirm(){
				this.showUngroup = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.groupManage {
		border-top: 1px solid #DBDEE3;
		padding: 0 48rpx;
		.head {
			margin: 0 auto;
			margin-top: 68rpx;
			width: 100%;
			height: 248rpx;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			box-shadow: 0px 0px 8px 1px rgba(0, 18, 42, 0.17);
			border-radius: 12rpx;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;

				.headImg {
					width: 110rpx;
					height: 100rpx;
				}

				.headText {
					font-size: 30rpx;
					font-weight: 400;
					color: #333333;
				}
			}

		}

		.cellArea {
			margin-top: 40rpx;
			.cell {
				height: 120rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #D7E9FF;
				.cellImg {
					width: 50rpx;
				}

				.title {
					font-size: 32rpx;
					font-weight: 400;
					margin-left: 30rpx;
				}

				.cellArrow {
					width: 20rpx;
					height: 34rpx;
				}
			}
		}
		.popupMain{
			width: 580rpx;
			.popupHead{
				padding: 0 60rpx;
				min-height: 180rpx;
				border-bottom: 2rpx solid rgba(151, 151, 151, 0.5);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				font-weight: 400;
				color: #333333;
				line-height: 44rpx;
			}
			.popupFooter{
				
				.popupFooterItem{
					width: 290rpx;
					height: 106rpx;
					line-height: 106rpx;
					text-align: center;
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
				}
				.confirm{
					border-left: 2rpx solid rgba(151, 151, 151, 0.5);
				}
				.confirm:active{
					background-color:  #25EFCF;
				}
			}
		}
	}
</style>
