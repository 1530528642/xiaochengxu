"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var apis = require("../../utils/api.js");
var dates = require("../../utils/dateutils.js");
var converts = require("../../utils/convert.js");
var estate = wx.getStorageSync("uid");
// console.log(estate,777777)
exports.default = Page({
  paging: function paging() {
    var _this = this;
    this.setData({ condition: 1 });
    apis.withdrawalsLists({ estateId: estate, offset: _this.data.offset, limit: _this.data.limit }, 1, successFa, null, null);
    function successFa(data, sourceObj) {
      var datay = data.data;
      var datas;
      for (var i = 0; i < datay.length; i++) {
        datay[i].money = converts.huansuan(datay[i].money);
        datay[i].createTime = dates.getDate(datay[i].createTime);
        datay[i].auditStatus = converts.zhaungtai(datay[i].auditStatus);
        _this.data.washnumber.push(data.data[i]);
      }
      var lengths = data.data.length;
      if (lengths < _this.data.limit) {
        _this.setData({ condition: 0 });
      } else {
        _this.setData({ condition: 2 });
      }
      _this.setData({ washnumber: data.data });
    }
  },
  onLoad: function onLoad(option) {
    this.paging();
  },
  data: {
    washnumber: [],
    items: [{ value: '2', title: '企业转账' }, { value: '1', title: '微信提现' }],
    offset: 0,
    limit: 10,
    condition: 2,
    mony: "",
    values: '2',
    $toast: {
      show: false
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  onReachBottom: function onReachBottom() {
    this.paging();
  },
  tipUrl: function tipUrl(e) {
    var uid = e.currentTarget.dataset.uid;
    console.log(uid, 888888);
    wx.navigateTo({
      url: "../washtwo/washtwo?siteId=" + uid
    });
  },
  atives: function atives() {
    wx.navigateTo({
      url: "../myWidthdraw/myWidthdraw"
    });
  },
  onBlur: function onBlur(e) {
    this.setData({ mony: e.detail.value });
  },
  onChange: function onChange(e) {
    var types = e.detail.value;
    this.setData({ values: types });
  },

  adds: function adds() {
    var newMony = parseInt(this.data.mony) + 100;
    this.setData({ mony: newMony });
  },
  minus: function minus() {
    if (this.data.mony >= 100) {
      var newMony = parseInt(this.data.mony) - 100;
      this.setData({ mony: newMony });
    } else {
      return this.data.mony;
    }
  },
  temnneas: function temnneas() {
    var dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent && dialogComponent.show();
  },
  hideDialog: function hideDialog() {
    var dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent && dialogComponent.hide();
  },
  onConfirm: function onConfirm() {
    var _this2 = this;

    var _this = this;
    var money = this.data.mony * 100;

    this.setData({
      $toast: {
        show: true
      }
    });
    setTimeout(function () {
      _this2.setData({
        $toast: {
          show: false
        }
      });
    }, 1500);

    this.hideDialog();
    apis.addWithdrawals({ estateId: estate, money: money, withdrawalsType: this.data.values }, 1, successFa, null, null);
    function successFa(data, sourceObj) {
      var datay = data.data;
      var datas;
      datay.money = converts.huansuan(datay.money);
      datay.createTime = dates.getDate(datay.createTime);
      datay.auditStatus = converts.zhaungtai(datay.auditStatus);
      _this.data.washnumber.push(datay);
      _this.setData({ washnumber: _this.data.washnumber });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXNlbnRSZWNvcmQud3hwIl0sIm5hbWVzIjpbImFwaXMiLCJyZXF1aXJlIiwiZGF0ZXMiLCJjb252ZXJ0cyIsImVzdGF0ZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJwYWdpbmciLCJfdGhpcyIsInNldERhdGEiLCJjb25kaXRpb24iLCJ3aXRoZHJhd2Fsc0xpc3RzIiwiZXN0YXRlSWQiLCJvZmZzZXQiLCJkYXRhIiwibGltaXQiLCJzdWNjZXNzRmEiLCJzb3VyY2VPYmoiLCJkYXRheSIsImRhdGFzIiwiaSIsImxlbmd0aCIsIm1vbmV5IiwiaHVhbnN1YW4iLCJjcmVhdGVUaW1lIiwiZ2V0RGF0ZSIsImF1ZGl0U3RhdHVzIiwiemhhdW5ndGFpIiwid2FzaG51bWJlciIsInB1c2giLCJsZW5ndGhzIiwib25Mb2FkIiwib3B0aW9uIiwiaXRlbXMiLCJ2YWx1ZSIsInRpdGxlIiwibW9ueSIsInZhbHVlcyIsIiR0b2FzdCIsInNob3ciLCJvblB1bGxEb3duUmVmcmVzaCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJvblJlYWNoQm90dG9tIiwidGlwVXJsIiwiZSIsInVpZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJhdGl2ZXMiLCJvbkJsdXIiLCJkZXRhaWwiLCJvbkNoYW5nZSIsInR5cGVzIiwiYWRkcyIsIm5ld01vbnkiLCJwYXJzZUludCIsIm1pbnVzIiwidGVtbm5lYXMiLCJkaWFsb2dDb21wb25lbnQiLCJzZWxlY3RDb21wb25lbnQiLCJoaWRlRGlhbG9nIiwiaGlkZSIsIm9uQ29uZmlybSIsInNldFRpbWVvdXQiLCJhZGRXaXRoZHJhd2FscyIsIndpdGhkcmF3YWxzVHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFJQSxPQUFRQyxRQUFRLG9CQUFSLENBQVo7QUFDQSxJQUFJQyxRQUFTRCxRQUFRLDBCQUFSLENBQWI7QUFDQSxJQUFJRSxXQUFZRixRQUFRLHdCQUFSLENB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TkMsZ0JBQU07QUFEQTtBQURLLE9BQWI7QUFLSCxLQU5DLEVBTUMsSUFORDs7QUFRSixTQUFLeUIsVUFBTDtBQUNHaEUsU0FBS29FLGNBQUwsQ0FBb0IsRUFBQ3hELFVBQVNSLE1BQVYsRUFBaUJrQixPQUFNQSxLQUF2QixFQUE2QitDLGlCQUFnQixLQUFLdkQsSUFBTCxDQUFVdUIsTUFBdkQsRUFBcEIsRUFBbUYsQ0FBbkYsRUFBcUZyQixTQUFyRixFQUFnRyxJQUFoRyxFQUFzRyxJQUF0RztBQUNDLGFBQVNBLFNBQVQsQ0FBbUJGLElBQW5CLEVBQXlCRyxTQUF6QixFQUFtQztBQUMvQixVQUFJQyxRQUFRSixLQUFLQSxJQUFqQjtBQUNBLFVBQUlLLEtBQUo7QUFDSUQsWUFBTUksS0FBTixHQUFjbkIsU0FBU29CLFFBQVQsQ0FBbUJMLE1BQU1JLEtBQXpCLENBQWQ7QUFDQUosWUFBTU0sVUFBTixHQUFtQnRCLE1BQU11QixPQUFOLENBQWVQLE1BQU1NLFVBQXJCLENBQW5CO0FBQ0FOLFlBQU1RLFdBQU4sR0FBb0J2QixTQUFTd0IsU0FBVCxDQUFtQlQsTUFBTVEsV0FBekIsQ0FBcEI7QUFDQWxCLFlBQU1NLElBQU4sQ0FBV2MsVUFBWCxDQUFzQkMsSUFBdEIsQ0FBMkJYLEtBQTNCO0FBQ0pWLFlBQU1DLE9BQU4sQ0FBYyxFQUFDbUIsWUFBV3BCLE1BQU1NLElBQU4sQ0FBV2MsVUFBdkIsRUFBZDtBQUNDO0FBQ1IiLCJmaWxlIjoicHJlc2VudFJlY29yZC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBpcyA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYXBpLmpzXCIpXG52YXIgZGF0ZXMgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL2RhdGV1dGlscy5qc1wiKVxudmFyIGNvbnZlcnRzID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy9jb252ZXJ0LmpzXCIpXG52YXIgZXN0YXRlID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIik7XG4vLyBjb25zb2xlLmxvZyhlc3RhdGUsNzc3Nzc3KVxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE5pS255uKJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAnd3hjLWxpc3QnOiAnQG1pbnVpL3d4Yy1saXN0JyxcbiAgICAgICAnd3hjLWxvYWRtb3JlJzogJ0BtaW51aS93eGMtbG9hZG1vcmUnLFxuICAgICAgICd3eGMtc2VsZWN0JzogJ0BtaW51aS93eGMtc2VsZWN0JyxcbiAgICAgICAnd3hjLWlucHV0JzogJ0BtaW51aS93eGMtaW5wdXQnLFxuICAgICAgICd3eGMtZGlhbG9nJzogJ0BtaW51aS93eGMtZGlhbG9nJyxcbiAgICAgICAnd3hjLXRvYXN0JzogJ0BtaW51aS93eGMtdG9hc3QnXG4gICAgfVxuICB9LFxuICAgcGFnaW5nOmZ1bmN0aW9uKCl7XG4gICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLnNldERhdGEoe2NvbmRpdGlvbjoxfSlcbiAgICBhcGlzLndpdGhkcmF3YWxzTGlzdHMoe2VzdGF0ZUlkOmVzdGF0ZSxvZmZzZXQ6X3RoaXMuZGF0YS5vZmZzZXQsbGltaXQ6X3RoaXMuZGF0YS5saW1pdH0sMSxzdWNjZXNzRmEsIG51bGwsIG51bGwpO1xuICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYShkYXRhLCBzb3VyY2VPYmope1xuICAgICAgICAgdmFyIGRhdGF5ID0gZGF0YS5kYXRhXG4gICAgICAgICB2YXIgZGF0YXM7XG4gICAgICAgICBmb3IodmFyIGkgPTA7aTxkYXRheS5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICBkYXRheVtpXS5tb25leSA9IGNvbnZlcnRzLmh1YW5zdWFuKCBkYXRheVtpXS5tb25leSApO1xuICAgICAgICAgICAgIGRhdGF5W2ldLmNyZWF0ZVRpbWUgPSBkYXRlcy5nZXREYXRlKCBkYXRheVtpXS5jcmVhdGVUaW1lICk7XG4gICAgICAgICAgICAgZGF0YXlbaV0uYXVkaXRTdGF0dXMgPSBjb252ZXJ0cy56aGF1bmd0YWkoZGF0YXlbaV0uYXVkaXRTdGF0dXMpO1xuICAgICAgICAgICAgIF90aGlzLmRhdGEud2FzaG51bWJlci5wdXNoKGRhdGEuZGF0YVtpXSlcbiAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbGVuZ3RocyA9IGRhdGEuZGF0YS5sZW5ndGg7XG4gICAgICAgICAgaWYobGVuZ3RocyA8IF90aGlzLmRhdGEubGltaXQpe1xuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7Y29uZGl0aW9uOjB9KVxuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7Y29uZGl0aW9uOjJ9KVxuICAgICAgICAgIH1cbiAgICAgICAgIF90aGlzLnNldERhdGEoe3dhc2hudW1iZXI6ZGF0YS5kYXRhfSlcbiAgICAgICAgIH1cbiAgIH0sXG4gICBvbkxvYWQ6ZnVuY3Rpb24ob3B0aW9uKXtcbiAgICB0aGlzLnBhZ2luZygpXG4gICAgfSxcbiAgZGF0YToge1xuICAgICB3YXNobnVtYmVyOltdLFxuICAgICAgIGl0ZW1zOiBbXG4gICAgICB7dmFsdWU6ICcyJywgdGl0bGU6ICfkvIHkuJrovazotKYnfSxcbiAgICAgIHt2YWx1ZTogJzEnLCB0aXRsZTogJ+W+ruS/oeaPkOeOsCd9LFxuICAgIF0sXG4gICAgIG9mZnNldDowLFxuICAgICBsaW1pdDoxMCxcbiAgICAgY29uZGl0aW9uOjIsXG4gICAgIG1vbnk6XCJcIixcbiAgICAgdmFsdWVzOicyJyxcbiAgICAgJHRvYXN0OiB7XG4gICAgICAgIHNob3c6IGZhbHNlXG4gICAgICB9XG4gICB9LFxuICAgb25QdWxsRG93blJlZnJlc2g6ZnVuY3Rpb24oKXtcbiAgICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gICAgfSxcbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5wYWdpbmcoKVxuICB9LFxuICB0aXBVcmw6ZnVuY3Rpb24oZSl7XG4gICAgdmFyIHVpZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVpZDtcbiAgICBjb25zb2xlLmxvZyh1aWQsODg4ODg4KVxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgdXJsOlwiLi4vd2FzaHR3by93YXNodHdvP3NpdGVJZD1cIit1aWRcbiAgICAgICAgICAgICAgICB9KVxuICB9LFxuICBhdGl2ZXM6ZnVuY3Rpb24oKXtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgIHVybDpcIi4uL215V2lkdGhkcmF3L215V2lkdGhkcmF3XCJcbiAgICAgICAgICAgICAgICB9KVxuICB9LFxuICAgb25CbHVyKGUpIHtcbiAgICAgICAgIHRoaXMuc2V0RGF0YSh7bW9ueTplLmRldGFpbC52YWx1ZX0pIFxuICAgICAgICAgICAgfSxcbiAgIG9uQ2hhbmdlKGUpIHtcbiAgICAgIGNvbnN0IHR5cGVzID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuc2V0RGF0YSh7dmFsdWVzOnR5cGVzfSlcbiAgICB9LFxuICBhZGRzOmZ1bmN0aW9uKCl7IFxuICAgIGNvbnN0IG5ld01vbnkgPSBwYXJzZUludCh0aGlzLmRhdGEubW9ueSkrMTAwO1xuICAgIHRoaXMuc2V0RGF0YSh7bW9ueTpuZXdNb255fSlcbiAgfSxcbiAgbWludXM6ZnVuY3Rpb24oKXtcbiAgICAgaWYodGhpcy5kYXRhLm1vbnk+PTEwMCl7XG4gICAgICAgY29uc3QgbmV3TW9ueSA9IHBhcnNlSW50KHRoaXMuZGF0YS5tb255KS0xMDA7XG4gICAgICAgdGhpcy5zZXREYXRhKHttb255Om5ld01vbnl9KVxuICAgICB9ZWxzZXtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEubW9ueTtcbiAgICAgfVxuICB9LFxuICB0ZW1ubmVhczpmdW5jdGlvbigpe1xuICAgIGxldCBkaWFsb2dDb21wb25lbnQgPSB0aGlzLnNlbGVjdENvbXBvbmVudCgnLnd4Yy1kaWFsb2cnKVxuICAgICAgZGlhbG9nQ29tcG9uZW50ICYmIGRpYWxvZ0NvbXBvbmVudC5zaG93KCk7XG4gICAgICAgICAgfSxcbiAgICBoaWRlRGlhbG9nKCkge1xuICAgICAgbGV0IGRpYWxvZ0NvbXBvbmVudCA9IHRoaXMuc2VsZWN0Q29tcG9uZW50KCcud3hjLWRpYWxvZycpXG4gICAgICBkaWFsb2dDb21wb25lbnQgJiYgZGlhbG9nQ29tcG9uZW50LmhpZGUoKTtcbiAgICAgICAgIH0sXG4gIG9uQ29uZmlybSAoKSB7XG4gICAgY29uc3QgX3RoaXMgPXRoaXM7XG4gICAgY29uc3QgbW9uZXkgPSAgdGhpcy5kYXRhLm1vbnkqMTAwO1xuXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAkdG9hc3Q6IHtcbiAgICAgICAgICAgIHNob3c6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgJHRvYXN0OiB7XG4gICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sIDE1MDApXG4gICAgICBcbiAgICB0aGlzLmhpZGVEaWFsb2coKVxuICAgICAgIGFwaXMuYWRkV2l0aGRyYXdhbHMoe2VzdGF0ZUlkOmVzdGF0ZSxtb25leTptb25leSx3aXRoZHJhd2Fsc1R5cGU6dGhpcy5kYXRhLnZhbHVlc30sMSxzdWNjZXNzRmEsIG51bGwsIG51bGwpO1xuICAgICAgICBmdW5jdGlvbiBzdWNjZXNzRmEoZGF0YSwgc291cmNlT2JqKXtcbiAgICAgICAgICAgIHZhciBkYXRheSA9IGRhdGEuZGF0YVxuICAgICAgICAgICAgdmFyIGRhdGFzO1xuICAgICAgICAgICAgICAgIGRhdGF5Lm1vbmV5ID0gY29udmVydHMuaHVhbnN1YW4oIGRhdGF5Lm1vbmV5ICk7XG4gICAgICAgICAgICAgICAgZGF0YXkuY3JlYXRlVGltZSA9IGRhdGVzLmdldERhdGUoIGRhdGF5LmNyZWF0ZVRpbWUgKTtcbiAgICAgICAgICAgICAgICBkYXRheS5hdWRpdFN0YXR1cyA9IGNvbnZlcnRzLnpoYXVuZ3RhaShkYXRheS5hdWRpdFN0YXR1cyk7XG4gICAgICAgICAgICAgICAgX3RoaXMuZGF0YS53YXNobnVtYmVyLnB1c2goZGF0YXkpXG4gICAgICAgICAgICBfdGhpcy5zZXREYXRhKHt3YXNobnVtYmVyOl90aGlzLmRhdGEud2FzaG51bWJlcn0pXG4gICAgICAgICAgICB9XG4gICAgfSxcbiAgXG59Il19