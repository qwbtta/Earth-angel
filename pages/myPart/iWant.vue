<template>
	<view class="iWant">
		<view class="remind" v-if="list.length==0">
		
			<text class="remindInfo">这里空空如也哦，快去添加更多关注吧～</text>
		</view>
		<view class="item" v-for="(item,index) in list " :key="index">
			<view class="head">
				<view class="headLeft" @click="goHomePage(item)">
					<image :src="item.userInfo.icon" mode="" class="headIcon"></image>
					<text class="name">{{item.userInfo.name}}</text>
				</view>
				<button type="default" class="btn" @click="goChat(item)">联系对方</button>
			</view>

			<view class="main">
				<image :src="item.goodsInfo.imgUrls[0]" mode="aspectFit" class="orinImg" @click="goDetail(item)"
					v-if="item.goodsInfo.toUser.length==0"></image>
				
				<image :src="item.goodsInfo.imgUrls[0]" mode="aspectFit" :class="item.goodsInfo.toUser==vuex_openid?'reciveImg':'goodsImg'" @click="goDetail(item)"
					v-else></image>
				<view class="mainRight">
					<text class="goodsName">{{item.goodsInfo.name}}</text>
					<text class="state1" v-if="item.goodsInfo.toUser.length==0">对方还未决定赠送对象</text>
					<text class="state2" v-else>{{item.goodsInfo.toUser==vuex_openid?'已赠送给您':'已赠送给他人'}}</text>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			goChat(item) {
				this.$u.vuex('vuex_goodsInfo', item.goodsInfo)
				uni.navigateTo({
					url: '../chatPart/chatPage?where=detail'
				})
				console.log(this.vuex_goodsInfo)
			},
			goHomePage(item) {
				this.$u.vuex('vuex_search', item.userInfo);
				uni.navigateTo({
					url: '../myPart/goodsHome/goodsHome?id=' + item.userInfo.uid
				})

			},
			goDetail(item) {
				console.log(item, "45455454");
				this.$u.vuex('vuex_goodsInfo', item.goodsInfo);
				uni.navigateTo({
					url: '/pages/findPart/goodsDetail'
				})


			}
		},
		onShow() {

			this.$u.api.want_item_list({
				operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
			}).then(res => {
				this.list = []
				let list = []
				console.log(res.data);
				let goodsInfo = res.data
				let ids = res.data.map(item => item.fromUser)
				this.$req('/user/get_user_info', {
					uidList: ids,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res.data, "rrrrrrrrrrrr");
					for (let i = 0; i < res.data.length; i++) {
						let item = {}
						item.goodsInfo = goodsInfo[i]
						item.userInfo = res.data[i]
						list.push(item)
					}
					this.list = list
					console.log(this.list, "ddddddddd");
				})
			})
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: #F1F1F1;
	}
</style>

<style lang="scss" scoped>
	.iWant {
		padding-top: 24rpx;

		.item {
			width: 750rpx;
			height: 314rpx;
			background: #FFFFFF;
			padding: 0 44rpx;
			margin-bottom: 24rpx;
			padding: 38rpx;

			.head {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.headLeft {
					display: flex;
					align-items: center;

					.headIcon {
						width: 60rpx;
						height: 60rpx;
						border-radius: 60rpx;
					}

					.name {
						font-size: 28rpx;
						font-weight: 400;
						color: #000000;
						margin-left: 16rpx;
					}
				}

				.btn {
					margin: 0;
					padding: 0;
					width: 142rpx;
					height: 46rpx;
					background: #25EFCF;
					border-radius: 24rpx;
					border: 2rpx solid #000000;
					font-size: 24rpx;
					font-weight: 500;
					color: #333333;
					line-height: 46rpx;
				}
			}

			.main {
				display: flex;
				align-items: center;
				margin-top: 24rpx;

				.orinImg {
					width: 152rpx;
					height: 152rpx;
					border-radius: 20rpx;
					position: relative;
				}

				.goodsImg {
					width: 152rpx;
					height: 152rpx;
					border-radius: 20rpx;
					position: relative;
				}

				.goodsImg::before {
					content: "已送出";
					font-size: 32rpx;
					font-weight: 600;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0;
					top: 0;
					background-color: rgba(196, 196, 196, 0.7);
					z-index: 2;
				}

				.reciveImg {
					width: 152rpx;
					height: 152rpx;
					border-radius: 20rpx;
					position: relative;
				}

				.reciveImg::before {
					content: "已收到";
					font-size: 32rpx;
					font-weight: 600;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0;
					top: 0;
					background-color: rgba(196, 196, 196, 0.7);
					z-index: 2;
				}

				.mainRight {
					display: flex;
					flex-direction: column;
					margin-left: 32rpx;

					.goodsName {
						font-size: 32rpx;
						font-weight: 400;
						color: #000000;
					}

					.state1 {
						font-size: 24rpx;
						font-weight: 400;
						color: #FF0000;
						margin-top: 8rpx;
					}

					.state2 {
						font-size: 24rpx;
						font-weight: 400;
						color: #AAAAAA;
						margin-top: 8rpx;
					}
				}
			}
		}
	}
</style>
