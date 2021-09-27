<template>
	<view class="home">
		<u-navbar :is-back="false">
			<view class="slot-wrap">
				<image src="/static/common/image/logo.png" mode="" class="logoImg"></image>
				<text class="logoText">地球天使</text>
			</view>
		</u-navbar>
		<u-popup v-model="guide" mode="center" width="100%" height="100%">

			<view class="newUser">
				<image :src="item" mode="aspectFit" class="newUserImg" v-for="(item,index) in  newUserIMg" :key="index"
					v-if="index == imgIndex"></image>
			</view>
			<view class="operationCon">
				<text class="next" @click="next" v-show="imgIndex!=3">下一步</text>
				<view :class="imgIndex==3?'start':'skip'" @click="closeGuide">
					{{imgIndex==3?'开始':'跳过'}}
				</view>
			</view>


		</u-popup>







		<view class="main">

			<view class="searchCon">
				<view class="inputFather">
					<input type="text" placeholder="搜索用户ID" v-model="search" class="search" />
					<image src="/static/common/image/search.png" mode="" class="searchIcon" v-if="search==''">
					</image>
					<image src="/static/common/image/searchShow.png" mode="" class="searchIcon"
						@click.stop="searchFriend" v-else></image>
				</view>
				<button type="default" class="createGroup" @click="searchFriend">搜索</button>
				<!-- <button type="default" class="createGroup" @click="goNewGroup">创建群组</button> -->
			</view>

			<view class="swiperCon">
				<u-swiper :list="swiperList" mode="dot" height="350" effect3d="true" bg-color="#ffffff"
					@click="swiperClick()"></u-swiper>
			</view>
			<view class="goodsCon">
				<view class="tabCon u-flex">
					<view :class="selected==0?'tab-item-slected':'tab-item'" @click="select(0)">

						<text>我的关注 </text>
						<image v-if="selected==0" src="/static/common/image/selected.png" mode="" class="imgSlected">
						</image>
					</view>
					<view :class="selected==1?'tab-item-slected':'tab-item'" @click="select(1)">
						<text>我的发布 </text>
						<image v-if="selected==1" src="/static/common/image/selected.png" mode="" class="imgSlected">
						</image>
					</view>
					<!-- <view :class="selected==2?'tab-item-slected':'tab-item'" @click="select(2)">
						<text class="tab2">我的群组 </text>
						<image v-if="selected==2" src="/static/common/image/selected.png" mode="" class="imgSlected">
						</image>
					</view> -->
				</view>

				<view class="" v-show="selected==0">
					<wfallsFlowNo2 :list="goodsList" ref="wfallsNo2">
					</wfallsFlowNo2>
				</view>


				<view class="remind" v-if="selected==0 && goodsList.length==0">

					<text class="remindInfo">这里空空如也哦，快去添加更多关注吧～</text>
				</view>



				<view class="remind" v-if="selected==1 && myList.length==0">
					<text class="remindInfo">这里空空如也哦，快去发布你的物品吧～</text>



				</view>

				<view class="" v-show="selected==1">

					<wfallsFlowNo2 :list="myList" ref="wfalls"></wfallsFlowNo2>
				</view>

				<!-- <GoodsWaterfall :goodsList="flowList" v-if="selected==1 && flowList.length!=0" /> -->


				<view class="remind" v-if="selected==2 && groupGoodsList.length==0">
					<image src="/static/common/image/horn.png" mode="" class="horn"></image>
					<view class="remindInfo">
						<text>您还没有加入任何群组哦</text>

					</view>

				</view>


				<view class="group" v-if="selected==2 && groupGoodsList.length!=0">
					<view class="group-item" v-for="(item,index) in groupGoodsList" :key="index">
						<view class="head u-flex">
							<view class="headLeft u-flex">
								<image :src="item.groupInfo.faceUrl" mode="" class="headIcon">
								</image>
								<text class="groupName">{{item.groupInfo.groupName}}</text>
							</view>

							<button type="default" class="more" @click="goMore(item)">查看更多</button>
						</view>
						<view class="main">
							<scroll-view class="scrollArea" scroll-x="true">

								<view class="item" v-for="(user,index) in item.goodsList" :key="index">
									<view class="itemFlex">
										<image :src="user.imgUrls[0]" mode="aspectFit" class="itemImg"></image>
										<text class="title">{{user.name}}</text>
										<text class="detail">来自<text
												class="user">{{user.userName.length>5?user.userName.slice(0,5)+"...":user.userName}}</text>
											的闲置物品</text>
									</view>

								</view>
							</scroll-view>
						</view>
					</view>

				</view>

			</view>
		</view>
		<u-popup v-model="shareShow" mode="center" border-radius="20">
			<view class="shareMain">

				<text class="popupTitle">{{shareInfo.shareName}}给你分享的闲置物品</text>
				<image :src="shareInfo.imgUrls[0]" mode="aspectFit" :class="shareInfo.toUser>0?'goodsImg':'popupImg'">
				</image>
				<view class="popupInfo">
					<view class="popupInfoLeft u-flex">
						<image :src="shareInfo.icon" mode="" class="popupHeadIcon"></image>
						<text class="popupName">{{shareInfo.userName}}</text>
					</view>
					<button type="default" class="apply" @click="shareMore">查看详情</button>
				</view>
				<text class="popupDetail">{{shareInfo.desc}}</text>
			</view>
		</u-popup>

		<u-popup v-model="loginPopup" mode="center" border-radius="12">
			<view class="x-popupMain">
				<view class="x-popupHead">
					<text>您还没有登录</text>
				</view>
				<view class="x-popupFooter u-flex">
					<view class="x-popupFooterItem" @click="loginPopup = false">
						取消
					</view>
					<view class="x-popupFooterItem x-confirm" @click="goLogin">
						去登录
					</view>
				</view>
			</view>

		</u-popup>




	</view>
