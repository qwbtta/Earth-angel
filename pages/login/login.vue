<template>
	<view>
		<view class="platform">
			<view class="platform-icon">
				<!-- <u-avatar src="/static/common/image/logo.png"></u-avatar> -->
				<image src="/static/common/image/logo.png" mode="aspectFit" class="avatar"></image>
			</view>
			<text>地球天使</text>
		</view>
		<view class="primison">
			<text class="title">申请获取以下权限，请确认是本人操作</text>
			<view class="premison-details">
				<view class="icon"></view>
				<view class="info">获取您的公开信息 （昵称，头像等）</view>
			</view>
		</view>
		<view class="choose">
			<u-button @click="getPrivacy" type="success" size="medium " :loading="loading">微信授权</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	let that = null
	export default {
		data() {
			return {
				code: "",
				userInfo: {},
				loading:false,
				fromUrl:'',
				tabStatus:true,
			}
		},
		methods: {
			getPrivacy() {
				this.loading = true
				uni.getUserProfile({
					desc: "test",
					lang: "zh_CN",
					success: async (res) => {
						const reqData = {
							avatarUrl: res.userInfo.avatarUrl,
							city: res.userInfo.city,
							country: res.userInfo.country,
							gender: res.userInfo.gender,
							nickName: res.userInfo.nickName,
							province: res.userInfo.province,
							code: that.code,
							operationId: that.code + JSON.stringify(new Date().getTime())
						}
						
						// console.log(reqData);
						that.$u.api.wxLogin(reqData).then( async loginRes=>{
							console.log(loginRes,"后台返回");
							// that.$u.vuex('vuex_nick_name', res.userInfo.nickName);
							that.$u.vuex('vuex_avatar_url', res.userInfo.avatarUrl);
							that.$u.vuex('vuex_gender', res.userInfo.gender);
							that.$u.vuex('vuex_openid', loginRes.data.openid);
							that.$u.vuex('vuex_token', loginRes.data.earthAngelToken);
							that.$u.vuex('vuex_wsToken', loginRes.data.openIMToken);
							
							
							
							await that.$req('/user/get_user_info', {
								uidList: [loginRes.data.openid],
								operationID: that.vuex_openid + JSON.stringify(new Date()
									.getTime())
							}).then(val => {
								console.log(val, "5555");
								that.$u.vuex('vuex_nick_name', val.data[0].name);
							})
							
							
						
							let state = {
								logged:true,
								displayed:false
							}
							this.$u.vuex('vuex_firstLogin',state)
							
							// if (this.vuex_firstLogin.displayed == false){
								
								
							// }else{
							// 	let state = {
							// 		logged:true,
							// 		displayed:true
							// 	}
							// 	this.$u.vuex('vuex_firstLogin',state)
							// }
							
							
							this.loading = false
							that.$refs.uToast.show({
												title: '登录成功',
												type: 'success',
												url: this.fromUrl,
												isTab:this.tabStatus,
												duration:800
											})
							uni.reLaunch({
								url:'../findPart/find'
							})
						}).catch(err=>{
							console.log(err);
							this.loading = false
						})
						
					},
					fail(err) {
						console.log(err);
						this.loading = false
					}
				})

			},
		},
		onLoad:function(options) {
		
			that = this
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log("登录", loginRes)
					that.code = loginRes.code
				},
			})
			
		}
	}
</script>

<style lang="scss">
	.avatar{
		width: 90rpx;
		height: 90rpx;
		border-radius: 90rpx;
	}
	.platform {
		margin-top: 20vh;
		display: flex;
		align-items: center;
		flex-direction: column;

		&-icon {
			margin-bottom: 16rpx;
		}
	}

	.primison {
		margin-top: 10vh;
		display: flex;
		align-items: center;
		flex-direction: column;

		.premison-details {
			font-size: 24rpx;
			display: flex;
			align-items: center;

			.icon {
				width: 16rpx;
				height: 16rpx;
				border-radius: 50%;
				background-color: #d8d8d8;
				margin-right: 12rpx;
			}
		}
	}

	.choose {
		margin-top: 15vh;
		display: flex;
		justify-content: center;
	}
</style>
