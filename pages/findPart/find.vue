<template>
	<view class="home">
		<u-navbar :is-back="false">
			<view class="slot-wrap">
				<image src="/static/common/image/logo.png" mode="" class="logoImg"></image>
				<text class="logoText">地球天使</text>
			</view>
		</u-navbar>
		<view class="main">
			<view class="searchCon">
				<view class="inputFather">
					<input type="text" placeholder="搜索用户或群组名称" v-model="search" class="search" />
					<image src="/static/common/image/search.png" mode="" class="searchIcon" v-if="search.length==0">
					</image>
					<image src="/static/common/image/searchShow.png" mode="" class="searchIcon"
						@click.stop="searchFriend" v-else></image>
				</view>

				<button type="default" class="createGroup" @click="goNewGroup">创建群组</button>
			</view>

			<view class="swiperCon">
				<u-swiper :list="swiperList" mode="dot" height="350" effect3d="true" bg-color="#ffffff"
					@click="swiperClick()"></u-swiper>
			</view>
			<view class="goodsCon">
				<view class="tabCon u-flex">
					<view :class="selected==1?'tab-item-slected':'tab-item'" @click="select(1)">
						<text>我的关注 </text>
						<image v-if="selected==1" src="/static/common/image/selected.png" mode="" class="imgSlected">
						</image>
					</view>
					<view :class="selected==2?'tab-item-slected':'tab-item'" @click="select(2)">
						<text class="tab2">我的群组 </text>
						<image v-if="selected==2" src="/static/common/image/selected.png" mode="" class="imgSlected">
						</image>
					</view>

				</view>

				<GoodsWaterfall :goodsList="goodsList" v-if="selected==1" />

				<view class="group" v-if="selected==2">
					<view class="group-item" v-for="item in [1, 2, 3, 4, 5, 6]" :key="item">
						<view class="head u-flex">
							<view class="headLeft u-flex">
								<image src="/static/common/image/tab-chat.png" mode="" class="headIcon">
								</image>
								<text class="groupName">颜控大学闲置物品交流群</text>
							</view>

							<button type="default" class="more" @click="goMore">查看更多</button>
						</view>
						<view class="main">
							<scroll-view class="scrollArea" scroll-x="true">

								<view class="item" v-for="(item,index) in goodsList" :key="index">
									<view class="itemFlex">
										<image :src="item.image" mode="aspectFit" class="itemImg"></image>
										<text class="title">{{item.title}}</text>
										<text class="detail">来自<text
												class="user">{{item.detail.length>5?item.detail.slice(0,5)+"...":item.detail}}</text>
											的闲置物品</text>
									</view>

								</view>
							</scroll-view>
						</view>
					</view>

				</view>

			</view>
		</view>
		<u-popup v-model="shareShow" mode="center" border-radius="20">
			<text class="popupTitle">大张伟给你分享的闲置物品</text>
			<image src="../../static/common/image/kk.jpg" mode="aspectFit" class="popupImg"></image>
			<view class="popupInfo">
				<view class="popupInfoLeft u-flex">
					<image src="/static/common/image/card1.png" mode="" class="popupHeadIcon"></image>
					<text class="popupName">九尺板鸭爱好者</text>
				</view>
				<button type="default" class="apply">发送好友申请</button>
			</view>
			<text class="popupDetail">日本设计大师经典之作，放置在家中增加品味，彰显高格调</text>
		</u-popup>

	</view>
</template>

<script>
	import GoodsWaterfall from '../../components/GoodsWaterfall.vue'
	export default {
		components: {
			GoodsWaterfall
		},
		data() {
			return {
				code: "",
				search: "",
				shareShow: false,
				swiperList: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				selected: 1,
				goodsList: []
			}
		},
		methods: {
			searchFriend() {
				this.$req('/friend/get_friends_info', {
					uid: this.search,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {

					console.log(res)
					if (res.errCode == 0) {
						this.$u.vuex('vuex_search', res.data);
						uni.navigateTo({
							url: './search'
						})
					} else {
						this.$u.toast('该ID不存在');
					}
				})

			},
			goNewGroup() {
				uni.navigateTo({
					url: 'group/newGroup'
				})
			},
			select(e) {
				console.log(e);
				if (e === 1) {
					this.selected = 1
				} else {
					this.selected = 2
				}
			},
			goMore() {
				uni.navigateTo({
					url: 'group/group'
				})
			},
			swiperClick(e) {
				console.log(e);
			}
		},
		onShow() {
			this.$req('/friend/get_friend_list', {
				operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
			}).then(res => {

				if (res.errCode == 0) {
					let friendList = res.data
					let ids = res.data.map(item => item.uid)
					let parameter = {}
					parameter.openIdList = ids
					parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
					this.$u.api.get_user_items(parameter).then(res => {

						//接口问题，所以需要多重循环拼接处理数据，全部使用for
						for (let i = 0; i < friendList.length; i++) {
							for (let e = 0; e < res.data.length; e++) {
								if (friendList[i].uid == res.data[e].openId) {
									for(let m =0; m<res.data[e].items.length;m++){
										res.data[e].items[m].icon =friendList[i].icon
										res.data[e].items[m].userName =friendList[i].name
										this.goodsList.push(res.data[e].items[m])
									}
									
								}
							}
						}
						console.log(this.goodsList,"6666");
					})





				} else {}
			})

		}

	}
</script>

<style lang="scss" scoped>
	.home {
		.btn {
			padding: 0;
			background: #25EFCF;
			border: 1px solid #000000;
			font-weight: 500;
		}

		.slot-wrap {
			display: flex;
			align-items: center;

			.logoImg {
				width: 44rpx;
				height: 78rpx;
				margin-left: 46rpx;
			}

			.logoText {
				font-size: 34rpx;
				font-weight: 400;
				margin-left: 16rpx;
			}
		}

		.main {
			.searchCon {
				display: flex;
				align-items: center;
				margin-top: 28rpx;

				.inputFather {
					width: 70%;
					position: relative;

					.search {
						margin-left: 48rpx;
						height: 60rpx;
						border-radius: 30rpx;
						box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
						padding-left: 30rpx;
						padding-right: 74rpx;
					}

					.searchIcon {
						width: 32rpx;
						height: 32rpx;
						position: absolute;
						top: 14rpx;
						right: 28rpx;
						z-index: 99;
					}
				}


				.createGroup {
					@extend .btn;
					margin-left: 28rpx;
					width: 156rpx;
					height: 60rpx;
					border-radius: 30rpx;
					font-size: 28rpx;
					line-height: 60rpx;
				}
			}

			.swiperCon {
				margin-top: 60rpx;

			}

			.goodsCon {
				margin-top: 50rpx;

				.tabCon {
					margin-left: 48rpx;
					margin-bottom: 28rpx;

					.tab2 {
						margin-left: 12rpx;
					}

					.tab-item {
						font-size: 28rpx;
						font-weight: 500;
						color: #999999;
					}

					.tab-item-slected {
						font-size: 36rpx;
						font-weight: 500;
						color: #000000;
						display: flex;

						.imgSlected {
							width: 44rpx;
							height: 30rpx;
							margin-top: -10rpx;
						}
					}

				}

				.group {
					margin-left: 48rpx;

					.group-item {
						padding-left: 40rpx;
						padding-top: 34rpx;
						margin-top: 40rpx;
						width: 93%;
						height: 366rpx;
						background: #FFFFFF;
						box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.2);
						border-radius: 20rpx;

						.head {
							justify-content: space-between;

							.headLeft {
								.headIcon {
									width: 64rpx;
									height: 64rpx;
									border-radius: 64rpx;
								}

								.groupName {
									font-size: 28rpx;
									font-weight: 500;
									color: #000000;
									margin-left: 20rpx;
								}
							}


							.more {
								@extend .btn;
								margin: 0;
								margin-right: 40rpx;
								width: 96rpx;
								height: 44rpx;
								line-height: 44rpx;
								border-radius: 12rpx;
								font-size: 20rpx;
								color: #000000;
							}
						}

						.main {
							margin-top: 24rpx;

							.scrollArea {
								height: 350rpx;
								width: 100%;
								white-space: nowrap;

								.item {
									margin-right: 28rpx;
									display: inline-block;

									.itemFlex {
										display: flex;
										flex-direction: column;
										align-items: center;

										.itemImg {
											width: 152rpx;
											height: 152rpx;

										}

										.title {
											font-size: 20rpx;
											font-weight: 400;
											color: #000000;
											margin-top: 12rpx;
										}

										.detail {
											font-size: 14rpx;
											font-weight: 400;
											color: #999999;
											margin-top: 4rpx;

											.user {
												color: #666666;
												font-weight: 700;
											}
										}
									}

								}


							}
						}


					}
				}
			}

		}

		/deep/ .u-mode-center-box {
			width: 604rpx !important;
			padding: 46rpx 48rpx !important;
		}

		.popupTitle {

			font-size: 34rpx;
			font-weight: 400;
			color: #000000;
		}

		.popupImg {
			width: 100%;
			display: block;
			margin: 42rpx auto;
		}

		.popupInfo {

			display: flex;
			align-items: center;
			justify-content: space-between;

			.popupInfoLeft {
				.popupHeadIcon {
					width: 72rpx;
					height: 72rpx;
				}

				.popupName {
					font-size: 26rpx;
					font-weight: 500;
					color: #333333;
					margin-left: 16rpx;
				}
			}

			.apply {
				margin: 0;
				padding: 0;
				width: 174rpx;
				height: 50rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #333333;
				line-height: 48rpx;
				background: #25EFCF;
				border-radius: 8rpx;
				border: 2px solid #000000;
			}

		}

		.popupDetail {
			margin-top: 26rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
	}
</style>
