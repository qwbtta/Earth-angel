<template>
	<view class="goodsHome">
		<view class="headCon">
			<view class="head">
				<image :src="avatar" mode="" class="headIcon"></image>
				<view class="describe">
					<text class="name">{{name}}</text>
					<text class="id" @longpress="copy">ID：{{id}}</text>
				</view>
			</view>
		</view>
		<view class="tabCon">
			<view :class="index==selectedIndex?'headItem-s':'headItem'" v-for="(item,index) in tabs" :key="index"
				@click="select(index)">
				<text>{{item}}</text>
				<image src="/static/common/image/smile.png" mode="" class="smile" v-if="index==selectedIndex"></image>
			</view>
			<view :class="selectedIndex==1?'tips-s':'tips'" v-if="wantList.length>0">
				<text>{{wantList.length}}</text>
			</view>
		</view>

		<!-- <GoodsWaterfallS :goodsList="flowList" :isMyHome="isMyHome"  @edit="editShow = true" v-if="waterCreate"/> -->

		<view class="loadingCon">
			<u-loading :show="followLoading" size="200"></u-loading>
		</view>

		<wfallsFlow :list="goodsList" ref="wfallsNo3" @edit="editShow = true"
			v-show="!followLoading && selectedIndex==0"></wfallsFlow>
		<view class="remind" v-if="selectedIndex==0 && goodsList.length==0">
		
			<text class="remindInfo">您还没有发布物品哦，快去发布更多更多物品吧~</text>
		
		</view>

		<view class="wantList" v-if="selectedIndex==1">
			<view class="wantItem" v-for="(item,index) in wantList" :key="index">
				<view class="itemHead">
					<view class="headLeft">
						<image :src="item.userInfo.icon" mode="" class="headIcon"></image>
						<view class="headDesc">
							<text>{{item.userInfo.name}}</text>
							<text>{{'想要你的"'+ item.goodsInfo.name+'"'}}</text>
						</view>
					</view>
					<image :src="item.goodsInfo.imgUrls[0]" mode="aspectFit" class="goodsImg"></image>
				</view>
				<view class="itemBottom">
					<view class="bottomLeft" @click="goChat(item)">
						<image src="/static/common/image/chat.png" mode="" class="chatImg"></image><text>和TA聊聊</text>
					</view>
					<button type="default" class="btn" @click="give(item)">赠送</button>
				</view>
			</view>
		</view>




		<u-popup v-model="editShow" mode="center" border-radius="20">
			<view class="popupHead">
				管理物品
			</view>
			<view class="popupItem" @click="edit">
				重新编辑
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
	import wfallsFlow from '@/components/wfalls-flow/wfalls-flow'
	export default {
		components: {
			GoodsWaterfallS,
			wfallsFlow
		},
		data() {
			return {
				tabs: ["我的物品", "有谁想要"],
				name: "",
				id: "",
				avatar: "",
				isMyHome: false,
				editShow: false,
				goodsList: [],
				flowList: [],
				repeatId: "",
				waterCreate: false,
				selectedIndex: 0,
				wantList: [],
				followLoading: false
			}
		},
		methods: {
			select(index) {
				console.log(index);
				this.selectedIndex = index
				if (this.selectedIndex == 0) {
					this.getMyList()
				} else if (this.selectedIndex == 1) {
					this.giveList()
				}
			},
			getMyList() {
				this.followLoading = true
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
						_this.followLoading = false
					}, 600)

				})
			},
			giveList() {
				let parameter = {}
				parameter.uidList = [this.vuex_openid]
				parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
				this.$u.api.get_users_items(parameter).then(res => {
					this.wantList = []
					let wantList = []
					console.log(res.data[0].items, "dddddddddd");
					let wantGroup = res.data[0].items.filter(item => item.toUser.length == 0 && item.wantedUid
						.length > 0)
					console.log(wantGroup, "wantGroupwantGroup");

					for (let i = 0; i < wantGroup.length; i++) {
						
						this.$req('/user/get_user_info', {
							uidList: wantGroup[i].wantedUid,
							operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
						}).then(res => {
							for (let u = 0; u < res.data.length; u++) {
								let item = {}
								item.goodsInfo = wantGroup[i]
								item.userInfo = res.data[u]
								wantList.push(item)
							}

						})
					}
					// this.tipsNum = this.wantList.length
					this.wantList = wantList
					if (this.wantList.length == 0) {
						uni.hideTabBarRedDot({
							index: 3
						})
						this.$u.vuex('vuex_noticeNumber', 0)
					}
					console.log(this.wantList.length, "this.wantListthis.wantListthis.wantList");
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
			goChat(item) {
				this.$u.vuex('vuex_goodsInfo', item.goodsInfo)
				uni.navigateTo({
					url: '../../chatPart/chatPage?where=whoWant&userId=' + item.userInfo.uid
				})
			},
			give(item) {
				console.log(item, "5555555");
				let parameter = {}
				parameter.itemId = item.goodsInfo.itemId
				parameter.uid = item.userInfo.uid
				parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
				this.$u.api.gift_item(parameter).then(res => {
					console.log(res);
					if (res.errCode == 0) {
						this.$u.toast('赠送成功', 2000)
						this.giveList()
					}
				})
			},
			edit() {
				console.log(this.vuex_goodsInfo);
				if(this.vuex_goodsInfo.toUser.length>0){
					this.$u.toast('该物品已送出,无法编辑')
					return
				}
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
						this.getMyList()
						this.$u.toast('删除成功');
					} else {
						this.$u.toast('删除失败');
					}
				})
			}
		},
		onLoad(options) {
			this.isMyHome = true
			this.name = this.vuex_nick_name
			this.id = this.vuex_openid
			this.avatar = this.vuex_avatar_url
			this.getMyList()
			this.giveList()
			if (this.vuex_noticeNumber > 0) {
				this.selectedIndex = 1
			}
		},
		onShow() {

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
				width: 100%;
				height: 220rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 8rpx 4rpx rgba(0, 0, 0, 0.1);
				border-radius: 20rpx;
				display: flex;
				align-items: center;

				.headIcon {
					width: 122rpx;
					height: 122rpx;
					border-radius: 122rpx;
					margin-left: 40rpx;
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
		}

		.tabCon {
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			position: relative;
			height: 70rpx;

			.tips-s {
				width: 36rpx;
				height: 36rpx;
				border-radius: 36rpx;
				background: #F80A00;
				text-align: center;
				line-height: 36rpx;
				font-size: 22rpx;
				font-weight: 600;
				color: #FFFFFF;
				position: absolute;
				right: 20%;
				top: 0;
			}

			.tips {
				width: 34rpx;
				height: 34rpx;
				background: #FFA29E;
				border-radius: 34rpx;
				text-align: center;
				line-height: 34rpx;
				font-size: 20rpx;
				font-weight: 600;
				color: #FFFFFF;
				position: absolute;
				right: 20%;
				top: 10%;
			}

			.headItem-s {
				font-size: 28rpx;
				font-weight: 500;
				color: #333333;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.headItem {
				font-size: 24rpx;
				font-weight: 500;
				color: #888888;
			}

			.smile {
				width: 68rpx;
				height: 14rpx;
				margin-top: 4rpx;
			}
		}

		.wantList {
			padding: 0 48rpx;
			margin: 4rpx;

			.wantItem {
				width: 100%;
				height: 282rpx;
				background: #F1F1F1;
				border-radius: 8rpx;
				padding: 0 32rpx;
				margin-top: 24rpx;

				.itemHead {
					border-bottom: 2rpx solid #D8D8D8;
					height: 180rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.headLeft {
						display: flex;
						align-items: center;

						.headIcon {
							width: 72rpx;
							height: 72rpx;
							border-radius: 72rpx;
							margin-right: 16rpx;
						}

						.headDesc {
							font-size: 26rpx;
							font-weight: 400;
							color: #000000;
							display: flex;
							flex-direction: column;
						}
					}

					.goodsImg {
						width: 100rpx;
						height: 100rpx;
					}
				}

				.itemBottom {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 100rpx;

					.bottomLeft {
						font-size: 26rpx;
						font-weight: 400;
						color: #000000;
						display: flex;
						align-items: center;

						.chatImg {
							width: 32rpx;
							height: 36rpx;
							margin-right: 10rpx;
						}
					}

					.btn {
						margin: 0;
						padding: 0;
						width: 112rpx;
						height: 44rpx;
						background: #25EFCF;
						border-radius: 24rpx;
						border: 2rpx solid #000000;
						font-size: 24rpx;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
					}
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
