<template>
	<view class="eidtMemberNumber">
		<u-navbar :title="title"></u-navbar>
		<view class="serachCon">
			<image src="/static/common/image/search2.png" mode="" class="serach"></image>
		</view>
		<view class="mainTitle">
			<text>{{state==1?'通讯录':'群成员'}}</text>
		</view>
		<view class="main">
			<u-checkbox v-model="item.checked" v-for="item in list" :key="item.uid" shape="circle" size="44"
				active-color="#25EFCF" icon-size="30">
				<view class="checkboxItem u-flex">
					<image :src="item.icon" mode="" class="headIcon"></image>
					
					<view class="name">
						<text >{{item.name}}</text>
					</view>
					
					
				</view>
				</u-checkbox>
		</view>
		<view class="footer">
			<button type="default" v-if="state==1" class="btn" @click="addMember">添加</button>
			<button type="default" v-else class="btn">删除</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				state: 1,
				list: []
			}
		},
		methods:{
			addMember(){
				let choose = []
				this.list.forEach(item => {
					if (item.checked == true) {
						choose.push(item)
					}
				})
				if(choose.length!=0){
					this.$u.vuex('vuex_memberNum',choose)
				}
				
				console.log(choose);
				uni.navigateBack({
				    delta: 1
				});
			}
		},
		onLoad(options) {
			console.log(options);
			if (options.do == "add") {
				this.title = "添加"
				this.state = 1
				
				this.$req('/friend/get_friend_list', {
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res)
					if (res.errCode == 0) {
							for(let i =0; i<res.data.length;i++){
								res.data[i].checked = false 
							}
							this.list =  res.data
							console.log(this.list);
							
					} else {
					}
				})
				
				
				
				
				
			} else if (options.do == "delete") {
				this.title = "删除"
				this.state = 2
			}
		}
	}
</script>

<style lang="scss" scoped>
	.eidtMemberNumber {
		/* /deep/ .u-icon__icon {
		color: #000000 !important;
	} */

		/deep/ .u-checkbox__icon-wrap {
			border: 4rpx solid #999999 !important;
		}

		/deep/ .u-checkbox__icon-wrap-checked {
			border: 4rpx solid #000000 !important;


		}

		.serachCon {
			width: 100%;
			height: 96rpx;
			background: #F1F1F1;
			display: flex;
			align-items: center;

			.serach {
				width: 44rpx;
				height: 46rpx;
				margin-left: 50rpx;
			}
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
				
				.headIcon{
					width: 84rpx;
					height: 84rpx;
					border-radius: 84rpx;
					margin-left: 34rpx;
				}
				.name{
					height: 132rpx;
					line-height: 132rpx;
					width: 1000rpx;//checkbox内部100%无效
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					border-bottom: 2rpx solid  #E9E9E9;
					margin-left: 28rpx;
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
