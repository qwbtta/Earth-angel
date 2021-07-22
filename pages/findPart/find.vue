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
				<input type="text" placeholder="搜索用户或群组名称" class="search" />
				<button type="default" class="createGroup">创建群组</button>
			</view>

			<view class="swiperCon">
				<u-swiper :list="swiperList" mode="dot" height="350" effect3d="true" bg-color="#ffffff" @click="swiperClick()"></u-swiper>
			</view>
			<view class="goodsCon">
				<view class="tabCon u-flex">
					<view :class="selected==1?'tab-item-slected':'tab-item'" @click="select(1)">
						<text>我的关注 </text>
						<image v-if="selected==1" src="/static/common/image/selected.png" mode=""
							class="imgSlected">
						</image>
					</view>
					<view :class="selected==2?'tab-item-slected':'tab-item'" @click="select(2)">
						<text class="tab2">我的群组 </text>
						<image v-if="selected==2" src="/static/common/image/selected.png" mode=""
							class="imgSlected">
						</image>
					</view>

				</view>

				<!-- <GoodsWaterfall :goodsList="goodsList"  v-if="selected==1"/> -->


				<view class="waterfallCon" v-if="selected==1">
					<u-waterfall v-model="goodsList">
						<template v-slot:left="{leftList}">
							<view class="goodsItem" v-for="(item, index) in leftList" :key="index" @click="goDetail(item)">
								<u-lazy-load threshold="-300" border-radius="10" :image="item.image" :index="index">
								</u-lazy-load>
								<view class="describe">
									<view class="head u-flex">
										<view class="headLeft u-flex">
											<image src="/static/common/image/tab-chat.png" mode="" class="headIcon">
											</image>
											<text class="name">王老五</text>
										</view>

										<button type="default" class="want">想要</button>
									</view>
									<text class="details">去年十月购入的机械手表。比较复古的风格，适合上班族朋友</text>

								</view>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view class="goodsItem" v-for="(item, index) in rightList" :key="index" @click="goDetail(item)">
								<u-lazy-load threshold="-300" border-radius="10" :image="item.image" :index="index">
								</u-lazy-load>
								<view class="describe">
									<view class="head u-flex">
										<view class="headLeft u-flex">
											<image src="/static/common/image/tab-chat.png" mode="" class="headIcon">
											</image>
											<text class="name">王老五</text>
										</view>
										<button type="default" class="want">想要</button>
									</view>
									<text
										class="details">去年十月购入的机械手表。比较复古的风格，适合上班族朋友去年十月购入的机械手表。比较复古的风格，适合上班族朋友去年十月购入的机械手表。比较复古的风格，适合上班族朋友</text>



								</view>
							</view>
						</template>
					</u-waterfall>
				</view>


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
				search: "",
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
				goodsList: [{
					image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					title: '谁念西风独自凉',
					detail: '谁念西'
				}, {
					image: '/static/common/image/kk.jpg',
					title: '谁念西风独自凉',
					detail: '谁念西'
				}, {
					image: '/static/common/image/kk.jpg',
					title: '谁念西风独自凉',
					detail: '谁念西风独的'
				}, {
					image: '/static/common/image/kk.jpg',
					title: '谁念西风独自凉',
					detail: '谁念西风独'
				}, {
					image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					title: '谁念西风独自凉',
					detail: '谁念西风独'
				}]
			}
		},
		methods: {
			goDetail(e){
				uni.navigateTo({
					url:'./goodsDetail'
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
					url: './group/group'
				})
			},
			swiperClick(e){
				console.log(e);
			}
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

				.search {
					margin-left: 48rpx;
					width: 54.8%;
					height: 60rpx;
					border-radius: 30rpx;
					box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
					background-image: url(../../static/common/image/search.png);
					background-size: 32rpx 32rpx;
					background-repeat: no-repeat;
					background-position: 5% 50%;
					padding-left: 70rpx;
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
				padding: 0 48rpx;
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

				.waterfallCon {
					padding: 0 24rpx;
					.goodsItem {
						margin: 0 20rpx;
						.describe {
							.head {
								margin-top: 20rpx;
								justify-content: space-between;

								.headLeft {
									.headIcon {
										width: 64rpx;
										height: 64rpx;
										border-radius: 64rpx;
									}

									.name {
										font-size: 24rpx;
										font-weight: 500;
										color: #333333;
										margin-left: 20rpx;
									}

								}

								.want {
									@extend .btn;
									margin: 0;
									width: 88rpx;
									height: 44rpx;
									line-height: 44rpx;
									border-radius: 12rpx;
									font-size: 24rpx;
									color: #000000;
								}
							}
						}

						.details {
							margin-top: 16rpx;
							margin-bottom: 28rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;


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

	}
</style>
