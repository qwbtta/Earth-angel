<template>
	<view class="chatPage">
		<u-navbar title="大张伟"></u-navbar>
		<view class="head u-flex">
			<image src="/static/common/image/card1.png" mode="aspectFit" class="goodsImg"></image>
			<view class="info">
				<text class="title">不规则设计感花瓶</text>
				<text class="tips">赠送之前聊一聊</text>
			</view>
		</view>
		<view class="main">
			<view :class="['chatLeft',item.id == this.vuex_openid?'reverse':'']" v-for="item in chatList">
				<image src="/static/common/image/card1.png" mode="" class="chatHeadIcon"></image>
				<!-- <image src="/static/common/image/card1.png" mode="aspectFit" class="chatImg"></image> -->
				<view class="triangle">
					
				</view>
				<view class="chatMain">
					<text class="chatText">{{item.content}}</text>
					
				</view>
				
			</view>
			
		</view>
		
		<view class="footer">
			<image src="/static/common/image/sendPhoto.png" mode="" class="sendPhoto"></image>
			<input type="text" value="" class="mainInput"/>
			<button type="default" class="sendBtn">发送</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				chatList:[{content:"789456123123564",id:"44444"},{content:"ddddddddd",id:this.vuex_openid}]
			}
		},
		methods:{
			
		},
		beforeMount() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.chatPage{
		
		
		.head{
			width: 750rpx;
			height: 176rpx;
			background: #DAFFF9;
			.goodsImg{
				width: 116rpx;
				height: 116rpx;
				margin-left: 48rpx;
				
			}
			.info{
				display: flex;
				flex-direction: column;
				margin-left: 32rpx;
				.title{
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
				}
				.tips{
					font-size: 28rpx;
					font-weight: 400;
					color: #666666;
					margin-top: 8rpx;
				}
			}
		}
		
		.main{
			padding: 54rpx 48rpx;
			.chatLeft{
				display: flex;
				align-items: flex-start;
				margin-top: 32rpx;
				.chatHeadIcon{
					width: 76rpx;
					height: 76rpx;
					flex-shrink: 0;
				}
				.chatImg{
					width: 406rpx;
				}
				.triangle{
						display:block;
					    width:0px;
					    height:0px;
					    border-top:14rpx solid transparent;
					    border-bottom: 14rpx solid transparent;
					    border-left: 14rpx solid transparent;
					    border-right: 20rpx solid rgba(238, 238, 238, 1);
						margin-top: 16rpx;
				}
				.chatMain{
					width: 442rpx;
					background: #EEEEEE;
					border-radius: 8rpx;
					padding: 12rpx 18rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					line-height: 40rpx;
					margin-top: 6rpx;
					.chatText{
						word-break: break-all;
					}
						
					
				}
				
			}
			.reverse{
				flex-direction: row-reverse;
				.triangle{
						display:block;
					    width:0px;
					    height:0px;
					    border-top:14rpx solid transparent;
					    border-bottom: 14rpx solid transparent;
					    border-right: 14rpx solid transparent;
					    border-left: 20rpx solid rgba(238, 238, 238, 1);
						margin-top: 16rpx;
				}
			}
		}
		
		.footer{
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: fixed;
			bottom: 0;
			padding: 0 28rpx;
			.sendPhoto{
				width: 64rpx;
				height: 64rpx;
				flex-shrink: 0;
			}
			.mainInput{
				width: 100%;
				height: 60rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 4rpx solid #333333;
				margin: 0 24rpx;
				padding: 0 10rpx;
			}
			.sendBtn{
				margin: 0;
				padding: 0;
				width: 92rpx;
				height: 64rpx;
				background: #25EFCF;
				border-radius: 8rpx;
				border: 4rpx solid #000000;
				font-size: 32rpx;
				font-weight: 500;
				color: #000000;
				line-height: 60rpx;
				flex-shrink: 0;
			}
		}
	}
</style>
