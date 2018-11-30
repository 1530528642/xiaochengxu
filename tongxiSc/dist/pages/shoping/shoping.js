"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var daaty = require("../../utils/api2.js");
var cath = require("../../utils/cache.js");
//获取应用实例
var app = getApp();
exports.default = Page({
  data: {
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    floorGoods: [],
    banner: [],
    channel: []
  },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '同洗小程序商场',
      desc: '开源微信小程序商城',
      path: '/pages/index/index'
    };
  },

  onPullDownRefresh: function onPullDownRefresh() {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.getIndexData();
    wx.hideNavigationBarLoading(); //完成停止加载
    wx.stopPullDownRefresh(); //停止下拉刷新
  },


  getIndexData: function getIndexData() {
    var that = this;
    daaty.indexsh(null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        newGoods: res.data.newGoodsList,
        hotGoods: res.data.hotGoodsList,
        topics: res.data.topicList,
        brands: res.data.brandList,
        floorGoods: res.data.floorGoodsList,
        banner: res.data.banner,
        channel: res.data.channel
      });
    }
  },
  onLoad: function onLoad(options) {
    //  app.checkLoginStatus();
    // // 页面初始化 options为页面跳转所带来的参数
    // formUserId = app.globalData.user.userId
    // this.setData({userId:formUserId})
    if (options.scene) {
      //这个scene的值存在则证明首页的开启来源于朋友圈分享的图,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      var scene = decodeURIComponent(options.scene);
      //  console.log("scene:" + scene);
      wx.navigateTo({
        url: '../goods/goods?id=' + scene
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.goodId) {
      //这个goodId的值存在则证明首页的开启来源于分享,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../goods/goods?id=' + options.goodId
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.orderId) {
      //这个orderId的值存在则证明首页的开启来源于订单模版通知,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../ucenter/orderDetail/orderDetail?id=' + options.orderId
      });
    }

    this.getIndexData();
  },
  shoping_img: function shoping_img() {
    wx.navigateTo({
      url: '/pages/cart/cart'
    });
  },
  //  topics:function(e){
  //    console.log(7777888)
  //     wx.navigateTo({
  //     url: "../seminar/seminar?id="+e.currentTarget.dataset.id
  //    });
  //  },
  onReady: function onReady() {
    // 页面渲染完成
  },
  onShow: function onShow() {
    // 页面显示
    var that = this;
    daaty.CartGoodsCount(null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        carnum: res.data
      });
    }
  },
  onHide: function onHide() {
    // 页面隐藏
  },
  onUnload: function onUnload() {
    // 页面关闭
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3Bpbmcud3hwIl0sIm5hbWVzIjpbImRhYXR5IiwicmVxdWlyZSIsImNhdGgiLCJhcHAiLCJnZXRBcHAiLCJkYXRhIiwibmV3R29vZHMiLCJob3RHb29kcyIsInRvcGljcyIsImJyYW5kcyIsImZsb29yR29vZHMiLCJiYW5uZXIiLCJjaGFubmVsIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsImRlc2MiLCJwYXRoIiwib25QdWxsRG93blJlZnJlc2giLCJ3eCIsInNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyIsImdldEluZGV4RGF0YSIsImhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInN0b3BQdWxsRG93blJlZnJlc2giLCJ0aGF0IiwiaW5kZXhzaCIsInN1Y2Nlc3NGYXkiLCJyZXMiLCJzb3VyY2VPYmoiLCJzZXREYXRhIiwibmV3R29vZHNMaXN0IiwiaG90R29vZHNMaXN0IiwidG9waWNMaXN0IiwiYnJhbmRMaXN0IiwiZmxvb3JHb29kc0xpc3QiLCJvbkxvYWQiLCJvcHRpb25zIiwic2NlbmUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29vZElkIiwib3JkZXJJZCIsInNob3BpbmdfaW1nIiwib25SZWFkeSIsIm9uU2hvdyIsIkNhcnRHb29kc0NvdW50IiwiY2FybnVtIiwib25IaWRlIiwib25VbmxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBTUEsUUFBU0MsUUFBUSxxQkFBUixDQUFmO0FBQ0EsSUFBTUMsT0FBUUQsUUFBUSxzQkFBUixDQUFkO0FBQ0E7QUFDQSxJQUFNRSxNQUFNQyxRQUFaOztBQU1FQyxRQUFNO0FBQ05DLGNBQVUsRUFESjtBQUVOQyxjQUFVLEVBRko7QUFHTkMsWUFBUSxFQUhGO0FBSU5DLFlBQVEsRUFKRjtBQUtOQyxnQkFBWSxFQUxOO0FBTU5DLFlBQVEsRUFORjtBQU9OQyxhQUFTO0FBUEgsRzs7QUFVUEMscUJBQW1CLDZCQUFXO0FBQzdCLFdBQU87QUFDTkMsYUFBTyxTQUREO0FBRU5DLFlBQU0sV0FGQTtBQUdOQyxZQUFNO0FBSEEsS0FBUDtBQUtBLEc7O0FBRURDLG1CLCtCQUFvQjtBQUNuQkMsT0FBR0Msd0JBQUgsR0FEbUIsQ0FDVztBQUM5QixTQUFLQyxZQUFMO0FBQ0FGLE9BQUdHLHdCQUFILEdBSG1CLENBR1c7QUFDOUJILE9BQUdJLG1CQUFILEdBSm1CLENBSU07QUFDekIsRzs7O0FBRURGLGdCQUFjLHdCQUFXO0FBQ3hCLFFBQUlHLE9BQU8sSUFBWDtBQUNBdkIsVUFBTXdCLE9BQU4sQ0FBYyxJQUFkLEVBQW1CQyxVQUFuQjtBQUNBLGFBQVNBLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCQyxTQUF6QixFQUFtQztBQUNqQ0osV0FBS0ssT0FBTCxDQUFhO0FBQ1p0QixrQkFBVW9CLElBQUlyQixJQUFKLENBQVN3QixZQURQO0FBRVp0QixrQkFBVW1CLElBQUlyQixJQUFKLENBQVN5QixZQUZQO0FBR1p0QixnQkFBUWtCLElBQUlyQixJQUFKLENBQVMwQixTQUhMO0FBSVp0QixnQkFBUWlCLElBQUlyQixJQUFKLENBQVMyQixTQUpMO0FBS1p0QixvQkFBWWdCLElBQUlyQixJQUFKLENBQVM0QixjQUxUO0FBTVp0QixnQkFBUWUsSUFBSXJCLElBQUosQ0FBU00sTUFOTDtBQU9aQyxpQkFBU2MsSUFBSXJCLElBQUosQ0FBU087QUFQTixPQUFiO0FBU0M7QUFDSCxHO0FBQ0RzQixVQUFRLGdCQUFTQyxPQUFULEVBQWtCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBSUEsUUFBUUMsS0FBWixFQUFtQjtBQUNsQjtBQUNBLFVBQUlBLFFBQVFDLG1CQUFtQkYsUUFBUUMsS0FBM0IsQ0FBWjtBQUNEO0FBQ0NsQixTQUFHb0IsVUFBSCxDQUFjO0FBQ2JDLGFBQUssdUJBQXVCSDtBQURmLE9BQWQ7QUFHQTs7QUFFRDtBQUNBLFFBQUlELFFBQVFLLE1BQVosRUFBb0I7QUFDbkI7QUFDQXRCLFNBQUdvQixVQUFILENBQWM7QUFDYkMsYUFBSyx1QkFBdUJKLFFBQVFLO0FBRHZCLE9BQWQ7QUFHQTs7QUFFRDtBQUNBLFFBQUlMLFFBQVFNLE9BQVosRUFBcUI7QUFDcEI7QUFDQXZCLFNBQUdvQixVQUFILENBQWM7QUFDYkMsYUFBSywyQ0FBMkNKLFFBQVFNO0FBRDNDLE9BQWQ7QUFHQTs7QUFFRCxTQUFLckIsWUFBTDtBQUNBLEc7QUFDRHNCLGVBQVksdUJBQVU7QUFDbkJ4QixPQUFHb0IsVUFBSCxDQUFjO0FBQ2RDLFdBQUs7QUFEUyxLQUFkO0FBR0YsRztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNDSSxXQUFTLG1CQUFXO0FBQ25CO0FBQ0EsRztBQUNEQyxVQUFRLGtCQUFXO0FBQ2xCO0FBQ0YsUUFBSXJCLE9BQU8sSUFBWDtBQUNFdkIsVUFBTTZDLGNBQU4sQ0FBcUIsSUFBckIsRUFBMEJwQixVQUExQjtBQUNBLGFBQVNBLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCQyxTQUF6QixFQUFtQztBQUN2QkosV0FBS0ssT0FBTCxDQUFhO0FBQ2JrQixnQkFBUXBCLElBQUlyQjtBQURDLE9BQWI7QUFHWDtBQUNELEc7QUFDRDBDLFVBQVEsa0JBQVc7QUFDbEI7QUFDQSxHO0FBQ0RDLFlBQVUsb0JBQVc7QUFDcEI7QUFDQSIsImZpbGUiOiJzaG9waW5nLnd4cCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRhYXR5ID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy9hcGkyLmpzXCIpXG5jb25zdCBjYXRoID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy9jYWNoZS5qc1wiKVxuLy/ojrflj5blupTnlKjlrp7kvotcbmNvbnN0IGFwcCA9IGdldEFwcCgpXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYbln44nLFxuICAgIHVzaW5nQ29tcG9uZW50czoge31cbiAgfSxcbiAgZGF0YToge1xuICBuZXdHb29kczogW10sXG4gIGhvdEdvb2RzOiBbXSxcbiAgdG9waWNzOiBbXSxcbiAgYnJhbmRzOiBbXSxcbiAgZmxvb3JHb29kczogW10sXG4gIGJhbm5lcjogW10sXG4gIGNoYW5uZWw6IFtdXG4gfSxcblxuIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgIHRpdGxlOiAn5ZCM5rSX5bCP56iL5bqP5ZWG5Zy6JyxcbiAgIGRlc2M6ICflvIDmupDlvq7kv6HlsI/nqIvluo/llYbln44nLFxuICAgcGF0aDogJy9wYWdlcy9pbmRleC9pbmRleCdcbiAgfVxuIH0sXG5cbiBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgd3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKCkgLy/lnKjmoIfpopjmoI/kuK3mmL7npLrliqDovb1cbiAgdGhpcy5nZXRJbmRleERhdGEoKTtcbiAgd3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKCkgLy/lrozmiJDlgZzmraLliqDovb1cbiAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpIC8v5YGc5q2i5LiL5ouJ5Yi35pawXG4gfSwgXG5cbiBnZXRJbmRleERhdGE6IGZ1bmN0aW9uKCkge1xuICBsZXQgdGhhdCA9IHRoaXM7XG4gIGRhYXR5LmluZGV4c2gobnVsbCxzdWNjZXNzRmF5KVxuICBmdW5jdGlvbiBzdWNjZXNzRmF5KHJlcywgc291cmNlT2JqKXtcbiAgICB0aGF0LnNldERhdGEoe1xuICAgICBuZXdHb29kczogcmVzLmRhdGEubmV3R29vZHNMaXN0LFxuICAgICBob3RHb29kczogcmVzLmRhdGEuaG90R29vZHNMaXN0LFxuICAgICB0b3BpY3M6IHJlcy5kYXRhLnRvcGljTGlzdCxcbiAgICAgYnJhbmRzOiByZXMuZGF0YS5icmFuZExpc3QsXG4gICAgIGZsb29yR29vZHM6IHJlcy5kYXRhLmZsb29yR29vZHNMaXN0LFxuICAgICBiYW5uZXI6IHJlcy5kYXRhLmJhbm5lcixcbiAgICAgY2hhbm5lbDogcmVzLmRhdGEuY2hhbm5lbFxuICAgIH0pO1xuICAgIH1cbiB9LFxuIG9uTG9hZDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAvLyAgYXBwLmNoZWNrTG9naW5TdGF0dXMoKTtcbiAgLy8gLy8g6aG16Z2i5Yid5aeL5YyWIG9wdGlvbnPkuLrpobXpnaLot7PovazmiYDluKbmnaXnmoTlj4LmlbBcbiAgLy8gZm9ybVVzZXJJZCA9IGFwcC5nbG9iYWxEYXRhLnVzZXIudXNlcklkXG4gIC8vIHRoaXMuc2V0RGF0YSh7dXNlcklkOmZvcm1Vc2VySWR9KVxuICBpZiAob3B0aW9ucy5zY2VuZSkge1xuICAgLy/ov5nkuKpzY2VuZeeahOWAvOWtmOWcqOWImeivgeaYjummlumhteeahOW8gOWQr+adpea6kOS6juaci+WPi+WciOWIhuS6q+eahOWbvizlkIzml7blj6/ku6XpgJrov4fojrflj5bliLDnmoRnb29kSWTnmoTlgLzot7Povazlr7zoiKrliLDlr7nlupTnmoTor6bmg4XpobVcbiAgIHZhciBzY2VuZSA9IGRlY29kZVVSSUNvbXBvbmVudChvcHRpb25zLnNjZW5lKTtcbiAgLy8gIGNvbnNvbGUubG9nKFwic2NlbmU6XCIgKyBzY2VuZSk7XG4gICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICB1cmw6ICcuLi9nb29kcy9nb29kcz9pZD0nICsgc2NlbmVcbiAgIH0pO1xuICB9XG5cbiAgLy8g6aG16Z2i5Yid5aeL5YyWIG9wdGlvbnPkuLrpobXpnaLot7PovazmiYDluKbmnaXnmoTlj4LmlbBcbiAgaWYgKG9wdGlvbnMuZ29vZElkKSB7XG4gICAvL+i/meS4qmdvb2RJZOeahOWAvOWtmOWcqOWImeivgeaYjummlumhteeahOW8gOWQr+adpea6kOS6juWIhuS6qyzlkIzml7blj6/ku6XpgJrov4fojrflj5bliLDnmoRnb29kSWTnmoTlgLzot7Povazlr7zoiKrliLDlr7nlupTnmoTor6bmg4XpobVcbiAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgIHVybDogJy4uL2dvb2RzL2dvb2RzP2lkPScgKyBvcHRpb25zLmdvb2RJZFxuICAgfSk7XG4gIH1cblxuICAvLyDpobXpnaLliJ3lp4vljJYgb3B0aW9uc+S4uumhtemdoui3s+i9rOaJgOW4puadpeeahOWPguaVsFxuICBpZiAob3B0aW9ucy5vcmRlcklkKSB7XG4gICAvL+i/meS4qm9yZGVySWTnmoTlgLzlrZjlnKjliJnor4HmmI7pppbpobXnmoTlvIDlkK/mnaXmupDkuo7orqLljZXmqKHniYjpgJrnn6Us5ZCM5pe25Y+v5Lul6YCa6L+H6I635Y+W5Yiw55qEcGFnZUlk55qE5YC86Lez6L2s5a+86Iiq5Yiw5a+55bqU55qE6K+m5oOF6aG1XG4gICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICB1cmw6ICcuLi91Y2VudGVyL29yZGVyRGV0YWlsL29yZGVyRGV0YWlsP2lkPScgKyBvcHRpb25zLm9yZGVySWRcbiAgIH0pO1xuICB9XG5cbiAgdGhpcy5nZXRJbmRleERhdGEoKTtcbiB9LFxuIHNob3BpbmdfaW1nOmZ1bmN0aW9uKCl7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgdXJsOiAnL3BhZ2VzL2NhcnQvY2FydCdcbiAgICB9KTtcbiB9LFxuLy8gIHRvcGljczpmdW5jdGlvbihlKXtcbi8vICAgIGNvbnNvbGUubG9nKDc3Nzc4ODgpXG4vLyAgICAgd3gubmF2aWdhdGVUbyh7XG4vLyAgICAgdXJsOiBcIi4uL3NlbWluYXIvc2VtaW5hcj9pZD1cIitlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuLy8gICAgfSk7XG4vLyAgfSxcbiBvblJlYWR5OiBmdW5jdGlvbigpIHtcbiAgLy8g6aG16Z2i5riy5p+T5a6M5oiQXG4gfSxcbiBvblNob3c6IGZ1bmN0aW9uKCkge1xuICAvLyDpobXpnaLmmL7npLpcbnZhciB0aGF0ID0gdGhpcztcbiAgZGFhdHkuQ2FydEdvb2RzQ291bnQobnVsbCxzdWNjZXNzRmF5KVxuICBmdW5jdGlvbiBzdWNjZXNzRmF5KHJlcywgc291cmNlT2JqKXtcbiAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgY2FybnVtOiByZXMuZGF0YVxuICAgICAgICAgICAgICB9KTtcbiAgfVxuIH0sXG4gb25IaWRlOiBmdW5jdGlvbigpIHtcbiAgLy8g6aG16Z2i6ZqQ6JePXG4gfSxcbiBvblVubG9hZDogZnVuY3Rpb24oKSB7XG4gIC8vIOmhtemdouWFs+mXrVxuIH1cbn0iXX0=