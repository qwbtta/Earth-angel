<template>
	<view class="goodsHome">
		<view class="head">
			<image src="/static/common/image/card1.png" mode="" class="headIcon"></image>
			<view class="describe">
				<text class="name">九尺板鸭爱好者的闲置</text>
				<text class="id">ID：526878657899</text>
			</view>
		</view>

		<GoodsWaterfall :goodsList="goodsList" />



		<button type="default" @click="editShow = true">编辑</button>
		<u-popup v-model="editShow" mode="center" border-radius="20">
			<view class="popupHead">
				管理物品
			</view>
			<view class="popupItem">
				编辑详情
			</view>
			<u-line color="#EFEFEF" />
			<view class="popupItem">
				删除
			</view>
			<u-line color="#EFEFEF" />
			<view class="popupItem" @click="editShow = false">
				取消
			</view>
		</u-popup>


	</view>
</template>

<script>
	import GoodsWaterfall from '../../../components/GoodsWaterfall.vue'
	export default {
		components:{
			GoodsWaterfall
		},
		data() {
			return {
				editShow: false,
				goodsList: [{
					image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					title: '谁念西风独自凉',
					detail: '谁念西'
				}, {
					image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					title: '谁念西风独自凉',
					detail: '谁念西'
				}, {
					image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					title: '谁念西风独自凉',
					detail: '谁念西风独的'
				}, {
					image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					title: '谁念西风独自凉',
					detail: '谁念西风独'
				}, {
					image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					title: '谁念西风独自凉',
					detail: '谁念西风独'
				}]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodsHome {
		
		.head {
			display: flex;
			align-items: center;
			margin-bottom: 46rpx;
			.headIcon {
				width: 122rpx;
				height: 122rpx;
				margin-left: 66rpx;
			}

			.describe {
				display: flex;
				flex-direction: column;
				margin-left: 40rpx;

				.name {
					font-size: 36rpx;
					font-weight: 500;
					color: #333333;
				}

				.id {
					font-size: 24rpx;
					font-weight: 400;
					color: #666666;
					margin-top: 4rpx;
				}
			}
		}
		.popupHead{
			width: 516rpx;
			height: 94rpx;
			background: #25EFCF;
			font-size: 40rpx;
			font-weight: 500;
			color: #333333;
			line-height: 94rpx;
			padding-left: 60rpx;
		}
		.popupItem{
			height: 100rpx;
			line-height: 100rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			padding-left: 60rpx;
		}
		
	}
</style>
