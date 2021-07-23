<template>
	<view class="goodsList">

		<u-navbar :title="title"></u-navbar>

		<u-checkbox-group @change="monitor">




			<u-checkbox v-model="item.checked" shape="circle" active-color="#979797" class="checkboxItem" size="40"
				v-for="item in goodsInfo">
				<view class="goodsItem">
					<view class="left u-flex">
						<image src="/static/common/image/card1.png" mode="" class="itemImg"></image>
						<view class="describe">
							<text class="title">{{item.name}}</text>
							<text class="who">{{item.name}}</text>
						</view>
					</view>
					<view class="buttonCon">
						<button type="default" class="btn">删除记录</button>
						<button type="default" class="btn">联系朋友</button>
					</view>




				</view>
			</u-checkbox>


		</u-checkbox-group>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "xxx",
				goodsInfo: [{
					img: "/static/common/image/card1.png",
					name: "叠翠峰小区闲置交流群",
					checked: false
				}, {
					img: "/static/common/image/card1.png",
					name: "叠翠峰小区闲置交流群",
					checked: false
				}, {
					img: "/static/common/image/card1.png",
					name: "叠翠峰小区闲置交流群",
					checked: false
				}, {
					img: "/static/common/image/card1.png",
					name: "叠翠峰小区闲置交流群",
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
			//为了完成UI样式，checkbox和全选字体分开绑定事件
			textCheckedAll() {
				this.allChecked = !this.allChecked
				this.goodsInfo.map(item => {
					item.checked = this.allChecked
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

			}
		},
		onLoad(options) {
			// console.log(options.where);
			// if (options.where == "received") {
			// 	this.title = "收到物品"
			// } else if (options.where == "gave") {
			// 	this.title = "我的赠送"
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.goodsList {
		padding: 0 48rpx 100rpx;

		/deep/ .u-icon {
			display: none;
		}

		/deep/.u-checkbox-group {
			display: inline-grid !important;
		}


		.btn {
			padding: 0;
			background: #25EFCF;
			border: 2rpx solid #000000;
			font-weight: 500;
			width: 116rpx;
			height: 46rpx;
			border-radius: 8rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #333333;
			line-height: 46rpx;
		}



		.goodsItem {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 44rpx;
			width: 610rpx;
			.left {
				.itemImg {
					width: 132rpx;
					height: 132rpx;
				}

				.describe {
					display: flex;
					flex-direction: column;
					margin-left: 36rpx;

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

			.buttonCon {
				height: 100rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
	}
</style>
