"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var daaty = require("../../utils/api2.js");
var tip = require("../../utils/tip.js");
var navigator = require("../../utils/navigator.js");
var app = getApp();
exports.default = Page({
  data: {
    orderId: 0,
    orderInfo: {},
    orderGoods: [],
    expressInfo: {},
    flag: false,
    handleOption: {}
  },
  onLoad: function onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.id
    });
    this.getOrderDetail();
  },
  onPullDownRefresh: function onPullDownRefresh() {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.getOrderDetail();
    wx.hideNavigationBarLoading(); //完成停止加载
    wx.stopPullDownRefresh(); //停止下拉刷新
  },

  getOrderExpress: function getOrderExpress() {
    var that = this;
    daaty.ExpressQuery(that.data.orderInfo.expCode, that.data.orderInfo.expNo, null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        expressInfo: res.data
      });
    }
  },
  expandDetail: function expandDetail() {
    var that = this;
    this.setData({
      flag: !that.data.flag
    });
  },
  getOrderDetail: function getOrderDetail() {
    var that = this;
    daaty.OrderDetail(that.data.orderId, null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        orderInfo: res.data.orderInfo,
        orderGoods: res.data.orderGoods,
        handleOption: res.data.orderInfo.handleOption
      });

      // 请求物流信息,仅当订单状态为发货时才请求
      console.log(res, 'res');
      if (res.data.orderInfo.handleOption.confirm) {
        that.getOrderExpress();
      }
    }
  },
  // “去付款”按钮点击效果
  payOrder: function payOrder() {
    var that = this;
    daaty.OrderPrepay(that.data.orderId, null, successFay);
    function successFay(res, sourceObj) {
      var payParam = res.data;
      console.log("支付过程开始");
      wx.requestPayment({
        'timeStamp': payParam.timeStamp,
        'nonceStr': payParam.nonceStr,
        'package': payParam.packageValue,
        'signType': payParam.signType,
        'paySign': payParam.paySign,
        'success': function success(res) {
          console.log("支付过程成功");
          setTimeout(function () {
            navigator.redirectTo('../order/order');
          }, 1500);
        },
        'fail': function fail(res) {
          console.log("支付过程失败");
          setTimeout(function () {
            navigator.redirectTo('../order/order');
          }, 1500);
        },
        'complete': function complete(res) {
          console.log("支付过程结束");
        }
      });
    }
  },
  // “取消订单”点击效果
  cancelOrder: function cancelOrder() {
    var that = this;
    var orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确定要取消此订单？',
      success: function success(res) {
        if (res.confirm) {
          var successFay = function successFay(res, sourceObj) {
            wx.showToast({
              title: '取消订单成功'
            });
            // util.redirect('../order/order');
            setTimeout(function () {
              navigator.redirectTo('../order/order');
            }, 1500);
          };

          daaty.OrderCancel(orderInfo.id, null, successFay);
        }
      }
    });
  },
  // “取消订单并退款”点击效果
  refundOrder: function refundOrder() {
    var that = this;
    var orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确定要取消此订单？',
      success: function success(res) {
        if (res.confirm) {
          var successFay = function successFay(res, sourceObj) {
            wx.showToast({
              title: '取消订单成功'
            });
            setTimeout(function () {
              navigator.redirectTo('../order/order');
            }, 1500);
          };

          daaty.OrderRefund(orderInfo.id, null, successFay);
        }
      }
    });
  },
  // “删除”点击效果
  deleteOrder: function deleteOrder() {
    var that = this;
    var orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确定要删除此订单？',
      success: function success(res) {
        if (res.confirm) {
          var successFay = function successFay(res, sourceObj) {
            wx.showToast({
              title: '删除订单成功'
            });
            setTimeout(function () {
              navigator.redirectTo('../order/order');
            }, 1500);
          };

          daaty.OrderDelete(orderInfo.id, null, successFay);
        }
      }
    });
  },
  // “确认收货”点击效果
  confirmOrder: function confirmOrder() {
    var that = this;
    var orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确认收货？',
      success: function success(res) {
        if (res.confirm) {
          var successFay = function successFay(res, sourceObj) {
            wx.showToast({
              title: '确认收货成功！'
            });
            setTimeout(function () {
              navigator.redirectTo('../order/order');
            }, 1500);
          };

          daaty.OrderConfirm(orderInfo.id, null, successFay);
        }
      }
    });
  },
  onReady: function onReady() {
    // 页面渲染完成
  },
  onShow: function onShow() {
    // 页面显示
  },
  onHide: function onHide() {
    // 页面隐藏
  },
  onUnload: function onUnload() {
    // 页面关闭
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLnd4cCJdLCJuYW1lcyI6WyJkYWF0eSIsInJlcXVpcmUiLCJ0aXAiLCJuYXZpZ2F0b3IiLCJhcHAiLCJnZXRBcHAiLCJkYXRhIiwib3JkZXJJZCIsIm9yZGVySW5mbyIsIm9yZGVyR29vZHMiLCJleHByZXNzSW5mbyIsImZsYWciLCJoYW5kbGVPcHRpb24iLCJvbkxvYWQiLCJvcHRpb25zIiwic2V0RGF0YSIsImlkIiwiZ2V0T3JkZXJEZXRhaWwiLCJvblB1bGxEb3duUmVmcmVzaCIsInd4Iiwic2hvd05hdmlnYXRpb25CYXJMb2FkaW5nIiwiaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImdldE9yZGVyRXhwcmVzcyIsInRoYXQiLCJFeHByZXNzUXVlcnkiLCJleHBDb2RlIiwiZXhwTm8iLCJzdWNjZXNzRmF5IiwicmVzIiwic291cmNlT2JqIiwiZXhwYW5kRGV0YWlsIiwiT3JkZXJEZXRhaWwiLCJjb25zb2xlIiwibG9nIiwiY29uZmlybSIsInBheU9yZGVyIiwiT3JkZXJQcmVwYXkiLCJwYXlQYXJhbSIsInJlcXVlc3RQYXltZW50IiwidGltZVN0YW1wIiwibm9uY2VTdHIiLCJwYWNrYWdlVmFsdWUiLCJzaWduVHlwZSIsInBheVNpZ24iLCJzZXRUaW1lb3V0IiwicmVkaXJlY3RUbyIsImNhbmNlbE9yZGVyIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInNob3dUb2FzdCIsIk9yZGVyQ2FuY2VsIiwicmVmdW5kT3JkZXIiLCJPcmRlclJlZnVuZCIsImRlbGV0ZU9yZGVyIiwiT3JkZXJEZWxldGUiLCJjb25maXJtT3JkZXIiLCJPcmRlckNvbmZpcm0iLCJvblJlYWR5Iiwib25TaG93Iiwib25IaWRlIiwib25VbmxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsUUFBU0MsUUFBUSxxQkFBUixDQUFiO0FBQ0EsSUFBSUMsTUFBTUQsUUFBUSxvQkFBUixD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SCxDQUFhO0FBQ1hDLGFBQU8sRUFESTtBQUVYQyxlQUFTLE9BRkU7QUFHWEMsZUFBUyxpQkFBVXRCLEdBQVYsRUFBZTtBQUN0QixZQUFJQSxJQUFJTSxPQUFSLEVBQWlCO0FBQUEsY0FFTlAsVUFGTSxHQUVmLFNBQVNBLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCQyxTQUF6QixFQUFtQztBQUM3QlgsZUFBR2lDLFNBQUgsQ0FBYTtBQUNiSCxxQkFBTztBQURNLGFBQWI7QUFHRkosdUJBQVcsWUFBVTtBQUNuQjFDLHdCQUFVMkMsVUFBVixDQUFxQixnQkFBckI7QUFDRCxhQUZELEVBRUUsSUFGRjtBQUdILFdBVGM7O0FBQ2xCOUMsZ0JBQU0yRCxZQUFOLENBQW1CbkQsVUFBVVEsRUFBN0IsRUFBZ0MsSUFBaEMsRUFBcUNZLFVBQXJDO0FBU0U7QUFDRjtBQWZVLEtBQWI7QUFpQkQsRztBQUNEZ0MsV0FBUyxtQkFBWTtBQUNuQjtBQUNELEc7QUFDREMsVUFBUSxrQkFBWTtBQUNsQjtBQUNELEc7QUFDREMsVUFBUSxrQkFBWTtBQUNsQjtBQUNELEc7QUFDREMsWUFBVSxvQkFBWTtBQUNwQjtBQUNEIiwiZmlsZSI6Im9yZGVyRGV0YWlsLnd4cCIsInNvdXJjZXNDb250ZW50IjpbInZhciBkYWF0eSA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYXBpMi5qc1wiKVxudmFyIHRpcCA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy90aXAuanNcIilcbnZhciBuYXZpZ2F0b3IgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL25hdmlnYXRvci5qc1wiKVxudmFyIGFwcCA9IGdldEFwcCgpXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnianmtYHor6bmg4UnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge31cbiAgfSxcbiAgIGRhdGE6IHtcbiAgICBvcmRlcklkOiAwLFxuICAgIG9yZGVySW5mbzoge30sXG4gICAgb3JkZXJHb29kczogW10sXG4gICAgZXhwcmVzc0luZm86IHt9LFxuICAgIGZsYWc6IGZhbHNlLFxuICAgIGhhbmRsZU9wdGlvbjoge31cbiAgfSxcbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIC8vIOmhtemdouWIneWni+WMliBvcHRpb25z5Li66aG16Z2i6Lez6L2s5omA5bim5p2l55qE5Y+C5pWwXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG9yZGVySWQ6IG9wdGlvbnMuaWRcbiAgICB9KTtcbiAgICB0aGlzLmdldE9yZGVyRGV0YWlsKCk7XG4gIH0sXG4gb25QdWxsRG93blJlZnJlc2goKSB7XG4gIHd4LnNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZygpIC8v5Zyo5qCH6aKY5qCP5Lit5pi+56S65Yqg6L29XG4gIHRoaXMuZ2V0T3JkZXJEZXRhaWwoKTtcbiAgd3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKCkgLy/lrozmiJDlgZzmraLliqDovb1cbiAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpIC8v5YGc5q2i5LiL5ouJ5Yi35pawXG4gfSxcbiAgZ2V0T3JkZXJFeHByZXNzOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgZGFhdHkuRXhwcmVzc1F1ZXJ5KHRoYXQuZGF0YS5vcmRlckluZm8uZXhwQ29kZSx0aGF0LmRhdGEub3JkZXJJbmZvLmV4cE5vLG51bGwsc3VjY2Vzc0ZheSlcbiAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLCBzb3VyY2VPYmope1xuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgZXhwcmVzc0luZm86IHJlcy5kYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgfSxcbiAgZXhwYW5kRGV0YWlsOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGZsYWc6ICF0aGF0LmRhdGEuZmxhZ1xuICAgIH0pXG4gIH0sXG4gIGdldE9yZGVyRGV0YWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGRhYXR5Lk9yZGVyRGV0YWlsKHRoYXQuZGF0YS5vcmRlcklkLG51bGwsc3VjY2Vzc0ZheSlcbiAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLCBzb3VyY2VPYmope1xuICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgIG9yZGVySW5mbzogcmVzLmRhdGEub3JkZXJJbmZvLFxuICAgICAgICAgICAgICAgICAgb3JkZXJHb29kczogcmVzLmRhdGEub3JkZXJHb29kcyxcbiAgICAgICAgICAgICAgICAgIGhhbmRsZU9wdGlvbjogcmVzLmRhdGEub3JkZXJJbmZvLmhhbmRsZU9wdGlvblxuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgLy8g6K+35rGC54mp5rWB5L+h5oGvLOS7heW9k+iuouWNleeKtuaAgeS4uuWPkei0p+aXtuaJjeivt+axglxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsJ3JlcycpXG4gICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vcmRlckluZm8uaGFuZGxlT3B0aW9uLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgdGhhdC5nZXRPcmRlckV4cHJlc3MoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgfVxuIH0sXG4gLy8g4oCc5Y675LuY5qy+4oCd5oyJ6ZKu54K55Ye75pWI5p6cXG4gcGF5T3JkZXI6IGZ1bmN0aW9uKCkge1xuICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgZGFhdHkuT3JkZXJQcmVwYXkodGhhdC5kYXRhLm9yZGVySWQsbnVsbCxzdWNjZXNzRmF5KVxuICAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgICAgICAgICAgIGNvbnN0IHBheVBhcmFtID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pSv5LuY6L+H56iL5byA5aeLXCIpO1xuICAgICAgICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICd0aW1lU3RhbXAnOiBwYXlQYXJhbS50aW1lU3RhbXAsXG4gICAgICAgICAgICAgICdub25jZVN0cic6IHBheVBhcmFtLm5vbmNlU3RyLFxuICAgICAgICAgICAgICAncGFja2FnZSc6IHBheVBhcmFtLnBhY2thZ2VWYWx1ZSxcbiAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogcGF5UGFyYW0uc2lnblR5cGUsXG4gICAgICAgICAgICAgICdwYXlTaWduJzogcGF5UGFyYW0ucGF5U2lnbixcbiAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaUr+S7mOi/h+eoi+aIkOWKn1wiKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5yZWRpcmVjdFRvKCcuLi9vcmRlci9vcmRlcicpO1xuICAgICAgICAgICAgICAgICAgfSwxNTAwKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnZmFpbCc6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pSv5LuY6L+H56iL5aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5yZWRpcmVjdFRvKCcuLi9vcmRlci9vcmRlcicpO1xuICAgICAgICAgICAgICAgICAgfSwxNTAwKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnY29tcGxldGUnOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaUr+S7mOi/h+eoi+e7k+adn1wiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgfVxuICB9LFxuICAvLyDigJzlj5bmtojorqLljZXigJ3ngrnlh7vmlYjmnpxcbiAgY2FuY2VsT3JkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IG9yZGVySW5mbyA9IHRoYXQuZGF0YS5vcmRlckluZm87XG5cbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgY29udGVudDogJ+ehruWumuimgeWPlua2iOatpOiuouWNle+8nycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICBkYWF0eS5PcmRlckNhbmNlbChvcmRlckluZm8uaWQsbnVsbCxzdWNjZXNzRmF5KVxuICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLCBzb3VyY2VPYmope1xuICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOiuouWNleaIkOWKnydcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIC8vIHV0aWwucmVkaXJlY3QoJy4uL29yZGVyL29yZGVyJyk7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucmVkaXJlY3RUbygnLi4vb3JkZXIvb3JkZXInKTtcbiAgICAgICAgICAgICAgfSwxNTAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICAvLyDigJzlj5bmtojorqLljZXlubbpgIDmrL7igJ3ngrnlh7vmlYjmnpxcbiAgcmVmdW5kT3JkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IG9yZGVySW5mbyA9IHRoYXQuZGF0YS5vcmRlckluZm87XG5cbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgY29udGVudDogJ+ehruWumuimgeWPlua2iOatpOiuouWNle+8nycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgIGRhYXR5Lk9yZGVyUmVmdW5kKG9yZGVySW5mby5pZCxudWxsLHN1Y2Nlc3NGYXkpXG4gICAgICAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflj5bmtojorqLljZXmiJDlip8nXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLnJlZGlyZWN0VG8oJy4uL29yZGVyL29yZGVyJyk7XG4gICAgICAgICAgICAgIH0sMTUwMClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSwgIFxuICAvLyDigJzliKDpmaTigJ3ngrnlh7vmlYjmnpxcbiAgZGVsZXRlT3JkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IG9yZGVySW5mbyA9IHRoYXQuZGF0YS5vcmRlckluZm87XG5cbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgY29udGVudDogJ+ehruWumuimgeWIoOmZpOatpOiuouWNle+8nycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgZGFhdHkuT3JkZXJEZWxldGUob3JkZXJJbmZvLmlkLG51bGwsc3VjY2Vzc0ZheSlcbiAgICAgICAgICBmdW5jdGlvbiBzdWNjZXNzRmF5KHJlcywgc291cmNlT2JqKXtcbiAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTorqLljZXmiJDlip8nXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLnJlZGlyZWN0VG8oJy4uL29yZGVyL29yZGVyJyk7XG4gICAgICAgICAgICAgIH0sMTUwMClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSwgIFxuICAvLyDigJznoa7orqTmlLbotKfigJ3ngrnlh7vmlYjmnpxcbiAgY29uZmlybU9yZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCBvcmRlckluZm8gPSB0aGF0LmRhdGEub3JkZXJJbmZvO1xuXG4gICAgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGNvbnRlbnQ6ICfnoa7orqTmlLbotKfvvJ8nLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICBkYWF0eS5PcmRlckNvbmZpcm0ob3JkZXJJbmZvLmlkLG51bGwsc3VjY2Vzc0ZheSlcbiAgICAgICAgICBmdW5jdGlvbiBzdWNjZXNzRmF5KHJlcywgc291cmNlT2JqKXtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn56Gu6K6k5pS26LSn5oiQ5Yqf77yBJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5yZWRpcmVjdFRvKCcuLi9vcmRlci9vcmRlcicpO1xuICAgICAgICAgICAgICB9LDE1MDApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyDpobXpnaLmuLLmn5PlrozmiJBcbiAgfSxcbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgLy8g6aG16Z2i5pi+56S6XG4gIH0sXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdoumakOiXj1xuICB9LFxuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdouWFs+mXrVxuICB9XG59Il19