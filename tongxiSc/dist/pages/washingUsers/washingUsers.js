"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var apis = require("../../utils/api.js");
var dates = require("../../utils/dateutils.js");
var utilss = require("../../utils/util.js");
exports.default = Page({
  paging: function paging() {
    var _this = this;
    this.setData({ condition: 1 });
    var estate = wx.getStorageSync("uid");
    apis.washUsers({ estateId: estate, offset: _this.data.offset, limit: _this.data.limit }, 1, successFa, null, null);
    function successFa(data, sourceObj) {
      var offsets = _this.data.offset + _this.data.limit;
      var datas;
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].custNname = utilss.filderName(data.data[i].custNname);
        data.data[i].custImg = utilss.imgUrl(data.data[i].custImg);
        data.data[i].createTime = dates.getDate(data.data[i].createTime);
        _this.data.washnumber.push(data.data[i]);
      }
      var lengths = data.data.length;
      if (lengths < _this.data.limit) {
        _this.setData({ condition: 0 });
      } else {
        _this.setData({ condition: 2 });
      }
      _this.setData({ washnumber: _this.data.washnumber, offset: offsets });
    }
  },
  onLoad: function onLoad(option) {
    this.paging();
  },
  data: {
    washnumber: [],
    offset: 0,
    limit: 10,
    condition: 2
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhc2hpbmdVc2Vycy53eHAiXSwibmFtZXMiOlsiYXBpcyIsInJlcXVpcmUiLCJkYXRlcyIsInV0aWxzcyIsInBhZ2luZyIsIl90aGlzIiwic2V0RGF0YSIsImNvbmRpdGlvbiIsImVzdGF0ZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJ3YXNoVXNlcnMiLCJlc3RhdGVJZCIsIm9mZnNldCIsImRhdGEiLCJsaW1pdCIsInN1Y2Nlc3NGYSIsInNvdXJjZU9iaiIsIm9mZnNldHMiLCJkYXRhcyIsImkiLCJsZW5ndGgiLCJjdXN0Tm5hbWUiLCJmaWxkZXJOYW1lIiwiY3VzdEltZyIsImltZ1VybCIsImNyZWF0ZVRpbWUiLCJnZXREYXRlIiwid2FzaG51bWJlciIsInB1c2giLCJsZW5ndGhzIiwib25Mb2FkIiwib3B0aW9uIiwib25SZWFjaEJvdHRvbSIsInRpcFVybCIsImUiLCJ1aWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm5hdmlnYXRlVG8iLCJ1cmwiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsT0FBUUMsUUFBUSxvQkFBUixDQUFaO0FBQ0EsSUFBSUMsUUFBU0QsUUFBUSwwQkFBUixDQUFiO0FBQ0EsSUFBSUUsU0FBVUYsUUFBUSxxQkFBUixDQUFkOztBQVNHRyxVQUFPLGtCQUFVO0FBQ2QsUUFBTUMsUUFBUSxJQUFkO0FBQ0EsU0FBS0MsT0FBTCxDQUFhLEVBQUNDLFdBQVUsQ0FBWCxFQUFiO0FBQ0EsUUFBSUMsU0FBU0MsR0FBR0MsY0FBSCxDQUFrQixLQUFsQixDQUFiO0FBQ0ZWLFNBQUtXLFNBQUwsQ0FBZSxFQUFDQyxVQUFTSixNQUFWLEVBQWlCSyxRQUFPUixNQUFNUyxJQUFOLENBQVdELE1BQW5DLEVBQTBDRSxPQUFNVixNQUFNUyxJQUFOLENBQVdDLEtBQTNELEVBQWYsRUFBaUYsQ0FBakYsRUFBbUZDLFNBQW5GLEVBQThGLElBQTlGLEVBQW9HLElBQXBHO0FBQ0EsYUFBU0EsU0FBVCxDQUFtQkYsSUFBbkIsRUFBeUJHLFNBQXpCLEVBQW1DO0FBQzdCLFVBQU1DLFVBQVViLE1BQU1TLElBQU4sQ0FBV0QsTUFBWCxHQUFrQlIsTUFBTVMsSUFBTixDQUFXQyxLQUE3QztBQUNBLFVBQUlJLEtBQUo7QUFDQyxXQUFJLElBQUlDLElBQUUsQ0FBVixFQUFZQSxJQUFFTixLQUFLQSxJQUFMLENBQVVPLE1BQXhCLEVBQStCRCxHQUEvQixFQUFtQztBQUNsQ04sYUFBS0EsSUFBTCxDQUFVTSxDQUFWLEVBQWFFLFNBQWIsR0FBdUJuQixPQUFPb0IsVUFBUCxDQUFrQlQsS0FBS0EsSUFBTCxDQUFVTSxDQUFWLEVBQWFFLFNBQS9CLENBQXZCO0FBQ0dSLGFBQUtBLElBQUwsQ0FBVU0sQ0FBVixFQUFhSSxPQUFiLEdBQXVCckIsT0FBT3NCLE1BQVAsQ0FBY1gsS0FBS0EsSUFBTCxDQUFVTSxDQUFWLEVBQWFJLE9BQTNCLENBQXZCO0FBQ0RWLGFBQUtBLElBQUwsQ0FBVU0sQ0FBVixFQUFhTSxVQUFiLEdBQXdCeEIsTUFBTXlCLE9BQU4sQ0FBY2IsS0FBS0EsSUFBTCxDQUFVTSxDQUFWLEVBQWFNLFVBQTNCLENBQXhCO0FBQ0RyQixjQUFNUyxJQUFOLENBQVdjLFVBQVgsQ0FBc0JDLElBQXRCLENBQTJCZixLQUFLQSxJQUFMLENBQVVNLENBQVYsQ0FBM0I7QUFDRDtBQUNBLFVBQUlVLFVBQVVoQixLQUFLQSxJQUFMLENBQVVPLE1BQXhCO0FBQ0QsVUFBR1MsVUFBVXpCLE1BQU1TLElBQU4sQ0FBV0MsS0FBeEIsRUFBOEI7QUFDN0JWLGNBQU1DLE9BQU4sQ0FBYyxFQUFDQyxXQUFVLENBQVgsRUFBZDtBQUNELE9BRkEsTUFFSTtBQUNIRixjQUFNQyxPQUFOLENBQWMsRUFBQ0MsV0FBVSxDQUFYLEVBQWQ7QUFDRDtBQUNERixZQUFNQyxPQUFOLENBQWMsRUFBQ3NCLFlBQVd2QixNQUFNUyxJQUFOLENBQVdjLFVBQXZCLEVBQWtDZixRQUFPSyxPQUF6QyxFQUFkO0FBQ0E7QUFFTixHO0FBQ0RhLFVBQU8sZ0JBQVNDLE1BQVQsRUFBZ0I7QUFDdEIsU0FBSzVCLE1BQUw7QUFDQyxHO0FBQ0hVLFFBQU07QUFDSGMsZ0JBQVcsRUFEUjtBQUVIZixZQUFPLENBRko7QUFHSEUsV0FBTSxFQUhIO0FBSUhSLGVBQVU7QUFKUCxHO0FBTU4wQixpQkFBZSx5QkFBWTtBQUN2QixTQUFLN0IsTUFBTDtBQUNILEc7QUFDRDhCLFVBQU8sZ0JBQVNDLENBQVQsRUFBVztBQUNoQixRQUFJQyxNQUFNRCxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsR0FBbEM7QUFDQTNCLE9BQUc4QixVQUFILENBQWM7QUFDRUMsV0FBSSwrQkFBNkJKO0FBRG5DLEtBQWQ7QUFHRCIsImZpbGUiOiJ3YXNoaW5nVXNlcnMud3hwIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwaXMgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL2FwaS5qc1wiKVxudmFyIGRhdGVzID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy9kYXRldXRpbHMuanNcIilcbnZhciB1dGlsc3MgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL3V0aWwuanNcIilcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+a0l+i9pueUqOaItycsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgJ3d4Yy1saXN0JzogJ0BtaW51aS93eGMtbGlzdCcsXG4gICAgICAgJ3d4Yy1sb2FkbW9yZSc6ICdAbWludWkvd3hjLWxvYWRtb3JlJ1xuICAgIH1cbiAgfSxcbiAgIHBhZ2luZzpmdW5jdGlvbigpe1xuICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5zZXREYXRhKHtjb25kaXRpb246MX0pXG4gICAgICB2YXIgZXN0YXRlID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIilcbiAgICBhcGlzLndhc2hVc2Vycyh7ZXN0YXRlSWQ6ZXN0YXRlLG9mZnNldDpfdGhpcy5kYXRhLm9mZnNldCxsaW1pdDpfdGhpcy5kYXRhLmxpbWl0fSwxLHN1Y2Nlc3NGYSwgbnVsbCwgbnVsbCk7XG4gICAgZnVuY3Rpb24gc3VjY2Vzc0ZhKGRhdGEsIHNvdXJjZU9iail7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0cyA9IF90aGlzLmRhdGEub2Zmc2V0K190aGlzLmRhdGEubGltaXQ7XG4gICAgICAgICAgdmFyIGRhdGFzO1xuICAgICAgICAgICBmb3IodmFyIGk9MDtpPGRhdGEuZGF0YS5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIGRhdGEuZGF0YVtpXS5jdXN0Tm5hbWU9dXRpbHNzLmZpbGRlck5hbWUoZGF0YS5kYXRhW2ldLmN1c3RObmFtZSlcbiAgICAgICAgICAgICAgIGRhdGEuZGF0YVtpXS5jdXN0SW1nID0gdXRpbHNzLmltZ1VybChkYXRhLmRhdGFbaV0uY3VzdEltZyApXG4gICAgICAgICAgICAgIGRhdGEuZGF0YVtpXS5jcmVhdGVUaW1lPWRhdGVzLmdldERhdGUoZGF0YS5kYXRhW2ldLmNyZWF0ZVRpbWUpO1xuICAgICAgICAgICAgIF90aGlzLmRhdGEud2FzaG51bWJlci5wdXNoKGRhdGEuZGF0YVtpXSlcbiAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxlbmd0aHMgPSBkYXRhLmRhdGEubGVuZ3RoO1xuICAgICAgICAgICBpZihsZW5ndGhzIDwgX3RoaXMuZGF0YS5saW1pdCl7XG4gICAgICAgICAgICBfdGhpcy5zZXREYXRhKHtjb25kaXRpb246MH0pXG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBfdGhpcy5zZXREYXRhKHtjb25kaXRpb246Mn0pXG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzLnNldERhdGEoe3dhc2hudW1iZXI6X3RoaXMuZGF0YS53YXNobnVtYmVyLG9mZnNldDpvZmZzZXRzfSlcbiAgICAgICAgIH1cbiAgICAgICAgIFxuICAgfSxcbiAgIG9uTG9hZDpmdW5jdGlvbihvcHRpb24pe1xuICAgIHRoaXMucGFnaW5nKClcbiAgICB9LFxuICBkYXRhOiB7XG4gICAgIHdhc2hudW1iZXI6W10sXG4gICAgIG9mZnNldDowLFxuICAgICBsaW1pdDoxMCxcbiAgICAgY29uZGl0aW9uOjJcbiAgIH0sXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucGFnaW5nKClcbiAgfSxcbiAgdGlwVXJsOmZ1bmN0aW9uKGUpe1xuICAgIHZhciB1aWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51aWQ7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDpcIi4uL3dhc2h0d28vd2FzaHR3bz9zaXRlSWQ9XCIrdWlkXG4gICAgICAgICAgICAgICAgfSlcbiAgfVxuICBcbn0iXX0=