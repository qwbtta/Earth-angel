<template>
	<view class="release">

		<view class="titleCon">
			<text>物品名称</text>
			<image src="/static/common/image/moon.png" mode="" class="titleImg"></image>
		</view>
		<input type="text" class="nameInput" v-model="goodsName" />
		<view class="titleCon">
			<text>物品描述</text>
			<image src="/static/common/image/moon.png" mode="" class="titleImg"></image>
		</view>
		<textarea class="describeInput" maxlength="320" v-model="goodsDescribe" />
		<view class="titleCon">
			<text>上传照片</text>
			<image src="/static/common/image/moon.png" mode="" class="titleImg"></image>
		</view>
		<view class="photoCon">
			<view class="photoItem" v-for="(item,index) in photoList" :key="index">
				<image :src="item" mode="aspectFit" class="photo" ></image>
				<image src="/static/common/image/clear.png" mode="" class="clear" @click="clearImg(index)"></image>
			</view>
			<image src="/static/common/image/addPhoto.png" mode="" class="addImg" @click="addImg"
				v-if="photoList.length<6"></image>

		</view>
		<view class="titleCon">
			<text>选择发布的位置</text>
			<image src="/static/common/image/moon.png" mode="" class="titleImg"></image>
		</view>
		<view class="buttonCon u-flex">
			<view :class="['friend',friendChoose==true?'checked':''] " @click="friendChoose = !friendChoose">
				关注可见
			</view>
			<view :class="['friend',groupChoose==true?'checked':''] " @click="showPopup">
				群组
			</view>


		</view>
		<button type="default" class="releaseBtn" @click="release">发布</button>

		<u-popup v-model="groupShow" border-radius="20" mode="center" width="550">
			<view class="popupHead">
				<text>选择发布的群组</text>
			</view>
			<view class="popupMain">
				<scroll-view scroll-y="true" style="height: 800rpx;">

					<u-checkbox-group @change="monitor">
						<u-checkbox v-model="item.checked" shape="circle" active-color="#FFDF4E"
							v-for="item in groupInfo" :key="item.groupId" class="checkboxItem">
							<view class="u-flex">
								<image :src="item.faceUrl" mode="aspectFit" class="itemImg"></image>
								<text class="itemName">{{item.groupName}}</text>
							</view>
						</u-checkbox>
					</u-checkbox-group>

				</scroll-view>


			</view>
			<view class="popupBottom u-flex">
				<view class="popupBottomLeft">
					<view class="specialCheckboxCon">
						<u-checkbox v-model="allChecked" shape="circle" active-color="#000000" @change="checkedAll"
							size="22">
						</u-checkbox>
					</view>

					<text class="all" @click="textCheckedAll">全选</text>
				</view>

				<button type="default" class="confirm" @click="groupConfirm">确定</button>
			</view>
		</u-popup>

	</view>
</template>

