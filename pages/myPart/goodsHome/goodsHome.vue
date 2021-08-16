<template>
	<view class="goodsHome">
		<view class="headCon">
			<view class="head">
				<view class="headLeft u-flex">
					<image :src="avatar" mode="" class="headIcon"></image>
					<view class="describe">
						<text class="name">{{name}}</text>
						<text class="id" @longpress="copy">ID：{{id}}</text>
					</view>
				</view>
				<button type="default" class="btn" @click="follow" v-if="isFollow == false">关注</button>
				<button type="default" class="btn" @click="cancelFollow" v-if="isFollow == true">取消关注</button>
			</view>
		</view>

		<u-divider color="#999999" half-width="250" border-color="#D8D8D8">TA的物品</u-divider>
		<!-- <GoodsWaterfallS :goodsList="flowList" :isMyHome="isMyHome"  @edit="editShow = true" v-if="waterCreate"/> -->

		<wfallsFlow :list="goodsList" ref="wfallsNo3" @edit="editShow = true"></wfallsFlow>
		<view class="remind" v-if="goodsList.length==0">
		
			<text class="remindInfo">TA还没有发布物品哟~</text>
		
		</view>

		


	</view>
</template>

<script>
	import GoodsWaterfallS from '../../../components/GoodsWaterfallS.vue'
	import wfallsFlow from '@/components/wfalls-flow/wfalls-flow'
	export default {
		components: {
			GoodsWaterfallS,
			wfallsFlow
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
				waterCreate: false,
				isFollow: false
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
					// this.goodsList = this.goodsList.filter(item=>item.toUser.length==0)

					// this.flowList = []
					// for (let i = 0; i < this.goodsList.length; i++) {
					// 	let item = JSON.parse(JSON.stringify(this.goodsList[i]))
					// 	this.flowList.push(item)
					// }
					// this.waterCreate = true

					let _this = this
					setTimeout(function() {
						_this.$refs.wfallsNo3.init();
					}, 300)
					console.log(this.flowList, "6666");

				})
			},
			follow() {

				this.$u.api.follow({
					uid: this.id,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res);
					if (res.errCode == 0) {
						this.isFollow = true
					}
				})


			},
			cancelFollow() {
				this.$u.api.unfollow({
					uid: this.id,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res);
					if (res.errCode == 0) {
						this.isFollow = false
					}
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
					console.log(res, "11111");
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
			console.log(this.vuex_search, "this.vuex_searchthis.vuex_searchthis.vuex_search”");
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
			// this.isMyHome = false
			// this.name = this.vuex_search.name
			// this.id = this.vuex_search.uid
			// this.avatar = this.vuex_search.icon
			// this.getList()
			this.$u.api.is_follow({
				uid: this.id,
				operationId: this.vuex_openid + JSON.stringify(new Date().getTime())
			}).then(res => {
				console.log(res.data.followed, "yiyiyiyiyiyi");
				this.isFollow = res.data.followed
			})
		}
	}
</script>

<style lang="scss" scoped>
	.goodsHome {
		padding-top: 20rpx;

		.headCon {
			padding: 0 48rpx;
			margin-bottom: 40rpx;

			.head {
				padding: 0 32rpx;
				width: 100%;
				height: 220rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 8rpx 4rpx rgba(0, 0, 0, 0.1);
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.headLeft {

					.headIcon {
						width: 122rpx;
						height: 122rpx;
						border-radius: 122rpx;
						flex-shrink: 0;
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
							width: 260rpx;
							font-size: 24rpx;
							font-weight: 400;
							color: #666666;
							margin-top: 4rpx;
							word-break: break-all;
						}
					}
				}

				.btn {
					padding: 0;
					margin: 0;
					width: 128rpx;
					height: 52rpx;
					background: #25EFCF;
					border-radius: 8rpx;
					border: 2rpx solid #000000;
					font-size: 28rpx;
					font-weight: 500;
					color: #000000;
					line-height: 52rpx;
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
