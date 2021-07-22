// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let cosCredentialsUrl = '/third/tencent_cloud_storage_credential';
let wxLoginUrl = '/third/login';
let releaseUrl = '/user/release_items'
let editUrl = '/user/edit_items'
let selfItemsUrl = '/user/self_items'
let searchUrl = '/user/search'
let careUrl = '/user/care'
let careItemsUrl = '/user/care_items'
let changeItemStatusUrl = '/user/items_status'
let itemByIdUrl = '/user/item_info'
let singeUrl = '/user/home_page'
let publishMessageUrl = '/user/leave_message'
let viewMessageUrl = '/user/view_message'

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	let getcosCredentials = (params = {}) => vm.$u.post(cosCredentialsUrl,params);
	let wxLogin = (params = {}) => vm.$u.post(wxLoginUrl,params);
	let release = (params = {}) => vm.$u.post(releaseUrl,params);
	let edit = (params = {}) => vm.$u.post(editUrl,params);
	let selfItems = (params = {}) => vm.$u.post(selfItemsUrl,params);
	let search = (params = {}) => vm.$u.post(searchUrl,params);
	let care = (params = {}) => vm.$u.post(careUrl,params);
	let careItems = (params = {}) => vm.$u.post(careItemsUrl,params);
	let changeItemStatus = (params = {}) => vm.$u.post(changeItemStatusUrl,params);
	let itemById = (params = {}) => vm.$u.post(itemByIdUrl,params);
	let singe = (params = {}) => vm.$u.post(singeUrl,params);
	let publishMessage = (params = {}) => vm.$u.post(publishMessageUrl,params);
	let viewMessage = (params = {}) => vm.$u.post(viewMessageUrl,params);
	
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {getcosCredentials,wxLogin,release,edit,selfItems,search,care,changeItemStatus,itemById,careItems,singe,publishMessage,viewMessage};
}

export default {
	install
}