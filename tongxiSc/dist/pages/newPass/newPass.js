"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var apis = require("../../utils/api.js");
var utils = require("../../utils/util.js");
exports.default = Page({
  data: {
    oldPassword: '', //旧密码
    newPassword: '', //新密码
    stauds: false, //点击完成弹框状态
    // imgone:1,//第一个新密码点击图片时明文状态和图片更换
    // imgtwo:1,//第二个新密码点击图片时明文状态和图片更换
    benstus: true, //点击完成后禁用按钮 防止多次点击 初始为true点击后为false
    frtxt: "" //二次新密码不一致时弹框内容
  },
  formSubmit: function formSubmit(e) {
    if (this.data.benstus == true) {
      var thy = this;
      var conty = e.detail.value;
      if (conty.input1 === conty.input2) {
        var successFa = function successFa(data, sourceObj) {
          if (data.msg == "success") {
            thy.setData({ benstus: false });
            thy.setData({ stauds: true });
          }
        };

        var estateId = wx.getStorageSync("uid");
        var oldPassword = utils.hexMD5(conty.input);
        var newPassword = utils.hexMD5(conty.input1);
        apis.updatePasswords({ oldPassword: oldPassword, newPassword: newPassword, estateId: estateId }, 1, successFa);
      } else {
        thy.setData({ frtxt: "新密码输入不一致", stauds: true });
        setTimeout(function () {
          thy.setData({ stauds: false });
        }, 2000);
      }
    }
  },
  coning: function coning() {
    this.setData({ stauds: false });
    wx.navigateBack({
      delta: 1 //默认值是1，返回的页面数，如果 delta 大于现有页面数，则返回到首页。
    });
  }
  // imageLoad:function(){
  //   if(this.data.imgone == 1){
  //     this.setData({imgone:2})
  //   }else{
  //     this.setData({imgone:1})
  //   }
  // },
  // imageLoadTwo:function(){
  //   if(this.data.imgtwo == 1){
  //     this.setData({imgtwo:2})
  //   }else{
  //     this.setData({imgtwo:1})
  //   }
  // }

  // overy:function overy(){
  //   console.log(11111)
  //   function formSubmit(e) {
  //   console.log(e.detail.value)
  // }
  // var thty = this;
  // var estateId = wx.getStorageSync("uid");
  // var oldPassword = thty.data.oldPassword;
  // var newPassword = thty.data.newPassword;
  // console.log(oldPassword,newPassword,estateId)
  // apis.updatePasswords({oldPassword:oldPassword,newPassword:newPassword,estateId:estateId},1,successFa)
  // function successFa(data, sourceObj){
  //   console.log(data)
  // }
  // }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld1Bhc3Mud3hwIl0sIm5hbWVzIjpbImFwaXMiLCJyZXF1aXJlIiwidXRpbHMiLCJkYXRhIiwib2xkUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsInN0YXVkcyIsImJlbnN0dXMiLCJmcnR4dCIsImZvcm1TdWJtaXQiLCJlIiwidGh5IiwiY29udHkiLCJkZXRhaWwiLCJ2YWx1ZSIsImlucHV0MSIsImlucHV0MiIsInN1Y2Nlc3NGYSIsInNvdXJjZU9iaiIsIm1zZyIsInNldERhdGEiLCJlc3RhdGVJZCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJoZXhNRDUiLCJpbnB1dCIsInVwZGF0ZVBhc3N3b3JkcyIsInNldFRpbWVvdXQiLCJjb25pbmciLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFJQSxPQUFRQyxRQUFRLG9CQUFSLENBQVo7QUFDQSxJQUFJQyxRQUFTRCxRQUFRLHFCQUFSLENBQWI7O0FBTUdFLFFBQU07QUFDTEMsaUJBQVksRUFEUCxFQUNVO0FBQ2ZDLGlCQUFZLEVBRlAsRUFFVTtBQUNmQyxZQUFPLEtBSEYsRUFHUztBQUNkO0FBQ0E7QUFDQUMsYUFBUSxJQU5ILEVBTVE7QUFDYkMsV0FBTSxFQVBELENBT0k7QUFQSixHO0FBU05DLGNBQVksb0JBQVNDLENBQVQsRUFBWTtBQUN2QixRQUFHLEtBQUtQLElBQUwsQ0FBVUksT0FBVixJQUFxQixJQUF4QixFQUE2QjtBQUN6QixVQUFJSSxNQUFNLElBQVY7QUFDQSxVQUFJQyxRQUFRRixFQUFFRyxNQUFGLENBQVNDLEtBQXJCO0FBQ0EsVUFBR0YsTUFBTUcsTUFBTixLQUFpQkgsTUFBTUksTUFBMUIsRUFBaUM7QUFBQSxZQUtsQkMsU0FMa0IsR0FLM0IsU0FBU0EsU0FBVCxDQUFtQmQsSUFBbkIsRUFBeUJlLFNBQXpCLEVBQW1DO0FBQ2pDLGNBQUdmLEtBQUtnQixHQUFMLElBQVksU0FBZixFQUF5QjtBQUNyQlIsZ0JBQUlTLE9BQUosQ0FBWSxFQUFDYixTQUFRLEtBQVQsRUFBWjtBQUNBSSxnQkFBSVMsT0FBSixDQUFZLEVBQUNkLFFBQU8sSUFBUixFQUFaO0FBQ0g7QUFDRixTQVYwQjs7QUFDM0IsWUFBSWUsV0FBV0MsR0FBR0MsY0FBSCxDQUFrQixLQUFsQixDQUFmO0FBQ0EsWUFBSW5CLGNBQWFGLE1BQU1zQixNQUFOLENBQWFaLE1BQU1hLEtBQW5CLENBQWpCO0FBQ0EsWUFBSXBCLGNBQWNILE1BQU1zQixNQUFOLENBQWFaLE1BQU1HLE1BQW5CLENBQWxCO0FBQ0FmLGFBQUswQixlQUFMLENBQXFCLEVBQUN0QixhQUFZQSxXQUFiLEVBQXlCQyxhQUFZQSxXQUFyQyxFQUFpRGdCLFVBQVNBLFFBQTFELEVBQXJCLEVBQXlGLENBQXpGLEVBQTJGSixTQUEzRjtBQU9MLE9BWEQsTUFXSztBQUNITixZQUFJUyxPQUFKLENBQVksRUFBQ1osT0FBTSxVQUFQLEVBQWtCRixRQUFPLElBQXpCLEVBQVo7QUFDQXFCLG1CQUFXLFlBQVU7QUFDbkJoQixjQUFJUyxPQUFKLENBQVksRUFBQ2QsUUFBTyxLQUFSLEVBQVo7QUFDRCxTQUZELEVBRUUsSUFGRjtBQUdEO0FBQ0o7QUFDRixHO0FBQ0RzQixVQUFPLGtCQUFVO0FBQ2YsU0FBS1IsT0FBTCxDQUFhLEVBQUNkLFFBQU8sS0FBUixFQUFiO0FBQ0FnQixPQUFHTyxZQUFILENBQWdCO0FBQ01DLGFBQU8sQ0FEYixDQUNjO0FBRGQsS0FBaEI7QUFHRDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNGIiwiZmlsZSI6Im5ld1Bhc3Mud3hwIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwaXMgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL2FwaS5qc1wiKVxudmFyIHV0aWxzID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy91dGlsLmpzXCIpXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkv67mlLnlr4bnoIEnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge30gXG4gIH0sXG4gICBkYXRhOiB7XG4gICAgb2xkUGFzc3dvcmQ6JycsLy/ml6flr4bnoIFcbiAgICBuZXdQYXNzd29yZDonJywvL+aWsOWvhueggVxuICAgIHN0YXVkczpmYWxzZSwgLy/ngrnlh7vlrozmiJDlvLnmoYbnirbmgIFcbiAgICAvLyBpbWdvbmU6MSwvL+esrOS4gOS4quaWsOWvhueggeeCueWHu+WbvueJh+aXtuaYjuaWh+eKtuaAgeWSjOWbvueJh+abtOaNolxuICAgIC8vIGltZ3R3bzoxLC8v56ys5LqM5Liq5paw5a+G56CB54K55Ye75Zu+54mH5pe25piO5paH54q25oCB5ZKM5Zu+54mH5pu05o2iXG4gICAgYmVuc3R1czp0cnVlLC8v54K55Ye75a6M5oiQ5ZCO56aB55So5oyJ6ZKuIOmYsuatouWkmuasoeeCueWHuyDliJ3lp4vkuLp0cnVl54K55Ye75ZCO5Li6ZmFsc2VcbiAgICBmcnR4dDpcIlwiIC8v5LqM5qyh5paw5a+G56CB5LiN5LiA6Ie05pe25by55qGG5YaF5a65XG4gIH0sXG4gICBmb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgaWYodGhpcy5kYXRhLmJlbnN0dXMgPT0gdHJ1ZSl7XG4gICAgICAgIHZhciB0aHkgPSB0aGlzO1xuICAgICAgICB2YXIgY29udHkgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICBpZihjb250eS5pbnB1dDEgPT09IGNvbnR5LmlucHV0Mil7XG4gICAgICAgICAgICAgIHZhciBlc3RhdGVJZCA9IHd4LmdldFN0b3JhZ2VTeW5jKFwidWlkXCIpO1xuICAgICAgICAgICAgICB2YXIgb2xkUGFzc3dvcmQgPXV0aWxzLmhleE1ENShjb250eS5pbnB1dCk7XG4gICAgICAgICAgICAgIHZhciBuZXdQYXNzd29yZCA9IHV0aWxzLmhleE1ENShjb250eS5pbnB1dDEpO1xuICAgICAgICAgICAgICBhcGlzLnVwZGF0ZVBhc3N3b3Jkcyh7b2xkUGFzc3dvcmQ6b2xkUGFzc3dvcmQsbmV3UGFzc3dvcmQ6bmV3UGFzc3dvcmQsZXN0YXRlSWQ6ZXN0YXRlSWR9LDEsc3VjY2Vzc0ZhKVxuICAgICAgICAgICAgICBmdW5jdGlvbiBzdWNjZXNzRmEoZGF0YSwgc291cmNlT2JqKXtcbiAgICAgICAgICAgICAgICBpZihkYXRhLm1zZyA9PSBcInN1Y2Nlc3NcIil7XG4gICAgICAgICAgICAgICAgICAgIHRoeS5zZXREYXRhKHtiZW5zdHVzOmZhbHNlfSlcbiAgICAgICAgICAgICAgICAgICAgdGh5LnNldERhdGEoe3N0YXVkczp0cnVlfSkgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoeS5zZXREYXRhKHtmcnR4dDpcIuaWsOWvhueggei+k+WFpeS4jeS4gOiHtFwiLHN0YXVkczp0cnVlfSkgXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGh5LnNldERhdGEoe3N0YXVkczpmYWxzZX0pXG4gICAgICAgICAgfSwyMDAwKVxuICAgICAgICB9XG4gICAgfVxuICB9LFxuICBjb25pbmc6ZnVuY3Rpb24oKXtcbiAgICB0aGlzLnNldERhdGEoe3N0YXVkczpmYWxzZX0pXG4gICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDEvL+m7mOiupOWAvOaYrzHvvIzov5Tlm57nmoTpobXpnaLmlbDvvIzlpoLmnpwgZGVsdGEg5aSn5LqO546w5pyJ6aG16Z2i5pWw77yM5YiZ6L+U5Zue5Yiw6aaW6aG144CCXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gIH1cbiAgLy8gaW1hZ2VMb2FkOmZ1bmN0aW9uKCl7XG4gIC8vICAgaWYodGhpcy5kYXRhLmltZ29uZSA9PSAxKXtcbiAgLy8gICAgIHRoaXMuc2V0RGF0YSh7aW1nb25lOjJ9KVxuICAvLyAgIH1lbHNle1xuICAvLyAgICAgdGhpcy5zZXREYXRhKHtpbWdvbmU6MX0pXG4gIC8vICAgfVxuICAvLyB9LFxuICAvLyBpbWFnZUxvYWRUd286ZnVuY3Rpb24oKXtcbiAgLy8gICBpZih0aGlzLmRhdGEuaW1ndHdvID09IDEpe1xuICAvLyAgICAgdGhpcy5zZXREYXRhKHtpbWd0d286Mn0pXG4gIC8vICAgfWVsc2V7XG4gIC8vICAgICB0aGlzLnNldERhdGEoe2ltZ3R3bzoxfSlcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBvdmVyeTpmdW5jdGlvbiBvdmVyeSgpe1xuICAvLyAgIGNvbnNvbGUubG9nKDExMTExKVxuICAvLyAgIGZ1bmN0aW9uIGZvcm1TdWJtaXQoZSkge1xuICAvLyAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLnZhbHVlKVxuICAvLyB9XG4gICAgLy8gdmFyIHRodHkgPSB0aGlzO1xuICAgIC8vIHZhciBlc3RhdGVJZCA9IHd4LmdldFN0b3JhZ2VTeW5jKFwidWlkXCIpO1xuICAgIC8vIHZhciBvbGRQYXNzd29yZCA9IHRodHkuZGF0YS5vbGRQYXNzd29yZDtcbiAgICAvLyB2YXIgbmV3UGFzc3dvcmQgPSB0aHR5LmRhdGEubmV3UGFzc3dvcmQ7XG4gICAgLy8gY29uc29sZS5sb2cob2xkUGFzc3dvcmQsbmV3UGFzc3dvcmQsZXN0YXRlSWQpXG4gICAgLy8gYXBpcy51cGRhdGVQYXNzd29yZHMoe29sZFBhc3N3b3JkOm9sZFBhc3N3b3JkLG5ld1Bhc3N3b3JkOm5ld1Bhc3N3b3JkLGVzdGF0ZUlkOmVzdGF0ZUlkfSwxLHN1Y2Nlc3NGYSlcbiAgICAvLyBmdW5jdGlvbiBzdWNjZXNzRmEoZGF0YSwgc291cmNlT2JqKXtcbiAgICAvLyAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgLy8gfVxuICAvLyB9XG59Il19