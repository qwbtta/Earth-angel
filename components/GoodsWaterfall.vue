<template>
	<view class="waterfallCon">
		<u-waterfall v-model="goodsList">
			<template v-slot:left="{leftList}">
				<view class="goodsItem" v-for="(item, index) in leftList" :key="index">
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
				<view class="goodsItem" v-for="(item, index) in rightList" :key="index">
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


</template>

<script>
	export default {
		name: "GoodsWaterfall",
		props: ["goodsList"],
		data() {
			return {
				
			}
		},
		mounted() {}
	}
</script>

<style lang="scss" scoped>
	.btn {
		padding: 0;
		background: #25EFCF;
		border: 1px solid #000000;
		font-weight: 500;
	}
	.waterfallCon {
		padding: 0 48rpx;
	
		.goodsItem {
			// width: 310rpx;
			width: 94%;
	
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
	
</style>
