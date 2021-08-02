<template>
	<view class="newGroup">
		<view class="head" @click="setIcon">
			<view class="headIconCon">
				<image :src="groupIcon" mode="" class="headIcon"></image>
			</view>
			<text class="setIcon">设置群头像</text>
		</view>
		<view class="main">
			<text class="add">添加群成员</text>
			<view class="memberCon">
				<view class="memberItem" v-for="item in memberList" :key="item.uid" >
					<image :src="item.icon" mode="" class="member"></image>
					<text>{{item.name}}</text>
				</view>

				<image src="/static/common/image/add.png" mode="" class="member" @click="goEditNumber"></image>
			</view>


		</view>
		<view class="main">
			<text class="setName">设置群组名称</text>
			<input type="text" v-model="groupName" class="setInput" />
		</view>
		<button type="default" class="finish" @click="finish">完成</button>
	</view>
</template>

<script>
	let cosUpload = require('../../../common/cos/upload.js')
	export default {
		data() {
			return {
				groupIcon: "",
				memberList: [],
				groupName:""
			}
		},
		methods: {
			setIcon() {
				let _this = this
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					success(res) {
						res.tempFilePaths.forEach(item => {
							_this.groupIcon = item;
						});
						console.log(_this.groupIcon);

					},
					fail(err) {
						console.log('err ==>', err);
					}
				});
			},
			goEditNumber() {
				uni.navigateTo({
					url: './editMemberNumber?do=add'
				})
			},
			async finish(){
				if (this.groupIcon == "") {
					this.$u.toast('请设置群头像')
					return false
				} 
				else if (this.memberList.length == 0) {
					this.$u.toast('请添加至少一名群成员')
					return false
				} else if (this.$u.trim(this.groupName).length == 0) {
					this.$u.toast('请设置群组名称')
					return false
				}
				let that = this
				let photos = await cosUpload.uploadFile([this.groupIcon],that)
				
				let chooseMemberList = []
				for(let i =0;i<this.memberList.length;i++){
					let item = {}
					item.uid = this.memberList[i].uid
					item.setRole = 0
					chooseMemberList.push(item)
				}
				this.$req('/group/create_group', {
					memberList:chooseMemberList,
					groupName:this.groupName,
					faceUrl:photos[0],
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res=>{
					console.log(res.data);
					let groupID = res.data.groupID
					let uidList = this.memberList.map(item=>item.uid)
					// this.$req('/group/invite_user_to_group', {
					// 	groupID:groupID,
					// 	uidList:uidList,
					// 	reason:'邀请进群',
					// 	operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
					// }).then(res=>{
					// 	console.log(res,"邀请进群");
					// })
					
					
					if(res.errCode == 0){
						uni.switchTab({
							url:'../find'
						})
						this.$u.toast('创建群组成功')
					}
				})
			}
		},
		onShow() {
			this.memberList = this.vuex_memberNum
			console.log(this.memberList,"已选中");
		}

	}
</script>

<style lang="scss" scoped>
	.newGroup {
		border-top: 1px solid #DBDEE3;
		padding: 0 40rpx;

		.head {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 104rpx;
			margin-bottom: 80rpx;

			.headIconCon {
				width: 180rpx;
				height: 180rpx;
				border-radius: 180rpx;
				border: 4rpx solid #000000;
				display: flex;
				align-items: center;
				justify-content: center;

				.headIcon {
					width: 114rpx;
					height: 114rpx;
					border-radius: 114rpx;
				}
			}

			.setIcon {
				font-size: 40rpx;
				font-weight: 500;
				color: #333333;
				margin-top: 28rpx;
			}
		}

		.main {
			padding: 30rpx 24rpx;
			margin-top: 40rpx;
			background-color: #F1F1F1;
			border-radius: 8rpx;

			.add {
				font-size: 28rpx;
				font-weight: 500;
				color: #333333;
			}

			.memberCon {
				margin-top: 20rpx;
				display: flex;
				align-items: flex-start;

				.member {
					width: 88rpx;
					height: 88rpx;
					border-radius: 88rpx;
				}

				.memberItem {
					margin-right: 24rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 16rpx;
					font-weight: 400;
					color: #666666;

					.member {
						margin-bottom: 8rpx;
					}
				}

			}

			.setName {
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
			}

			.setInput {
				height: 72rpx;
				margin-top: 20rpx;
				border-radius: 8rpx;
				border: 4rpx solid #000000;
				padding: 0 18rpx;
			}

		}

		.finish {
			// margin-top: 240rpx;
			margin-top: 30%;
			padding: 0;
			background: #25EFCF;
			border: 2px solid #000000;
			font-weight: 500;
			width: 214rpx;
			height: 68rpx;
			border-radius: 12rpx;
			font-size: 34rpx;
			line-height: 68rpx;
		}
	}
</style>