</template>



<script>
	import GoodsWaterfall from '../../components/GoodsWaterfall.vue'
	import wfallsFlow from '@/components/wfalls-flow/wfalls-flow'
	import wfallsFlowNo2 from '@/components/wfalls-flow/wfalls-flowNo2'
	export default {
		components: {
			GoodsWaterfall,
			wfallsFlow,
			wfallsFlowNo2
		},
		data() {
			return {
				guide: false,
				loginPopup: false,
				shareShow: false,
				imgIndex: 0,
				code: "",
				search: "",
				newUserIMg: [
					"https://earth-angel-1302656840.cos.ap-chengdu.myqcloud.com/QB8q6tZhThk05e340e0a7046b7b8ed46a72d25bd3423.png",
					"https://earth-angel-1302656840.cos.ap-chengdu.myqcloud.com/n3kiy2q2A3Pzb69530f2d111adf64fbe4e60edd54687.png",
					"https://earth-angel-1302656840.cos.ap-chengdu.myqcloud.com/L5XXRyuBpAvYbeb399a5c090f0207126cb04b2d91a51.png",
					"https://earth-angel-1302656840.cos.ap-chengdu.myqcloud.com/3mRKH5iBId5485298324f016f17874732e5bfae9941e.png"
				],
				swiperList: [
					// {
					// 	image: "https://earth-angel-1302656840.cos.ap-chengdu.myqcloud.com/qgoMSh0vrxvB723ec2ba686d9b9060b6c8dd23275a35.png",
					// },
					{
						image: "https://earth-angel-1302656840.cos.ap-chengdu.myqcloud.com/oG0xUPaAeFLt9a266210615d867291d7fbed30b3f958.png",
					},
					{
						image: "https://earth-angel-1302656840.cos.ap-chengdu.myqcloud.com/oc6pBUNa7UR1749094ec0b50e3c5f784905f52f4584a.png",
					},
					{
						image: "https://earth-angel-1302656840.cos.ap-chengdu.myqcloud.com/5g13X69ne3C15b4c5fd030aaad98877d1699c9c25877.png",
					}
				],
				selected: 0,
				goodsList: [],
				groupGoodsList: [],
				myList: [],
				flowList: [],
				shareInfo: {},
			}
		},
		//#ifdef MP-WEIXIN
		onShareAppMessage(res) {
			console.log(res.target.dataset.item, "resresresresresres");
			let info = res.target.dataset.item
			let sPath = '/pages/findPart/find?uid=' + this
				.vuex_openid + '&goodsid=' + info.itemId + '&shareName=' + this.vuex_nick_name + '&shareUid=' + this
				.vuex_openid
			let sImgUrl = info.imgUrls[0]

			return {
				title: '我送给你一份物品，快来看看吧~',
				path: sPath,
				imageUrl: sImgUrl,
				success: res => {
					console.info(res, "onShareAppMessageRESRES")
				}
			}
		},
		//#endif
		methods: {
			goLogin() {
				this.loginPopup = false
				uni.navigateTo({
					url: '../login/login'
				})
			},
			next() {
				this.imgIndex = this.imgIndex + 1
			},
			closeGuide() {
				this.guide = false
				this.getFriendList()

			},
			searchFriend() {
				if (this.search == this.vuex_openid) {
					this.$u.toast('不可以搜索自己哟');
					return false
				}



				this.$req('/friend/get_friends_info', {
					uid: this.search,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res)
					if (res.errCode == 0) {
						this.search = ""
						this.$u.vuex('vuex_searchGroup', {});
						this.$u.vuex('vuex_search', res.data);
						uni.navigateTo({
							url: './search'
						})
					} else {
						this.$u.toast('该ID不存在');
					}
				})



				// if (this.search.slice(0, 3) == "o0q") {
				// 	this.$req('/friend/get_friends_info', {
				// 		uid: this.search,
				// 		operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				// 	}).then(res => {
				// 		console.log(res)
				// 		if (res.errCode == 0) {
				// 			this.search = ""
				// 			this.$u.vuex('vuex_searchGroup', {});
				// 			this.$u.vuex('vuex_search', res.data);
				// 			uni.navigateTo({
				// 				url: './search'
				// 			})
				// 		} else {
				// 			this.$u.toast('该ID不存在');
				// 		}
				// 	})

				// } else {
				// 	this.$req('/group/get_groups_info', {
				// 		groupIDList: [this.search],
				// 		operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				// 	}).then(res => {
				// 		console.log(res, "55555555555");
				// 		if (res.errCode == 0) {
				// 			this.search = ""
				// 			this.$u.vuex('vuex_searchGroup', res.data[0]);
				// 			this.$u.vuex('vuex_search', {});
				// 			uni.navigateTo({
				// 				url: './search'
				// 			})
				// 		} else {
				// 			this.$u.toast('该ID不存在');
				// 		}
				// 	})
				// }


			},
			shareMore() {
				this.shareShow = false
				this.$u.vuex('vuex_goodsInfo', this.shareInfo)
				uni.navigateTo({
					url: './goodsDetail'
				})
			},
			goNewGroup() {
				uni.navigateTo({
					url: 'group/newGroup'
				})
			},
			sortNumber(a, b) {
				return b.createTime - a.createTime
			},
			getMyList() {
				
				let parameter = {}
				parameter.uidList = [this.vuex_openid]
				parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
				this.$u.api.get_users_items(parameter).then(res => {
				
	
					console.log(res, "mylist");
					// let list = this.$u.deepClone(res.data);
					this.myList = res.data[0].items






					setTimeout(() => {
						this.$refs.wfalls.init();
					}, 600)



				})
				.catch(res=>{
					if (res.errCode == 200) {
						this.$u.toast('登录状态过期，请重新登录')
						this.$u.vuex('vuex_token', "")
						this.loginPopup = true
						return
					}
				})
			},
			getFriendList() {
				this.$u.api.get_self_follow({
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res.errCode, "44444444");
					
					
					
					if (res.data.length > 0) {
						let ids = res.data
						this.$req('/user/get_user_info', {
							uidList: ids,
							operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
						}).then(res => {
							let friendList = res.data
							let parameter = {}
							parameter.uidList = ids
							parameter.operationId = this.vuex_openid + JSON.stringify(new Date()
								.getTime())
							this.$u.api.get_users_items(parameter).then(res => {
								console.log(res, "444");

								let transfer = []
								//接口问题，所以需要多重循环拼接处理数据，全部使用for
								for (let i = 0; i < friendList.length; i++) {
									for (let e = 0; e < res.data.length; e++) {
										if (friendList[i].uid == res.data[e].uid) {
											for (let m = 0; m < res.data[e].items
												.length; m++) {
												res.data[e].items[m].icon = friendList[i]
													.icon
												res.data[e].items[m].userName = friendList[
													i].name
												transfer.push(res.data[e].items[m])
											}

										}
									}
								}


								this.goodsList = transfer.sort(this.sortNumber)
								console.log(this.goodsList,
									"this.goodsListthis.goodsListthis.goodsListthis.goodsList"
								);
								// this.goodsList = this.goodsList.filter(item => item.toUser.length == 0)


								setTimeout(() => {
									this.$refs.wfallsNo2.init();
								}, 600)


							})



						})

					} 

				})
				.catch(res=>{
					if (res.errCode == 200) {
						this.$u.toast('登录状态过期，请重新登录')
						this.$u.vuex('vuex_token', "")
						this.loginPopup = true
						return
					}
				})


			},
			async select(e) {
				console.log(e);
				if (e === 0) {
					this.selected = 0
					this.getFriendList()
				} else if (e === 1) {
					this.selected = 1
					this.getMyList()

				} else if (e === 2) {
					this.selected = 2
					this.groupGoodsList = []
					let groupListId = []
					//信息分布在两套接口 所以流程繁杂 
					await this.$req('/group/get_joined_group_list', {
						operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
					}).then(res => {
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

										this.groupGoodsList.push(item)

									})

								})
							})

						}


					})
					console.log(this.groupGoodsList, "列表列表");
				}


			},
			goMore(e) {
				console.log(e, "eeeeeeeeeeeeeeee");
				this.$u.vuex('vuex_groupList', e)
				uni.navigateTo({
					url: 'group/group'
				})
			},
			swiperClick(e) {
				console.log(e);
			}
		},
		onPullDownRefresh() {
			if (this.selected == 0) {
				this.getFriendList()
			} else if (this.selected == 1) {
				this.getMyList()
			}
		},
		async onShow() {

			// let state = {
			// 	logged:false,
			// 	displayed:false
			// }
			// this.$u.vuex('vuex_firstLogin',state)






			if (this.vuex_refresh == true) {
				this.getMyList()
				this.$u.vuex('vuex_refresh', false)
			}


			
			// this.getMyList()
			// this.getFriendList()


			// if (this.selected == 0) {
			// 	this.getMyList()
			// } else if (this.selected == 1) {
			// 	this.getFriendList()
			// }

			if (this.vuex_token == '' || this.vuex_wsToken == '') {
				this.loginPopup = true
				return
			}

			console.log(this.vuex_shareInfo, "this.vuex_shareInfothis.vuex_shareInfo");
			if (JSON.stringify(this.vuex_shareInfo) != '{}' && this.shareInfo.itemId != this.vuex_shareInfo.goodsid) {

				let sInfo = this.vuex_shareInfo

				// this.$req('/friend/add_friend', {
				// 	uid: sInfo.shareUid,
				// 	operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				// }).then(res => {

				// })

				await this.$u.api.follow({
						uid: sInfo.shareUid,
						mutualFollow: true,
						operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
					}).then(res => {
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					})


				console.log(sInfo, "vuex分享分享xxxxx");
				await this.$req('/user/get_user_info', {
					uidList: [sInfo.uid],
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res, "6666666");
					let uinfo = res.data[0]

					let parameter = {}
					parameter.uidList = [uinfo.uid]
					parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
					this.$u.api.get_users_items(parameter).then(res => {
						let t = res.data[0].items.filter(item => item.itemId == sInfo.goodsid)

						this.shareInfo = t[0]
						this.shareInfo.icon = uinfo.icon
						this.shareInfo.userName = uinfo.name
						this.shareInfo.uid = uinfo.uid
						this.shareInfo.shareName = sInfo.shareName
						this.shareShow = true
						this.$u.vuex('vuex_shareInfo', {})
						console.log(this.vuex_shareInfo, "重置重置");
						console.log(this.shareInfo, "分享分享");




					})


				})


			} else {
				console.log(this.vuex_firstLogin, "this.vuex_firstLogin.logged");
				if (this.vuex_firstLogin.logged == false || this.vuex_firstLogin.displayed == false) {


					this.guide = true
					let state = {
						logged: true,
						displayed: true
					}
					this.$u.vuex('vuex_firstLogin', state)



				}
			}






		},
		onLoad() {
			if (this.vuex_firstLogin.logged == true && this.vuex_firstLogin.displayed == true) {
				this.getFriendList()
				// setTimeout(() => {
				// 	this.getFriendList()
				// }, 400)

			}

			// this.getFriendList()
		},
		watch: {
			shareShow(newVal, oldVal) {
				console.log(newVal, oldVal);
				if (newVal == false) {
					if (this.vuex_firstLogin.logged == true && this.vuex_firstLogin.displayed == true) {
						this.getFriendList()
					}

					if (this.vuex_firstLogin.logged == false || this.vuex_firstLogin.displayed == false) {

						this.guide = true
						let state = {
							logged: true,
							displayed: true
						}
						this.$u.vuex('vuex_firstLogin', state)


					}
				}

			}
		}

	}
