// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let cosCredentialsUrl = '/third/tencent_cloud_storage_credential';
let wxLoginUrl = '/third_service/login';
let releaseUrl = '/user/release_items'


// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	let getcosCredentials = (params = {}) => vm.$u.post('/third_service/tencent_cloud_storage_credential',params);
	let wxLogin = (params = {}) => vm.$u.post('/third_service/login',params);
	let release = (params = {}) => vm.$u.post('/item/release_item',params);
	let get_users_items = (params = {}) => vm.$u.post('/item/get_users_items',params);
	let get_group_users_items = (params = {}) => vm.$u.post('/item/get_group_users_items',params);
	let delete_item = (params = {}) => vm.$u.post('/item/delete_item',params);
	let sent_out_items = (params = {}) => vm.$u.post('/item/get_self_sent_out_items',params);
	let received_items = (params = {}) => vm.$u.post('/item/get_self_received_items',params);
	let update_item_info = (params = {}) => vm.$u.post('/item/update_item_info',params);
	let user_want_the_item = (params = {}) => vm.$u.post('/item/user_want_the_item',params);
	let gift_item = (params = {}) => vm.$u.post('/item/gift_item',params);
	let group_owner_delete_item = (params = {}) => vm.$u.post('/item/group_owner_delete_item',params);

	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {getcosCredentials,wxLogin,release,get_users_items,get_group_users_items,delete_item,sent_out_items,received_items,update_item_info,user_want_the_item,gift_item,group_owner_delete_item};
}

export default {
	install
} 