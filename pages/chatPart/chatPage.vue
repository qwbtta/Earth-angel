<template>
	<view class="chatPage">
		<u-navbar :title="title"></u-navbar>
		<view class="head u-flex" @click="goBack" v-if="headShow">
			<image :src="goodsInfo.imgUrls[0]" mode="aspectFit" class="goodsImg"></image>
			<view class="info">
				<text class="title">{{goodsInfo.name}}</text>
				<text class="tips">赠送之前聊一聊</text>
			</view>
		</view>
		<scroll-view @click="clickScroll" :scroll-into-view="listItem" :style="{height:scrollHeight+'px'}"
		 scroll-y>
			
						
			<view class="main">
				<view :class="['chatLeft',item.sendID == vuex_openid?'reverse':'']" v-for="(item,index) in chatList"
					:key="index" v-if="item.msgFrom==100">
					<image :src="item.sendID == vuex_openid?vuex_avatar_url:vuex_chatList.icon" mode=""
						class="chatHeadIcon"></image>
					<view class="triangle" v-if="item.contentType==101">
			
					</view>
					<view class="chatMain" v-if="item.contentType==101">
						<text class="chatText">{{item.content}}</text>
					</view>
					<image :src="item.content" mode="widthFix" class="imgChat"
						v-if="item.contentType==102" @click="preview(item)"></image>
			
				</view>
			
			</view>
		</scroll-view>
		

		<view class="footer">
			<image src="/static/common/image/sendPhoto.png" mode="" class="sendPhoto" @click="sendImg"></image>
			<input type="text" v-model="myInput" class="mainInput" />
			<button type="default" class="sendBtn" @click="sent">发送</button>
		</view>
	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5";
	let cosUpload = require('../../common/cos/upload.js')
	export default {
		data() {
			return {
				headShow: false,
				goodsInfo: {},
				receiveId: "",
				title: "",
				chatList: [],
				myInput: "",
				scrollHeight: 0,
				listItem:null
			}
		},
		methods: {
			getScreen() {
				this.scrollHeight = uni.getSystemInfoSync().safeArea.height - 101
			},
			sent() {
				let timeNow = JSON.stringify(new Date().getTime())
				let md5 = timeNow + this.vuex_openid + Math.random(0, timeNow)
				let clientMsgID = md5Libs.md5(md5)
				this.$req('/chat/send_msg', {
					reqIdentifier: 1003,
					platformID: 6,
					sendID: this.vuex_openid,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime()),
					msgIncr: this.vuex_msgIncr,
					data: {
						sessionType: 1,
						msgFrom: 100,
						contentType: 101,
						recvID: this.receiveId,
						forceList: [],
						content: this.myInput,
						options: {},
						clientMsgID: clientMsgID,
						offlineInfo: {},
						ext: {}
					}

				}).then(res => {

					this.$u.vuex('vuex_msgIncr', this.vuex_msgIncr + 1)
					console.log(res, "发送结果");
					let sentInfo = {}
					sentInfo.sendID = this.vuex_openid
					sentInfo.msgFrom = 100
					sentInfo.contentType = 101
					sentInfo.content = this.myInput
					this.chatList.push(sentInfo)
					this.myInput = ""
				})
			},
			sendImg() {
				let that = this
				let timeNow = JSON.stringify(new Date().getTime())
				let md5 = timeNow + this.vuex_openid + Math.random(0, timeNow)
				let clientMsgID = md5Libs.md5(md5)
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					success(res) {
						let local = []
						res.tempFilePaths.forEach(item => {
							local.push(item);
						});

						let photos = []

						let up = new Promise(function(resolve, reject) {
							resolve(cosUpload.uploadFile(local, that))
						})
						up.then(res => {
							photos = res
							that.$req('/chat/send_msg', {
								reqIdentifier: 1003,
								platformID: 6,
								sendID: that.vuex_openid,
								operationID: that.vuex_openid + JSON.stringify(new Date()
								.getTime()),
								msgIncr: that.vuex_msgIncr,
								data: {
									sessionType: 1,
									msgFrom: 100,
									contentType: 102,
									recvID: that.receiveId,
									forceList: [],
									content: photos[0],
									options: {},
									clientMsgID: clientMsgID,
									offlineInfo: {},
									ext: {}
								}

							}).then(res => {
								that.$u.vuex('vuex_msgIncr', that.vuex_msgIncr + 1)
								console.log(res, "发送结果");
								let sentInfo = {}
								sentInfo.sendID = that.vuex_openid
								sentInfo.msgFrom = 100
								sentInfo.contentType = 102
								sentInfo.content = local[0]
								that.chatList.push(sentInfo)
							})
						})


					},
					fail(err) {
						console.log('err ==>', err);
					}
				});
			},
			preview(item){
				uni.previewImage({
				            urls: [item.content],
				        });
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			
		},
		
		onLoad(options) {
			if (options.where == "detail") {
				this.headShow = true
				this.goodsInfo = this.vuex_goodsInfo
				this.receiveId = this.vuex_goodsInfo.fromUser
				console.log(this.goodsInfo);
				this.getScreen()
			} else if (options.where == "session") {
				this.chatList = this.vuex_chatList.list
				this.title = this.vuex_chatList.name
				this.receiveId = this.vuex_chatList.id
				console.log(this.vuex_chatList, "99999");
				this.getScreen()
			}

		},
		watch: {
			
		},
	}
