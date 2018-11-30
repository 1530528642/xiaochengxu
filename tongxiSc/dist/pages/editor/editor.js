"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var daaty = require("../../utils/api2.js");
var cache = require("../../utils/cache.js");
var pathds = require("../../utils/navigator.js");
var tip = require("../../utils/tip.js");
var app = getApp();
exports.default = Page({
    data: {
        upimg: '', //个人头像
        sn: "", //文本sn
        upimgtwo: "", //公司图片
        userId: '', //个人user
        hking: '', //行业列表
        hlist: '', //点击选中行业值
        hkstate: false,
        bcontent: '', //当从编辑点进来时对应的数据
        txtuid: '' //标签选择uid
    },
    onLoad: function onLoad(options) {
        console.log(options, "option");
        var type = decodeURIComponent(options.type);
        var typetwo = decodeURIComponent(options.imgsy);
        var thist = this;
        var uese = cache.get("user", thist.fun);

        if (type == 2) {
            this.setData({ bcontent: '' });
        }

        if (type == 1) {
            var dataObj = app.globalData.dataObj;
            //   console.log(dataObj,"dataObj")
            for (var i = 0; i < dataObj.fileList.length; i++) {
                if (dataObj.fileList[i].scoureType == 12) {
                    this.setData({ imgsdb: dataObj.fileList[i].fileUrl });
                }
            }
            this.setData({ bcontent: dataObj, url: app.globalData.imgUrl, imgsy: typetwo, types: type, index: options.index });
        }
        app.checkLoginStatus();
    },
    onShow: function onShow() {
        var gbtxt = app.globalData.txt;
        if (gbtxt == undefined) {
            gbtxt = "--";
        }
        var newgbtxt = gbtxt.split("--");
        if (newgbtxt[1] == 1) {
            this.setData({ iptxt1: newgbtxt[0] });
        } else {
            this.setData({ iptxt2: newgbtxt[0] });
        }
    },
    fun: function fun(r) {
        var thisty = this;
        this.setData({ imgy: r.data.headImg, userId: r.data.userId });

        daaty.getProductSN(thisty.data.userId, 2, null, successFa);
        function successFa(data, sourceObj) {
            thisty.setData({ sn: data.data.sn });
        }

        daaty.taglist(1, 1, null, successFay);
        function successFay(data, sourceObj) {
            // console.log(data,"55444")
            thisty.setData({ taglist: data.data });
        }

        thisty.setData({ hking: app.globalData.strylist });
    },
    formSubmit: function formSubmit(e) {
        // console.log('form发生了submit事件，携带数据为：', e.detail.value)
        var thisy = this;
        var a = e.detail.value; //表单内容
        var sn = thisy.data.sn; //文件sn
        var ninimg = app.globalData.imglength; //9宫格图片
        var txt;
        // console.log(thisy.data.index,'index')
        if (thisy.data.types == 1) {
            app.globalData.newDataObj = { name: a.input, cardTitle: a.input3, cardPhone: a.input1, wxNo: a.input8, company: a.input2, uid: thisy.data.bcontent.uid, index: thisy.data.index, state: true };
        }
        //   var reg=!!a.input7.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/);
        //  console.log(reg)

        if (thisy.data.types == 1) {//等于1时是从详情进入默认有头像

        } else {
            //等于2时是从首页列表添加进入用户没有添加图片需要提示
            if (thisy.data.upimg == '') {
                tip.showToast("必须上传个人图片");
                return;
            }
        }

        //     if(a.input == ''||a.input1 == ''||a.input2 == ''||a.input3 == ''||a.input4 == ''||a.input8 == ''||a.input9 == ''){
        //     if(a.input == ''){
        //         tip.showToast("姓名不能为空")
        //         return
        //     }else if(a.input1 == ''){
        //         tip.showToast("个人手机不能为空")
        //             return
        //     }else if(a.input2 == ''){
        //         tip.showToast("公司不能为空")
        //             return
        //     }else if(a.input4 == ''){
        //          tip.showToast("行业不能为空")
        //         return
        //     }else if(a.input8 == ''){
        //         tip.showToast("微信号不能为空")
        //         return
        //     }else if(a.input9 == ''){
        //         tip.showToast("公司电话不能为空")
        //         return
        //     }else{
        //         tip.showToast("职务不能为空")
        //             return
        //     }

        // }

        //  if(a.input1){
        //         var telReg = !!a.input1.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
        //         if(telReg == false){
        //             tip.showToast("个人手机号输入有误")
        //              return false
        //         }
        //     }

        thisy.data.bcontent == '' ? txt = "确认保存" : txt = "确认修改";
        tip.showModalcencll("提示", txt, funyy);
        function funyy(res) {
            if (res.confirm == true) {
                var successFa = function successFa(data, sourceObj) {
                    for (var i = 0; i < 3; i++) {
                        if (i == 0 && thisy.data.upimg != '') {
                            thisy.upimg(thisy.data.upimg, thisy.data.upimg.length, 11);
                        } else if (i == 1 && thisy.data.upimgtwo != '') {
                            thisy.upimg(thisy.data.upimgtwo, thisy.data.upimgtwo.length, 12);
                        } else if (i == 2 && ninimg != undefined) {
                            thisy.upimg(ninimg, ninimg.length, 13);
                        }
                    }
                };

                if (thisy.data.bcontent == '') {
                    if (thisy.data.uid == undefined) {
                        //行业没有选择时默认选1
                        thisy.data.uid = 1;
                    }
                    daaty.addCard(sn, thisy.data.userId, a.input, a.input1, a.input3, a.input2, a.input7, "网址2", a.input9, a.input8, a.input18, thisy.data.uid, a.input10, 0, a.input11, null, successFa);
                } else {
                    daaty.updateCard(thisy.data.userId, thisy.data.bcontent.uid, a.input, a.input1, a.input3, a.input2, a.input7, "网址2", a.input9, a.input8, a.input18, 4, a.input10, 0, a.input11, null, successFa);
                }

                setTimeout(function () {
                    pathds.switchTab('../nameCar/nameCar');
                }, 1500);
            }
        }
    },
    upimg: function upimg(filePaths, length, sourceType) {
        var thyyu = this;
        if (filePaths != '') {
            var successFa = function successFa(data, sourceObj) {
                // console.log(data,"data")
                // var pages =getCurrentPages();//当前页面栈
                //     if (pages.length >1) {
                //     var beforePage = pages[pages.length- 2];//获取上一个页面实例对象
                //     beforePage.changeData();//触发父页面中的方法
                //     }
            };

            var sns = this.data.sn;
            if (this.data.bcontent != '') {
                var _successFa = function _successFa(data, sourceObj) {};

                sns = app.globalData.dataObj.cardSn;
                daaty.deleteFile(app.globalData.dataObj.cardSn, thyyu.data.userId, sourceType, _successFa);
            }
            daaty.uploadFile(filePaths, 0, 0, 0, length, sns, this.data.userId, sourceType, successFa);
        }
        // console.log()
        setTimeout(function () {
            pathds.switchTab('../nameCar/nameCar');
        }, 2500);
    },
    update: function update() {
        this.updateImg(1);
    },
    updatetwo: function updatetwo() {
        this.updateImg(2);
    },
    updateImg: function updateImg(numy) {
        var thyy = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function success(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                // console.log(res);
                var tempFilePaths = res.tempFilePaths;
                if (numy == 1) {
                    thyy.setData({ upimg: tempFilePaths });
                } else {
                    thyy.setData({ upimgtwo: tempFilePaths });
                }
            }
        });
    },
    inputning: function inputning() {
        var obj = { emy: "1" };
        pathds.navigateTo("../addtxt/addtxt", obj);
    },
    inputten: function inputten() {
        var obj1 = { emy: "2" };
        pathds.navigateTo("../addtxt/addtxt", obj1);
    },
    inputimg: function inputimg() {
        pathds.navigateTo("../fileImg/fileImg");
    },
    anyBox: function anyBox() {
        this.setData({ hkstate: true });
    },
    achplus: function achplus(e) {
        //   console.log(e.currentTarget.dataset.uid)
        this.setData({ hlist: e.currentTarget.dataset.name, uid: e.currentTarget.dataset.uid, hkstate: false });
    },
    errimg: function errimg() {
        this.setData({ hkstate: false });
    },
    label: function label(e) {
        //   console.log(e.currentTarget.dataset.uid)
        this.setData({ txtuid: e.currentTarget.dataset.uid, txtTy: e.currentTarget.dataset.txt });
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRvci53eHAiXSwibmFtZXMiOlsiZGFhdHkiLCJyZXF1aXJlIiwiY2FjaGUiLCJwYXRoZHMiLCJ0aXAiLCJhcHAiLCJnZXRBcHAiLCJkYXRhIiwidXBpbWciLCJzbiIsInVwaW1ndHdvIiwidXNlcklkIiwiaGtpbmciLCJobGlzdCIsImhrc3RhdGUiLCJiY29udGVudCIsInR4dHVpZCIsIm9uTG9hZCIsIm9wdGlvbnMiLCJjb25zb2xlIiwibG9nIiwidHlwZSIsImRlY29kZVVSSUNvbXBvbmVudCIsInR5cGV0d28iLCJpbWdzeSIsInRoaXN0IiwidWVzZSIsImdldCIsImZ1biIsInNldERhdGEiLCJkYXRhT2JqIiwiZ2xvYmFsRGF0YSIsImkiLCJmaWxlTGlzdCIsImxlbmd0aCIsInNjb3VyZVR5cGUiLCJpbWdzZGIiLCJmaWxlVXJsIiwidXJsIiwiaW1nVXJsIiwidHlwZXMiLCJpbmRleCIsImNoZWNrTG9naW5TdGF0dXMiLCJvblNob3ciLCJnYnR4dCIsInR4dCIsInVuZGVmaW5lZCIsIm5ld2didHh0Iiwic3BsaXQiLCJpcHR4dDEiLCJpcHR4dDIiLCJyIiwidGhpc3R5IiwiaW1neSIsImhlYWRJbWciLCJnZXRQcm9kdWN0U04iLCJzdWNjZXNzRmEiLCJzb3VyY2VPYmoiLCJ0YWdsaXN0Iiwic3VjY2Vzc0ZheSIsInN0cnlsaXN0IiwiZm9ybVN1Ym1pdCIsImUiLCJ0aGlzeSIsImEiLCJkZXRhaWwiLCJ2YWx1ZSIsIm5pbmltZyIsImltZ2xlbmd0aCIsIm5ld0RhdGFPYmoiLCJuYW1lIiwiaW5wdXQiLCJjYXJkVGl0bGUiLCJpbnB1dDMiLCJjYXJkUGhvbmUiLCJpbnB1dDEiLCJ3eE5vIiwiaW5wdXQ4IiwiY29tcGFueSIsImlucHV0MiIsInVpZCIsInN0YXRlIiwic2hvd1RvYXN0Iiwic2hvd01vZGFsY2VuY2xsIiwiZnVueXkiLCJyZXMiLCJjb25maXJtIiwiYWRkQ2FyZCIsImlucHV0NyIsImlucHV0OSIsImlucHV0MTgiLCJpbnB1dDEwIiwiaW5wdXQxMSIsInVwZGF0ZUNhcmQiLCJzZXRUaW1lb3V0Iiwic3dpdGNoVGFiIiwiZmlsZVBhdGhzIiwic291cmNlVHlwZSIsInRoeXl1Iiwic25zIiwiY2FyZFNuIiwiZGVsZXRlRmlsZSIsInVwbG9hZEZpbGUiLCJ1cGRhdGUiLCJ1cGRhdGVJbWciLCJ1cGRhdGV0d28iLCJudW15IiwidGh5eSIsInd4IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic3VjY2VzcyIsInRlbXBGaWxlUGF0aHMiLCJpbnB1dG5pbmciLCJvYmoiLCJlbXkiLCJuYXZpZ2F0ZVRvIiwiaW5wdXR0ZW4iLCJvYmoxIiwiaW5wdXRpbWciLCJhbnlCb3giLCJhY2hwbHVzIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJlcnJpbWciLCJsYWJlbCIsInR4dFR5Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQUlBLFFBQVNDLFFBQVEscUJBQVIsQ0FBYjtBQUNBLElBQUlDLFFBQVNELFFBQVEsc0JBQVIsQ0FBYjtBQUNBLElBQUlFLFNBQVVGLFFBQVEsMEJBQVIsQ0FBZDtBQUNBLElBQUlHLE1BQU1ILFFBQVEsb0JBQVIsQ0FBVjtBQUNBLElBQUlJLE1BQU1DLFFBQVY7O0FBU0VDLFVBQU07QUFDRkMsZUFBTSxFQURKLEVBQ1E7QUFDVkMsWUFBRyxFQUZELEVBRU87QUFDVEMsa0JBQVMsRUFIUCxFQUdVO0FBQ1pDLGdCQUFPLEVBSkwsRUFJUztBQUNYQyxlQUFNLEVBTEosRUFLUTtBQUNWQyxlQUFNLEVBTkosRUFNTztBQUNUQyxpQkFBUSxLQVBOO0FBUUZDLGtCQUFTLEVBUlAsRUFRVTtBQUNaQyxnQkFBTyxFQVRMLENBU087QUFUUCxLO0FBV05DLFlBQU8sZ0JBQVNDLE9BQVQsRUFBaUI7QUFDcEJDLGdCQUFRQyxHQUFSLENBQVlGLE9BQVosRUFBb0IsUUFBcEI7QUFDRixZQUFJRyxPQUFPQyxtQkFBbUJKLFFBQVFHLElBQTNCLENBQVg7QUFDQSxZQUFJRSxVQUFVRCxtQkFBbUJKLFFBQVFNLEtBQTNCLENB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TCxDQUFhLEVBQUNmLFNBQVEsS0FBVCxFQUFiO0FBQ0QsSztBQUNEZ0gsV0FBTSxlQUFTaEUsQ0FBVCxFQUFXO0FBQ2Y7QUFDRSxhQUFLakMsT0FBTCxDQUFhLEVBQUNiLFFBQU84QyxFQUFFNkQsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0I1QyxHQUFoQyxFQUFvQytDLE9BQU1qRSxFQUFFNkQsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0IvRSxHQUFsRSxFQUFiO0FBQ0giLCJmaWxlIjoiZWRpdG9yLnd4cCIsInNvdXJjZXNDb250ZW50IjpbInZhciBkYWF0eSA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYXBpMi5qc1wiKVxudmFyIGNhY2hlID0gIHJlcXVpcmUoXCIuLi8uLi91dGlscy9jYWNoZS5qc1wiKVxudmFyIHBhdGhkcyA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvbmF2aWdhdG9yLmpzXCIpXG52YXIgdGlwID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL3RpcC5qc1wiKVxudmFyIGFwcCA9IGdldEFwcCgpO1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R5ZCN54mHJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtbGFiZWwnOiAnQG1pbnVpL3d4Yy1sYWJlbCcsXG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJ1xuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgICAgdXBpbWc6JycsIC8v5Liq5Lq65aS05YOPXG4gICAgICBzbjpcIlwiLCAgIC8v5paH5pysc25cbiAgICAgIHVwaW1ndHdvOlwiXCIsLy/lhazlj7jlm77niYdcbiAgICAgIHVzZXJJZDonJywgLy/kuKrkurp1c2VyXG4gICAgICBoa2luZzonJywgLy/ooYzkuJrliJfooahcbiAgICAgIGhsaXN0OicnLC8v54K55Ye76YCJ5Lit6KGM5Lia5YC8XG4gICAgICBoa3N0YXRlOmZhbHNlLFxuICAgICAgYmNvbnRlbnQ6JycsLy/lvZPku47nvJbovpHngrnov5vmnaXml7blr7nlupTnmoTmlbDmja5cbiAgICAgIHR4dHVpZDonJy8v5qCH562+6YCJ5oupdWlkXG4gIH0sXG4gIG9uTG9hZDpmdW5jdGlvbihvcHRpb25zKXtcbiAgICAgIGNvbnNvbGUubG9nKG9wdGlvbnMsXCJvcHRpb25cIilcbiAgICB2YXIgdHlwZSA9IGRlY29kZVVSSUNvbXBvbmVudChvcHRpb25zLnR5cGUpXG4gICAgdmFyIHR5cGV0d28gPSBkZWNvZGVVUklDb21wb25lbnQob3B0aW9ucy5pbWdzeSlcbiAgICB2YXIgdGhpc3QgPSB0aGlzXG4gICAgdmFyIHVlc2UgPSBjYWNoZS5nZXQoXCJ1c2VyXCIsdGhpc3QuZnVuKVxuICAgICAgXG4gICAgICBpZih0eXBlID09IDIpe1xuICAgICAgICB0aGlzLnNldERhdGEoe2Jjb250ZW50OicnfSlcbiAgICAgIH1cblxuICAgICAgaWYodHlwZSA9PSAxKXtcbiAgICAgICAgICB2YXIgZGF0YU9iaiA9IGFwcC5nbG9iYWxEYXRhLmRhdGFPYmpcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZyhkYXRhT2JqLFwiZGF0YU9ialwiKVxuICAgICAgICAgIGZvcih2YXIgaT0wO2k8ZGF0YU9iai5maWxlTGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YU9iai5maWxlTGlzdFtpXS5zY291cmVUeXBlID09IDEyKXtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe2ltZ3NkYjpkYXRhT2JqLmZpbGVMaXN0W2ldLmZpbGVVcmx9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXREYXRhKHtiY29udGVudDpkYXRhT2JqLHVybDphcHAuZ2xvYmFsRGF0YS5pbWdVcmwsaW1nc3k6dHlwZXR3byx0eXBlczp0eXBlLGluZGV4Om9wdGlvbnMuaW5kZXh9KVxuICAgICAgfVxuICAgICAgYXBwLmNoZWNrTG9naW5TdGF0dXMoKVxuICB9LFxuICBvblNob3c6ZnVuY3Rpb24oKXtcbiAgICB2YXIgZ2J0eHQgPSBhcHAuZ2xvYmFsRGF0YS50eHRcbiAgICAgICAgaWYoZ2J0eHQgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGdidHh0ID0gXCItLVwiXG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld2didHh0ID0gZ2J0eHQuc3BsaXQoXCItLVwiKVxuICAgICAgICBpZihuZXdnYnR4dFsxXSA9PSAxKXtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7aXB0eHQxOm5ld2didHh0WzBdfSkgXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtpcHR4dDI6bmV3Z2J0eHRbMF19KSBcbiAgICAgICAgfVxuICB9LFxuIGZ1bjpmdW5jdGlvbihyKXtcbiAgICAgICAgdmFyIHRoaXN0eSA9IHRoaXNcbiAgICAgICAgdGhpcy5zZXREYXRhKHtpbWd5OnIuZGF0YS5oZWFkSW1nLHVzZXJJZDpyLmRhdGEudXNlcklkfSlcblxuICAgICAgICBkYWF0eS5nZXRQcm9kdWN0U04odGhpc3R5LmRhdGEudXNlcklkLDIsbnVsbCxzdWNjZXNzRmEpXG4gICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYShkYXRhLCBzb3VyY2VPYmope1xuICAgICAgICAgICAgdGhpc3R5LnNldERhdGEoe3NuOmRhdGEuZGF0YS5zbn0pXG4gICAgICAgIH1cblxuICAgICAgICBkYWF0eS50YWdsaXN0KDEsMSxudWxsLHN1Y2Nlc3NGYXkpXG4gICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkoZGF0YSwgc291cmNlT2JqKXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEsXCI1NTQ0NFwiKVxuICAgICAgICAgICAgdGhpc3R5LnNldERhdGEoe3RhZ2xpc3Q6ZGF0YS5kYXRhfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpc3R5LnNldERhdGEoe2hraW5nOmFwcC5nbG9iYWxEYXRhLnN0cnlsaXN0fSlcbiAgICB9LFxuICBmb3JtU3VibWl0OiBmdW5jdGlvbiAoZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdmb3Jt5Y+R55Sf5LqGc3VibWl05LqL5Lu277yM5pC65bim5pWw5o2u5Li677yaJywgZS5kZXRhaWwudmFsdWUpXG4gICAgICAgICAgICAgICAgdmFyIHRoaXN5ID0gdGhpc1xuICAgICAgICAgICAgICAgIHZhciBhID0gZS5kZXRhaWwudmFsdWUgIC8v6KGo5Y2V5YaF5a65XG4gICAgICAgICAgICAgICAgdmFyIHNuID0gdGhpc3kuZGF0YS5zbiAgLy/mlofku7ZzblxuICAgICAgICAgICAgICAgIHZhciBuaW5pbWcgPSBhcHAuZ2xvYmFsRGF0YS5pbWdsZW5ndGggIC8vOeWuq+agvOWbvueJh1xuICAgICAgICAgICAgICAgIHZhciB0eHQ7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpc3kuZGF0YS5pbmRleCwnaW5kZXgnKVxuICAgICAgICAgICAgICAgIGlmKHRoaXN5LmRhdGEudHlwZXMgPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm5ld0RhdGFPYmogPSB7bmFtZTphLmlucHV0LGNhcmRUaXRsZTphLmlucHV0MyxjYXJkUGhvbmU6YS5pbnB1dDEsd3hObzphLmlucHV0OCxjb21wYW55OmEuaW5wdXQyLHVpZDp0aGlzeS5kYXRhLmJjb250ZW50LnVpZCxpbmRleDp0aGlzeS5kYXRhLmluZGV4LHN0YXRlOnRydWV9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgdmFyIHJlZz0hIWEuaW5wdXQ3Lm1hdGNoKC8oaHR0cHxmdHB8aHR0cHMpOlxcL1xcL1tcXHdcXC1fXSsoXFwuW1xcd1xcLV9dKykrKFtcXHdcXC1cXC4sQD9ePSUmOi9+XFwrI10qW1xcd1xcLVxcQD9ePSUmL35cXCsjXSk/Lyk7XG4gICAgICAgICAgICAgICAgICAgIC8vICBjb25zb2xlLmxvZyhyZWcpXG5cbiAgICAgICAgICAgICAgICBpZih0aGlzeS5kYXRhLnR5cGVzID09IDEgKXsgIC8v562J5LqOMeaXtuaYr+S7juivpuaDhei/m+WFpem7mOiupOacieWktOWDj1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ZWxzZXsgIC8v562J5LqOMuaXtuaYr+S7jummlumhteWIl+ihqOa3u+WKoOi/m+WFpeeUqOaIt+ayoeaciea3u+WKoOWbvueJh+mcgOimgeaPkOekulxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzeS5kYXRhLnVwaW1nID09ICcnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXAuc2hvd1RvYXN0KFwi5b+F6aG75LiK5Lyg5Liq5Lq65Zu+54mHXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYoYS5pbnB1dCA9PSAnJ3x8YS5pbnB1dDEgPT0gJyd8fGEuaW5wdXQyID09ICcnfHxhLmlucHV0MyA9PSAnJ3x8YS5pbnB1dDQgPT0gJyd8fGEuaW5wdXQ4ID09ICcnfHxhLmlucHV0OSA9PSAnJyl7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKGEuaW5wdXQgPT0gJycpe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGlwLnNob3dUb2FzdChcIuWnk+WQjeS4jeiDveS4uuepulwiKVxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgLy8gICAgIH1lbHNlIGlmKGEuaW5wdXQxID09ICcnKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRpcC5zaG93VG9hc3QoXCLkuKrkurrmiYvmnLrkuI3og73kuLrnqbpcIilcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAvLyAgICAgfWVsc2UgaWYoYS5pbnB1dDIgPT0gJycpe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGlwLnNob3dUb2FzdChcIuWFrOWPuOS4jeiDveS4uuepulwiKVxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIC8vICAgICB9ZWxzZSBpZihhLmlucHV0NCA9PSAnJyl7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgdGlwLnNob3dUb2FzdChcIuihjOS4muS4jeiDveS4uuepulwiKVxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgLy8gICAgIH1lbHNlIGlmKGEuaW5wdXQ4ID09ICcnKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRpcC5zaG93VG9hc3QoXCLlvq7kv6Hlj7fkuI3og73kuLrnqbpcIilcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIC8vICAgICB9ZWxzZSBpZihhLmlucHV0OSA9PSAnJyl7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aXAuc2hvd1RvYXN0KFwi5YWs5Y+455S16K+d5LiN6IO95Li656m6XCIpXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAvLyAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aXAuc2hvd1RvYXN0KFwi6IGM5Yqh5LiN6IO95Li656m6XCIpXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAgICAgLy8gIGlmKGEuaW5wdXQxKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHZhciB0ZWxSZWcgPSAhIWEuaW5wdXQxLm1hdGNoKC9eKDB8ODZ8MTc5NTEpPygxM1swLTldfDE1WzAxMjM1Njc4OV18MTdbNjc4XXwxOFswLTldfDE0WzU3XSlbMC05XXs4fSQvKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmKHRlbFJlZyA9PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGlwLnNob3dUb2FzdChcIuS4quS6uuaJi+acuuWPt+i+k+WFpeacieivr1wiKVxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpc3kuZGF0YS5iY29udGVudCA9PSAnJz90eHQ9XCLnoa7orqTkv53lrZhcIjp0eHQ9XCLnoa7orqTkv67mlLlcIlxuICAgICAgICB0aXAuc2hvd01vZGFsY2VuY2xsKFwi5o+Q56S6XCIsdHh0LGZ1bnl5KVxuICAgICAgICBmdW5jdGlvbiBmdW55eShyZXMpe1xuICAgICAgICAgICAgaWYocmVzLmNvbmZpcm0gPT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXN5LmRhdGEuYmNvbnRlbnQgPT0gJycpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpc3kuZGF0YS51aWQgPT0gdW5kZWZpbmVkKXsgIC8v6KGM5Lia5rKh5pyJ6YCJ5oup5pe26buY6K6k6YCJMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXN5LmRhdGEudWlkID0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGFhdHkuYWRkQ2FyZChzbix0aGlzeS5kYXRhLnVzZXJJZCxhLmlucHV0LGEuaW5wdXQxLGEuaW5wdXQzLGEuaW5wdXQyLGEuaW5wdXQ3LFwi572R5Z2AMlwiLCBhLmlucHV0OSxhLmlucHV0OCxhLmlucHV0MTgsdGhpc3kuZGF0YS51aWQsYS5pbnB1dDEwLDAsYS5pbnB1dDExLG51bGwsc3VjY2Vzc0ZhKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgZGFhdHkudXBkYXRlQ2FyZCh0aGlzeS5kYXRhLnVzZXJJZCx0aGlzeS5kYXRhLmJjb250ZW50LnVpZCxhLmlucHV0LGEuaW5wdXQxLGEuaW5wdXQzLGEuaW5wdXQyLGEuaW5wdXQ3LFwi572R5Z2AMlwiLCBhLmlucHV0OSxhLmlucHV0OCxhLmlucHV0MTgsNCxhLmlucHV0MTAsMCxhLmlucHV0MTEsbnVsbCxzdWNjZXNzRmEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYShkYXRhLCBzb3VyY2VPYmope1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpPTA7aTwzO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaSA9PSAwJiZ0aGlzeS5kYXRhLnVwaW1nICE9ICcnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc3kudXBpbWcodGhpc3kuZGF0YS51cGltZyx0aGlzeS5kYXRhLnVwaW1nLmxlbmd0aCwxMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihpID09IDEmJnRoaXN5LmRhdGEudXBpbWd0d28gIT0gJycpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzeS51cGltZyh0aGlzeS5kYXRhLnVwaW1ndHdvLHRoaXN5LmRhdGEudXBpbWd0d28ubGVuZ3RoLDEyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGkgPT0gMiYmbmluaW1nICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXN5LnVwaW1nKG5pbmltZyxuaW5pbWcubGVuZ3RoLDEzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aGRzLnN3aXRjaFRhYignLi4vbmFtZUNhci9uYW1lQ2FyJylcbiAgICAgICAgICAgICAgICAgICAgfSwxNTAwKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIH1cbiAgICAgICBcbiAgICBcbiAgfSxcbiAgdXBpbWc6ZnVuY3Rpb24oZmlsZVBhdGhzLGxlbmd0aCxzb3VyY2VUeXBlKXtcbiAgICAgIHZhciB0aHl5dSA9IHRoaXNcbiAgICBpZihmaWxlUGF0aHMgIT0gJycpe1xuICAgICAgICB2YXIgc25zID0gdGhpcy5kYXRhLnNuXG4gICAgICAgIGlmKHRoaXMuZGF0YS5iY29udGVudCAhPSAnJyl7XG4gICAgICAgICAgICBzbnMgPSBhcHAuZ2xvYmFsRGF0YS5kYXRhT2JqLmNhcmRTblxuICAgICAgICAgICAgZGFhdHkuZGVsZXRlRmlsZShhcHAuZ2xvYmFsRGF0YS5kYXRhT2JqLmNhcmRTbix0aHl5dS5kYXRhLnVzZXJJZCxzb3VyY2VUeXBlLHN1Y2Nlc3NGYSlcbiAgICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYShkYXRhLCBzb3VyY2VPYmope1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRhYXR5LnVwbG9hZEZpbGUoZmlsZVBhdGhzLDAsMCwwLGxlbmd0aCxzbnMsdGhpcy5kYXRhLnVzZXJJZCxzb3VyY2VUeXBlLHN1Y2Nlc3NGYSlcbiAgICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYShkYXRhLCBzb3VyY2VPYmope1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEsXCJkYXRhXCIpXG4gICAgICAgICAgICAgICAgLy8gdmFyIHBhZ2VzID1nZXRDdXJyZW50UGFnZXMoKTsvL+W9k+WJjemhtemdouagiFxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAocGFnZXMubGVuZ3RoID4xKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHZhciBiZWZvcmVQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoLSAyXTsvL+iOt+WPluS4iuS4gOS4qumhtemdouWunuS+i+WvueixoVxuICAgICAgICAgICAgICAgIC8vICAgICBiZWZvcmVQYWdlLmNoYW5nZURhdGEoKTsvL+inpuWPkeeItumhtemdouS4reeahOaWueazlVxuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKClcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIHBhdGhkcy5zd2l0Y2hUYWIoJy4uL25hbWVDYXIvbmFtZUNhcicpXG4gICAgfSwyNTAwKVxuICB9LFxuICB1cGRhdGU6ZnVuY3Rpb24oKXtcbiAgICB0aGlzLnVwZGF0ZUltZygxKVxuICB9LFxuICB1cGRhdGV0d286ZnVuY3Rpb24oKXtcbiAgICB0aGlzLnVwZGF0ZUltZygyKVxuICB9LFxuICB1cGRhdGVJbWc6ZnVuY3Rpb24obnVteSl7XG4gICAgdmFyIHRoeXkgPSB0aGlzOyBcbiAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICBjb3VudDogMSwgLy8g6buY6K6kOVxuICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLCAvLyDlj6/ku6XmjIflrprmmK/ljp/lm77ov5jmmK/ljovnvKnlm77vvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sIC8vIOWPr+S7peaMh+Wumuadpea6kOaYr+ebuOWGjOi/mOaYr+ebuOacuu+8jOm7mOiupOS6jOiAhemDveaciVxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgLy8g6L+U5Zue6YCJ5a6a54Wn54mH55qE5pys5Zyw5paH5Lu26Lev5b6E5YiX6KGo77yMdGVtcEZpbGVQYXRo5Y+v5Lul5L2c5Li6aW1n5qCH562+55qEc3Jj5bGe5oCn5pi+56S65Zu+54mHXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHM7XG4gICAgICAgIGlmKG51bXkgPT0gMSl7XG4gICAgICAgICAgICB0aHl5LnNldERhdGEoeyB1cGltZzogdGVtcEZpbGVQYXRocyB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aHl5LnNldERhdGEoeyB1cGltZ3R3bzogdGVtcEZpbGVQYXRocyB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBpbnB1dG5pbmc6ZnVuY3Rpb24oKXtcbiAgICBsZXQgb2JqICA9IHtlbXk6XCIxXCJ9XG4gICAgcGF0aGRzLm5hdmlnYXRlVG8oXCIuLi9hZGR0eHQvYWRkdHh0XCIsb2JqKVxuICB9LFxuICBpbnB1dHRlbjpmdW5jdGlvbigpe1xuICAgIGxldCBvYmoxICA9IHtlbXk6XCIyXCJ9XG4gICAgcGF0aGRzLm5hdmlnYXRlVG8oXCIuLi9hZGR0eHQvYWRkdHh0XCIsb2JqMSlcbiAgfSxcbiAgaW5wdXRpbWc6ZnVuY3Rpb24oKXtcbiAgICBwYXRoZHMubmF2aWdhdGVUbyhcIi4uL2ZpbGVJbWcvZmlsZUltZ1wiKVxuICB9LFxuICBhbnlCb3g6ZnVuY3Rpb24oKXtcbiAgICB0aGlzLnNldERhdGEoe2hrc3RhdGU6dHJ1ZX0pXG4gIH0sXG4gIGFjaHBsdXM6ZnVuY3Rpb24oZSl7XG4gICAgLy8gICBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51aWQpXG4gICAgICB0aGlzLnNldERhdGEoe2hsaXN0OmUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWUsdWlkOmUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVpZCxoa3N0YXRlOmZhbHNlfSlcbiAgfSxcbiAgZXJyaW1nOmZ1bmN0aW9uKCl7XG4gICAgdGhpcy5zZXREYXRhKHtoa3N0YXRlOmZhbHNlfSlcbiAgfSxcbiAgbGFiZWw6ZnVuY3Rpb24oZSl7XG4gICAgLy8gICBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51aWQpXG4gICAgICB0aGlzLnNldERhdGEoe3R4dHVpZDplLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51aWQsdHh0VHk6ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudHh0fSlcbiAgfVxufSJdfQ==