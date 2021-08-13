<template>
	<view class="whoWants">
		<view class="head">
			<image :src="vuex_goodsInfo.imgUrls[0]" mode="aspectFit" class="goodsImg"></image>
			<text>该物品有以下朋友想要：</text>
		</view>
		<view class="peopleCon">
			<view class="peopleItem" v-for="(item,index) in userList " :key="index" @click="goHomePage(item)">
				<image :src="item.icon" mode="" class="headIcon"></image>
				<text class="name">{{item.name.length>4?item.name.slice(0,3) + '...':item.name}}</text>
			</view>
			
		</view>
		<button type="default" @click="goTransfer" class="btn">去赠送</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userList:[]
			}
		},
		methods:{
			goHomePage(item){
				this.$u.vuex('vuex_search',item)
				uni.navigateTo({
					url:'../myPart/goodsHome/goodsHome?id=' + item.uid
				})
			},
			goTransfer(){
				uni.navigateTo({
					url:'../myPart/goodsHome/transfer'
				})
			}
		},
		onShow() {
			console.log(this.vuex_goodsInfo);
			let ids =  this.vuex_goodsInfo.wantedUid
			this.$req('/user/get_user_info', {
				uidList: ids,
				operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
			}).then(res=>{
				this.userList = res.data
			})
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
	.whoWants {
		padding-top: 14rpx;
		.head{
			width: 750rpx;
			height: 202rpx;
			background: #FFFFFF;
			display: flex;align-items: center;
			font-size: 32rpx;
			font-weight: 400;
			color: #000000;
			.goodsImg{
				width: 132rpx;
				height: 132rpx;
				margin: 0 40rpx 0 54rpx;
			}
		}
		.peopleCon{
			padding: 6rpx 0 48rpx;
			background: #FFFFFF;
			margin-top: 16rpx;
			display: flex;
			flex-wrap: wrap;
			.peopleItem{
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-left: 56rpx;
				margin-top: 42rpx;
				.headIcon{
					width: 84rpx;
					height: 84rpx;
					border-radius: 84rpx;
				}
				.name{
					font-size: 20rpx;
					font-weight: 400;
					color: #999999;
					margin-top: 12rpx;
				}
			}
		}
		.btn{
			margin: 0 auto;
			padding: 0;
			width: 182rpx;
			height: 66rpx;
			background: #25EFCF;
			border-radius: 12rpx;
			border: 2rpx solid #000000;
			font-size: 36rpx;
			font-weight: 500;
			color: #000000;
			line-height: 66rpx;
			margin-top: 450rpx;
		}
	}
</style>
