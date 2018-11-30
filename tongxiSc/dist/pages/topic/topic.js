'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var daaty = require("../../utils/api2.js");
exports.default = Page({
    data: {
        topicList: [],
        offset: 0,
        limit: 10,
        count: 0,
        scrollTop: 0,
        showPage: false
    },
    onLoad: function onLoad(options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.getTopic();
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
    },
    nextPage: function nextPage(event) {
        var that = this;
        if (this.data.offset + 1 > that.data.count / that.data.size) {
            return true;
        }

        that.setData({
            offset: that.data.offset + 1
        });

        this.getTopic();
    },
    getTopic: function getTopic() {

        var that = this;
        that.setData({
            scrollTop: 0,
            showPage: false,
            topicList: []
        });
        // 页面渲染完成
        wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 2000
        });
        daaty.TopicList(that.data.offset, that.data.limit, null, successFay);
        function successFay(res, sourceObj) {
            that.setData({
                scrollTop: 0,
                topicList: res.data.data,
                showPage: true,
                count: res.data.count
            });
            wx.hideToast();
        }
    },
    prevPage: function prevPage(event) {
        if (this.data.offset <= 1) {
            return false;
        }

        var that = this;
        that.setData({
            offset: that.data.offset - 1
        });
        this.getTopic();
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvcGljLnd4cCJdLCJuYW1lcyI6WyJkYWF0eSIsInJlcXVpcmUiLCJkYXRhIiwidG9waWNMaXN0Iiwib2Zmc2V0IiwibGltaXQiLCJjb3VudCIsInNjcm9sbFRvcCIsInNob3dQYWdlIiwib25Mb2FkIiwib3B0aW9ucyIsImdldFRvcGljIiwib25SZWFkeSIsIm9uU2hvdyIsIm9uSGlkZSIsIm9uVW5sb2FkIiwibmV4dFBhZ2UiLCJldmVudCIsInRoYXQiLCJzaXplIiwic2V0RGF0YSIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJUb3BpY0xpc3QiLCJzdWNjZXNzRmF5IiwicmVzIiwic291cmNlT2JqIiwiaGlkZVRvYXN0IiwicHJldlBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBTUEsUUFBU0MsUUFBUSxxQkFBUixDQUFmOztBQU1NQyxVQUFNO0FBQ0pDLG1CQUFXLEVBRFA7QUFFSkMsZ0JBQVEsQ0FGSjtBQUdKQyxlQUFPLEVBSEg7QUFJSkMsZUFBTyxDQUpIO0FBS0pDLG1CQUFXLENBTFA7QUFNSkMsa0JBQVU7QUFOTixLO0FBUVJDLFlBQVEsZ0JBQVVDLE9BQVYsRUFBbUI7QUFDdkI7QUFDQSxhQUFLQyxRQUFMO0FBQ0gsSztBQUNEQyxhQUFTLG1CQUFZO0FBQ2pCO0FBQ0gsSztBQUNEQyxZQUFRLGtCQUFZO0FBQ2hCO0FBQ0gsSztBQUNEQyxZQUFRLGtCQUFZO0FBQ2hCO0FBQ0gsSztBQUNEQyxjQUFVLG9CQUFZO0FBQ2xCO0FBQ0gsSztBQUNEQyxjQUFVLGtCQUFVQyxLQUFWLEVBQWlCO0FBQ3ZCLFlBQUlDLE9BQU8sSUFBWDtBQUNBLFlBQUksS0FBS2hCLElBQUwsQ0FBVUUsTUFBVixHQUFpQixDQUFqQixHQUFxQmMsS0FBS2hCLElBQUwsQ0FBVUksS0FBVixHQUFrQlksS0FBS2hCLElBQUwsQ0FBVWlCLElBQXJELEVBQTJEO0FBQ3ZELG1CQUFPLElBQVA7QUFDSDs7QUFHREQsYUFBS0UsT0FBTCxDQUFhO0FBQ1RoQixvQkFBUWMsS0FBS2hCLElBQUwsQ0FBVUUsTUFBVixHQUFtQjtBQURsQixTQUFiOztBQUlBLGFBQUtPLFFBQUw7QUFFSCxLO0FBQ0RBLGNBQVUsb0JBQVU7O0FBRWhCLFlBQUlPLE9BQU8sSUFBWDtBQUNDQSxhQUFLRSxPQUFMLENBQWE7QUFDVmIsdUJBQVcsQ0FERDtBQUVWQyxzQkFBVSxLQUZBO0FBR1ZMLHVCQUFXO0FBSEQsU0FBYjtBQUtEO0FBQ0FrQixXQUFHQyxTQUFILENBQWE7QUFDVEMsbUJBQU8sUUFERTtBQUVUQyxrQkFBTSxTQUZHO0FBR1RDLHNCQUFVO0FBSEQsU0FBYjtBQUtQekIsY0FBTTBCLFNBQU4sQ0FBZ0JSLEtBQUtoQixJQUFMLENBQVVFLE1BQTFCLEVBQWlDYyxLQUFLaEIsSUFBTCxDQUFVRyxLQUEzQyxFQUFpRCxJQUFqRCxFQUFzRHNCLFVBQXREO0FBQ0ksaUJBQVNBLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCQyxTQUF6QixFQUFtQztBQUNsQ1gsaUJBQUtFLE9BQUwsQ0FBYTtBQUNMYiwyQkFBVyxDQUROO0FBRUxKLDJCQUFXeUIsSUFBSTFCLElBQUosQ0FBU0EsSUFGZjtBQUdMTSwwQkFBVSxJQUhMO0FBSUxGLHVCQUFPc0IsSUFBSTFCLElBQUosQ0FBU0k7QUFKWCxhQUFiO0FBTUdlLGVBQUdTLFNBQUg7QUFDSDtBQUNELEs7QUFDREMsY0FBVSxrQkFBVWQsS0FBVixFQUFpQjtBQUN2QixZQUFJLEtBQUtmLElBQUwsQ0FBVUUsTUFBVixJQUFvQixDQUF4QixFQUEyQjtBQUN2QixtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBSWMsT0FBTyxJQUFYO0FBQ0FBLGFBQUtFLE9BQUwsQ0FBYTtBQUNUaEIsb0JBQVFjLEtBQUtoQixJQUFMLENBQVVFLE1BQVYsR0FBbUI7QUFEbEIsU0FBYjtBQUdBLGFBQUtPLFFBQUw7QUFDSCIsImZpbGUiOiJ0b3BpYy53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYWF0eSA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYXBpMi5qc1wiKVxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LiT6aKY5YiX6KGoJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHt9XG4gIH0sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHRvcGljTGlzdDogW10sXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgbGltaXQ6IDEwLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICBzaG93UGFnZTogZmFsc2VcbiAgICB9LFxuICAgIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgLy8g6aG16Z2i5Yid5aeL5YyWIG9wdGlvbnPkuLrpobXpnaLot7PovazmiYDluKbmnaXnmoTlj4LmlbBcbiAgICAgICAgdGhpcy5nZXRUb3BpYygpO1xuICAgIH0sXG4gICAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDpobXpnaLmuLLmn5PlrozmiJBcbiAgICB9LFxuICAgIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDpobXpnaLmmL7npLpcbiAgICB9LFxuICAgIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDpobXpnaLpmpDol49cbiAgICB9LFxuICAgIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIOmhtemdouWFs+mXrVxuICAgIH0sXG4gICAgbmV4dFBhZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmRhdGEub2Zmc2V0KzEgPiB0aGF0LmRhdGEuY291bnQgLyB0aGF0LmRhdGEuc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgIG9mZnNldDogdGhhdC5kYXRhLm9mZnNldCArIDFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5nZXRUb3BpYygpO1xuICAgICAgICBcbiAgICB9LFxuICAgIGdldFRvcGljOiBmdW5jdGlvbigpe1xuICAgICAgIFxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgICAgc2hvd1BhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgdG9waWNMaXN0OiBbXVxuICAgICAgICB9KTtcbiAgICAgICAgLy8g6aG16Z2i5riy5p+T5a6M5oiQXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rS4uLicsXG4gICAgICAgICAgICBpY29uOiAnbG9hZGluZycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICB9KTtcbiBkYWF0eS5Ub3BpY0xpc3QodGhhdC5kYXRhLm9mZnNldCx0aGF0LmRhdGEubGltaXQsbnVsbCxzdWNjZXNzRmF5KVxuICAgICBmdW5jdGlvbiBzdWNjZXNzRmF5KHJlcywgc291cmNlT2JqKXtcbiAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICAgICAgdG9waWNMaXN0OiByZXMuZGF0YS5kYXRhLFxuICAgICAgICAgICAgICBzaG93UGFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgY291bnQ6IHJlcy5kYXRhLmNvdW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgIHd4LmhpZGVUb2FzdCgpO1xuICAgICB9XG4gICAgfSxcbiAgICBwcmV2UGFnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEub2Zmc2V0IDw9IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgIG9mZnNldDogdGhhdC5kYXRhLm9mZnNldCAtIDFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2V0VG9waWMoKTtcbiAgICB9XG59Il19