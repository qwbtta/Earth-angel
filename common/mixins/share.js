export const shareMixins = {
    data () {
        return {
            shareData: {
                title: '',
                path: '/pages/release/release'
            }
        }
    },

    //#ifdef MP-WEIXIN
    onShareAppMessage () {
		console.log(this.shareData);
        return {
            title: '我送给你一份物品，快来看看吧~',
            path: this.shareData.path,
            success: res => {
                console.info(res,"onShareAppMessageRESRES")
            }
        }
    },
    //#endif

    onLoad(option) {
    }
}