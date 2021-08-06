<template>
	<view class="deleteGoods">
		<view class="mainTitle">
			<text>群物品</text>
		</view>
		<view class="main">
				<u-checkbox v-model="item.checked"  v-for="item in list" :key="item.itemId" shape="circle" size="44"
					active-color="#25EFCF" icon-size="30">
					<view class="checkboxItem u-flex">
						<image :src="item.imgUrls[0]" mode="aspectFit" class="goodsImg"></image>
				
						<view class="info">
							<text class="title">{{item.name}}</text>
							<view class="nameCon u-flex">
								<image :src="item.icon" mode="" class="headIcon"></image>
								<text class="name">{{item.userName}}</text>
							</view>
						</view>
				
				
					</view>
				</u-checkbox>

		</view>



		<view class="footer">
			<button type="default" class="btn" @click="deleteGoods">删除</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			getList(){
				this.list = []
				console.log(this.vuex_groupList);
				let myList = this.vuex_groupList.goodsList
				let showList = this.$u.deepClone(myList);
				if (showList.length > 0) {
					showList.forEach(item => {
						item.checked = false
						this.list.push(item)
					})
					console.log(this.list);
				}
				
				
			},
			deleteGoods() {
				let choose = []
				this.list.forEach(item => {
					if (item.checked == true) {
						choose.push(item.itemId)
					}
				})
				console.log(choose, "choose");
				
				this.$u.api.group_owner_delete_item({
					itemIdList:choose,
					groupId: this.vuex_groupList.groupInfo.groupId,
					groupOwner:true,
					operationId:this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res=>{
					console.log(res,"444444444");
					if(res.errCode==0){
						this.$u.toast('删除成功,群内显示会有延迟')
						this.list = this.list.filter(item=>item.checked==false)
						let groupList = this.vuex_groupList
						groupList.goodsList = this.list
						this.$u.vuex('vuex_groupList', groupList)
					}
				})
			}
		},
		onShow() {
			this.getList()
		}

	}
</script>

<style lang="scss" scoped>
	.deleteGoods {
		padding-top: 12rpx;
		padding-bottom: 100rpx;
		border-top: 2rpx solid rgba(0, 0, 0, 0.1);

		/deep/ .u-checkbox__icon-wrap {
			border: 4rpx solid #999999 !important;
		}

		/deep/ .u-checkbox__icon-wrap-checked {
			border: 4rpx solid #000000 !important;


		}

		.mainTitle {
			width: 100%;
			height: 46rpx;
			padding-left: 48rpx;
			background: #F1F1F1;
			font-size: 28rpx;
			font-weight: 600;
			color: #333333;
			line-height: 46rpx;
			margin-top: 24rpx;
		}

		.main {
			padding-left: 34rpx;
			.checkboxItem {

				.goodsImg {
					width: 130rpx;
					height: 130rpx;
					border-radius: 130rpx;
					margin-left: 34rpx;
				}

				.info {
					height: 212rpx;
					width: 1000rpx; //checkbox内部100%无效
					margin-left: 28rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					border-bottom: 2rpx solid #E9E9E9;

					.title {
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
					}

					.nameCon {
						margin-top: 12rpx;

						.headIcon {
							width: 48rpx;
							height: 48rpx;
							border-radius: 48rpx;
						}

						.name {
							font-size: 24rpx;
							font-weight: 500;
							color: #333333;
							margin-left: 10rpx;
						}
					}
				}
			}
		}

		.footer {
			width: 100%;
			height: 96rpx;
			background: #F1F1F1;
			position: fixed;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding-right: 60rpx;

			.btn {
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
