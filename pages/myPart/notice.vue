<template>
	<view class="notice">
		<view class="title">待处理</view>
		<view class="main">
			<view class="noticeItem" v-for="item in applyList" :key="item.id">
				<view class="left u-flex">
					<image :src="item.fromUserFaceURL" mode="" class="itemImg"></image>
					<view class="info">
						<text class="user">{{item.fromUserNickName}}</text>
						<text class="behavior">申请加入{{item.groupName}}</text>
					</view>
				</view>
				<button type="default" class="btn" @click="agreeJoin(item)">同意</button>
			</view>
			<view class="noticeItem" v-for="item in list" :key="item.uid">
				<view class="left u-flex">
					<image :src="item.icon" mode="" class="itemImg"></image>
					<view class="info">
						<text class="user">{{item.name}}</text>
						<text class="behavior">申请加你为好友</text>
					</view>
				</view>
				<button type="default" class="btn" @click="agree(item)">同意</button>
			</view>
			
			<view class="noticeItem" v-for="item in wantList" :key="item.itemId">
				<view class="left u-flex">
					<image :src="item.imgUrls[0]" mode="" class="itemImg"></image>
					<view class="info">
						<text class="user">{{item.name}}</text>
						<text class="behavior">有人想要该物品</text>
					</view>
				</view>
				<button type="default" class="btn" @click="goDtail(item)">查看</button>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				applyList: [],
				wantList: [],
			}
		},
		methods: {
			agree(e) {
				this.$req('/friend/add_friend_response', {
					uid: e.uid,
					flag: 1,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res)
					if (res.errCode == 0) {
						this.$u.toast('添加好友成功')
						this.getList()
					}
				})
			},
			agreeJoin(e) {
				console.log(e);
				this.$req('/group/group_application_response', {
					groupID: e.groupID,
					fromUserID: e.fromUserID,
					toUserID: "0",
					// toUserID: this.vuex_openid,
					addTime: e.createTime,
					fromUserNickName: e.fromUserNickName,
					fromUserFaceUrl: e.fromUserFaceURL,
					requestMsg: e.handledMsg,
					handledMsg: e.handledMsg,
					type: e.type,
					handleStatus: 2,
					handleResult: 1,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res);
					if (res.errCode == 0) {
						this.$u.toast('同意申请成功')
						this.getList()
					}
				})
			},
			goDtail(e){
				console.log(e, "45455454");
				this.$u.vuex('vuex_goodsInfo', e);
				uni.navigateTo({
					url: '/pages/findPart/goodsDetail'
				})
			},
			getList() {
				this.$req('/friend/get_friend_apply_list', {
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res)
					if (res.errCode == 0) {
						this.list = res.data.filter(item => item.flag == 0)
					}
					console.log(this.list)
				})


				this.$req('/group/get_group_applicationList', {
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res, "申请列表")
					let list = res.data.user.filter(item => item.handleStatus  == 0)

					let ids = list.map(item => item.groupID)

					this.$req('/group/get_groups_info', {
						groupIDList: ids,
						operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
					}).then(res => {
						if (res.errCode == 0) {
							for (let i = 0; i < list.length; i++) {
								for (let y = 0; y < res.data.length; y++) {
									if (list[i].groupID == res.data[y].groupId) {
										list[i].groupName = res.data[y].groupName
										break
									}
								}
							}
							this.applyList = list
							console.log(this.applyList, "this.applyList =");
						}
						
						
						let parameter = {}
						parameter.uidList = [this.vuex_openid]
						parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
						this.$u.api.get_users_items(parameter).then(res=>{
							console.log(res.data[0].items,"其他闲置");
							this.wantList = res.data[0].items.filter(item => item.wantedUid.length>0)
							
							if (this.list.length == 0 && this.applyList.length == 0 && this.wantList.length==0) {
								this.$u.vuex('vuex_noticeNumber', 0)
								uni.hideTabBarRedDot({
									index: 3
								})
							}
							
							
							
						})
						
						
						
						
						
						
						


					})



				})
			}
		},
		onShow() {
			this.getList()
		}
	}
</script>


<style lang="scss" scoped>
	.notice {

		.title {
			height: 100rpx;
			line-height: 100rpx;
			padding-left: 48rpx;
			margin-bottom: 16rpx;
			font-size: 32rpx;
			font-weight: 400;
			color: #000000;
			background-color: #F1F1F1;
		}

		.main {
			.noticeItem {
				height: 150rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 8rpx;
				background-color: #F1F1F1;
				padding: 0 48rpx;

				.left {
					.itemImg {
						width: 76rpx;
						height: 76rpx;
						border-radius: 76rpx;
					}

					.info {
						display: flex;
						flex-direction: column;
						margin-left: 16rpx;

						.user {
							font-size: 28rpx;
							font-weight: 400;
							color: #000000;
						}

						.behavior {
							font-size: 22rpx;
							font-weight: 500;
							color: #333333;
							margin-top: 6rpx;
						}
					}
				}

				.btn {
					padding: 0;
					margin: 0;
					background: #25EFCF;
					border: 2rpx solid #000000;
					width: 116rpx;
					height: 46rpx;
					border-radius: 24rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #333333;
					line-height: 46rpx;
				}

			}
		}
	}
</style>
