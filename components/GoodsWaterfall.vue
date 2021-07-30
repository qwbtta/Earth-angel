<template>
	<view class="x-waterfallCon">
		<u-waterfall v-model="goodsList">
			<template v-slot:left="{leftList}">
				<view class="x-goodsItem" v-for="item in leftList" :key="item.uid">
					<u-lazy-load threshold="-300" border-radius="10" :image="item.imgUrls[0]"  @click="goDetail(item)">
					</u-lazy-load>
					<view class="describe">
						<view class="x-head u-flex" v-if="isMyHome!=null">
							<view class="x-headLeft u-flex">
								<text class="x-name-home">{{item.name}}</text>
							</view>
							<button type="default" class="x-want" v-if="isMyHome == true" @click="toEdit(item)">编辑</button>
							<button type="default" class="x-want" v-else @click="want(item)">想要</button>
						</view>
						<view class="x-head u-flex" v-else>
							<view class="x-headLeft u-flex">
								<image :src="item.icon" mode="" class="x-headIcon">
								</image>
								<text class="x-name">{{item.userName}}</text>
							</view>
							<button type="default" class="x-want" @click="want(item)">想要</button>
						</view>

						<text class="x-details">{{item.desc}}</text>

					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="x-goodsItem" v-for="item in rightList" :key="item.uid">
					<u-lazy-load threshold="-300" border-radius="10" :image="item.imgUrls[0]"   @click="goDetail(item)">
					</u-lazy-load>

					<view class="describe">
						<view class="x-head u-flex" v-if="isMyHome!=null">
							<view class="x-headLeft u-flex">
								<text class="x-name-home">{{item.name}}</text>
							</view>
							<button type="default" class="x-want" v-if="isMyHome == true" @click="toEdit(item)">编辑</button>
							<button type="default" class="x-want" v-else @click="want(item)">想要</button>
						</view>
						<view class="x-head u-flex" v-else>
							<view class="x-headLeft u-flex">
								<image :src="item.icon" mode="" class="x-headIcon">
								</image>
								<text class="x-name">{{item.userName}}</text>
							</view>
							<button type="default" class="x-want" @click="want(item)">想要</button>
						</view>
					
						<text class="x-details">{{item.desc}}</text>
					
					</view>
				</view>
			</template>
		</u-waterfall>
	</view>


</template>

<script>
	export default {
		name: "GoodsWaterfall",
		props: ["goodsList", "isMyHome"],
		data() {
			return {
				
			}
		},
		mounted() {
			

		},
		methods: {
			want(e){
				console.log(e);
				this.$u.api.user_want_the_item({
					itemId: e.itemID,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res=>{
					console.log(res)
					if (res.errCode == 0) {
						this.$u.toast('请求发送成功',2000)
					} else {
					}
				})
				// this.$req('/item/user_want_the_item', {
				// 	itemId: e.itemID,
				// 	operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				// }).then(res => {
				
				// 	console.log(res)
				// 	if (res.errCode == 0) {
				// 		this.$u.toast('请求发送成功')
				// 	} else {
				// 	}
				// })
			},
			toEdit(e){
				this.$emit('edit')
				this.$u.vuex('vuex_goodsInfo', e);
			},
			goDetail(e) {
				console.log(e);
				this.$u.vuex('vuex_goodsInfo', e);
				this.$u.route({
					url: '/pages/findPart/goodsDetail',
					params: {
						id: e.uid
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.x-btn {
		padding: 0;
		background: #25EFCF;
		border: 1px solid #000000;
		font-weight: 500;
	}


	.x-waterfallCon {
		padding: 0 24rpx;

	}

	.x-goodsItem {
		margin: 0 20rpx;

	}

	.x-head {
		margin-top: 20rpx;
		justify-content: space-between;

	}

	.x-headIcon {
		width: 64rpx;
		height: 64rpx;
		border-radius: 64rpx;
	}

	.x-name {
		font-size: 24rpx;
		font-weight: 500;
		color: #333333;
		margin-left: 20rpx;
	}

	.x-name-home {
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
	}

	.x-want {
		@extend .x-btn;
		margin: 0;
		width: 88rpx;
		height: 44rpx;
		line-height: 44rpx;
		border-radius: 12rpx;
		font-size: 24rpx;
		color: #000000;
	}

	.x-details {
		margin-top: 16rpx;
		margin-bottom: 28rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;


	}
</style>
