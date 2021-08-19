import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {};

try {
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
} catch (e) {

}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_nick_name', 'vuex_avatar_url', 'vuex_gender', 'vuex_openid', 'vuex_token', 'vuex_userId',
	'vuex_wsToken', 'vuex_msgIncr','vuex_firstLogin','vuex_receiveLength'
];

// 保存变量到本地存储中
const saveLifeData = function(key, value) {
	// 判断变量名是否在需要存储的数组中
	if (saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		vuex_nick_name: lifeData.vuex_nick_name ? lifeData.vuex_nick_name : '',
		vuex_avatar_url: lifeData.vuex_avatar_url ? lifeData.vuex_avatar_url : '',
		// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
		vuex_gender: lifeData.vuex_gender ? lifeData.vuex_gender : '',
		vuex_openid: lifeData.vuex_openid ? lifeData.vuex_openid : '',
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		vuex_userId: lifeData.vuex_userId ? lifeData.vuex_userId : '',
		vuex_receiveLength: lifeData.vuex_receiveLength ? lifeData.vuex_receiveLength : 0,
		vuex_receiveTips: false,
		vuex_search: {},
		vuex_searchGroup: {},
		vuex_wsToken: lifeData.vuex_wsToken ? lifeData.vuex_wsToken : '',
		vuex_goodsInfo: {},
		vuex_releaseState: 0,
		vuex_memberNum: [],
		vuex_msgIncr: lifeData.vuex_msgIncr ? lifeData.vuex_msgIncr : 1,
		vuex_chatList: [],
		vuex_groupList: [],
		vuex_groupid: "",
		vuex_shareInfo: {},
		vuex_groupShareId:"",
		vuex_noticeNumber: 0,
		vuex_firstLogin: lifeData.vuex_firstLogin ? lifeData.vuex_firstLogin : {logged:false,displayed:false},
		vuex_refresh: false,
		
		
	
		// 自定义tabbar数据
		vuex_tabbar: [{
				iconPath: "/static/common/image/release.png",
				selectedIconPath: "/static/common/image/release_s.png",
				text: '发布',
				pagePath: "/pages/release/release"
			},
			{
				iconPath: "/static/common/image/concern.png",
				selectedIconPath: "/static/common/image/concern_s.png",
				text: '关注',
				pagePath: "/pages/concern/concern"
			},
			// {
			// 	iconPath: "/static/common/image/chat.png",
			// 	selectedIconPath: "/static/common/image/chat_s.png",
			// 	text: 'Chat',
			// 	pagePath: "/pages/chat/chat"
			// },
			{
				iconPath: "/static/common/image/setting.png",
				selectedIconPath: "/static/common/image/setting_s.png",
				text: '我的',
				pagePath: "/pages/setting/setting"
			},
		]
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if (len >= 2) {
				let obj = state[nameArr[0]];
				for (let i = 1; i < len - 1; i++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store
