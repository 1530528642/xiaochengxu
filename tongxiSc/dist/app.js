"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tip = require("./utils/tip.js");
var api = require("./utils/api2.js");
var cache = require("./utils/cache.js");
var navigator = require("./utils/navigator.js");
exports.default = App({
  onLaunch: function onLaunch() {
    // console.log('App Launch')
    var that = this;
    //that.checkLoginStatus();
    that.globalData.imgUrl = api.baseImgUrl;
  },
  onShow: function onShow() {
    // console.log('App Show')
  },
  onHide: function onHide() {
    // console.log('App Hide')
  },
  loading: function loading() {
    wx.showLoading({
      title: '数据加载中...'
    });
  },
  hideLing: function hideLing() {
    setTimeout(function () {
      wx.hideLoading();
    }, 100);
  },
  globalData: {
    appgolble: 4654,
    loading: true,
    token: '',
    openId: '',
    user: null,
    loginFlag: false,
    imgUrl: '',
    appId: 'wx69de4292a3b6b8b5',
    mygropuList: [],
    bchage: true,
    newDataObj: {
      state: false,
      steaindex: ''
    }
  },
  // 检查本地 storage 中是否有登录态标识
  checkLoginStatus: function checkLoginStatus() {
    //wx.clearStorage()
    //tip.showModal('警告','检查本地 storage 中是否有登录态标识');
    //tip.showToast('检查本地 storage 中是否有登录态标识');
    var that = this;
    var loginFlag1 = cache.getSync('loginFlag');
    var loginFlag2 = that.globalData.loginFlag;
    console.log(loginFlag1, "loginFlag1");
    console.log(loginFlag2, "loginFlag2");
    if (!loginFlag2 && loginFlag1) {
      //已登录过
      var userStorageInfo = cache.getSync('user');
      if (userStorageInfo) {
        that.globalData.openId = userStorageInfo.xcxOpenId;
        that.globalData.loginFlag = true;
        that.globalData.user = userStorageInfo;
        console.log(that.globalData.user, '已登录');
      }
      // 检查 session_key 是否过期
      // wx.checkSession({
      //     // session_key 有效(为过期)
      //     success: function () {
      //         // 直接从Storage中获取用户信息
      //         let userStorageInfo = cache.getSync('user');
      //         cache.setSync('loginFlag',true);
      //         if (userStorageInfo) {
      //             that.globalData.openId=userStorageInfo.xcxOpenId;
      //             that.globalData.loginFlag=true;
      //             that.globalData.user = userStorageInfo;
      //             console.log(that.globalData.user,'已登录')   
      //         } else {
      //             that.showInfo('缓存信息缺失');
      //             console.error('登录成功后将用户信息存在Storage的userStorageInfo字段中，该字段丢失');
      //         }

      //     },
      //     // session_key 过期
      //     fail: function () {
      //         // session_key过期
      //     }
      // });
    } else if (!loginFlag1) {
      // console.log('未登录')
      that.hideLing();
      tip.showModal('警告', '请登录', function () {
        //console.log(2331)
        navigator.switchTab("../my/my", null);
      });
      // that.dologin();
    }
  },
  // 检查用户信息授权设置
  checkUserInfoPermission: function checkUserInfoPermission() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

    console.log("ok");
    wx.getSetting({
      success: function success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.openSetting({
            success: function success(authSetting) {
              console.log(authSetting);
              callback();
            }
          });
        }
      },
      fail: function fail(error) {
        console.log(error);
      }
    });
  },
  dologin: function dologin() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    var user = arguments[1];

    var that = this;
    console.log('登录....');
    //console.log(callback)
    if (user) {
      //console.log(5466363)
      wx.login({
        success: function success(loginRes) {
          if (loginRes.code) {
            console.log('登录....', loginRes.code);
            wx.request({
              url: api.getUser,
              header: { 'Content-Type': 'application/x-www-form-urlencoded', devType: 1, appId: that.globalData.appId },
              data: {
                code: loginRes.code,
                nickName: user.nickName,
                avatarUrl: user.avatarUrl,
                gender: user.gender,
                city: user.city,
                province: user.province,
                country: user.country,
                language: user.language
              },
              method: "POST",
              success: function success(res) {
                console.log(res, 6666);
                cache.setSync('user', res.data.data);
                cache.setSync('loginFlag', true);
                that.globalData.openId = res.data.data.xcxOpenId;
                that.globalData.loginFlag = true;
                that.globalData.user = res.data.data;
                callback();
              },
              error: function error(err) {
                console.log(err);
              },
              fail: function fail(err) {
                wx.clearStorage();
                tip.showToast('貌似网络不好哦！请在网络顺畅的时候重新操作！');
              }
            });
          } else {
            // 获取 code 失败
            console.log('调用wx.login获取code失败');
          }
        },

        fail: function fail(error) {
          // 调用 wx.login 接口失败
          console.log('接口调用失败', error);
        }
      });
    }
  }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC53eGEiXSwibmFtZXMiOlsidGlwIiwicmVxdWlyZSIsImFwaSIsImNhY2hlIiwibmF2aWdhdG9yIiwib25MYXVuY2giLCJ0aGF0IiwiZ2xvYmFsRGF0YSIsImltZ1VybCIsImJhc2VJbWdVcmwiLCJvblNob3ciLCJvbkhpZGUiLCJsb2FkaW5nIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwiaGlkZUxpbmciLCJzZXRUaW1lb3V0IiwiaGlkZUxvYWRpbmciLCJhcHBnb2xibGUiLCJ0b2tlbiIsIm9wZW5JZCIsInVzZXIiLCJsb2dpbkZsYWciLCJhcHBJZCIsIm15Z3JvcHVMaXN0IiwiYmNoYWdlIiwibmV3RGF0YU9iaiIsInN0YXRlIiwic3RlYWluZGV4IiwiY2hlY2tMb2dpblN0YXR1cyIsImxvZ2luRmxhZzEiLCJnZXRTeW5jIiwibG9naW5GbGFnMiIsImNvbnNvbGUiLCJsb2ciLCJ1c2VyU3RvcmFnZUluZm8iLCJ4Y3hPcGVuSWQiLCJzaG93TW9kYWwiLCJzd2l0Y2hUYWIiLCJjaGVja1VzZXJJbmZvUGVybWlzc2lvbiIsImNhbGxiYWNrIiwiZ2V0U2V0dGluZyIsInN1Y2Nlc3MiLCJyZXMiLCJhdXRoU2V0dGluZyIsIm9wZW5TZXR0aW5nIiwiZmFpbCIsImVycm9yIiwiZG9sb2dpbiIsImxvZ2luIiwibG9naW5SZXMiLCJjb2RlIiwicmVxdWVzdCIsInVybCIsImdldFVzZXIiLCJoZWFkZXIiLCJkZXZUeXBlIiwiZGF0YSIsIm5pY2tOYW1lIiwiYXZhdGFyVXJsIiwiZ2VuZGVyIiwiY2l0eSIsInByb3ZpbmNlIiwiY291bnRyeSIsImxhbmd1YWdlIiwibWV0aG9kIiwic2V0U3luYyIsImVyciIsImNsZWFyU3RvcmFnZSIsInNob3dUb2FzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxNQUFNQyxRQUFRLGdCQUFSLENBQVo7QUFDQSxJQUFNQyxNQUFNRCxRQUFRLGlCQUFSLENBQVo7QUFDQSxJQUFNRSxRQUFRRixRQUFRLGtCQUFSLENBQWQ7QUFDQSxJQUFNRyxZQUFZSCxRQUFRLHNCQUFSLENBQWxCOztBQTBESUksWUFBVSxvQkFBWTtBQUNwQjtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBO0FBQ0FBLFNBQUtDLFVBQUwsQ0FBZ0JDLE1BQWhCLEdBQXVCTixJQUFJTyxVQUEzQjtBQUNELEc7QUFDREMsVUFBUSxrQkFBWTtBQUNsQjtBQUNELEc7QUFDREMsVUFBUSxrQkFBWTtBQUNsQjtBQUNELEc7QUFDREMsV0FBUSxtQkFBVTtBQUNmQyxPQUFHQyxXQUFILENBQWU7QUFDZEMsYUFBTztBQURPLEtBQWY7QUFHRixHO0FBQ0RDLFlBQVMsb0JBQVU7QUFDaEJDLGVBQVcsWUFBTTtBQUNkSixTQUFHSyxXQUFIO0FBQ0QsS0FGRixFQUVJLEdBRko7QUFHRixHO0FBQ0RYLGNBQVk7QUFDVlksZUFBVSxJQURBO0FBRVZQLGFBQVEsSUFGRTtBQUdWUSxXQUFNLEVBSEk7QUFJVkMsWUFBTyxFQUpHO0FBS1ZDLFVBQUssSUFMSztBQU1WQyxlQUFVLEtBTkE7QUFPVmYsWUFBTyxFQVBHO0FBUVZnQixXQUFNLG9CQVJJO0FBU1ZDLGlCQUFZLEVBVEY7QUFVVkMsWUFBTyxJQVZHO0FBV1ZDLGdCQUFXO0FBQ1RDLGFBQU0sS0FERztBQUVUQyxpQkFBVTtBQUZEO0FBWEQsRztBQWdCWDtBQUNEQyxvQkFBa0IsNEJBQVk7QUFDNUI7QUFDQTtBQUNEO0FBQ0MsUUFBSXhCLE9BQU8sSUFBWDtBQUNBLFFBQUl5QixhQUFhNUIsTUFBTTZCLE9BQU4sQ0FBYyxXQUFkLENBQWpCO0FBQ0EsUUFBSUMsYUFBYTNCLEtBQUtDLFVBQUwsQ0FBZ0JnQixTQUFqQztBQUNEVyxZQUFRQyxHQUFSLENBQVlKLFVBQVosRUFBdUIsWUFBdkI7QUFDQUcsWUFBUUMsR0FBUixDQUFZRixVQUFaLEVBQXVCLFlBQXZCO0FBQ0MsUUFBRyxDQUFDQSxVQUFELElBQWFGLFVBQWhCLEVBQTRCO0FBQUM7QUFDMUIsVUFBSUssa0JBQWtCakMsTUFBTTZCLE9BQU4sQ0FBYyxNQUFkLENBQXRCO0FBQ0MsVUFBSUksZUFBSixFQUFxQjtBQUNqQjlCLGFBQUtDLFVBQUwsQ0FBZ0JjLE1BQWhCLEdBQXVCZSxnQkFBZ0JDLFNBQXZDO0FBQ0EvQixhQUFLQyxVQUFMLENBQWdCZ0IsU0FBaEIsR0FBMEIsSUFBMUI7QUFDQWpCLGFBQUtDLFVBQUwsQ0FBZ0JlLElBQWhCLEdBQXVCYyxlQUF2QjtBQUNBRixnQkFBUUMsR0FBUixDQUFZN0IsS0FBS0MsVUFBTCxDQUFnQmUsSUFBNUIsRUFBaUMsS0FBakM7QUFDSDtBQUNIO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNMLEtBL0JELE1BK0JNLElBQUcsQ0FBQ1MsVUFBSixFQUFlO0FBQ3BCO0FBQ0R6QixXQUFLVSxRQUFMO0FBQ0VoQixVQUFJc0MsU0FBSixDQUFjLElBQWQsRUFBbUIsS0FBbkIsRUFBeUIsWUFBVTtBQUNqQztBQUNBbEMsa0JBQVVtQyxTQUFWLENBQW9CLFVBQXBCLEVBQStCLElBQS9CO0FBQ0QsT0FIRDtBQUlEO0FBQ0E7QUFDRixHO0FBQ0Q7QUFDQUMsMkJBQXlCLG1DQUErQjtBQUFBLFFBQXJCQyxRQUFxQix1RUFBVixZQUFNLENBQUUsQ0FBRTs7QUFDdERQLFlBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0V0QixPQUFHNkIsVUFBSCxDQUFjO0FBQ1ZDLGVBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUNwQixZQUFJLENBQUNBLElBQUlDLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUwsRUFBd0M7QUFDcENoQyxhQUFHaUMsV0FBSCxDQUFlO0FBQ1hILHFCQUFTLGlCQUFVRSxXQUFWLEVBQXVCO0FBQzVCWCxzQkFBUUMsR0FBUixDQUFZVSxXQUFaO0FBQ0NKO0FBQ0o7QUFKVSxXQUFmO0FBTUg7QUFDSixPQVZTO0FBV1ZNLFlBQU0sY0FBVUMsS0FBVixFQUFpQjtBQUNuQmQsZ0JBQVFDLEdBQVIsQ0FBWWEsS0FBWjtBQUNIO0FBYlMsS0FBZDtBQWVILEc7QUFDREMsV0FBUSxtQkFBbUM7QUFBQSxRQUExQlIsUUFBMEIsdUVBQWYsWUFBTSxDQUFFLENBQU87QUFBQSxRQUFMbkIsSUFBSzs7QUFDekMsUUFBSWhCLE9BQU8sSUFBWDtBQUNBNEIsWUFBUUMsR0FBUixDQUFZLFFBQVo7QUFDQTtBQUNBLFFBQUliLElBQUosRUFBVTtBQUNSO0FBQ0ZULFNBQUdxQyxLQUFILENBQVM7QUFDQ1AsaUJBQVMsaUJBQVVRLFFBQVYsRUFBb0I7QUFDekIsY0FBSUEsU0FBU0MsSUFBYixFQUFtQjtBQUNqQmxCLG9CQUFRQyxHQUFSLENBQVksUUFBWixFQUFxQmdCLFNBQVNDLElBQTlCO0FBQ0V2QyxlQUFHd0MsT0FBSCxDQUFXO0FBQ1BDLG1CQUFLcEQsSUFBSXFELE9BREY7QUFFUEMsc0JBQVEsRUFBQyxnQkFBZ0IsbUNBQWpCLEVBQXFEQyxTQUFRLENBQTdELEVBQStEakMsT0FBT2xCLEtBQUtDLFVBQUwsQ0FBZ0JpQixLQUF0RixFQUZEO0FBR1BrQyxvQkFBTTtBQUNGTixzQkFBTUQsU0FBU0MsSUFEYjtBQUVGTywwQkFBVXJDLEtBQUtxQyxRQUZiO0FBR0ZDLDJCQUFXdEMsS0FBS3NDLFNBSGQ7QUFJRkMsd0JBQVF2QyxLQUFLdUMsTUFKWDtBQUtGQyxzQkFBTXhDLEtBQUt3QyxJQUxUO0FBTUZDLDBCQUFVekMsS0FBS3lDLFFBTmI7QUFPRkMseUJBQVMxQyxLQUFLMEMsT0FQWjtBQVFGQywwQkFBVTNDLEtBQUsyQztBQVJiLGVBSEM7QUFhUEMsc0JBQVEsTUFiRDtBQWNQdkIsdUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QlYsd0JBQVFDLEdBQVIsQ0FBWVMsR0FBWixFQUFnQixJQUFoQjtBQUNHekMsc0JBQU1nRSxPQUFOLENBQWMsTUFBZCxFQUFxQnZCLElBQUljLElBQUosQ0FBU0EsSUFBOUI7QUFDQXZELHNCQUFNZ0UsT0FBTixDQUFjLFdBQWQsRUFBMEIsSUFBMUI7QUFDQTdELHFCQUFLQyxVQUFMLENBQWdCYyxNQUFoQixHQUF1QnVCLElBQUljLElBQUosQ0FBU0EsSUFBVCxDQUFjckIsU0FBckM7QUFDQS9CLHFCQUFLQyxVQUFMLENBQWdCZ0IsU0FBaEIsR0FBMEIsSUFBMUI7QUFDQWpCLHFCQUFLQyxVQUFMLENBQWdCZSxJQUFoQixHQUF1QnNCLElBQUljLElBQUosQ0FBU0EsSUFBaEM7QUFDQWpCO0FBQ0osZUF0Qk07QUF1QlBPLHFCQUFPLGVBQVVvQixHQUFWLEVBQWU7QUFDbEJsQyx3QkFBUUMsR0FBUixDQUFZaUMsR0FBWjtBQUNILGVBekJNO0FBMEJQckIsb0JBQU0sY0FBVXFCLEdBQVYsRUFBZTtBQUNqQnZELG1CQUFHd0QsWUFBSDtBQUNBckUsb0JBQUlzRSxTQUFKLENBQWMsd0JBQWQ7QUFDSDtBQTdCTSxhQUFYO0FBZ0NILFdBbENELE1Ba0NPO0FBQ0g7QUFDQXBDLG9CQUFRQyxHQUFSLENBQVksb0JBQVo7QUFDSDtBQUNKLFNBeENGOztBQTBDQ1ksY0FBTSxjQUFVQyxLQUFWLEVBQWlCO0FBQ25CO0FBQ0FkLGtCQUFRQyxHQUFSLENBQVksUUFBWixFQUFxQmEsS0FBckI7QUFDSDtBQTdDRixPQUFUO0FBK0NLO0FBQ04iLCJmaWxlIjoiYXBwLnd4YSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRpcCA9IHJlcXVpcmUoXCJ1dGlscy90aXAuanNcIilcbmNvbnN0IGFwaSA9IHJlcXVpcmUoXCJ1dGlscy9hcGkyLmpzXCIpXG5jb25zdCBjYWNoZSA9IHJlcXVpcmUoXCJ1dGlscy9jYWNoZS5qc1wiKVxuY29uc3QgbmF2aWdhdG9yID0gcmVxdWlyZShcInV0aWxzL25hdmlnYXRvci5qc1wiKVxuICBleHBvcnQgZGVmYXVsdCB7XG4gICAgY29uZmlnOiB7XG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgLy8gJ2xheW91dC1oZWFkJzogJ2xheW91dC9oZWFkJyxcbiAgICAgICAgLy8gJ2xheW91dC1mb290JzogJ2xheW91dC9mb290J1xuICAgICAgfSwgXG4gICAgICBwYWdlczogWyBdLFxuICAgICAgd2luZG93OiB7XG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2VmZWZlZicsXG4gICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjRTk0QTY5JyxcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWKoeerrycsXG4gICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICcjZmZmJyxcbiAgICAgICAgXCJlbmFibGVQdWxsRG93blJlZnJlc2hcIjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHRhYkJhcjoge1xuICAgICAgICBjb2xvcjogJyM2ODY4NjgnLFxuICAgICAgICBzZWxlY3RlZENvbG9yOiAnI2VjNDQ2OCcsXG4gICAgICAgIGJvcmRlclN0eWxlOiAnYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgbGlzdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvbmFtZUNhci9uYW1lQ2FyJyxcbiAgICAgICAgICAgIGljb25QYXRoOiAnY29tbW9uL2Fzc2V0cy90YWIvY2FyZF9kZWZhdWx0LnBuZycsXG4gICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnY29tbW9uL2Fzc2V0cy90YWIvY2FyZF9mb2N1cy5wbmcnLFxuICAgICAgICAgICAgdGV4dDogJ+acjeWKoSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvc2hvcGluZy9zaG9waW5nJyxcbiAgICAgICAgICAgIGljb25QYXRoOiAnY29tbW9uL2Fzc2V0cy90YWIvaWNvbl9tYWxsX2RlZmF1bHQucG5nJyxcbiAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdjb21tb24vYXNzZXRzL3RhYi9pY29uX21hbGxfZm9jdXMucG5nJyxcbiAgICAgICAgICAgIHRleHQ6ICfllYbln44nXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2hvbWUvaW5kZXgnLFxuICAgICAgICAgICAgaWNvblBhdGg6ICdjb21tb24vYXNzZXRzL3RhYi9pY29uX2R5bWFtaWNfZGVmYXVsdC5wbmcnLFxuICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2NvbW1vbi9hc3NldHMvdGFiL2ljb25fZHltYW1pY19mb2N1cy5wbmcnLFxuICAgICAgICAgICAgdGV4dDogJ+WKqOaAgSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvcHJvZHVjdC9wcm9kdWN0JyxcbiAgICAgICAgICAgIGljb25QYXRoOiAnY29tbW9uL2Fzc2V0cy90YWIvaWNvbl9wcm9kdWN0X2RlZmF1bHQucG5nJyxcbiAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdjb21tb24vYXNzZXRzL3RhYi9pY29uX3Byb2R1Y3RfZm9jdXMucG5nJyxcbiAgICAgICAgICAgIHRleHQ6ICfkuqflk4EnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL215L215JyxcbiAgICAgICAgICAgIGljb25QYXRoOiAnY29tbW9uL2Fzc2V0cy90YWIvaWNvbl9teV9kZWZhdWx0LnBuZycsXG4gICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnY29tbW9uL2Fzc2V0cy90YWIvaWNvbl9teV9mb2N1cy5wbmcnLFxuICAgICAgICAgICAgdGV4dDogJ+aIkeeahCdcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBuZXR3b3JrVGltZW91dDoge1xuICAgICAgICByZXF1ZXN0OiAxMDAwMFxuICAgICAgfVxuICAgIH0sXG4gICAgb25MYXVuY2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdBcHAgTGF1bmNoJylcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIC8vdGhhdC5jaGVja0xvZ2luU3RhdHVzKCk7XG4gICAgICB0aGF0Lmdsb2JhbERhdGEuaW1nVXJsPWFwaS5iYXNlSW1nVXJsO1xuICAgIH0sXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnQXBwIFNob3cnKVxuICAgIH0sXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnQXBwIEhpZGUnKVxuICAgIH0sXG4gICAgbG9hZGluZzpmdW5jdGlvbigpe1xuICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfmlbDmja7liqDovb3kuK0uLi4nLFxuICAgICAgfSlcbiAgICB9LFxuICAgIGhpZGVMaW5nOmZ1bmN0aW9uKCl7XG4gICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9LFxuICAgIGdsb2JhbERhdGE6IHtcbiAgICAgIGFwcGdvbGJsZTo0NjU0LFxuICAgICAgbG9hZGluZzp0cnVlLFxuICAgICAgdG9rZW46JycsXG4gICAgICBvcGVuSWQ6JycsXG4gICAgICB1c2VyOm51bGwsXG4gICAgICBsb2dpbkZsYWc6ZmFsc2UsXG4gICAgICBpbWdVcmw6JycsXG4gICAgICBhcHBJZDond3g2OWRlNDI5MmEzYjZiOGI1JyxcbiAgICAgIG15Z3JvcHVMaXN0OltdLFxuICAgICAgYmNoYWdlOnRydWUsXG4gICAgICBuZXdEYXRhT2JqOntcbiAgICAgICAgc3RhdGU6ZmFsc2UsXG4gICAgICAgIHN0ZWFpbmRleDonJ1xuICAgICAgfVxuICAgICB9LFxuICAgICAvLyDmo4Dmn6XmnKzlnLAgc3RvcmFnZSDkuK3mmK/lkKbmnInnmbvlvZXmgIHmoIfor4ZcbiAgICBjaGVja0xvZ2luU3RhdHVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAvL3d4LmNsZWFyU3RvcmFnZSgpXG4gICAgICAvL3RpcC5zaG93TW9kYWwoJ+itpuWRiicsJ+ajgOafpeacrOWcsCBzdG9yYWdlIOS4reaYr+WQpuacieeZu+W9leaAgeagh+ivhicpO1xuICAgICAvL3RpcC5zaG93VG9hc3QoJ+ajgOafpeacrOWcsCBzdG9yYWdlIOS4reaYr+WQpuacieeZu+W9leaAgeagh+ivhicpO1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgbGV0IGxvZ2luRmxhZzEgPSBjYWNoZS5nZXRTeW5jKCdsb2dpbkZsYWcnKTtcbiAgICAgIGxldCBsb2dpbkZsYWcyID0gdGhhdC5nbG9iYWxEYXRhLmxvZ2luRmxhZztcbiAgICAgY29uc29sZS5sb2cobG9naW5GbGFnMSxcImxvZ2luRmxhZzFcIilcbiAgICAgY29uc29sZS5sb2cobG9naW5GbGFnMixcImxvZ2luRmxhZzJcIilcbiAgICAgIGlmKCFsb2dpbkZsYWcyJiZsb2dpbkZsYWcxKSB7Ly/lt7LnmbvlvZXov4dcbiAgICAgICAgIGxldCB1c2VyU3RvcmFnZUluZm8gPSBjYWNoZS5nZXRTeW5jKCd1c2VyJyk7XG4gICAgICAgICAgaWYgKHVzZXJTdG9yYWdlSW5mbykge1xuICAgICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEub3BlbklkPXVzZXJTdG9yYWdlSW5mby54Y3hPcGVuSWQ7XG4gICAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS5sb2dpbkZsYWc9dHJ1ZTtcbiAgICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXIgPSB1c2VyU3RvcmFnZUluZm87XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQuZ2xvYmFsRGF0YS51c2VyLCflt7LnmbvlvZUnKSAgIFxuICAgICAgICAgIH1cbiAgICAgICAgLy8g5qOA5p+lIHNlc3Npb25fa2V5IOaYr+WQpui/h+acn1xuICAgICAgICAgICAgLy8gd3guY2hlY2tTZXNzaW9uKHtcbiAgICAgICAgICAgIC8vICAgICAvLyBzZXNzaW9uX2tleSDmnInmlYgo5Li66L+H5pyfKVxuICAgICAgICAgICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgLy8g55u05o6l5LuOU3RvcmFnZeS4reiOt+WPlueUqOaIt+S/oeaBr1xuICAgICAgICAgICAgLy8gICAgICAgICBsZXQgdXNlclN0b3JhZ2VJbmZvID0gY2FjaGUuZ2V0U3luYygndXNlcicpO1xuICAgICAgICAgICAgLy8gICAgICAgICBjYWNoZS5zZXRTeW5jKCdsb2dpbkZsYWcnLHRydWUpO1xuICAgICAgICAgICAgLy8gICAgICAgICBpZiAodXNlclN0b3JhZ2VJbmZvKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEub3BlbklkPXVzZXJTdG9yYWdlSW5mby54Y3hPcGVuSWQ7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEubG9naW5GbGFnPXRydWU7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlciA9IHVzZXJTdG9yYWdlSW5mbztcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQuZ2xvYmFsRGF0YS51c2VyLCflt7LnmbvlvZUnKSAgIFxuICAgICAgICAgICAgLy8gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhhdC5zaG93SW5mbygn57yT5a2Y5L+h5oGv57y65aSxJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfnmbvlvZXmiJDlip/lkI7lsIbnlKjmiLfkv6Hmga/lrZjlnKhTdG9yYWdl55qEdXNlclN0b3JhZ2VJbmZv5a2X5q615Lit77yM6K+l5a2X5q615Lii5aSxJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAvLyAgICAgLy8gc2Vzc2lvbl9rZXkg6L+H5pyfXG4gICAgICAgICAgICAvLyAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gICAgICAgICAvLyBzZXNzaW9uX2tleei/h+acn1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgfWVsc2UgaWYoIWxvZ2luRmxhZzEpe1xuICAgICAgIC8vIGNvbnNvbGUubG9nKCfmnKrnmbvlvZUnKVxuICAgICAgdGhhdC5oaWRlTGluZygpO1xuICAgICAgICB0aXAuc2hvd01vZGFsKCforablkYonLCfor7fnmbvlvZUnLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZygyMzMxKVxuICAgICAgICAgIG5hdmlnYXRvci5zd2l0Y2hUYWIoXCIuLi9teS9teVwiLG51bGwpXG4gICAgICAgIH0pO1xuICAgICAgIC8vIHRoYXQuZG9sb2dpbigpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5qOA5p+l55So5oi35L+h5oGv5o6I5p2D6K6+572uXG4gICAgY2hlY2tVc2VySW5mb1Blcm1pc3Npb246IGZ1bmN0aW9uIChjYWxsYmFjayA9ICgpID0+IHt9KSB7XG4gICAgICBjb25zb2xlLmxvZyhcIm9rXCIpXG4gICAgICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIGlmICghcmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm9wZW5TZXR0aW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChhdXRoU2V0dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGF1dGhTZXR0aW5nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBkb2xvZ2luOmZ1bmN0aW9uKGNhbGxiYWNrID0gKCkgPT4ge30sIHVzZXIpe1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgY29uc29sZS5sb2coJ+eZu+W9lS4uLi4nKVxuICAgICAgLy9jb25zb2xlLmxvZyhjYWxsYmFjaylcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coNTQ2NjM2MylcbiAgICAgIHd4LmxvZ2luKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAobG9naW5SZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvZ2luUmVzLmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55m75b2VLi4uLicsbG9naW5SZXMuY29kZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYXBpLmdldFVzZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLGRldlR5cGU6MSxhcHBJZDogdGhhdC5nbG9iYWxEYXRhLmFwcElkfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IGxvZ2luUmVzLmNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5pY2tOYW1lOiB1c2VyLm5pY2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6IHVzZXIuYXZhdGFyVXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5kZXI6IHVzZXIuZ2VuZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5OiB1c2VyLmNpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpbmNlOiB1c2VyLnByb3ZpbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiB1c2VyLmNvdW50cnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlOiB1c2VyLmxhbmd1YWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyw2NjY2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGUuc2V0U3luYygndXNlcicscmVzLmRhdGEuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZS5zZXRTeW5jKCdsb2dpbkZsYWcnLHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLm9wZW5JZD1yZXMuZGF0YS5kYXRhLnhjeE9wZW5JZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS5sb2dpbkZsYWc9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VyID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LmNsZWFyU3RvcmFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXAuc2hvd1RvYXN0KCfosozkvLznvZHnu5zkuI3lpb3lk6bvvIHor7flnKjnvZHnu5zpobrnlYXnmoTml7blgJnph43mlrDmk43kvZzvvIEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+WIGNvZGUg5aSx6LSlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6LCD55Sod3gubG9naW7ojrflj5Zjb2Rl5aSx6LSlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOiwg+eUqCB3eC5sb2dpbiDmjqXlj6PlpLHotKVcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aOpeWPo+iwg+eUqOWksei0pScsZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICB9XG5cbiAgfSJdfQ==