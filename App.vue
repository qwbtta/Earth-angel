<script>
	export default {
		// 此处globalData为了演示其作用，不是uView框架的一部分
		globalData: {
			username: '白居易'
		},
		onLaunch(options) {

			// this.$u.vuex('vuex_token','')
			// this.$u.vuex('vuex_wsToken','')



			console.log(options, "onlaunch获取");
			if (options.query.goodsid != undefined) {
				let share = {}
				share.uid = options.query.uid
				share.goodsid = options.query.goodsid
				share.shareName = options.query.shareName
				share.shareUid = options.query.shareUid
				this.$u.vuex('vuex_shareInfo', share)
			} else if (options.query.groupId != undefined) {
				this.$u.vuex('vuex_groupShareId', options.query.groupId)
			}


			if (this.vuex_firstLogin.logged == false) {
				this.$u.vuex('vuex_token', "")
				this.$u.vuex('vuex_wsToken', "")
			}



			// 1.1.0版本之前关于http拦截器代码，已平滑移动到/common/http.interceptor.js中
			// 注意，需要在/main.js中实例化Vue之后引入如下(详见文档说明)：
			// import httpInterceptor from '@/common/http.interceptor.js'
			// Vue.use(httpInterceptor, app)
			// process.env.VUE_APP_PLATFORM 为通过js判断平台名称的方法，结果分别如下：
			/**
			 * h5，app-plus(nvue下也为app-plus)，mp-weixin，mp-alipay......
			 */

			// if (this.vuex_token == '' || this.vuex_wsToken == '') {
			// 	uni.navigateTo({
			// 		url: 'pages/login/login'
			// 	})
			// } else {
			// 	uni.reLaunch({
			// 		url: 'pages/findPart/find'
			// 	})
			// }


		},
		onShow(op) {
			console.log(op, "onshow获取");
			if (op.query.goodsid != undefined) {
				let shareOnshow = {}
				shareOnshow.uid = op.query.uid
				shareOnshow.goodsid = op.query.goodsid
				shareOnshow.shareName = op.query.shareName
				shareOnshow.shareUid = op.query.shareUid
				this.$u.vuex('vuex_shareInfo', shareOnshow)
				console.log(shareOnshow, "onshowshareshareshare");
			} else if (op.query.groupId != undefined) {
				this.$u.vuex('vuex_groupShareId', op.query.groupId)
			}


			if (this.vuex_token != '' && this.vuex_wsToken != '') {

				let infoNumber = 0


				console.log("wbbbbbbbbbbbbbbbbbbb");
				this.$u.api.received_items({
					operationId: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res.errCode, "9999999999999999");
					
					console.log(res.data.items.length, "收到收到收到");
					if (res.data.items.length != this.vuex_receiveLength && this.vuex_receiveTips == false) {
						infoNumber = infoNumber + res.data.items.length

						this.$u.vuex('vuex_receiveLength', res.data.items.length)
						this.$u.vuex('vuex_receiveTips', true)

						uni.showTabBarRedDot({
							index: 3
						})
						if (this.vuex_receiveTips) {
							uni.showTabBarRedDot({
								index: 3
							})
						}

					}

					this.$u.api.get_users_items({
						uidList: [this.vuex_openid],
						operationId: this.vuex_openid + JSON.stringify(new Date().getTime())
					}).then(res => {
						console.log(res.data[0], "res.datares.data”res.datares.data");
						let wantGroup = res.data[0].items.filter(item => item.toUser.length == 0 && item
							.wantedUid
							.length > 0)
						console.log(wantGroup, "wantGroupwantGroup");
						if (wantGroup.length > 0) {
							infoNumber = infoNumber + wantGroup.length
							uni.showTabBarRedDot({
								index: 3
							})
							this.$u.vuex('vuex_noticeNumber', wantGroup.length)
						} else if (wantGroup.length == 0) {
							if (infoNumber > 0) {
								uni.showTabBarRedDot({
									index: 3
								})
							} else {
								uni.hideTabBarRedDot({
									index: 3
								})
								this.$u.vuex('vuex_noticeNumber', 0)
							}

							if (this.vuex_receiveTips) {
								uni.showTabBarRedDot({
									index: 3
								})
							}
						}

					})





				})
				.catch(res=>{
					if (res.errCode == 200) {
						this.$u.vuex('vuex_token', "")
						setTimeout(() => {
							uni.reLaunch({
								url: 'pages/findPart/find'
							})
							return
						}, 300)
					
					
					}
				})
				



				if (this.vuex_receiveTips) {
					uni.showTabBarRedDot({
						index: 3
					})
				}








				// 	// this.$req('/friend/get_friend_apply_list', {
				// 	// 	operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				// 	// }).then(res => {
				// 	// 	if (res.errCode == 0) {
				// 	// 		let list = res.data.filter(item => item.flag == 0)
				// 	// 		infoNumber = list.length + infoNumber
				// 	// 	}
				// 	// 	this.$req('/group/get_group_applicationList', {
				// 	// 		operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				// 	// 	}).then(res => {
				// 	// 		let list = res.data.user.filter(item => item.handleStatus == 0)
				// 	// 		console.log(list, "list");
				// 	// 		infoNumber = list.length + infoNumber


				// 	// 		let parameter = {}
				// 	// 		parameter.uidList = [this.vuex_openid]
				// 	// 		parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
				// 	// 		this.$u.api.get_users_items(parameter).then(res => {
				// 	// 			console.log(res.data[0].items, "其他闲置");
				// 	// 			let wantList = res.data[0].items.filter(item => item.wantedUid.length >
				// 	// 				0 && item.toUser.length == 0)

				// 	// 			infoNumber = wantList.length + infoNumber

				// 	// 			console.log(infoNumber, "infoNumber");
				// 	// 			if (infoNumber > 0) {
				// 	// 				uni.showTabBarRedDot({
				// 	// 					index: 3
				// 	// 				})

				// 	// 				this.$u.vuex('vuex_noticeNumber', infoNumber)
				// 	// 			} else if (infoNumber == 0) {
				// 	// 				uni.hideTabBarRedDot({
				// 	// 					index: 3
				// 	// 				})
				// 	// 				this.$u.vuex('vuex_noticeNumber', 0)
				// 	// 			}
				// 	// 		})


				// 	// 	})

				// 	// })

			}








		}

	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "common/demo.scss";
	@import "common/myStyle.scss";

	button:active {
		background-color: #21D6B9 !important;
	}

	.loadingCon {
		display: flex;
		justify-content: center;
	}

	.remind {
		text-align: center;
		margin-top: 200rpx;

		.remindInfo {
			font-size: 32rpx;
			font-weight: 400;
			color: #999999;

		}
	}

	.x-popupMain {
		width: 580rpx;

		.x-popupHead {
			padding: 0 60rpx;
			min-height: 180rpx;
			border-bottom: 2rpx solid rgba(151, 151, 151, 0.5);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
			line-height: 44rpx;
		}

		.x-popupFooter {
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;

			.x-popupFooterItem {
				width: 290rpx;
				height: 106rpx;
				line-height: 106rpx;
				text-align: center;
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
				background-color: #F1F1F1;
			}

			.x-confirm {
				background-color: #25EFCF;
				border-left: 2rpx solid rgba(151, 151, 151, 0.5);
			}

			.x-confirm:active {
				background-color: #25EFCF;
			}
		}
	}
</style>
