<template>
	<view class="x-waterfallCon">
		<u-waterfall v-model="goodsList">
			<template v-slot:left="{leftList}">
				<view class="x-goodsItem" v-for="(item, index) in leftList" :key="index" @click="goDetail(item)">
					<u-lazy-load threshold="-300" border-radius="10" :image="item.image" :index="index">
					</u-lazy-load>
					<view class="describe">
						<view class="x-head u-flex">
							<view class="x-headLeft u-flex">
								<image src="/static/common/image/tab-chat.png" mode="" class="x-headIcon">
								</image>
								<text class="x-name">王老五</text>
							</view>
							<button type="default" class="x-want">想要</button>
						</view>
						<text
							class="x-details">去年十月购入的机械手表。比较复古的风格，适合上班族朋友去年十月购入的机械手表。比较复古的风格，适合上班族朋友去年十月购入的机械手表。比较复古的风格，适合上班族朋友</text>

					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="x-goodsItem" v-for="(item, index) in rightList" :key="index" @click="goDetail(item)">
					<u-lazy-load threshold="-300" border-radius="10" :image="item.image" :index="index">
					</u-lazy-load>

					<view class="describe">
						<view class="x-head u-flex">
							<view class="x-headLeft u-flex">
								<image src="/static/common/image/tab-chat.png" mode="" class="x-headIcon">
								</image>
								<text class="x-name">王老五</text>
							</view>
							<button type="default" class="x-want">想要</button>
						</view>
						<text
							class="x-details">去年十月购入的机械手表。比较复古的风格，适合上班族朋友去年十月购入的机械手表。比较复古的风格，适合上班族朋友去年十月购入的机械手表。比较复古的风格，适合上班族朋友</text>

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
		methods:{
			goDetail(e){
				console.log(e);
				uni.navigateTo({
					url:'/pages/findPart/goodsDetail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.x-btn {
		padding: 0;
		background: #25EFCF;
		border: 1px solid #000000;
		font-weight: 500;
	}


	.x-waterfallCon {
		padding: 0 24rpx;

	}

	.x-goodsItem {
		margin: 0 20rpx;

	}

	.x-head {
		margin-top: 20rpx;
		justify-content: space-between;

	}

	.x-headIcon {
		width: 64rpx;
		height: 64rpx;
		border-radius: 64rpx;
	}

	.x-name {
		font-size: 24rpx;
		font-weight: 500;
		color: #333333;
		margin-left: 20rpx;
	}

	.x-want {
		@extend .x-btn;
		margin: 0;
		width: 88rpx;
		height: 44rpx;
		line-height: 44rpx;
		border-radius: 12rpx;
		font-size: 24rpx;
		color: #000000;
	}

	.x-details {
		margin-top: 16rpx;
		margin-bottom: 28rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;


	}

</style>