<script>
	let cosUpload = require('../../common/cos/upload.js')
	export default {
		data() {
			return {
				goodsName: "",
				goodsDescribe: "",
				photoList: [],
				groupShow: false,
				allChecked: false,
				groupChecked: [],
				friendChoose: false, //选项是否选中以变色
				groupChoose: false, //选项是否选中以变色
				groupInfo: [],
				itemId:""
			}
		},
		
		methods: {
			addImg() {
				let _this = this
				uni.chooseImage({
					count: 6,
					sourceType: ['album'],
					success(res) {
						res.tempFilePaths.forEach(item => {
							_this.photoList.push(item);
						});

					},
					fail(err) {
						console.log('err ==>', err);
					}
				});
			},
			clearImg(index){
				this.photoList.splice(index,1)
			},
			showPopup(){
				this.groupShow = true
				if(this.groupInfo.length==0){
					this.$req('/group/get_joined_group_list', {
						operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
					}).then(res=>{
						
						for(let i=0;i<res.data.length;i++){
							res.data[i].checked = false
						}
						this.groupInfo = res.data
						console.log(this.groupInfo,"群列表");
					})
				}
			},
			async release() {
				
				
				if (this.$u.trim(this.goodsName).length == 0) {
					this.$u.toast('请输入物品名称')
					return false
				} else if (this.$u.trim(this.goodsDescribe).length == 0) {
					this.$u.toast('请输入物品描述')
					return false
				} else if (this.photoList.length == 0) {
					this.$u.toast('请选择图片')
					return false
				} else if (this.friendChoose == false && this.groupChoose == false) {
					this.$u.toast('请选择发布位置')
					return false
				}
				
				var that = this
				
				if (this.vuex_releaseState==1){
					let Uploaded = []
					let noUploaded = []
					for(let i=0;i<this.photoList.length;i++){
						if(this.photoList[i].slice(0,19) =="https://earth-angel"){
							Uploaded.push(this.photoList[i])
						}else{
							noUploaded.push(this.photoList[i])
						}
					}
					 var newUploaded = await cosUpload.uploadFile(noUploaded,that)
					 var photos = Uploaded.concat(newUploaded)
				}else{
					var photos = await cosUpload.uploadFile(this.photoList,that)
				}


				console.log(photos);
				let parameter = {}
				parameter.name = this.goodsName
				parameter.desc = this.goodsDescribe
				parameter.imgUrls = photos
				parameter.operationId = this.vuex_openid + JSON.stringify(new Date().getTime())
				if (this.friendChoose) {
					parameter.followVisible = "1"
				} else {
					parameter.followVisible = "0"
				}
				if (this.groupChecked.length > 0) {
					parameter.groupVisible = this.groupChecked
				}


				console.log(parameter);

				if (this.vuex_releaseState==1) {
					parameter.itemId = this.itemId
					console.log(parameter,"更新");
					this.$u.api.update_item_info(parameter).then(res => {
						if (res.errCode == 0) {
							Object.assign(this.$data, this.$options.data())
							uni.navigateTo({
								url: '../myPart/goodsHome/goodsHome?id='+ this.vuex_openid
							})
							this.$u.toast('编辑成功');
						}
					})
				} else {
					this.$u.api.release(parameter).then(res => {
						if (res.errCode == 0) {
							Object.assign(this.$data, this.$options.data())
							uni.navigateTo({
								url: '../myPart/goodsHome/goodsHome?id='+ this.vuex_openid
							})
							this.$u.toast('发布成功');
						}
					})
				}



			},
			checkedAll() {
				this.groupInfo.map(item => {
					item.checked = !this.allChecked
				})
			},
			//为了完成UI样式，checkbox和全选字体分开绑定事件
			textCheckedAll() {
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
			},
			groupConfirm() {
				if(this.groupInfo.length==0){
					this.groupShow = false
					return
				}
				this.groupShow = false
				this.groupChecked = []
				//用filter()有问题
				this.groupInfo.forEach(item => {
					if (item.checked == true) {
						this.groupChecked.push(item.groupId)
					}
				})

				if (this.groupChecked.length == 0) {
					this.groupChoose = false
				} else {
					this.groupChoose = true
				}

				console.log(this.groupChecked);
			}
		},
		onShow() {
			
			if (JSON.stringify(this.vuex_goodsInfo) != "{}" && this.vuex_releaseState == 1) {
				this.goodsName = this.vuex_goodsInfo.name
				this.goodsDescribe = this.vuex_goodsInfo.desc
				this.photoList = this.vuex_goodsInfo.imgUrls
				this.itemId = this.vuex_goodsInfo.itemId
				if (this.vuex_goodsInfo.followVisible == "1") {
					this.friendChoose = true
				} else {
					this.friendChoose = false
				}
					
				this.groupChoose = false
				this.$u.vuex('vuex_goodsInfo', {});
				
			}
			
		},
		
		onTabItemTap(e){
			if(e.index==3){
				this.goodsName = ''
				this.goodsDescribe = ''
				this.photoList = []
				this.friendChoose = false
				this.groupChoose = false
				this.$u.vuex('vuex_releaseState', 0);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.release {
		border-top: 1px solid #DBDEE3;
		padding: 44rpx 48rpx 100rpx;

		/deep/ .u-icon {
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
			padding: 0 2%;
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
			.photoItem{
				width: 172rpx;
				height: 172rpx;
				border-radius: 8rpx;
				border: 2rpx solid #000000;
				margin-right: 42rpx;
				margin-bottom: 20rpx;
				position: relative;
				.photo {
					width: 100%;
					height: 100%;
				}
				.clear{
					width: 32rpx;
					height: 32rpx;
					position: absolute;
					top: 0;
					right: 0;
				}
				
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
				@extend .btn;
				width: 150rpx;
				height: 56rpx;
				font-size: 28rpx;
				line-height: 56rpx;
				margin-right: 62rpx;
				text-align: center;
			}

			.checked {
				background-color: #FFDF4E;
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

			/deep/ .u-checkbox__icon-wrap,
			.u-checkbox__icon-wrap-checked {
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

			.popupBottomLeft {
				display: flex;
				align-items: center;

				.specialCheckboxCon {
					width: 34rpx;
					height: 34rpx;
					border-radius: 34rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 4rpx solid #333333;

					/deep/ .u-checkbox__icon-wrap,
					.u-checkbox__icon-wrap-checked {
						border: none !important;
					}

					u-checkbox {
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
