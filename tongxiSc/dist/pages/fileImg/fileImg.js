'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var that;
var app = getApp();
var pathds = require("../../utils/navigator.js");
exports.default = Page({
  data: {
    images: [],
    uploadedImages: [],
    imgsizi: false
    //imageWidth: getApp().screenWidth / 4 - 10
  },
  onLoad: function onLoad(options) {
    that = this;var objectId = options.objectId;
    // console.log(objectId);
  },
  chooseImage: function chooseImage() {
    // 选择图片
    var thidy = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      // 可以指定来源是相册还是相机，默认二者都有
      success: function success(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        // console.log(tempFilePaths);
        //   console.log(res);


        // for(var i=0;i<res.tempFiles.length;i++){      //检查图片是否大于4M
        //       if(parseInt(res.tempFiles[i].size/1000) > 4096){
        //         console.log(parseInt(res.tempFiles[i].size/1000),"ig")
        //           thidy.setData({imgsizi:true})
        //       }
        // }

        that.setData({
          images: that.data.images.concat(tempFilePaths)
        });
      }
    });
  },
  // 图片预览
  previewImage: function previewImage(e) {
    // console.log(this.data.images);
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.images
    });
  },
  submit: function submit() {
    //  console.log(this.data.images);
    app.globalData.imglength = this.data.images;
    pathds.navigateBack(1);

    //   // 提交图片，事先遍历图集数组
    //   that.data.images.forEach(function (tempFilePath) {
    //     new AV.File('file-name', {
    //       blob: {
    //         uri: tempFilePath,
    //       },
    //     }).save().then(                
    //       // file => console.log(file.url())
    //     function (file) {                    
    //       // 先读取
    //       var uploadedImages = that.data.uploadedImages;
    //       uploadedImages.push(file.url());                    
    //       // 再写入
    //       that.setData({
    //         uploadedImages: uploadedImages
    //       }); console.log(uploadedImages);
    //     }
    //     ).catch(console.error);
    //   });
    //   wx.showToast({
    //     title: '评价成功', success: function () {
    //       wx.navigateBack();
    //     }
    //   });
  },
  delete: function _delete(e) {
    var index = e.currentTarget.dataset.index;var images = that.data.images;
    images.splice(index, 1);
    that.setData({
      images: images
    });
  }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGVJbWcud3hwIl0sIm5hbWVzIjpbInRoYXQiLCJhcHAiLCJnZXRBcHAiLCJwYXRoZHMiLCJyZXF1aXJlIiwiZGF0YSIsImltYWdlcyIsInVwbG9hZGVkSW1hZ2VzIiwiaW1nc2l6aSIsIm9uTG9hZCIsIm9wdGlvbnMiLCJvYmplY3RJZCIsImNob29zZUltYWdlIiwidGhpZHkiLCJ3eCIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJzZXREYXRhIiwiY29uY2F0IiwicHJldmlld0ltYWdlIiwiZSIsImN1cnJlbnQiLCJ0YXJnZXQiLCJkYXRhc2V0Iiwic3JjIiwidXJscyIsInN1Ym1pdCIsImdsb2JhbERhdGEiLCJpbWdsZW5ndGgiLCJuYXZpZ2F0ZUJhY2siLCJkZWxldGUiLCJpbmRleCIsImN1cnJlbnRUYXJnZXQiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsSUFBSjtBQUNBLElBQUlDLE1BQU1DLFFBQVY7QUFDQSxJQUFJQyxTQUFVQyxRQUFRLDBCQUFSLENBQWQ7O0FBTUNDLFFBQU07QUFDSEMsWUFBUSxFQURMO0FBRUhDLG9CQUFnQixFQUZiO0FBR0hDLGFBQVE7QUFDUjtBQUpHLEc7QUFNTEMsVUFBUSxnQkFBVUMsT0FBVixFQUFtQjtBQUN6QlYsV0FBTyxJQUFQLENBQWEsSUFBSVcsV0FBV0QsUUFBUUMsUUFBdkI7QUFDYjtBQUNELEc7QUFDREMsZUFBYSx1QkFBWTtBQUN2QjtBQUNBLFFBQUlDLFFBQVEsSUFBWjtBQUNBQyxPQUFHRixXQUFILENBQWU7QUFDYkcsYUFBTyxDQURNLEVBQ0g7QUFDVkMsZ0JBQVUsQ0FBQyxZQUFELENBRkc7QUFHYkMsa0JBQVksQ0FBQyxPQUFELEVBQVUsUUFBVixDQUhDO0FBSWI7QUFDQUMsZUFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCO0FBQ0EsWUFBSUMsZ0JBQWdCRCxJQUFJQyxhQUF4QjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQXBCLGFBQUtxQixPQUFMLENBQWE7QUFDWGYsa0JBQVFOLEtBQUtLLElBQUwsQ0FBVUMsTUFBVixDQUFpQmdCLE1BQWpCLENBQXdCRixhQUF4QjtBQURHLFNBQWI7QUFHRDtBQXRCWSxLQUFmO0FBd0JELEc7QUFDRDtBQUNBRyxnQkFBYyxzQkFBVUMsQ0FBVixFQUFhO0FBQ3pCO0FBQ0EsUUFBSUMsVUFBVUQsRUFBRUUsTUFBRixDQUFTQyxPQUFULENBQWlCQyxHQUEvQjtBQUNBZCxPQUFHUyxZQUFILENBQWdCO0FBQ2RFLGVBQVNBLE9BREs7QUFFZEksWUFBTSxLQUFLeEIsSUFBTCxDQUFVQztBQUZGLEtBQWhCO0FBSUQsRztBQUNEd0IsVUFBUSxrQkFBWTtBQUNsQjtBQUNBN0IsUUFBSThCLFVBQUosQ0FBZUMsU0FBZixHQUEyQixLQUFLM0IsSUFBTCxDQUFVQyxNQUFyQztBQUNBSCxXQUFPOEIsWUFBUCxDQUFvQixDQUFwQjs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQyxHO0FBQ0RDLFVBQVEsaUJBQVVWLENBQVYsRUFBYTtBQUNuQixRQUFJVyxRQUFRWCxFQUFFWSxhQUFGLENBQWdCVCxPQUFoQixDQUF3QlEsS0FBcEMsQ0FBMkMsSUFBSTdCLFNBQVNOLEtBQUtLLElBQUwsQ0FBVUMsTUFBdkI7QUFDM0NBLFdBQU8rQixNQUFQLENBQWNGLEtBQWQsRUFBcUIsQ0FBckI7QUFDQW5DLFNBQUtxQixPQUFMLENBQWE7QUFDWGYsY0FBUUE7QUFERyxLQUFiO0FBR0QiLCJmaWxlIjoiZmlsZUltZy53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdGhhdDtcbnZhciBhcHAgPSBnZXRBcHAoKTtcbnZhciBwYXRoZHMgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL25hdmlnYXRvci5qc1wiKVxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LiK5Lyg5aSa5byg5Zu+54mHJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHt9XG4gIH0sXG4gZGF0YToge1xuICAgIGltYWdlczogW10sXG4gICAgdXBsb2FkZWRJbWFnZXM6IFtdLFxuICAgIGltZ3Npemk6ZmFsc2VcbiAgICAvL2ltYWdlV2lkdGg6IGdldEFwcCgpLnNjcmVlbldpZHRoIC8gNCAtIDEwXG4gIH0sXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB0aGF0ID0gdGhpczsgdmFyIG9iamVjdElkID0gb3B0aW9ucy5vYmplY3RJZDsgXG4gICAgLy8gY29uc29sZS5sb2cob2JqZWN0SWQpO1xuICB9LFxuICBjaG9vc2VJbWFnZTogZnVuY3Rpb24gKCkge1xuICAgIC8vIOmAieaLqeWbvueJh1xuICAgIHZhciB0aGlkeSA9IHRoaXNcbiAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICBjb3VudDogOSwgLy8g6buY6K6kOVxuICAgICAgc2l6ZVR5cGU6IFsnY29tcHJlc3NlZCddLFxuICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgIC8vIOWPr+S7peaMh+Wumuadpea6kOaYr+ebuOWGjOi/mOaYr+ebuOacuu+8jOm7mOiupOS6jOiAhemDveaciVxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAvLyDov5Tlm57pgInlrprnhafniYfnmoTmnKzlnLDmlofku7bot6/lvoTliJfooajvvIx0ZW1wRmlsZVBhdGjlj6/ku6XkvZzkuLppbWfmoIfnrb7nmoRzcmPlsZ7mgKfmmL7npLrlm77niYdcbiAgICAgICAgdmFyIHRlbXBGaWxlUGF0aHMgPSByZXMudGVtcEZpbGVQYXRocztcbiAgICAgICAgLy8gY29uc29sZS5sb2codGVtcEZpbGVQYXRocyk7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgXG5cbiAgICAgICAgLy8gZm9yKHZhciBpPTA7aTxyZXMudGVtcEZpbGVzLmxlbmd0aDtpKyspeyAgICAgIC8v5qOA5p+l5Zu+54mH5piv5ZCm5aSn5LqONE1cbiAgICAgICAgLy8gICAgICAgaWYocGFyc2VJbnQocmVzLnRlbXBGaWxlc1tpXS5zaXplLzEwMDApID4gNDA5Nil7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2cocGFyc2VJbnQocmVzLnRlbXBGaWxlc1tpXS5zaXplLzEwMDApLFwiaWdcIilcbiAgICAgICAgLy8gICAgICAgICAgIHRoaWR5LnNldERhdGEoe2ltZ3Npemk6dHJ1ZX0pXG4gICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgaW1hZ2VzOiB0aGF0LmRhdGEuaW1hZ2VzLmNvbmNhdCh0ZW1wRmlsZVBhdGhzKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDlm77niYfpooTop4hcbiAgcHJldmlld0ltYWdlOiBmdW5jdGlvbiAoZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5pbWFnZXMpO1xuICAgIHZhciBjdXJyZW50ID0gZS50YXJnZXQuZGF0YXNldC5zcmNcbiAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgY3VycmVudDogY3VycmVudCxcbiAgICAgIHVybHM6IHRoaXMuZGF0YS5pbWFnZXNcbiAgICB9KVxuICB9LFxuICBzdWJtaXQ6IGZ1bmN0aW9uICgpIHsgICAgICAgXG4gICAgLy8gIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5pbWFnZXMpO1xuICAgIGFwcC5nbG9iYWxEYXRhLmltZ2xlbmd0aCA9IHRoaXMuZGF0YS5pbWFnZXNcbiAgICBwYXRoZHMubmF2aWdhdGVCYWNrKDEpXG5cbiAgLy8gICAvLyDmj5DkuqTlm77niYfvvIzkuovlhYjpgY3ljoblm77pm4bmlbDnu4RcbiAgLy8gICB0aGF0LmRhdGEuaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKHRlbXBGaWxlUGF0aCkge1xuICAvLyAgICAgbmV3IEFWLkZpbGUoJ2ZpbGUtbmFtZScsIHtcbiAgLy8gICAgICAgYmxvYjoge1xuICAvLyAgICAgICAgIHVyaTogdGVtcEZpbGVQYXRoLFxuICAvLyAgICAgICB9LFxuICAvLyAgICAgfSkuc2F2ZSgpLnRoZW4oICAgICAgICAgICAgICAgIFxuICAvLyAgICAgICAvLyBmaWxlID0+IGNvbnNvbGUubG9nKGZpbGUudXJsKCkpXG4gIC8vICAgICBmdW5jdGlvbiAoZmlsZSkgeyAgICAgICAgICAgICAgICAgICAgXG4gIC8vICAgICAgIC8vIOWFiOivu+WPllxuICAvLyAgICAgICB2YXIgdXBsb2FkZWRJbWFnZXMgPSB0aGF0LmRhdGEudXBsb2FkZWRJbWFnZXM7XG4gIC8vICAgICAgIHVwbG9hZGVkSW1hZ2VzLnB1c2goZmlsZS51cmwoKSk7ICAgICAgICAgICAgICAgICAgICBcbiAgLy8gICAgICAgLy8g5YaN5YaZ5YWlXG4gIC8vICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gIC8vICAgICAgICAgdXBsb2FkZWRJbWFnZXM6IHVwbG9hZGVkSW1hZ2VzXG4gIC8vICAgICAgIH0pOyBjb25zb2xlLmxvZyh1cGxvYWRlZEltYWdlcyk7XG4gIC8vICAgICB9XG4gIC8vICAgICApLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuICAvLyAgIH0pO1xuICAvLyAgIHd4LnNob3dUb2FzdCh7XG4gIC8vICAgICB0aXRsZTogJ+ivhOS7t+aIkOWKnycsIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgLy8gICAgICAgd3gubmF2aWdhdGVCYWNrKCk7XG4gIC8vICAgICB9XG4gIC8vICAgfSk7XG4gIH0sIFxuICBkZWxldGU6IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXg7IHZhciBpbWFnZXMgPSB0aGF0LmRhdGEuaW1hZ2VzO1xuICAgIGltYWdlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICBpbWFnZXM6IGltYWdlc1xuICAgIH0pO1xuICB9XG5cbn0iXX0=