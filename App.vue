<script>
	export default {
		// 此处globalData为了演示其作用，不是uView框架的一部分
		globalData: {
			username: '白居易'
		},
		onLaunch(options) {
			console.log(options, "onlaunch获取");
			if (options.query.uid != undefined) {
				let share = {}
				share.uid = options.query.uid
				share.goodsid = options.query.goodsid
				share.shareName = options.query.shareName
				share.shareUid = options.query.shareUid
				this.$u.vuex('vuex_shareInfo', share)
			}



			// 1.1.0版本之前关于http拦截器代码，已平滑移动到/common/http.interceptor.js中
			// 注意，需要在/main.js中实例化Vue之后引入如下(详见文档说明)：
			// import httpInterceptor from '@/common/http.interceptor.js'
			// Vue.use(httpInterceptor, app)
			// process.env.VUE_APP_PLATFORM 为通过js判断平台名称的方法，结果分别如下：
			/**
			 * h5，app-plus(nvue下也为app-plus)，mp-weixin，mp-alipay......
			 */

			if (this.vuex_token == '' || this.vuex_wsToken == '') {
				uni.navigateTo({
					url: 'pages/login/login'
				})
			} else {
				uni.reLaunch({
					url: 'pages/findPart/find'
				})
			}


		},
		onShow() {
			let infoNumber = 0
			this.$req('/friend/get_friend_apply_list', {
				operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
			}).then(res => {
				if (res.errCode == 0) {
					let list = res.data.filter(item => item.flag == 0)
					infoNumber = list.length + infoNumber
				}
				this.$req('/group/get_group_applicationList', {
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					let list = res.data.user.filter(item => item.handleStatus  == 0)
					console.log(list, "list");
					infoNumber = list.length + infoNumber
					console.log(infoNumber, "infoNumber");
					if (infoNumber > 0) {
						uni.showTabBarRedDot({
							index:3
						})

						this.$u.vuex('vuex_noticeNumber', infoNumber)
					} else if (infoNumber == 0) {
						uni.hideTabBarRedDot({
							index: 3
						})
						this.$u.vuex('vuex_noticeNumber', 0)
					}
				})


			})








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
</style>
