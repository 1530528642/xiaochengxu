"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// var apis =  require("../../utils/api.js")
// var converts =  require("../../utils/convert.js")
var navigator = require("../../utils/navigator.js");
var cache = require("../../utils/cache.js");
var app = getApp();
exports.default = Page({
  data: {
    loginFlag: '',
    datay: ""
  },
  onLoad: function onLoad() {
    var loginFlag = cache.getSync('loginFlag');
    // console.log(loginFlag,"loginFlag")
    var user = cache.getSync('user');
    // console.log(user,"user")
    app.loading();
    // this.setData({loginFlag:app.globalData.loginFlag})
    if (loginFlag == true) {
      console.log(loginFlag);
      this.setData({ loginFlag: loginFlag, datay: user });
    }
    app.hideLing();
  },
  bindGetUserInfo: function bindGetUserInfo(e) {
    var successy = this.successy;
    wx.showLoading({
      title: '登陆中...'
    });
    app.dologin(successy, e.detail.userInfo);
  },
  successy: function successy() {
    var user = app.globalData.user;
    // console.log(user)
    if (user != null) {
      // console.log(33666)
      setTimeout(function () {
        wx.hideLoading();
      }, 100);
      this.setData({ loginFlag: app.globalData.loginFlag, datay: app.globalData.user });
    } else {
      console.log("登录失败");
    }
  },
  minbox: function minbox() {
    var param = { userId: this.data.datay.userId };
    navigator.navigateTo('../address/address', param);
  },
  minboxinfo: function minboxinfo() {
    navigator.navigateTo('../collect/collect');
  },
  minboxdb: function minboxdb() {
    navigator.navigateTo('../order/order');
  },
  minbofoot: function minbofoot() {
    navigator.navigateTo('../footprint/footprint');
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15Lnd4cCJdLCJuYW1lcyI6WyJuYXZpZ2F0b3IiLCJyZXF1aXJlIiwiY2FjaGUiLCJhcHAiLCJnZXRBcHAiLCJkYXRhIiwibG9naW5GbGFnIiwiZGF0YXkiLCJvbkxvYWQiLCJnZXRTeW5jIiwidXNlciIsImxvYWRpbmciLCJjb25zb2xlIiwibG9nIiwic2V0RGF0YSIsImhpZGVMaW5nIiwiYmluZEdldFVzZXJJbmZvIiwiZSIsInN1Y2Nlc3N5Iiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwiZG9sb2dpbiIsImRldGFpbCIsInVzZXJJbmZvIiwiZ2xvYmFsRGF0YSIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsIm1pbmJveCIsInBhcmFtIiwidXNlcklkIiwibmF2aWdhdGVUbyIsIm1pbmJveGluZm8iLCJtaW5ib3hkYiIsIm1pbmJvZm9vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0EsSUFBSUEsWUFBYUMsUUFBUSwwQkFBUixDQUFqQjtBQUNBLElBQUlDLFFBQVNELFFBQVEsc0JBQVIsQ0FBYjtBQUNBLElBQUlFLE1BQU1DLFFBQVY7O0FBVUVDLFFBQUs7QUFDSEMsZUFBVSxFQURQO0FBRUhDLFdBQU07QUFGSCxHO0FBSUxDLFVBQU8sa0JBQVU7QUFDZixRQUFJRixZQUFZSixNQUFNTyxPQUFOLENBQWMsV0FBZCxDQUFoQjtBQUNBO0FBQ0EsUUFBSUMsT0FBT1IsTUFBTU8sT0FBTixDQUFjLE1BQWQsQ0FBWDtBQUNBO0FBQ0FOLFFBQUlRLE9BQUo7QUFDQTtBQUNBLFFBQUdMLGFBQWEsSUFBaEIsRUFBcUI7QUFDbkJNLGNBQVFDLEdBQVIsQ0FBWVAsU0FBWjtBQUNBLFdBQUtRLE9BQUwsQ0FBYSxFQUFDUixXQUFVQSxTQUFYLEVBQXFCQyxPQUFNRyxJQUEzQixFQUFiO0FBQ0Q7QUFDRFAsUUFBSVksUUFBSjtBQUNELEc7QUFDREMsbUJBQWdCLHlCQUFTQyxDQUFULEVBQVc7QUFDekIsUUFBSUMsV0FBVyxLQUFLQSxRQUFwQjtBQUNBQyxPQUFHQyxXQUFILENBQWU7QUFDWEMsYUFBTztBQURJLEtBQWY7QUFHQWxCLFFBQUltQixPQUFKLENBQVlKLFFBQVosRUFBcUJELEVBQUVNLE1BQUYsQ0FBU0MsUUFBOUI7QUFDRCxHO0FBQ0ROLFlBQVMsb0JBQVU7QUFDakIsUUFBSVIsT0FBT1AsSUFBSXNCLFVBQUosQ0FBZWYsSUFBMUI7QUFDQTtBQUNBLFFBQUdBLFFBQVEsSUFBWCxFQUFnQjtBQUNkO0FBQ0FnQixpQkFBVyxZQUFNO0FBQ2JQLFdBQUdRLFdBQUg7QUFDRCxPQUZILEVBRUssR0FGTDtBQUdFLFdBQUtiLE9BQUwsQ0FBYSxFQUFDUixXQUFVSCxJQUFJc0IsVUFBSixDQUFlbkIsU0FBMUIsRUFBb0NDLE9BQU1KLElBQUlzQixVQUFKLENBQWVmLElBQXpELEVBQWI7QUFDSCxLQU5ELE1BTUs7QUFDSEUsY0FBUUMsR0FBUixDQUFZLE1BQVo7QUFDRDtBQUNGLEc7QUFDRGUsVUFBTyxrQkFBVTtBQUNmLFFBQUlDLFFBQU0sRUFBQ0MsUUFBTyxLQUFLekIsSUFBTCxDQUFVRSxLQUFWLENBQWdCdUIsTUFBeEIsRUFBVjtBQUNBOUIsY0FBVStCLFVBQVYsQ0FBcUIsb0JBQXJCLEVBQTBDRixLQUExQztBQUNELEc7QUFDREcsY0FBVyxzQkFBVTtBQUNsQmhDLGNBQVUrQixVQUFWLENBQXFCLG9CQUFyQjtBQUNGLEc7QUFDREUsWUFBUyxvQkFBVTtBQUNqQmpDLGNBQVUrQixVQUFWLENBQXFCLGdCQUFyQjtBQUNELEc7QUFDREcsYUFBVSxxQkFBVTtBQUNsQmxDLGNBQVUrQixVQUFWLENBQXFCLHdCQUFyQjtBQUNEIiwiZmlsZSI6Im15Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbIi8vIHZhciBhcGlzID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy9hcGkuanNcIilcbi8vIHZhciBjb252ZXJ0cyA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvY29udmVydC5qc1wiKVxudmFyIG5hdmlnYXRvciA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvbmF2aWdhdG9yLmpzXCIpXG52YXIgY2FjaGUgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL2NhY2hlLmpzXCIpXG52YXIgYXBwID0gZ2V0QXBwKCk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoQnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1saXN0JzogJ0BtaW51aS93eGMtbGlzdCcsXG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJyxcbiAgICAgICd3eGMtYXZhdGFyJzogJ0BtaW51aS93eGMtYXZhdGFyJ1xuICAgIH1cbiAgfSxcbiAgZGF0YTp7XG4gICAgbG9naW5GbGFnOicnLFxuICAgIGRhdGF5OlwiXCJcbiAgfSxcbiAgb25Mb2FkOmZ1bmN0aW9uKCl7XG4gICAgdmFyIGxvZ2luRmxhZyA9IGNhY2hlLmdldFN5bmMoJ2xvZ2luRmxhZycpO1xuICAgIC8vIGNvbnNvbGUubG9nKGxvZ2luRmxhZyxcImxvZ2luRmxhZ1wiKVxuICAgIHZhciB1c2VyID0gY2FjaGUuZ2V0U3luYygndXNlcicpO1xuICAgIC8vIGNvbnNvbGUubG9nKHVzZXIsXCJ1c2VyXCIpXG4gICAgYXBwLmxvYWRpbmcoKVxuICAgIC8vIHRoaXMuc2V0RGF0YSh7bG9naW5GbGFnOmFwcC5nbG9iYWxEYXRhLmxvZ2luRmxhZ30pXG4gICAgaWYobG9naW5GbGFnID09IHRydWUpe1xuICAgICAgY29uc29sZS5sb2cobG9naW5GbGFnKVxuICAgICAgdGhpcy5zZXREYXRhKHtsb2dpbkZsYWc6bG9naW5GbGFnLGRhdGF5OnVzZXJ9KVxuICAgIH1cbiAgICBhcHAuaGlkZUxpbmcoKVxuICB9LFxuICBiaW5kR2V0VXNlckluZm86ZnVuY3Rpb24oZSl7XG4gICAgdmFyIHN1Y2Nlc3N5ID0gdGhpcy5zdWNjZXNzeVxuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfnmbvpmYbkuK0uLi4nLFxuICAgICAgfSlcbiAgICBhcHAuZG9sb2dpbihzdWNjZXNzeSxlLmRldGFpbC51c2VySW5mbylcbiAgfSxcbiAgc3VjY2Vzc3k6ZnVuY3Rpb24oKXtcbiAgICB2YXIgdXNlciA9IGFwcC5nbG9iYWxEYXRhLnVzZXIgXG4gICAgLy8gY29uc29sZS5sb2codXNlcilcbiAgICBpZih1c2VyICE9IG51bGwpe1xuICAgICAgLy8gY29uc29sZS5sb2coMzM2NjYpXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICB9LCAxMDApO1xuICAgICAgICB0aGlzLnNldERhdGEoe2xvZ2luRmxhZzphcHAuZ2xvYmFsRGF0YS5sb2dpbkZsYWcsZGF0YXk6YXBwLmdsb2JhbERhdGEudXNlcn0pXG4gICAgfWVsc2V7XG4gICAgICBjb25zb2xlLmxvZyhcIueZu+W9leWksei0pVwiKVxuICAgIH1cbiAgfSxcbiAgbWluYm94OmZ1bmN0aW9uKCl7XG4gICAgdmFyIHBhcmFtPXt1c2VySWQ6dGhpcy5kYXRhLmRhdGF5LnVzZXJJZH07XG4gICAgbmF2aWdhdG9yLm5hdmlnYXRlVG8oJy4uL2FkZHJlc3MvYWRkcmVzcycscGFyYW0pO1xuICB9LFxuICBtaW5ib3hpbmZvOmZ1bmN0aW9uKCl7XG4gICAgIG5hdmlnYXRvci5uYXZpZ2F0ZVRvKCcuLi9jb2xsZWN0L2NvbGxlY3QnKTtcbiAgfSxcbiAgbWluYm94ZGI6ZnVuY3Rpb24oKXtcbiAgICBuYXZpZ2F0b3IubmF2aWdhdGVUbygnLi4vb3JkZXIvb3JkZXInKTtcbiAgfSxcbiAgbWluYm9mb290OmZ1bmN0aW9uKCl7XG4gICAgbmF2aWdhdG9yLm5hdmlnYXRlVG8oJy4uL2Zvb3RwcmludC9mb290cHJpbnQnKTtcbiAgfVxufSJdfQ==