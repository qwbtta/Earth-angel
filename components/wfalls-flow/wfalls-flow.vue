<template>
	<view class="list-container">
		<view id="wf-list" class="list" v-for="(list,listIndex) of viewList" :key="listIndex">
            <view class="item" v-for="(item,index) of list.list" :key="index">
                <image @load="handleViewRender(listIndex,index)" @error="handleViewRender(listIndex,index)" :src="item.imgUrls[0]" mode="widthFix" @click="goDetail(item)" :class="item.toUser.length>0?'x-Img':'x-orinImg'"></image>
                <view class="describe">
                	<view class="x-head u-flex">
                		<view class="x-headLeft u-flex">
                			<text class="x-name-home">{{item.name}}</text>
                		</view>
                		<button type="default" class="x-want" @click="toEdit(item)"
                			v-if="item.fromUser==vuex_openid">编辑</button>
                		<button type="default" class="x-want" @click="want(item)" v-else>想要</button>
                	</view>
                	<text class="x-details">{{item.desc}}</text>
                
                </view>
            </view>
        </view>
	</view>
</template>

<script>
	export default {
        props:{
            list:{
                type:Array, //实际请求获取的列表数据
            }
        },
		data() {
			return {
                viewList:[{list:[]},{list:[]}],  //展示到视图的列表数据
                everyNum:2
			}
		},
		methods: {
			want(e) {
				console.log(e);
				this.$u.api.user_want_the_item({
					itemId: e.itemId,
					operationID: this.vuex_openid + JSON.stringify(new Date().getTime())
				}).then(res => {
					console.log(res)
					if (res.errCode == 0) {
						this.$u.toast('申请发送成功', 2000)
					} else {}
				})
			
			},
			toEdit(e) {
				this.$emit('edit')
				this.$u.vuex('vuex_goodsInfo', e);
			},
			goDetail(e) {
				console.log(e, "45455454");
				this.$u.vuex('vuex_goodsInfo', e);
				uni.navigateTo({
					url: '/pages/findPart/goodsDetail'
				})
			
			
			},
            init(){
                this.viewList = [{list:[]},{list:[]}];
                setTimeout(()=>{
                    this.handleViewRender(0,0)
                },0)
            },
			handleViewRender(x,y){
                // console.log(x,y);
                // const num = (x+1)*(y+1);
                // console.log(num%(this.everyNum));
                // console.log(num);
                // if((num%(this.everyNum))!==0&&num!==1)return;
                // console.log(num,'----');
                const index = this.viewList.reduce((total,current)=>total + current.list.length,0)
                if(index>this.list.length-1) {
                    // 加载完成触发事件并返回加载过的图片数
                    this.$emit('finishLoad',index)
                    return
                };
                const query = uni.createSelectorQuery().in(this);
                let listFlag = 0;
                query.selectAll('#wf-list').boundingClientRect(data => {
                    listFlag = data[0].bottom - data[1].bottom<=0?0:1;
                    this.viewList[listFlag].list.push(this.list[index])
                    // this.list.slice(index,index+this.everyNum).forEach((item,index)=>{
                    //     const flag = listFlag===0?index&1:Number(!(index&1))
                    //     this.viewList[flag].list.push(item)
                    // })
                }).exec()
            },
		},
        mounted() {
            if(this.list.length){
                this.init()
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
	
	.x-orinImg{
		border-radius: 20rpx;
		width: 100%;
		position: relative;
	}
	.x-Img {
		border-radius: 20rpx;
		width: 100%;
		position: relative;
	}
	.x-Img::before {
	    content: "已送出";
		font-size: 52rpx;
		font-weight: 600;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	    position: absolute;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    top: 0;
	    background-color: rgba(196, 196, 196, 0.7);
	    z-index: 2;
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
		flex-shrink: 0;
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

<style lang="stylus" scoped>
	
    .list-container
        display flex
        justify-content space-between
        align-items:flex-start
        padding 0 48rpx
        padding-top 30rpx
        .list
            width calc(50% - 16rpx)
            display flex
            flex-direction column
            .item
                margin-bottom 18rpx
                // border 1px solid red
                // image
                //     width 100%
                .desc
                    padding 16rpx
                    font-size 28rpx
</style>