<template>
	<view class="goodsDetail">
		<u-swiper :list="swiperList" mode="dot" height="680" border-radius="0" @click="swiperClick()"></u-swiper>
		<view class="main">
			<view class="head">
				<view class="headLeft">
					<view class="titleCon u-flex">
						<view class="goodStitle">
							{{goodsName}}
						</view>
						<button type="default" class="share" open-type="share">分享</button>
					</view>
					
					<view class="nameCon" @click="goHomePage">
						<image :src="userInfo.icon" mode="" class="headIcon" ></image>
						<text class="name" >{{userInfo.name}}</text>
						
					</view>
				</view>

				<view class="headRight" v-if="isMine">
					<text class="people" @click="goWhoWants">已有{{peopleNum}}人想要</text>
					<button type="default" class="want" @click="goTransfer">赠送</button>
				</view>
				<view class="headRight" v-else>
					<button type="default" class="want" v-if="wanted">我已想要</button>
					<button type="default" class="want" @click="want" v-else>想要</button>
					<button type="default" class="want" @click="goChat">联系对方</button>
				</view>
			</view>
			<view class="detail">
				<text>{{describe}}</text>
			</view>
		</view>
		<view class="footer">
			<view class="footerTitle">
				<text>{{isMine?'我':'Ta'}}的其他闲置</text>
				<text @click="goHomePage">查看更多</text>
			</view>
			<scroll-view class="scrollArea" scroll-x="true">
				<view class="container">
					<view class="item" v-for="item in goodsList" :key="item.itemId" @click="goOther(item)">
						<image :src="item.imgUrls[0]" mode="aspectFit" class="itemImg"></image>
						<text class="itemTitle">{{item.name}}</text>
					</view>
				</view>

			</scroll-view>
		</view>

	</view>
</template>

<script>
	import {
		shareMixins
	} from '@/common/mixins/share.js'
	export default {
		mixins: [shareMixins],
		data() {
			return {
				isMine: true,
				swiperList: [],
				goodsName: "",
				describe: "",
				peopleNum: 0,
				wantedUid: [],
				goodsList: [],
				userInfo: {},
				wanted: false

			}
		},
		methods: {
			goTransfer() {
				uni.navigateTo({
					url: '../myPart/goodsHome/transfer'
				})
			},
			goWhoWants(){
				if(this.peopleNum == 0){
					this.$u.toast('还没有人想要该物品哦，快去分享给更多人吧~')
					return
				}
				uni.navigateTo({
					url:'./whoWants'
				})
				
			},
			goHomePage() {
				if(this.userInfo.uid == this.vuex_openid){
					uni.navigateTo({
						url:'../myPart/goodsHome/myGoodsHome'
					})
				}else{
					this.$u.vuex('vuex_search', this.userInfo);
					
					uni.navigateTo({
						url: '../myPart/goodsHome/goodsHome?id=' + this.userInfo.uid
					})
				}
				
			},
			goChat() {
				uni.navigateTo({
					url: '../chatPart/chatPage?where=detail'
				})
				console.log(this.vuex_goodsInfo)
			},
			want() {
				this.$u.api.user_want_the_item({
					itemId: this.vuex_goodsInfo.itemId,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res)
					if (res.errCode == 0) {
						// this.$u.toast('请求发送成功', 2000)
						this.wanted = true
					} else {}
				})
			},
			async goOther(item){
				await this.$u.vuex('vuex_goodsInfo',item)
				this.getDetail()
			},
			getDetail(){
				console.log(this.vuex_goodsInfo.wantedUid, " this.vuex_goodsInfo this.vuex_goodsInfo this.vuex_goodsInfo");
				
				if (this.vuex_goodsInfo.fromUser == this.vuex_openid) {
					this.isMine = true
					this.peopleNum = this.vuex_goodsInfo.wantedUid.length
					this.wantedUid = this.vuex_goodsInfo.wantedUid
				} else {
					this.isMine = false
					for (let u = 0; u < this.vuex_goodsInfo.wantedUid.length; u++) {
						if (this.vuex_goodsInfo.wantedUid[u] == this.vuex_openid) {
							this.wanted = true
							break
						}
					}
				}
				this.swiperList = this.vuex_goodsInfo.imgUrls
				this.goodsName = this.vuex_goodsInfo.name
				this.describe = this.vuex_goodsInfo.desc
				this.$req('/friend/get_friends_info', {
					uid: this.vuex_goodsInfo.fromUser,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res.data, "获取用户信息")
				
					if (res.errCode == 0) {
						this.userInfo = res.data
						this.shareData.path = '/pages/findPart/find?uid=' + this.userInfo.uid + '&goodsid=' + this
							.vuex_goodsInfo.itemId + '&shareName=' + this.vuex_nick_name + '&shareUid=' + this
							.vuex_openid
					}
				})
				
				let parameter = {}
				parameter.uidList = [this.vuex_goodsInfo.fromUser]
				parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
				this.$u.api.get_users_items(parameter).then(res => {
					console.log(res.data[0].items, "其他闲置");
					// let list = res.data[0].items
					let list = this.$u.deepClone(res.data[0].items);
					// let list = res.data[0].items.filter(item => item.toUser.length == 0)
					console.log(this.vuex_goodsInfo.itemId);
					for (let i = 0; i < list.length; i++) {
						if (this.vuex_goodsInfo.itemId == list[i].itemId) {
							res.data[0].items.splice(i, 1)
							this.goodsList = res.data[0].items
							console.log(this.goodsList);
							return
						}
					}
				})
			}
		},
		onShow() {
			this.getDetail()

		}


	}
