<template>
	<view class="goodsDetail">
		<u-swiper :list="swiperList" mode="dot" height="680" border-radius="0" @click="swiperClick()"></u-swiper>
		<view class="main">
			<view class="head">
				<view class="headLeft">
					<image src="/static/common/image/card1.png" mode="" class="headIcon"></image>
					<view class="nameCon">
						<text class="name">隔壁阿花</text>
						<view class="titleCon u-flex">
							<view class="goodStitle">
								全新重工棉T全新重
							</view>
							<button type="default" class="share">分享</button>
						</view>
					</view>
				</view>
				
				<view class="headRight" v-if="isMine">
					<text class="people">已有20人想要</text>
					<button type="default" class="want">转送</button>
				</view>
				<view class="headRight" v-else>
					<button type="default" class="want">想要</button>
					<button type="default" class="want">联系他</button>
				</view>
			</view>
			<view class="detail">
				<text>重工棉体桖全新的，保暖性佳、吸湿性强、柔软性好并且棉花纤维不存在静电作用等不良反应。现在送给需要的朋友们。点击想要吧。</text>
			</view>
		</view>
		<view class="footer">
			<view class="footerTitle">
				<text>我的其他闲置</text>
				<text>查看更多</text>
			</view>
			<scroll-view class="scrollArea" scroll-x="true">
				<view class="container">
					<view class="item" v-for="(item,index) in goodsList" :key="index">
						<image :src="item.image" mode="aspectFit" class="itemImg"></image>
						<text class="itemTitle">{{item.title}}</text>
					</view>
				</view>
				
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isMine:true,
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

		},
		onLoad(options) {
			console.log(options);
			if(options.id == this.vuex_openid){
				this.isMine = true
			}else{
				this.isMine = false
			}
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
					align-items: center;
					.headIcon {
						width: 94rpx;
						height: 94rpx;
					}

					.nameCon {
						height:  100rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-left: 20rpx;
						.name {
							font-size: 30rpx;
							font-weight: 500;
							color: #333333;
						}

						.titleCon {
							
							.goodStitle {
								height: 44rpx;
								background: #FFF2B8;
								border-radius: 2px;
								border: 1px solid #000000;
								padding:  0 14rpx;
								line-height: 44rpx;
							}

							.share {
								@extend .btn;
								width: 88rpx;
								height: 44rpx;
								font-size: 24rpx;
								line-height: 44rpx;
								margin-left: 20rpx;
							}
						}
					}
				}

				.headRight {
					height:  100rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					.people{
						font-size: 22rpx;
						font-weight: 400;
						color: #333333;
					}
					.want {
						@extend .btn;
						margin: 0;
						width: 122rpx;
						height: 44rpx;
						font-size: 24rpx;
						line-height: 44rpx;
					}
				}
			}
		
			.detail{
				margin-top: 40rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #333333;
			}
		}
	
		.footer{
			padding-left: 48rpx;
			margin-top: 40rpx;
			.footerTitle{
				font-size: 28rpx;
				font-weight: 400;
				color: #000000;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-right: 48rpx;
			}
			.scrollArea{
				margin-top: 16rpx;
				margin-bottom: 40rpx;
				.container{
					display: flex;
				
				.item{
					display: flex;
					flex-direction: column;
					margin-right: 28rpx;
					.itemImg{
						width: 168rpx;
						height: 168rpx;;
					}
					.itemTitle{
						font-size: 22rpx;
						font-weight: 500;
						color: #333333;
						margin-top: 24rpx;
					}
				}}
			}
		}
	
	}
</style>
