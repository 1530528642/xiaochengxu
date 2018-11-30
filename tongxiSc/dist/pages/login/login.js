"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var apis = require("../../utils/api.js");
var utils = require("../../utils/util.js");
exports.default = Page({
    onLoad: function onLoad() {},

    clickLogin: function clickLogin() {
        var _thiy = this;
        var mobileNumber = this.data.mobileNumber;
        var password = this.data.qqNumber;
        password = utils.hexMD5(password);
        apis.logins({ userName: mobileNumber, password: password }, 1, successFa);
        function successFa(data, sourceObj) {
            wx.setStorageSync("token", data.data.token);
            wx.setStorageSync("uid", data.data.uid);
            wx.navigateBack({
                delta: 1 //默认值是1，返回的页面数，如果 delta 大于现有页面数，则返回到首页。
            });
        }
        //    _thiy.getUser()
    },
    // getUser:function(){
    //     console.log(77777777)
    //        wx.getSetting({

    //   success: function(res){
    //       console.log(res,88888888)
    //     if (res.authSetting["errMsg:getSetting:ok"])
    //      {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function(res) {
    //           console(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
    //        },
    //            bindGetUserInfo: function(e) {
    //     console.log(e.detail.userInfo)
    //   },
    data: {
        mobileNumber: '',
        qqNumber: '',
        mobileTip: true,
        qqTip: true
        // canIUse: wx.canIUse('button.open-type.getUserInfo')//检查有没有使用权限
    },

    onInput: function onInput(e) {
        var type = e.target.dataset.type;
        var number = e.detail.value;

        this.setData(_defineProperty({}, type + 'Number', number));
        this.validate(number, type);
    },
    onBlur: function onBlur(e) {
        // console.log(e.target.dataset.type)
        var type = e.target.dataset.type;
        var number = e.detail.value;
        this.validate(number, type);
    },
    clearInput: function clearInput(e) {
        var _setData2;

        var type = e.currentTarget.dataset.type;
        this.setData((_setData2 = {}, _defineProperty(_setData2, type + 'Number', ""), _defineProperty(_setData2, type + 'Tip', false), _setData2));
    },
    validate: function validate(number, type) {
        if (type === "mobile") {
            this.validateTelephone(number);
        }

        if (type === "qq") {
            this.validateQQ(number);
        }
    },
    validateTelephone: function validateTelephone(number) {
        var regPhone = /^1(3|4|5|7|8)\d{9}$/;
        var tip = false;
        if (!regPhone.test(number) && number.length > 0) {
            // 输入7位以上开始校验手机号码
            tip = true;
        }
        this.setData({
            mobileTip: tip
        });
    },
    validateQQ: function validateQQ(number) {
        var tip = false;
        var regQQ = /^[1-9]\d{1,18}$/;
        if (!regQQ.test(number) && number.length > 0) {
            // 输入4位以上开始qq号码
            tip = true;
        }
        this.setData({
            qqTip: tip
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLnd4cCJdLCJuYW1lcyI6WyJhcGlzIiwicmVxdWlyZSIsInV0aWxzIiwib25Mb2FkIiwiY2xpY2tMb2dpbiIsIl90aGl5IiwibW9iaWxlTnVtYmVyIiwiZGF0YSIsInBhc3N3b3JkIiwicXFOdW1iZXIiLCJoZXhNRDUiLCJsb2dpbnMiLCJ1c2VyTmFtZSIsInN1Y2Nlc3NGYSIsInNvdXJjZU9iaiIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJ0b2tlbiIsInVpZCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwibW9iaWxlVGlwIiwicXFUaXAiLCJvbklucHV0IiwiZSIsInR5cGUiLCJ0YXJnZXQiLCJkYXRhc2V0IiwibnVtYmVyIiwiZGV0YWlsIiwidmFsdWUiLCJzZXREYXRhIiwidmFsaWRhdGUiLCJvbkJsdXIiLCJjbGVhcklucHV0IiwiY3VycmVudFRhcmdldCIsInZhbGlkYXRlVGVsZXBob25lIiwidmFsaWRhdGVRUSIsInJlZ1Bob25lIiwidGlwIiwidGVzdCIsImxlbmd0aCIsInJlZ1FRIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUlBLE9BQVFDLFFBQVEsb0JBQVIsQ0FBWjtBQUNBLElBQUlDLFFBQVNELFFBQVEscUJBQVIsQ0FBYjs7QUFPUUUsWUFBTyxrQkFBVSxDQUNoQixDOztBQUVEQyxnQkFBVyxzQkFBVTtBQUNqQixZQUFJQyxRQUFRLElBQVo7QUFDQSxZQUFJQyxlQUFlLEtBQUtDLElBQUwsQ0FBVUQsWUFBN0I7QUFDQSxZQUFJRSxXQUFZLEtBQUtELElBQUwsQ0FBVUUsUUFBMUI7QUFDSUQsbUJBQVdOLE1BQU1RLE1BQU4sQ0FBYUYsUUFBYixDQUFYO0FBQ05SLGFBQUtXLE1BQUwsQ0FBWSxFQUFDQyxVQUFTTixZQUFWLEVBQXVCRSxVQUFTQSxRQUFoQyxFQUFaLEVBQXNELENBQXRELEVBQXdESyxTQUF4RDtBQUNBLGlCQUFTQSxTQUFULENBQW1CTixJQUFuQixFQUF5Qk8sU0FBekIsRUFBbUM7QUFDM0JDLGVBQUdDLGNBQUgsQ0FBa0IsT0FBbEIsRUFBMEJULEtBQUtBLElBQUwsQ0FBVVUsS0FBcEM7QUFDQUYsZUFBR0MsY0FBSCxDQUFrQixLQUFsQixFQUF3QlQsS0FBS0EsSUFBTCxDQUFVVyxHQUFsQztBQUNBSCxlQUFHSSxZQUFILENBQWdCO0FBQ1pDLHVCQUFPLENBREssQ0FDSjtBQURJLGFBQWhCO0FBR047QUFDSjtBQUNDLEs7QUFDRDtBQUNBO0FBQ0E7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNKO0FBQ0E7QUFDQTtBQUNRYixVQUFNO0FBQ0ZELHNCQUFjLEVBRFo7QUFFRkcsa0JBQVUsRUFGUjtBQUdGWSxtQkFBVyxJQUhUO0FBSUZDLGVBQU87QUFDUDtBQUxFLEs7O0FBUUZDLFcsbUJBQVFDLEMsRUFBRztBQUNQLFlBQUlDLE9BQU9ELEVBQUVFLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkYsSUFBNUI7QUFDQSxZQUFJRyxTQUFTSixFQUFFSyxNQUFGLENBQVNDLEtBQXRCOztBQUVBLGFBQUtDLE9BQUwscUJBQ0tOLE9BQU8sUUFEWixFQUN1QkcsTUFEdkI7QUFHQSxhQUFLSSxRQUFMLENBQWNKLE1BQWQsRUFBc0JILElBQXRCO0FBQ0gsSztBQUNEUSxVLGtCQUFPVCxDLEVBQUc7QUFDTjtBQUNBLFlBQUlDLE9BQU9ELEVBQUVFLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkYsSUFBNUI7QUFDQSxZQUFJRyxTQUFTSixFQUFFSyxNQUFGLENBQVNDLEtBQXRCO0FBQ0EsYUFBS0UsUUFBTCxDQUFjSixNQUFkLEVBQXNCSCxJQUF0QjtBQUNILEs7QUFDRFMsYyxzQkFBV1YsQyxFQUFHO0FBQUE7O0FBQ1YsWUFBSUMsT0FBT0QsRUFBRVcsYUFBRixDQUFnQlIsT0FBaEIsQ0FBd0JGLElBQW5DO0FBQ0EsYUFBS00sT0FBTCw2Q0FDS04sT0FBTyxRQURaLEVBQ3VCLEVBRHZCLDhCQUVLQSxPQUFPLEtBRlosRUFFb0IsS0FGcEI7QUFJSCxLO0FBQ0RPLFksb0JBQVNKLE0sRUFBUUgsSSxFQUFNO0FBQ25CLFlBQUlBLFNBQVMsUUFBYixFQUF1QjtBQUNuQixpQkFBS1csaUJBQUwsQ0FBdUJSLE1BQXZCO0FBQ0g7O0FBRUQsWUFBSUgsU0FBUyxJQUFiLEVBQW1CO0FBQ2YsaUJBQUtZLFVBQUwsQ0FBZ0JULE1BQWhCO0FBQ0g7QUFDSixLO0FBQ0RRLHFCLDZCQUFrQlIsTSxFQUFRO0FBQ3RCLFlBQUlVLFdBQVcscUJBQWY7QUFDQSxZQUFJQyxNQUFNLEtBQVY7QUFDQSxZQUFJLENBQUNELFNBQVNFLElBQVQsQ0FBY1osTUFBZCxDQUFELElBQTBCQSxPQUFPYSxNQUFQLEdBQWdCLENBQTlDLEVBQWlEO0FBQzdDO0FBQ0FGLGtCQUFNLElBQU47QUFDSDtBQUNELGFBQUtSLE9BQUwsQ0FBYTtBQUNUVix1QkFBV2tCO0FBREYsU0FBYjtBQUdILEs7QUFDREYsYyxzQkFBV1QsTSxFQUFRO0FBQ2YsWUFBSVcsTUFBTSxLQUFWO0FBQ0EsWUFBSUcsUUFBUSxpQkFBWjtBQUNBLFlBQUksQ0FBQ0EsTUFBTUYsSUFBTixDQUFXWixNQUFYLENBQUQsSUFBdUJBLE9BQU9hLE1BQVAsR0FBZ0IsQ0FBM0MsRUFBOEM7QUFDMUM7QUFDQUYsa0JBQU0sSUFBTjtBQUNIO0FBQ0QsYUFBS1IsT0FBTCxDQUFhO0FBQ1RULG1CQUFPaUI7QUFERSxTQUFiO0FBR0giLCJmaWxlIjoibG9naW4ud3hwIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwaXMgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL2FwaS5qc1wiKVxudmFyIHV0aWxzID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy91dGlsLmpzXCIpXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgICAgICAgICAgICd3eGMtaW5wdXQnOiAnQG1pbnVpL3d4Yy1pbnB1dCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25Mb2FkOmZ1bmN0aW9uKCl7XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBjbGlja0xvZ2luOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgX3RoaXkgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIG1vYmlsZU51bWJlciA9IHRoaXMuZGF0YS5tb2JpbGVOdW1iZXI7XG4gICAgICAgICAgICB2YXIgcGFzc3dvcmQgPSAgdGhpcy5kYXRhLnFxTnVtYmVyO1xuICAgICAgICAgICAgICAgIHBhc3N3b3JkID0gdXRpbHMuaGV4TUQ1KHBhc3N3b3JkKVxuICAgICAgICAgIGFwaXMubG9naW5zKHt1c2VyTmFtZTptb2JpbGVOdW1iZXIscGFzc3dvcmQ6cGFzc3dvcmR9LDEsc3VjY2Vzc0ZhKVxuICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYShkYXRhLCBzb3VyY2VPYmope1xuICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJ0b2tlblwiLGRhdGEuZGF0YS50b2tlbilcbiAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwidWlkXCIsZGF0YS5kYXRhLnVpZClcbiAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDEvL+m7mOiupOWAvOaYrzHvvIzov5Tlm57nmoTpobXpnaLmlbDvvIzlpoLmnpwgZGVsdGEg5aSn5LqO546w5pyJ6aG16Z2i5pWw77yM5YiZ6L+U5Zue5Yiw6aaW6aG144CCXG4gICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgX3RoaXkuZ2V0VXNlcigpXG4gICAgICAgIH0sXG4gICAgICAgIC8vIGdldFVzZXI6ZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKDc3Nzc3Nzc3KVxuICAgICAgICAvLyAgICAgICAgd3guZ2V0U2V0dGluZyh7XG5cbiAgICAvLyAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XG4gICAgLy8gICAgICAgY29uc29sZS5sb2cocmVzLDg4ODg4ODg4KVxuICAgIC8vICAgICBpZiAocmVzLmF1dGhTZXR0aW5nW1wiZXJyTXNnOmdldFNldHRpbmc6b2tcIl0pXG4gICAgLy8gICAgICB7XG4gICAgLy8gICAgICAgLy8g5bey57uP5o6I5p2D77yM5Y+v5Lul55u05o6l6LCD55SoIGdldFVzZXJJbmZvIOiOt+WPluWktOWDj+aYteensFxuICAgIC8vICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgIC8vICAgICAgICAgICBjb25zb2xlKHJlcy51c2VySW5mbylcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICB9KVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gfSlcbiAgICAvLyAgICAgICAgfSxcbi8vICAgICAgICAgICAgYmluZEdldFVzZXJJbmZvOiBmdW5jdGlvbihlKSB7XG4vLyAgICAgY29uc29sZS5sb2coZS5kZXRhaWwudXNlckluZm8pXG4vLyAgIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG1vYmlsZU51bWJlcjogJycsXG4gICAgICAgICAgICBxcU51bWJlcjogJycsXG4gICAgICAgICAgICBtb2JpbGVUaXA6IHRydWUsXG4gICAgICAgICAgICBxcVRpcDogdHJ1ZVxuICAgICAgICAgICAgLy8gY2FuSVVzZTogd3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpLy/mo4Dmn6XmnInmsqHmnInkvb/nlKjmnYPpmZBcbiAgICAgICAgfSxcblxuICAgICAgICAgICAgb25JbnB1dChlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBlLnRhcmdldC5kYXRhc2V0LnR5cGU7XG4gICAgICAgICAgICAgICAgbGV0IG51bWJlciA9IGUuZGV0YWlsLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgW3R5cGUgKyAnTnVtYmVyJ106IG51bWJlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUobnVtYmVyLCB0eXBlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkJsdXIoZSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQudHlwZSlcbiAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IGUudGFyZ2V0LmRhdGFzZXQudHlwZTtcbiAgICAgICAgICAgICAgICBsZXQgbnVtYmVyID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZShudW1iZXIsIHR5cGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFySW5wdXQoZSkge1xuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudHlwZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICBbdHlwZSArICdOdW1iZXInXTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgW3R5cGUgKyAnVGlwJ106IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsaWRhdGUobnVtYmVyLCB0eXBlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwibW9iaWxlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVRlbGVwaG9uZShudW1iZXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInFxXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVFRKG51bWJlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZhbGlkYXRlVGVsZXBob25lKG51bWJlcikge1xuICAgICAgICAgICAgICAgIGxldCByZWdQaG9uZSA9IC9eMSgzfDR8NXw3fDgpXFxkezl9JC87XG4gICAgICAgICAgICAgICAgbGV0IHRpcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghcmVnUGhvbmUudGVzdChudW1iZXIpICYmIG51bWJlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOi+k+WFpTfkvY3ku6XkuIrlvIDlp4vmoKHpqozmiYvmnLrlj7fnoIFcbiAgICAgICAgICAgICAgICAgICAgdGlwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgbW9iaWxlVGlwOiB0aXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2YWxpZGF0ZVFRKG51bWJlcikge1xuICAgICAgICAgICAgICAgIGxldCB0aXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBsZXQgcmVnUVEgPSAvXlsxLTldXFxkezEsMTh9JC87XG4gICAgICAgICAgICAgICAgaWYgKCFyZWdRUS50ZXN0KG51bWJlcikgJiYgbnVtYmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6L6T5YWlNOS9jeS7peS4iuW8gOWni3Fx5Y+356CBXG4gICAgICAgICAgICAgICAgICAgIHRpcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIHFxVGlwOiB0aXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgfSJdfQ==