"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
var cache = require("../../utils/cache.js");
var daaty = require("../../utils/api2.js");
exports.default = Page({
  data: {
    cartGoods: [],
    cartTotal: {
      "goodsCount": 0,
      "goodsAmount": 0.00,
      "checkedGoodsCount": 0,
      "checkedGoodsAmount": 0.00
    },
    isEditCart: false,
    checkedAllStatus: true,
    editCartList: [],
    hasLogin: false
  },
  onLoad: function onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    app.checkLoginStatus();
    console.log(888888999999);
    //  var userid = app.globalData.user.userId
    //  this.setData({userid:userid})
  },
  onReady: function onReady() {
    // 页面渲染完成
  },
  onShow: function onShow() {
    // 页面显示
    var loginFlag = cache.getSync('loginFlag');
    console.log(loginFlag);
    if (loginFlag) {
      this.getCartList();
    }

    this.setData({
      hasLogin: loginFlag
    });
  },
  onHide: function onHide() {
    // 页面隐藏
  },
  onUnload: function onUnload() {
    // 页面关闭
  },
  goLogin: function goLogin() {
    wx.navigateTo({ url: "/pages/auth/login/login" });
  },

  getCartList: function getCartList() {
    var that = this;
    //获取购物车的数据
    daaty.CartList(null, successFay);
    function successFay(res, sourceObj) {
      console.log(res, "checked");
      that.setData({
        cartGoods: res.data.cartList,
        cartTotal: res.data.cartTotal
      });

      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    }
  },
  isCheckedAll: function isCheckedAll() {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
  },
  doCheckedAll: function doCheckedAll() {
    var checkedAll = this.isCheckedAll();
    this.setData({
      checkedAllStatus: this.isCheckedAll()
    });
  },
  checkedItem: function checkedItem(event) {
    var itemIndex = event.target.dataset.itemIndex;
    // let id = event.target.dataset.id;
    var that = this;
    var productIds = [];
    productIds.push(that.data.cartGoods[itemIndex].id);
    if (!this.data.isEditCart) {
      var successFay = function successFay(res, sourceObj) {
        if (res.ret === 1) {
          that.setData({
            cartGoods: res.data.cartList,
            cartTotal: res.data.cartTotal
          });

          that.setData({
            checkedAllStatus: that.isCheckedAll()
          });
        }
      };

      //选择或取消选择商品
      daaty.CartChecked(productIds, that.data.cartGoods[itemIndex].checked ? 0 : 1, null, successFay);
    } else {
      //编辑状态
      var tmpCartData = this.data.cartGoods.map(function (element, index, array) {
        if (index == itemIndex) {
          element.checked = !element.checked;
        }

        return element;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }
  },
  getCheckedGoodsCount: function getCheckedGoodsCount() {
    var checkedGoodsCount = 0;
    this.data.cartGoods.forEach(function (v) {
      if (v.checked === true) {
        checkedGoodsCount += v.number;
      }
    });
    console.log(checkedGoodsCount);
    return checkedGoodsCount;
  },
  checkedAll: function checkedAll() {
    var that = this;
    if (!this.data.isEditCart) {
      var successFay = function successFay(res, sourceObj) {
        if (res.ret === 1) {
          that.setData({
            cartGoods: res.data.cartList,
            cartTotal: res.data.cartTotal
          });
        }
        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      };

      var productIds = this.data.cartGoods.map(function (v) {
        return v.id;
      });
      //选择或取消选择商品
      daaty.CartChecked(productIds, that.isCheckedAll() ? 0 : 1, null, successFay);
    } else {
      //编辑状态
      var checkedAllStatus = that.isCheckedAll();
      var tmpCartData = this.data.cartGoods.map(function (v) {
        v.checked = !checkedAllStatus;
        return v;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }
  },
  editCart: function editCart() {
    var that = this;
    if (this.data.isEditCart) {
      this.getCartList();
      this.setData({
        isEditCart: !this.data.isEditCart
      });
    } else {
      //编辑状态
      var tmpCartList = this.data.cartGoods.map(function (v) {
        v.checked = false;
        return v;
      });
      this.setData({
        editCartList: this.data.cartGoods,
        cartGoods: tmpCartList,
        isEditCart: !this.data.isEditCart,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }
  },
  updateCart: function updateCart(productId, goodsId, number, id) {
    var that = this;
    //更新购物车的商品
    daaty.CartUpdate(productId, goodsId, number, id, null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    }
  },
  cutNumber: function cutNumber(event) {
    var itemIndex = event.target.dataset.itemIndex;
    var cartItem = this.data.cartGoods[itemIndex];
    var number = cartItem.number - 1 > 1 ? cartItem.number - 1 : 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    this.updateCart(cartItem.productId, cartItem.goodsId, number, cartItem.id);
  },
  addNumber: function addNumber(event) {
    var itemIndex = event.target.dataset.itemIndex;
    var cartItem = this.data.cartGoods[itemIndex];
    var number = cartItem.number + 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    this.updateCart(cartItem.productId, cartItem.goodsId, number, cartItem.id);
  },
  checkoutOrder: function checkoutOrder() {
    //获取已选择的商品
    var that = this;

    var checkedGoods = this.data.cartGoods.filter(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });

    if (checkedGoods.length <= 0) {
      return false;
    }

    // storage中设置了cartId，则是购物车购买
    try {
      wx.setStorageSync('cartId', 0);
      wx.navigateTo({
        url: '../checkout/checkout'
      });
    } catch (e) {}
  },
  deleteCart: function deleteCart() {
    //获取已选择的商品
    var that = this;

    var productIds = this.data.cartGoods.filter(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
    if (productIds.length <= 0) {
      return false;
    }
    // console.log(productIdsArr)
    var productIdsArr = [];
    for (var i = 0; i < productIds.length; i++) {
      productIdsArr.push(productIds[i].id);
    }
    // console.log(productIdsArr)
    // productIds = productIds.map(function (element, index, array) {
    //   if (element.checked == true) {
    //     return element.productId;
    //   }
    // });
    // console.log(productIds,"productIds")
    //删除购物车的商品
    daaty.CartDelete(productIdsArr, null, successFay);
    function successFay(res, sourceObj) {
      if (res.ret === 1) {
        var cartList = res.data.cartList.map(function (v) {
          v.checked = false;
          return v;
        });

        that.setData({
          cartGoods: cartList,
          cartTotal: res.data.cartTotal
        });
      }

      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQud3hwIl0sIm5hbWVzIjpbImFwcCIsImdldEFwcCIsImNhY2hlIiwicmVxdWlyZSIsImRhYXR5IiwiZGF0YSIsImNhcnRHb29kcyIsImNhcnRUb3RhbCIsImlzRWRpdENhcnQiLCJjaGVja2VkQWxsU3RhdHVzIiwiZWRpdENhcnRMaXN0IiwiaGFzTG9naW4iLCJvbkxvYWQiLCJvcHRpb25zIiwiY2hlY2tMb2dpblN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJvblJlYWR5Iiwib25TaG93IiwibG9naW5GbGFnIiwiZ2V0U3luYyIsImdldENhcnRMaXN0Iiwic2V0RGF0YSIsIm9uSGlkZSIsIm9uVW5sb2FkIiwiZ29Mb2dpbiIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInRoYXQiLCJDYXJ0TGlzdCIsInN1Y2Nlc3NGYXkiLCJyZXMiLCJzb3VyY2VPYmoiLCJjYXJ0TGlzdCIsImlzQ2hlY2tlZEFsbCIsImV2ZXJ5IiwiZWxlbWVudCIsImluZGV4IiwiYXJyYXkiLCJjaGVja2VkIiwiZG9DaGVja2VkQWxsIiwiY2hlY2tlZEFsbCIsImNoZWNrZWRJdGVtIiwiZXZlbnQiLCJpdGVtSW5kZXgiLCJ0YXJnZXQiLCJkYXRhc2V0IiwicHJvZHVjdElkcyIsInB1c2giLCJpZCIsInJldCIsIkNhcnRDaGVja2VkIiwidG1wQ2FydERhdGEiLCJtYXAiLCJnZXRDaGVja2VkR29vZHNDb3VudCIsImNoZWNrZWRHb29kc0NvdW50IiwiZm9yRWFjaCIsInYiLCJudW1iZXIiLCJlZGl0Q2FydCIsInRtcENhcnRMaXN0IiwidXBkYXRlQ2FydCIsInByb2R1Y3RJZCIsImdvb2RzSWQiLCJDYXJ0VXBkYXRlIiwiY3V0TnVtYmVyIiwiY2FydEl0ZW0iLCJhZGROdW1iZXIiLCJjaGVja291dE9yZGVyIiwiY2hlY2tlZEdvb2RzIiwiZmlsdGVyIiwibGVuZ3RoIiwic2V0U3RvcmFnZVN5bmMiLCJlIiwiZGVsZXRlQ2FydCIsInByb2R1Y3RJZHNBcnIiLCJpIiwiQ2FydERlbGV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFJQSxNQUFNQyxRQUFWO0FBQ0EsSUFBSUMsUUFBU0MsUUFBUSxzQkFBUixDQUFiO0FBQ0EsSUFBSUMsUUFBU0QsUUFBUSxxQkFBUixDQUFiOztBQU1HRSxRQUFNO0FBQ0xDLGVBQVcsRUFETjtBQUVMQyxlQUFXO0FBQ1Qsb0JBQWMsQ0FETDtBQUVULHFCQUFlLElBRk47QUFHVCwyQkFBcUIsQ0FIWjtBQUlULDRCQUFzQjtBQUpiLEtBRk47QUFRTEMsZ0JBQVksS0FSUDtBQVNMQyxzQkFBa0IsSUFUYjtBQVVMQyxrQkFBYyxFQVZUO0FBV0xDLGNBQVU7QUFYTCxHO0FBYVBDLFVBQVEsZ0JBQVVDLE9BQVYsRUFBbUI7QUFDekI7QUFDQ2IsUUFBSWMsZ0JBQUo7QUFDQUMsWUFBUUMsR0FBUixDQUFZLFlBQVo7QUFDRDtBQUNBO0FBQ0QsRztBQUNEQyxXQUFTLG1CQUFZO0FBQ25CO0FBQ0QsRztBQUNEQyxVQUFRLGtCQUFZO0FBQ2xCO0FBQ0QsUUFBSUMsWUFBWWpCLE1BQU1rQixPQUFOLENBQWMsV0FBZCxDQUFoQjtBQUNDTCxZQUFRQyxHQUFSLENBQVlHLFNBQVo7QUFDQSxRQUFJQSxTQUFKLEVBQWM7QUFDWixXQUFLRSxXQUFMO0FBQ0Q7O0FBRUQsU0FBS0MsT0FBTCxDQUFhO0FBQ1hYLGdCQUFVUTtBQURDLEtBQWI7QUFJRCxHO0FBQ0RJLFVBQVEsa0JBQVk7QUFDbEI7QUFDRCxHO0FBQ0RDLFlBQVUsb0JBQVk7QUFDcEI7QUFDRCxHO0FBQ0RDLFMscUJBQVU7QUFDUkMsT0FBR0MsVUFBSCxDQUFjLEVBQUVDLEtBQUsseUJBQVAsRUFBZDtBQUNELEc7O0FBQ0RQLGVBQWEsdUJBQVk7QUFDdkIsUUFBSVEsT0FBTyxJQUFYO0FBQ0E7QUFDRXpCLFVBQU0wQixRQUFOLENBQWUsSUFBZixFQUFvQkMsVUFBcEI7QUFDQSxhQUFTQSxVQUFULENBQW9CQyxHQUFwQixFQUF5QkMsU0FBekIsRUFBbUM7QUFDakNsQixjQUFRQyxHQUFSLENBQVlnQixHQUFaLEVBQWdCLFNBQWhCO0FBQ0lILFdBQUtQLE9BQUwsQ0FBYTtBQUNYaEIsbUJBQVcwQixJQUFJM0IsSUFBSixDQUFTNkIsUUFEVDtBQUVYM0IsbUJBQVd5QixJQUFJM0IsSUFBSixDQUFTRTtBQUZULE9BQWI7O0FBS0FzQixXQUFLUCxPQUFMLENBQWE7QUFDWGIsMEJBQWtCb0IsS0FBS00sWUFBTDtBQURQLE9BQWI7QUFHTDtBQUNKLEc7QUFDREEsZ0JBQWMsd0JBQVk7QUFDeEI7QUFDQSxXQUFPLEtBQUs5QixJQUFMLENBQVVDLFNBQVYsQ0FBb0I4QixLQUFwQixDQUEwQixVQUFVQyxPQUFWLEVBQW1CQyxLQUFuQixFQUEwQkMsS0FBMUIsRUFBaUM7QUFDaEUsVUFBSUYsUUFBUUcsT0FBUixJQUFtQixJQUF2QixFQUE2QjtBQUMzQixlQUFPLElBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPLEtBQVA7QUFDRDtBQUNGLEtBTk0sQ0FBUDtBQU9ELEc7QUFDREMsZ0JBQWMsd0JBQVk7QUFDeEIsUUFBSUMsYUFBYSxLQUFLUCxZQUFMLEVBQWpCO0FBQ0EsU0FBS2IsT0FBTCxDQUFhO0FBQ1hiLHdCQUFrQixLQUFLMEIsWUFBTDtBQURQLEtBQWI7QUFHRCxHO0FBQ0RRLGVBQWEscUJBQVVDLEtBQVYsRUFBaUI7QUFDNUIsUUFBSUMsWUFBWUQsTUFBTUUsTUFBTixDQUFhQyxPQUFiLENBQXFCRixTQUFyQztBQUNBO0FBQ0EsUUFBSWhCLE9BQU8sSUFBWDtBQUNBLFFBQUltQixhQUFhLEVBQWpCO0FBQ0FBLGVBQVdDLElBQVgsQ0FBZ0JwQixLQUFLeEIsSUFBTCxDQUFVQyxTQUFWLENBQW9CdUMsU0FBcEIsRUFBK0JLLEVBQS9DO0FBQ0EsUUFBSSxDQUFDLEtBQUs3QyxJQUFMLENBQVVHLFVBQWYsRUFBMkI7QUFBQSxVQUdadUIsVUFIWSxHQUdyQixTQUFTQSxVQUFULENBQW9CQyxHQUFwQixFQUF5QkMsU0FBekIsRUFBbUM7QUFDL0IsWUFBSUQsSUFBSW1CLEdBQUosS0FBWSxDQUFoQixFQUFtQjtBQUNqQnRCLGVBQUtQLE9BQUwsQ0FBYTtBQUNYaEIsdUJBQVcwQixJQUFJM0IsSUFBSixDQUFTNkIsUUFEVDtBQUVYM0IsdUJBQVd5QixJQUFJM0IsSUFBSixDQUFTRTtBQUZULFdBQWI7O0FBS0FzQixlQUFLUCxPQUFMLENBQWE7QUFDWGIsOEJBQWtCb0IsS0FBS00sWUFBTDtBQURQLFdBQWI7QUFHSDtBQUNGLE9BZG9COztBQUN6QjtBQUNDL0IsWUFBTWdELFdBQU4sQ0FBa0JKLFVBQWxCLEVBQTZCbkIsS0FBS3hCLElBQUwsQ0FBVUMsU0FBVixDQUFvQnVDLFNBQXBCLEVBQStCTCxPQUEvQixHQUF5QyxDQUF6QyxHQUE2QyxDQUExRSxFQUE2RSxJQUE3RSxFQUFrRlQsVUFBbEY7QUFjRixLQWhCRCxNQWdCTztBQUNMO0FBQ0EsVUFBSXNCLGNBQWMsS0FBS2hELElBQUwsQ0FBVUMsU0FBVixDQUFvQmdELEdBQXBCLENBQXdCLFVBQVVqQixPQUFWLEVBQW1CQyxLQUFuQixFQUEwQkMsS0FBMUIsRUFBaUM7QUFDekUsWUFBSUQsU0FBU08sU0FBYixFQUF1QjtBQUNyQlIsa0JBQVFHLE9BQVIsR0FBa0IsQ0FBQ0gsUUFBUUcsT0FBM0I7QUFDRDs7QUFFRCxlQUFPSCxPQUFQO0FBQ0QsT0FOaUIsQ0FBbEI7O0FBUUFSLFdBQUtQLE9BQUwsQ0FBYTtBQUNYaEIsbUJBQVcrQyxXQURBO0FBRVg1QywwQkFBa0JvQixLQUFLTSxZQUFMLEVBRlA7QUFHWCx1Q0FBK0JOLEtBQUswQixvQkFBTDtBQUhwQixPQUFiO0FBS0Q7QUFDRixHO0FBQ0RBLHdCQUFzQixnQ0FBVTtBQUM5QixRQUFJQyxvQkFBb0IsQ0FBeEI7QUFDQSxTQUFLbkQsSUFBTCxDQUFVQyxTQUFWLENBQW9CbUQsT0FBcEIsQ0FBNEIsVUFBVUMsQ0FBVixFQUFhO0FBQ3ZDLFVBQUlBLEVBQUVsQixPQUFGLEtBQWMsSUFBbEIsRUFBd0I7QUFDdEJnQiw2QkFBcUJFLEVBQUVDLE1BQXZCO0FBQ0Q7QUFDRixLQUpEO0FBS0E1QyxZQUFRQyxHQUFSLENBQVl3QyxpQkFBWjtBQUNBLFdBQU9BLGlCQUFQO0FBQ0QsRztBQUNEZCxjQUFZLHNCQUFZO0FBQ3RCLFFBQUliLE9BQU8sSUFBWDtBQUNBLFFBQUksQ0FBQyxLQUFLeEIsSUFBTCxDQUFVRyxVQUFmLEVBQTJCO0FBQUEsVUFNWnVCLFVBTlksR0FNckIsU0FBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLFNBQXpCLEVBQW1DO0FBQ3pCLFlBQUlELElBQUltQixHQUFKLEtBQVksQ0FBaEIsRUFBbUI7QUFDbkJ0QixlQUFLUCxPQUFMLENBQWE7QUFDWGhCLHVCQUFXMEIsSUFBSTNCLElBQUosQ0FBUzZCLFFBRFQ7QUFFWDNCLHVCQUFXeUIsSUFBSTNCLElBQUosQ0FBU0U7QUFGVCxXQUFiO0FBSUQ7QUFDSHNCLGFBQUtQLE9BQUwsQ0FBYTtBQUNYYiw0QkFBa0JvQixLQUFLTSxZQUFMO0FBRFAsU0FBYjtBQUdMLE9BaEJvQjs7QUFDekIsVUFBSWEsYUFBYSxLQUFLM0MsSUFBTCxDQUFVQyxTQUFWLENBQW9CZ0QsR0FBcEIsQ0FBd0IsVUFBVUksQ0FBVixFQUFhO0FBQ3BELGVBQU9BLEVBQUVSLEVBQVQ7QUFDRCxPQUZnQixDQUFqQjtBQUdBO0FBQ0U5QyxZQUFNZ0QsV0FBTixDQUFrQkosVUFBbEIsRUFBNkJuQixLQUFLTSxZQUFMLEtBQXNCLENBQXRCLEdBQTBCLENBQXZELEVBQTBELElBQTFELEVBQStESixVQUEvRDtBQVlILEtBakJELE1BaUJPO0FBQ0w7QUFDQSxVQUFJdEIsbUJBQW1Cb0IsS0FBS00sWUFBTCxFQUF2QjtBQUNBLFVBQUlrQixjQUFjLEtBQUtoRCxJQUFMLENBQVVDLFNBQVYsQ0FBb0JnRCxHQUFwQixDQUF3QixVQUFVSSxDQUFWLEVBQWE7QUFDckRBLFVBQUVsQixPQUFGLEdBQVksQ0FBQy9CLGdCQUFiO0FBQ0EsZUFBT2lELENBQVA7QUFDRCxPQUhpQixDQUFsQjs7QUFLQTdCLFdBQUtQLE9BQUwsQ0FBYTtBQUNYaEIsbUJBQVcrQyxXQURBO0FBRVg1QywwQkFBa0JvQixLQUFLTSxZQUFMLEVBRlA7QUFHWCx1Q0FBK0JOLEtBQUswQixvQkFBTDtBQUhwQixPQUFiO0FBS0Q7QUFFRixHO0FBQ0RLLFlBQVUsb0JBQVk7QUFDcEIsUUFBSS9CLE9BQU8sSUFBWDtBQUNBLFFBQUksS0FBS3hCLElBQUwsQ0FBVUcsVUFBZCxFQUEwQjtBQUN4QixXQUFLYSxXQUFMO0FBQ0EsV0FBS0MsT0FBTCxDQUFhO0FBQ1hkLG9CQUFZLENBQUMsS0FBS0gsSUFBTCxDQUFVRztBQURaLE9BQWI7QUFHRCxLQUxELE1BS087QUFDTDtBQUNBLFVBQUlxRCxjQUFjLEtBQUt4RCxJQUFMLENBQVVDLFNBQVYsQ0FBb0JnRCxHQUFwQixDQUF3QixVQUFVSSxDQUFWLEVBQWE7QUFDckRBLFVBQUVsQixPQUFGLEdBQVksS0FBWjtBQUNBLGVBQU9rQixDQUFQO0FBQ0QsT0FIaUIsQ0FBbEI7QUFJQSxXQUFLcEMsT0FBTCxDQUFhO0FBQ1haLHNCQUFjLEtBQUtMLElBQUwsQ0FBVUMsU0FEYjtBQUVYQSxtQkFBV3VELFdBRkE7QUFHWHJELG9CQUFZLENBQUMsS0FBS0gsSUFBTCxDQUFVRyxVQUhaO0FBSVhDLDBCQUFrQm9CLEtBQUtNLFlBQUwsRUFKUDtBQUtYLHVDQUErQk4sS0FBSzBCLG9CQUFMO0FBTHBCLE9BQWI7QUFPRDtBQUVGLEc7QUFDRE8sY0FBWSxvQkFBVUMsU0FBVixFQUFxQkMsT0FBckIsRUFBOEJMLE1BQTlCLEVBQXNDVCxFQUF0QyxFQUEwQztBQUNwRCxRQUFJckIsT0FBTyxJQUFYO0FBQ0E7QUFDSHpCLFVBQU02RCxVQUFOLENBQWlCRixTQUFqQixFQUEyQkMsT0FBM0IsRUFBbUNMLE1BQW5DLEVBQTBDVCxFQUExQyxFQUE2QyxJQUE3QyxFQUFrRG5CLFVBQWxEO0FBQ1MsYUFBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLFNBQXpCLEVBQW1DO0FBQzFCSixXQUFLUCxPQUFMLENBQWE7QUFDWmIsMEJBQWtCb0IsS0FBS00sWUFBTDtBQUROLE9BQWI7QUFHUjtBQUNSLEc7QUFDRCtCLGFBQVcsbUJBQVV0QixLQUFWLEVBQWlCO0FBQzFCLFFBQUlDLFlBQVlELE1BQU1FLE1BQU4sQ0FBYUMsT0FBYixDQUFxQkYsU0FBckM7QUFDQSxRQUFJc0IsV0FBVyxLQUFLOUQsSUFBTCxDQUFVQyxTQUFWLENBQW9CdUMsU0FBcEIsQ0FBZjtBQUNBLFFBQUljLFNBQVVRLFNBQVNSLE1BQVQsR0FBa0IsQ0FBbEIsR0FBc0IsQ0FBdkIsR0FBNEJRLFNBQVNSLE1BQVQsR0FBa0IsQ0FBOUMsR0FBa0QsQ0FBL0Q7QUFDQVEsYUFBU1IsTUFBVCxHQUFrQkEsTUFBbEI7QUFDQSxTQUFLckMsT0FBTCxDQUFhO0FBQ1hoQixpQkFBVyxLQUFLRCxJQUFMLENBQVVDO0FBRFYsS0FBYjtBQUdBLFNBQUt3RCxVQUFMLENBQWdCSyxTQUFTSixTQUF6QixFQUFvQ0ksU0FBU0gsT0FBN0MsRUFBc0RMLE1BQXRELEVBQThEUSxTQUFTakIsRUFBdkU7QUFDRCxHO0FBQ0RrQixhQUFXLG1CQUFVeEIsS0FBVixFQUFpQjtBQUMxQixRQUFJQyxZQUFZRCxNQUFNRSxNQUFOLENBQWFDLE9BQWIsQ0FBcUJGLFNBQXJDO0FBQ0EsUUFBSXNCLFdBQVcsS0FBSzlELElBQUwsQ0FBVUMsU0FBVixDQUFvQnVDLFNBQXBCLENBQWY7QUFDQSxRQUFJYyxTQUFTUSxTQUFTUixNQUFULEdBQWtCLENBQS9CO0FBQ0FRLGFBQVNSLE1BQVQsR0FBa0JBLE1BQWxCO0FBQ0EsU0FBS3JDLE9BQUwsQ0FBYTtBQUNYaEIsaUJBQVcsS0FBS0QsSUFBTCxDQUFVQztBQURWLEtBQWI7QUFHQSxTQUFLd0QsVUFBTCxDQUFnQkssU0FBU0osU0FBekIsRUFBb0NJLFNBQVNILE9BQTdDLEVBQXNETCxNQUF0RCxFQUE4RFEsU0FBU2pCLEVBQXZFO0FBRUQsRztBQUNEbUIsaUJBQWUseUJBQVk7QUFDekI7QUFDQSxRQUFJeEMsT0FBTyxJQUFYOztBQUVBLFFBQUl5QyxlQUFlLEtBQUtqRSxJQUFMLENBQVVDLFNBQVYsQ0FBb0JpRSxNQUFwQixDQUEyQixVQUFVbEMsT0FBVixFQUFtQkMsS0FBbkIsRUFBMEJDLEtBQTFCLEVBQWlDO0FBQzdFLFVBQUlGLFFBQVFHLE9BQVIsSUFBbUIsSUFBdkIsRUFBNkI7QUFDM0IsZUFBTyxJQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBTyxLQUFQO0FBQ0Q7QUFDRixLQU5rQixDQUFuQjs7QUFRQSxRQUFJOEIsYUFBYUUsTUFBYixJQUF1QixDQUEzQixFQUE4QjtBQUM1QixhQUFPLEtBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQUk7QUFDRjlDLFNBQUcrQyxjQUFILENBQWtCLFFBQWxCLEVBQTRCLENBQTVCO0FBQ0EvQyxTQUFHQyxVQUFILENBQWM7QUFDWkMsYUFBSztBQURPLE9BQWQ7QUFHRCxLQUxELENBS0UsT0FBTzhDLENBQVAsRUFBVSxDQUNYO0FBRUYsRztBQUNEQyxjQUFZLHNCQUFZO0FBQ3RCO0FBQ0EsUUFBSTlDLE9BQU8sSUFBWDs7QUFFQSxRQUFJbUIsYUFBYSxLQUFLM0MsSUFBTCxDQUFVQyxTQUFWLENBQW9CaUUsTUFBcEIsQ0FBMkIsVUFBVWxDLE9BQVYsRUFBbUJDLEtBQW5CLEVBQTBCQyxLQUExQixFQUFpQztBQUMzRSxVQUFJRixRQUFRRyxPQUFSLElBQW1CLElBQXZCLEVBQTZCO0FBQzNCLGVBQU8sSUFBUDtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU8sS0FBUDtBQUNEO0FBQ0YsS0FOZ0IsQ0FBakI7QUFPQSxRQUFJUSxXQUFXd0IsTUFBWCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixhQUFPLEtBQVA7QUFDRDtBQUNEO0FBQ0EsUUFBSUksZ0JBQWUsRUFBbkI7QUFDQSxTQUFJLElBQUlDLElBQUUsQ0FBVixFQUFZQSxJQUFFN0IsV0FBV3dCLE1BQXpCLEVBQWdDSyxHQUFoQyxFQUFvQztBQUM5QkQsb0JBQWMzQixJQUFkLENBQW1CRCxXQUFXNkIsQ0FBWCxFQUFjM0IsRUFBakM7QUFDTDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0o7QUFDQzlDLFVBQU0wRSxVQUFOLENBQWlCRixhQUFqQixFQUErQixJQUEvQixFQUFvQzdDLFVBQXBDO0FBQ1MsYUFBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLFNBQXpCLEVBQW1DO0FBQy9CLFVBQUlELElBQUltQixHQUFKLEtBQVksQ0FBaEIsRUFBbUI7QUFDakIsWUFBSWpCLFdBQVdGLElBQUkzQixJQUFKLENBQVM2QixRQUFULENBQWtCb0IsR0FBbEIsQ0FBc0IsYUFBSztBQUN4Q0ksWUFBRWxCLE9BQUYsR0FBWSxLQUFaO0FBQ0EsaUJBQU9rQixDQUFQO0FBQ0QsU0FIYyxDQUFmOztBQUtBN0IsYUFBS1AsT0FBTCxDQUFhO0FBQ1hoQixxQkFBVzRCLFFBREE7QUFFWDNCLHFCQUFXeUIsSUFBSTNCLElBQUosQ0FBU0U7QUFGVCxTQUFiO0FBSUQ7O0FBRURzQixXQUFLUCxPQUFMLENBQWE7QUFDWGIsMEJBQWtCb0IsS0FBS00sWUFBTDtBQURQLE9BQWI7QUFHSDtBQUNSIiwiZmlsZSI6ImNhcnQud3hwIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGdldEFwcCgpO1xudmFyIGNhY2hlID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy9jYWNoZS5qc1wiKVxudmFyIGRhYXR5ID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy9hcGkyLmpzXCIpXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotK3nianovaYnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge31cbiAgfSxcbiAgIGRhdGE6IHtcbiAgICBjYXJ0R29vZHM6IFtdLFxuICAgIGNhcnRUb3RhbDoge1xuICAgICAgXCJnb29kc0NvdW50XCI6IDAsXG4gICAgICBcImdvb2RzQW1vdW50XCI6IDAuMDAsXG4gICAgICBcImNoZWNrZWRHb29kc0NvdW50XCI6IDAsXG4gICAgICBcImNoZWNrZWRHb29kc0Ftb3VudFwiOiAwLjAwXG4gICAgfSxcbiAgICBpc0VkaXRDYXJ0OiBmYWxzZSxcbiAgICBjaGVja2VkQWxsU3RhdHVzOiB0cnVlLFxuICAgIGVkaXRDYXJ0TGlzdDogW10sXG4gICAgaGFzTG9naW46IGZhbHNlXG4gIH0sXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAvLyDpobXpnaLliJ3lp4vljJYgb3B0aW9uc+S4uumhtemdoui3s+i9rOaJgOW4puadpeeahOWPguaVsFxuICAgICBhcHAuY2hlY2tMb2dpblN0YXR1cygpO1xuICAgICBjb25zb2xlLmxvZyg4ODg4ODg5OTk5OTkpXG4gICAgLy8gIHZhciB1c2VyaWQgPSBhcHAuZ2xvYmFsRGF0YS51c2VyLnVzZXJJZFxuICAgIC8vICB0aGlzLnNldERhdGEoe3VzZXJpZDp1c2VyaWR9KVxuICB9LFxuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgLy8g6aG16Z2i5riy5p+T5a6M5oiQXG4gIH0sXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdouaYvuekulxuICAgdmFyIGxvZ2luRmxhZyA9IGNhY2hlLmdldFN5bmMoJ2xvZ2luRmxhZycpO1xuICAgIGNvbnNvbGUubG9nKGxvZ2luRmxhZylcbiAgICBpZiAobG9naW5GbGFnKXtcbiAgICAgIHRoaXMuZ2V0Q2FydExpc3QoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgaGFzTG9naW46IGxvZ2luRmxhZ1xuICAgIH0pO1xuXG4gIH0sXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdoumakOiXj1xuICB9LFxuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdouWFs+mXrVxuICB9LFxuICBnb0xvZ2luKCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6IFwiL3BhZ2VzL2F1dGgvbG9naW4vbG9naW5cIiB9KTtcbiAgfSxcbiAgZ2V0Q2FydExpc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgLy/ojrflj5botK3nianovabnmoTmlbDmja5cbiAgICAgIGRhYXR5LkNhcnRMaXN0KG51bGwsc3VjY2Vzc0ZheSlcbiAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLCBzb3VyY2VPYmope1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMsXCJjaGVja2VkXCIpXG4gICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICBjYXJ0R29vZHM6IHJlcy5kYXRhLmNhcnRMaXN0LFxuICAgICAgICAgICAgICBjYXJ0VG90YWw6IHJlcy5kYXRhLmNhcnRUb3RhbFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIGNoZWNrZWRBbGxTdGF0dXM6IHRoYXQuaXNDaGVja2VkQWxsKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgfVxuICB9LFxuICBpc0NoZWNrZWRBbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAvL+WIpOaWrei0reeJqei9puWVhuWTgeW3suWFqOmAiVxuICAgIHJldHVybiB0aGlzLmRhdGEuY2FydEdvb2RzLmV2ZXJ5KGZ1bmN0aW9uIChlbGVtZW50LCBpbmRleCwgYXJyYXkpIHtcbiAgICAgIGlmIChlbGVtZW50LmNoZWNrZWQgPT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgZG9DaGVja2VkQWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGNoZWNrZWRBbGwgPSB0aGlzLmlzQ2hlY2tlZEFsbCgpXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGNoZWNrZWRBbGxTdGF0dXM6IHRoaXMuaXNDaGVja2VkQWxsKClcbiAgICB9KTtcbiAgfSxcbiAgY2hlY2tlZEl0ZW06IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGxldCBpdGVtSW5kZXggPSBldmVudC50YXJnZXQuZGF0YXNldC5pdGVtSW5kZXg7XG4gICAgLy8gbGV0IGlkID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuaWQ7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCBwcm9kdWN0SWRzID0gW107XG4gICAgcHJvZHVjdElkcy5wdXNoKHRoYXQuZGF0YS5jYXJ0R29vZHNbaXRlbUluZGV4XS5pZCk7XG4gICAgaWYgKCF0aGlzLmRhdGEuaXNFZGl0Q2FydCkge1xuICAgICAgLy/pgInmi6nmiJblj5bmtojpgInmi6nllYblk4FcbiAgICAgICBkYWF0eS5DYXJ0Q2hlY2tlZChwcm9kdWN0SWRzLHRoYXQuZGF0YS5jYXJ0R29vZHNbaXRlbUluZGV4XS5jaGVja2VkID8gMCA6IDEgLG51bGwsc3VjY2Vzc0ZheSlcbiAgICAgICAgICBmdW5jdGlvbiBzdWNjZXNzRmF5KHJlcywgc291cmNlT2JqKXtcbiAgICAgICAgICAgICAgaWYgKHJlcy5yZXQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgY2FydEdvb2RzOiByZXMuZGF0YS5jYXJ0TGlzdCxcbiAgICAgICAgICAgICAgICAgIGNhcnRUb3RhbDogcmVzLmRhdGEuY2FydFRvdGFsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgY2hlY2tlZEFsbFN0YXR1czogdGhhdC5pc0NoZWNrZWRBbGwoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgXG4gICAgfSBlbHNlIHtcbiAgICAgIC8v57yW6L6R54q25oCBXG4gICAgICBsZXQgdG1wQ2FydERhdGEgPSB0aGlzLmRhdGEuY2FydEdvb2RzLm1hcChmdW5jdGlvbiAoZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XG4gICAgICAgIGlmIChpbmRleCA9PSBpdGVtSW5kZXgpe1xuICAgICAgICAgIGVsZW1lbnQuY2hlY2tlZCA9ICFlbGVtZW50LmNoZWNrZWQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgIGNhcnRHb29kczogdG1wQ2FydERhdGEsXG4gICAgICAgIGNoZWNrZWRBbGxTdGF0dXM6IHRoYXQuaXNDaGVja2VkQWxsKCksXG4gICAgICAgICdjYXJ0VG90YWwuY2hlY2tlZEdvb2RzQ291bnQnOiB0aGF0LmdldENoZWNrZWRHb29kc0NvdW50KClcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgZ2V0Q2hlY2tlZEdvb2RzQ291bnQ6IGZ1bmN0aW9uKCl7XG4gICAgbGV0IGNoZWNrZWRHb29kc0NvdW50ID0gMDtcbiAgICB0aGlzLmRhdGEuY2FydEdvb2RzLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgIGlmICh2LmNoZWNrZWQgPT09IHRydWUpIHtcbiAgICAgICAgY2hlY2tlZEdvb2RzQ291bnQgKz0gdi5udW1iZXI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coY2hlY2tlZEdvb2RzQ291bnQpO1xuICAgIHJldHVybiBjaGVja2VkR29vZHNDb3VudDtcbiAgfSxcbiAgY2hlY2tlZEFsbDogZnVuY3Rpb24gKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBpZiAoIXRoaXMuZGF0YS5pc0VkaXRDYXJ0KSB7XG4gICAgICB2YXIgcHJvZHVjdElkcyA9IHRoaXMuZGF0YS5jYXJ0R29vZHMubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiB2LmlkO1xuICAgICAgfSk7XG4gICAgICAvL+mAieaLqeaIluWPlua2iOmAieaLqeWVhuWTgVxuICAgICAgICBkYWF0eS5DYXJ0Q2hlY2tlZChwcm9kdWN0SWRzLHRoYXQuaXNDaGVja2VkQWxsKCkgPyAwIDogMSAsbnVsbCxzdWNjZXNzRmF5KVxuICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLCBzb3VyY2VPYmope1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnJldCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgIGNhcnRHb29kczogcmVzLmRhdGEuY2FydExpc3QsXG4gICAgICAgICAgICAgICAgICAgICAgY2FydFRvdGFsOiByZXMuZGF0YS5jYXJ0VG90YWxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWRBbGxTdGF0dXM6IHRoYXQuaXNDaGVja2VkQWxsKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8v57yW6L6R54q25oCBXG4gICAgICBsZXQgY2hlY2tlZEFsbFN0YXR1cyA9IHRoYXQuaXNDaGVja2VkQWxsKCk7XG4gICAgICBsZXQgdG1wQ2FydERhdGEgPSB0aGlzLmRhdGEuY2FydEdvb2RzLm1hcChmdW5jdGlvbiAodikge1xuICAgICAgICB2LmNoZWNrZWQgPSAhY2hlY2tlZEFsbFN0YXR1cztcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgY2FydEdvb2RzOiB0bXBDYXJ0RGF0YSxcbiAgICAgICAgY2hlY2tlZEFsbFN0YXR1czogdGhhdC5pc0NoZWNrZWRBbGwoKSxcbiAgICAgICAgJ2NhcnRUb3RhbC5jaGVja2VkR29vZHNDb3VudCc6IHRoYXQuZ2V0Q2hlY2tlZEdvb2RzQ291bnQoKVxuICAgICAgfSk7XG4gICAgfVxuXG4gIH0sXG4gIGVkaXRDYXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGlmICh0aGlzLmRhdGEuaXNFZGl0Q2FydCkge1xuICAgICAgdGhpcy5nZXRDYXJ0TGlzdCgpO1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgaXNFZGl0Q2FydDogIXRoaXMuZGF0YS5pc0VkaXRDYXJ0XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy/nvJbovpHnirbmgIFcbiAgICAgIGxldCB0bXBDYXJ0TGlzdCA9IHRoaXMuZGF0YS5jYXJ0R29vZHMubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHYuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgZWRpdENhcnRMaXN0OiB0aGlzLmRhdGEuY2FydEdvb2RzLFxuICAgICAgICBjYXJ0R29vZHM6IHRtcENhcnRMaXN0LFxuICAgICAgICBpc0VkaXRDYXJ0OiAhdGhpcy5kYXRhLmlzRWRpdENhcnQsXG4gICAgICAgIGNoZWNrZWRBbGxTdGF0dXM6IHRoYXQuaXNDaGVja2VkQWxsKCksXG4gICAgICAgICdjYXJ0VG90YWwuY2hlY2tlZEdvb2RzQ291bnQnOiB0aGF0LmdldENoZWNrZWRHb29kc0NvdW50KClcbiAgICAgIH0pO1xuICAgIH1cblxuICB9LFxuICB1cGRhdGVDYXJ0OiBmdW5jdGlvbiAocHJvZHVjdElkLCBnb29kc0lkLCBudW1iZXIsIGlkKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIC8v5pu05paw6LSt54mp6L2m55qE5ZWG5ZOBXG4gZGFhdHkuQ2FydFVwZGF0ZShwcm9kdWN0SWQsZ29vZHNJZCxudW1iZXIsaWQsbnVsbCxzdWNjZXNzRmF5KVxuICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLCBzb3VyY2VPYmope1xuICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWRBbGxTdGF0dXM6IHRoYXQuaXNDaGVja2VkQWxsKClcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgfSxcbiAgY3V0TnVtYmVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBsZXQgaXRlbUluZGV4ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuaXRlbUluZGV4O1xuICAgIGxldCBjYXJ0SXRlbSA9IHRoaXMuZGF0YS5jYXJ0R29vZHNbaXRlbUluZGV4XTtcbiAgICBsZXQgbnVtYmVyID0gKGNhcnRJdGVtLm51bWJlciAtIDEgPiAxKSA/IGNhcnRJdGVtLm51bWJlciAtIDEgOiAxO1xuICAgIGNhcnRJdGVtLm51bWJlciA9IG51bWJlcjtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgY2FydEdvb2RzOiB0aGlzLmRhdGEuY2FydEdvb2RzXG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGVDYXJ0KGNhcnRJdGVtLnByb2R1Y3RJZCwgY2FydEl0ZW0uZ29vZHNJZCwgbnVtYmVyLCBjYXJ0SXRlbS5pZCk7XG4gIH0sXG4gIGFkZE51bWJlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgbGV0IGl0ZW1JbmRleCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lml0ZW1JbmRleDtcbiAgICBsZXQgY2FydEl0ZW0gPSB0aGlzLmRhdGEuY2FydEdvb2RzW2l0ZW1JbmRleF07XG4gICAgbGV0IG51bWJlciA9IGNhcnRJdGVtLm51bWJlciArIDE7XG4gICAgY2FydEl0ZW0ubnVtYmVyID0gbnVtYmVyO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBjYXJ0R29vZHM6IHRoaXMuZGF0YS5jYXJ0R29vZHNcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZUNhcnQoY2FydEl0ZW0ucHJvZHVjdElkLCBjYXJ0SXRlbS5nb29kc0lkLCBudW1iZXIsIGNhcnRJdGVtLmlkKTtcblxuICB9LFxuICBjaGVja291dE9yZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgLy/ojrflj5blt7LpgInmi6nnmoTllYblk4FcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICB2YXIgY2hlY2tlZEdvb2RzID0gdGhpcy5kYXRhLmNhcnRHb29kcy5maWx0ZXIoZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4LCBhcnJheSkge1xuICAgICAgaWYgKGVsZW1lbnQuY2hlY2tlZCA9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGNoZWNrZWRHb29kcy5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHN0b3JhZ2XkuK3orr7nva7kuoZjYXJ0SWTvvIzliJnmmK/otK3nianovabotK3kubBcbiAgICB0cnkge1xuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2NhcnRJZCcsIDApO1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4uL2NoZWNrb3V0L2NoZWNrb3V0J1xuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuXG4gIH0sXG4gIGRlbGV0ZUNhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAvL+iOt+WPluW3sumAieaLqeeahOWVhuWTgVxuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIGxldCBwcm9kdWN0SWRzID0gdGhpcy5kYXRhLmNhcnRHb29kcy5maWx0ZXIoZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4LCBhcnJheSkge1xuICAgICAgaWYgKGVsZW1lbnQuY2hlY2tlZCA9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChwcm9kdWN0SWRzLmxlbmd0aCA8PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHByb2R1Y3RJZHNBcnIpXG4gICAgbGV0IHByb2R1Y3RJZHNBcnIgPVtdXG4gICAgZm9yKHZhciBpPTA7aTxwcm9kdWN0SWRzLmxlbmd0aDtpKyspe1xuICAgICAgICAgIHByb2R1Y3RJZHNBcnIucHVzaChwcm9kdWN0SWRzW2ldLmlkKVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhwcm9kdWN0SWRzQXJyKVxuICAgIC8vIHByb2R1Y3RJZHMgPSBwcm9kdWN0SWRzLm1hcChmdW5jdGlvbiAoZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XG4gICAgLy8gICBpZiAoZWxlbWVudC5jaGVja2VkID09IHRydWUpIHtcbiAgICAvLyAgICAgcmV0dXJuIGVsZW1lbnQucHJvZHVjdElkO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICAgIC8vIGNvbnNvbGUubG9nKHByb2R1Y3RJZHMsXCJwcm9kdWN0SWRzXCIpXG4vL+WIoOmZpOi0reeJqei9pueahOWVhuWTgVxuIGRhYXR5LkNhcnREZWxldGUocHJvZHVjdElkc0FycixudWxsLHN1Y2Nlc3NGYXkpXG4gICAgICAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgICAgICAgICAgIGlmIChyZXMucmV0ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhcnRMaXN0ID0gcmVzLmRhdGEuY2FydExpc3QubWFwKHYgPT4ge1xuICAgICAgICAgICAgICAgICAgdi5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICBjYXJ0R29vZHM6IGNhcnRMaXN0LFxuICAgICAgICAgICAgICAgICAgY2FydFRvdGFsOiByZXMuZGF0YS5jYXJ0VG90YWxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgY2hlY2tlZEFsbFN0YXR1czogdGhhdC5pc0NoZWNrZWRBbGwoKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gIH1cbn0iXX0=