</script>

<style lang="scss" scoped>
	.home {


		.newUser {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 98;
			background-color: #737373;

			.newUserImg {
				width: 100%;
				height: 100%;
			}
		}

		.operationCon {
			position: absolute;
			z-index: 99;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-top: 156rpx;

			.next {
				font-size: 40rpx;
				font-weight: 500;
				color: #FFFFFF;
				margin-right: 126rpx;

			}

			.skip {
				width: 128rpx;
				height: 128rpx;
				border-radius: 128rpx;
				border: 4rpx solid #FFFFFF;
				text-align: center;
				line-height: 128rpx;
				font-size: 40rpx;
				font-weight: 500;
				color: #FFFFFF;
				margin-right: 60rpx;

			}
		}


		.start {
			width: 128rpx;
			height: 128rpx;
			border-radius: 128rpx;
			background: #25EFCF;
			border: 4rpx solid #000000;
			text-align: center;
			line-height: 128rpx;
			font-size: 40rpx;
			font-weight: 500;
			color: #000000;
			margin-right: 60rpx;
		}


		.btn {
			padding: 0;
			background: #25EFCF;
			border: 1px solid #000000;
			font-weight: 500;
		}

		.slot-wrap {
			display: flex;
			align-items: center;

			.logoImg {
				width: 44rpx;
				height: 78rpx;
				margin-left: 46rpx;
			}

			.logoText {
				font-size: 34rpx;
				font-weight: 400;
				margin-left: 16rpx;
			}
		}

		.main {
			.searchCon {
				display: flex;
				align-items: center;
				margin-top: 28rpx;

				.inputFather {
					width: 70%;
					position: relative;

					.search {
						margin-left: 48rpx;
						height: 60rpx;
						border-radius: 30rpx;
						box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
						padding-left: 30rpx;
						padding-right: 74rpx;
					}

					.searchIcon {
						width: 32rpx;
						height: 32rpx;
						position: absolute;
						top: 14rpx;
						right: 28rpx;
						z-index: 2;
					}
				}


				.createGroup {
					@extend .btn;
					margin-left: 28rpx;
					width: 156rpx;
					height: 60rpx;
					border-radius: 30rpx;
					font-size: 28rpx;
					line-height: 60rpx;
				}
			}

			.swiperCon {
				margin-top: 60rpx;

			}

			.goodsCon {
				margin-top: 50rpx;

				.tabCon {
					margin-left: 48rpx;
					margin-bottom: 28rpx;

					.tab2 {
						margin-left: 12rpx;
					}

					.tab-item {
						font-size: 28rpx;
						font-weight: 500;
						color: #999999;
						min-width: 160rpx;
					}

					.tab-item-slected {
						font-size: 36rpx;
						font-weight: 500;
						color: #000000;
						display: flex;

						.imgSlected {
							width: 44rpx;
							height: 30rpx;
							margin-top: -10rpx;
						}
					}

				}



				.group {
					margin-left: 48rpx;

					.group-item {
						padding-left: 40rpx;
						padding-top: 34rpx;
						margin-top: 40rpx;
						width: 93%;
						height: 366rpx;
						background: #FFFFFF;
						box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.2);
						border-radius: 20rpx;

						.head {
							justify-content: space-between;

							.headLeft {
								.headIcon {
									width: 64rpx;
									height: 64rpx;
									border-radius: 64rpx;
								}

								.groupName {
									font-size: 28rpx;
									font-weight: 500;
									color: #000000;
									margin-left: 20rpx;
								}
							}


							.more {
								@extend .btn;
								margin: 0;
								margin-right: 40rpx;
								width: 96rpx;
								height: 44rpx;
								line-height: 44rpx;
								border-radius: 12rpx;
								font-size: 20rpx;
								color: #000000;
							}
						}

						.main {
							margin-top: 24rpx;

							.scrollArea {
								height: 350rpx;
								width: 100%;
								white-space: nowrap;

								.item {
									margin-right: 28rpx;
									display: inline-block;

									.itemFlex {
										display: flex;
										flex-direction: column;
										align-items: center;

										.itemImg {
											width: 152rpx;
											height: 152rpx;

										}

										.title {
											font-size: 20rpx;
											font-weight: 400;
											color: #000000;
											margin-top: 12rpx;
										}

										.detail {
											font-size: 14rpx;
											font-weight: 400;
											color: #999999;
											margin-top: 4rpx;

											.user {
												color: #666666;
												font-weight: 700;
											}
										}
									}

								}


							}
						}


					}
				}
			}

		}

		.shareMain {
			width: 604rpx !important;
			padding: 46rpx 48rpx !important;


			.popupTitle {

				font-size: 34rpx;
				font-weight: 400;
				color: #000000;
			}

			.popupImg {
				width: 100%;
				display: block;
				margin: 42rpx auto;
			}

			.goodsImg {
				width: 100%;
				display: block;
				margin: 42rpx auto;
				position: relative;
			}

			.goodsImg::before {
				content: "已送出";
				font-size: 32rpx;
				font-weight: 600;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				background-color: rgba(196, 196, 196, 0.7);
				z-index: 99;
			}

			.popupInfo {

				display: flex;
				align-items: center;
				justify-content: space-between;

				.popupInfoLeft {
					.popupHeadIcon {
						width: 72rpx;
						height: 72rpx;
						border-radius: 72rpx;
					}

					.popupName {
						font-size: 26rpx;
						font-weight: 500;
						color: #333333;
						margin-left: 16rpx;
					}
				}

				.apply {
					margin: 0;
					padding: 0;
					width: 174rpx;
					height: 50rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #333333;
					line-height: 48rpx;
					background: #25EFCF;
					border-radius: 8rpx;
					border: 2rpx solid #000000;
				}

			}

			.popupDetail {
				margin-top: 26rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}
	}
</style>
