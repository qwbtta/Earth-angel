import store from '@/store';

const baseUrl = 'http://47.112.160.66:10000'   


const request = (url = '', date = {}, type = 'POST', header = { 'token':store.state.vuex_wsToken}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: baseUrl + url,
            data: date,
            header: {
				'token': store.state.vuex_wsToken
			},
            dataType: 'json',         
        }).then((response) => {
            
            let [error, res] = response;		
            resolve(res.data);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}
export default request