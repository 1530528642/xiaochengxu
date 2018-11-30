
const tip = require("../utils/tip.js")
const cache = require("../utils/cache.js")
/**
 * @desc    API请求接口类封装
 */

/**
 * POST请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestPostApi(url, params, sourceObj, successFun, failFun, completeFun) {
    // console.log('requestPostApi',url, params, sourceObj, successFun, failFun, completeFun)
    requestApi(url, params, 'POST', sourceObj, successFun, failFun, completeFun)
}

/**
 * GET请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestGetApi(url, params, sourceObj, successFun, failFun, completeFun) {
    requestApi(url, params, 'GET', sourceObj, successFun, failFun, completeFun)
}

/**
 * 请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {String}   method      请求类型
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestApi(url, params, method, sourceObj, successFun, failFun, completeFun) {
    if (method == 'POST') {
        var contentType = 'application/x-www-form-urlencoded'
    } else {
        var contentType = 'application/json'
    }
    var tokens=wx.getStorageSync("token");
    if(cache.getSync('user')){
      var userId = cache.getSync('user')  
      params['userId']=userId.userId
    }
    
    wx.request({
        url:    url,
        method: method,
        data:   params,
        header: {'Content-Type': contentType,devType:1,token:tokens,appId:'wx69de4292a3b6b8b5'},
        success: function (res) {
            var ret=res.data.ret;
            var data=res.data.data;
            var msg=res.data.msg;
            switch (ret) {
                case 1:
                    typeof successFun  == 'function' && successFun(res.data, sourceObj)
                    break;
                case 2:
                    tip.showToast(msg);
                // wx.navigateTo({
                //     url:"../abnormal/abnormal?a="+msg,
                //     //接口调用成功的回调方法
                //     success:function(){},
                //     fail:function(){},
                //     complete:function(){}
                // })
                    break;
                case 4:
                    tip.showToast(msg);
                // console.log(99999999)
                    // wx.navigateTo({
                    //     url:"../login/login",
                    //     //接口调用成功的回调方法
                    //     success:function(){},
                    //     fail:function(){},
                    //     complete:function(){
                    //         // console.log(99999999)
                    //     }
                    // })
                        break;
                default:
                    break;
            }

        },
        fail: function (res) {
            //typeof failFun     == 'function' && failFun(res.data, sourceObj)
            tip.showToast("请在网络顺畅的时候重新操作！");
            failFun(res);
        },
        complete: function (res) {
            completeFun(res);
        }
    })
}

module.exports = { 
	requestPostApi,
    	requestGetApi
}
