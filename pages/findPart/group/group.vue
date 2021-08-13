<template>
	<view class="group">
		<view class="head">

			<image :src="groupInfo.faceUrl" mode="" class="headIcon"></image>
			<view class="headRight">
				<view class="nameCon">
					<text class="groupName">{{groupInfo.groupName}}</text>
					<text class="Id" @longpress="copy">ID: {{groupInfo.groupId}}</text>
				</view>
				<view class="buttonCon">
					<button type="default" class="share" open-type="share">分享</button>
					<button type="default" class="manage" @click="goManage" v-if="isAdmin">群管理</button>
					<button type="default" class="manage" v-else @click="exitGroup">退出群组</button>
				</view>
			</view>


		</view>
		<view class="bulletin-board">
			<image src="/static/common/image/horn.png" mode="" class="horn"></image>
			<text class="boardText">{{groupInfo.notification.length>0?groupInfo.notification:'暂无公告'}}</text>
		</view>


		<GoodsWaterfall :goodsList="flowList" v-if="showWaterfall" />

	</view>
</template>

<script>
	import GoodsWaterfall from '../../../components/GoodsWaterfall.vue'
	import {
		shareMixins
	} from '@/common/mixins/share.js'
	export default {
		mixins: [shareMixins],
		components: {
			GoodsWaterfall
		},
		data() {
			return {
				showWaterfall: false,
				isAdmin: true,
				flowList: [],
				goodsList: [],
				groupInfo: {}
			}
		},
		methods: {
			copy() {
				let _this = this
				uni.setClipboardData({
					data: _this.groupInfo.groupId,
					success: function() {
						uni.hideToast()
						uni.showToast({
							title: '复制成功',
							duration: 2000
						});
					}
				});
			},
			goManage() {
				this.$u.vuex('vuex_groupid', this.groupInfo.groupId)
				uni.navigateTo({
					url: './groupManage'
				})
			},
			exitGroup() {
				this.$req('/group/quit_group', {
					groupID: this.groupInfo.groupId,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res);
					if (res.errCode == 0) {
						uni.navigateBack({
							delta: 1
						});
						this.$u.toast('退出群组成功', 2000)
					}

				})
			},
			getList(){
				
				let gpid = ""
				if(this.vuex_groupShareId.length>0){
					gpid = this.vuex_groupShareId
					this.$u.vuex('vuex_groupShareId', "")
				}else{
					gpid = this.vuex_groupList.groupInfo.groupId
				}
				this.goodsList= []
				this.$req('/group/get_groups_info', {
					groupIDList: [gpid],
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					
					console.log(res.data,"群信息");
					
					
					this.groupInfo = res.data[0]
					this.shareData.path = '/pages/findPart/group/group?groupId=' + this.groupInfo.groupId
					this.$req('/group/get_group_member_list', {
						groupID: this.groupInfo.groupId,
						nextSeq: 0,
						operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
					}).then(res => {
						console.log(res, "群成员");
				
						let ids = res.data.map(item => item.userId)
						this.$req('/user/get_user_info', {
							uidList: ids,
							operationID: this.vuex_openid + JSON.stringify(new Date()
								.getTime())
						}).then(res => {
				
							var userList = []
							for (let t = 0; t < res.data.length; t++) {
								let userInfo = {}
								userInfo.name = res.data[t].name
								userInfo.icon = res.data[t].icon
								userInfo.uid = res.data[t].uid
								userInfo.groupId = this.groupInfo.groupId
								userList.push(userInfo)
				
							}
				
							this.showWaterfall = false
							// console.log(groupListId, "99999999999999999");
							let parameter = {}
							parameter.usersInfoList = userList
							parameter.operationId = this.vuex_openid + JSON.stringify(
								new Date().getTime())
							this.$u.api.get_group_users_items(parameter).then(res => {
								console.log(res,"申请发送申请发送成功申请发送成功申请发送成功");
								// let trans = res.data
								// let item = {}
								// item.groupInfo = groupListId[i]
								// item.goodsList = []
								res.data.forEach(val => {
									let ll = []
									ll = [...val.items]
									this.goodsList = this.goodsList.concat(ll)
									console.log(this.goodsList,";p;p;p;p;p;p;p;p;p;p;p;p;p;p");
								})
								// console.log(this.goodsList,"this.goodsListthis.goodsListthis.goodsList");
								if (this.goodsList != 0) {
									
									this.flowList = []
									for (let i = 0; i < this.goodsList.length; i++) {
										let item = JSON.parse(JSON.stringify(this.goodsList[
											i]))
										this.flowList.push(item)
									}
									// let _this = this
									// setTimeout(function() {
									// 	this.showWaterfall = true
									// }, 300)
									this.showWaterfall = true
									this.goodsList = []
									
									
								}
				
				
								console.log(this.flowList, "物品列表");
				
				
							})
				
						})
					})
				
				
				
				})
				
			}
		},
		onLoad() {
			this.getList()
		},
		onShow() {
			//uview的瀑布流组件有问题啊
			this.getList()
			let _this = this
			setTimeout(function() {
				_this.getList()
			}, 300)
			
			
			
			
			this.groupInfo = this.vuex_groupList.groupInfo
			if (this.vuex_groupList.groupInfo.ownerId == this.vuex_openid) {
				this.isAdmin = true
			} else {
				this.isAdmin = false
			}

			// console.log(this.vuex_groupList, "4444444444444");
			

			// if (this.vuex_groupList.goodsList.length != 0) {
			// 	// this.showWaterfall = false
			// 	this.goodsList = this.vuex_groupList.goodsList
			// 	this.flowList = []
			// 	for (let i = 0; i < this.goodsList.length; i++) {
			// 		let item = JSON.parse(JSON.stringify(this.goodsList[i]))
			// 		this.flowList.push(item)
			// 	}

			// 	// this.showWaterfall = true
			// }


			// console.log(this.flowList, "物品列表");

		},
		onPullDownRefresh(){
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	.group {
		border-top: 1px solid #DBDEE3;
		padding-top: 34rpx;

		.btn {
			padding: 0;
			background: #25EFCF;
			border: 1px solid #000000;
			font-weight: 500;
		}

		.head {
			display: flex;
			align-items: center;
			margin: 0 48rpx;

			.headIcon {
				flex-shrink: 0;
				width: 72rpx;
				height: 72rpx;
				border-radius: 72rpx;
			}

			.headRight {
				width: 100%;
				margin-left: 16rpx;
				display: flex;
				justify-content: space-between;

				.nameCon {
					flex-shrink: 0;
					display: flex;
					flex-direction: column;

					.groupName {
						font-size: 32rpx;
						font-weight: 500;
						color: #000000;
					}

					.Id {
						max-width: 330rpx;
						font-size: 20rpx;
						font-weight: 400;
						color: #333333;
						word-break: break-all;
					}
				}

				.buttonCon {
					display: flex;
					align-items: flex-start;
					justify-content: space-between;
					width: 100%;
					margin-left: 14rpx;

					.share {
						margin: 0;
						@extend .btn;
						width: 64rpx;
						height: 40rpx;
						font-size: 20rpx;
						border-radius: 8rpx;
						line-height: 40rpx;
					}


					.manage {
						margin: 0;
						@extend .btn;
						// width: 110rpx;
						padding: 0 10rpx;
						height: 46rpx;
						font-size: 28rpx;
						border-radius: 8rpx;
						line-height: 46rpx;
					}
				}
			}


		}

		.bulletin-board {
			margin: 40rpx 48rpx 36rpx;
			padding: 20rpx 24rpx;
			display: flex;
			background: #FEFFF0;
			border-radius: 8rpx;
			border: 1px solid #000000;

			.horn {
				flex-shrink: 0;
				width: 44rpx;
				height: 44rpx;
			}

			.boardText {
				margin-left: 10rpx;
				font-size: 24rpx;
				font-weight: 400;
			}
		}

		.waterfallCon {
			padding: 0 24rpx;
			display: block;
			margin: 0 auto;
			margin-top: 36rpx;

			.goodsItem {
				margin: 0 20rpx;

				.describe {
					.goodsHead {
						margin-top: 20rpx;
						justify-content: space-between;

						.goodsHeadLeft {
							.goodsHeadIcon {
								width: 64rpx;
								height: 64rpx;
								border-radius: 64rpx;
							}

							.goodsName {
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



	}
</style>
