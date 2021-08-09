<template>
	<view class="goodsHome">
		<view class="head">
			<image :src="avatar" mode="" class="headIcon"></image>
			<view class="describe">
				<text class="name">{{name}}</text>
				<text class="id" @longpress="copy">ID：{{id}}</text>
			</view>
		</view>

		<GoodsWaterfallS :goodsList="flowList" :isMyHome="isMyHome"  @edit="editShow = true" v-if="waterCreate"/>

		
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
	import GoodsWaterfallS from '../../../components/GoodsWaterfallS.vue'
	export default {
		components: {
			GoodsWaterfallS
		},
		data() {
			return {
				name: "",
				id: "",
				avatar: "",
				isMyHome: false,
				editShow: false,
				goodsList: [],
				flowList: [],
				repeatId: "",
				waterCreate:false
			}
		},
		methods: {
			
			getList() {
				this.waterCreate = false
				let parameter = {}
				parameter.uidList = [this.id]
				parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
				this.$u.api.get_users_items(parameter).then(res => {
					console.log(res.data[0].items);
					this.goodsList = res.data[0].items
					this.goodsList = this.goodsList.filter(item=>item.toUser.length==0)
					this.flowList = []
					for (let i = 0; i < this.goodsList.length; i++) {
						let item = JSON.parse(JSON.stringify(this.goodsList[i]))
						this.flowList.push(item)
					}
					this.waterCreate = true
					console.log(this.flowList, "6666");

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
					console.log(res,"11111");
					if (res.errCode == 0) {
						this.getList()
						this.$u.toast('删除成功');
					} else {
						this.$u.toast('删除失败');
					}
				})
			}
		},
		onLoad(options) {
			this.repeatId = options.id
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
		},
		onShow() {
			if (this.repeatId == this.vuex_openid) {
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
