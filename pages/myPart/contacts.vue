<template>
	<view class="contacts">

		<!-- <view class="head">
			<view :class="[index==selectedIndex?'headItem-s':'','headItem']" v-for="(item,index) in tabs" :key="index"
				@click="select(index)">
				<text>{{item}}</text>
			</view>

		</view> -->
		<view class="main">
			<view class="remind" v-if="friends.length==0">
			
				<text class="remindInfo">还没有关注的人哦，快去关注更多人吧～</text>
			
			</view>
			<view class="followItem u-flex" v-for="item in friends" :key="item.uid" v-if="selectedIndex==0"
				>
				<image :src="item.icon" mode="" class="itemImg" @click="goHomePage(item)"></image>
				<view class="followItemRight">
					<text class="name">{{item.name}}</text>
					<view class="cancel" @click="showCancelPopup(item)">
						取消关注
					</view>
				</view>

			</view>
			<view class="mainItem u-flex" v-for="item in manageGroup" :key="item.groupInfo.groupId"
				v-if="selectedIndex==1" @click="goMore(item)">
				<image :src="item.groupInfo.faceUrl" mode="" class="itemImg"></image>
				<text class="name">{{item.groupInfo.groupName}}</text>
			</view>
			<view class="mainItem u-flex" v-for="item in joinGroup" :key="item.groupInfo.groupId"
				v-if="selectedIndex==2" @click="goMore(item)">
				<image :src="item.groupInfo.faceUrl" mode="aspectFit" class="itemImg"></image>
				<text class="name">{{item.groupInfo.groupName}}</text>
			</view>

		</view>


		<u-popup v-model="showPopup" mode="center" border-radius="12">
			<view class="popupMain">
				<view class="popupHead">
					<text>{{'确定要取消对"'+ cancelInfo.name +'"的关注吗?'}}</text>
				</view>
				<view class="popupFooter u-flex">
					<view class="popupFooterItem" @click="showPopup = false">
						取消
					</view>
					<view class="popupFooterItem confirm" @click="confirm">
						确定
					</view>
				</view>
			</view>

		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: ["我的关注", "我管理的群组", "我加入的群组"],
				selectedIndex: 0,
				friends: [],
				manageGroup: [],
				joinGroup: [],
				showPopup: false,
				cancelInfo: {}
			}
		},
		methods: {
			confirm(){
				this.$u.api.unfollow({
					uid:this.cancelInfo.uid,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res=>{
					console.log(res);
					this.getFollowList()
					this.showPopup= false
				})
			},
			showCancelPopup(e) {
				console.log(e);
				this.cancelInfo = e
				this.showPopup = true
			},
			getFollowList(){
				this.$u.api.get_self_follow({
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res, "44444444");
					if (res.data.length > 0) {
						this.$req('/user/get_user_info', {
							uidList: res.data,
							operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
						}).then(res => {
							console.log(res, "8888888888")
							this.friends = res.data
						})
					}else{
						this.friends = []
					}
				
				})
			},
			select(index) {
				console.log(index);
				this.selectedIndex = index
				if (this.selectedIndex == 0) {
					this.getFollowList()
				} else if (this.selectedIndex == 1) {
					this.manageGroup = []
					let groupListId = []
					this.$req('/group/get_joined_group_list', {
						operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
					}).then(res => {

						groupListId = res.data.filter(item => item.ownerId == this.vuex_openid)
						console.log(groupListId, "管理");
						for (let i = 0; i < groupListId.length; i++) {

							this.$req('/group/get_group_member_list', {
								groupID: groupListId[i].groupId,
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
										userInfo.groupId = groupListId[i].groupId
										userList.push(userInfo)

									}
									console.log(userList, "拼接");


									// console.log(groupListId, "99999999999999999");
									let parameter = {}
									parameter.usersInfoList = userList
									parameter.operationId = this.vuex_openid + JSON.stringify(
										new Date().getTime())
									this.$u.api.get_group_users_items(parameter).then(res => {
										let trans = res.data
										let item = {}
										item.groupInfo = groupListId[i]
										item.goodsList = []
										res.data.forEach(val => {
											item.goodsList = [...item
												.goodsList, ...val.items
											]
										})

										this.manageGroup.push(item)

									})
								})
							})

						}


					})
					console.log(this.manageGroup, "管理管理管理管理");
				} else if (this.selectedIndex == 2) {
					this.joinGroup = []
					let groupListId = []
					this.$req('/group/get_joined_group_list', {
						operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
					}).then(res => {
						// this.joinGroup = res.data
						groupListId = res.data
						console.log(res.data, "群列表");
						for (let i = 0; i < res.data.length; i++) {

							this.$req('/group/get_group_member_list', {
								groupID: res.data[i].groupId,
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
										userInfo.groupId = groupListId[i].groupId
										userList.push(userInfo)

									}
									console.log(userList, "拼接");


									// console.log(groupListId, "99999999999999999");
									let parameter = {}
									parameter.usersInfoList = userList
									parameter.operationId = this.vuex_openid + JSON.stringify(
										new Date().getTime())
									this.$u.api.get_group_users_items(parameter).then(res => {
										let trans = res.data
										let item = {}
										item.groupInfo = groupListId[i]
										item.goodsList = []
										res.data.forEach(val => {
											item.goodsList = [...item
												.goodsList, ...val.items
											]
										})

										this.joinGroup.push(item)

									})
								})
							})

						}



					})

					console.log(this.joinGroup, "列表列表");

				}






			},
			goHomePage(e) {
				this.$u.vuex('vuex_search', e);
				uni.navigateTo({
					url: './goodsHome/goodsHome?id=' + e.uid
				})
			},
			async goMore(e) {
				console.log(e, "eeeeeeeeeeeeeeee");
				await this.$u.vuex('vuex_groupList', e)
				uni.navigateTo({
					url: '../findPart/group/group'
				})
			}

		},
		mounted() {
			this.getFollowList()
			

		}
	}
</script>

<style lang="scss" scoped>
	.contacts {
		.head {
			height: 104rpx;
			background: #F1F1F1;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			margin-bottom: 12rpx;

			.headItem {
				font-size: 28rpx;
				font-weight: 400;
				color: #000000;
			}

			.headItem-s {
				padding: 0 28rpx;
				height: 48rpx;
				background: #25EFCF;
				border-radius: 24rpx;
				border: 2px solid #000000;
				text-align: center;
			}
		}

		.main {
			padding-left: 48rpx;

			.followItem {
				margin-top: 28rpx;

				.itemImg {
					width: 84rpx;
					height: 84rpx;
					border-radius: 84rpx;
					flex-shrink: 0;
					margin-right: 28rpx;
				}

				.followItemRight {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 132rpx;
					width: 100%;
					border-bottom: 2rpx solid #E9E9E9;

					.name {
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
					}

					.cancel {
						text-align: center;
						line-height: 58rpx;
						width: 128rpx;
						height: 58rpx;
						border-radius: 8rpx;
						border: 2rpx solid #999999;
						font-size: 26rpx;
						font-weight: 500;
						color: #999999;
						margin-right: 48rpx;
					}
				}

			}

			.mainItem {
				margin-top: 28rpx;

				.itemImg {
					width: 84rpx;
					height: 84rpx;
					border-radius: 84rpx;
				}

				.name {
					font-size: 32rpx;
					font-weight: 400;
					color: #000000;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
