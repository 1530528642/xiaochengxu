"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var daaty = require("../../utils/api2.js");
var tip = require("../../utils/tip.js");
var app = getApp();
exports.default = Page({
  data: {
    checkedGoodsList: [],
    checkedAddress: {},
    checkedCoupon: [],
    couponList: [],
    goodsTotalPrice: 0.00, //商品总价
    freightPrice: 0.00, //快递费
    couponPrice: 0.00, //优惠券的价格
    orderTotalPrice: 0.00, //订单总价
    actualPrice: 0.00, //实际需要支付的总价
    cartId: 0,
    addressId: 0,
    couponId: 0
  },
  onLoad: function onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var userid = app.globalData.user.userId;
    this.setData({ userid: userid });
  },
  getCheckoutInfo: function getCheckoutInfo() {
    var that = this;
    daaty.CartCheckout(this.data.cartId, this.data.addressId, this.data.couponId, null, successFay);
    function successFay(res, sourceObj) {
      if (0 === 0) {
        that.setData({
          checkedGoodsList: res.data.checkedGoodsList,
          checkedAddress: res.data.checkedAddress,
          actualPrice: res.data.actualPrice,
          checkedCoupon: res.data.checkedCoupon,
          couponList: res.data.couponList,
          couponPrice: res.data.couponPrice,
          freightPrice: res.data.freightPrice,
          goodsTotalPrice: res.data.goodsTotalPrice,
          orderTotalPrice: res.data.orderTotalPrice,
          addressId: res.data.addressId,
          couponId: res.data.couponId
        });
      }
      wx.hideLoading();
    }
  },
  selectAddress: function selectAddress() {
    wx.navigateTo({
      url: '../address/address?userId=' + this.data.userid
    });
  },
  addAddress: function addAddress() {
    wx.navigateTo({
      url: '../address/address?userId=' + this.data.userid
    });
  },

  onReady: function onReady() {
    // 页面渲染完成

  },
  onShow: function onShow() {
    // 页面显示
    wx.showLoading({
      title: '加载中...'
    });
    try {
      var cartId = wx.getStorageSync('cartId');
      if (cartId) {
        this.setData({
          'cartId': cartId
        });
      }

      var addressId = wx.getStorageSync('addressId');
      //   console.log(addressId,"addressId")
      if (addressId) {
        this.setData({
          'addressId': addressId
        });
      }

      var couponId = wx.getStorageSync('couponId');
      if (couponId) {
        this.setData({
          'couponId': couponId
        });
      }
    } catch (e) {
      // Do something when catch error
      console.log(e);
    }
    this.getCheckoutInfo();
  },
  onHide: function onHide() {
    // 页面隐藏

  },
  onUnload: function onUnload() {
    // 页面关闭

  },
  submitOrder: function submitOrder() {
    var thisyt = this;
    if (this.data.addressId <= 0) {
      tip.showToast('请选择收货地址');
      return false;
    }
    daaty.OrderSubmit(this.data.cartId, this.data.addressId, this.data.couponId, null, successFay);
    function successFay(res, sourceObj) {
      if (0 === 0) {
        var _successFay = function _successFay(res, sourceObj) {
          if (0 === 0) {
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
                wx.redirectTo({
                  url: '/pages/payResult/payResult?status=1&orderId=' + _orderId
                });
              },
              'fail': function fail(res) {
                console.log("支付过程失败");
                wx.redirectTo({
                  url: '/pages/payResult/payResult?status=0&orderId=' + _orderId
                });
              },
              'complete': function complete(res) {
                console.log("支付过程结束");
              }
            });
          } else {
            wx.redirectTo({
              url: '/pages/payResult/payResult?status=0&orderId=' + _orderId
            });
          }
        };

        var _orderId = res.data.orderId;
        // 模拟支付成功，同理，后台也仅仅是返回一个成功的消息而已
        // wx.showModal({
        //   title: '目前不能微信支付',
        //   content: '点击确定模拟支付成功，点击取消模拟未支付成功',
        //   success: function(res) {
        //     if (res.confirm) {
        //  daaty.OrderPrepay(thisyt.data.userid,orderId,null,successFay)
        //       function successFay(res, sourceObj){
        //         if (res.errno === 0) {
        //           wx.redirectTo({
        //             url: '/pages/payResult/payResult?status=1&orderId=' + orderId
        //           });
        //         }
        //         else{
        //           wx.redirectTo({
        //             url: '/pages/payResult/payResult?status=0&orderId=' + orderId
        //           });
        //         }
        //       }
        //     }
        //     else if (res.cancel) {
        //       wx.redirectTo({
        //         url: '/pages/payResult/payResult?status=0&orderId=' + orderId
        //       });
        //     }

        //   }
        // });
        daaty.OrderPrepay(_orderId, null, _successFay);
      } else {
        wx.redirectTo({
          url: '/pages/payResult/payResult?status=0&orderId=' + orderId
        });
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoZWNrb3V0Lnd4cCJdLCJuYW1lcyI6WyJkYWF0eSIsInJlcXVpcmUiLCJ0aXAiLCJhcHAiLCJnZXRBcHAiLCJkYXRhIiwiY2hlY2tlZEdvb2RzTGlzdCIsImNoZWNrZWRBZGRyZXNzIiwiY2hlY2tlZENvdXBvbiIsImNvdXBvbkxpc3QiLCJnb29kc1RvdGFsUHJpY2UiLCJmcmVpZ2h0UHJpY2UiLCJjb3Vwb25QcmljZSIsIm9yZGVyVG90YWxQcmljZSIsImFjdHVhbFByaWNlIiwiY2FydElkIiwiYWRkcmVzc0lkIiwiY291cG9uSWQiLCJvbkxvYWQiLCJvcHRpb25zIiwidXNlcmlkIiwiZ2xvYmFsRGF0YSIsInVzZXIiLCJ1c2VySWQiLCJzZXREYXRhIiwiZ2V0Q2hlY2tvdXRJbmZvIiwidGhhdCIsIkNhcnRDaGVja291dCIsInN1Y2Nlc3NGYXkiLCJyZXMiLCJzb3VyY2VPYmoiLCJ3eCIsImhpZGVMb2FkaW5nIiwic2VsZWN0QWRkcmVzcyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJhZGRBZGRyZXNzIiwib25SZWFkeSIsIm9uU2hvdyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJnZXRTdG9yYWdlU3luYyIsImUiLCJjb25zb2xlIiwibG9nIiwib25IaWRlIiwib25VbmxvYWQiLCJzdWJtaXRPcmRlciIsInRoaXN5dCIsInNob3dUb2FzdCIsIk9yZGVyU3VibWl0IiwicGF5UGFyYW0iLCJyZXF1ZXN0UGF5bWVudCIsInRpbWVTdGFtcCIsIm5vbmNlU3RyIiwicGFja2FnZVZhbHVlIiwic2lnblR5cGUiLCJwYXlTaWduIiwicmVkaXJlY3RUbyIsIm9yZGVySWQiLCJPcmRlclByZXBheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFJQSxRQUFTQyxRQUFRLHFCQUFSLENBQWI7QUFDQSxJQUFJQyxNQUFNRCxRQUFRLG9CQUFSLENBQVY7QUFDQSxJQUFJRSxNQUFNQyxRQUFWOztBQU1DQyxRQUFNO0FBQ0hDLHNCQUFrQixFQURmO0FBRUhDLG9CQUFnQixFQUZiO0FBR0hDLG1CQUFlLEVBSFo7QUFJSEMsZ0JBQVksRUFKVDtBQUtIQyxxQkFBaUIsSUFMZCxFQUtvQjtBQUN2QkMsa0JBQWMsSUFOWCxFQU1vQjtBQUN2QkMsaUJBQWEsSUFQVixFQU9vQjtBQUN2QkMscUJBQWlCLElBUmQsRUFRcUI7QUFDeEJDLGlCQUFhLElBVFYsRUFTb0I7QUFDdkJDLFlBQVEsQ0FWTDtBQVdIQyxlQUFXLENBWFI7QUFZSEMsY0FBVTtBQVpQLEc7QUFjTEMsVUFBUSxnQkFBVUMsT0FBVixFQUFtQjtBQUN6QjtBQUNFLFFBQUlDLFNBQVNqQixJQUFJa0IsVUFBSixDQUFlQyxJQUFmLENBQW9CQyxNQUFqQztBQUNBLFNBQUtDLE9BQUwsQ0FBYSxFQUFDSixRQUFPQSxNQUFSLEVBQWI7QUFDSCxHO0FBQ0RLLG1CQUFpQiwyQkFBWTtBQUMzQixRQUFJQyxPQUFPLElBQVg7QUFDQzFCLFVBQU0yQixZQUFOLENBQW1CLEtBQUt0QixJQUFMLENBQVVVLE1BQTdCLEVBQW9DLEtBQUtWLElBQUwsQ0FBVVcsU0FBOUMsRUFBd0QsS0FBS1gsSUFBTCxDQUFVWSxRQUFsRSxFQUEyRSxJQUEzRSxFQUFnRlcsVUFBaEY7QUFDQyxhQUFTQSxVQUFULENBQW9CQyxHQUFwQixFQUF5QkMsU0FBekIsRUFBbUM7QUFDM0IsVUFBSSxNQUFNLENBQVYsRUFBYTtBQUNYSixhQUFLRixPQUFMLENBQWE7QUFDWGxCLDRCQUFrQnVCLElBQUl4QixJQUFKLENBQVNDLGdCQURoQjtBQUVYQywwQkFBZ0JzQixJQUFJeEIsSUFBSixDQUFTRSxjQUZkO0FBR1hPLHVCQUFhZSxJQUFJeEIsSUFBSixDQUFTUyxXQUhYO0FBSVhOLHlCQUFlcUIsSUFBSXhCLElBQUosQ0FBU0csYUFKYjtBQUtYQyxzQkFBWW9CLElBQUl4QixJQUFKLENBQVNJLFVBTFY7QUFNWEcsdUJBQWFpQixJQUFJeEIsSUFBSixDQUFTTyxXQU5YO0FBT1hELHdCQUFja0IsSUFBSXhCLElBQUosQ0FBU00sWUFQWjtBQVFYRCwyQkFBaUJtQixJQUFJeEIsSUFBSixDQUFTSyxlQVJmO0FBU1hHLDJCQUFpQmdCLElBQUl4QixJQUFKLENBQVNRLGVBVGY7QUFVWEcscUJBQVdhLElBQUl4QixJQUFKLENBQVNXLFNBVlQ7QUFXWEMsb0JBQVVZLElBQUl4QixJQUFKLENBQVNZO0FBWFIsU0FBYjtBQWFEO0FBQ1RjLFNBQUdDLFdBQUg7QUFDQztBQUNKLEc7QUFDREMsZSwyQkFBZ0I7QUFDZEYsT0FBR0csVUFBSCxDQUFjO0FBQ1pDLFdBQUssK0JBQTZCLEtBQUs5QixJQUFMLENBQVVlO0FBRGhDLEtBQWQ7QUFHRCxHO0FBQ0RnQixZLHdCQUFhO0FBQ1hMLE9BQUdHLFVBQUgsQ0FBYztBQUNaQyxXQUFLLCtCQUE2QixLQUFLOUIsSUFBTCxDQUFVZTtBQURoQyxLQUFkO0FBR0QsRzs7QUFDRGlCLFdBQVMsbUJBQVk7QUFDbkI7O0FBRUQsRztBQUNEQyxVQUFRLGtCQUFZO0FBQ2xCO0FBQ0FQLE9BQUdRLFdBQUgsQ0FBZTtBQUNiQyxhQUFPO0FBRE0sS0FBZjtBQUdBLFFBQUk7QUFDRixVQUFJekIsU0FBU2dCLEdBQUdVLGNBQUgsQ0FBa0IsUUFBbEIsQ0FBYjtBQUNBLFVBQUkxQixNQUFKLEVBQVk7QUFDVixhQUFLUyxPQUFMLENBQWE7QUFDWCxvQkFBVVQ7QUFEQyxTQUFiO0FBR0Q7O0FBRUQsVUFBSUMsWUFBWWUsR0FBR1UsY0FBSCxDQUFrQixXQUFsQixDQUFoQjtBQUNGO0FBQ0UsVUFBSXpCLFNBQUosRUFBZTtBQUNiLGFBQUtRLE9BQUwsQ0FBYTtBQUNYLHVCQUFhUjtBQURGLFNBQWI7QUFHRDs7QUFFRCxVQUFJQyxXQUFXYyxHQUFHVSxjQUFILENBQWtCLFVBQWxCLENBQWY7QUFDQSxVQUFJeEIsUUFBSixFQUFjO0FBQ1osYUFBS08sT0FBTCxDQUFhO0FBQ1gsc0JBQVlQO0FBREQsU0FBYjtBQUdEO0FBQ0YsS0F0QkQsQ0FzQkUsT0FBT3lCLENBQVAsRUFBVTtBQUNWO0FBQ0FDLGNBQVFDLEdBQVIsQ0FBWUYsQ0FBWjtBQUNEO0FBQ0QsU0FBS2pCLGVBQUw7QUFDRCxHO0FBQ0RvQixVQUFRLGtCQUFZO0FBQ2xCOztBQUVELEc7QUFDREMsWUFBVSxvQkFBWTtBQUNwQjs7QUFFRCxHO0FBQ0RDLGVBQWEsdUJBQVk7QUFDdkIsUUFBTUMsU0FBUSxJQUFkO0FBQ0EsUUFBSSxLQUFLM0MsSUFBTCxDQUFVVyxTQUFWLElBQXVCLENBQTNCLEVBQThCO0FBQzVCZCxVQUFJK0MsU0FBSixDQUFjLFNBQWQ7QUFDQSxhQUFPLEtBQVA7QUFDRDtBQUNIakQsVUFBTWtELFdBQU4sQ0FBa0IsS0FBSzdDLElBQUwsQ0FBVVUsTUFBNUIsRUFBbUMsS0FBS1YsSUFBTCxDQUFVVyxTQUE3QyxFQUF1RCxLQUFLWCxJQUFMLENBQVVZLFFBQWpFLEVBQTBFLElBQTFFLEVBQStFVyxVQUEvRTtBQUNJLGFBQVNBLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCQyxTQUF6QixFQUFtQztBQUN6QixVQUFJLE1BQUssQ0FBVCxFQUFZO0FBQUEsWUErQmJGLFdBL0JhLEdBK0J0QixTQUFTQSxXQUFULENBQW9CQyxHQUFwQixFQUF5QkMsU0FBekIsRUFBbUM7QUFDOUIsY0FBSSxNQUFNLENBQVYsRUFBYTtBQUNaLGdCQUFNcUIsV0FBV3RCLElBQUl4QixJQUFyQjtBQUNBc0Msb0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0FiLGVBQUdxQixjQUFILENBQWtCO0FBQ2hCLDJCQUFhRCxTQUFTRSxTQUROO0FBRWhCLDBCQUFZRixTQUFTRyxRQUZMO0FBR2hCLHlCQUFXSCxTQUFTSSxZQUhKO0FBSWhCLDBCQUFZSixTQUFTSyxRQUpMO0FBS2hCLHlCQUFXTCxTQUFTTSxPQUxKO0FBTWhCLHlCQUFXLGlCQUFVNUIsR0FBVixFQUFlO0FBQ3hCYyx3QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDQWIsbUJBQUcyQixVQUFILENBQWM7QUFDWnZCLHVCQUFLLGlEQUFpRHdCO0FBRDFDLGlCQUFkO0FBR0QsZUFYZTtBQVloQixzQkFBUSxjQUFVOUIsR0FBVixFQUFlO0FBQ3JCYyx3QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDQWIsbUJBQUcyQixVQUFILENBQWM7QUFDWnZCLHVCQUFLLGlEQUFpRHdCO0FBRDFDLGlCQUFkO0FBR0QsZUFqQmU7QUFrQmhCLDBCQUFZLGtCQUFVOUIsR0FBVixFQUFlO0FBQ3pCYyx3QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQXBCZSxhQUFsQjtBQXNCRCxXQXpCQSxNQTBCRztBQUNGYixlQUFHMkIsVUFBSCxDQUFjO0FBQ1p2QixtQkFBSyxpREFBaUR3QjtBQUQxQyxhQUFkO0FBR0Q7QUFDSixTQS9EcUI7O0FBQ3BCLFlBQU1BLFdBQVU5QixJQUFJeEIsSUFBSixDQUFTc0QsT0FBekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ1AzRCxjQUFNNEQsV0FBTixDQUFrQkQsUUFBbEIsRUFBMEIsSUFBMUIsRUFBK0IvQixXQUEvQjtBQW1DTSxPQWpFUyxNQWlFSDtBQUNMRyxXQUFHMkIsVUFBSCxDQUFjO0FBQ1p2QixlQUFLLGlEQUFpRHdCO0FBRDFDLFNBQWQ7QUFHRDtBQUNBO0FBRUoiLCJmaWxlIjoiY2hlY2tvdXQud3hwIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRhYXR5ID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy9hcGkyLmpzXCIpXG52YXIgdGlwID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL3RpcC5qc1wiKVxudmFyIGFwcCA9IGdldEFwcCgpXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfloavlhpnorqLljZUnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge31cbiAgfSxcbiBkYXRhOiB7XG4gICAgY2hlY2tlZEdvb2RzTGlzdDogW10sXG4gICAgY2hlY2tlZEFkZHJlc3M6IHt9LFxuICAgIGNoZWNrZWRDb3Vwb246IFtdLFxuICAgIGNvdXBvbkxpc3Q6IFtdLFxuICAgIGdvb2RzVG90YWxQcmljZTogMC4wMCwgLy/llYblk4HmgLvku7dcbiAgICBmcmVpZ2h0UHJpY2U6IDAuMDAsICAgIC8v5b+r6YCS6LS5XG4gICAgY291cG9uUHJpY2U6IDAuMDAsICAgICAvL+S8mOaDoOWIuOeahOS7t+agvFxuICAgIG9yZGVyVG90YWxQcmljZTogMC4wMCwgIC8v6K6i5Y2V5oC75Lu3XG4gICAgYWN0dWFsUHJpY2U6IDAuMDAsICAgICAvL+WunumZhemcgOimgeaUr+S7mOeahOaAu+S7t1xuICAgIGNhcnRJZDogMCxcbiAgICBhZGRyZXNzSWQ6IDAsXG4gICAgY291cG9uSWQ6IDBcbiAgfSxcbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIC8vIOmhtemdouWIneWni+WMliBvcHRpb25z5Li66aG16Z2i6Lez6L2s5omA5bim5p2l55qE5Y+C5pWwXG4gICAgICB2YXIgdXNlcmlkID0gYXBwLmdsb2JhbERhdGEudXNlci51c2VySWRcbiAgICAgIHRoaXMuc2V0RGF0YSh7dXNlcmlkOnVzZXJpZH0pXG4gIH0sXG4gIGdldENoZWNrb3V0SW5mbzogZnVuY3Rpb24gKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgZGFhdHkuQ2FydENoZWNrb3V0KHRoaXMuZGF0YS5jYXJ0SWQsdGhpcy5kYXRhLmFkZHJlc3NJZCx0aGlzLmRhdGEuY291cG9uSWQsbnVsbCxzdWNjZXNzRmF5KVxuICAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgICAgICAgICAgIGlmICgwID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWRHb29kc0xpc3Q6IHJlcy5kYXRhLmNoZWNrZWRHb29kc0xpc3QsXG4gICAgICAgICAgICAgICAgICBjaGVja2VkQWRkcmVzczogcmVzLmRhdGEuY2hlY2tlZEFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICBhY3R1YWxQcmljZTogcmVzLmRhdGEuYWN0dWFsUHJpY2UsXG4gICAgICAgICAgICAgICAgICBjaGVja2VkQ291cG9uOiByZXMuZGF0YS5jaGVja2VkQ291cG9uLFxuICAgICAgICAgICAgICAgICAgY291cG9uTGlzdDogcmVzLmRhdGEuY291cG9uTGlzdCxcbiAgICAgICAgICAgICAgICAgIGNvdXBvblByaWNlOiByZXMuZGF0YS5jb3Vwb25QcmljZSxcbiAgICAgICAgICAgICAgICAgIGZyZWlnaHRQcmljZTogcmVzLmRhdGEuZnJlaWdodFByaWNlLFxuICAgICAgICAgICAgICAgICAgZ29vZHNUb3RhbFByaWNlOiByZXMuZGF0YS5nb29kc1RvdGFsUHJpY2UsXG4gICAgICAgICAgICAgICAgICBvcmRlclRvdGFsUHJpY2U6IHJlcy5kYXRhLm9yZGVyVG90YWxQcmljZSxcbiAgICAgICAgICAgICAgICAgIGFkZHJlc3NJZDogcmVzLmRhdGEuYWRkcmVzc0lkLFxuICAgICAgICAgICAgICAgICAgY291cG9uSWQ6IHJlcy5kYXRhLmNvdXBvbklkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICB9XG4gIH0sXG4gIHNlbGVjdEFkZHJlc3MoKSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcuLi9hZGRyZXNzL2FkZHJlc3M/dXNlcklkPScrdGhpcy5kYXRhLnVzZXJpZCxcbiAgICB9KVxuICB9LFxuICBhZGRBZGRyZXNzKCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vYWRkcmVzcy9hZGRyZXNzP3VzZXJJZD0nK3RoaXMuZGF0YS51c2VyaWQsXG4gICAgfSlcbiAgfSxcbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdoua4suafk+WujOaIkFxuXG4gIH0sXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdouaYvuekulxuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitLi4uJyxcbiAgICB9KVxuICAgIHRyeSB7XG4gICAgICB2YXIgY2FydElkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NhcnRJZCcpO1xuICAgICAgaWYgKGNhcnRJZCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICdjYXJ0SWQnOiBjYXJ0SWRcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhZGRyZXNzSWQgPSB3eC5nZXRTdG9yYWdlU3luYygnYWRkcmVzc0lkJyk7XG4gICAgLy8gICBjb25zb2xlLmxvZyhhZGRyZXNzSWQsXCJhZGRyZXNzSWRcIilcbiAgICAgIGlmIChhZGRyZXNzSWQpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAnYWRkcmVzc0lkJzogYWRkcmVzc0lkXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB2YXIgY291cG9uSWQgPSB3eC5nZXRTdG9yYWdlU3luYygnY291cG9uSWQnKTtcbiAgICAgIGlmIChjb3Vwb25JZCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICdjb3Vwb25JZCc6IGNvdXBvbklkXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIERvIHNvbWV0aGluZyB3aGVuIGNhdGNoIGVycm9yXG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gICAgdGhpcy5nZXRDaGVja291dEluZm8oKTtcbiAgfSxcbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8g6aG16Z2i6ZqQ6JePXG5cbiAgfSxcbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyDpobXpnaLlhbPpl61cblxuICB9LFxuICBzdWJtaXRPcmRlcjogZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRoaXN5dCA9dGhpcztcbiAgICBpZiAodGhpcy5kYXRhLmFkZHJlc3NJZCA8PSAwKSB7XG4gICAgICB0aXAuc2hvd1RvYXN0KCfor7fpgInmi6nmlLbotKflnLDlnYAnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIGRhYXR5Lk9yZGVyU3VibWl0KHRoaXMuZGF0YS5jYXJ0SWQsdGhpcy5kYXRhLmFkZHJlc3NJZCx0aGlzLmRhdGEuY291cG9uSWQsbnVsbCxzdWNjZXNzRmF5KVxuICAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgICAgICAgICAgICAgaWYgKDA9PT0gMCkge1xuICAgICAgICBjb25zdCBvcmRlcklkID0gcmVzLmRhdGEub3JkZXJJZDtcbiAgICAgICAgLy8g5qih5ouf5pSv5LuY5oiQ5Yqf77yM5ZCM55CG77yM5ZCO5Y+w5Lmf5LuF5LuF5piv6L+U5Zue5LiA5Liq5oiQ5Yqf55qE5raI5oGv6ICM5beyXG4gICAgICAgIC8vIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIC8vICAgdGl0bGU6ICfnm67liY3kuI3og73lvq7kv6HmlK/ku5gnLFxuICAgICAgICAvLyAgIGNvbnRlbnQ6ICfngrnlh7vnoa7lrprmqKHmi5/mlK/ku5jmiJDlip/vvIzngrnlh7vlj5bmtojmqKHmi5/mnKrmlK/ku5jmiJDlip8nLFxuICAgICAgICAvLyAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAvLyAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgIC8vICBkYWF0eS5PcmRlclByZXBheSh0aGlzeXQuZGF0YS51c2VyaWQsb3JkZXJJZCxudWxsLHN1Y2Nlc3NGYXkpXG4gICAgICAgIC8vICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLCBzb3VyY2VPYmope1xuICAgICAgICAvLyAgICAgICAgIGlmIChyZXMuZXJybm8gPT09IDApIHtcbiAgICAgICAgLy8gICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAvLyAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvcGF5UmVzdWx0L3BheVJlc3VsdD9zdGF0dXM9MSZvcmRlcklkPScgKyBvcmRlcklkXG4gICAgICAgIC8vICAgICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgZWxzZXtcbiAgICAgICAgLy8gICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAvLyAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvcGF5UmVzdWx0L3BheVJlc3VsdD9zdGF0dXM9MCZvcmRlcklkPScgKyBvcmRlcklkXG4gICAgICAgIC8vICAgICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgLy8gICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgIC8vICAgICAgICAgdXJsOiAnL3BhZ2VzL3BheVJlc3VsdC9wYXlSZXN1bHQ/c3RhdHVzPTAmb3JkZXJJZD0nICsgb3JkZXJJZFxuICAgICAgICAvLyAgICAgICB9KTtcbiAgICAgICAgLy8gICAgIH1cblxuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfSk7XG4gZGFhdHkuT3JkZXJQcmVwYXkob3JkZXJJZCxudWxsLHN1Y2Nlc3NGYXkpXG4gICAgICBmdW5jdGlvbiBzdWNjZXNzRmF5KHJlcywgc291cmNlT2JqKXtcbiAgICAgICAgICAgaWYgKDAgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHBheVBhcmFtID0gcmVzLmRhdGE7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaUr+S7mOi/h+eoi+W8gOWni1wiKVxuICAgICAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAndGltZVN0YW1wJzogcGF5UGFyYW0udGltZVN0YW1wLFxuICAgICAgICAgICAgICAnbm9uY2VTdHInOiBwYXlQYXJhbS5ub25jZVN0cixcbiAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwYXlQYXJhbS5wYWNrYWdlVmFsdWUsXG4gICAgICAgICAgICAgICdzaWduVHlwZSc6IHBheVBhcmFtLnNpZ25UeXBlLFxuICAgICAgICAgICAgICAncGF5U2lnbic6IHBheVBhcmFtLnBheVNpZ24sXG4gICAgICAgICAgICAgICdzdWNjZXNzJzogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pSv5LuY6L+H56iL5oiQ5YqfXCIpXG4gICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvcGF5UmVzdWx0L3BheVJlc3VsdD9zdGF0dXM9MSZvcmRlcklkPScgKyBvcmRlcklkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICdmYWlsJzogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pSv5LuY6L+H56iL5aSx6LSlXCIpXG4gICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvcGF5UmVzdWx0L3BheVJlc3VsdD9zdGF0dXM9MCZvcmRlcklkPScgKyBvcmRlcklkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICdjb21wbGV0ZSc6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaUr+S7mOi/h+eoi+e7k+adn1wiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvcGF5UmVzdWx0L3BheVJlc3VsdD9zdGF0dXM9MCZvcmRlcklkPScgKyBvcmRlcklkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9wYXlSZXN1bHQvcGF5UmVzdWx0P3N0YXR1cz0wJm9yZGVySWQ9JyArIG9yZGVySWRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB9XG4gICAgXG4gIH1cbn0iXX0=