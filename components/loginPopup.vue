<template>
	<view class="">
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
				loginPopup: false
			}
		},
		methods:{
			goLogin(){
				this.loginPopup= false
				uni.navigateTo({
					url:'../login/login'
				})
			}
		},
		onshow(){
			this.$u.vuex('vuex_token','')
			if(this.vuex_token == '' || this.vuex_wsToken == ''){
				this.loginPopup = true
			}
		}
		
	}
</script>

<style lang="scss">
	.x-popupMain{
		width: 580rpx;
		.x-popupHead{
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
		.x-popupFooter{
			
			.x-popupFooterItem{
				width: 290rpx;
				height: 106rpx;
				line-height: 106rpx;
				text-align: center;
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
			}
			.x-confirm{
				border-left: 2rpx solid rgba(151, 151, 151, 0.5);
			}
			.x-confirm:active{
				background-color:  #25EFCF;
			}
		}
	}
</style>
