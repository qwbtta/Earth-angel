<template>
	<view class="notice">
		<view class="title">待处理</view>
		<view class="main">
			<view class="noticeItem" v-for="item in list" :key="item.uid">
				<view class="left u-flex">
					<image :src="item.icon" mode="" class="itemImg"></image>
					<view class="info">
						<text class="user">{{item.name}}</text>
						<text class="behavior">申请加你为好友</text>
					</view>
				</view>
				<button type="default" class="btn" @click="agree(item)">同意</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
			}
		},
		methods:{
			agree(e){
				this.$req('/friend/add_friend_response', {
					uid:e.uid,
					flag:1,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res)
					if (res.errCode == 0) {
						this.$u.toast('添加好友成功')
						this.getList()
					}
				})
			},
			getList(){
				this.$req('/friend/get_friend_apply_list', {
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res)
					if (res.errCode == 0) {
						this.list = res.data.filter(item=> item.flag==0)
					}
					console.log(this.list)
				})
			}
		},
		onShow() {
			this.getList()
		}
	}
</script>


<style lang="scss" scoped>
	.notice{
		
		.title{
			height: 100rpx;
			line-height: 100rpx;
			padding-left: 48rpx;
			margin-bottom: 16rpx;
			font-size: 32rpx;
			font-weight: 400;
			color: #000000;
			background-color: #F1F1F1;
		}
		.main{
			.noticeItem {
				height: 150rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 8rpx;
				background-color: #F1F1F1;
				padding: 0 48rpx;
				.left {
					.itemImg {
						width: 76rpx;
						height: 76rpx;
						border-radius: 76rpx;
					}
					.info {
						display: flex;
						flex-direction: column;
						margin-left: 16rpx;
						.user {
							font-size: 28rpx;
							font-weight: 400;
							color: #000000;
						}
			
						.behavior {
							font-size: 22rpx;
							font-weight: 500;
							color: #333333;
							margin-top: 6rpx;
						}
					}
				}
			
				.btn {
					padding: 0;
					margin:0 ;
					background: #25EFCF;
					border: 2rpx solid #000000;
					width: 116rpx;
					height: 46rpx;
					border-radius: 24rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #333333;
					line-height: 46rpx;
				}
				
			}
		}
	}
</style>