"use strict";

var tip = require("./tip.js");
var cache = require("./cache.js");
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
    requestApi(url, params, 'POST', sourceObj, successFun, failFun, completeFun);
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
    requestApi(url, params, 'GET', sourceObj, successFun, failFun, completeFun);
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
        var contentType = 'application/x-www-form-urlencoded';
    } else {
        var contentType = 'application/json';
    }
    var tokens = wx.getStorageSync("token");
    if (cache.getSync('user')) {
        var userId = cache.getSync('user');
        params['userId'] = userId.userId;
    }

    wx.request({
        url: url,
        method: method,
        data: params,
        header: { 'Content-Type': contentType, devType: 1, token: tokens, appId: 'wx69de4292a3b6b8b5' },
        success: function success(res) {
            var ret = res.data.ret;
            var data = res.data.data;
            var msg = res.data.msg;
            switch (ret) {
                case 1:
                    typeof successFun == 'function' && successFun(res.data, sourceObj);
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
        fail: function fail(res) {
            //typeof failFun     == 'function' && failFun(res.data, sourceObj)
            tip.showToast("请在网络顺畅的时候重新操作！");
            failFun(res);
        },
        complete: function complete(res) {
            completeFun(res);
        }
    });
}

module.exports = {
    requestPostApi: requestPostApi,
    requestGetApi: requestGetApi
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QuanMiXSwibmFtZXMiOlsidGlwIiwicmVxdWlyZSIsImNhY2hlIiwicmVxdWVzdFBvc3RBcGkiLCJ1cmwiLCJwYXJhbXMiLCJzb3VyY2VPYmoiLCJzdWNjZXNzRnVuIiwiZmFpbEZ1biIsImNvbXBsZXRlRnVuIiwicmVxdWVzdEFwaSIsInJlcXVlc3RHZXRBcGkiLCJtZXRob2QiLCJjb250ZW50VHlwZSIsInRva2VucyIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXRTeW5jIiwidXNlcklkIiwicmVxdWVzdCIsImRhdGEiLCJoZWFkZXIiLCJkZXZUeXBlIiwidG9rZW4iLCJhcHBJZCIsInN1Y2Nlc3MiLCJyZXMiLCJyZXQiLCJtc2ciLCJzaG93VG9hc3QiLCJmYWlsIiwiY29tcGxldGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLE1BQU1DLFFBQVEsVUFBUixDQUFaO0FBQ0EsSUFBTUMsUUFBUUQsUUFBUSxZQUFSLENBQWQ7QUFDQTs7OztBQUlBOzs7Ozs7Ozs7QUFTQSxTQUFTRSxjQUFULENBQXdCQyxHQUF4QixFQUE2QkMsTUFBN0IsRUFBcUNDLFNBQXJDLEVBQWdEQyxVQUFoRCxFQUE0REMsT0FBNUQsRUFBcUVDLFdBQXJFLEVBQWtGO0FBQzlFO0FBQ0FDLGVBQVdOLEdBQVgsRUFBZ0JDLE1BQWhCLEVBQXdCLE1BQXhCLEVBQWdDQyxTQUFoQyxFQUEyQ0MsVUFBM0MsRUFBdURDLE9BQXZELEVBQWdFQyxXQUFoRTtBQUNIOztBQUVEOzs7Ozs7Ozs7QUFTQSxTQUFTRSxhQUFULENBQXVCUCxHQUF2QixFQUE0QkMsTUFBNUIsRUFBb0NDLFNBQXBDLEVBQStDQyxVQUEvQyxFQUEyREMsT0FBM0QsRUFBb0VDLFdBQXBFLEVBQWlGO0FBQzdFQyxlQUFXTixHQUFYLEVBQWdCQyxNQUFoQixFQUF3QixLQUF4QixFQUErQkMsU0FBL0IsRUFBMENDLFVBQTFDLEVBQXNEQyxPQUF0RCxFQUErREMsV0FBL0Q7QUFDSDs7QUFFRDs7Ozs7Ozs7OztBQVVBLFNBQVNDLFVBQVQsQ0FBb0JOLEdBQXBCLEVBQXlCQyxNQUF6QixFQUFpQ08sTUFBakMsRUFBeUNOLFNBQXpDLEVBQW9EQyxVQUFwRCxFQUFnRUMsT0FBaEUsRUFBeUVDLFdBQXpFLEVBQXNGO0FBQ2xGLFFBQUlHLFVBQVUsTUFBZCxFQUFzQjtBQUNsQixZQUFJQyxjQUFjLG1DQUFsQjtBQUNILEtBRkQsTUFFTztBQUNILFlBQUlBLGNBQWMsa0JBQWxCO0FBQ0g7QUFDRCxRQUFJQyxTQUFPQyxHQUFHQyxjQUFILENBQWtCLE9BQWxCLENBQVg7QUFDQSxRQUFHZCxNQUFNZSxPQUFOLENBQWMsTUFBZCxDQUFILEVBQXlCO0FBQ3ZCLFlBQUlDLFNBQVNoQixNQUFNZSxPQUFOLENBQWMsTUFBZCxDQUFiO0FBQ0FaLGVBQU8sUUFBUCxJQUFpQmEsT0FBT0EsTUFBeEI7QUFDRDs7QUFFREgsT0FBR0ksT0FBSCxDQUFXO0FBQ1BmLGFBQVFBLEdBREQ7QUFFUFEsZ0JBQVFBLE1BRkQ7QUFHUFEsY0FBUWYsTUFIRDtBQUlQZ0IsZ0JBQVEsRUFBQyxnQkFBZ0JSLFdBQWpCLEVBQTZCUyxTQUFRLENBQXJDLEVBQXVDQyxPQUFNVCxNQUE3QyxFQUFvRFUsT0FBTSxvQkFBMUQsRUFKRDtBQUtQQyxpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3BCLGdCQUFJQyxNQUFJRCxJQUFJTixJQUFKLENBQVNPLEdBQWpCO0FBQ0EsZ0JBQUlQLE9BQUtNLElBQUlOLElBQUosQ0FBU0EsSUFBbEI7QUFDQSxnQkFBSVEsTUFBSUYsSUFBSU4sSUFBSixDQUFTUSxHQUFqQjtBQUNBLG9CQUFRRCxHQUFSO0FBQ0kscUJBQUssQ0FBTDtBQUNJLDJCQUFPcEIsVUFBUCxJQUFzQixVQUF0QixJQUFvQ0EsV0FBV21CLElBQUlOLElBQWYsRUFBcUJkLFNBQXJCLENBQXBDO0FBQ0E7QUFDSixxQkFBSyxDQUFMO0FBQ0lOLHdCQUFJNkIsU0FBSixDQUFjRCxHQUFkO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNKLHFCQUFLLENBQUw7QUFDSTVCLHdCQUFJNkIsU0FBSixDQUFjRCxHQUFkO0FBQ0o7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNSO0FBQ0k7QUE1QlI7QUErQkgsU0F4Q007QUF5Q1BFLGNBQU0sY0FBVUosR0FBVixFQUFlO0FBQ2pCO0FBQ0ExQixnQkFBSTZCLFNBQUosQ0FBYyxnQkFBZDtBQUNBckIsb0JBQVFrQixHQUFSO0FBQ0gsU0E3Q007QUE4Q1BLLGtCQUFVLGtCQUFVTCxHQUFWLEVBQWU7QUFDckJqQix3QkFBWWlCLEdBQVo7QUFDSDtBQWhETSxLQUFYO0FBa0RIOztBQUVETSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2hCOUIsa0NBRGdCO0FBRVpRO0FBRlksQ0FBakIiLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRpcCA9IHJlcXVpcmUoXCIuLi91dGlscy90aXAuanNcIilcbmNvbnN0IGNhY2hlID0gcmVxdWlyZShcIi4uL3V0aWxzL2NhY2hlLmpzXCIpXG4vKipcbiAqIEBkZXNjICAgIEFQSeivt+axguaOpeWPo+exu+WwgeijhVxuICovXG5cbi8qKlxuICogUE9TVOivt+axgkFQSVxuICogQHBhcmFtICB7U3RyaW5nfSAgIHVybCAgICAgICAgIOaOpeWPo+WcsOWdgFxuICogQHBhcmFtICB7T2JqZWN0fSAgIHBhcmFtcyAgICAgIOivt+axgueahOWPguaVsFxuICogQHBhcmFtICB7T2JqZWN0fSAgIHNvdXJjZU9iaiAgIOadpea6kOWvueixoVxuICogQHBhcmFtICB7RnVuY3Rpb259IHN1Y2Nlc3NGdW4gIOaOpeWPo+iwg+eUqOaIkOWKn+i/lOWbnueahOWbnuiwg+WHveaVsFxuICogQHBhcmFtICB7RnVuY3Rpb259IGZhaWxGdW4gICAgIOaOpeWPo+iwg+eUqOWksei0peeahOWbnuiwg+WHveaVsFxuICogQHBhcmFtICB7RnVuY3Rpb259IGNvbXBsZXRlRnVuIOaOpeWPo+iwg+eUqOe7k+adn+eahOWbnuiwg+WHveaVsCjosIPnlKjmiJDlip/jgIHlpLHotKXpg73kvJrmiafooYwpXG4gKi9cbmZ1bmN0aW9uIHJlcXVlc3RQb3N0QXBpKHVybCwgcGFyYW1zLCBzb3VyY2VPYmosIHN1Y2Nlc3NGdW4sIGZhaWxGdW4sIGNvbXBsZXRlRnVuKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3JlcXVlc3RQb3N0QXBpJyx1cmwsIHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bilcbiAgICByZXF1ZXN0QXBpKHVybCwgcGFyYW1zLCAnUE9TVCcsIHNvdXJjZU9iaiwgc3VjY2Vzc0Z1biwgZmFpbEZ1biwgY29tcGxldGVGdW4pXG59XG5cbi8qKlxuICogR0VU6K+35rGCQVBJXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgdXJsICAgICAgICAg5o6l5Y+j5Zyw5Z2AXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgcGFyYW1zICAgICAg6K+35rGC55qE5Y+C5pWwXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgc291cmNlT2JqICAg5p2l5rqQ5a+56LGhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gc3VjY2Vzc0Z1biAg5o6l5Y+j6LCD55So5oiQ5Yqf6L+U5Zue55qE5Zue6LCD5Ye95pWwXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZmFpbEZ1biAgICAg5o6l5Y+j6LCD55So5aSx6LSl55qE5Zue6LCD5Ye95pWwXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY29tcGxldGVGdW4g5o6l5Y+j6LCD55So57uT5p2f55qE5Zue6LCD5Ye95pWwKOiwg+eUqOaIkOWKn+OAgeWksei0pemDveS8muaJp+ihjClcbiAqL1xuZnVuY3Rpb24gcmVxdWVzdEdldEFwaSh1cmwsIHBhcmFtcywgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bikge1xuICAgIHJlcXVlc3RBcGkodXJsLCBwYXJhbXMsICdHRVQnLCBzb3VyY2VPYmosIHN1Y2Nlc3NGdW4sIGZhaWxGdW4sIGNvbXBsZXRlRnVuKVxufVxuXG4vKipcbiAqIOivt+axgkFQSVxuICogQHBhcmFtICB7U3RyaW5nfSAgIHVybCAgICAgICAgIOaOpeWPo+WcsOWdgFxuICogQHBhcmFtICB7T2JqZWN0fSAgIHBhcmFtcyAgICAgIOivt+axgueahOWPguaVsFxuICogQHBhcmFtICB7U3RyaW5nfSAgIG1ldGhvZCAgICAgIOivt+axguexu+Wei1xuICogQHBhcmFtICB7T2JqZWN0fSAgIHNvdXJjZU9iaiAgIOadpea6kOWvueixoVxuICogQHBhcmFtICB7RnVuY3Rpb259IHN1Y2Nlc3NGdW4gIOaOpeWPo+iwg+eUqOaIkOWKn+i/lOWbnueahOWbnuiwg+WHveaVsFxuICogQHBhcmFtICB7RnVuY3Rpb259IGZhaWxGdW4gICAgIOaOpeWPo+iwg+eUqOWksei0peeahOWbnuiwg+WHveaVsFxuICogQHBhcmFtICB7RnVuY3Rpb259IGNvbXBsZXRlRnVuIOaOpeWPo+iwg+eUqOe7k+adn+eahOWbnuiwg+WHveaVsCjosIPnlKjmiJDlip/jgIHlpLHotKXpg73kvJrmiafooYwpXG4gKi9cbmZ1bmN0aW9uIHJlcXVlc3RBcGkodXJsLCBwYXJhbXMsIG1ldGhvZCwgc291cmNlT2JqLCBzdWNjZXNzRnVuLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bikge1xuICAgIGlmIChtZXRob2QgPT0gJ1BPU1QnKSB7XG4gICAgICAgIHZhciBjb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfVxuICAgIHZhciB0b2tlbnM9d3guZ2V0U3RvcmFnZVN5bmMoXCJ0b2tlblwiKTtcbiAgICBpZihjYWNoZS5nZXRTeW5jKCd1c2VyJykpe1xuICAgICAgdmFyIHVzZXJJZCA9IGNhY2hlLmdldFN5bmMoJ3VzZXInKSAgXG4gICAgICBwYXJhbXNbJ3VzZXJJZCddPXVzZXJJZC51c2VySWRcbiAgICB9XG4gICAgXG4gICAgd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogICAgdXJsLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgZGF0YTogICBwYXJhbXMsXG4gICAgICAgIGhlYWRlcjogeydDb250ZW50LVR5cGUnOiBjb250ZW50VHlwZSxkZXZUeXBlOjEsdG9rZW46dG9rZW5zLGFwcElkOid3eDY5ZGU0MjkyYTNiNmI4YjUnfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgdmFyIHJldD1yZXMuZGF0YS5yZXQ7XG4gICAgICAgICAgICB2YXIgZGF0YT1yZXMuZGF0YS5kYXRhO1xuICAgICAgICAgICAgdmFyIG1zZz1yZXMuZGF0YS5tc2c7XG4gICAgICAgICAgICBzd2l0Y2ggKHJldCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHN1Y2Nlc3NGdW4gID09ICdmdW5jdGlvbicgJiYgc3VjY2Vzc0Z1bihyZXMuZGF0YSwgc291cmNlT2JqKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHRpcC5zaG93VG9hc3QobXNnKTtcbiAgICAgICAgICAgICAgICAvLyB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdXJsOlwiLi4vYWJub3JtYWwvYWJub3JtYWw/YT1cIittc2csXG4gICAgICAgICAgICAgICAgLy8gICAgIC8v5o6l5Y+j6LCD55So5oiQ5Yqf55qE5Zue6LCD5pa55rOVXG4gICAgICAgICAgICAgICAgLy8gICAgIHN1Y2Nlc3M6ZnVuY3Rpb24oKXt9LFxuICAgICAgICAgICAgICAgIC8vICAgICBmYWlsOmZ1bmN0aW9uKCl7fSxcbiAgICAgICAgICAgICAgICAvLyAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXt9XG4gICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICB0aXAuc2hvd1RvYXN0KG1zZyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coOTk5OTk5OTkpXG4gICAgICAgICAgICAgICAgICAgIC8vIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdXJsOlwiLi4vbG9naW4vbG9naW5cIixcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8v5o6l5Y+j6LCD55So5oiQ5Yqf55qE5Zue6LCD5pa55rOVXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBzdWNjZXNzOmZ1bmN0aW9uKCl7fSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGZhaWw6ZnVuY3Rpb24oKXt9LFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyg5OTk5OTk5OSlcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIC8vdHlwZW9mIGZhaWxGdW4gICAgID09ICdmdW5jdGlvbicgJiYgZmFpbEZ1bihyZXMuZGF0YSwgc291cmNlT2JqKVxuICAgICAgICAgICAgdGlwLnNob3dUb2FzdChcIuivt+WcqOe9kee7nOmhuueVheeahOaXtuWAmemHjeaWsOaTjeS9nO+8gVwiKTtcbiAgICAgICAgICAgIGZhaWxGdW4ocmVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbXBsZXRlRnVuKHJlcyk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXG5cdHJlcXVlc3RQb3N0QXBpLFxuICAgIFx0cmVxdWVzdEdldEFwaVxufSJdfQ==