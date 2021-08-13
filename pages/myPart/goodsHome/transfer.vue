<template>
	<view class="transfer">
		<view class="head">
			<text>赠送给想要该物品的朋友：</text>
		</view>
		<view class="main">
			<view class="item" v-for="item in list" :key="item.uid">
				<view class="itemLeft u-flex" @click="goHomePage(item)">
					<image :src="item.icon" mode="" class="itemImg"></image>
					<text class="name">{{item.name}}</text>
				</view>
				<button type="default" class="btn" @click="give(item)">赠送</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods:{
			goHomePage(item){
				this.$u.vuex('vuex_search',item)
				
				uni.navigateTo({
					url:'./goodsHome?id=' + item.uid
				})
			},
			give(e){
				console.log(e,"5555555");
				let parameter ={}
				parameter.itemId = this.vuex_goodsInfo.itemId
				parameter.uid = e.uid
				parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
				this.$u.api.gift_item(parameter).then(res => {
					console.log(res);
					if(res.errCode==0){
					this.$u.toast('赠送成功',2000)
					}
				})
			}
		},
		onShow() {
			this.$req('/user/get_user_info', {
					uidList: this.vuex_goodsInfo.wantedUid,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res)
					if(res.errCode==0){
					this.list = res.data
					}
				})
		}
	}
</script>

<style lang="scss" scoped>
	.transfer {
		.head {
			height: 86rpx;
			background: #F1F1F1;
			font-size: 28rpx;
			font-weight: 400;
			line-height: 86rpx;
			padding-left: 48rpx;
		}

		.main {
			padding: 4rpx 48rpx;

			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 44rpx;
				.itemLeft {
					.itemImg {
						width: 84rpx;
						height: 84rpx;
						border-radius: 84rpx;
					}

					.name {
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
						margin-left: 20rpx;
					}
				}

				.btn {
					margin: 0;
					padding: 0;
					width: 88rpx;
					height: 52rpx;
					background: #25EFCF;
					border-radius: 8rpx;
					border: 2rpx solid #000000;
					font-size: 28rpx;
					font-weight: 500;
					color: #000000;
					line-height: 52rpx;
				}
			}
		}
	}
</style>
