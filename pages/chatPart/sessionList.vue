<template>
	<view class="sessionList">
		<view class="main">
			<view class="remind" v-if="sessionList.length==0">
			
				<text class="remindInfo">还没有消息哦，快去联系地球天使吧～</text>
			
			</view>
			<view class="listItem" v-for="item in sessionList" :key="item.id" @click="goChatPage(item)">
				<image :src="item.icon" mode="" class="headIcon"></image>

				<view class="list-main">
					<view class="list-main-head">
						<text class="name">{{item.name}}</text>
						<!-- <view class="infoNum">
							11
						</view> -->
					</view>
					<view class="list-main-bottom">
						<text
							class="info">{{item.latest.content.length>25?item.latest.content.slice(0,25)+'...':item.latest.content}}</text>
						<!-- <text class="time"> {{item.latest.serverMsgID.slice(11,16)}}</text> -->
						<text class="time"> {{ Number(JSON.stringify(item.latest.sendTime).slice(0,10))>today?item.latest.serverMsgID.slice(11,16):item.latest.serverMsgID.slice(5,10)}}</text>
					</view>
				</view>
			</view>

		</view>
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
	export default {
		data() {
			return {
				seq: 0,
				sessionList: [],
				loginPopup: false,
				today: 0
			}
		},
		methods: {
			sortNumber(a, b) {
				return b.latest.sendTime - a.latest.sendTime
			},
			goLogin() {
				this.loginPopup = false
				uni.navigateTo({
					url: '../login/login'
				})
			},
			getList() {
				let today = new Date(new Date().toLocaleDateString()).getTime()
				this.today = Number(JSON.stringify(today).slice(0, 10))
				
				
				console.log(this.today, "todaytodaytoday");
				this.$req('/chat/newest_seq', {

					reqIdentifier: 1001,
					sendID: this.vuex_openid,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime()),
					msgIncr: this.vuex_msgIncr,
				}).then(res => {
					console.log(res.data.seq, "最新seq");
					this.seq = res.data.seq
					this.$u.vuex('vuex_msgIncr', this.vuex_msgIncr + 1)
					this.$req('/chat/pull_msg', {
						reqIdentifier: 1002,
						sendID: this.vuex_openid,
						operationID: this.vuex_openid + JSON.stringify(new Date().getTime()),
						msgIncr: this.vuex_msgIncr,
						data: {
							seqBegin: 0,
							seqEnd: this.seq
						}

					}).then(res => {


						this.$u.vuex('vuex_msgIncr', this.vuex_msgIncr + 1)
						let ids = res.data.single.map(item => item.id)
						let friends = []
						let chatlist = this.$u.deepClone(res.data.single);
						this.$req('/user/get_user_info', {
							uidList: ids,
							operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
						}).then(res => {
							console.log(res, "haoyou")
							friends = res.data
							for (let i = 0; i < chatlist.length; i++) {
								let latest = this.$u.deepClone(chatlist[i].list[chatlist[i].list
									.length - 1]);
								console.log(latest, "latestlatestlatest");
								if (latest.msgFrom == 200 && latest.contentType != 204) {
									let transfer = JSON.parse(latest.content)
									latest.content = transfer.text
								} else if (latest.contentType == 102) {
									latest.content = '[图片]'
								}


								for (let p = 0; p < friends.length; p++) {
									if (chatlist[i].id == friends[p].uid) {
										chatlist[i].name = friends[p].name
										chatlist[i].icon = friends[p].icon
										break
									}
								}

								chatlist[i].latest = latest
							}

							console.log(chatlist, "ddddddddddd");
							let sortList = chatlist.sort(this.sortNumber)
							// console.log(dddd, "dddddddddddddddd");
							this.sessionList = sortList
						})






					})

				})



			},
			goChatPage(item) {
				this.$u.vuex('vuex_chatList', item)
				uni.navigateTo({
					url: './chatPage?where=session'
				})
			}

		},
		mounted() {

		},
		onShow() {
			if (this.vuex_token == '' || this.vuex_wsToken == '') {
				this.loginPopup = true
			}
			this.getList()
		}
	}
</script>

<style>

</style>
<style lang="scss" scoped>
	.sessionList {
		padding: 0 40rpx;
		border-top: 1px solid #DBDEE3;

		.main {
			.listItem {
				height: 154rpx;
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #D8D8D8;

				.headIcon {
					width: 90rpx;
					height: 90rpx;
					border-radius: 90rpx;
					flex-shrink: 0;
				}

				.list-main {
					width: 100%;
					height: 80rpx;
					margin-left: 28rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.list-main-head {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.name {
							font-size: 14px;
							font-weight: 500;
							color: #333333;
						}

						.infoNum {
							text-align: center;
							line-height: 30rpx;
							width: 30rpx;
							height: 30rpx;
							border-radius: 30rpx;
							background: #F33E37;
							font-size: 20rpx;
							font-weight: 500;
							color: #FFFFFF;
						}
					}

					.list-main-bottom {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.info {
							font-size: 24rpx;
							font-weight: 400;
							color: #666666;
						}

						.time {
							font-size: 20rpx;
							font-weight: 400;
							color: #666666;
						}
					}
				}
			}
		}
	}
</style>
