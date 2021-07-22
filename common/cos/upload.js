let CosAuth = require('./cos-auth.js')

// 请求用到的参数
var prefix = 'https://earth-angel-1302656840.cos.ap-chengdu.myqcloud.com/';

// 对更多字符编码的 url encode 格式
var camSafeUrlEncode = function (str) {
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
};

// 获取临时密钥
var stsCache;
var _this;
var getCredentials = async function () {
    if (stsCache && Date.now() / 1000 + 30 < stsCache.ExpiredTime) {
        return stsCache.Credentials;
        return;
    }
	const result = await _this.$u.api.getcosCredentials()
	console.log(result);
	var data = result.data;
	var credentials = data.Credentials;
	if (credentials) {
	    stsCache = data
	} else {
	    wx.showModal({title: '临时密钥获取失败', content: JSON.stringify(data), showCancel: false});
	}
	return stsCache && stsCache.Credentials
};


var wxUp = function(AuthData,key,filePath){
	return new Promise((reslove,reject)=>{
		wx.uploadFile({
		    url: prefix,
		    name: 'file',
		    filePath: filePath,
		    formData: {
		        'key': key,
		        'success_action_status': 200,
		        'Signature': AuthData.Authorization,
		        'x-cos-security-token': AuthData.XCosSecurityToken,
		        'Content-Type': '',
		    },
		    success: function (res) {
		        var url = prefix + camSafeUrlEncode(key).replace(/%2F/g, '/');
		        if (res.statusCode === 200) {
					reslove({url})
		            // wx.showModal({title: '上传成功', content: url, showCancel: false});
		        } else {
					reject(JSON.stringify(res))
		            // wx.showModal({title: '上传失败', content: JSON.stringify(res), showCancel: false});
		        }
		    },
		    fail: function (res) {
				reject(JSON.stringify(res))
		        // wx.showModal({title: '上传失败', content: JSON.stringify(res), showCancel: false});
		    }
		});
	})
}

// 上传文件
var uploadFile = async function (filePaths,that) {
	_this = that
	var Keys=[]
	filePaths.forEach((f,i)=>{
		Keys[i] = f.substr(f.lastIndexOf('/') + 1);
	})
	const credentials = await getCredentials()
	const AuthData = {
            XCosSecurityToken: credentials.Token,
            Authorization: CosAuth({
                SecretId: credentials.TmpSecretId,
                SecretKey: credentials.TmpSecretKey,
                Method: 'POST',
                Pathname: '/',
            })
			}
		let urlData=[]
		for(let i=0;i<filePaths.length;i++){
			const {url} = await wxUp(AuthData,Keys[i],filePaths[i])
			urlData.push(url)
		}
		return urlData
};

var test = function (val){
	return val
	}


const cosUpload={
	prefix,
	uploadFile,
	test
}

module.exports = cosUpload;