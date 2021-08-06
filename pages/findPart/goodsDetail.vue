<template>
	<view class="goodsDetail">
		<u-swiper :list="swiperList" mode="dot" height="680" border-radius="0" @click="swiperClick()"></u-swiper>
		<view class="main">
			<view class="head">
				<view class="headLeft">
					<image :src="userInfo.icon" mode="" class="headIcon" @click="goHomePage"></image>
					<view class="nameCon">
						<text class="name" @click="goHomePage">{{userInfo.name}}</text>
						<view class="titleCon u-flex">
							<view class="goodStitle">
								{{goodsName}}
							</view>
							<button type="default" class="share" open-type="share">分享</button>
						</view>
					</view>
				</view>
				
				<view class="headRight" v-if="isMine">
					<text class="people">已有{{peopleNum}}人想要</text>
					<button type="default" class="want" @click="goTransfer">转送</button>
				</view>
				<view class="headRight" v-else>
					<button type="default" class="want" @click="want">想要</button>
					<button type="default" class="want" @click="goChat">联系他</button>
				</view>
			</view>
			<view class="detail">
				<text>{{describe}}</text>
			</view>
		</view>
		<view class="footer">
			<view class="footerTitle">
				<text>{{isMine?'我':'Ta'}}的其他闲置</text>
				<text @click="goHomePage">查看更多</text>
			</view>
			<scroll-view class="scrollArea" scroll-x="true">
				<view class="container">
					<view class="item" v-for="item in goodsList" :key="item.itemId">
						<image :src="item.imgUrls[0]" mode="aspectFit" class="itemImg"></image>
						<text class="itemTitle">{{item.name}}</text>
					</view>
				</view>
				
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import {
		shareMixins
	} from '@/common/mixins/share.js'
	export default {
		mixins: [shareMixins],
		data() {
			return {
				isMine:true,
				swiperList: [],
				goodsName:"",
				describe:"",
				peopleNum: 0,
				wantedUid:[],
				goodsList: [],
				userInfo:{},
				
			}
		},
		methods: {
			goTransfer(){
				this.$u.vuex('vuex_wantedUid',this.wantedUid)
				uni.navigateTo({
					url:'../myPart/goodsHome/transfer'
				})
			},
			goHomePage(){
				this.$u.vuex('vuex_search', this.userInfo);
				
				uni.navigateTo({
					url:'../myPart/goodsHome/goodsHome?id='+this.userInfo.uid
				})
			},
			goChat(){
				uni.navigateTo({
					url:'../chatPart/chatPage?where=detail'
				})
				console.log(this.vuex_goodsInfo)	
			},
			want(){
				this.$u.api.user_want_the_item({
					itemId: this.vuex_goodsInfo.itemId,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res)
					if (res.errCode == 0) {
						this.$u.toast('请求发送成功', 2000)
					} else {}
				})
			}
		},
		onShow() {
			if(this.vuex_goodsInfo.fromUser == this.vuex_openid){
				this.isMine = true
				this.peopleNum = this.vuex_goodsInfo.wantedUid.length
				this.wantedUid = this.vuex_goodsInfo.wantedUid
			} else{
				this.isMine = false
			}
			this.swiperList = this.vuex_goodsInfo.imgUrls
			this.goodsName = this.vuex_goodsInfo.name
			this.describe = this.vuex_goodsInfo.desc
			this.$req('/friend/get_friends_info', {
					uid:this.vuex_goodsInfo.fromUser,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res.data,"获取用户信息")
					
					if(res.errCode==0){
					this.userInfo = res.data
					this.shareData.path = '/pages/login/shareUse?uid='+ this.userInfo.uid+'&goodsid=' + this.vuex_goodsInfo.itemId + '&shareName='+ this.vuex_nick_name + '&shareUid=' + this.vuex_openid
					}
				})
				
			let parameter = {}
			parameter.uidList = [this.vuex_goodsInfo.fromUser]
			parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
			this.$u.api.get_users_items(parameter).then(res=>{
				console.log(res.data[0].items,"其他闲置");
				console.log(this.vuex_goodsInfo.itemId );
				for(let i = 0; i<res.data[0].items.length;i++){
					if(this.vuex_goodsInfo.itemId == res.data[0].items[i].itemId){
						res.data[0].items.splice(i,1)
						this.goodsList =  res.data[0].items
						console.log(this.goodsList);
						return
					}
				}
			})
			
		}
		
		
	}
</script>

<style lang="scss" scoped>
	.goodsDetail {
		.btn {
			padding: 0;
			background: #25EFCF;
			border: 1px solid #000000;
			font-weight: 500;
			border-radius: 8rpx;
			font-weight: 500;
		}

		.main {
			margin-top: 60rpx;
			padding: 0 48rpx;
			.head {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.headLeft {
					display: flex;
					align-items: center;
					.headIcon {
						width: 94rpx;
						height: 94rpx;
						border-radius: 94rpx;
					}

					.nameCon {
						height:  100rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-left: 20rpx;
						.name {
							font-size: 30rpx;
							font-weight: 500;
							color: #333333;
						}

						.titleCon {
							
							.goodStitle {
								height: 44rpx;
								background: #FFF2B8;
								border-radius: 2px;
								border: 1px solid #000000;
								padding:  0 14rpx;
								line-height: 44rpx;
							}

							.share {
								@extend .btn;
								width: 88rpx;
								height: 44rpx;
								font-size: 24rpx;
								line-height: 44rpx;
								margin-left: 20rpx;
							}
						}
					}
				}

				.headRight {
					height:  100rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					.people{
						font-size: 22rpx;
						font-weight: 400;
						color: #333333;
					}
					.want {
						@extend .btn;
						margin: 0;
						width: 122rpx;
						height: 44rpx;
						font-size: 24rpx;
						line-height: 44rpx;
					}
				}
			}
		
			.detail{
				margin-top: 40rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #333333;
			}
		}
	
		.footer{
			padding-left: 48rpx;
			margin-top: 40rpx;
			.footerTitle{
				font-size: 28rpx;
				font-weight: 400;
				color: #000000;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-right: 48rpx;
			}
			.scrollArea{
				margin-top: 16rpx;
				margin-bottom: 40rpx;
				.container{
					display: flex;
				
				.item{
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 28rpx;
					.itemImg{
						width: 168rpx;
						height: 168rpx;;
					}
					.itemTitle{
						font-size: 22rpx;
						font-weight: 500;
						color: #333333;
						margin-top: 24rpx;
					}
				}}
			}
		}
	
	}
</style>
