<template>
	<view class="transferLeader">
		<view class="head">
			<text>将群主移交给以下任意群成员：</text>
		</view>
		<view class="main">
			<view class="item u-flex" v-for="item in mengberList" :key="item.uid">

				<image :src="item.icon" mode="" class="headIcon"></image>


				<view class="itemRight">
					<text class="name">{{item.name}}</text>
					<button type="default" class="btn" @click="transfer(item.uid)">移交</button>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mengberList: []
			}
		},
		methods:{
			transfer(e){
				this.$req('/group/transfer_group', {
					groupID: this.vuex_groupid,
					uid: e,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res);
					if(res.errCode==0){
						uni.switchTab({
							url:'../find'
						})
						this.$u.toast('移交成功',2000)
					}
				})
			}
		},
		onShow() {
			this.$req('/group/get_group_member_list', {
				groupID: this.vuex_groupid,
				nextSeq: 0,
				operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
			}).then(res => {
				console.log(res, "群成员");

				let ids = res.data.map(item => item.userId)
				this.$req('/user/get_user_info', {
					uidList: ids,
					operationID: this.vuex_openid + JSON.stringify(new Date()
						.getTime())
				}).then(res => {
					console.log(res, "5555");
					if (res.errCode == 0) {
						for (let i = 0; i < res.data.length; i++) {
							if (res.data[i].uid != this.vuex_openid) {
								this.mengberList.push(res.data[i])
							}

						}
					}

				})

			})
		}

	}
</script>

<style lang="scss" scoped>
	.transferLeader {
		.head {
			width: 100%;
			height: 86rpx;
			background: #F1F1F1;
			font-size: 28rpx;
			font-weight: 400;
			color: #000000;
			line-height: 86rpx;
			padding-left: 48rpx;
		}

		.main {
			padding: 0 48rpx;
			margin-top: 4rpx;

			.item {
				margin-top: 44rpx;

				.headIcon {
					width: 84rpx;
					height: 84rpx;
					border-radius: 84rpx;
					flex-shrink: 0;
				}

				.itemRight {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-left: 20rpx;
					width: 100%;

					.name {
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
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
	}
</style>
