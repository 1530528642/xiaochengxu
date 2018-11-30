'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    status: false,
    orderId: 0
  },
  onLoad: function onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.orderId,
      status: options.status === '1' ? true : false
    });
  },
  onReady: function onReady() {},
  onShow: function onShow() {
    // 页面显示

  },
  onHide: function onHide() {
    // 页面隐藏

  },
  onUnload: function onUnload() {
    // 页面关闭

  },
  payOrder: function payOrder() {
    var that = this;
    // 模拟支付成功，同理，后台也仅仅是返回一个成功的消息而已
    // wx.showModal({
    //   title: '目前不能微信支付',
    //   content: '点击确定模拟支付成功，点击取消模拟未支付成功',
    //   success: function (res) {
    //     if (res.confirm) {
    //       util.request(api.OrderPrepay, { orderId: that.data.orderId }, 'POST').then(res => {
    //         if (res.errno === 0) {
    //           that.setData({
    //             status: true
    //           });
    //         }
    //         else {
    //           util.showErrorToast('支付失败');
    //         }
    //       });
    //     }
    //     else if (res.cancel) {
    //       util.showErrorToast('支付失败');
    //     }

    //   }
    // });
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
          that.setData({
            status: true
          });
        },
        'fail': function fail(res) {
          console.log("支付过程失败");
          util.showErrorToast('支付失败');
        },
        'complete': function complete(res) {
          console.log("支付过程结束");
        }
      });
    }
    // util.request(api.OrderPrepay, {
    //   orderId: that.data.orderId
    // }, 'POST').then(function (res) {
    //   if (res.errno === 0) {
    //     const payParam = res.data;
    //     console.log("支付过程开始")
    //     wx.requestPayment({
    //       'timeStamp': payParam.timeStamp,
    //       'nonceStr': payParam.nonceStr,
    //       'package': payParam.packageValue,
    //       'signType': payParam.signType,
    //       'paySign': payParam.paySign,
    //       'success': function (res) {
    //         console.log("支付过程成功")
    //         that.setData({
    //           status: true
    //         });
    //       },
    //       'fail': function (res) {
    //         console.log("支付过程失败")
    //         util.showErrorToast('支付失败');
    //       },
    //       'complete': function (res) {
    //         console.log("支付过程结束")
    //       }
    //     });
    //   }
    // });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheVJlc3VsdC53eHAiXSwibmFtZXMiOlsiZGF0YSIsInN0YXR1cyIsIm9yZGVySWQiLCJvbkxvYWQiLCJvcHRpb25zIiwic2V0RGF0YSIsIm9uUmVhZHkiLCJvblNob3ciLCJvbkhpZGUiLCJvblVubG9hZCIsInBheU9yZGVyIiwidGhhdCIsImRhYXR5IiwiT3JkZXJQcmVwYXkiLCJzdWNjZXNzRmF5IiwicmVzIiwic291cmNlT2JqIiwicGF5UGFyYW0iLCJjb25zb2xlIiwibG9nIiwid3giLCJyZXF1ZXN0UGF5bWVudCIsInRpbWVTdGFtcCIsIm5vbmNlU3RyIiwicGFja2FnZVZhbHVlIiwic2lnblR5cGUiLCJwYXlTaWduIiwidXRpbCIsInNob3dFcnJvclRvYXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLRUEsUUFBTTtBQUNKQyxZQUFRLEtBREo7QUFFSkMsYUFBUztBQUZMLEc7QUFJTkMsVUFBUSxnQkFBVUMsT0FBVixFQUFtQjtBQUN6QjtBQUNBLFNBQUtDLE9BQUwsQ0FBYTtBQUNYSCxlQUFTRSxRQUFRRixPQUROO0FBRVhELGNBQVFHLFFBQVFILE1BQVIsS0FBbUIsR0FBbkIsR0FBeUIsSUFBekIsR0FBZ0M7QUFGN0IsS0FBYjtBQUlELEc7QUFDREssV0FBUyxtQkFBWSxDQUVwQixDO0FBQ0RDLFVBQVEsa0JBQVk7QUFDbEI7O0FBRUQsRztBQUNEQyxVQUFRLGtCQUFZO0FBQ2xCOztBQUVELEc7QUFDREMsWUFBVSxvQkFBWTtBQUNwQjs7QUFFRCxHO0FBQ0RDLFUsc0JBQVc7QUFDVCxRQUFJQyxPQUFPLElBQVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDSkMsVUFBTUMsV0FBTixDQUFrQkYsS0FBS1gsSUFBTCxDQUFVRSxPQUE1QixFQUFvQyxJQUFwQyxFQUF5Q1ksVUFBekM7QUFDTSxhQUFTQSxVQUFULENBQW9CQyxHQUFwQixFQUF5QkMsU0FBekIsRUFBbUM7QUFDaEMsVUFBTUMsV0FBV0YsSUFBSWYsSUFBckI7QUFDRGtCLGNBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0FDLFNBQUdDLGNBQUgsQ0FBa0I7QUFDaEIscUJBQWFKLFNBQVNLLFNBRE47QUFFaEIsb0JBQVlMLFNBQVNNLFFBRkw7QUFHaEIsbUJBQVdOLFNBQVNPLFlBSEo7QUFJaEIsb0JBQVlQLFNBQVNRLFFBSkw7QUFLaEIsbUJBQVdSLFNBQVNTLE9BTEo7QUFNaEIsbUJBQVcsaUJBQVVYLEdBQVYsRUFBZTtBQUN4Qkcsa0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0FSLGVBQUtOLE9BQUwsQ0FBYTtBQUNYSixvQkFBUTtBQURHLFdBQWI7QUFHRCxTQVhlO0FBWWhCLGdCQUFRLGNBQVVjLEdBQVYsRUFBZTtBQUNyQkcsa0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0FRLGVBQUtDLGNBQUwsQ0FBb0IsTUFBcEI7QUFDRCxTQWZlO0FBZ0JoQixvQkFBWSxrQkFBVWIsR0FBVixFQUFlO0FBQ3pCRyxrQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQWxCZSxPQUFsQjtBQW9CRDtBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0QiLCJmaWxlIjoicGF5UmVzdWx0Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S7mOasvuivpuaDhScsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7fVxuICB9LFxuICBkYXRhOiB7XG4gICAgc3RhdHVzOiBmYWxzZSxcbiAgICBvcmRlcklkOiAwXG4gIH0sXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAvLyDpobXpnaLliJ3lp4vljJYgb3B0aW9uc+S4uumhtemdoui3s+i9rOaJgOW4puadpeeahOWPguaVsFxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBvcmRlcklkOiBvcHRpb25zLm9yZGVySWQsXG4gICAgICBzdGF0dXM6IG9wdGlvbnMuc3RhdHVzID09PSAnMScgPyB0cnVlIDogZmFsc2VcbiAgICB9KVxuICB9LFxuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgLy8g6aG16Z2i5pi+56S6XG5cbiAgfSxcbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8g6aG16Z2i6ZqQ6JePXG5cbiAgfSxcbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyDpobXpnaLlhbPpl61cblxuICB9LFxuICBwYXlPcmRlcigpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgLy8g5qih5ouf5pSv5LuY5oiQ5Yqf77yM5ZCM55CG77yM5ZCO5Y+w5Lmf5LuF5LuF5piv6L+U5Zue5LiA5Liq5oiQ5Yqf55qE5raI5oGv6ICM5beyXG4gICAgLy8gd3guc2hvd01vZGFsKHtcbiAgICAvLyAgIHRpdGxlOiAn55uu5YmN5LiN6IO95b6u5L+h5pSv5LuYJyxcbiAgICAvLyAgIGNvbnRlbnQ6ICfngrnlh7vnoa7lrprmqKHmi5/mlK/ku5jmiJDlip/vvIzngrnlh7vlj5bmtojmqKHmi5/mnKrmlK/ku5jmiJDlip8nLFxuICAgIC8vICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgIC8vICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAvLyAgICAgICB1dGlsLnJlcXVlc3QoYXBpLk9yZGVyUHJlcGF5LCB7IG9yZGVySWQ6IHRoYXQuZGF0YS5vcmRlcklkIH0sICdQT1NUJykudGhlbihyZXMgPT4ge1xuICAgIC8vICAgICAgICAgaWYgKHJlcy5lcnJubyA9PT0gMCkge1xuICAgIC8vICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgIC8vICAgICAgICAgICAgIHN0YXR1czogdHJ1ZVxuICAgIC8vICAgICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIGVsc2Uge1xuICAgIC8vICAgICAgICAgICB1dGlsLnNob3dFcnJvclRvYXN0KCfmlK/ku5jlpLHotKUnKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICB9KTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgLy8gICAgICAgdXRpbC5zaG93RXJyb3JUb2FzdCgn5pSv5LuY5aSx6LSlJyk7XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuZGFhdHkuT3JkZXJQcmVwYXkodGhhdC5kYXRhLm9yZGVySWQsbnVsbCxzdWNjZXNzRmF5KVxuICAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgICAgICBjb25zdCBwYXlQYXJhbSA9IHJlcy5kYXRhO1xuICAgICAgICBjb25zb2xlLmxvZyhcIuaUr+S7mOi/h+eoi+W8gOWni1wiKVxuICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgJ3RpbWVTdGFtcCc6IHBheVBhcmFtLnRpbWVTdGFtcCxcbiAgICAgICAgICAnbm9uY2VTdHInOiBwYXlQYXJhbS5ub25jZVN0cixcbiAgICAgICAgICAncGFja2FnZSc6IHBheVBhcmFtLnBhY2thZ2VWYWx1ZSxcbiAgICAgICAgICAnc2lnblR5cGUnOiBwYXlQYXJhbS5zaWduVHlwZSxcbiAgICAgICAgICAncGF5U2lnbic6IHBheVBhcmFtLnBheVNpZ24sXG4gICAgICAgICAgJ3N1Y2Nlc3MnOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaUr+S7mOi/h+eoi+aIkOWKn1wiKVxuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdmYWlsJzogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmlK/ku5jov4fnqIvlpLHotKVcIilcbiAgICAgICAgICAgIHV0aWwuc2hvd0Vycm9yVG9hc3QoJ+aUr+S7mOWksei0pScpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2NvbXBsZXRlJzogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmlK/ku5jov4fnqIvnu5PmnZ9cIilcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIC8vIHV0aWwucmVxdWVzdChhcGkuT3JkZXJQcmVwYXksIHtcbiAgICAvLyAgIG9yZGVySWQ6IHRoYXQuZGF0YS5vcmRlcklkXG4gICAgLy8gfSwgJ1BPU1QnKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAvLyAgIGlmIChyZXMuZXJybm8gPT09IDApIHtcbiAgICAvLyAgICAgY29uc3QgcGF5UGFyYW0gPSByZXMuZGF0YTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCLmlK/ku5jov4fnqIvlvIDlp4tcIilcbiAgICAvLyAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xuICAgIC8vICAgICAgICd0aW1lU3RhbXAnOiBwYXlQYXJhbS50aW1lU3RhbXAsXG4gICAgLy8gICAgICAgJ25vbmNlU3RyJzogcGF5UGFyYW0ubm9uY2VTdHIsXG4gICAgLy8gICAgICAgJ3BhY2thZ2UnOiBwYXlQYXJhbS5wYWNrYWdlVmFsdWUsXG4gICAgLy8gICAgICAgJ3NpZ25UeXBlJzogcGF5UGFyYW0uc2lnblR5cGUsXG4gICAgLy8gICAgICAgJ3BheVNpZ24nOiBwYXlQYXJhbS5wYXlTaWduLFxuICAgIC8vICAgICAgICdzdWNjZXNzJzogZnVuY3Rpb24gKHJlcykge1xuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCLmlK/ku5jov4fnqIvmiJDlip9cIilcbiAgICAvLyAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgLy8gICAgICAgICAgIHN0YXR1czogdHJ1ZVxuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgICAnZmFpbCc6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwi5pSv5LuY6L+H56iL5aSx6LSlXCIpXG4gICAgLy8gICAgICAgICB1dGlsLnNob3dFcnJvclRvYXN0KCfmlK/ku5jlpLHotKUnKTtcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgICdjb21wbGV0ZSc6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwi5pSv5LuY6L+H56iL57uT5p2fXCIpXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgfVxufSJdfQ==