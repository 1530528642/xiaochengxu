"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var daaty = require("../../utils/api2.js");
var tip = require("../../utils/tip.js");
var utily = require("../../utils/util.js");
var app = getApp();
exports.default = Page({
  // districtId
  data: {
    address: {
      id: 0,
      provinceId: 0,
      cityId: 0,
      districtId: 0,
      address: '',
      name: '',
      mobile: '',
      isDefault: 0,
      provinceName: '',
      cityName: '',
      areaName: ''
    },
    addressId: 0,
    openSelectRegion: false,
    selectRegionList: [{ id: 0, name: '省份', pid: 1, type: 1 }, { id: 0, name: '城市', pid: 1, type: 2 }, { id: 0, name: '区县', pid: 1, type: 3 }],
    regionType: 1,
    regionList: [],
    selectRegionDone: false
  },
  bindinputMobile: function bindinputMobile(event) {
    var address = this.data.address;
    address.mobile = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputName: function bindinputName(event) {
    var address = this.data.address;
    address.name = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputAddress: function bindinputAddress(event) {
    var address = this.data.address;
    address.address = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindIsDefault: function bindIsDefault() {
    var address = this.data.address;
    address.isDefault = !address.isDefault;
    this.setData({
      address: address
    });
  },
  getAddressDetail: function getAddressDetail() {
    var that = this;
    daaty.AddressDetail(that.data.addressId, null, successFay);
    function successFay(res, sourceObj) {
      console.log(res.data);
      if (res.data) {
        console.log(88888899999);
        that.setData({
          address: res.data
        });
      }
    }
  },
  setRegionDoneStatus: function setRegionDoneStatus() {
    var that = this;
    var doneStatus = that.data.selectRegionList.every(function (item) {
      return item.id != 0;
    });

    that.setData({
      selectRegionDone: doneStatus
    });
  },
  chooseRegion: function chooseRegion() {
    var that = this;
    this.setData({
      openSelectRegion: !this.data.openSelectRegion
    });
    //设置区域选择数据
    var address = this.data.address;
    if (address.provinceId > 0 && address.cityId > 0 && address.districtId > 0) {
      var selectRegionList = this.data.selectRegionList;
      selectRegionList[0].id = address.provinceId;
      selectRegionList[0].name = address.provinceName;
      selectRegionList[0].pid = 0;

      selectRegionList[1].id = address.cityId;
      selectRegionList[1].name = address.cityName;
      selectRegionList[1].pid = address.provinceId;

      selectRegionList[2].id = address.districtId;
      selectRegionList[2].name = address.areaName;
      selectRegionList[2].pid = address.cityId;

      this.setData({
        selectRegionList: selectRegionList,
        regionType: 3
      });
      this.getRegionList(address.cityId);
    } else {
      this.setData({
        selectRegionList: [{ id: 0, name: '省份', pid: 0, type: 1 }, { id: 0, name: '城市', pid: 0, type: 2 }, { id: 0, name: '区县', pid: 0, type: 3 }],
        regionType: 1
      });
      this.getRegionList(0);
    }

    this.setRegionDoneStatus();
  },

  onLoad: function onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({ userId: options.userId });
    console.log(options);
    if (options.id && options.id != 0) {
      this.setData({
        addressId: options.id
      });
      this.getAddressDetail();
    }
  },
  onReady: function onReady() {},
  selectRegionType: function selectRegionType(event) {
    var that = this;
    var regionTypeIndex = event.target.dataset.regionTypeIndex;
    var selectRegionList = that.data.selectRegionList;

    //判断是否可点击
    if (regionTypeIndex + 1 == this.data.regionType || regionTypeIndex - 1 >= 0 && selectRegionList[regionTypeIndex - 1].id <= 0) {
      return false;
    }

    this.setData({
      regionType: regionTypeIndex + 1
    });

    var selectRegionItem = selectRegionList[regionTypeIndex];

    this.getRegionList(selectRegionItem.pid);

    this.setRegionDoneStatus();
  },
  selectRegion: function selectRegion(event) {
    var that = this;
    var regionIndex = event.target.dataset.regionIndex;
    var regionItem = this.data.regionList[regionIndex];
    var regionType = regionItem.type;
    var selectRegionList = this.data.selectRegionList;
    selectRegionList[regionType - 1] = regionItem;

    if (regionType != 3) {
      this.setData({
        selectRegionList: selectRegionList,
        regionType: regionType + 1
      });
      this.getRegionList(regionItem.id);
    } else {
      this.setData({
        selectRegionList: selectRegionList
      });
    }

    //重置下级区域为空
    selectRegionList.map(function (item, index) {
      if (index > regionType - 1) {
        item.id = 0;
        item.name = index == 1 ? '城市' : '区县';
        item.pid = 0;
      }
      return item;
    });

    this.setData({
      selectRegionList: selectRegionList
    });

    that.setData({
      regionList: that.data.regionList.map(function (item) {
        //标记已选择的
        if (that.data.regionType == item.type && that.data.selectRegionList[that.data.regionType - 1].id == item.id) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      })
    });

    this.setRegionDoneStatus();
  },
  doneSelectRegion: function doneSelectRegion() {
    if (this.data.selectRegionDone === false) {
      return false;
    }

    var address = this.data.address;
    var selectRegionList = this.data.selectRegionList;
    address.provinceId = selectRegionList[0].id;
    address.cityId = selectRegionList[1].id;
    address.districtId = selectRegionList[2].id;
    address.provinceName = selectRegionList[0].name;
    address.cityName = selectRegionList[1].name;
    address.areaName = selectRegionList[2].name;
    this.setData({
      address: address,
      openSelectRegion: false
    });
  },
  cancelSelectRegion: function cancelSelectRegion() {
    this.setData({
      openSelectRegion: false,
      regionType: this.data.regionDoneStatus ? 3 : 1
    });
  },
  getRegionList: function getRegionList(regionId) {
    var that = this;
    var regionType = that.data.regionType;
    // console.log(regionId,"regionId")
    // return false;
    daaty.RegionList(regionId, null, successFay);
    function successFay(res, sourceObj) {
      that.setData({
        regionList: res.data.map(function (item) {
          //标记已选择的
          if (regionType == item.type && that.data.selectRegionList[regionType - 1].id == item.id) {
            item.selected = true;
          } else {
            item.selected = false;
          }

          return item;
        })
      });
    }
  },
  cancelAddress: function cancelAddress() {
    wx.navigateBack();
  },
  saveAddress: function saveAddress() {
    var address = this.data.address;

    if (address.name == '') {
      tip.showToast('请输入姓名');
      return false;
    }

    if (address.mobile == '') {
      tip.showToast('请输入手机号码');
      return false;
    }

    if (address.districtId == 0) {
      tip.showToast('请输入省市区');
      return false;
    }

    if (address.address == '') {
      tip.showToast('请输入详细地址');
      return false;
    }

    if (!utily.isValidPhone(address.mobile)) {
      tip.showToast('手机号不正确');
      return false;
    }

    var that = this;
    daaty.AddressSave(address.id, address.name, address.mobile, address.provinceId, address.cityId, address.districtId, address.address, address.isDefault, address.provinceName, address.cityName, address.areaName, null, successFay);
    function successFay(res, sourceObj) {
      //  if (res.errno === 0) {
      //返回之前，先取出上一页对象，并设置addressId
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      console.log(prevPage);
      if (prevPage.route == "pages/checkout/checkout") {
        prevPage.setData({
          addressId: res.data
        });

        try {
          console.log(res.data, 111122223333333);
          wx.setStorageSync('addressId', res.data);
        } catch (e) {}
        console.log("set address");
      }
      wx.navigateBack();
      // }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3NBZGQud3hwIl0sIm5hbWVzIjpbImRhYXR5IiwicmVxdWlyZSIsInRpcCIsInV0aWx5IiwiYXBwIiwiZ2V0QXBwIiwiZGF0YSIsImFkZHJlc3MiLCJpZCIsInByb3ZpbmNlSWQiLCJjaXR5SWQiLCJkaXN0cmljdElkIiwibmFtZSIsIm1vYmlsZSIsImlzRGVmYXVsdCIsInByb3ZpbmNlTmFtZSIsImNpdHlOYW1lIiwiYXJlYU5hbWUiLCJhZGRyZXNzSWQiLCJvcGVuU2VsZWN0UmVnaW9uIiwic2VsZWN0UmVnaW9uTGlzdCIsInBpZCIsInR5cGUiLCJyZWdpb25UeXBlIiwicmVnaW9uTGlzdCIsInNlbGVjdFJlZ2lvbkRvbmUiLCJiaW5kaW5wdXRNb2JpbGUiLCJldmVudCIsImRldGFpbCIsInZhbHVlIiwic2V0RGF0YSIsImJpbmRpbnB1dE5hbWUiLCJiaW5kaW5wdXRBZGRyZXNzIiwiYmluZElzRGVmYXVsdCIsImdldEFkZHJlc3NEZXRhaWwiLCJ0aGF0IiwiQWRkcmVzc0RldGFpbCIsInN1Y2Nlc3NGYXkiLCJyZXMiLCJzb3VyY2VPYmoiLCJjb25zb2xlIiwibG9nIiwic2V0UmVnaW9uRG9uZVN0YXR1cyIsImRvbmVTdGF0dXMiLCJldmVyeSIsIml0ZW0iLCJjaG9vc2VSZWdpb24iLCJnZXRSZWdpb25MaXN0Iiwib25Mb2FkIiwib3B0aW9ucyIsInVzZXJJZCIsIm9uUmVhZHkiLCJzZWxlY3RSZWdpb25UeXBlIiwicmVnaW9uVHlwZUluZGV4IiwidGFyZ2V0IiwiZGF0YXNldCIsInNlbGVjdFJlZ2lvbkl0ZW0iLCJzZWxlY3RSZWdpb24iLCJyZWdpb25JbmRleCIsInJlZ2lvbkl0ZW0iLCJtYXAiLCJpbmRleCIsInNlbGVjdGVkIiwiZG9uZVNlbGVjdFJlZ2lvbiIsImNhbmNlbFNlbGVjdFJlZ2lvbiIsInJlZ2lvbkRvbmVTdGF0dXMiLCJyZWdpb25JZCIsIlJlZ2lvbkxpc3QiLCJjYW5jZWxBZGRyZXNzIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJzYXZlQWRkcmVzcyIsInNob3dUb2FzdCIsImlzVmFsaWRQaG9uZSIsIkFkZHJlc3NTYXZlIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJwcmV2UGFnZSIsImxlbmd0aCIsInJvdXRlIiwic2V0U3RvcmFnZVN5bmMiLCJlIiwib25TaG93Iiwib25IaWRlIiwib25VbmxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsUUFBU0MsUUFBUSxxQkFBUixDQUFiO0FBQ0EsSUFBSUMsTUFBTUQsUUFBUSxvQkFBUixDQUFWO0FBQ0EsSUFBSUUsUUFBUUYsUUFBUSxxQkFBUixDQUFaO0FBQ0EsSUFBSUcsTUFBTUMsUUFBVjs7QUFNRTtBQUNDQyxRQUFNO0FBQ0xDLGFBQVM7QUFDUEMsVUFBRyxDQURJO0FBRVBDLGtCQUFZLENBRkw7QUFHUEMsY0FBUSxDQUhEO0FBSVBDLGtCQUFZLENBSkw7QUFLUEosZUFBUyxFQUxGO0FBTVBLLFlBQU0sRUFOQztBQU9QQyxjQUFRLEVBUEQ7QUFRUEMsaUJBQVcsQ0FSSjtBQVNQQyxvQkFBYyxFQVRQO0FBVVBDLGdCQUFVLEVBVkg7QUFXUEMsZ0JBQVU7QUFYSCxLQURKO0FBY0xDLGVBQVcsQ0FkTjtBQWVMQyxzQkFBa0IsS0FmYjtBQWdCTEMsc0JBQWtCLENBQ2hCLEVBQUVaLElBQUksQ0FBTixFQUFTSSxNQUFNLElBQWYsRUFBcUJTLEtBQUssQ0FBMUIsRUFBNkJDLE1BQU0sQ0FBbkMsRUFEZ0IsRUFFaEIsRUFBRWQsSUFBSSxDQUFOLEVBQVNJLE1BQU0sSUFBZixFQUFxQlMsS0FBSyxDQUExQixFQUE2QkMsTUFBTSxDQUFuQyxFQUZnQixFQUdoQixFQUFFZCxJQUFJLENBQU4sRUFBU0ksTUFBTSxJQUFmLEVBQXFCUyxLQUFLLENBQTFCLEVBQTZCQyxNQUFNLENBQW5DLEVBSGdCLENBaEJiO0FBcUJMQyxnQkFBWSxDQXJCUDtBQXNCTEMsZ0JBQVksRUF0QlA7QUF1QkxDLHNCQUFrQjtBQXZCYixHO0FBeUJQQyxpQiwyQkFBZ0JDLEssRUFBTztBQUNyQixR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QUFnSlAsUUFBUVEsWUFBeEosRUFBcUtSLFFBQVFTLFFBQTdLLEVBQXNMVCxRQUFRVSxRQUE5TCxFQUF1TSxJQUF2TSxFQUE0TW9CLFVBQTVNO0FBQ0UsYUFBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLFNBQXpCLEVBQW1DO0FBQy9CO0FBQ0Y7QUFDQSxVQUFJb0MsUUFBUUMsaUJBQVo7QUFDQSxVQUFJQyxXQUFXRixNQUFNQSxNQUFNRyxNQUFOLEdBQWUsQ0FBckIsQ0FBZjtBQUNBdEMsY0FBUUMsR0FBUixDQUFZb0MsUUFBWjtBQUNBLFVBQUlBLFNBQVNFLEtBQVQsSUFBa0IseUJBQXRCLEVBQWlEO0FBQy9DRixpQkFBUy9DLE9BQVQsQ0FBaUI7QUFDZloscUJBQVdvQixJQUFJaEM7QUFEQSxTQUFqQjs7QUFJQSxZQUFJO0FBQ0ZrQyxrQkFBUUMsR0FBUixDQUFZSCxJQUFJaEMsSUFBaEIsRUFBcUIsZUFBckI7QUFDQStELGFBQUdXLGNBQUgsQ0FBa0IsV0FBbEIsRUFBK0IxQyxJQUFJaEMsSUFBbkM7QUFDRCxTQUhELENBR0UsT0FBTzJFLENBQVAsRUFBVSxDQUVYO0FBQ0R6QyxnQkFBUUMsR0FBUixDQUFZLGFBQVo7QUFDRDtBQUNENEIsU0FBR0MsWUFBSDtBQUNBO0FBQ0Q7QUFDSixHOztBQUNEWSxVQUFRLGtCQUFZO0FBQ2xCOztBQUVELEc7QUFDREMsVUFBUSxrQkFBWTtBQUNsQjs7QUFFRCxHO0FBQ0RDLFlBQVUsb0JBQVk7QUFDcEI7O0FBRUQiLCJmaWxlIjoiYWRkcmVzc0FkZC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGFhdHkgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL2FwaTIuanNcIilcbnZhciB0aXAgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvdGlwLmpzXCIpXG52YXIgdXRpbHkgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvdXRpbC5qc1wiKVxudmFyIGFwcCA9IGdldEFwcCgpXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlrDlu7rlnLDlnYAnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge31cbiAgfSxcbiAgLy8gZGlzdHJpY3RJZFxuICAgZGF0YToge1xuICAgIGFkZHJlc3M6IHtcbiAgICAgIGlkOjAsXG4gICAgICBwcm92aW5jZUlkOiAwLFxuICAgICAgY2l0eUlkOiAwLFxuICAgICAgZGlzdHJpY3RJZDogMCxcbiAgICAgIGFkZHJlc3M6ICcnLFxuICAgICAgbmFtZTogJycsXG4gICAgICBtb2JpbGU6ICcnLFxuICAgICAgaXNEZWZhdWx0OiAwLFxuICAgICAgcHJvdmluY2VOYW1lOiAnJyxcbiAgICAgIGNpdHlOYW1lOiAnJyxcbiAgICAgIGFyZWFOYW1lOiAnJ1xuICAgIH0sXG4gICAgYWRkcmVzc0lkOiAwLFxuICAgIG9wZW5TZWxlY3RSZWdpb246IGZhbHNlLFxuICAgIHNlbGVjdFJlZ2lvbkxpc3Q6IFtcbiAgICAgIHsgaWQ6IDAsIG5hbWU6ICfnnIHku70nLCBwaWQ6IDEsIHR5cGU6IDEgfSxcbiAgICAgIHsgaWQ6IDAsIG5hbWU6ICfln47luIInLCBwaWQ6IDEsIHR5cGU6IDIgfSxcbiAgICAgIHsgaWQ6IDAsIG5hbWU6ICfljLrljr8nLCBwaWQ6IDEsIHR5cGU6IDMgfVxuICAgIF0sXG4gICAgcmVnaW9uVHlwZTogMSxcbiAgICByZWdpb25MaXN0OiBbXSxcbiAgICBzZWxlY3RSZWdpb25Eb25lOiBmYWxzZVxuICB9LFxuICBiaW5kaW5wdXRNb2JpbGUoZXZlbnQpIHtcbiAgICBsZXQgYWRkcmVzcyA9IHRoaXMuZGF0YS5hZGRyZXNzO1xuICAgIGFkZHJlc3MubW9iaWxlID0gZXZlbnQuZGV0YWlsLnZhbHVlO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBhZGRyZXNzOiBhZGRyZXNzXG4gICAgfSk7XG4gIH0sXG4gIGJpbmRpbnB1dE5hbWUoZXZlbnQpIHtcbiAgICBsZXQgYWRkcmVzcyA9IHRoaXMuZGF0YS5hZGRyZXNzO1xuICAgIGFkZHJlc3MubmFtZSA9IGV2ZW50LmRldGFpbC52YWx1ZTtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgYWRkcmVzczogYWRkcmVzc1xuICAgIH0pO1xuICB9LFxuICBiaW5kaW5wdXRBZGRyZXNzIChldmVudCl7XG4gICAgbGV0IGFkZHJlc3MgPSB0aGlzLmRhdGEuYWRkcmVzcztcbiAgICBhZGRyZXNzLmFkZHJlc3MgPSBldmVudC5kZXRhaWwudmFsdWU7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGFkZHJlc3M6IGFkZHJlc3NcbiAgICB9KTtcbiAgfSxcbiAgYmluZElzRGVmYXVsdCgpe1xuICAgIGxldCBhZGRyZXNzID0gdGhpcy5kYXRhLmFkZHJlc3M7XG4gICAgYWRkcmVzcy5pc0RlZmF1bHQgPSAhYWRkcmVzcy5pc0RlZmF1bHQ7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGFkZHJlc3M6IGFkZHJlc3NcbiAgICB9KTtcbiAgfSxcbiAgZ2V0QWRkcmVzc0RldGFpbCgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICBkYWF0eS5BZGRyZXNzRGV0YWlsKHRoYXQuZGF0YS5hZGRyZXNzSWQsbnVsbCxzdWNjZXNzRmF5KVxuICAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxuICAgICAgICBpZihyZXMuZGF0YSl7XG4gICAgICAgICAgIGNvbnNvbGUubG9nKDg4ODg4ODk5OTk5KVxuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMuZGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgfSxcbiAgc2V0UmVnaW9uRG9uZVN0YXR1cygpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IGRvbmVTdGF0dXMgPSB0aGF0LmRhdGEuc2VsZWN0UmVnaW9uTGlzdC5ldmVyeShpdGVtID0+IHtcbiAgICAgIHJldHVybiBpdGVtLmlkICE9IDA7XG4gICAgfSk7XG5cbiAgICB0aGF0LnNldERhdGEoe1xuICAgICAgc2VsZWN0UmVnaW9uRG9uZTogZG9uZVN0YXR1c1xuICAgIH0pXG5cbiAgfSxcbiAgY2hvb3NlUmVnaW9uKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgb3BlblNlbGVjdFJlZ2lvbjogIXRoaXMuZGF0YS5vcGVuU2VsZWN0UmVnaW9uXG4gICAgfSk7XG4gICAgLy/orr7nva7ljLrln5/pgInmi6nmlbDmja5cbiAgICBsZXQgYWRkcmVzcyA9IHRoaXMuZGF0YS5hZGRyZXNzO1xuICAgIGlmIChhZGRyZXNzLnByb3ZpbmNlSWQgPiAwICYmIGFkZHJlc3MuY2l0eUlkID4gMCAmJiBhZGRyZXNzLmRpc3RyaWN0SWQgPiAwKSB7XG4gICAgICBsZXQgc2VsZWN0UmVnaW9uTGlzdCA9IHRoaXMuZGF0YS5zZWxlY3RSZWdpb25MaXN0O1xuICAgICAgc2VsZWN0UmVnaW9uTGlzdFswXS5pZCA9IGFkZHJlc3MucHJvdmluY2VJZDtcbiAgICAgIHNlbGVjdFJlZ2lvbkxpc3RbMF0ubmFtZSA9IGFkZHJlc3MucHJvdmluY2VOYW1lO1xuICAgICAgc2VsZWN0UmVnaW9uTGlzdFswXS5waWQgPSAwO1xuXG4gICAgICBzZWxlY3RSZWdpb25MaXN0WzFdLmlkID0gYWRkcmVzcy5jaXR5SWQ7XG4gICAgICBzZWxlY3RSZWdpb25MaXN0WzFdLm5hbWUgPSBhZGRyZXNzLmNpdHlOYW1lO1xuICAgICAgc2VsZWN0UmVnaW9uTGlzdFsxXS5waWQgPSBhZGRyZXNzLnByb3ZpbmNlSWQ7XG5cbiAgICAgIHNlbGVjdFJlZ2lvbkxpc3RbMl0uaWQgPSBhZGRyZXNzLmRpc3RyaWN0SWQ7XG4gICAgICBzZWxlY3RSZWdpb25MaXN0WzJdLm5hbWUgPSBhZGRyZXNzLmFyZWFOYW1lO1xuICAgICAgc2VsZWN0UmVnaW9uTGlzdFsyXS5waWQgPSBhZGRyZXNzLmNpdHlJZDtcblxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgc2VsZWN0UmVnaW9uTGlzdDogc2VsZWN0UmVnaW9uTGlzdCxcbiAgICAgICAgcmVnaW9uVHlwZTogM1xuICAgICAgfSk7XG4gICAgICB0aGlzLmdldFJlZ2lvbkxpc3QoYWRkcmVzcy5jaXR5SWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBzZWxlY3RSZWdpb25MaXN0OiBbXG4gICAgICAgICAgeyBpZDogMCwgbmFtZTogJ+ecgeS7vScsIHBpZDogMCwgdHlwZTogMSB9LFxuICAgICAgICAgIHsgaWQ6IDAsIG5hbWU6ICfln47luIInLCBwaWQ6IDAsIHR5cGU6IDIgfSxcbiAgICAgICAgICB7IGlkOiAwLCBuYW1lOiAn5Yy65Y6/JywgcGlkOiAwLCB0eXBlOiAzIH1cbiAgICAgICAgXSxcbiAgICAgICAgcmVnaW9uVHlwZTogMVxuICAgICAgfSlcbiAgICAgIHRoaXMuZ2V0UmVnaW9uTGlzdCgwKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFJlZ2lvbkRvbmVTdGF0dXMoKTtcblxuICB9LFxuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgLy8g6aG16Z2i5Yid5aeL5YyWIG9wdGlvbnPkuLrpobXpnaLot7PovazmiYDluKbmnaXnmoTlj4LmlbBcbiAgICB0aGlzLnNldERhdGEoe3VzZXJJZDpvcHRpb25zLnVzZXJJZH0pXG4gICAgY29uc29sZS5sb2cob3B0aW9ucylcbiAgICBpZiAob3B0aW9ucy5pZCAmJiBvcHRpb25zLmlkICE9IDApIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGFkZHJlc3NJZDogb3B0aW9ucy5pZFxuICAgICAgfSk7XG4gICAgICB0aGlzLmdldEFkZHJlc3NEZXRhaWwoKTtcbiAgICB9XG4gIH0sXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuICBzZWxlY3RSZWdpb25UeXBlKGV2ZW50KSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCByZWdpb25UeXBlSW5kZXggPSBldmVudC50YXJnZXQuZGF0YXNldC5yZWdpb25UeXBlSW5kZXg7XG4gICAgbGV0IHNlbGVjdFJlZ2lvbkxpc3QgPSB0aGF0LmRhdGEuc2VsZWN0UmVnaW9uTGlzdDtcblxuICAgIC8v5Yik5pat5piv5ZCm5Y+v54K55Ye7XG4gICAgaWYgKHJlZ2lvblR5cGVJbmRleCArIDEgPT0gdGhpcy5kYXRhLnJlZ2lvblR5cGUgfHwgKHJlZ2lvblR5cGVJbmRleCAtIDEgPj0gMCAmJiBzZWxlY3RSZWdpb25MaXN0W3JlZ2lvblR5cGVJbmRleC0xXS5pZCA8PSAwKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICByZWdpb25UeXBlOiByZWdpb25UeXBlSW5kZXggKyAxXG4gICAgfSlcbiAgICBcbiAgICBsZXQgc2VsZWN0UmVnaW9uSXRlbSA9IHNlbGVjdFJlZ2lvbkxpc3RbcmVnaW9uVHlwZUluZGV4XTtcblxuICAgIHRoaXMuZ2V0UmVnaW9uTGlzdChzZWxlY3RSZWdpb25JdGVtLnBpZCk7XG5cbiAgICB0aGlzLnNldFJlZ2lvbkRvbmVTdGF0dXMoKTtcblxuICB9LFxuICBzZWxlY3RSZWdpb24oZXZlbnQpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHJlZ2lvbkluZGV4ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQucmVnaW9uSW5kZXg7XG4gICAgbGV0IHJlZ2lvbkl0ZW0gPSB0aGlzLmRhdGEucmVnaW9uTGlzdFtyZWdpb25JbmRleF07XG4gICAgbGV0IHJlZ2lvblR5cGUgPSByZWdpb25JdGVtLnR5cGU7XG4gICAgbGV0IHNlbGVjdFJlZ2lvbkxpc3QgPSB0aGlzLmRhdGEuc2VsZWN0UmVnaW9uTGlzdDtcbiAgICBzZWxlY3RSZWdpb25MaXN0W3JlZ2lvblR5cGUgLSAxXSA9IHJlZ2lvbkl0ZW07XG5cbiAgICBpZiAocmVnaW9uVHlwZSAhPSAzKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBzZWxlY3RSZWdpb25MaXN0OiBzZWxlY3RSZWdpb25MaXN0LFxuICAgICAgICByZWdpb25UeXBlOiByZWdpb25UeXBlICsgMVxuICAgICAgfSlcbiAgICAgIHRoaXMuZ2V0UmVnaW9uTGlzdChyZWdpb25JdGVtLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgc2VsZWN0UmVnaW9uTGlzdDogc2VsZWN0UmVnaW9uTGlzdFxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvL+mHjee9ruS4i+e6p+WMuuWfn+S4uuepulxuICAgIHNlbGVjdFJlZ2lvbkxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGluZGV4ID4gcmVnaW9uVHlwZSAtIDEpIHtcbiAgICAgICAgaXRlbS5pZCA9IDA7XG4gICAgICAgIGl0ZW0ubmFtZSA9IGluZGV4ID09IDEgPyAn5Z+O5biCJyA6ICfljLrljr8nO1xuICAgICAgICBpdGVtLnBpZCA9IDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBzZWxlY3RSZWdpb25MaXN0OiBzZWxlY3RSZWdpb25MaXN0XG4gICAgfSlcblxuICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICByZWdpb25MaXN0OiB0aGF0LmRhdGEucmVnaW9uTGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIC8v5qCH6K6w5bey6YCJ5oup55qEXG4gICAgICAgIGlmICh0aGF0LmRhdGEucmVnaW9uVHlwZSA9PSBpdGVtLnR5cGUgJiYgdGhhdC5kYXRhLnNlbGVjdFJlZ2lvbkxpc3RbdGhhdC5kYXRhLnJlZ2lvblR5cGUgLSAxXS5pZCA9PSBpdGVtLmlkKSB7XG4gICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfSlcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0UmVnaW9uRG9uZVN0YXR1cygpO1xuXG4gIH0sXG4gIGRvbmVTZWxlY3RSZWdpb24oKSB7XG4gICAgaWYgKHRoaXMuZGF0YS5zZWxlY3RSZWdpb25Eb25lID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxldCBhZGRyZXNzID0gdGhpcy5kYXRhLmFkZHJlc3M7XG4gICAgbGV0IHNlbGVjdFJlZ2lvbkxpc3QgPSB0aGlzLmRhdGEuc2VsZWN0UmVnaW9uTGlzdDtcbiAgICBhZGRyZXNzLnByb3ZpbmNlSWQgPSBzZWxlY3RSZWdpb25MaXN0WzBdLmlkO1xuICAgIGFkZHJlc3MuY2l0eUlkID0gc2VsZWN0UmVnaW9uTGlzdFsxXS5pZDtcbiAgICBhZGRyZXNzLmRpc3RyaWN0SWQgPSBzZWxlY3RSZWdpb25MaXN0WzJdLmlkO1xuICAgIGFkZHJlc3MucHJvdmluY2VOYW1lID0gc2VsZWN0UmVnaW9uTGlzdFswXS5uYW1lO1xuICAgIGFkZHJlc3MuY2l0eU5hbWUgPSBzZWxlY3RSZWdpb25MaXN0WzFdLm5hbWU7XG4gICAgYWRkcmVzcy5hcmVhTmFtZSA9IHNlbGVjdFJlZ2lvbkxpc3RbMl0ubmFtZTtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgYWRkcmVzczogYWRkcmVzcyxcbiAgICAgIG9wZW5TZWxlY3RSZWdpb246IGZhbHNlXG4gICAgfSk7XG5cbiAgfSxcbiAgY2FuY2VsU2VsZWN0UmVnaW9uKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBvcGVuU2VsZWN0UmVnaW9uOiBmYWxzZSxcbiAgICAgIHJlZ2lvblR5cGU6IHRoaXMuZGF0YS5yZWdpb25Eb25lU3RhdHVzID8gMyA6IDFcbiAgICB9KTtcblxuICB9LFxuICBnZXRSZWdpb25MaXN0KHJlZ2lvbklkKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCByZWdpb25UeXBlID0gdGhhdC5kYXRhLnJlZ2lvblR5cGU7XG4gICAgLy8gY29uc29sZS5sb2cocmVnaW9uSWQsXCJyZWdpb25JZFwiKVxuICAgIC8vIHJldHVybiBmYWxzZTtcbiAgICAgIGRhYXR5LlJlZ2lvbkxpc3QocmVnaW9uSWQsbnVsbCxzdWNjZXNzRmF5KVxuICAgICAgZnVuY3Rpb24gc3VjY2Vzc0ZheShyZXMsIHNvdXJjZU9iail7XG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgcmVnaW9uTGlzdDogcmVzLmRhdGEubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgLy/moIforrDlt7LpgInmi6nnmoRcbiAgICAgICAgICAgIGlmIChyZWdpb25UeXBlID09IGl0ZW0udHlwZSAmJiB0aGF0LmRhdGEuc2VsZWN0UmVnaW9uTGlzdFtyZWdpb25UeXBlIC0gMV0uaWQgPT0gaXRlbS5pZCkge1xuICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gIH0sXG4gIGNhbmNlbEFkZHJlc3MoKXtcbiAgICB3eC5uYXZpZ2F0ZUJhY2soKTtcbiAgfSxcbiAgc2F2ZUFkZHJlc3MoKXtcbiAgICBsZXQgYWRkcmVzcyA9IHRoaXMuZGF0YS5hZGRyZXNzO1xuXG4gICAgaWYgKGFkZHJlc3MubmFtZSA9PSAnJykge1xuICAgICAgdGlwLnNob3dUb2FzdCgn6K+36L6T5YWl5aeT5ZCNJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGFkZHJlc3MubW9iaWxlID09ICcnKSB7XG4gICAgICB0aXAuc2hvd1RvYXN0KCfor7fovpPlhaXmiYvmnLrlj7fnoIEnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIGlmIChhZGRyZXNzLmRpc3RyaWN0SWQgPT0gMCkge1xuICAgICAgdGlwLnNob3dUb2FzdCgn6K+36L6T5YWl55yB5biC5Yy6Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGFkZHJlc3MuYWRkcmVzcyA9PSAnJykge1xuICAgICAgdGlwLnNob3dUb2FzdCgn6K+36L6T5YWl6K+m57uG5Zyw5Z2AJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCF1dGlseS5pc1ZhbGlkUGhvbmUoYWRkcmVzcy5tb2JpbGUpKSB7XG4gICAgICB0aXAuc2hvd1RvYXN0KCfmiYvmnLrlj7fkuI3mraPnoa4nKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgZGFhdHkuQWRkcmVzc1NhdmUoYWRkcmVzcy5pZCxhZGRyZXNzLm5hbWUsYWRkcmVzcy5tb2JpbGUsYWRkcmVzcy5wcm92aW5jZUlkLGFkZHJlc3MuY2l0eUlkLGFkZHJlc3MuZGlzdHJpY3RJZCxhZGRyZXNzLmFkZHJlc3MsYWRkcmVzcy5pc0RlZmF1bHQsYWRkcmVzcy5wcm92aW5jZU5hbWUsYWRkcmVzcy5jaXR5TmFtZSxhZGRyZXNzLmFyZWFOYW1lLG51bGwsc3VjY2Vzc0ZheSlcbiAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkocmVzLCBzb3VyY2VPYmope1xuICAgICAgICAgIC8vICBpZiAocmVzLmVycm5vID09PSAwKSB7XG4gICAgICAgIC8v6L+U5Zue5LmL5YmN77yM5YWI5Y+W5Ye65LiK5LiA6aG15a+56LGh77yM5bm26K6+572uYWRkcmVzc0lkXG4gICAgICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xuICAgICAgICB2YXIgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcbiAgICAgICAgY29uc29sZS5sb2cocHJldlBhZ2UpO1xuICAgICAgICBpZiAocHJldlBhZ2Uucm91dGUgPT0gXCJwYWdlcy9jaGVja291dC9jaGVja291dFwiKSB7XG4gICAgICAgICAgcHJldlBhZ2Uuc2V0RGF0YSh7XG4gICAgICAgICAgICBhZGRyZXNzSWQ6IHJlcy5kYXRhXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSwxMTExMjIyMjMzMzMzMzMpXG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnYWRkcmVzc0lkJywgcmVzLmRhdGEpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNldCBhZGRyZXNzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpO1xuICAgICAgICAvLyB9XG4gICAgICB9XG4gIH0sXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdouaYvuekulxuXG4gIH0sXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmhtemdoumakOiXj1xuXG4gIH0sXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8g6aG16Z2i5YWz6ZetXG5cbiAgfVxufSJdfQ==