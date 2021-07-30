<template>
	<view class="contacts">

		<view class="head">
			<view :class="[index==selectedIndex?'headItem-s':'','headItem']" v-for="(item,index) in tabs" :key="index"
				@click="select(index)">
				<text>{{item}}</text>
			</view>

		</view>
		<view class="main">
			<view class="mainItem u-flex" v-for="item in friends" :key="item.uid" v-if="selectedIndex==0" @click="goHomePage(item)">
				<image :src="item.icon" mode="" class="itemImg"></image>
				<text class="name">{{item.name}}</text>
			</view>
			<view class="mainItem u-flex" v-for="item in [1,2,2,3,1,1]" v-if="selectedIndex==1">
				<image src="/static/common/image/card1.png" mode="" class="itemImg"></image>
				<text class="name">叠翠峰小区闲置交流群</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: ["我的关注", "我管理的群组", "我加入的群组"],
				selectedIndex: 1,
				friends:[]
			}
		},
		methods: {
			select(index) {
				this.selectedIndex = index
				if (this.selectedIndex == 0) {
					this.$req('/friend/get_friend_list', {
						operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
					}).then(res => {
						console.log(res)
						if(res.errCode==0){
							this.friends = res.data
						}
					})
				}
			},
			goHomePage(e){
				this.$u.vuex('vuex_search', e);
				uni.navigateTo({
					url:'./goodsHome/goodsHome'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contacts {
		.head {
			height: 104rpx;
			background: #F1F1F1;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			margin-bottom: 12rpx;

			.headItem {
				font-size: 28rpx;
				font-weight: 400;
				color: #000000;
			}

			.headItem-s {
				padding: 0 28rpx;
				height: 48rpx;
				background: #25EFCF;
				border-radius: 24rpx;
				border: 2px solid #000000;
				text-align: center;
			}
		}

		.main {
			padding: 0 48rpx;

			.mainItem {
				margin-top: 28rpx;

				.itemImg {
					width: 76rpx;
					height: 76rpx;
					border-radius: 76rpx;
				}

				.name {
					font-size: 32rpx;
					font-weight: 400;
					color: #000000;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
