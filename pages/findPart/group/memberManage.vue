<template>
	<view class="memberManage">
		<view class="headCard u-flex">
			<image :src="groupInfo.faceUrl" mode="" class="cardImg"></image>
			<view class="info">
				<text class="groupName">{{groupInfo.groupName}}</text>
				<text class="groupId">ID：{{groupInfo.groupId}}</text>
			</view>
		</view>
		
		<view class="memberCon">
			<view class="memberItem" v-for="item in memberList" :key="item.uid">
				<image :src="item.icon" mode="" class="headIcon"></image>
				<text class="userName">{{item.name}}</text>
			</view>
			<view class="memberItem" @click="goEditMember('add')">
				<image src="/static/common/image/memberAdd.png" mode="" class="headIcon"></image>
				<text class="userName">添加</text>
			</view>
			<view class="memberItem" @click="goEditMember('delete')">
				<image src="/static/common/image/memberDelete.png" mode="" class="headIcon"></image>
				<text class="userName">删除</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				groupInfo:{},
				memberList:[],
				newMember:[],
			}
		},
		methods:{
			goEditMember(e){
				console.log(e);
				uni.navigateTo({
					url:'./editMemberNumber?do=' + e
				})
				
			}
		},
		onShow() {
			
			this.groupInfo = this.vuex_groupList.groupInfo
			this.$req('/group/get_group_member_list', {
				groupID:this.vuex_groupid,
				nextSeq:0,
				operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
			}).then(res => {
				console.log(res, "群成员");
				
				let ids = res.data.map(item => item.userId)
				this.$req('/user/get_user_info', {
					uidList: ids,
					operationID: this.vuex_openid + JSON.stringify(new Date()
						.getTime())
				}).then(res=>{
					console.log(res,"5555");
					this.memberList = res.data
					
				})
			
			})
			
			if(this.vuex_memberNum.length!=0){
				this.newMember = []
				for(let i =0;i<this.vuex_memberNum.length;i++){
					for(let p = 0;p<this.memberList.length;p++){
						if(this.vuex_memberNum[i].uid!=this.memberList[p].uid){
							this.newMember.push(this.vuex_memberNum[i]) 
							this.memberList.push(this.vuex_memberNum[i]) 
						}
					}
				}
				let ids = this.newMember.map(item => item.uid)
				this.$req('/group/invite_user_to_group', {
					groupID:this.vuex_groupid,
					uidList:ids,
					reason:'邀请进群',
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res,"进群");
				
				})
				
				
			}
			
		}
	}
</script>

<style>
	page{
		height: 100%;
		background-color: #F6F6F6;
	}
</style>

<style lang="scss" scoped>
	.memberManage{
		padding-top: 16rpx;
		.headCard{
			width: 100%;
			height: 200rpx;
			background: #FFFFFF;	
			.cardImg{
				width: 108rpx;
				height: 108rpx;
				border-radius: 108rpx;
				margin-left: 48rpx;
			}
			.info{
				display: flex;
				flex-direction: column;
				margin-left: 32rpx;
				.groupName{
					font-size: 32rpx;
					font-weight: 500;
					color: #000000;
				}
				.groupId{
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					margin-top: 8rpx;
					word-break: break-all;
				}
			}
		}
		
		.memberCon{
			display: flex;
			flex-wrap: wrap;
			margin-top: 16rpx;
			padding: 6rpx 24rpx 46rpx ;
			background-color: #FFFFFF;
			.headIcon{
				width: 84rpx;
				height: 84rpx;
				border-radius: 84rpx;
			}
			.memberItem{
				margin: 0 28rpx;
				margin-top: 40rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.userName{
					font-size: 20rpx;
					font-weight: 400;
					color: #999999;
					margin-top: 8rpx;
				}
			}
		}
	}
</style>
