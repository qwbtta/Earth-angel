<template>
	<view class="my">
		<view class="top">
			<view class="head u-flex">
				<image :src="vuex_avatar_url" mode="" class="headIcon"></image>
				<view class="nameCon">
					<text class="name">{{vuex_nick_name}}</text>
					<text class="id" @longpress="copy">ID: {{vuex_openid}}</text>
				</view>
			</view>
			<view class="main">
				<view class="item" @click="goContacts">
					<image src="/static/common/image/contacts.png" mode="" class="mainImg"></image>
					<text>联系人</text>
				</view>
				<view class="item rela" @click="goGoodsHome">
					<image src="/static/common/image/home.png" mode="" class="mainImg"></image>
					<text>闲置主页</text>
					<view class="tips" v-if="vuex_noticeNumber>0">
						
					</view>
				</view>
				<view class="item"  @click="goGoodsList('received')">
					<image src="/static/common/image/received.png" mode="" class="mainImg"></image>
					<text>收到物品</text>
				</view>
				<view class="item" @click="goGoodsList('gave')">
					<image src="/static/common/image/give.png" mode="" class="mainImg"></image>
					<text>我的赠送</text>
				</view>
				
				
			</view>
		</view>
		<view class="body">
			<view class="item" @click="editName">
				<view class="left">
					<image src="/static/common/image/modifyMyName.png" mode="" class="bodyImg"></image>
					<text>修改昵称</text>
				</view>
				<image src="/static/common/image/arrow.png" mode="" class="arrow"></image>
			</view>
			<!-- <view class="item" @click="goNotice">
				<view class="left">
					<image src="/static/common/image/notice.png" mode="" class="bodyImg"></image>
					<view class="myFlex">
						<text>通知</text>
					</view>
				</view>
				<image src="/static/common/image/arrow.png" mode="" class="arrow"></image>
			</view> -->
			<view class="item" @click="goIWant">
				<view class="left">
					<image src="/static/common/image/iWant.png" mode="" class="bodyImg"></image>
					<view class="myFlex">
						<text>我想要的</text>
					</view>
				</view>
				<image src="/static/common/image/arrow.png" mode="" class="arrow"></image>
			</view>
			<view class="item" @click="feedBack">
				<view class="left">
					<image src="/static/common/image/help.png" mode="" class="bodyImg"></image>
					<text>意见反馈</text>
				</view>
				<image src="/static/common/image/arrow.png" mode="" class="arrow"></image>
			</view>
		</view>
		
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
	export default{
		data(){
			return{
				loginPopup:false,
				redDot: false
			}
		},
		methods:{
			goLogin(){
				this.loginPopup= false
				uni.navigateTo({
					url:'../login/login'
				})
			},
			goIWant(){
				uni.navigateTo({
					url:'./iWant'
				})
			},
			copy(){
				let _this = this
				uni.setClipboardData({
				    data: _this.vuex_openid,
				    success: function () {
						uni.hideToast()
						uni.showToast({
				           title: '复制成功',
				           duration: 2000
				       });
				    }
				});
			},
			goContacts(){
				uni.navigateTo({
					url:'./contacts' 
				})
			},
			goGoodsHome(){
				uni.navigateTo({
					url:'./goodsHome/myGoodsHome'
				})
			},
			goNotice(){
				uni.navigateTo({
					url:'./notice' 
				})
			},
			goGoodsList(e){
				uni.navigateTo({
					url:'./goodsList?where=' + e
				})
			},
			editName(){
				uni.navigateTo({
					url:'./editNickName'
				})
			},
			feedBack(){
				uni.navigateTo({
					url:'../findPart/group/announcement?where=my'
				})
			}
		},
		onShow() {
			if(this.vuex_token == '' || this.vuex_wsToken == ''){
				this.loginPopup = true
			}		
			
			if(this.vuex_noticeNumber > 0){
				this.redDot = true
			}else{
				this.redDot = false
			}
			
			console.log(this.vuex_noticeNumber,"vuex_noticeNumbervuex_noticeNumbervuex_noticeNumber");
		}
	}
</script>

<style>
	page{
		height: 100%;
		background: #F4FFFD;
	}
</style>
<style lang="scss" scoped>
	.my{
		padding: 0 40rpx;
		border-top: 1px solid #DBDEE3;
		.top{
			height: 416rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 8rpx 6rpx rgba(0, 0, 0, 0.08);
			border-radius: 20rpx;
			margin-top: 42rpx;
			padding-top: 60rpx;
			.head{
				margin-left: 7%;
				.headIcon{
					width:120rpx;
					height: 120rpx;
					border-radius: 120rpx;
				}
				.nameCon{
					margin-left: 40rpx;
					display: flex;
					flex-direction: column;
					.name{
						font-size: 36rpx;
						font-weight: 500;
						color: #333333;
						
					}
					.id{
						font-size: 24rpx;
						font-weight: 400;
						color: #666666;
						margin-top: 6rpx;
					}
				}
				
			}
			.main{
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				margin-top: 48rpx;
				.item{
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 26rpx;
					font-weight: 500;
					color: #333333;
					.mainImg{
						width: 84rpx;
						height: 84rpx;
						margin-bottom: 16rpx;
					}
				}
				.rela{
					position: relative;
					.tips{
						width: 22rpx;
						height: 22rpx;
						border-radius: 22rpx;
						background-color: #FA5151;
						position: absolute;
						right: 10%;
						top: 0;
					}
				}
			}
		}
		.body{
			height: 350rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 8rpx 6rpx rgba(0, 0, 0, 0.08);
			border-radius: 20rpx;
			margin-top: 40rpx;
			padding: 0 50rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			.myFlex{
				display: flex;
				align-items: flex-start;
				
				.tips{
					width: 14rpx;
					height: 14rpx;
					border-radius: 14rpx;
					background-color: #FA5151;
					margin-left: 8rpx;
				}
			}
			
			.item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left{
					display: flex;
					align-items: center;
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					.bodyImg{
						width: 44rpx;
						height: 44rpx;
						margin-right: 20rpx;
					}
				}
				
				.arrow{
					width: 20rpx;
					height: 34rpx;
				}
			}
		}
	}
</style>