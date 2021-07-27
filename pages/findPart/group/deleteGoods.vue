<template>
	<view class="deleteGoods">
		<view class="mainTitle">
			<text>群物品</text>
		</view>
		<view class="main">
			<u-checkbox v-model="item.checked" v-for="(item, index) in list" :key="index" shape="circle" size="44"
				active-color="#25EFCF" icon-size="30">
				<view class="checkboxItem u-flex">
					<image :src="item.image" mode="" class="goodsImg"></image>
					
					<view class="info">
						<text class="title">{{item.title}}</text>
						<view class="nameCon u-flex">
							<image src="/static/common/image/card2.png" mode="" class="headIcon"></image>
							<text class="name">{{item.name}}</text>
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
	export default{
		data(){
			return{
				list: [{
					image: '/static/common/image/card1.png',
					name: "隔壁阿花",
					title: "全新重工新疆棉T恤",
					checked: false
				},{
					image: '/static/common/image/card1.png',
					name: "隔壁阿花",
					title: "全新重工新疆棉T恤",
					checked: false
				}, {
					image: '/static/common/image/card1.png',
					name: "隔壁阿花",
					title: "全新重工新疆棉T恤",
					checked: false
				},  ]
			}
		},
		methods:{
			deleteGoods(){
				let chooseList = this.list.filter(item=>item.checked == true)
					
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.deleteGoods{
		padding-top: 12rpx;
		border-top:2rpx solid  rgba(0, 0, 0, 0.1);
		
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
		.main{
			padding-left: 34rpx;
			.checkboxItem{
				
				.goodsImg{
					width: 130rpx;
					height: 130rpx;
					margin-left: 34rpx;
				}
				.info{
					height: 212rpx;
					width: 1000rpx;//checkbox内部100%无效
					margin-left: 28rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					border-bottom: 2rpx solid #E9E9E9;
					.title{
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
					}
					.nameCon{
						margin-top: 12rpx;
						.headIcon{
							width: 48rpx;
							height: 48rpx;
						}
						.name{
							font-size: 24rpx;
							font-weight: 500;
							color: #333333;
							margin-left: 10rpx;
						}
					}
				}
			}
		}
		.footer{
			width:100%;
			height: 96rpx;
			background: #F1F1F1;
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
