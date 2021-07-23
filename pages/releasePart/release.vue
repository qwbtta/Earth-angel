<template>
	<view class="release">

		<view class="titleCon">
			<text>物品名称</text>
			<image src="/static/common/image/moon.png" mode="" class="titleImg"></image>
		</view>
		<input type="text" value="" class="nameInput" />
		<view class="titleCon">
			<text>物品描述</text>
			<image src="/static/common/image/moon.png" mode="" class="titleImg"></image>
		</view>
		<textarea class="describeInput" maxlength="320" />
		<view class="titleCon">
			<text>上传照片</text>
			<image src="/static/common/image/moon.png" mode="" class="titleImg"></image>
		</view>
		<view class="photoCon">
			<image src="/static/common/image/card1.png" mode="aspectFit" class="photo" v-for="item in photos"></image>
			<image src="/static/common/image/addPhoto.png" mode="" class="addImg"> </image>

		</view>
		<view class="titleCon">
			<text>选择发布的位置</text>
			<image src="/static/common/image/moon.png" mode="" class="titleImg"></image>
		</view>
		<view class="buttonCon u-flex">
			<button type="default" class="friend">好友可见</button>
			<button type="default" class="friend" @click="groupShow=true">群组</button>

		</view>
		<button type="default" class="releaseBtn">发布</button>

		<u-popup v-model="groupShow" border-radius="20" mode="center" width="550">
			<view class="popupHead">
				<text>选择发布的群组</text>
			</view>
			<view class="popupMain">
				<scroll-view scroll-y="true" style="height: 800rpx;">

					<u-checkbox-group @change="monitor">
						<u-checkbox v-model="item.checked" shape="circle" active-color="#FFDF4E"
							v-for="item in groupInfo" class="checkboxItem">
							<view class="u-flex">
								<image :src="item.img" mode="aspectFit" class="itemImg"></image>
								<text class="itemName">{{item.name}}</text>
							</view>
						</u-checkbox>
					</u-checkbox-group>

				</scroll-view>


			</view>
			<view class="popupBottom u-flex">
				<view class="popupBottomLeft">
					<view class="specialCheckboxCon">
						<u-checkbox v-model="allChecked" shape="circle" active-color="#000000" @change="checkedAll" size="22">
						</u-checkbox>
					</view> 
					
					<text class="all" @click="textCheckedAll">全选</text>
				</view>
				
				<button type="default" class="confirm" @click="groupShow=false">确定</button>
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				photos: [1, 4, 2, 2, 6],
				groupShow: false,
				allChecked: false,
				groupInfo: [{
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
				this.groupInfo.map(item => {
					item.checked = !this.allChecked
				})
			},
			//为了完成UI样式，checkbox和全选字体分开绑定事件
			textCheckedAll(){
				this.allChecked = !this.allChecked
				this.groupInfo.map(item => {
					item.checked = this.allChecked
				})
			},
			monitor() {
				for (let i = 0; i < this.groupInfo.length; i++) {
					if (this.groupInfo[i].checked == false) {
						this.allChecked = false
						return
					} else {
						this.allChecked = true
					}
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.release {
		border-top: 1px solid #DBDEE3;
		padding: 44rpx 48rpx 100rpx;
		
		/deep/ .u-icon{
			display: none;
		}
		
		.btn {
			padding: 0;
			background: #25EFCF;
			border: 1px solid #000000;
			font-weight: 500;
			border-radius: 8rpx;
			font-weight: 500;
		}
		
		
	
		.titleCon {
			display: flex;
			align-items: center;
			font-size: 28rpx;
			font-weight: 400;
			color: #000000;
			margin-bottom: 16rpx;

			.titleImg {
				width: 34rpx;
				height: 34rpx;
				margin-left: 20rpx;
			}
		}

		.nameInput {
			height: 62rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			border: 2rpx solid #000000;
			margin-bottom: 48rpx;
		}

		.describeInput {
			height: 234rpx;
			width: 96%;
			padding: 2%;
			border-radius: 8rpx;
			border: 2rpx solid #000000;
			margin-bottom: 50rpx;
		}

		.photoCon {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin-bottom: 40rpx;

			.photo {
				width: 172rpx;
				height: 172rpx;
				border-radius: 8rpx;
				border: 2rpx solid #000000;
				margin-right: 42rpx;
				margin-bottom: 20rpx;
			}

			.addImg {
				width: 92rpx;
				height: 92rpx;
				padding: 41rpx;
				border-radius: 8rpx;
				border: 2rpx solid #000000;
				margin-right: 42rpx;
				margin-bottom: 20rpx;
			}

		}

		.buttonCon {
			.friend {
				margin: 0;
				@extend .btn;
				width: 150rpx;
				height: 56rpx;
				font-size: 28rpx;
				line-height: 56rpx;
				margin-right: 62rpx;
			}
		}

		.releaseBtn {
			@extend .btn;
			width: 182rpx;
			height: 56rpx;
			font-size: 28rpx;
			line-height: 56rpx;
			border-radius: 12rpx;
			margin-top: 136rpx;
		}

		.popupHead {
			height: 90rpx;
			background: #25EFCF;
			font-size: 32rpx;
			font-weight: 400;
			color: #000000;
			text-align: center;
			line-height: 90rpx;
		}

		.popupMain {
			padding-left: 36rpx;

			/deep/.u-checkbox-group {
				display: inline-grid !important;
			}
			/deep/ .u-checkbox__icon-wrap,.u-checkbox__icon-wrap-checked{
				border: 2px solid #000000 !important;
			}
			.checkboxItem {
				margin-top: 28rpx;

				.itemImg {
					width: 56rpx;
					height: 56rpx;
					margin-left: 10rpx;
				}

				.itemName {
					font-size: 26rpx;
					margin-left: 12rpx;
				}



			}


		}

		.popupBottom {
			height: 90rpx;
			background: #25EFCF;
			justify-content: space-between;
			padding: 0 60rpx;
			
			.popupBottomLeft{
				display: flex;
				align-items: center;
				.specialCheckboxCon{
					width: 34rpx;
					height: 34rpx;
					border-radius: 34rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 4rpx solid #333333;
					/deep/ .u-checkbox__icon-wrap,.u-checkbox__icon-wrap-checked{
						border: none !important;
					}
					u-checkbox{
						display: flex;
						width: 22rpx;
						height: 22rpx;
					}
					
				}
				.all {
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
					margin-left: 10rpx;
				}
			}
			

			

			.confirm {
				@extend .btn;
				margin: 0;
				width: 90rpx;
				height: 42rpx;
				font-size: 22rpx;
				line-height: 42rpx;
				background: #FFE987;
			}
		}

	}
</style>