</script>

<style lang="scss" scoped>
	.goodsDetail {
		.btn {
			padding: 0;
			background: #25EFCF;
			border: 1px solid #000000;
			font-weight: 500;
			border-radius: 8rpx;
			font-weight: 500;
		}

		.main {
			margin-top: 60rpx;
			padding: 0 48rpx;

			.head {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.headLeft {
					display: flex;
					flex-direction: column;
					.titleCon {
					
						.goodStitle {
							height: 50rpx;
							background: #FFF2B8;
							border-radius: 8rpx;
							border: 2rpx solid #000000;
							padding: 0 14rpx;
							line-height: 50rpx;
						}
					
						.share {
							@extend .btn;
							width: 88rpx;
							height: 44rpx;
							font-size: 24rpx;
							line-height: 44rpx;
							margin-left: 24rpx;
						}
					}
					
					

					.nameCon {
						display: flex;
						align-items: center;
						margin-top: 16rpx;
						.headIcon {
							width: 50rpx;
							height: 50rpx;
							border-radius: 50rpx;
						}
						.name {
							font-size: 24rpx;
							font-weight: 500;
							color: #333333;
							margin-left: 10rpx;
						}

						
					}
				}


				.headRight {
					height: 116rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;

					.people {
						font-size: 26rpx;
						font-weight: 500;
						color: #009C84;
					}

					.want {
						@extend .btn;
						margin: 0;
						width: 126rpx;
						height: 50rpx;
						font-size: 24rpx;
						line-height: 50rpx;
					}
				}
			}

			.detail {
				margin-top: 40rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #333333;
			}
		}

		.footer {
			padding-left: 48rpx;
			margin-top: 40rpx;

			.footerTitle {
				font-size: 28rpx;
				font-weight: 400;
				color: #000000;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-right: 48rpx;
			}

			.scrollArea {
				margin-top: 16rpx;
				margin-bottom: 40rpx;

				.container {
					display: flex;

					.item {
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-right: 28rpx;

						.itemImg {
							width: 168rpx;
							height: 168rpx;
							;
						}

						.itemTitle {
							font-size: 22rpx;
							font-weight: 500;
							color: #333333;
							margin-top: 24rpx;
						}
					}
				}
			}
		}

	}
</style>