</script>

<style lang="scss" scoped>
	.chatPage {
		padding-bottom: 120rpx;

		.head {
			width: 750rpx;
			height: 176rpx;
			background: #DAFFF9;
			position: fixed;
			top: 9%;

			.goodsImg {
				width: 116rpx;
				height: 116rpx;
				margin-left: 48rpx;

			}

			.info {
				display: flex;
				flex-direction: column;
				margin-left: 32rpx;

				.title {
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
				}

				.tips {
					font-size: 28rpx;
					font-weight: 400;
					color: #666666;
					margin-top: 8rpx;
				}
			}
		}

		.main {
			padding: 54rpx 48rpx;

			.chatLeft {
				display: flex;
				align-items: flex-start;
				margin-top: 32rpx;

				.chatHeadIcon {
					width: 76rpx;
					height: 76rpx;
					border-radius: 76rpx;
					flex-shrink: 0;
				}


				.triangle {
					display: block;
					width: 0px;
					height: 0px;
					border-top: 14rpx solid transparent;
					border-bottom: 14rpx solid transparent;
					border-left: 14rpx solid transparent;
					border-right: 20rpx solid rgba(238, 238, 238, 1);
					margin-top: 16rpx;
				}

				.chatMain {
					max-width: 442rpx;
					background: #EEEEEE;
					border-radius: 8rpx;
					padding: 12rpx 18rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					line-height: 40rpx;
					margin-top: 6rpx;

					.chatText {
						word-break: break-all;
					}


				}

			}

			.reverse {
				flex-direction: row-reverse;

				.triangle {
					display: block;
					width: 0px;
					height: 0px;
					border-top: 14rpx solid transparent;
					border-bottom: 14rpx solid transparent;
					border-right: 14rpx solid transparent;
					border-left: 20rpx solid rgba(238, 238, 238, 1);
					margin-top: 16rpx;
				}
			}

			.imgChat {
				max-width: 300rpx;
				margin: 6rpx 24rpx 0;
			}
		}

		.footer {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: fixed;
			bottom: 0;
			padding: 0 28rpx;
			background-color: #FFFFFF;

			.sendPhoto {
				width: 64rpx;
				height: 64rpx;
				flex-shrink: 0;
			}

			.mainInput {
				width: 100%;
				height: 60rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 4rpx solid #333333;
				margin: 0 24rpx;
				padding: 0 10rpx;
			}

			.sendBtn {
				margin: 0;
				padding: 0;
				width: 92rpx;
				height: 64rpx;
				background: #25EFCF;
				border-radius: 8rpx;
				border: 4rpx solid #000000;
				font-size: 32rpx;
				font-weight: 500;
				color: #000000;
				line-height: 60rpx;
				flex-shrink: 0;
			}
		}
	}
</style>
