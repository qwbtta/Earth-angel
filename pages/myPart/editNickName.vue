<template>
	<view class="editNickName">
		
		<view class="container">
			<input type="text" v-model="nickName" class="editInput" @input="checkInput" />
			<image src="/static/common/image/clear.png" mode="" class="clear" v-show="showClear" @click="clear"></image>
		</view>
		
		
		<view class="footer">
			<button type="default" class="btn" @click="confirm">修改</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				nickName:'',
				showClear:false
			}
		},
		methods:{
			checkInput(){
				if(this.nickName.length>0){
					this.showClear = true
				}else{
					this.showClear = false
				}
			},
			clear(){
				this.nickName = '',
				this.showClear = false
			},
			confirm(){
				this.$req('/user/update_user_info', {
					name: this.nickName,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res);
					if(res.errCode==0){
						this.$u.vuex('vuex_nick_name',this.nickName)
						uni.navigateBack({
						    delta: 1
						});
						this.$u.toast('修改成功')
					}
				})
			}
		},
		onShow() {
			this.nickName = this.vuex_nick_name
			
		}
	}
</script>

<style>
	page{
		height: 100%;
		background: #F6F6F6;
	}
</style>
<style lang="scss" scoped>
	.editNickName{
		padding-top: 26rpx;
		
		.container{
			position: relative;
		}
		.editInput{
			height: 88rpx;
			padding: 0 44rpx;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 8rpx 0px rgba(0, 0, 0, 0.1);
		}
		.clear{
			width: 36rpx;
			height: 36rpx;
			position: absolute;
			top: 25rpx;
			right: 44rpx;
			z-index: 9999;
		}
		.footer{
			width:100%;
			height: 96rpx;
			background: #E0E0E0;
			position: fixed;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding-right: 60rpx;
			.btn{
				margin: 0;
				padding: 0;
				width: 106rpx;
				height: 56rpx;
				background: #25EFCF;
				border-radius: 8rpx;
				border: 2rpx solid #000000;
				font-size: 32rpx;
				font-weight: 500;
				color: #000000;
				line-height: 56rpx;
			}
		}
	}
</style>
