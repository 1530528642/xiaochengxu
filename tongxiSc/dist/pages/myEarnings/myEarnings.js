"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var apis = require("../../utils/api.js");
var dates = require("../../utils/dateutils.js");
var utilu = require("../../utils/util.js");
exports.default = Page({
  paging: function paging() {
    var _this = this;
    this.setData({ condition: 1 });
    var estate = wx.getStorageSync("uid");
    apis.statistics({ estateId: estate }, 1, successFa, null, null);
    function successFa(data, sourceObj) {
      // console.log(data)
      _this.setData({ washnumber: data.data });
      // const offsets = _this.data.offset+_this.data.limit;
      // var datas;
      //  for(var i=0;i<data.data.length;i++){
      //     datas = new Date(data.data[i].createTime);
      //     data.data[i].createTime=dates.getDate(data.data[i].createTime);
      //    _this.data.washnumber.push(data.data[i])
      //  }
      // _this.setData({washnumber:_this.data.washnumber,offset:offsets})
      var lengths = data.data.length;
      if (lengths < _this.data.limit) {
        _this.setData({ condition: 0 });
      } else {
        _this.setData({ condition: 2 });
      }
    }
  },
  onLoad: function onLoad(option) {
    this.paging();
  },
  data: {
    washnumber: [],
    offset: 0,
    limit: 10,
    condition: 2,
    mony: ""
  },
  onReachBottom: function onReachBottom() {
    this.paging();
  },
  tipUrl: function tipUrl(e) {
    var uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: "../washtwo/washtwo?siteId=" + uid
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15RWFybmluZ3Mud3hwIl0sIm5hbWVzIjpbImFwaXMiLCJyZXF1aXJlIiwiZGF0ZXMiLCJ1dGlsdSIsInBhZ2luZyIsIl90aGlzIiwic2V0RGF0YSIsImNvbmRpdGlvbiIsImVzdGF0ZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzdGF0aXN0aWNzIiwiZXN0YXRlSWQiLCJzdWNjZXNzRmEiLCJkYXRhIiwic291cmNlT2JqIiwid2FzaG51bWJlciIsImxlbmd0aHMiLCJsZW5ndGgiLCJsaW1pdCIsIm9uTG9hZCIsIm9wdGlvbiIsIm9mZnNldCIsIm1vbnkiLCJvblJlYWNoQm90dG9tIiwidGlwVXJsIiwiZSIsInVpZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwibmF2aWdhdGVUbyIsInVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFJQSxPQUFRQyxRQUFRLG9CQUFSLENBQVo7QUFDQSxJQUFJQyxRQUFTRCxRQUFRLDBCQUFSLENBQWI7QUFDQSxJQUFJRSxRQUFTRixRQUFRLHFCQUFSLENBQWI7O0FBVUdHLFVBQU8sa0JBQVU7QUFDZCxRQUFNQyxRQUFRLElBQWQ7QUFDQSxTQUFLQyxPQUFMLENBQWEsRUFBQ0MsV0FBVSxDQUFYLEVBQWI7QUFDQSxRQUFJQyxTQUFTQyxHQUFHQyxjQUFILENBQWtCLEtBQWxCLENBQWI7QUFDRlYsU0FBS1csVUFBTCxDQUFnQixFQUFDQyxVQUFTSixNQUFWLEVBQWhCLEVBQWtDLENBQWxDLEVBQW9DSyxTQUFwQyxFQUErQyxJQUEvQyxFQUFxRCxJQUFyRDtBQUNBLGFBQVNBLFNBQVQsQ0FBbUJDLElBQW5CLEVBQXlCQyxTQUF6QixFQUFtQztBQUNqQztBQUNBVixZQUFNQyxPQUFOLENBQWMsRUFBQ1UsWUFBV0YsS0FBS0EsSUFBakIsRUFBZDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFJRyxVQUFVSCxLQUFLQSxJQUFMLENBQVVJLE1BQXhCO0FBQ0EsVUFBR0QsVUFBVVosTUFBTVMsSUFBTixDQUFXSyxLQUF4QixFQUE4QjtBQUM1QmQsY0FBTUMsT0FBTixDQUFjLEVBQUNDLFdBQVUsQ0FBWCxFQUFkO0FBQ0QsT0FGRCxNQUVLO0FBQ0hGLGNBQU1DLE9BQU4sQ0FBYyxFQUFDQyxXQUFVLENBQVgsRUFBZDtBQUNEO0FBQ0Q7QUFDTixHO0FBQ0RhLFVBQU8sZ0JBQVNDLE1BQVQsRUFBZ0I7QUFDdEIsU0FBS2pCLE1BQUw7QUFDQyxHO0FBQ0hVLFFBQU07QUFDSEUsZ0JBQVcsRUFEUjtBQUVITSxZQUFPLENBRko7QUFHSEgsV0FBTSxFQUhIO0FBSUhaLGVBQVUsQ0FKUDtBQUtIZ0IsVUFBSztBQUxGLEc7QUFPTkMsaUJBQWUseUJBQVk7QUFDdkIsU0FBS3BCLE1BQUw7QUFDSCxHO0FBQ0RxQixVQUFPLGdCQUFTQyxDQUFULEVBQVc7QUFDaEIsUUFBSUMsTUFBTUQsRUFBRUUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGLEdBQWxDO0FBQ0FsQixPQUFHcUIsVUFBSCxDQUFjO0FBQ0VDLFdBQUksK0JBQTZCSjtBQURuQyxLQUFkO0FBR0QiLCJmaWxlIjoibXlFYXJuaW5ncy53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBpcyA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYXBpLmpzXCIpXG52YXIgZGF0ZXMgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL2RhdGV1dGlscy5qc1wiKVxudmFyIHV0aWx1ID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy91dGlsLmpzXCIpXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTmlLbnm4onLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgICd3eGMtbGlzdCc6ICdAbWludWkvd3hjLWxpc3QnLFxuICAgICAgICd3eGMtbG9hZG1vcmUnOiAnQG1pbnVpL3d4Yy1sb2FkbW9yZScsXG4gICAgICAgJ3d4Yy1jYyc6ICdAbWludWkvd3hjLWNjJ1xuICAgIH1cbiAgfSxcbiAgIHBhZ2luZzpmdW5jdGlvbigpe1xuICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5zZXREYXRhKHtjb25kaXRpb246MX0pXG4gICAgICB2YXIgZXN0YXRlID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIilcbiAgICBhcGlzLnN0YXRpc3RpY3Moe2VzdGF0ZUlkOmVzdGF0ZX0sMSxzdWNjZXNzRmEsIG51bGwsIG51bGwpO1xuICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYShkYXRhLCBzb3VyY2VPYmope1xuICAgICAgLy8gY29uc29sZS5sb2coZGF0YSlcbiAgICAgIF90aGlzLnNldERhdGEoe3dhc2hudW1iZXI6ZGF0YS5kYXRhfSlcbiAgICAgICAgICAvLyBjb25zdCBvZmZzZXRzID0gX3RoaXMuZGF0YS5vZmZzZXQrX3RoaXMuZGF0YS5saW1pdDtcbiAgICAgICAgICAvLyB2YXIgZGF0YXM7XG4gICAgICAgICAgLy8gIGZvcih2YXIgaT0wO2k8ZGF0YS5kYXRhLmxlbmd0aDtpKyspe1xuICAgICAgICAgIC8vICAgICBkYXRhcyA9IG5ldyBEYXRlKGRhdGEuZGF0YVtpXS5jcmVhdGVUaW1lKTtcbiAgICAgICAgICAvLyAgICAgZGF0YS5kYXRhW2ldLmNyZWF0ZVRpbWU9ZGF0ZXMuZ2V0RGF0ZShkYXRhLmRhdGFbaV0uY3JlYXRlVGltZSk7XG4gICAgICAgICAgLy8gICAgX3RoaXMuZGF0YS53YXNobnVtYmVyLnB1c2goZGF0YS5kYXRhW2ldKVxuICAgICAgICAgIC8vICB9XG4gICAgICAgICAgLy8gX3RoaXMuc2V0RGF0YSh7d2FzaG51bWJlcjpfdGhpcy5kYXRhLndhc2hudW1iZXIsb2Zmc2V0Om9mZnNldHN9KVxuICAgICAgICAgIHZhciBsZW5ndGhzID0gZGF0YS5kYXRhLmxlbmd0aDtcbiAgICAgICAgICBpZihsZW5ndGhzIDwgX3RoaXMuZGF0YS5saW1pdCl7XG4gICAgICAgICAgICBfdGhpcy5zZXREYXRhKHtjb25kaXRpb246MH0pXG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBfdGhpcy5zZXREYXRhKHtjb25kaXRpb246Mn0pXG4gICAgICAgICAgfVxuICAgICAgICAgfVxuICAgfSxcbiAgIG9uTG9hZDpmdW5jdGlvbihvcHRpb24pe1xuICAgIHRoaXMucGFnaW5nKClcbiAgICB9LFxuICBkYXRhOiB7XG4gICAgIHdhc2hudW1iZXI6W10sXG4gICAgIG9mZnNldDowLFxuICAgICBsaW1pdDoxMCxcbiAgICAgY29uZGl0aW9uOjIsXG4gICAgIG1vbnk6XCJcIixcbiAgIH0sXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucGFnaW5nKClcbiAgfSxcbiAgdGlwVXJsOmZ1bmN0aW9uKGUpe1xuICAgIHZhciB1aWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51aWQ7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDpcIi4uL3dhc2h0d28vd2FzaHR3bz9zaXRlSWQ9XCIrdWlkXG4gICAgICAgICAgICAgICAgfSlcbiAgfVxufSJdfQ==