"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var navigator = require("../../utils/navigator.js");
var daaty = require("../../utils/api2.js");
var cache = require("../../utils/cache.js");
var app = getApp();
exports.default = Page({
    data: {
        datas: "",
        sttre: true,
        newClass: 0,
        actoinfo: '',
        appglok: ''
    },

    onLoad: function onLoad() {
        app.checkLoginStatus();
        var time = new Date();
        // console.log(app.globalData.bchage,66666)
        var thery = this;
        var uese = app.globalData.user;
        thery.setData({ uese: uese, url: app.globalData.imgUrl });
        daaty.myCardList(uese.userId, 0, 100, null, successFay);
        function successFay(data, sourceObj) {
            var fstata = data.data;
            thery.listsoft(fstata, 1);
        }

        daaty.industryList(null, successFals);
        function successFals(data, sourceObj) {
            app.globalData.strylist = data.data;
        }
    },

    onShow: function onShow() {
        var thery = this;
        var uese = app.globalData.user;
        thery.setData({ uese: uese });
        daaty.myCardList(this.data.uese.userId, 0, 100, null, successFay);
        function successFay(data, sourceObj) {
            var fstata = data.data;
            thery.listsoft(fstata, 2);
        }
    },

    listsoft: function listsoft(fstata, m) {
        //排序  m=1时为onload加载 m=2时为onshow加载
        var thery = this;
        if (fstata != undefined) {
            //检查是否存有卡片 当fstata!=undefind时说明存在卡片 否则不存在卡片
            var compare = function compare(ajuo) {
                return function (a, b) {
                    var value1 = a[ajuo];
                    var value2 = b[ajuo];
                    return value1 - value2;
                };
            };

            var ty = fstata.sort(compare('uid'));
            if (m == 1) {
                var dadty = ty[0];
                thery.setData({ datas: ty, appglok: dadty });
                thery.pepolmg(dadty.fileList, 1);
            } else {
                if (ty.length == 1) {
                    //    
                    thery.setData({ appglok: ty[0], datas: ty, newClass: 0 });
                    thery.pepolmg(ty[0].fileList, 1);
                } else {
                    console.log(ty, "ty");
                    thery.setData({ datas: ty });
                    console.log(app.globalData.newDataObj.steaindex, 556556666);
                    if (app.globalData.newDataObj.steaindex != '' && app.globalData.newDataObj.steaindex != undefined) {
                        var newindex = parseInt(app.globalData.newDataObj.steaindex);
                        if (newindex == ty.length) {
                            newindex--;
                        }
                        console.log(ty[newindex], 99999999911111);
                        thery.setData({ appglok: ty[newindex], newClass: newindex });
                        thery.pepolmg(ty[newindex].uid, 2);
                    }
                    if (app.globalData.newDataObj != undefined && app.globalData.newDataObj.state == true && app.globalData.newDataObj != '') {

                        var newevec = app.globalData.newDataObj;
                        thery.comceny(newevec, 2);
                    }
                }
            }
        } else {
            //当不存在卡片时将当前data内的dataappglok,imgs,datas清空（如果不清空会导致删除最后有一张卡片只有table刷新了，但名片上信息还会取data的数据）
            thery.setData({ appglok: '', imgs: '', datas: '' });
        }
    },

    comceny: function comceny(e, ny) {
        //点击tab栏卡片 e分别代表为二种状态 当ny=2时e取得值为编辑后改变的新缓存newDataObj此时是编辑页面回到本页面自动执行的comceny点击事件，否则代表用户自己点击拿去的值并非缓存的值
        //   console.log(e,ny)
        var deys = void 0;
        var sdd = void 0;
        var tg = void 0;
        app.globalData.newDataObj.steaindex = '';
        if (ny == 2) {
            deys = e;
            this.setData({ newClass: app.globalData.newDataObj.index, appglok: deys });
            this.pepolmg(app.globalData.newDataObj.uid, 2);
        } else {
            deys = e.currentTarget.dataset.dey;
            sdd = deys.split('-');
            tg = { idex: sdd[0], name: sdd[1], cardTitle: sdd[2], cardPhone: sdd[3], wxNo: sdd[4], company: sdd[5], uid: sdd[7] };
            app.globalData.appgolble = tg;
            this.setData({ newClass: sdd[0], appglok: tg });
            this.pepolmg(sdd[7], 2);
        }
    },

    iscopomet: function iscopomet() {
        //点击卡片
        app.globalData.newDataObj.steaindex = '';
        if (this.data.datas != "") {
            var datys = this.data.datas;
            var uid = this.data.appglok.uid;
            for (var i = 0; i < datys.length; i++) {
                if (datys[i].uid == uid) {
                    app.globalData.dataObj = datys[i]; //点击时缓存被点击卡片的信息 在编辑页面是取该缓存  名片详情没取该缓存而是用接口是因为可能从分享进入导致无法取到缓存
                    break;
                }
            }

            // var imgsy = this.data.imgs
            // app.globalData.newDataObj = ''
            console.log(this.data.newClass, 1111111);
            var param = { uid: uid, index: this.data.newClass };
            navigator.navigateTo('../details/details', param);
        } else {
            return false;
        }
    },

    //nu等于1时dasts是所有列表数据 等于2时dasts是被点击的uid  主要为初始化时(nu=1)拿出用户头像 点击时nu=2 通过uid后做对比
    pepolmg: function pepolmg(dasts, nu) {
        if (nu == 2) {
            var dajson = this.data.datas; //所有数据列表
            for (var k = 0; k < dajson.length; k++) {
                if (dajson[k].uid == dasts) {
                    if (dajson[k].fileList != '') {
                        for (var i = 0; i < dajson[k].fileList.length; i++) {
                            if (dajson[k].fileList[i].scoureType == 11) {
                                this.setData({ imgs: dajson[k].fileList[i].fileUrl });
                            }
                        }
                    } else {
                        this.setData({ imgs: '' });
                    }
                }
            }
        } else {
            for (var i = 0; i < dasts.length; i++) {
                if (dasts[i].scoureType == 11) {
                    this.setData({ imgs: dasts[i].fileUrl });
                }
            }
        }
    },
    onShareAppMessage: function onShareAppMessage(e) {
        var uids = this.data.appglok.uid;
        var userid = this.data.uese.userId;
        var name = cache.getSync("user");
        var time = app.globalData.imgUrl + '/upload/card/user/' + uids + '.jpg?' + new Date().getTime();
        return {
            title: '这是我的[' + name.nickName + ']电子名片,望惠存',
            // desc: '分享页面的内容',
            imageUrl: time,
            path: 'pages/details/details?uid=' + uids, // 路径，传递参数到指定页面。
            success: function success(res) {
                console.log("转发成功", res);
                daaty.operationList(userid, uids, null, successFa);
                function successFa(data, sourceObj) {}
            },
            fail: function fail(res) {
                console.log("转发失败", res);
            }
        };
    },
    addig: function addig() {
        var param = { type: 2 };
        navigator.navigateTo('../editor/editor', param);
    },
    cvarly: function cvarly() {
        wx.navigateTo({
            url: '../Business/Business'
        });
    },
    list1: function list1() {
        var param = { type: 1 };
        navigator.navigateTo('../Business/Businesslist', param);
    },
    list2: function list2() {
        var param = { type: 2 };
        navigator.navigateTo('../Business/Businesslist', param);
    },
    list3: function list3() {
        var param = { type: 3 };
        navigator.navigateTo('../Business/Businesslist', param);
    },
    list4: function list4() {
        var param = { type: 4 };
        navigator.navigateTo('../Business/Businesslist', param);
    },
    numtwo: function numtwo() {
        app.checkLoginStatus();
    },
    changeData: function changeData() {
        this.onLoad(); //最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
    },
    btnconttwo: function btnconttwo() {
        this.addig();
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hbWVDYXIud3hwIl0sIm5hbWVzIjpbIm5hdmlnYXRvciIsInJlcXVpcmUiLCJkYWF0eSIsImNhY2hlIiwiYXBwIiwiZ2V0QXBwIiwiZGF0YSIsImRhdGFzIiwic3R0cmUiLCJuZXdDbGFzcyIsImFjdG9pbmZvIiwiYXBwZ2xvayIsIm9uTG9hZCIsImNoZWNrTG9naW5TdGF0dXMiLCJ0aW1lIiwiRGF0ZSIsInRoZXJ5IiwidWVzZSIsImdsb2JhbERhdGEiLCJ1c2VyIiwic2V0RGF0YSIsInVybCIsImltZ1VybCIsIm15Q2FyZExpc3QiLCJ1c2VySWQiLCJzdWNjZXNzRmF5Iiwic291cmNlT2JqIiwiZnN0YXRhIiwibGlzdHNvZnQiLCJpbmR1c3RyeUxpc3QiLCJzdWNjZXNzRmFscyIsInN0cnlsaXN0Iiwib25TaG93IiwibSIsInVuZGVmaW5lZCIsImNvbXBhcmUiLCJhanVvIiwiYSIsImIiLCJ2YWx1ZTEiLCJ2YWx1ZTIiLCJ0eSIsInNvcnQiLCJkYWR0eSIsInBlcG9sbWciLCJmaWxlTGlzdCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJuZXdEYXRhT2JqIiwic3RlYWluZGV4IiwibmV3aW5kZXgiLCJwYXJzZUludCIsInVpZCIsInN0YXRlIiwibmV3ZXZlYyIsImNvbWNlbnkiLCJpbWdzIiwiZSIsIm55IiwiZGV5cyIsInNkZCIsInRnIiwiaW5kZXgiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImRleSIsInNwbGl0IiwiaWRleCIsIm5hbWUiLCJjYXJkVGl0bGUiLCJjYXJkUGhvbmUiLCJ3eE5vIiwiY29tcGFueSIsImFwcGdvbGJsZSIsImlzY29wb21ldCIsImRhdHlzIiwiaSIsImRhdGFPYmoiLCJwYXJhbSIsIm5hdmlnYXRlVG8iLCJkYXN0cyIsIm51IiwiZGFqc29uIiwiayIsInNjb3VyZVR5cGUiLCJmaWxlVXJsIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJ1aWRzIiwidXNlcmlkIiwiZ2V0U3luYyIsImdldFRpbWUiLCJ0aXRsZSIsIm5pY2tOYW1lIiwiaW1hZ2VVcmwiLCJwYXRoIiwic3VjY2VzcyIsInJlcyIsIm9wZXJhdGlvbkxpc3QiLCJzdWNjZXNzRmEiLCJmYWlsIiwiYWRkaWciLCJ0eXBlIiwiY3Zhcmx5Iiwid3giLCJsaXN0MSIsImxpc3QyIiwibGlzdDMiLCJsaXN0NCIsIm51bXR3byIsImNoYW5nZURhdGEiLCJidG5jb250dHdvIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQUlBLFlBQWFDLFFBQVEsMEJBQVIsQ0FBakI7QUFDQSxJQUFJQyxRQUFTRCxRQUFRLHFCQUFSLENBQWI7QUFDQSxJQUFJRSxRQUFTRixRQUFRLHNCQUFSLENBQWI7QUFDQSxJQUFJRyxNQUFNQyxRQUFWOztBQVVFQyxVQUFLO0FBQ0hDLGVBQU0sRUFESDtBQUVIQyxlQUFNLElBRkg7QUFHSEMsa0JBQVMsQ0FITjtBQUlIQyxrQkFBUyxFQUpOO0FBS0hDLGlCQUFRO0FBTEwsSzs7QUFRTEMsWUFBTyxrQkFBVTtBQUNmUixZQUFJUyxnQkFBSjtBQUNBLFlBQUlDLE9BQU8sSUFBSUMsSUFBSixFQUFYO0FBQ0E7QUFDQSxZQUFJQyxRQUFRLElBQVo7QUFDQSxZQUFJQyxPQUFPYixJQUFJYyxVQUFKLENBQWVDLElBQTFCO0FBQ0FILGNBQU1JLE9BQU4sQ0FBYyxFQUFDSCxNQUFLQSxJQUFOLEVBQVdJLEtBQUlqQixJQUFJYyxVQUFKLENBQWVJLE1BQTlCLEVBQWQ7QUFDQXBCLGNBQU1xQixVQUFOLENBQWlCTixLQUFLTyxNQUF0QixFQUE2QixDQUE3QixFQUErQixHQUEvQixFQUFtQyxJQUFuQyxFQUF3Q0MsVUFBeEM7QUFDQSxpQkFBU0EsVUFBVCxDQUFvQm5CLElBQXBCLEVBQTBCb0IsU0FBMUIsRUFBb0M7QUFDaEMsZ0JBQUlDLFNBQVNyQixLQUFLQSxJQUFsQjtBQUNDVSxrQkFBTVksUUFBTixDQUFlRCxNQUFmLEVBQXNCLENBQXRCO0FBQ0o7O0FBRUF6QixjQUFNMkIsWUFBTixDQUFtQixJQUFuQixFQUF3QkMsV0FBeEI7QUFDRyxpQkFBU0EsV0FBVCxDQUFxQnhCLElBQXJCLEVBQTJCb0IsU0FBM0IsRUFBcUM7QUFDbEN0QixnQkFBSWMsVUFBSixDQUFlYSxRQUFmLEdBQTBCekIsS0FBS0EsSUFBL0I7QUFDRjtBQUNOLEs7O0FBRUQwQixZQUFPLGtCQUFVO0FBQ2YsWUFBSWhCLFFBQVEsSUFBWjtBQUNBLFlBQUlDLE9BQU9iLElBQUljLFVBQUosQ0FBZUMsSUFBMUI7QUFDQUgsY0FBTUksT0FBTixDQUFjLEVBQUNILE1BQUtBLElBQU4sRUFBZDtBQUNBZixjQUFNcUIsVUFBTixDQUFpQixLQUFLakIsSUFBTCxDQUFVVyxJQUFWLENBQWVPLE1BQWhDLEVBQXVDLENBQXZDLEVBQXlDLEdBQXpDLEVBQTZDLElBQTdDLEVBQWtEQyxVQUFsRDtBQUNBLGlCQUFTQSxVQUFULENBQW9CbkIsSUFBcEIsRUFBMEJvQixTQUExQixFQUFvQztBQUM1QixnQkFBSUMsU0FBU3JCLEtBQUtBLElBQWxCO0FBQ0NVLGtCQUFNWSxRQUFOLENBQWVELE1BQWYsRUFBc0IsQ0FBdEI7QUFDUjtBQUNGLEs7O0FBRURDLGNBQVMsa0JBQVNELE1BQVQsRUFBZ0JNLENBQWhCLEVBQWtCO0FBQU07QUFDL0IsWUFBSWpCLFFBQVEsSUFBWjtBQUNBLFlBQUdXLFVBQVVPLFNBQWIsRUFBdUI7QUFBSTtBQUFKLGdCQUNWQyxPQURVLEdBQ25CLFNBQVNBLE9BQVQsQ0FBaUJDLElBQWpCLEVBQXNCO0FBQ2QsdUJBQU8sVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFDaEIsd0JBQUlDLFNBQVNGLEVBQUVELElBQUYsQ0FBYjtBQUNBLHdCQUFJSSxTQUFTRixFQUFFRixJQUFGLENBQWI7QUFDQSwyQkFBT0csU0FBU0MsTUFBaEI7QUFDSixpQkFKQTtBQUtQLGFBUGtCOztBQVFuQixnQkFBSUMsS0FBS2QsT0FBT2UsSUFBUCxDQUFZUCxRQUFRLEtBQVIsQ0FBWixDQUFUO0FBQ0EsZ0JBQUdGLEtBQUssQ0FBUixFQUFVO0FBQ04sb0JBQUlVLFFBQVFGLEdBQUcsQ0FBSCxDQUFaO0FBQ0F6QixzQkFBTUksT0FBTixDQUFjLEVBQUNiLE9BQU1rQyxFQUFQLEVBQVU5QixTQUFRZ0MsS0FBbEIsRUFBZDtBQUNBM0Isc0JBQU00QixPQUFOLENBQWNELE1BQU1FLFFBQXBCLEVBQTZCLENBQTdCO0FBQ0gsYUFKRCxNQUlLO0FBQ0Esb0JBQUdKLEdBQUdLLE1BQUgsSUFBYSxDQUFoQixFQUFrQjtBQUFHO0FBQ2Q5QiwwQkFBTUksT0FBTixDQUFjLEVBQUNULFNBQVE4QixHQUFHLENBQUgsQ0FBVCxFQUFlbEMsT0FBTWtDLEVBQXJCLEVBQXdCaEMsVUFBUyxDQUFqQyxFQUFkO0FBQ0FPLDBCQUFNNEIsT0FBTixDQUFjSCxHQUFHLENBQUgsRUFBTUksUUFBcEIsRUFBNkIsQ0FBN0I7QUFDSixpQkFISCxNQUdPO0FBQ0RFLDRCQUFRQyxHQUFSLENBQVlQLEVBQVosRUFBZSxJQUFmO0FBQ0N6QiwwQkFBTUksT0FBTixDQUFjLEVBQUNiLE9BQU1rQyxFQUFQLEVBQWQ7QUFDQU0sNEJBQVFDLEdBQVIsQ0FBWTVDLElBQUljLFVBQUosQ0FBZStCLFVBQWYsQ0FBMEJDLFNBQXRDLEVBQWdELFNBQWhEO0FBQ0Esd0JBQUc5QyxJQUFJYyxVQUFKLENBQWUrQixVQUFmLENBQTBCQyxTQUExQixJQUF1QyxFQUF2QyxJQUEyQzlDLElBQUljLFVBQUosQ0FBZStCLFVBQWYsQ0FBMEJDLFNBQTFCLElBQXVDaEIsU0FBckYsRUFBK0Y7QUFDM0YsNEJBQUlpQixXQUFVQyxTQUFTaEQsSUFBSWMsVUFBSixDQUFlK0IsVUFBZixDQUEwQkMsU0FBbkMsQ0FBZDtBQUNBLDRCQUFHQyxZQUFZVixHQUFHSyxNQUFsQixFQUF5QjtBQUNwQks7QUFDSjtBQUNESixnQ0FBUUMsR0FBUixDQUFZUCxHQUFHVSxRQUFILENBQVosRUFBeUIsY0FBekI7QUFDRm5DLDhCQUFNSSxPQUFOLENBQWMsRUFBQ1QsU0FBUThCLEdBQUdVLFFBQUgsQ0FBVCxFQUFzQjFDLFVBQVMwQyxRQUEvQixFQUFkO0FBQ0FuQyw4QkFBTTRCLE9BQU4sQ0FBY0gsR0FBR1UsUUFBSCxFQUFhRSxHQUEzQixFQUErQixDQUEvQjtBQUNEO0FBQ0Qsd0JBQUlqRCxJQUFJYyxVQUFKLENBQWUrQixVQUFmLElBQTZCZixTQUE3QixJQUF3QzlCLElBQUljLFVBQUosQ0FBZStCLFVBQWYsQ0FBMEJLLEtBQTFCLElBQW1DLElBQTNFLElBQWlGbEQsSUFBSWMsVUFBSixDQUFlK0IsVUFBZixJQUE2QixFQUFsSCxFQUFxSDs7QUFFakgsNEJBQUlNLFVBQVVuRCxJQUFJYyxVQUFKLENBQWUrQixVQUE3QjtBQUNBakMsOEJBQU13QyxPQUFOLENBQWNELE9BQWQsRUFBc0IsQ0FBdEI7QUFDSDtBQUNMO0FBQ1A7QUFDSixTQXJDRCxNQXFDSztBQUFHO0FBQ0p2QyxrQkFBTUksT0FBTixDQUFjLEVBQUNULFNBQVEsRUFBVCxFQUFZOEMsTUFBSyxFQUFqQixFQUFvQmxELE9BQU0sRUFBMUIsRUFBZDtBQUNIO0FBQ0YsSzs7QUFFRGlELGFBQVEsaUJBQVNFLENBQVQsRUFBV0MsRUFBWCxFQUFjO0FBQUc7QUFDM0I7QUFDRSxZQUFJQyxhQUFKO0FBQ0EsWUFBSUMsWUFBSjtBQUNBLFlBQUlDLFdBQUo7QUFDQTFELFlBQUljLFVBQUosQ0FBZStCLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDLEVBQXRDO0FBQ0UsWUFBR1MsTUFBTSxDQUFULEVBQVc7QUFDUEMsbUJBQU9GLENBQVA7QUFDQSxpQkFBS3RDLE9BQUwsQ0FBYSxFQUFDWCxVQUFTTCxJQUFJYyxVQUFKLENBQWUrQixVQUFmLENBQTBCYyxLQUFwQyxFQUEwQ3BELFNBQVFpRCxJQUFsRCxFQUFiO0FBQ0EsaUJBQUtoQixPQUFMLENBQWF4QyxJQUFJYyxVQUFKLENBQWUrQixVQUFmLENBQTBCSSxHQUF2QyxFQUEyQyxDQUEzQztBQUNILFNBSkQsTUFJSztBQUNETyxtQkFBT0YsRUFBRU0sYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEdBQS9CO0FBQ0FMLGtCQUFNRCxLQUFLTyxLQUFMLENBQVcsR0FBWCxDQUFOO0FBQ0FMLGlCQUFLLEVBQUNNLE1BQUtQLElBQUksQ0FBSixDQUFOLEVBQWFRLE1BQUtSLElBQUksQ0FBSixDQUFsQixFQUF5QlMsV0FBVVQsSUFBSSxDQUFKLENBQW5DLEVBQTBDVSxXQUFVVixJQUFJLENBQUosQ0FBcEQsRUFBMkRXLE1BQUtYLElBQUksQ0FBSixDQUFoRSxFQUF1RVksU0FBUVosSUFBSSxDQUFKLENBQS9FLEVBQXNGUixLQUFJUSxJQUFJLENBQUosQ0FBMUYsRUFBTDtBQUNBekQsZ0JBQUljLFVBQUosQ0FBZXdELFNBQWYsR0FBMkJaLEVBQTNCO0FBQ0EsaUJBQUsxQyxPQUFMLENBQWEsRUFBQ1gsVUFBU29ELElBQUksQ0FBSixDQUFWLEVBQWlCbEQsU0FBUW1ELEVBQXpCLEVBQWI7QUFDQSxpQkFBS2xCLE9BQUwsQ0FBYWlCLElBQUksQ0FBSixDQUFiLEVBQW9CLENBQXBCO0FBQ0g7QUFDRixLOztBQUVEYyxlQUFVLHFCQUFVO0FBQVU7QUFDOUJ2RSxZQUFJYyxVQUFKLENBQWUrQixVQUFmLENBQTBCQyxTQUExQixHQUFzQyxFQUF0QztBQUNJLFlBQUcsS0FBSzVDLElBQUwsQ0FBVUMsS0FBVixJQUFtQixFQUF0QixFQUF5QjtBQUNuQixnQkFBSXFFLFFBQVEsS0FBS3RFLElBQUwsQ0FBVUMsS0FBdEI7QUFDQSxnQkFBSThDLE1BQU0sS0FBSy9DLElBQUwsQ0FBVUssT0FBVixDQUFrQjBDLEdBQTVCO0FBQ0EsaUJBQUksSUFBSXdCLElBQUUsQ0FBVixFQUFZQSxJQUFFRCxNQUFNOUIsTUFBcEIsRUFBMkIrQixHQUEzQixFQUErQjtBQUMzQixvQkFBR0QsTUFBTUMsQ0FBTixFQUFTeEIsR0FBVCxJQUFnQkEsR0FBbkIsRUFBdUI7QUFDbkJqRCx3QkFBSWMsVUFBSixDQUFlNEQsT0FBZixHQUF5QkYsTUFBTUMsQ0FBTixDQUF6QixDQURtQixDQUNpQjtBQUNwQztBQUNIO0FBQ0o7O0FBRUQ7QUFDQTtBQUNBOUIsb0JBQVFDLEdBQVIsQ0FBWSxLQUFLMUMsSUFBTCxDQUFVRyxRQUF0QixFQUErQixPQUEvQjtBQUNBLGdCQUFJc0UsUUFBTSxFQUFDMUIsS0FBSUEsR0FBTCxFQUFTVSxPQUFNLEtBQUt6RCxJQUFMLENBQVVHLFFBQXpCLEVBQVY7QUFDQVQsc0JBQVVnRixVQUFWLENBQXFCLG9CQUFyQixFQUEwQ0QsS0FBMUM7QUFDTCxTQWZELE1BZUs7QUFDRCxtQkFBTyxLQUFQO0FBQ0g7QUFFSixLOztBQUVIO0FBQ0VuQyxhQUFRLGlCQUFTcUMsS0FBVCxFQUFlQyxFQUFmLEVBQWtCO0FBQ3ZCLFlBQUdBLE1BQU0sQ0FBVCxFQUFXO0FBQ1QsZ0JBQUlDLFNBQVMsS0FBSzdFLElBQUwsQ0FBVUMsS0FBdkIsQ0FEUyxDQUNvQjtBQUM3QixpQkFBSSxJQUFJNkUsSUFBRSxDQUFWLEVBQVlBLElBQUVELE9BQU9yQyxNQUFyQixFQUE0QnNDLEdBQTVCLEVBQWdDO0FBQzdCLG9CQUFHRCxPQUFPQyxDQUFQLEVBQVUvQixHQUFWLElBQWlCNEIsS0FBcEIsRUFBMEI7QUFDdEIsd0JBQUdFLE9BQU9DLENBQVAsRUFBVXZDLFFBQVYsSUFBc0IsRUFBekIsRUFBNEI7QUFDcEIsNkJBQUksSUFBSWdDLElBQUUsQ0FBVixFQUFZQSxJQUFFTSxPQUFPQyxDQUFQLEVBQVV2QyxRQUFWLENBQW1CQyxNQUFqQyxFQUF3QytCLEdBQXhDLEVBQTRDO0FBQ3hDLGdDQUFHTSxPQUFPQyxDQUFQLEVBQVV2QyxRQUFWLENBQW1CZ0MsQ0FBbkIsRUFBc0JRLFVBQXRCLElBQW9DLEVBQXZDLEVBQTBDO0FBQ3hDLHFDQUFLakUsT0FBTCxDQUFhLEVBQUNxQyxNQUFLMEIsT0FBT0MsQ0FBUCxFQUFVdkMsUUFBVixDQUFtQmdDLENBQW5CLEVBQXNCUyxPQUE1QixFQUFiO0FBQ0w7QUFDSjtBQUNKLHFCQU5ELE1BTUs7QUFDRiw2QkFBS2xFLE9BQUwsQ0FBYSxFQUFDcUMsTUFBSyxFQUFOLEVBQWI7QUFDRjtBQUNKO0FBQ0g7QUFDRixTQWZELE1BZUs7QUFDSCxpQkFBSSxJQUFJb0IsSUFBRSxDQUFWLEVBQVlBLElBQUVJLE1BQU1uQyxNQUFwQixFQUEyQitCLEdBQTNCLEVBQStCO0FBQ2xCLG9CQUFHSSxNQUFNSixDQUFOLEVBQVNRLFVBQVQsSUFBdUIsRUFBMUIsRUFBNkI7QUFDM0IseUJBQUtqRSxPQUFMLENBQWEsRUFBQ3FDLE1BQUt3QixNQUFNSixDQUFOLEVBQVNTLE9BQWYsRUFBYjtBQUNMO0FBQ0o7QUFDUDtBQUVILEs7QUFDREMsdUJBQW1CLDJCQUFVN0IsQ0FBVixFQUFhO0FBQzVCLFlBQUk4QixPQUFPLEtBQUtsRixJQUFMLENBQVVLLE9BQVYsQ0FBa0IwQyxHQUE3QjtBQUNBLFlBQUlvQyxTQUFTLEtBQUtuRixJQUFMLENBQVVXLElBQVYsQ0FBZU8sTUFBNUI7QUFDQSxZQUFJNkMsT0FBT2xFLE1BQU11RixPQUFOLENBQWMsTUFBZCxDQUFYO0FBQ0EsWUFBSTVFLE9BQU9WLElBQUljLFVBQUosQ0FBZUksTUFBZixHQUFzQixvQkFBdEIsR0FBMkNrRSxJQUEzQyxHQUFnRCxPQUFoRCxHQUF3RCxJQUFJekUsSUFBSixHQUFXNEUsT0FBWCxFQUFuRTtBQUNFLGVBQU87QUFDSEMsbUJBQU8sVUFBUXZCLEtBQUt3QixRQUFiLEdBQXNCLFdBRDFCO0FBRUg7QUFDQUMsc0JBQVNoRixJQUhOO0FBSUhpRixrQkFBTSwrQkFBNkJQLElBSmhDLEVBSXFDO0FBQ3BDUSxxQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2xCbEQsd0JBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CaUQsR0FBcEI7QUFDQS9GLHNCQUFNZ0csYUFBTixDQUFvQlQsTUFBcEIsRUFBMkJELElBQTNCLEVBQWdDLElBQWhDLEVBQXFDVyxTQUFyQztBQUNFLHlCQUFTQSxTQUFULENBQW1CN0YsSUFBbkIsRUFBeUJvQixTQUF6QixFQUFtQyxDQUVsQztBQUNGLGFBWEY7QUFZQzBFLGtCQUFNLGNBQUNILEdBQUQsRUFBUztBQUNmbEQsd0JBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CaUQsR0FBcEI7QUFDQztBQWRGLFNBQVA7QUFnQkgsSztBQUNISSxXQUFNLGlCQUFVO0FBQ2QsWUFBSXRCLFFBQU0sRUFBQ3VCLE1BQUssQ0FBTixFQUFWO0FBQ0V0RyxrQkFBVWdGLFVBQVYsQ0FBcUIsa0JBQXJCLEVBQXdDRCxLQUF4QztBQUNILEs7QUFDRHdCLFlBQU8sa0JBQVU7QUFDYkMsV0FBR3hCLFVBQUgsQ0FBYztBQUNkM0QsaUJBQUk7QUFEVSxTQUFkO0FBR0gsSztBQUNEb0YsV0FBTSxpQkFBVTtBQUNaLFlBQUkxQixRQUFNLEVBQUN1QixNQUFLLENBQU4sRUFBVjtBQUNBdEcsa0JBQVVnRixVQUFWLENBQXFCLDBCQUFyQixFQUFnREQsS0FBaEQ7QUFDSCxLO0FBQ0QyQixXQUFNLGlCQUFVO0FBQ2IsWUFBSTNCLFFBQU0sRUFBQ3VCLE1BQUssQ0FBTixFQUFWO0FBQ0N0RyxrQkFBVWdGLFVBQVYsQ0FBcUIsMEJBQXJCLEVBQWdERCxLQUFoRDtBQUNILEs7QUFDRDRCLFdBQU0saUJBQVU7QUFDYixZQUFJNUIsUUFBTSxFQUFDdUIsTUFBSyxDQUFOLEVBQVY7QUFDQ3RHLGtCQUFVZ0YsVUFBVixDQUFxQiwwQkFBckIsRUFBZ0RELEtBQWhEO0FBQ0gsSztBQUNENkIsV0FBTSxpQkFBVTtBQUNiLFlBQUk3QixRQUFNLEVBQUN1QixNQUFLLENBQU4sRUFBVjtBQUNDdEcsa0JBQVVnRixVQUFWLENBQXFCLDBCQUFyQixFQUFnREQsS0FBaEQ7QUFDSCxLO0FBQ0Q4QixZQUFPLGtCQUFVO0FBQ2Z6RyxZQUFJUyxnQkFBSjtBQUNELEs7QUFDRGlHLGdCQUFXLHNCQUFVO0FBQ2hCLGFBQUtsRyxNQUFMLEdBRGdCLENBQ0Y7QUFDakIsSztBQUNEbUcsZ0JBQVcsc0JBQVU7QUFDaEIsYUFBS1YsS0FBTDtBQUNKIiwiZmlsZSI6Im5hbWVDYXIud3hwIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG5hdmlnYXRvciA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvbmF2aWdhdG9yLmpzXCIpXG52YXIgZGFhdHkgPSAgcmVxdWlyZShcIi4uLy4uL3V0aWxzL2FwaTIuanNcIilcbnZhciBjYWNoZSA9ICByZXF1aXJlKFwiLi4vLi4vdXRpbHMvY2FjaGUuanNcIilcbnZhciBhcHAgPSBnZXRBcHAoKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOWQjeeJhycsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgJ3d4Yy1saXN0JzogJ0BtaW51aS93eGMtbGlzdCcsXG4gICAgICAgJ3d4Yy1sb2FkbW9yZSc6ICdAbWludWkvd3hjLWxvYWRtb3JlJyxcbiAgICAvLyAgICAnY29udGVidC1tb2RlJzonLi4vY29udGVudG1vZGUvY29udGVudG1vZGUnXG4gICAgfVxuICB9LFxuICBkYXRhOntcbiAgICBkYXRhczpcIlwiLFxuICAgIHN0dHJlOnRydWUsXG4gICAgbmV3Q2xhc3M6MCxcbiAgICBhY3RvaW5mbzonJyxcbiAgICBhcHBnbG9rOicnXG4gIH0sXG5cbiAgb25Mb2FkOmZ1bmN0aW9uKCl7XG4gICAgYXBwLmNoZWNrTG9naW5TdGF0dXMoKTtcbiAgICB2YXIgdGltZSA9IG5ldyBEYXRlKClcbiAgICAvLyBjb25zb2xlLmxvZyhhcHAuZ2xvYmFsRGF0YS5iY2hhZ2UsNjY2NjYpXG4gICAgdmFyIHRoZXJ5ID0gdGhpcztcbiAgICB2YXIgdWVzZSA9IGFwcC5nbG9iYWxEYXRhLnVzZXI7XG4gICAgdGhlcnkuc2V0RGF0YSh7dWVzZTp1ZXNlLHVybDphcHAuZ2xvYmFsRGF0YS5pbWdVcmx9KVxuICAgIGRhYXR5Lm15Q2FyZExpc3QodWVzZS51c2VySWQsMCwxMDAsbnVsbCxzdWNjZXNzRmF5KVxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkoZGF0YSwgc291cmNlT2JqKXtcbiAgICAgICAgdmFyIGZzdGF0YSA9IGRhdGEuZGF0YVxuICAgICAgICAgdGhlcnkubGlzdHNvZnQoZnN0YXRhLDEpXG4gICAgfVxuXG4gICAgIGRhYXR5LmluZHVzdHJ5TGlzdChudWxsLHN1Y2Nlc3NGYWxzKVxuICAgICAgICBmdW5jdGlvbiBzdWNjZXNzRmFscyhkYXRhLCBzb3VyY2VPYmope1xuICAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5zdHJ5bGlzdCA9IGRhdGEuZGF0YTtcbiAgICAgICAgfVxuICB9LFxuXG4gIG9uU2hvdzpmdW5jdGlvbigpe1xuICAgIHZhciB0aGVyeSA9IHRoaXM7XG4gICAgdmFyIHVlc2UgPSBhcHAuZ2xvYmFsRGF0YS51c2VyO1xuICAgIHRoZXJ5LnNldERhdGEoe3Vlc2U6dWVzZX0pXG4gICAgZGFhdHkubXlDYXJkTGlzdCh0aGlzLmRhdGEudWVzZS51c2VySWQsMCwxMDAsbnVsbCxzdWNjZXNzRmF5KVxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYXkoZGF0YSwgc291cmNlT2JqKXtcbiAgICAgICAgICAgIHZhciBmc3RhdGEgPSBkYXRhLmRhdGFcbiAgICAgICAgICAgICB0aGVyeS5saXN0c29mdChmc3RhdGEsMilcbiAgICB9XG4gIH0sXG4gIFxuICBsaXN0c29mdDpmdW5jdGlvbihmc3RhdGEsbSl7ICAgICAvL+aOkuW6jyAgbT0x5pe25Li6b25sb2Fk5Yqg6L29IG09MuaXtuS4um9uc2hvd+WKoOi9vVxuICAgIHZhciB0aGVyeSA9IHRoaXMgXG4gICAgaWYoZnN0YXRhICE9IHVuZGVmaW5lZCl7ICAgLy/mo4Dmn6XmmK/lkKblrZjmnInljaHniYcg5b2TZnN0YXRhIT11bmRlZmluZOaXtuivtOaYjuWtmOWcqOWNoeeJhyDlkKbliJnkuI3lrZjlnKjljaHniYdcbiAgICAgICAgZnVuY3Rpb24gY29tcGFyZShhanVvKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oYSxiKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlMSA9IGFbYWp1b107XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZTIgPSBiW2FqdW9dO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUxIC0gdmFsdWUyO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB0eSA9IGZzdGF0YS5zb3J0KGNvbXBhcmUoJ3VpZCcpKSBcbiAgICAgICAgaWYobSA9PSAxKXtcbiAgICAgICAgICAgIHZhciBkYWR0eSA9IHR5WzBdXG4gICAgICAgICAgICB0aGVyeS5zZXREYXRhKHtkYXRhczp0eSxhcHBnbG9rOmRhZHR5fSlcbiAgICAgICAgICAgIHRoZXJ5LnBlcG9sbWcoZGFkdHkuZmlsZUxpc3QsMSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgaWYodHkubGVuZ3RoID09IDEpeyAgLy8gICAgXG4gICAgICAgICAgICAgICAgICAgIHRoZXJ5LnNldERhdGEoe2FwcGdsb2s6dHlbMF0sZGF0YXM6dHksbmV3Q2xhc3M6MH0pXG4gICAgICAgICAgICAgICAgICAgIHRoZXJ5LnBlcG9sbWcodHlbMF0uZmlsZUxpc3QsMSlcbiAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHR5LFwidHlcIilcbiAgICAgICAgICAgICAgICAgICAgdGhlcnkuc2V0RGF0YSh7ZGF0YXM6dHl9KVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcHAuZ2xvYmFsRGF0YS5uZXdEYXRhT2JqLnN0ZWFpbmRleCw1NTY1NTY2NjYpXG4gICAgICAgICAgICAgICAgICAgIGlmKGFwcC5nbG9iYWxEYXRhLm5ld0RhdGFPYmouc3RlYWluZGV4ICE9ICcnJiZhcHAuZ2xvYmFsRGF0YS5uZXdEYXRhT2JqLnN0ZWFpbmRleCAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld2luZGV4ID1wYXJzZUludChhcHAuZ2xvYmFsRGF0YS5uZXdEYXRhT2JqLnN0ZWFpbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ld2luZGV4ID09IHR5Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld2luZGV4LS1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHR5W25ld2luZGV4XSw5OTk5OTk5OTkxMTExMSlcbiAgICAgICAgICAgICAgICAgICAgICB0aGVyeS5zZXREYXRhKHthcHBnbG9rOnR5W25ld2luZGV4XSxuZXdDbGFzczpuZXdpbmRleH0pXG4gICAgICAgICAgICAgICAgICAgICAgdGhlcnkucGVwb2xtZyh0eVtuZXdpbmRleF0udWlkLDIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoIGFwcC5nbG9iYWxEYXRhLm5ld0RhdGFPYmogIT0gdW5kZWZpbmVkJiZhcHAuZ2xvYmFsRGF0YS5uZXdEYXRhT2JqLnN0YXRlID09IHRydWUmJmFwcC5nbG9iYWxEYXRhLm5ld0RhdGFPYmogIT0gJycpe1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdldmVjID0gYXBwLmdsb2JhbERhdGEubmV3RGF0YU9ialxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlcnkuY29tY2VueShuZXdldmVjLDIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1lbHNleyAgLy/lvZPkuI3lrZjlnKjljaHniYfml7blsIblvZPliY1kYXRh5YaF55qEZGF0YWFwcGdsb2ssaW1ncyxkYXRhc+a4heepuu+8iOWmguaenOS4jea4heepuuS8muWvvOiHtOWIoOmZpOacgOWQjuacieS4gOW8oOWNoeeJh+WPquaciXRhYmxl5Yi35paw5LqG77yM5L2G5ZCN54mH5LiK5L+h5oGv6L+Y5Lya5Y+WZGF0YeeahOaVsOaNru+8iVxuICAgICAgICB0aGVyeS5zZXREYXRhKHthcHBnbG9rOicnLGltZ3M6JycsZGF0YXM6Jyd9KSAgXG4gICAgfVxuICB9LFxuXG4gIGNvbWNlbnk6ZnVuY3Rpb24oZSxueSl7ICAvL+eCueWHu3RhYuagj+WNoeeJhyBl5YiG5Yir5Luj6KGo5Li65LqM56eN54q25oCBIOW9k255PTLml7Zl5Y+W5b6X5YC85Li657yW6L6R5ZCO5pS55Y+Y55qE5paw57yT5a2YbmV3RGF0YU9iauatpOaXtuaYr+e8lui+kemhtemdouWbnuWIsOacrOmhtemdouiHquWKqOaJp+ihjOeahGNvbWNlbnnngrnlh7vkuovku7bvvIzlkKbliJnku6PooajnlKjmiLfoh6rlt7Hngrnlh7vmi7/ljrvnmoTlgLzlubbpnZ7nvJPlrZjnmoTlgLxcbi8vICAgY29uc29sZS5sb2coZSxueSlcbiAgbGV0IGRleXM7XG4gIGxldCBzZGQ7XG4gIGxldCB0ZztcbiAgYXBwLmdsb2JhbERhdGEubmV3RGF0YU9iai5zdGVhaW5kZXggPSAnJ1xuICAgIGlmKG55ID09IDIpe1xuICAgICAgICBkZXlzID0gZVxuICAgICAgICB0aGlzLnNldERhdGEoe25ld0NsYXNzOmFwcC5nbG9iYWxEYXRhLm5ld0RhdGFPYmouaW5kZXgsYXBwZ2xvazpkZXlzfSlcbiAgICAgICAgdGhpcy5wZXBvbG1nKGFwcC5nbG9iYWxEYXRhLm5ld0RhdGFPYmoudWlkLDIpXG4gICAgfWVsc2V7XG4gICAgICAgIGRleXMgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5kZXlcbiAgICAgICAgc2RkID0gZGV5cy5zcGxpdCgnLScpXG4gICAgICAgIHRnID0ge2lkZXg6c2RkWzBdLG5hbWU6c2RkWzFdLGNhcmRUaXRsZTpzZGRbMl0sY2FyZFBob25lOnNkZFszXSx3eE5vOnNkZFs0XSxjb21wYW55OnNkZFs1XSx1aWQ6c2RkWzddfVxuICAgICAgICBhcHAuZ2xvYmFsRGF0YS5hcHBnb2xibGUgPSB0Z1xuICAgICAgICB0aGlzLnNldERhdGEoe25ld0NsYXNzOnNkZFswXSxhcHBnbG9rOnRnfSlcbiAgICAgICAgdGhpcy5wZXBvbG1nKHNkZFs3XSwyKVxuICAgIH1cbiAgfSxcblxuICBpc2NvcG9tZXQ6ZnVuY3Rpb24oKXsgICAgICAgICAvL+eCueWHu+WNoeeJh1xuICBhcHAuZ2xvYmFsRGF0YS5uZXdEYXRhT2JqLnN0ZWFpbmRleCA9ICcnXG4gICAgICBpZih0aGlzLmRhdGEuZGF0YXMgIT0gXCJcIil7XG4gICAgICAgICAgICB2YXIgZGF0eXMgPSB0aGlzLmRhdGEuZGF0YXNcbiAgICAgICAgICAgIHZhciB1aWQgPSB0aGlzLmRhdGEuYXBwZ2xvay51aWRcbiAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8ZGF0eXMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgaWYoZGF0eXNbaV0udWlkID09IHVpZCl7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLmRhdGFPYmogPSBkYXR5c1tpXSAgIC8v54K55Ye75pe257yT5a2Y6KKr54K55Ye75Y2h54mH55qE5L+h5oGvIOWcqOe8lui+kemhtemdouaYr+WPluivpee8k+WtmCAg5ZCN54mH6K+m5oOF5rKh5Y+W6K+l57yT5a2Y6ICM5piv55So5o6l5Y+j5piv5Zug5Li65Y+v6IO95LuO5YiG5Lqr6L+b5YWl5a+86Ie05peg5rOV5Y+W5Yiw57yT5a2YXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB2YXIgaW1nc3kgPSB0aGlzLmRhdGEuaW1nc1xuICAgICAgICAgICAgLy8gYXBwLmdsb2JhbERhdGEubmV3RGF0YU9iaiA9ICcnXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEubmV3Q2xhc3MsMTExMTExMSlcbiAgICAgICAgICAgIHZhciBwYXJhbT17dWlkOnVpZCxpbmRleDp0aGlzLmRhdGEubmV3Q2xhc3N9O1xuICAgICAgICAgICAgbmF2aWdhdG9yLm5hdmlnYXRlVG8oJy4uL2RldGFpbHMvZGV0YWlscycscGFyYW0pO1xuICAgICAgfWVsc2V7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gIFxuICB9LFxuICBcbi8vbnXnrYnkuo4x5pe2ZGFzdHPmmK/miYDmnInliJfooajmlbDmja4g562J5LqOMuaXtmRhc3Rz5piv6KKr54K55Ye755qEdWlkICDkuLvopoHkuLrliJ3lp4vljJbml7YobnU9MSnmi7/lh7rnlKjmiLflpLTlg48g54K55Ye75pe2bnU9MiDpgJrov4d1aWTlkI7lgZrlr7nmr5RcbiAgcGVwb2xtZzpmdW5jdGlvbihkYXN0cyxudSl7ICAgXG4gICAgIGlmKG51ID09IDIpe1xuICAgICAgIHZhciBkYWpzb24gPSB0aGlzLmRhdGEuZGF0YXMgLy/miYDmnInmlbDmja7liJfooahcbiAgICAgICBmb3IodmFyIGs9MDtrPGRhanNvbi5sZW5ndGg7aysrKXtcbiAgICAgICAgICBpZihkYWpzb25ba10udWlkID09IGRhc3RzKXtcbiAgICAgICAgICAgICAgaWYoZGFqc29uW2tdLmZpbGVMaXN0ICE9ICcnKXtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPGRhanNvbltrXS5maWxlTGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGFqc29uW2tdLmZpbGVMaXN0W2ldLnNjb3VyZVR5cGUgPT0gMTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7aW1nczpkYWpzb25ba10uZmlsZUxpc3RbaV0uZmlsZVVybH0pXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtpbWdzOicnfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICB9XG4gICAgIH1lbHNle1xuICAgICAgIGZvcih2YXIgaT0wO2k8ZGFzdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGRhc3RzW2ldLnNjb3VyZVR5cGUgPT0gMTEpe1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7aW1nczpkYXN0c1tpXS5maWxlVXJsfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgIH1cbiAgICAgXG4gIH0sXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIHVpZHMgPSB0aGlzLmRhdGEuYXBwZ2xvay51aWRcbiAgICAgIHZhciB1c2VyaWQgPSB0aGlzLmRhdGEudWVzZS51c2VySWRcbiAgICAgIHZhciBuYW1lID0gY2FjaGUuZ2V0U3luYyhcInVzZXJcIilcbiAgICAgIHZhciB0aW1lID0gYXBwLmdsb2JhbERhdGEuaW1nVXJsKycvdXBsb2FkL2NhcmQvdXNlci8nK3VpZHMrJy5qcGc/JytuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGl0bGU6ICfov5nmmK/miJHnmoRbJytuYW1lLm5pY2tOYW1lKydd55S15a2Q5ZCN54mHLOacm+aDoOWtmCcsXG4gICAgICAgICAgICAvLyBkZXNjOiAn5YiG5Lqr6aG16Z2i55qE5YaF5a65JyxcbiAgICAgICAgICAgIGltYWdlVXJsOnRpbWUsXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvZGV0YWlscy9kZXRhaWxzP3VpZD0nK3VpZHMsLy8g6Lev5b6E77yM5Lyg6YCS5Y+C5pWw5Yiw5oyH5a6a6aG16Z2i44CCXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L2s5Y+R5oiQ5YqfXCIsIHJlcyk7XG4gICAgICAgICAgICAgICAgZGFhdHkub3BlcmF0aW9uTGlzdCh1c2VyaWQsdWlkcyxudWxsLHN1Y2Nlc3NGYSlcbiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3NGYShkYXRhLCBzb3VyY2VPYmope1xuXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLovazlj5HlpLHotKVcIiwgcmVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICBhZGRpZzpmdW5jdGlvbigpe1xuICAgIHZhciBwYXJhbT17dHlwZToyfTtcbiAgICAgIG5hdmlnYXRvci5uYXZpZ2F0ZVRvKCcuLi9lZGl0b3IvZWRpdG9yJyxwYXJhbSk7XG4gIH0sXG4gIGN2YXJseTpmdW5jdGlvbigpe1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6Jy4uL0J1c2luZXNzL0J1c2luZXNzJ1xuICAgIH0pXG4gIH0sXG4gIGxpc3QxOmZ1bmN0aW9uKCl7XG4gICAgICB2YXIgcGFyYW09e3R5cGU6MX07XG4gICAgICBuYXZpZ2F0b3IubmF2aWdhdGVUbygnLi4vQnVzaW5lc3MvQnVzaW5lc3NsaXN0JyxwYXJhbSk7XG4gIH0sXG4gIGxpc3QyOmZ1bmN0aW9uKCl7XG4gICAgIHZhciBwYXJhbT17dHlwZToyfTtcbiAgICAgIG5hdmlnYXRvci5uYXZpZ2F0ZVRvKCcuLi9CdXNpbmVzcy9CdXNpbmVzc2xpc3QnLHBhcmFtKTtcbiAgfSxcbiAgbGlzdDM6ZnVuY3Rpb24oKXtcbiAgICAgdmFyIHBhcmFtPXt0eXBlOjN9O1xuICAgICAgbmF2aWdhdG9yLm5hdmlnYXRlVG8oJy4uL0J1c2luZXNzL0J1c2luZXNzbGlzdCcscGFyYW0pO1xuICB9LFxuICBsaXN0NDpmdW5jdGlvbigpe1xuICAgICB2YXIgcGFyYW09e3R5cGU6NH07XG4gICAgICBuYXZpZ2F0b3IubmF2aWdhdGVUbygnLi4vQnVzaW5lc3MvQnVzaW5lc3NsaXN0JyxwYXJhbSk7XG4gIH0sXG4gIG51bXR3bzpmdW5jdGlvbigpe1xuICAgIGFwcC5jaGVja0xvZ2luU3RhdHVzKClcbiAgfSxcbiAgY2hhbmdlRGF0YTpmdW5jdGlvbigpe1xuICAgICAgIHRoaXMub25Mb2FkKCk7Ly/mnIDlpb3mmK/lj6rlhpnpnIDopoHliLfmlrDnmoTljLrln5/nmoTku6PnoIHvvIxvbmxvYWTkuZ/lj6/vvIzmlYjnjofkvY7vvIzmnInngrlsb3dcbiAgIH0sXG4gICBidG5jb250dHdvOmZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYWRkaWcoKVxuICAgfVxufSJdfQ==