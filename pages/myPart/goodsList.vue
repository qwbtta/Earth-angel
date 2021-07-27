<template>
	<view class="goodsList">

		<u-navbar :title="title"></u-navbar>

		<u-checkbox-group @change="monitor">




			<u-checkbox v-model="item.checked" shape="circle" active-color="#979797" class="checkboxItem" size="40"
				v-for="item in goodsInfo" @change="monitor">
				<view class="goodsItem">
					<image src="/static/common/image/card1.png" mode="" class="itemImg"></image>
					<view class="right">

						<view class="describe">
							<text class="title">{{item.name}}</text>
							<text class="who">{{item.name}}</text>
						</view>
						<button type="default" class="btn" @click.stop="contact">联系朋友</button>
					</view>




				</view>
			</u-checkbox>


		</u-checkbox-group>

	<view class="footer">
		
		<u-checkbox  v-model="allChecked" shape="circle" active-color="#000000"  size="44" @change="checkedAll"><text class="allcheck">全选</text></u-checkbox>
			
			<button type="default" class="btn" @click="deleteGoods">删除记录</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				allChecked:false,
				goodsInfo: [{
					img: "/static/common/image/card1.png",
					name: "叠翠峰小区闲置交流",
					checked: false
				}, {
					img: "/static/common/image/card1.png",
					name: "叠翠峰小区闲置交流",
					checked: false
				}, {
					img: "/static/common/image/card1.png",
					name: "叠翠峰小区闲置交流",
					checked: false
				}, {
					img: "/static/common/image/card1.png",
					name: "叠翠峰小区闲置交流",
					checked: false
				}]
			}
		},
		methods: {
			checkedAll() {
				this.goodsInfo.map(item => {
					item.checked = !this.allChecked
				})
			},
			
			monitor() {
				for (let i = 0; i < this.goodsInfo.length; i++) {
					if (this.goodsInfo[i].checked == false) {
						this.allChecked = false
						return
					} else {
						this.allChecked = true
					}
				}

			},
			contact(){
				console.log(1111);
			},
			deleteGoods(){
				let deleteList = this.goodsInfo.filter(item=>item.checked == true)
			}
		},
		onLoad(options) {
			
			
			console.log(options.where);
			if (options.where == "received") {
				this.title = "收到物品"
			} else if (options.where == "gave") {
				this.title = "我的赠送"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodsList {
		

		

		/deep/ .u-checkbox__icon-wrap {
			margin-top: 50rpx;
			margin-left: 36rpx;
		}
		/deep/ .u-icon__icon{
			font-size: 28rpx !important;
		}

		.btn {
			margin: 0;
			padding: 0;
			background: #25EFCF;
			border: 2rpx solid #000000;
			font-weight: 500;
			width: 128rpx;
			height: 58rpx;
			border-radius: 8rpx;
			font-size: 26rpx;
			font-weight: 500;
			color: #333333;
			line-height: 58rpx;

		}


		.goodsItem {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 44rpx;

			.itemImg {
				width: 132rpx;
				height: 132rpx;
				margin-left: 12rpx;
			}

			.right {
				display: flex;
				align-items: center;
				justify-content: space-between;


				.describe {
					display: flex;
					flex-direction: column;
					margin-left: 36rpx;
					margin-right: 40rpx;
					width: 280rpx;

					.title {
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
					}

					.who {
						font-size: 26rpx;
						font-weight: 500;
						color: #2F2F2F;
						margin-top: 6rpx;
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
			justify-content: space-between;
			padding: 0 48rpx 0 20rpx;
			
			/deep/ .u-checkbox__icon-wrap{
				margin-top: -0rpx;
				//这个组件很奇怪的bug 
			} 
			
			.allcheck{
				font-size: 28rpx;
				font-weight: 500;
				color: #333333;
			}
			
			.btn {
				width: 152rpx;
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
</style>
