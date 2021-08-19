<template>
	<view class="search">
		<view class="card" v-if="state==1">
			<view class="head">

				<image :src="info.icon" mode="" class="headIcon" @click="goHome(info.uid)"></image>

				<view class="headRight">
					<view class="info" @click="goHome(info.uid)">
						<text class="name">{{info.name}}</text>
						<text class="id">ID：{{info.uid}}</text>
					</view>
					<button type="default" class="add" @click="follow" v-if="isFollow == false">关注</button>
					<button type="default" class="add" @click="cancelFollow" v-if="isFollow == true">取消关注</button>
				</view>

			</view>
			<u-divider half-width="240" color="#333333" fontSize="20" border-color="#D8D8D8">TA的闲置</u-divider>

			<view class="footer">
				<view class="item" v-for="item in goodsList" :key="item.itemId" @click="goDetail(item)">
					<image :src="item.imgUrls[0]" mode="aspectFit" class="goodsImg"></image>
					<text class="title">{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="card" style="height: 200rpx;" v-else-if="state==2">
			<view class="head">

				<image :src="groupInfo.faceUrl" mode="" class="headIcon"></image>

				<view class="headRight">
					<view class="info">
						<text class="name">{{groupInfo.groupName}}</text>
						<text class="id">ID：{{groupInfo.groupId}}</text>
					</view>
					<button type="default" class="add" @click="joinGroup">申请加群</button>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				goodsList: [],
				groupInfo: {},
				state: 1,
				isFollow:false,
			}
		},
		methods: {
			follow() {
				
				this.$u.api.follow({
					uid:this.info.uid,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res=>{
					console.log(res);
					if(res.errCode==0){
						this.isFollow = true
					}
				})
				
				
			},
			cancelFollow(){
				this.$u.api.unfollow({
					uid:this.info.uid,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res=>{
					console.log(res);
					if(res.errCode==0){
						this.isFollow = false
					}
				})
			},
			joinGroup() {
				console.log(this.groupInfo.groupId, "44444");
				this.$req('/group/join_group', {
					groupID: this.groupInfo.groupId,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res);
					if (res.errCode == 0) {
						this.$u.toast('申请已发送')
					}
				})
			},
			goHome(id){
				if(this.isFollow == false ){
					this.$u.toast('请关注后查看更多详情')
					return
				}
				this.$u.vuex('vuex_search',this.info)
				console.log(this.info,"infoinfoinfoinfoinfoinfoinfo");
				uni.navigateTo({
					url:'../myPart/goodsHome/goodsHome?id=' + id
				})
			},
			goDetail(e) {
				if(this.isFollow == false ){
					this.$u.toast('请关注后查看更多详情')
					return
				}
				
				console.log(e, "45455454");
				this.$u.vuex('vuex_goodsInfo', e);
				uni.navigateTo({
					url: '/pages/findPart/goodsDetail'
				})
			}
		},
		onShow() {
			if (JSON.stringify(this.vuex_searchGroup) == '{}') {
				this.info = this.vuex_search
				this.state = 1
				console.log(this.info, "用户信息");

				let parameter = {}
				parameter.uidList = [this.info.uid]
				parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
				this.$u.api.get_users_items(parameter).then(res => {
					if (res.data[0].items.length > 4) {
						this.goodsList = res.data[0].items.slice(0, 4)
					} else {
						this.goodsList = res.data[0].items
					}
					console.log(this.goodsList, "物品");

				})

				this.$u.api.is_follow({
					uid: this.info.uid,
					operationId: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res.data.followed, "yiyiyiyiyiyi");
					this.isFollow = res.data.followed
				})



			} else if (JSON.stringify(this.vuex_search) == '{}') {
				this.groupInfo = this.vuex_searchGroup
				this.state = 2
				console.log(this.groupInfo, "群");
			}



		}
	}
</script>
<style>
	page {
		height: 100%;
		background: #F7F7F7;
	}
</style>

<style lang="scss" scoped>
	.search {
		.card {
			width: 90%;
			height: 450rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 16rpx 4rpx rgba(0, 0, 0, 0.12);
			border-radius: 20rpx;
			margin: 100rpx auto;
			padding: 30rpx 50rpx 0;

			.head {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;

				.headIcon {
					width: 122rpx;
					height: 122rpx;
					border-radius: 122rpx;
					flex-shrink: 0;
				}

				.headRight {
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-left: 24rpx;

					.info {
						display: flex;
						flex-direction: column;
						width: 66%;

						.name {
							font-size: 36rpx;
							font-weight: 500;
							color: #333333;
						}

						.id {
							font-size: 24rpx;
							font-weight: 400;
							color: #666666;
							word-break: break-all;
						}

					}

					.add {
						margin: 0;
						padding: 0;
						width: 128rpx;
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

			.footer {
				display: flex;
				// justify-content: space-between;
				margin-top: 24rpx;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 20rpx;
					.goodsImg {
						width: 126rpx;
						height: 126rpx;
					}

					.title {
						font-size: 22rpx;
						font-weight: 500;
						color: #333333;
						margin-top: 20rpx;
					}
				}
			}
		}
	}
</style>
