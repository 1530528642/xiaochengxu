"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var daaty = require("../../utils/api2.js");
var utily = require("../../utils/util.js");
var crettime = require("../../utils/dateutils.js");
var app = getApp();
exports.default = Page({
  data: {
    id: 0,
    goods: {},
    attribute: [],
    issueList: [],
    comment: [],
    brand: {},
    specificationList: [],
    productList: [],
    relatedGoods: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '规格数量选择',
    tmpSpecText: '请选择规格数量',
    checkedSpecPrice: 0,
    openAttr: false,
    noCollectImage: '../../common/assets/tab/icon_collect.png',
    hasCollectImage: '../../common/assets/tab/icon_collect_checked.png',
    collectImage: '../../common/assets/tab/icon_collect.png',
    shareImage: '',
    soldout: false
  },

  onPullDownRefresh: function onPullDownRefresh() {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.getGoodsInfo();
    wx.hideNavigationBarLoading(); //完成停止加载
    wx.stopPullDownRefresh(); //停止下拉刷新
  },


  saveShare: function saveShare() {
    var that = this;
    wx.downloadFile({
      url: that.data.shareImage,
      success: function success(res) {
        // console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function success(res) {
            wx.showModal({
              title: '存图成功',
              content: '图片成功保存到相册了，可以分享到朋友圈了',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#a78845',
              success: function success(res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                }
              }
            });
          },
          fail: function fail(res) {
            console.log('fail');
          }
        });
      },
      fail: function fail() {
        console.log('fail');
      }
    });
  },
  getGoodsInfo: function getGoodsInfo() {
    var that = this;
    var newarr = [];
    daaty.GoodsDetail(that.data.id, null, successFay);
    function successFay(res, sourceObj) {
      console.log(res, "res");
      var _specificationList = res.data.specificationList;
      // console.log(res.data,888889999)
      // 如果仅仅存在一种货品，那么商品页面初始化时默认checked
      if (_specificationList.length == 1) {
        if (_specificationList[0].valueList.length == 1) {
          _specificationList[0].valueList[0].checked = true;

          // 如果仅仅存在一种货品，那么商品价格应该和货品价格一致
          // 这里检测一下
          var _productPrice = res.data.productList[0].price;
          var _goodsPrice = res.data.info.retailPrice;
          if (_productPrice != _goodsPrice) {
            console.error('商品数量价格和货品不一致');
          }

          that.setData({
            checkedSpecText: _specificationList[0].valueList[0].value,
            tmpSpecText: '已选择：' + _specificationList[0].valueList[0].value
          });
        }
      }
      for (var i = 0; i < res.data.comment.data.length; i++) {
        res.data.comment.data[i].addTime = crettime.getDate(res.data.comment.data[i].addTime);
        newarr.push(res.data.comment.data[i]);
        if (i == 2) {
          that.setData({ cont: res.data.comment.count });
          break;
        }
      }
      that.setData({
        goods: res.data.info,
        attribute: res.data.attribute,
        issueList: res.data.issue,
        comment: newarr,
        brand: res.data.brand,
        specificationList: res.data.specificationList,
        productList: res.data.productList,
        userHasCollect: res.data.userHasCollect,
        shareImage: res.data.shareImage,
        checkedSpecPrice: res.data.info.retailPrice
      });
      if (res.data.userHasCollect == 1) {
        console.log(res.data.userHasCollect, 1111111);
        that.setData({
          collectImage: that.data.hasCollectImage
        });
      } else {
        console.log(res.data.userHasCollect, 222222);
        that.setData({
          collectImage: that.data.noCollectImage
        });
      }

      // WxParse.wxParse('goodsDetail', 'html', res.data.info.detail, that);
      // console.log(55556666)
      that.getGoodsRelated();
    }
  },
  getGoodsRelated: function getGoodsRelated() {
    var that = this;
    daaty.GoodsRelated(that.data.id, null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        relatedGoods: res.data.goodsList
      });
    }
  },
  clickSkuValue: function clickSkuValue(event) {
    var that = this;
    var specName = event.currentTarget.dataset.name;
    var specValueId = event.currentTarget.dataset.valueId;

    //判断是否可以点击

    //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
    var _specificationList = this.data.specificationList;
    for (var i = 0; i < _specificationList.length; i++) {
      if (_specificationList[i].name === specName) {
        for (var j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].id == specValueId) {
            //如果已经选中，则反选
            if (_specificationList[i].valueList[j].checked) {
              _specificationList[i].valueList[j].checked = false;
            } else {
              _specificationList[i].valueList[j].checked = true;
            }
          } else {
            _specificationList[i].valueList[j].checked = false;
          }
        }
      }
    }
    this.setData({
      specificationList: _specificationList
    });
    //重新计算spec改变后的信息
    this.changeSpecInfo();

    //重新计算哪些值不可以点击
  },
  //获取选中的规格信息
  getCheckedSpecValue: function getCheckedSpecValue() {
    var checkedValues = [];
    var _specificationList = this.data.specificationList;
    for (var i = 0; i < _specificationList.length; i++) {
      var _checkedObj = {
        name: _specificationList[i].name,
        valueId: 0,
        valueText: ''
      };
      for (var j = 0; j < _specificationList[i].valueList.length; j++) {
        if (_specificationList[i].valueList[j].checked) {
          _checkedObj.valueId = _specificationList[i].valueList[j].id;
          _checkedObj.valueText = _specificationList[i].valueList[j].value;
        }
      }
      checkedValues.push(_checkedObj);
    }

    return checkedValues;
  },
  //根据已选的值，计算其它值的状态
  setSpecValueStatus: function setSpecValueStatus() {},
  //判断规格是否选择完整
  isCheckedAllSpec: function isCheckedAllSpec() {
    return !this.getCheckedSpecValue().some(function (v) {
      if (v.valueId == 0) {
        return true;
      }
    });
  },
  getCheckedSpecKey: function getCheckedSpecKey() {
    var checkedValue = this.getCheckedSpecValue().map(function (v) {
      return v.valueText;
    });

    return checkedValue;
  },
  changeSpecInfo: function changeSpecInfo() {
    var checkedNameValue = this.getCheckedSpecValue();

    //设置选择的信息
    var checkedValue = checkedNameValue.filter(function (v) {
      if (v.valueId != 0) {
        return true;
      } else {
        return false;
      }
    }).map(function (v) {
      return v.valueText;
    });
    if (checkedValue.length > 0) {
      this.setData({
        tmpSpecText: checkedValue.join('　')
      });
    } else {
      this.setData({
        tmpSpecText: '请选择规格数量'
      });
    }

    if (this.isCheckedAllSpec()) {
      this.setData({
        checkedSpecText: this.data.tmpSpecText
      });

      // 规格所对应的货品选择以后
      var checkedProductArray = this.getCheckedProductItem(this.getCheckedSpecKey());
      if (!checkedProductArray || checkedProductArray.length <= 0) {
        this.setData({
          soldout: true
        });
        console.error('规格所对应货品不存在');
        return;
      }

      var checkedProduct = checkedProductArray[0];
      if (checkedProduct.number > 0) {
        this.setData({
          checkedSpecPrice: checkedProduct.price,
          soldout: false
        });
      } else {
        this.setData({
          checkedSpecPrice: this.data.goods.retailPrice,
          soldout: true
        });
      }
    } else {
      this.setData({
        checkedSpecText: '规格数量选择',
        checkedSpecPrice: this.data.goods.retailPrice,
        soldout: false
      });
    }
  },
  getCheckedProductItem: function getCheckedProductItem(key) {
    return this.data.productList.filter(function (v) {
      // console.log('======',v.specifications, key);
      if (v.specifications.toString() == key.toString()) {
        return true;
      } else {
        return false;
      }
    });
  },
  onLoad: function onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (app.globalData.user) {
      var userid = app.globalData.user.userId;
      // console.log( app.globalData,"userid")
      this.setData({
        userid: userid
      });
    }
    this.setData({
      id: parseInt(options.id),
      url: app.globalData.imgUrl
    });
    this.getGoodsInfo();
  },
  onReady: function onReady() {
    // 页面渲染完成

  },
  onShow: function onShow() {
    // 页面显示
    var that = this;
    daaty.CartGoodsCount(null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        cartGoodsCount: res.data
      });
      // wx.setStorageSync("cartGoodsCount",res.data)
    }
  },
  onHide: function onHide() {
    // 页面隐藏

  },
  onUnload: function onUnload() {
    // 页面关闭

  },
  switchAttrPop: function switchAttrPop() {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      });
    }
  },
  closeAttr: function closeAttr() {
    this.setData({
      openAttr: false
    });
  },
  addCollectOrNot: function addCollectOrNot() {
    var that = this;
    //添加或是取消收藏  
    //已修改 待确定
    daaty.CollectAddOrDelete(this.data.id, 0, null, successFay);
    function successFay(res, sourceObj) {
      var _res = res;
      if (0 == 0) {
        if (_res.data.type == 'add') {
          that.setData({
            collectImage: that.data.noCollectImage
          });
        } else {
          that.setData({
            collectImage: that.data.hasCollectImage
          });
        }
      } else {
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: _res.errmsg,
          mask: true
        });
      }
    }
  },
  openCartPage: function openCartPage() {
    wx.navigateTo({
      url: '/pages/cart/cart'
    });
  },
  addFast: function addFast() {
    var that = this;
    if (this.data.openAttr == false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {
      var successFay = function successFay(res, sourceObj) {
        if (0 == 0) {
          // 如果storage中设置了cartId，则是立即购买，否则是购物车购买
          try {
            wx.setStorageSync('cartId', res.data);
            wx.navigateTo({
              url: '/pages/checkout/checkout'
            });
          } catch (e) {}
        } else {
          wx.showToast({
            image: '../../common/assets/tab/icon_error.png',
            title: res.errmsg,
            mask: true
          });
        }
      };

      //提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        wx.showToast({
          image: '../../common/assets/tab/icon_error.png',
          title: '请选择完整规格'
        });
        return false;
      }

      //根据选中的规格，判断是否有对应的sku信息
      var checkedProductArray = this.getCheckedProductItem(this.getCheckedSpecKey());
      if (!checkedProductArray || checkedProductArray.length <= 0) {
        //找不到对应的product信息，提示没有库存
        wx.showToast({
          image: '../../common/assets/tab/icon_error.png',
          title: '没有库存'
        });
        return false;
      }

      var checkedProduct = checkedProductArray[0];
      //验证库存
      if (checkedProduct.number <= 0) {
        wx.showToast({
          image: '../../common/assets/tab/icon_error.png',
          title: '没有库存'
        });
        return false;
      }

      //立即购买
      daaty.CartFastAdd(this.data.goods.id, this.data.number, checkedProduct.id, null, successFay);
    }
  },
  addToCart: function addToCart() {
    var that = this;
    if (this.data.openAttr == false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {
      var successFay = function successFay(res, sourceObj) {
        var _res = res;
        if (0 == 0) {
          wx.showToast({
            title: '添加成功'
          });
          that.setData({
            openAttr: !that.data.openAttr,
            cartGoodsCount: _res.data
          });
          if (that.data.userHasCollect == 1) {
            that.setData({
              collectImage: that.data.hasCollectImage
            });
          } else {
            that.setData({
              collectImage: that.data.noCollectImage
            });
          }
        } else {
          wx.showToast({
            image: '../../common/assets/tab/icon_error.png',
            title: _res.errmsg,
            mask: true
          });
        }
      };

      //提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        wx.showToast({
          image: '../../common/assets/tab/icon_error.png',
          title: '请选择完整规格'
        });
        return false;
      }

      //根据选中的规格，判断是否有对应的sku信息
      var checkedProductArray = this.getCheckedProductItem(this.getCheckedSpecKey());
      if (!checkedProductArray || checkedProductArray.length <= 0) {
        //找不到对应的product信息，提示没有库存
        wx.showToast({
          image: '../../common/assets/tab/icon_error.png',
          title: '没有库存'
        });
        return false;
      }

      var checkedProduct = checkedProductArray[0];
      //验证库存
      if (checkedProduct.number <= 0) {
        wx.showToast({
          image: '../../common/assets/tab/icon_error.png',
          title: '没有库存'
        });
        return false;
      }

      //添加到购物车
      daaty.CartAdd(this.data.goods.id, this.data.number, checkedProduct.id, null, successFay);
    }
  },
  cutNumber: function cutNumber() {
    this.setData({
      number: this.data.number - 1 > 1 ? this.data.number - 1 : 1
    });
  },
  addNumber: function addNumber() {
    this.setData({
      number: this.data.number + 1
    });
  },
  onShareAppMessage: function onShareAppMessage(e) {
    var uids = this.data.id;
    var namr = this.data.goods.name;
    var path = 'pages/goods/goods?id=' + uids;
    return {
      title: namr,
      // desc: '分享页面的内容',
      imageUrl: "",
      path: path, // 路径，传递参数到指定页面。
      success: function success(res) {
        console.log("转发成功", res);
        // daaty.operationList(userid,uids,null,successFa)
        //   function successFa(data, sourceObj){

        //   }
      },
      fail: function fail(res) {
        console.log("转发失败", res);
      }
    };
  }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzLnd4cCJdLCJuYW1lcyI6WyJkYWF0eSIsInJlcXVpcmUiLCJ1dGlseSIsImNyZXR0aW1lIiwiYXBwIiwiZ2V0QXBwIiwiZGF0YSIsImlkIiwiZ29vZHMiLCJhdHRyaWJ1dGUiLCJpc3N1ZUxpc3QiLCJjb21tZW50IiwiYnJhbmQiLCJzcGVjaWZpY2F0aW9uTGlzdCIsInByb2R1Y3RMaXN0IiwicmVsYXRlZEdvb2RzIiwiY2FydEdvb2RzQ291bnQiLCJ1c2VySGFzQ29sbGVjdCIsIm51bWJlciIsImNoZWNrZWRTcGVjVGV4dCIsInRtcFNwZWNUZXh0IiwiY2hlY2tlZFNwZWNQcmljZSIsIm9wZW5BdHRyIiwibm9Db2xsZWN0SW1hZ2UiLCJoYXNDb2xsZWN0SW1hZ2UiLCJjb2xsZWN0SW1hZ2UiLCJzaGFyZUltYWdlIiwic29sZG91dCIsIm9uUHVsbERvd25SZWZyZXNoIiwid3giLCJzaG93TmF2aWdhdGlvbkJhckxvYWRpbmciLCJnZXRHb29kc0luZm8iLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJzdG9wUHVsbERvd25SZWZyZXNoIiwic2F2ZVNoYXJlIiwidGhhdCIsImRvd25sb2FkRmlsZSIsInVybCIsInN1Y2Nlc3MiLCJyZXMiLCJzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtIiwiZmlsZVBhdGgiLCJ0ZW1wRmlsZVBhdGgiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwiY29uZmlybVRleHQiLCJjb25maXJtQ29sb3IiLCJjb25maXJtIiwiY29uc29sZSIsImxvZyIsImZhaWwiLCJuZXdhcnIiLCJHb29kc0RldGFpbCIsInN1Y2Nlc3NGYXkiLCJzb3VyY2VPYmoiLCJfc3BlY2lmaWNhdGlvbkxpc3QiLCJsZW5ndGgiLCJ2YWx1ZUxpc3QiLCJjaGVja2VkIiwiX3Byb2R1Y3RQcmljZSIsInByaWNlIiwiX2dvb2RzUHJpY2UiLCJpbmZvIiwicmV0YWlsUHJpY2UiLCJlcnJvciIsInNldERhdGEiLCJ2YWx1ZSIsImkiLCJhZGRUaW1lIiwiZ2V0RGF0ZSIsInB1c2giLCJjb250IiwiY291bnQiLCJpc3N1ZSIsImdldEdvb2RzUmVsYXRlZCIsIkdvb2RzUmVsYXRlZCIsImdvb2RzTGlzdCIsImNsaWNrU2t1VmFsdWUiLCJldmVudCIsInNwZWNOYW1lIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJuYW1lIiwic3BlY1ZhbHVlSWQiLCJ2YWx1ZUlkIiwiaiIsImNoYW5nZVNwZWNJbmZvIiwiZ2V0Q2hlY2tlZFNwZWNWYWx1ZSIsImNoZWNrZWRWYWx1ZXMiLCJfY2hlY2tlZE9iaiIsInZhbHVlVGV4dCIsInNldFNwZWNWYWx1ZVN0YXR1cyIsImlzQ2hlY2tlZEFsbFNwZWMiLCJzb21lIiwidiIsImdldENoZWNrZWRTcGVjS2V5IiwiY2hlY2tlZFZhbHVlIiwibWFwIiwiY2hlY2tlZE5hbWVWYWx1ZSIsImZpbHRlciIsImpvaW4iLCJjaGVja2VkUHJvZHVjdEFycmF5IiwiZ2V0Q2hlY2tlZFByb2R1Y3RJdGVtIiwiY2hlY2tlZFByb2R1Y3QiLCJrZXkiLCJzcGVjaWZpY2F0aW9ucyIsInRvU3RyaW5nIiwib25Mb2FkIiwib3B0aW9ucyIsImdsb2JhbERhdGEiLCJ1c2VyIiwidXNlcmlkIiwidXNlcklkIiwicGFyc2VJbnQiLCJpbWdVcmwiLCJvblJlYWR5Iiwib25TaG93IiwiQ2FydEdvb2RzQ291bnQiLCJvbkhpZGUiLCJvblVubG9hZCIsInN3aXRjaEF0dHJQb3AiLCJjbG9zZUF0dHIiLCJhZGRDb2xsZWN0T3JOb3QiLCJDb2xsZWN0QWRkT3JEZWxldGUiLCJfcmVzIiwidHlwZSIsInNob3dUb2FzdCIsImltYWdlIiwiZXJybXNnIiwibWFzayIsIm9wZW5DYXJ0UGFnZSIsIm5hdmlnYXRlVG8iLCJhZGRGYXN0Iiwic2V0U3RvcmFnZVN5bmMiLCJlIiwiQ2FydEZhc3RBZGQiLCJhZGRUb0NhcnQiLCJDYXJ0QWRkIiwiY3V0TnVtYmVyIiwiYWRkTnVtYmVyIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJ1aWRzIiwibmFt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QUFTLEVBSE47QUFJSEQsWUFBTUEsSUFKSCxFQUlVO0FBQ1QzRyxlQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDbEJXLGdCQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQlosR0FBcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0MsT0FYRjtBQVlDYSxZQUFNLGNBQUNiLEdBQUQsRUFBUztBQUNmVyxnQkFBUUMsR0FBUixDQUFZLE1BQVosRUFBb0JaLEdBQXBCO0FBQ0M7QUFkRixLQUFQO0FBZ0JIIiwiZmlsZSI6Imdvb2RzLnd4cCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRhYXR5ID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy9hcGkyLmpzXCIpXG5jb25zdCB1dGlseSA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvdXRpbC5qc1wiKVxudmFyIGNyZXR0aW1lID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2RhdGV1dGlscy5qc1wiKVxudmFyIGFwcCA9IGdldEFwcCgpO1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHt9XG4gIH0sXG4gZGF0YToge1xuICBpZDogMCxcbiAgZ29vZHM6IHt9LFxuICBhdHRyaWJ1dGU6IFtdLFxuICBpc3N1ZUxpc3Q6IFtdLFxuICBjb21tZW50OiBbXSxcbiAgYnJhbmQ6IHt9LFxuICBzcGVjaWZpY2F0aW9uTGlzdDogW10sXG4gIHByb2R1Y3RMaXN0OiBbXSxcbiAgcmVsYXRlZEdvb2RzOiBbXSxcbiAgY2FydEdvb2RzQ291bnQ6IDAsXG4gIHVzZXJIYXNDb2xsZWN0OiAwLFxuICBudW1iZXI6IDEsXG4gIGNoZWNrZWRTcGVjVGV4dDogJ+inhOagvOaVsOmHj+mAieaLqScsXG4gIHRtcFNwZWNUZXh0OiAn6K+36YCJ5oup6KeE5qC85pWw6YePJyxcbiAgY2hlY2tlZFNwZWNQcmljZTogMCxcbiAgb3BlbkF0dHI6IGZhbHNlLFxuICBub0NvbGxlY3RJbWFnZTogJy4uLy4uL2NvbW1vbi9hc3NldHMvdGFiL2ljb25fY29sbGVjdC5wbmcnLFxuICBoYXNDb2xsZWN0SW1hZ2U6ICcuLi8uLi9jb21tb24vYXNzZXRzL3RhYi9pY29uX2NvbGxlY3RfY2hlY2tlZC5wbmcnLFxuICBjb2xsZWN0SW1hZ2U6ICcuLi8uLi9jb21tb24vYXNzZXRzL3RhYi9pY29uX2NvbGxlY3QucG5nJyxcbiAgc2hhcmVJbWFnZTogJycsXG4gIHNvbGRvdXQ6IGZhbHNlXG4gfSxcblxuIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICB3eC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKSAvL+WcqOagh+mimOagj+S4reaYvuekuuWKoOi9vVxuICB0aGlzLmdldEdvb2RzSW5mbygpO1xuICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKSAvL+WujOaIkOWBnOatouWKoOi9vVxuICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCkgLy/lgZzmraLkuIvmi4nliLfmlrBcbiB9LFxuXG4gc2F2ZVNoYXJlOiBmdW5jdGlvbigpIHtcbiAgbGV0IHRoYXQgPSB0aGlzO1xuICB3eC5kb3dubG9hZEZpbGUoe1xuICAgdXJsOiB0aGF0LmRhdGEuc2hhcmVJbWFnZSxcbiAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgIC8vIGNvbnNvbGUubG9nKHJlcylcbiAgICB3eC5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcbiAgICAgZmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXG4gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICB0aXRsZTogJ+WtmOWbvuaIkOWKnycsXG4gICAgICAgY29udGVudDogJ+WbvueJh+aIkOWKn+S/neWtmOWIsOebuOWGjOS6hu+8jOWPr+S7peWIhuS6q+WIsOaci+WPi+WciOS6hicsXG4gICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgY29uZmlybVRleHQ6ICflpb3nmoQnLFxuICAgICAgIGNvbmZpcm1Db2xvcjogJyNhNzg4NDUnLFxuICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKTtcbiAgICAgICAgfVxuICAgICAgIH1cbiAgICAgIH0pXG4gICAgIH0sXG4gICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgY29uc29sZS5sb2coJ2ZhaWwnKVxuICAgICB9XG4gICAgfSlcbiAgIH0sXG4gICBmYWlsOiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnZmFpbCcpXG4gICB9XG4gIH0pXG4gfSxcbiBnZXRHb29kc0luZm86IGZ1bmN0aW9uKCkge1xuICBsZXQgdGhhdCA9IHRoaXM7XG4gIGxldCBuZXdhcnIgPSBbXTtcbiAgZGFhdHkuR29vZHNEZXRhaWwodGhhdC5kYXRhLmlkLG51bGwsc3VjY2Vzc0ZheSlcbiAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgY29uc29sZS5sb2cocmVzLFwicmVzXCIpXG4gICAgICAgICAgbGV0IF9zcGVjaWZpY2F0aW9uTGlzdCA9IHJlcy5kYXRhLnNwZWNpZmljYXRpb25MaXN0XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmRhdGEsODg4ODg5OTk5KVxuICAgICAgICAvLyDlpoLmnpzku4Xku4XlrZjlnKjkuIDnp43otKflk4HvvIzpgqPkuYjllYblk4HpobXpnaLliJ3lp4vljJbml7bpu5jorqRjaGVja2VkXG4gICAgICAgICAgaWYgKF9zcGVjaWZpY2F0aW9uTGlzdC5sZW5ndGggPT0gMSkge1xuICAgICAgICAgIGlmIChfc3BlY2lmaWNhdGlvbkxpc3RbMF0udmFsdWVMaXN0Lmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgX3NwZWNpZmljYXRpb25MaXN0WzBdLnZhbHVlTGlzdFswXS5jaGVja2VkID0gdHJ1ZVxuXG4gICAgICAgICAgICAgIC8vIOWmguaenOS7heS7heWtmOWcqOS4gOenjei0p+WTge+8jOmCo+S5iOWVhuWTgeS7t+agvOW6lOivpeWSjOi0p+WTgeS7t+agvOS4gOiHtFxuICAgICAgICAgICAgICAvLyDov5nph4zmo4DmtYvkuIDkuItcbiAgICAgICAgICAgICAgbGV0IF9wcm9kdWN0UHJpY2UgPSByZXMuZGF0YS5wcm9kdWN0TGlzdFswXS5wcmljZTtcbiAgICAgICAgICAgICAgbGV0IF9nb29kc1ByaWNlID0gcmVzLmRhdGEuaW5mby5yZXRhaWxQcmljZTtcbiAgICAgICAgICAgICAgaWYgKF9wcm9kdWN0UHJpY2UgIT0gX2dvb2RzUHJpY2UpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign5ZWG5ZOB5pWw6YeP5Lu35qC85ZKM6LSn5ZOB5LiN5LiA6Ie0Jyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICBjaGVja2VkU3BlY1RleHQ6IF9zcGVjaWZpY2F0aW9uTGlzdFswXS52YWx1ZUxpc3RbMF0udmFsdWUsXG4gICAgICAgICAgICAgIHRtcFNwZWNUZXh0OiAn5bey6YCJ5oup77yaJyArIF9zcGVjaWZpY2F0aW9uTGlzdFswXS52YWx1ZUxpc3RbMF0udmFsdWUsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvcih2YXIgaT0wO2k8cmVzLmRhdGEuY29tbWVudC5kYXRhLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgcmVzLmRhdGEuY29tbWVudC5kYXRhW2ldLmFkZFRpbWU9Y3JldHRpbWUuZ2V0RGF0ZShyZXMuZGF0YS5jb21tZW50LmRhdGFbaV0uYWRkVGltZSlcbiAgICAgICAgICAgICAgIG5ld2Fyci5wdXNoKHJlcy5kYXRhLmNvbW1lbnQuZGF0YVtpXSlcbiAgICAgICAgICAgICAgICBpZihpID09IDIpe1xuICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtjb250OnJlcy5kYXRhLmNvbW1lbnQuY291bnR9KVxuICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgZ29vZHM6IHJlcy5kYXRhLmluZm8sXG4gICAgICAgIGF0dHJpYnV0ZTogcmVzLmRhdGEuYXR0cmlidXRlLFxuICAgICAgICBpc3N1ZUxpc3Q6IHJlcy5kYXRhLmlzc3VlLFxuICAgICAgICBjb21tZW50OiBuZXdhcnIsXG4gICAgICAgIGJyYW5kOiByZXMuZGF0YS5icmFuZCxcbiAgICAgICAgc3BlY2lmaWNhdGlvbkxpc3Q6IHJlcy5kYXRhLnNwZWNpZmljYXRpb25MaXN0LFxuICAgICAgICBwcm9kdWN0TGlzdDogcmVzLmRhdGEucHJvZHVjdExpc3QsXG4gICAgICAgIHVzZXJIYXNDb2xsZWN0OiByZXMuZGF0YS51c2VySGFzQ29sbGVjdCxcbiAgICAgICAgc2hhcmVJbWFnZTogcmVzLmRhdGEuc2hhcmVJbWFnZSxcbiAgICAgICAgY2hlY2tlZFNwZWNQcmljZTogcmVzLmRhdGEuaW5mby5yZXRhaWxQcmljZVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnVzZXJIYXNDb2xsZWN0ID09IDEpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS51c2VySGFzQ29sbGVjdCwxMTExMTExKVxuICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIGNvbGxlY3RJbWFnZTogdGhhdC5kYXRhLmhhc0NvbGxlY3RJbWFnZVxuICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS51c2VySGFzQ29sbGVjdCwyMjIyMjIpXG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgY29sbGVjdEltYWdlOiB0aGF0LmRhdGEubm9Db2xsZWN0SW1hZ2VcbiAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXeFBhcnNlLnd4UGFyc2UoJ2dvb2RzRGV0YWlsJywgJ2h0bWwnLCByZXMuZGF0YS5pbmZvLmRldGFpbCwgdGhhdCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKDU1NTU2NjY2KVxuICAgICAgICB0aGF0LmdldEdvb2RzUmVsYXRlZCgpO1xuICAgIH1cblxuIH0sXG4gZ2V0R29vZHNSZWxhdGVkOiBmdW5jdGlvbigpIHtcbiAgbGV0IHRoYXQgPSB0aGlzO1xuICBkYWF0eS5Hb29kc1JlbGF0ZWQodGhhdC5kYXRhLmlkLG51bGwsc3VjY2Vzc0ZheSlcbiAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgIHJlbGF0ZWRHb29kczogcmVzLmRhdGEuZ29vZHNMaXN0LFxuICAgICAgICB9KTtcbiAgfVxuIH0sXG4gY2xpY2tTa3VWYWx1ZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IHRoYXQgPSB0aGlzO1xuICBsZXQgc3BlY05hbWUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZTtcbiAgbGV0IHNwZWNWYWx1ZUlkID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlSWQ7XG5cbiAgLy/liKTmlq3mmK/lkKblj6/ku6Xngrnlh7tcblxuICAvL1RPRE8g5oCn6IO95LyY5YyW77yM5Y+v5Zyod3g6Zm9y5Lit5re75YqgaW5kZXjvvIzlj6/ku6Xnm7TmjqXojrflj5bngrnlh7vnmoTlsZ7mgKflkI3lkozlsZ7mgKflgLzvvIzkuI3nlKjlvqrnjq9cbiAgbGV0IF9zcGVjaWZpY2F0aW9uTGlzdCA9IHRoaXMuZGF0YS5zcGVjaWZpY2F0aW9uTGlzdDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBfc3BlY2lmaWNhdGlvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgIGlmIChfc3BlY2lmaWNhdGlvbkxpc3RbaV0ubmFtZSA9PT0gc3BlY05hbWUpIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IF9zcGVjaWZpY2F0aW9uTGlzdFtpXS52YWx1ZUxpc3QubGVuZ3RoOyBqKyspIHtcbiAgICAgaWYgKF9zcGVjaWZpY2F0aW9uTGlzdFtpXS52YWx1ZUxpc3Rbal0uaWQgPT0gc3BlY1ZhbHVlSWQpIHtcbiAgICAgIC8v5aaC5p6c5bey57uP6YCJ5Lit77yM5YiZ5Y+N6YCJXG4gICAgICBpZiAoX3NwZWNpZmljYXRpb25MaXN0W2ldLnZhbHVlTGlzdFtqXS5jaGVja2VkKSB7XG4gICAgICAgX3NwZWNpZmljYXRpb25MaXN0W2ldLnZhbHVlTGlzdFtqXS5jaGVja2VkID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgIF9zcGVjaWZpY2F0aW9uTGlzdFtpXS52YWx1ZUxpc3Rbal0uY2hlY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgIH0gZWxzZSB7XG4gICAgICBfc3BlY2lmaWNhdGlvbkxpc3RbaV0udmFsdWVMaXN0W2pdLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgfVxuICAgIH1cbiAgIH1cbiAgfVxuICB0aGlzLnNldERhdGEoe1xuICAgc3BlY2lmaWNhdGlvbkxpc3Q6IF9zcGVjaWZpY2F0aW9uTGlzdCxcbiAgfSk7XG4gIC8v6YeN5paw6K6h566Xc3BlY+aUueWPmOWQjueahOS/oeaBr1xuICB0aGlzLmNoYW5nZVNwZWNJbmZvKCk7XG5cbiAgLy/ph43mlrDorqHnrpflk6rkupvlgLzkuI3lj6/ku6Xngrnlh7tcbiB9LFxuIC8v6I635Y+W6YCJ5Lit55qE6KeE5qC85L+h5oGvXG4gZ2V0Q2hlY2tlZFNwZWNWYWx1ZTogZnVuY3Rpb24oKSB7XG4gIGxldCBjaGVja2VkVmFsdWVzID0gW107XG4gIGxldCBfc3BlY2lmaWNhdGlvbkxpc3QgPSB0aGlzLmRhdGEuc3BlY2lmaWNhdGlvbkxpc3Q7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgX3NwZWNpZmljYXRpb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICBsZXQgX2NoZWNrZWRPYmogPSB7XG4gICAgbmFtZTogX3NwZWNpZmljYXRpb25MaXN0W2ldLm5hbWUsXG4gICAgdmFsdWVJZDogMCxcbiAgICB2YWx1ZVRleHQ6ICcnXG4gICB9O1xuICAgZm9yIChsZXQgaiA9IDA7IGogPCBfc3BlY2lmaWNhdGlvbkxpc3RbaV0udmFsdWVMaXN0Lmxlbmd0aDsgaisrKSB7XG4gICAgaWYgKF9zcGVjaWZpY2F0aW9uTGlzdFtpXS52YWx1ZUxpc3Rbal0uY2hlY2tlZCkge1xuICAgICBfY2hlY2tlZE9iai52YWx1ZUlkID0gX3NwZWNpZmljYXRpb25MaXN0W2ldLnZhbHVlTGlzdFtqXS5pZDtcbiAgICAgX2NoZWNrZWRPYmoudmFsdWVUZXh0ID0gX3NwZWNpZmljYXRpb25MaXN0W2ldLnZhbHVlTGlzdFtqXS52YWx1ZTtcbiAgICB9XG4gICB9XG4gICBjaGVja2VkVmFsdWVzLnB1c2goX2NoZWNrZWRPYmopO1xuICB9XG5cbiAgcmV0dXJuIGNoZWNrZWRWYWx1ZXM7XG4gfSxcbiAvL+agueaNruW3sumAieeahOWAvO+8jOiuoeeul+WFtuWug+WAvOeahOeKtuaAgVxuIHNldFNwZWNWYWx1ZVN0YXR1czogZnVuY3Rpb24oKSB7XG5cbiB9LFxuIC8v5Yik5pat6KeE5qC85piv5ZCm6YCJ5oup5a6M5pW0XG4gaXNDaGVja2VkQWxsU3BlYzogZnVuY3Rpb24oKSB7XG4gIHJldHVybiAhdGhpcy5nZXRDaGVja2VkU3BlY1ZhbHVlKCkuc29tZShmdW5jdGlvbih2KSB7XG4gICBpZiAodi52YWx1ZUlkID09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgIH1cbiAgfSk7XG4gfSxcbiBnZXRDaGVja2VkU3BlY0tleTogZnVuY3Rpb24oKSB7XG4gIGxldCBjaGVja2VkVmFsdWUgPSB0aGlzLmdldENoZWNrZWRTcGVjVmFsdWUoKS5tYXAoZnVuY3Rpb24odikge1xuICAgcmV0dXJuIHYudmFsdWVUZXh0O1xuICB9KTtcblxuICByZXR1cm4gY2hlY2tlZFZhbHVlO1xuIH0sXG4gY2hhbmdlU3BlY0luZm86IGZ1bmN0aW9uKCkge1xuICBsZXQgY2hlY2tlZE5hbWVWYWx1ZSA9IHRoaXMuZ2V0Q2hlY2tlZFNwZWNWYWx1ZSgpO1xuXG4gIC8v6K6+572u6YCJ5oup55qE5L+h5oGvXG4gIGxldCBjaGVja2VkVmFsdWUgPSBjaGVja2VkTmFtZVZhbHVlLmZpbHRlcihmdW5jdGlvbih2KSB7XG4gICBpZiAodi52YWx1ZUlkICE9IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgfVxuICB9KS5tYXAoZnVuY3Rpb24odikge1xuICAgcmV0dXJuIHYudmFsdWVUZXh0O1xuICB9KTtcbiAgaWYgKGNoZWNrZWRWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICB0aGlzLnNldERhdGEoe1xuICAgIHRtcFNwZWNUZXh0OiBjaGVja2VkVmFsdWUuam9pbign44CAJylcbiAgIH0pO1xuICB9IGVsc2Uge1xuICAgdGhpcy5zZXREYXRhKHtcbiAgICB0bXBTcGVjVGV4dDogJ+ivt+mAieaLqeinhOagvOaVsOmHjydcbiAgIH0pO1xuICB9XG5cblxuICBpZiAodGhpcy5pc0NoZWNrZWRBbGxTcGVjKCkpIHtcbiAgIHRoaXMuc2V0RGF0YSh7XG4gICAgY2hlY2tlZFNwZWNUZXh0OiB0aGlzLmRhdGEudG1wU3BlY1RleHRcbiAgIH0pO1xuXG4gICAvLyDop4TmoLzmiYDlr7nlupTnmoTotKflk4HpgInmi6nku6XlkI5cbiAgIGxldCBjaGVja2VkUHJvZHVjdEFycmF5ID0gdGhpcy5nZXRDaGVja2VkUHJvZHVjdEl0ZW0odGhpcy5nZXRDaGVja2VkU3BlY0tleSgpKTtcbiAgIGlmICghY2hlY2tlZFByb2R1Y3RBcnJheSB8fCBjaGVja2VkUHJvZHVjdEFycmF5Lmxlbmd0aCA8PSAwKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgc29sZG91dDogdHJ1ZVxuICAgIH0pO1xuICAgIGNvbnNvbGUuZXJyb3IoJ+inhOagvOaJgOWvueW6lOi0p+WTgeS4jeWtmOWcqCcpO1xuICAgIHJldHVybjtcbiAgIH1cblxuICAgbGV0IGNoZWNrZWRQcm9kdWN0ID0gY2hlY2tlZFByb2R1Y3RBcnJheVswXTtcbiAgIGlmIChjaGVja2VkUHJvZHVjdC5udW1iZXIgPiAwKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgY2hlY2tlZFNwZWNQcmljZTogY2hlY2tlZFByb2R1Y3QucHJpY2UsXG4gICAgIHNvbGRvdXQ6IGZhbHNlXG4gICAgfSk7XG4gICB9IGVsc2Uge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgIGNoZWNrZWRTcGVjUHJpY2U6IHRoaXMuZGF0YS5nb29kcy5yZXRhaWxQcmljZSxcbiAgICAgc29sZG91dDogdHJ1ZVxuICAgIH0pO1xuICAgfVxuXG4gIH0gZWxzZSB7XG4gICB0aGlzLnNldERhdGEoe1xuICAgIGNoZWNrZWRTcGVjVGV4dDogJ+inhOagvOaVsOmHj+mAieaLqScsXG4gICAgY2hlY2tlZFNwZWNQcmljZTogdGhpcy5kYXRhLmdvb2RzLnJldGFpbFByaWNlLFxuICAgIHNvbGRvdXQ6IGZhbHNlXG4gICB9KTtcbiAgfVxuXG4gfSxcbiBnZXRDaGVja2VkUHJvZHVjdEl0ZW06IGZ1bmN0aW9uKGtleSkge1xuICByZXR1cm4gdGhpcy5kYXRhLnByb2R1Y3RMaXN0LmZpbHRlcihmdW5jdGlvbih2KSB7XG4gICAgLy8gY29uc29sZS5sb2coJz09PT09PScsdi5zcGVjaWZpY2F0aW9ucywga2V5KTtcbiAgIGlmICh2LnNwZWNpZmljYXRpb25zLnRvU3RyaW5nKCkgPT0ga2V5LnRvU3RyaW5nKCkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgfVxuICB9KTtcbiB9LFxuIG9uTG9hZDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAvLyDpobXpnaLliJ3lp4vljJYgb3B0aW9uc+S4uumhtemdoui3s+i9rOaJgOW4puadpeeahOWPguaVsFxuICBpZihhcHAuZ2xvYmFsRGF0YS51c2VyKXtcbiAgICAgdmFyIHVzZXJpZCA9IGFwcC5nbG9iYWxEYXRhLnVzZXIudXNlcklkXG4gIC8vIGNvbnNvbGUubG9nKCBhcHAuZ2xvYmFsRGF0YSxcInVzZXJpZFwiKVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdXNlcmlkOnVzZXJpZFxuICAgICAgfSk7XG4gIH1cbiAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBpZDogcGFyc2VJbnQob3B0aW9ucy5pZCksXG4gICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmltZ1VybFxuICAgICAgfSk7XG4gIHRoaXMuZ2V0R29vZHNJbmZvKCk7XG4gfSxcbiBvblJlYWR5OiBmdW5jdGlvbigpIHtcbiAgLy8g6aG16Z2i5riy5p+T5a6M5oiQXG5cbiB9LFxuIG9uU2hvdzogZnVuY3Rpb24oKSB7XG4gIC8vIOmhtemdouaYvuekulxuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGRhYXR5LkNhcnRHb29kc0NvdW50KG51bGwsc3VjY2Vzc0ZheSlcbiAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIGNhcnRHb29kc0NvdW50OiByZXMuZGF0YVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgLy8gd3guc2V0U3RvcmFnZVN5bmMoXCJjYXJ0R29vZHNDb3VudFwiLHJlcy5kYXRhKVxuICB9XG4gfSxcbiBvbkhpZGU6IGZ1bmN0aW9uKCkge1xuICAvLyDpobXpnaLpmpDol49cblxuIH0sXG4gb25VbmxvYWQ6IGZ1bmN0aW9uKCkge1xuICAvLyDpobXpnaLlhbPpl61cblxuIH0sXG4gc3dpdGNoQXR0clBvcDogZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRhdGEub3BlbkF0dHIgPT0gZmFsc2UpIHtcbiAgIHRoaXMuc2V0RGF0YSh7XG4gICAgb3BlbkF0dHI6ICF0aGlzLmRhdGEub3BlbkF0dHJcbiAgIH0pO1xuICB9XG4gfSxcbiBjbG9zZUF0dHI6IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNldERhdGEoe1xuICAgb3BlbkF0dHI6IGZhbHNlLFxuICB9KTtcbiB9LFxuIGFkZENvbGxlY3RPck5vdDogZnVuY3Rpb24oKSB7XG4gIGxldCB0aGF0ID0gdGhpcztcbiAgLy/mt7vliqDmiJbmmK/lj5bmtojmlLbol48gIFxuICAvL+W3suS/ruaUuSDlvoXnoa7lrppcbiAgZGFhdHkuQ29sbGVjdEFkZE9yRGVsZXRlKHRoaXMuZGF0YS5pZCwwLG51bGwsc3VjY2Vzc0ZheSlcbiAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgbGV0IF9yZXMgPSByZXM7XG4gICAgaWYgKDAgPT0gMCkge1xuICAgICBpZiAoX3Jlcy5kYXRhLnR5cGUgPT0gJ2FkZCcpIHtcbiAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgY29sbGVjdEltYWdlOnRoYXQuZGF0YS5ub0NvbGxlY3RJbWFnZVxuICAgICAgfSk7XG4gICAgIH0gZWxzZSB7XG4gICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgIGNvbGxlY3RJbWFnZTp0aGF0LmRhdGEuaGFzQ29sbGVjdEltYWdlXG4gICAgICB9KTtcbiAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgIGltYWdlOiAnL3N0YXRpYy9pbWFnZXMvaWNvbl9lcnJvci5wbmcnLFxuICAgICAgdGl0bGU6IF9yZXMuZXJybXNnLFxuICAgICAgbWFzazogdHJ1ZVxuICAgICB9KTtcbiAgICB9XG4gIH1cblxuIH0sXG4gb3BlbkNhcnRQYWdlOiBmdW5jdGlvbigpIHtcbiAgd3gubmF2aWdhdGVUbyh7XG4gICB1cmw6ICcvcGFnZXMvY2FydC9jYXJ0J1xuICB9KTtcbiB9LFxuIGFkZEZhc3Q6IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGlmICh0aGlzLmRhdGEub3BlbkF0dHIgPT0gZmFsc2UpIHtcbiAgIC8v5omT5byA6KeE5qC86YCJ5oup56qX5Y+jXG4gICB0aGlzLnNldERhdGEoe1xuICAgIG9wZW5BdHRyOiAhdGhpcy5kYXRhLm9wZW5BdHRyXG4gICB9KTtcbiAgfSBlbHNlIHtcblxuICAgLy/mj5DnpLrpgInmi6nlrozmlbTop4TmoLxcbiAgIGlmICghdGhpcy5pc0NoZWNrZWRBbGxTcGVjKCkpIHtcbiAgICB3eC5zaG93VG9hc3Qoe1xuICAgICBpbWFnZTogJy4uLy4uL2NvbW1vbi9hc3NldHMvdGFiL2ljb25fZXJyb3IucG5nJyxcbiAgICAgdGl0bGU6ICfor7fpgInmi6nlrozmlbTop4TmoLwnXG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgfVxuXG4gICAvL+agueaNrumAieS4reeahOinhOagvO+8jOWIpOaWreaYr+WQpuacieWvueW6lOeahHNrdeS/oeaBr1xuICAgbGV0IGNoZWNrZWRQcm9kdWN0QXJyYXkgPSB0aGlzLmdldENoZWNrZWRQcm9kdWN0SXRlbSh0aGlzLmdldENoZWNrZWRTcGVjS2V5KCkpO1xuICAgaWYgKCFjaGVja2VkUHJvZHVjdEFycmF5IHx8IGNoZWNrZWRQcm9kdWN0QXJyYXkubGVuZ3RoIDw9IDApIHtcbiAgICAvL+aJvuS4jeWIsOWvueW6lOeahHByb2R1Y3Tkv6Hmga/vvIzmj5DnpLrmsqHmnInlupPlrZhcbiAgICB3eC5zaG93VG9hc3Qoe1xuICAgICBpbWFnZTogJy4uLy4uL2NvbW1vbi9hc3NldHMvdGFiL2ljb25fZXJyb3IucG5nJyxcbiAgICAgdGl0bGU6ICfmsqHmnInlupPlrZgnXG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgfVxuXG4gICBsZXQgY2hlY2tlZFByb2R1Y3QgPSBjaGVja2VkUHJvZHVjdEFycmF5WzBdO1xuICAgLy/pqozor4HlupPlrZhcbiAgIGlmIChjaGVja2VkUHJvZHVjdC5udW1iZXIgPD0gMCkge1xuICAgIHd4LnNob3dUb2FzdCh7XG4gICAgIGltYWdlOiAnLi4vLi4vY29tbW9uL2Fzc2V0cy90YWIvaWNvbl9lcnJvci5wbmcnLFxuICAgICB0aXRsZTogJ+ayoeacieW6k+WtmCdcbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG4gICB9XG5cbiAgIC8v56uL5Y2z6LSt5LmwXG4gZGFhdHkuQ2FydEZhc3RBZGQodGhpcy5kYXRhLmdvb2RzLmlkLHRoaXMuZGF0YS5udW1iZXIsY2hlY2tlZFByb2R1Y3QuaWQsbnVsbCxzdWNjZXNzRmF5KVxuICBmdW5jdGlvbiBzdWNjZXNzRmF5KHJlcywgc291cmNlT2JqKXtcbiAgICBpZiAoMCA9PSAwKSB7XG4gICAgICAvLyDlpoLmnpxzdG9yYWdl5Lit6K6+572u5LqGY2FydElk77yM5YiZ5piv56uL5Y2z6LSt5Lmw77yM5ZCm5YiZ5piv6LSt54mp6L2m6LSt5LmwXG4gICAgICB0cnkge1xuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2NhcnRJZCcsIHJlcy5kYXRhKTtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcvcGFnZXMvY2hlY2tvdXQvY2hlY2tvdXQnXG4gICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICBpbWFnZTogJy4uLy4uL2NvbW1vbi9hc3NldHMvdGFiL2ljb25fZXJyb3IucG5nJyxcbiAgICAgIHRpdGxlOiByZXMuZXJybXNnLFxuICAgICAgbWFzazogdHJ1ZVxuICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuIH0sXG4gYWRkVG9DYXJ0OiBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBpZiAodGhpcy5kYXRhLm9wZW5BdHRyID09IGZhbHNlKSB7XG4gICAvL+aJk+W8gOinhOagvOmAieaLqeeql+WPo1xuICAgdGhpcy5zZXREYXRhKHtcbiAgICBvcGVuQXR0cjogIXRoaXMuZGF0YS5vcGVuQXR0clxuICAgfSk7XG4gIH0gZWxzZSB7XG5cbiAgIC8v5o+Q56S66YCJ5oup5a6M5pW06KeE5qC8XG4gICBpZiAoIXRoaXMuaXNDaGVja2VkQWxsU3BlYygpKSB7XG4gICAgd3guc2hvd1RvYXN0KHtcbiAgICAgaW1hZ2U6ICcuLi8uLi9jb21tb24vYXNzZXRzL3RhYi9pY29uX2Vycm9yLnBuZycsXG4gICAgIHRpdGxlOiAn6K+36YCJ5oup5a6M5pW06KeE5qC8J1xuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbiAgIH1cblxuICAgLy/moLnmja7pgInkuK3nmoTop4TmoLzvvIzliKTmlq3mmK/lkKbmnInlr7nlupTnmoRza3Xkv6Hmga9cbiAgIGxldCBjaGVja2VkUHJvZHVjdEFycmF5ID0gdGhpcy5nZXRDaGVja2VkUHJvZHVjdEl0ZW0odGhpcy5nZXRDaGVja2VkU3BlY0tleSgpKTtcbiAgIGlmICghY2hlY2tlZFByb2R1Y3RBcnJheSB8fCBjaGVja2VkUHJvZHVjdEFycmF5Lmxlbmd0aCA8PSAwKSB7XG4gICAgLy/mib7kuI3liLDlr7nlupTnmoRwcm9kdWN05L+h5oGv77yM5o+Q56S65rKh5pyJ5bqT5a2YXG4gICAgd3guc2hvd1RvYXN0KHtcbiAgICAgaW1hZ2U6ICcuLi8uLi9jb21tb24vYXNzZXRzL3RhYi9pY29uX2Vycm9yLnBuZycsXG4gICAgIHRpdGxlOiAn5rKh5pyJ5bqT5a2YJ1xuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbiAgIH1cblxuICAgbGV0IGNoZWNrZWRQcm9kdWN0ID0gY2hlY2tlZFByb2R1Y3RBcnJheVswXTtcbiAgIC8v6aqM6K+B5bqT5a2YXG4gICBpZiAoY2hlY2tlZFByb2R1Y3QubnVtYmVyIDw9IDApIHtcbiAgICB3eC5zaG93VG9hc3Qoe1xuICAgICBpbWFnZTogJy4uLy4uL2NvbW1vbi9hc3NldHMvdGFiL2ljb25fZXJyb3IucG5nJyxcbiAgICAgdGl0bGU6ICfmsqHmnInlupPlrZgnXG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgfVxuXG4gICAvL+a3u+WKoOWIsOi0reeJqei9plxuICAgZGFhdHkuQ2FydEFkZCh0aGlzLmRhdGEuZ29vZHMuaWQsdGhpcy5kYXRhLm51bWJlcixjaGVja2VkUHJvZHVjdC5pZCxudWxsLHN1Y2Nlc3NGYXkpXG4gIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLCBzb3VyY2VPYmope1xuICAgICAgIGxldCBfcmVzID0gcmVzO1xuICAgICAgICBpZiAoMCA9PSAwKSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+a3u+WKoOaIkOWKnydcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIG9wZW5BdHRyOiAhdGhhdC5kYXRhLm9wZW5BdHRyLFxuICAgICAgICAgIGNhcnRHb29kc0NvdW50OiBfcmVzLmRhdGFcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAodGhhdC5kYXRhLnVzZXJIYXNDb2xsZWN0ID09IDEpIHtcbiAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgY29sbGVjdEltYWdlOiB0aGF0LmRhdGEuaGFzQ29sbGVjdEltYWdlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgY29sbGVjdEltYWdlOiB0aGF0LmRhdGEubm9Db2xsZWN0SW1hZ2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICBpbWFnZTogJy4uLy4uL2NvbW1vbi9hc3NldHMvdGFiL2ljb25fZXJyb3IucG5nJyxcbiAgICAgICAgICB0aXRsZTogX3Jlcy5lcnJtc2csXG4gICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiB9LFxuIGN1dE51bWJlcjogZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2V0RGF0YSh7XG4gICBudW1iZXI6ICh0aGlzLmRhdGEubnVtYmVyIC0gMSA+IDEpID8gdGhpcy5kYXRhLm51bWJlciAtIDEgOiAxXG4gIH0pO1xuIH0sXG4gYWRkTnVtYmVyOiBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXREYXRhKHtcbiAgIG51bWJlcjogdGhpcy5kYXRhLm51bWJlciArIDFcbiAgfSk7XG4gfSxcbiBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciB1aWRzID0gdGhpcy5kYXRhLmlkXG4gICAgICB2YXIgbmFtciA9IHRoaXMuZGF0YS5nb29kcy5uYW1lXG4gICAgICB2YXIgcGF0aD0ncGFnZXMvZ29vZHMvZ29vZHM/aWQ9Jyt1aWRzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGl0bGU6IG5hbXIsXG4gICAgICAgICAgICAvLyBkZXNjOiAn5YiG5Lqr6aG16Z2i55qE5YaF5a65JyxcbiAgICAgICAgICAgIGltYWdlVXJsOlwiXCIsXG4gICAgICAgICAgICBwYXRoOiBwYXRoLCAgLy8g6Lev5b6E77yM5Lyg6YCS5Y+C5pWw5Yiw5oyH5a6a6aG16Z2i44CCXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L2s5Y+R5oiQ5YqfXCIsIHJlcyk7XG4gICAgICAgICAgICAgICAgLy8gZGFhdHkub3BlcmF0aW9uTGlzdCh1c2VyaWQsdWlkcyxudWxsLHN1Y2Nlc3NGYSlcbiAgICAgICAgICAgICAgICAvLyAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYShkYXRhLCBzb3VyY2VPYmope1xuXG4gICAgICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLovazlj5HlpLHotKVcIiwgcmVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=