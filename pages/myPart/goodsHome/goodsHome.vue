<template>
	<view class="goodsHome">
		<view class="head">
			<image :src="avatar" mode="" class="headIcon"></image>
			<view class="describe">
				<text class="name">{{name}}</text>
				<text class="id" @longpress="copy">ID：{{id}}</text>
			</view>
		</view>

		<GoodsWaterfall :goodsList="goodsList" :isMyHome="isMyHome" @edit="editShow = true" />

		<u-popup v-model="editShow" mode="center" border-radius="20">
			<view class="popupHead">
				管理物品
			</view>
			<view class="popupItem" @click="edit">
				编辑详情
			</view>
			<u-line color="#EFEFEF" />
			<view class="popupItem" @click="deleteGoods">
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
		components: {
			GoodsWaterfall
		},
		data() {
			return {
				name: "",
				id: "",
				avatar: "",
				isMyHome: false,
				editShow: false,
				goodsList: []
			}
		},
		methods: {
			getList() {
				let parameter = {}
				parameter.openIdList = [this.id]
				parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
				this.$u.api.get_users_items(parameter).then(res => {
					console.log(res.data[0].items);
					this.goodsList = res.data[0].items
					console.log(this.goodsList,"6666");
					
				})
			},
			copy() {
				let _this = this
				uni.setClipboardData({
					data: _this.id,
					success: function() {
						uni.hideToast()
						uni.showToast({
							title: '复制成功',
							duration: 2000
						});
					}
				});
			},
			edit() {
				console.log(this.vuex_goodsInfo);
				this.$u.vuex('vuex_releaseState', 1);
				uni.switchTab({
					url: '../../releasePart/release'
				})
			},
			deleteGoods() {
				let parameter = {}
				parameter.itemIdList = [this.vuex_goodsInfo.itemId]
				parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
				this.$u.api.delete_item(parameter).then(res => {
					this.editShow = false
					if (res.errCode == 0) {
						this.getList()
					} else {
						this.$u.toast('删除失败');
					}

				})
			}
		},
		onLoad(options) {
			if (options.id == this.vuex_openid) {
				this.isMyHome = true
				this.name = this.vuex_nick_name
				this.id = this.vuex_openid
				this.avatar = this.vuex_avatar_url
				this.getList()

			} else {
				this.isMyHome = false
				this.name = this.vuex_search.name
				this.id = this.vuex_search.uid
				this.avatar = this.vuex_search.icon
				this.getList()
				
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
				border-radius: 122rpx;
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

		.popupHead {
			width: 516rpx;
			height: 94rpx;
			background: #25EFCF;
			font-size: 40rpx;
			font-weight: 500;
			color: #333333;
			line-height: 94rpx;
			padding-left: 60rpx;
		}

		.popupItem {
			height: 100rpx;
			line-height: 100rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			padding-left: 60rpx;
		}

	}
</style>
