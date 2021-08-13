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
            title: '来看看这件物品吧~',
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