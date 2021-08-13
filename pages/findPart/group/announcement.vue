<template>
	<view class="announcement">
		<u-navbar :title="title"></u-navbar>
		<textarea class="inputArea" maxlength="300" v-model="announcement" :placeholder="where=='意见'?'请描述小程序的使用问题，或其他产品建议。':''"/>
		<view class="footer">
			<button type="default" class="btn" @click="confirm" v-if="where=='公告'">发布</button>
			<button type="default" class="btn" @click="feedBack" v-if="where=='意见'">提交</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				announcement:"",
				title:"",
				where:""
			}
		},
		methods:{
			feedBack(){
				this.$u.api.feedback({
					msg:this.announcement,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res=>{
					if(res.errCode==0){
						uni.navigateBack({
						    delta: 1
						});
						this.$u.toast('提交成功')
					}
				})
			},
			confirm(){
				this.$req('/group/set_group_info', {
					groupID: this.vuex_groupid,
					notification: this.announcement,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res);
					if(res.errCode==0){
						uni.navigateBack({
						    delta: 1
						});
						this.$u.toast('修改成功')
					}
				})
			}
		},
		onLoad(options) {
			if(options.where == 'my'){
				this.where = '意见'
				this.title = '意见反馈'
			}
		}
		
	}
</script>

<style>
	page{
		height: 100%;
		background-color: #F6F6F6;
	
	}
</style>

<style lang="scss" scoped>
	.announcement{
		padding-top: 40rpx;
		.inputArea{
			width: 78%;
			height: 540rpx;
			padding: 36rpx;
			margin: 0 auto;
			background: #FFFFFF;
			border-radius: 12rpx;
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
			line-height: 22px;
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