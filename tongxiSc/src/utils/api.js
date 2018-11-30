
const indexUrls = require("../utils/request")

	// public final static int SUCCESS = 1; // 成功
	// public final static int WARN = 2; // 后端提醒
    //public final static int ERROR = 3; // 系统错误
    // public final static int TOKEN_OUT = 4; // 登录超时
    
// var StorageApi = 'http://122.152.206.172:8081/os/storage/create';
// 云平台上线时使用
var domainy = "https://www.tongxikj.com"
// var domain="https://www.tongxikj.com/my-security";//正式域名
var domain="https://www.tongxikj.com/test";//测试域名
var versionStr="/api/v1";
//获取小区数据
var sitelist = domain+ versionStr+"/estate/sitelist";  
//获取小区设备
var machineList = domain+ versionStr+"/estate/machineList";  
//获取洗车记录
var washList = domain+ versionStr+"/estate/washList";  
//登录
var logins = domain+ versionStr+"/estate/login"
//我的
var getUsers = domain+ versionStr+"/estate/getUser"
//小区
var sitelists = domain+ versionStr+"/estate/sitelist"
//机器
var machineLists = domain+ versionStr+"/estate/machineList"
//我的收益
var statistics = domain+ versionStr+"/estate/statistics"
//洗车用户
var washUsers = domain+ versionStr+"/estate/washUser"
//提现明细
var withdrawalsLists = domain+ versionStr+"/estate/withdrawalsList"
//提现记录
var addWithdrawals = domain+ versionStr+"/estate/addWithdrawals"
//资讯
var lists = domain+ versionStr+"/info/list"
//首页顶部列表
var taglists = domain+ versionStr+"/info/taglist"
//修改密码
var updatePasswords = domain+ versionStr+"/estate/updatePassword"

module.exports = {
    sitelist:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(sitelist, params, sourceObj, successFun, failFun, completeFun)
    },

    machineList:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(machineList, params, sourceObj, successFun, failFun, completeFun)
    },

    washList:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(washList, params, sourceObj, successFun, failFun, completeFun)
    },

    logins:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(logins, params, sourceObj, successFun, failFun, completeFun)
    },
    getUsers:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(getUsers, params, sourceObj, successFun, failFun, completeFun)
    },
    sitelists:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(sitelists, params, sourceObj, successFun, failFun, completeFun)
    },
    machineLists:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(machineLists, params, sourceObj, successFun, failFun, completeFun)
    },
    statistics:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(statistics, params, sourceObj, successFun, failFun, completeFun)
    },
    washUsers:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(washUsers, params, sourceObj, successFun, failFun, completeFun)
    },
    withdrawalsLists:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(withdrawalsLists, params, sourceObj, successFun, failFun, completeFun)
    },
    addWithdrawals:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(addWithdrawals, params, sourceObj, successFun, failFun, completeFun)
    },
    lists:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(lists, params, sourceObj, successFun, failFun, completeFun)
    },
    taglists:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(taglists, params, sourceObj, successFun, failFun, completeFun)
    },
    updatePasswords:function(params, sourceObj, successFun, failFun, completeFun){
        indexUrls.requestPostApi(updatePasswords, params, sourceObj, successFun, failFun, completeFun)
    },
    domain:domain,
    domainy:domainy
    // IndexUrl: IndexUrl + '', //首页数据接口
};



