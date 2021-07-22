export const shareMixins = {
    data () {
        return {
            shareData: {
                title: '',
                path: '/pages/release/release',
                imageUrl: '',
            }
        }
    },

    //#ifdef MP-WEIXIN
    onShareAppMessage () {
		console.log(this.shareData);
        return {
            title: this.shareData.title,
            path: this.shareData.path,
            imageUrl: this.shareData.imageUrl,
            success: res => {
                console.info(res)
            }
        }
    },
    //#endif

    onLoad(option) {
    }
}