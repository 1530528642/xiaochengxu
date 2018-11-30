"use strict";

var indexUrls = require("./request.js");
var tip = require("./tip.js");
var cache = require("./cache.js");
// public final static int SUCCESS = 1; // 成功
// public final static int WARN = 2; // 后端提醒
//public final static int ERROR = 3; // 系统错误
// public final static int TOKEN_OUT = 4; // 登录超时

var server = "https://www.tongxikj.com"; //生产
var test = "https://www.tongxikj.com/my"; //测试
var local = "http://localhost:8085"; //本地
var baseUrl = test;
var versionStr = "/api/v1";

/**
 * 图片地址前缀
 */
var baseImgUrl = "http://lele.tongxikj.com";

var getUser = baseUrl + versionStr + '/user/updateUser';

var failFun = function failFun(e) {
    console.log('接口调用失败', e);
};
var completeFun = function completeFun(e) {
    console.log('接口调用后执行成功', e);
};

/**
 * 标签列表
 * @param {*} tagType 1资讯标签
 * @param {*} tagStatus 1启用
 * @param {*} sourceObj 回调传参
 * @param {*} success 
 */
var taglist = function taglist(tagType, tagStatus, sourceObj) {
    var success = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    var url = baseUrl + versionStr + "/card/tagList";
    indexUrls.requestPostApi(url, { tagType: tagType, tagStatus: tagStatus }, sourceObj, success, failFun, completeFun);
};

/**
 * 行业列表
 * @param {*} sourceObj 回调传参
 * @param {*} success 
 */
var industryList = function industryList(sourceObj) {
    var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    var url = baseUrl + versionStr + "/card/industryList";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
};

/**
 * 
 * @param {*} tagCode 标签code
 * @param {*} productType  产品类型1:图文2:图片
 * @param {*} formUserId 登录用户(选填)
 * @param {*} toUserId 查看用户产品列表(选填，与formUserId相同时，为自己查看自己)
 * @param {*} limit 分页条数
 * @param {*} offset 分页起始页
 * @param {*} sourceObj 回调传参
 * @param {*} success 
 */
var prolist = function prolist(tagCode, productType, formUserId, toUserId, limit, offset, sourceObj) {
    var success = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : function () {};

    var url = baseUrl + versionStr + "/product/list";
    indexUrls.requestPostApi(url, {
        tagCode: tagCode, productType: productType, formUserId: formUserId, toUserId: toUserId,
        limit: limit, offset: offset
    }, sourceObj, success, failFun, completeFun);
};

/**
 * 添加分组
 * @param {*} groupName 组名
 * @param {*} userId 用户ID
 * @param {*} sourceObj 回调传参
 * @param {*} success 
 */
var addGroup = function addGroup(groupName, userId, sourceObj) {
    var success = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    var url = baseUrl + versionStr + "/card/addGroup";
    indexUrls.requestPostApi(url, { groupName: groupName, userId: userId }, sourceObj, success, failFun, completeFun);
};

/**
 * 修改组名
 * @param {*} uid 组标识
 * @param {*} groupName  组名
 * @param {*} userId 用户ID
 * @param {*} sourceObj 
 * @param {*} success 
 */
var updateGroup = function updateGroup(uid, groupName, userId, sourceObj) {
    var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    var url = baseUrl + versionStr + "/card/updateGroup";
    indexUrls.requestPostApi(url, { groupName: groupName, userId: userId, uid: uid }, sourceObj, success, failFun, completeFun);
};

/**
 * 删除分组
 * @param {*} uid  组标识
 * @param {*} userId  用户ID
 * @param {*} sourceObj 
 * @param {*} success 
 */
var delGroup = function delGroup(uid, userId, sourceObj) {
    var success = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    var url = baseUrl + versionStr + "/card/delGroup";
    indexUrls.requestPostApi(url, { userId: userId, uid: uid }, sourceObj, success, failFun, completeFun);
};

/**
 * 我的分组列表
 * @param {*} userId   用户ID
 * @param {*} sourceObj 
 * @param {*} success 
 */
var groupList = function groupList(userId, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/card/groupList";
    indexUrls.requestPostApi(url, { userId: userId }, sourceObj, success, failFun, completeFun);
};
/**
 * 我的名片列表
 * @param {*} userId   用户ID
 * @param {*} sourceObj 
 * @param {*} success 
 */
var myCardList = function myCardList(userId, sourceObj, offset, limit) {
    var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    var url = baseUrl + versionStr + "/card/myCardList";
    indexUrls.requestPostApi(url, { userId: userId }, sourceObj, success, failFun, completeFun);
};
/**
 * 删除我的名片
 * @param {*} userId   用户ID
 * @param {*} cardId   名片ID
 * @param {*} sourceObj 
 * @param {*} success 
 */
var delMyCard = function delMyCard(userId, cardId, sourceObj) {
    var success = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    var url = baseUrl + versionStr + "/card/delMyCard";
    indexUrls.requestPostApi(url, { userId: userId, cardId: cardId }, sourceObj, success, failFun, completeFun);
};
/**
 * 修改我的名片
 * @param {*} userId   用户ID
 * @param {*} cardId   名片ID
 * @param {*} name   名称
 * @param {*} cardPhone   名片电话
 * @param {*} cardTitle   名片职称
 * @param {*} company   公司名称
 * @param {*} website1   网址1
 * @param {*} website2   网址2
 * @param {*} companyTel   公司电话
 * @param {*} wxNo   微信号
 * @param {*} tags   标签
 * @param {*} industryId   行业
 * @param {*} businessText   业务描述
 * @param {*} isPublic   是否对外公开0否1是
 * @param {*} userSignature   个性签名
 * @param {*} sourceObj 
 * @param {*} success 
 */
var updateCard = function updateCard(userId, cardId, name, cardPhone, cardTitle, company, website1, website2, companyTel, wxNo, tags, industryId, businessText, isPublic, userSignature, sourceObj) {
    var success = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : function () {};

    var url = baseUrl + versionStr + "/card/updateCard";
    indexUrls.requestPostApi(url, {
        userId: userId, cardId: cardId,
        name: name, cardPhone: cardPhone, businessText: businessText,
        cardTitle: cardTitle, company: company, isPublic: isPublic,
        website1: website1, website2: website2, userSignature: userSignature,
        companyTel: companyTel, wxNo: wxNo,
        tags: tags, industryId: industryId
    }, sourceObj, success, failFun, completeFun);
};
/**
 * 添加我的名片
 * @param {*} userId   用户ID
 * @param {*} cardSn   名片编号
 * @param {*} name   名称
 * @param {*} cardPhone   名片电话
 * @param {*} cardTitle   名片职称
 * @param {*} company   公司名称
 * @param {*} website1   网址1
 * @param {*} website2   网址2
 * @param {*} companyTel   公司电话
 * @param {*} wxNo   微信号
 * @param {*} tags   标签
 * @param {*} industryId   行业
 * @param {*} businessText   业务描述
 * @param {*} isPublic   是否对外公开0否1是
 * @param {*} userSignature   个性签名
 * @param {*} sourceObj 
 * @param {*} success 
 */
var addCard = function addCard(cardSn, userId, name, cardPhone, cardTitle, company, website1, website2, companyTel, wxNo, tags, industryId, businessText, isPublic, userSignature, sourceObj) {
    var success = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : function () {};

    var url = baseUrl + versionStr + "/card/addCard";
    indexUrls.requestPostApi(url, {
        userId: userId, cardSn: cardSn,
        name: name, cardPhone: cardPhone, businessText: businessText,
        cardTitle: cardTitle, company: company, isPublic: isPublic,
        website1: website1, website2: website2, userSignature: userSignature,
        companyTel: companyTel, wxNo: wxNo,
        tags: tags, industryId: industryId
    }, sourceObj, success, failFun, completeFun);
};
/**
 * 获取标识码
 * @param {*} userId 用户ID 
 * @param {*} type 类型2:名片
 * @param {*} success 
 * @param {*} fail 
 */
var getProductSN = function getProductSN(userId, type, sourceObj) {
    var success = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    var url = baseUrl + versionStr + "/product/getProductSN";
    indexUrls.requestPostApi(url, { userId: userId, type: type }, sourceObj, success, failFun, completeFun);
};

/**
 * 
 * @param {*} filePaths  文件路径数组
 * @param {*} successUp 成功上传的个数
 * @param {*} failUp 上传失败的个数
 * @param {*} i 文件路径数组的指标
 * @param {*} length 文件路径数组的长度
 * @param {*} scoureId 文件SN
 * @param {*} userId 用户ID
 * @param {*} sourceType 11名片头像12公司logo13产品图片
 * @param {*} success 
 */
var uploadFile = function uploadFile(filePaths, successUp, failUp, i, length, scoureId, userId, sourceType) {
    var success = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : function () {};

    // console.log('aaa',success);
    // let fn = success;
    var url = baseUrl + versionStr + "/file/uploadFile";
    wx.uploadFile({
        url: url,
        filePath: filePaths[i],
        header: { 'Content-Type': 'application/x-www-form-urlencoded', devType: 1 },
        name: 'file',
        formData: {
            'scoureId': scoureId,
            'userId': userId,
            'fileType': 1, //图片
            'sourceType': sourceType,
            'devType': 1,
            'length': length,
            'count': i
        },
        success: function success(resp) {
            successUp++;
            // success(successUp)
        },
        fail: function fail(res) {
            failUp++;
            // console.log('res', res);
            tip.showToast('貌似网络不好哦！请在网络顺畅的时候重新操作！');
        },
        complete: function complete(res) {
            i++;
            success(res);
            // console.log('aa=', i, length);
            if (i == length) {
                // cache.set("numy",length)
                tip.showToast('总共' + successUp + '张上传成功,' + failUp + '张上传失败！', function () {
                    // console.log('-----------------------------1');
                    success();
                });
            } else {
                //递归调用uploadDIY函数
                // console.log(success,"ttyyy")
                uploadFile(filePaths, successUp, failUp, i, length, scoureId, userId, sourceType, success);
            }
        }
    });
};

/**
 * 删除图片
 * @param {*} scoureId SN码
 * @param {*} userId 用户Id
 * @param {*} sourceType 图片类型
 * @param {*} sourceObj 
 * @param {*} success 
 */
var deleteFile = function deleteFile(scoureId, userId, sourceType, sourceObj) {
    var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    var url = baseUrl + versionStr + "/file/deleteFile";
    indexUrls.requestPostApi(url, { userId: userId, scoureId: scoureId, sourceType: sourceType }, sourceObj, success, failFun, completeFun);
};

/**
 * 互动雷达
 * @param {*} offset   
 * @param {*} limit   
 * @param {*} sourceObj 
 * @param {*} success 
 */
var list = function list(userId, offset, limit, sourceObj) {
    var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    var url = baseUrl + versionStr + "/card/list";
    indexUrls.requestPostApi(url, { userId: userId, offset: offset, limit: limit }, sourceObj, success, failFun, completeFun);
};
/**
 * 分组名片列表
 * @param {*} userId   用户ID
 * @param {*} groupId 分组Id
 * @param {*} sourceObj 
 * @param {*} success 
 */
var myCollectionList = function myCollectionList(userId, groupId, offset, limit, sourceObj) {
    var success = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};

    var url = baseUrl + versionStr + "/card/myCollectionList";
    indexUrls.requestPostApi(url, { offset: offset, limit: limit, userId: userId, groupId: groupId }, sourceObj, success, failFun, completeFun);
};

/**
 * 被收藏，点赞，阅读列表
 * @param {*} operationType 1:被收藏 2:被点赞:3:被阅读4转发
 * @param {*} userId 登录用户ID 
 * @param {*} offset 
 * @param {*} limit 
 */
var operationList = function operationList(operationType, userId, offset, limit, sourceObj) {
    var success = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};

    var url = baseUrl + versionStr + "/card/operationList";
    indexUrls.requestPostApi(url, { offset: offset, limit: limit, operationType: operationType, userId: userId }, sourceObj, success, failFun, completeFun);
};
/**
 * 名片详情
 * @param {*} formUserId 登录用户
 * @param {*} uid 名片ID 
 */
var cardDetails = function cardDetails(formUserId, uid, sourceObj) {
    var success = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    var url = baseUrl + versionStr + "/card/cardDetails";
    indexUrls.requestPostApi(url, { formUserId: formUserId, uid: uid }, sourceObj, success, failFun, completeFun);
};
/**
 * 点赞，浏览
 * @param {*} userId 登记用户
 * @param {*} cardId 名片ID
 * @param {*} operationType 2:点赞:3:阅读,4:分享
 * @param {*} sourceObj 
 * @param {*} success 
 */
var cardOperation = function cardOperation(userId, cardId, operationType, sourceObj) {
    var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    var url = baseUrl + versionStr + "/card/cardOperation";
    indexUrls.requestPostApi(url, { userId: userId, cardId: cardId, operationType: operationType }, sourceObj, success, failFun, completeFun);
};
/**
 * 取消点赞
 * @param {*} userId 登记用户
 * @param {*} cardId 名片ID
 * @param {*} operationType 2:点赞
 * @param {*} sourceObj 
 * @param {*} success 
 */
var delCardOperation = function delCardOperation(userId, cardId, operationType, sourceObj) {
    var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    var url = baseUrl + versionStr + "/card/delCardOperation";
    indexUrls.requestPostApi(url, { userId: userId, cardId: cardId, operationType: operationType }, sourceObj, success, failFun, completeFun);
};

//商城首页数据接口
var indexsh = function indexsh(sourceObj) {
    var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    console.log('=========================');
    var url = baseUrl + versionStr + "/shop/index";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
};
/**
 * 品牌详情
 * @param {*} id  点击时携带的id
 * @param {*} sourceObj 
 * @param {*} success 
 */
var BrandDetail = function BrandDetail(id, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/brandDetail";
    indexUrls.requestPostApi(url, { id: id }, sourceObj, success, failFun, completeFun);
};
//获得商品列表
var CatalogList = function CatalogList(id, page, size, sourceObj) {
    var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    var url = baseUrl + versionStr + "/shop/catalog";
    indexUrls.requestPostApi(url, { brandId: id, offset: page, limit: size }, sourceObj, success, failFun, completeFun);
};
//获得分类数据
var GoodsCategory = function GoodsCategory(id, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/category";
    indexUrls.requestPostApi(url, { id: id }, sourceObj, success, failFun, completeFun);
};
//获得分类数据
/**
 *  categoryId:分类id   brandId：品牌id  keyword：关键字搜索 Boolean isNew：1最新, Boolean isHot：1最热
 * **/
var GoodsList = function GoodsList(categoryId, brandId, keyword, isNew, isHot, order, sort, offset, limit, sourceObj) {
    var success = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : function () {};

    var url = baseUrl + versionStr + "/shop/list";
    indexUrls.requestPostApi(url, { categoryId: categoryId, brandId: brandId, keyword: keyword, isNew: isNew, isHot: isHot, order: order, sort: sort, offset: offset, limit: limit }, sourceObj, success, failFun, completeFun);
};
//获得商品的详情
var GoodsDetail = function GoodsDetail(id, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/detail";
    indexUrls.requestPostApi(url, { id: id }, sourceObj, success, failFun, completeFun);
};
//商品详情页的关联商品（大家都在看）
var GoodsRelated = function GoodsRelated(id, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/related";
    indexUrls.requestPostApi(url, { id: id }, sourceObj, success, failFun, completeFun);
};
//获取购物车商品件数
var CartGoodsCount = function CartGoodsCount(sourceObj) {
    var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    var url = baseUrl + versionStr + "/shop/cartGoodscount";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
};
//立即购买商品
var CartFastAdd = function CartFastAdd(goodsId, number, productId, sourceObj) {
    var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    var url = baseUrl + versionStr + "/shop/cartFastadd";
    indexUrls.requestPostApi(url, { goodsId: goodsId, number: number, productId: productId }, sourceObj, success, failFun, completeFun);
};

//添加商品到购物车 
var CartAdd = function CartAdd(goodsId, number, productId, sourceObj) {
    var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    var url = baseUrl + versionStr + "/shop/cartAdd";
    indexUrls.requestPostApi(url, { goodsId: goodsId, number: number, productId: productId }, sourceObj, success, failFun, completeFun);
};
//添加或取消收藏
var CollectAddOrDelete = function CollectAddOrDelete(valueId, type, sourceObj) {
    var success = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    console.log(valueId, type, success);
    var url = baseUrl + versionStr + "/shop/addordelete";
    indexUrls.requestPostApi(url, { valueId: valueId, type: type }, sourceObj, success, failFun, completeFun);
};
//收藏列表
var CollectList = function CollectList(type, offset, limit, sourceObj) {
    var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    // console.log(userId,type,offset,limit,success) 
    var url = baseUrl + versionStr + "/shop/collectList";
    indexUrls.requestPostApi(url, { type: type, offset: offset, limit: limit }, sourceObj, success, failFun, completeFun);
};

// CollectList: WxApiRoot + 'shop/collectList', //收藏列表 

//专题详情
var TopicDetail = function TopicDetail(id, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/topicDetail";
    indexUrls.requestPostApi(url, { id: id }, sourceObj, success, failFun, completeFun);
};

//相关专题
var TopicRelated = function TopicRelated(id, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/topicRelated";
    indexUrls.requestPostApi(url, { id: id }, sourceObj, success, failFun, completeFun);
};

//评论列表
var CommentList = function CommentList(valueId, type, page, size, showType, sourceObj) {
    var success = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : function () {};

    var url = baseUrl + versionStr + "/shop/commentList";
    indexUrls.requestPostApi(url, { valueId: valueId, typeId: type, showType: showType, offset: page, limit: size }, sourceObj, success, failFun, completeFun);
};

//-----------------------------购物车全部接口

//获取购物车的数据
var CartList = function CartList(sourceObj) {
    var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    var url = baseUrl + versionStr + "/shop/cartIndex";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
};

//选择或取消选择商品
var CartChecked = function CartChecked(productIds, isChecked, sourceObj) {
    var success = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    var url = baseUrl + versionStr + "/shop/cartChecked";
    indexUrls.requestPostApi(url, { productIds: productIds, isChecked: isChecked }, sourceObj, success, failFun, completeFun);
};
//更新购物车的商品
var CartUpdate = function CartUpdate(productId, goodsId, number, id, sourceObj) {
    var success = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};

    var url = baseUrl + versionStr + "/shop/cartUpdate";
    indexUrls.requestPostApi(url, { productId: productId, goodsId: goodsId, number: number, id: id }, sourceObj, success, failFun, completeFun);
};
//删除购物车的商品
var CartDelete = function CartDelete(productIds, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/cartDelete";
    indexUrls.requestPostApi(url, { productIds: productIds }, sourceObj, success, failFun, completeFun);
};

//------------------------------填写订单全部接口
// 下单前信息确认
var CartCheckout = function CartCheckout(cartId, addressId, couponId, sourceObj) {
    var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    var url = baseUrl + versionStr + "/shop/cartCheckout";
    indexUrls.requestPostApi(url, { cartId: cartId, addressId: addressId, couponId: couponId }, sourceObj, success, failFun, completeFun);
};

// 提交订单
var OrderSubmit = function OrderSubmit(cartId, addressId, couponId, sourceObj) {
    var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    var url = baseUrl + versionStr + "/shop/order/submit";
    indexUrls.requestPostApi(url, { cartId: cartId, addressId: addressId, couponId: couponId }, sourceObj, success, failFun, completeFun);
};

// 订单的预支付会话
var OrderPrepay = function OrderPrepay(orderId, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/order/prepay";
    indexUrls.requestPostApi(url, { orderId: orderId }, sourceObj, success, failFun, completeFun);
};

//------------------------------地址全部接口
//收货地址列表
var AddressList = function AddressList(sourceObj) {
    var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    var url = baseUrl + versionStr + "/shop/addressList";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
};
//删除收货地址
var AddressDelete = function AddressDelete(id, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    // console.log(userId,id,sourceObj,success)
    var url = baseUrl + versionStr + "/shop/addressDelete";
    indexUrls.requestPostApi(url, { id: id }, sourceObj, success, failFun, completeFun);
};
//收货地址详情
var AddressDetail = function AddressDetail(id, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/addressDetail";
    indexUrls.requestPostApi(url, { id: id }, sourceObj, success, failFun, completeFun);
};
//获取区域列表
var RegionList = function RegionList(pid, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/regionList";
    indexUrls.requestPostApi(url, { pid: pid }, sourceObj, success, failFun, completeFun);
};
//保存收货地址
var AddressSave = function AddressSave(id, name, mobile, provinceId, cityId, areaId, address, isDefault, provinceName, cityName, countyName, sourceObj) {
    var success = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : function () {};

    var url = baseUrl + versionStr + "/shop/addressSave";
    indexUrls.requestPostApi(url, { id: id, name: name, mobile: mobile, provinceId: provinceId, cityId: cityId, areaId: areaId, address: address, isDefault: isDefault, provinceName: provinceName, cityName: cityName, countyName: countyName }, sourceObj, success, failFun, completeFun);
};

//------------------------------评论全部接口
//评论总数
var CommentCount = function CommentCount(valueId, type, size, page, showType, sourceObj) {
    var success = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : function () {};

    var url = baseUrl + versionStr + "/shop/commentCount";
    indexUrls.requestPostApi(url, { valueId: valueId, typeId: type, size: size, page: page, showType: showType }, sourceObj, success, failFun, completeFun);
};
//图片上传
// logertype = 14 评论图片 
var StorageUpload = function StorageUpload(sourceObj) {
    var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    var url = baseUrl + versionStr + "/storage/upload";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
};
//发表评论
var CommentPost = function CommentPost(userId, typeId, valueId, content, star, hasPicture, picUrls, sourceObj) {
    var success = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : function () {};

    var url = baseUrl + versionStr + "/shop/commentPost";
    indexUrls.requestPostApi(url, { userId: userId, typeId: typeId, valueId: valueId, content: content, star: star, hasPicture: hasPicture, picUrls: picUrls }, sourceObj, success, failFun, completeFun);
};

//------------------------------订单处理全部接口
//订单列表
var OrderList = function OrderList(userId, showType, offset, limit, sourceObj) {
    var success = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};

    var url = baseUrl + versionStr + "/shop/order/list";
    indexUrls.requestPostApi(url, { userId: userId, showType: showType, offset: offset, limit: limit }, sourceObj, success, failFun, completeFun);
};

//------------------------------足迹列表全部接口
//足迹列表
var FootprintList = function FootprintList(userId, offset, limit, sourceObj) {
    var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    var url = baseUrl + versionStr + "/shop/footPrintList";
    indexUrls.requestPostApi(url, { userId: userId, offset: offset, limit: limit }, sourceObj, success, failFun, completeFun);
};
//删除足迹
var FootprintDelete = function FootprintDelete(footprintId, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/footPrintDelete";
    indexUrls.requestPostApi(url, { footprintId: footprintId }, sourceObj, success, failFun, completeFun);
};

//------------------------------订单详情全部接口
//物流查询
var ExpressQuery = function ExpressQuery(expCode, expNo, sourceObj) {
    var success = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
    //待完成
    var url = baseUrl + versionStr + "/shop/expressQuery";
    indexUrls.requestPostApi(url, { expCode: expCode, expNo: expNo }, sourceObj, success, failFun, completeFun);
};
//订单详情
var OrderDetail = function OrderDetail(orderId, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/order/detail";
    indexUrls.requestPostApi(url, { orderId: orderId }, sourceObj, success, failFun, completeFun);
};
//取消订单
var OrderCancel = function OrderCancel(orderId, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/order/cancel";
    indexUrls.requestPostApi(url, { orderId: orderId }, sourceObj, success, failFun, completeFun);
};
//退款取消订单
var OrderRefund = function OrderRefund(orderId, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/order/refund";
    indexUrls.requestPostApi(url, { orderId: orderId }, sourceObj, success, failFun, completeFun);
};
//删除订单
var OrderDelete = function OrderDelete(orderId, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/order/delete";
    indexUrls.requestPostApi(url, { orderId: orderId }, sourceObj, success, failFun, completeFun);
};
//确认收货
var OrderConfirm = function OrderConfirm(orderId, sourceObj) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var url = baseUrl + versionStr + "/shop/order/confirm";
    indexUrls.requestPostApi(url, { orderId: orderId }, sourceObj, success, failFun, completeFun);
};
//代评价商品信息
var OrderComment = function OrderComment(orderId, goodsId, sourceObj) {
    var success = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    var url = baseUrl + versionStr + "/shop/order/comment";
    indexUrls.requestPostApi(url, { orderId: orderId, goodsId: goodsId }, sourceObj, success, failFun, completeFun);
};

//------------------------------
//新品
var GoodsNew = function GoodsNew(sourceObj) {
    var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    var url = baseUrl + versionStr + "/shop/new";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
};
//专题列表
var TopicList = function TopicList(offset, limit, sourceObj) {
    var success = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    var url = baseUrl + versionStr + "/shop/topicList";
    indexUrls.requestPostApi(url, { offset: offset, limit: limit }, sourceObj, success, failFun, completeFun);
};
//品牌列表
var BrandList = function BrandList(offset, limit, sourceObj) {
    var success = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    var url = baseUrl + versionStr + "/shop/brandList";
    indexUrls.requestPostApi(url, { offset: offset, limit: limit }, sourceObj, success, failFun, completeFun);
};
//热门
var GoodsHot = function GoodsHot(sourceObj) {
    var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    var url = baseUrl + versionStr + "/shop/hot";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
};

//   GoodsHot: WxApiRoot + 'goods/hot', //热门 1
module.exports = {
    /**方法 */
    taglist: taglist,
    prolist: prolist,
    addGroup: addGroup,
    updateGroup: updateGroup,
    delGroup: delGroup,
    groupList: groupList,
    myCardList: myCardList,
    addCard: addCard,
    updateCard: updateCard,
    delMyCard: delMyCard,
    getProductSN: getProductSN,
    uploadFile: uploadFile,
    list: list,
    myCollectionList: myCollectionList,
    industryList: industryList,
    operationList: operationList,
    cardDetails: cardDetails,
    deleteFile: deleteFile,
    cardOperation: cardOperation,
    delCardOperation: delCardOperation,
    BrandDetail: BrandDetail,
    indexsh: indexsh,
    CatalogList: CatalogList,
    GoodsCategory: GoodsCategory,
    GoodsDetail: GoodsDetail,
    GoodsRelated: GoodsRelated,
    CartGoodsCount: CartGoodsCount,
    CollectAddOrDelete: CollectAddOrDelete,
    CartFastAdd: CartFastAdd,
    CartAdd: CartAdd,
    TopicDetail: TopicDetail,
    TopicRelated: TopicRelated,
    CommentList: CommentList,
    CartList: CartList,
    CartChecked: CartChecked,
    CartUpdate: CartUpdate,
    CartDelete: CartDelete,
    CartCheckout: CartCheckout,
    OrderSubmit: OrderSubmit,
    OrderPrepay: OrderPrepay,
    AddressListL: AddressList,
    AddressDelete: AddressDelete,
    AddressDetail: AddressDetail,
    RegionList: RegionList,
    AddressSave: AddressSave,
    CommentCount: CommentCount,
    StorageUpload: StorageUpload,
    CommentPost: CommentPost,
    GoodsList: GoodsList,
    CollectList: CollectList,
    OrderList: OrderList,
    FootprintList: FootprintList,
    FootprintDelete: FootprintDelete,
    ExpressQuery: ExpressQuery,
    OrderDetail: OrderDetail,
    OrderCancel: OrderCancel,
    OrderRefund: OrderRefund,
    OrderDelete: OrderDelete,
    OrderConfirm: OrderConfirm,
    OrderComment: OrderComment,
    GoodsNew: GoodsNew,
    TopicList: TopicList,
    BrandList: BrandList,
    GoodsHot: GoodsHot,
    /**属性 */
    getUser: getUser,
    baseImgUrl: baseImgUrl
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaTIuanMiXSwibmFtZXMiOlsiaW5kZXhVcmxzIiwicmVxdWlyZSIsInRpcCIsImNhY2hlIiwic2VydmVyIiwidGVzdCIsImxvY2FsIiwiYmFzZVVybCIsInZlcnNpb25TdHIiLCJiYXNlSW1nVXJsIiwiZ2V0VXNlciIsImZhaWxGdW4iLCJlIiwiY29uc29sZSIsImxvZyIsImNvbXBsZXRlRnVuIiwidGFnbGlzdCIsInRhZ1R5cGUiLCJ0YWdTdGF0dXMiLCJzb3VyY2VPYmoiLCJzdWNjZXNzIiwidXJsIiwicmVxdWVzdFBvc3RBcGkiLCJpbmR1c3RyeUxpc3QiLCJwcm9saXN0IiwidGFnQ29kZSIsInByb2R1Y3RUeXBlIiwiZm9ybVVzZXJJZCIsInRvVXNlcklkIiwibGltaXQiLCJvZmZzZXQiLCJhZGRHcm91cCIsImdyb3VwTmFtZSIsInVzZXJJZCIsInVwZGF0ZUdyb3VwIiwidWlkIiwiZGVsR3JvdXAiLCJncm91cExpc3QiLCJteUNhcmRMaXN0IiwiZGVsTXlDYXJkIiwiY2FyZElkIiwidXBkYXRlQ2FyZCIsIm5hbWUiLCJjYXJkUGhvbmUiLCJjYXJkVGl0bGUiLCJjb21wYW55Iiwid2Vic2l0ZTEiLCJ3ZWJzaXRlMiIsImNvbXBhbnlUZWwiLCJ3eE5vIiwidGFncyIsImluZHVzdHJ5SWQiLCJidXNpbmVzc1RleHQiLCJpc1B1YmxpYyIsInVzZXJTaWduYXR1cmUiLCJhZGRDYXJkIiwiY2FyZFNuIiwiZ2V0UHJvZHVjdFNOIiwidHlwZSIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aHMiLCJzdWNjZXNzVXAiLCJmYWlsVXAiLCJpIiwibGVuZ3RoIiwic2NvdXJlSWQiLCJzb3VyY2VUeXBlIiwid3giLCJmaWxlUGF0aCIsImhlYWRlciIsImRldlR5cGUiLCJmb3JtRGF0YSIsInJlc3AiLCJmYWlsIiwicmVzIiwic2hvd1RvYXN0IiwiY29tcGxldGUiLCJkZWxldGVGaWxlIiwibGlzdCIsIm15Q29sbGVjdGlvbkxpc3QiLCJncm91cElkIiwib3BlcmF0aW9uTGlzdCIsIm9wZXJhdGlvblR5cGUiLCJjYXJkRGV0YWlscyIsImNhcmRPcGVyYXRpb24iLCJkZWxDYXJkT3BlcmF0aW9uIiwiaW5kZXhzaCIsIkJyYW5kRGV0YWlsIiwiaWQiLCJDYXRhbG9nTGlzdCIsInBhZ2UiLCJzaXplIiwiYnJhbmRJZCIsIkdvb2RzQ2F0ZWdvcnkiLCJHb29kc0xpc3QiLCJjYXRlZ29yeUlkIiwia2V5d29yZCIsImlzTmV3IiwiaXNIb3QiLCJvcmRlciIsInNvcnQiLCJHb29kc0RldGFpbCIsIkdvb2RzUmVsYXRlZCIsIkNhcnRHb29kc0NvdW50IiwiQ2FydEZhc3RBZGQiLCJnb29kc0lkIiwibnVtYmVyIiwicHJvZHVjdElkIiwiQ2FydEFkZCIsIkNvbGxlY3RBZGRPckRlbGV0ZSIsInZhbHVlSWQiLCJDb2xsZWN0TGlzdCIsIlRvcGljRGV0YWlsIiwiVG9waWNSZWxhdGVkIiwiQ29tbWVudExpc3QiLCJzaG93VHlwZSIsInR5cGVJZCIsIkNhcnRMaXN0IiwiQ2FydENoZWNrZWQiLCJwcm9kdWN0SWRzIiwiaXNDaGVja2VkIiwiQ2FydFVwZGF0ZSIsIkNhcnREZWxldGUiLCJDYXJ0Q2hlY2tvdXQiLCJjYXJ0SWQiLCJhZGRyZXNzSWQiLCJjb3Vwb25JZCIsIk9yZGVyU3VibWl0IiwiT3JkZXJQcmVwYXkiLCJvcmRlcklkIiwiQWRkcmVzc0xpc3QiLCJBZGRyZXNzRGVsZXRlIiwiQWRkcmVzc0RldGFpbCIsIlJlZ2lvbkxpc3QiLCJwaWQiLCJBZGRyZXNzU2F2ZSIsIm1vYmlsZSIsInByb3ZpbmNlSWQiLCJjaXR5SWQiLCJhcmVhSWQiLCJhZGRyZXNzIiwiaXNEZWZhdWx0IiwicHJvdmluY2VOYW1lIiwiY2l0eU5hbWUiLCJjb3VudHlOYW1lIiwiQ29tbWVudENvdW50IiwiU3RvcmFnZVVwbG9hZCIsIkNvbW1lbnRQb3N0IiwiY29udGVudCIsInN0YXIiLCJoYXNQaWN0dXJlIiwicGljVXJscyIsIk9yZGVyTGlzdCIsIkZvb3RwcmludExpc3QiLCJGb290cHJpbnREZWxldGUiLCJmb290cHJpbnRJZCIsIkV4cHJlc3NRdWVyeSIsImV4cENvZGUiLCJleHBObyIsIk9yZGVyRGV0YWlsIiwiT3JkZXJDYW5jZWwiLCJPcmRlclJlZnVuZCIsIk9yZGVyRGVsZXRlIiwiT3JkZXJDb25maXJtIiwiT3JkZXJDb21tZW50IiwiR29vZHNOZXciLCJUb3BpY0xpc3QiLCJCcmFuZExpc3QiLCJHb29kc0hvdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJBZGRyZXNzTGlzdEwiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsWUFBWUMsUUFBUSxjQUFSLENBQWxCO0FBQ0EsSUFBTUMsTUFBTUQsUUFBUSxVQUFSLENBQVo7QUFDQSxJQUFNRSxRQUFRRixRQUFRLFlBQVIsQ0FBZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUlHLFNBQVMsMEJBQWIsQyxDQUF1QztBQUN2QyxJQUFJQyxPQUFPLDZCQUFYLEMsQ0FBeUM7QUFDekMsSUFBSUMsUUFBUSx1QkFBWixDLENBQW9DO0FBQ3BDLElBQUlDLFVBQVVGLElBQWQ7QUFDQSxJQUFJRyxhQUFhLFNBQWpCOztBQUVBOzs7QUFHQSxJQUFNQyxhQUFhLDBCQUFuQjs7QUFFQSxJQUFNQyxVQUFVSCxVQUFVQyxVQUFWLEdBQXVCLGtCQUF2Qzs7QUFJQSxJQUFNRyxVQUFVLFNBQVZBLE9BQVUsQ0FBQ0MsQ0FBRCxFQUFPO0FBQ25CQyxZQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQkYsQ0FBdEI7QUFDSCxDQUZEO0FBR0EsSUFBTUcsY0FBYyxTQUFkQSxXQUFjLENBQUNILENBQUQsRUFBTztBQUN2QkMsWUFBUUMsR0FBUixDQUFZLFdBQVosRUFBeUJGLENBQXpCO0FBQ0gsQ0FGRDs7QUFJQTs7Ozs7OztBQU9BLElBQU1JLFVBQVUsU0FBVkEsT0FBVSxDQUFDQyxPQUFELEVBQVVDLFNBQVYsRUFBcUJDLFNBQXJCLEVBQXdEO0FBQUEsUUFBeEJDLE9BQXdCLHVFQUFkLFlBQU0sQ0FBRyxDQUFLOztBQUNwRSxRQUFJQyxNQUFNZCxVQUFVQyxVQUFWLEdBQXVC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QkFBY0EsYUFyREQ7QUFzRGJDLHFCQUFnQkEsZUF0REg7QUF1RGJFLGtCQUFhQSxZQXZEQTtBQXdEYkcsaUJBQVlBLFdBeERDO0FBeURiQyxpQkFBWUEsV0F6REM7QUEwRGJDLGlCQUFZQSxXQTFEQztBQTJEYkMsaUJBQVlBLFdBM0RDO0FBNERiQyxrQkFBYUEsWUE1REE7QUE2RGJDLGtCQUFhQSxZQTdEQTtBQThEYkMsY0FBU0EsUUE5REk7QUErRGJDLGVBQVVBLFNBL0RHO0FBZ0ViQyxlQUFVQSxTQWhFRztBQWlFYkMsY0FBU0EsUUFqRUk7QUFrRWI7QUFDQTlKLGFBQVNBLE9BbkVJO0FBb0ViRCxnQkFBWUE7QUFwRUMsQ0FBakIiLCJmaWxlIjoiYXBpMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGluZGV4VXJscyA9IHJlcXVpcmUoXCIuLi91dGlscy9yZXF1ZXN0XCIpXHJcbmNvbnN0IHRpcCA9IHJlcXVpcmUoXCIuLi91dGlscy90aXBcIilcclxuY29uc3QgY2FjaGUgPSByZXF1aXJlKFwiLi4vdXRpbHMvY2FjaGVcIilcclxuLy8gcHVibGljIGZpbmFsIHN0YXRpYyBpbnQgU1VDQ0VTUyA9IDE7IC8vIOaIkOWKn1xyXG4vLyBwdWJsaWMgZmluYWwgc3RhdGljIGludCBXQVJOID0gMjsgLy8g5ZCO56uv5o+Q6YaSXHJcbi8vcHVibGljIGZpbmFsIHN0YXRpYyBpbnQgRVJST1IgPSAzOyAvLyDns7vnu5/plJnor69cclxuLy8gcHVibGljIGZpbmFsIHN0YXRpYyBpbnQgVE9LRU5fT1VUID0gNDsgLy8g55m75b2V6LaF5pe2XHJcblxyXG5sZXQgc2VydmVyID0gXCJodHRwczovL3d3dy50b25neGlrai5jb21cIi8v55Sf5LqnXHJcbmxldCB0ZXN0ID0gXCJodHRwczovL3d3dy50b25neGlrai5jb20vbXlcIjsvL+a1i+ivlVxyXG5sZXQgbG9jYWwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4NVwiOy8v5pys5ZywXHJcbnZhciBiYXNlVXJsID0gdGVzdDtcclxudmFyIHZlcnNpb25TdHIgPSBcIi9hcGkvdjFcIjtcclxuXHJcbi8qKlxyXG4gKiDlm77niYflnLDlnYDliY3nvIBcclxuICovXHJcbmNvbnN0IGJhc2VJbWdVcmwgPSBcImh0dHA6Ly9sZWxlLnRvbmd4aWtqLmNvbVwiO1xyXG5cclxuY29uc3QgZ2V0VXNlciA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgJy91c2VyL3VwZGF0ZVVzZXInO1xyXG5cclxuXHJcblxyXG5jb25zdCBmYWlsRnVuID0gKGUpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCfmjqXlj6PosIPnlKjlpLHotKUnLCBlKTtcclxufVxyXG5jb25zdCBjb21wbGV0ZUZ1biA9IChlKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygn5o6l5Y+j6LCD55So5ZCO5omn6KGM5oiQ5YqfJywgZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmoIfnrb7liJfooahcclxuICogQHBhcmFtIHsqfSB0YWdUeXBlIDHotYTorq/moIfnrb5cclxuICogQHBhcmFtIHsqfSB0YWdTdGF0dXMgMeWQr+eUqFxyXG4gKiBAcGFyYW0geyp9IHNvdXJjZU9iaiDlm57osIPkvKDlj4JcclxuICogQHBhcmFtIHsqfSBzdWNjZXNzIFxyXG4gKi9cclxuY29uc3QgdGFnbGlzdCA9ICh0YWdUeXBlLCB0YWdTdGF0dXMsIHNvdXJjZU9iaiwgc3VjY2VzcyA9ICgpID0+IHsgfSkgPT4ge1xyXG4gICAgbGV0IHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvY2FyZC90YWdMaXN0XCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7IHRhZ1R5cGU6IHRhZ1R5cGUsIHRhZ1N0YXR1czogdGFnU3RhdHVzIH0sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDooYzkuJrliJfooahcclxuICogQHBhcmFtIHsqfSBzb3VyY2VPYmog5Zue6LCD5Lyg5Y+CXHJcbiAqIEBwYXJhbSB7Kn0gc3VjY2VzcyBcclxuICovXHJcbmNvbnN0IGluZHVzdHJ5TGlzdCA9IChzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIGxldCB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL2NhcmQvaW5kdXN0cnlMaXN0XCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7fSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bilcclxufVxyXG5cclxuLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0geyp9IHRhZ0NvZGUg5qCH562+Y29kZVxyXG4gKiBAcGFyYW0geyp9IHByb2R1Y3RUeXBlICDkuqflk4HnsbvlnosxOuWbvuaWhzI65Zu+54mHXHJcbiAqIEBwYXJhbSB7Kn0gZm9ybVVzZXJJZCDnmbvlvZXnlKjmiLco6YCJ5aGrKVxyXG4gKiBAcGFyYW0geyp9IHRvVXNlcklkIOafpeeci+eUqOaIt+S6p+WTgeWIl+ihqCjpgInloavvvIzkuI5mb3JtVXNlcklk55u45ZCM5pe277yM5Li66Ieq5bex5p+l55yL6Ieq5bexKVxyXG4gKiBAcGFyYW0geyp9IGxpbWl0IOWIhumhteadoeaVsFxyXG4gKiBAcGFyYW0geyp9IG9mZnNldCDliIbpobXotbflp4vpobVcclxuICogQHBhcmFtIHsqfSBzb3VyY2VPYmog5Zue6LCD5Lyg5Y+CXHJcbiAqIEBwYXJhbSB7Kn0gc3VjY2VzcyBcclxuICovXHJcbmNvbnN0IHByb2xpc3QgPSAodGFnQ29kZSwgcHJvZHVjdFR5cGUsIGZvcm1Vc2VySWQsIHRvVXNlcklkLCBsaW1pdCwgb2Zmc2V0LCBzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIGxldCB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Byb2R1Y3QvbGlzdFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge1xyXG4gICAgICAgIHRhZ0NvZGU6IHRhZ0NvZGUsIHByb2R1Y3RUeXBlOiBwcm9kdWN0VHlwZSwgZm9ybVVzZXJJZDogZm9ybVVzZXJJZCwgdG9Vc2VySWQ6IHRvVXNlcklkXHJcbiAgICAgICAgLCBsaW1pdDogbGltaXQsIG9mZnNldDogb2Zmc2V0XHJcbiAgICB9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKVxyXG59XHJcblxyXG4vKipcclxuICog5re75Yqg5YiG57uEXHJcbiAqIEBwYXJhbSB7Kn0gZ3JvdXBOYW1lIOe7hOWQjVxyXG4gKiBAcGFyYW0geyp9IHVzZXJJZCDnlKjmiLdJRFxyXG4gKiBAcGFyYW0geyp9IHNvdXJjZU9iaiDlm57osIPkvKDlj4JcclxuICogQHBhcmFtIHsqfSBzdWNjZXNzIFxyXG4gKi9cclxuY29uc3QgYWRkR3JvdXAgPSAoZ3JvdXBOYW1lLCB1c2VySWQsIHNvdXJjZU9iaiwgc3VjY2VzcyA9ICgpID0+IHsgfSkgPT4ge1xyXG4gICAgbGV0IHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvY2FyZC9hZGRHcm91cFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwgeyBncm91cE5hbWU6IGdyb3VwTmFtZSwgdXNlcklkOiB1c2VySWQgfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bilcclxufVxyXG5cclxuLyoqXHJcbiAqIOS/ruaUuee7hOWQjVxyXG4gKiBAcGFyYW0geyp9IHVpZCDnu4TmoIfor4ZcclxuICogQHBhcmFtIHsqfSBncm91cE5hbWUgIOe7hOWQjVxyXG4gKiBAcGFyYW0geyp9IHVzZXJJZCDnlKjmiLdJRFxyXG4gKiBAcGFyYW0geyp9IHNvdXJjZU9iaiBcclxuICogQHBhcmFtIHsqfSBzdWNjZXNzIFxyXG4gKi9cclxuY29uc3QgdXBkYXRlR3JvdXAgPSAodWlkLCBncm91cE5hbWUsIHVzZXJJZCwgc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7XHJcbiAgICBsZXQgdXJsID0gYmFzZVVybCArIHZlcnNpb25TdHIgKyBcIi9jYXJkL3VwZGF0ZUdyb3VwXCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7IGdyb3VwTmFtZTogZ3JvdXBOYW1lLCB1c2VySWQ6IHVzZXJJZCwgdWlkOiB1aWQgfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bilcclxufVxyXG5cclxuLyoqXHJcbiAqIOWIoOmZpOWIhue7hFxyXG4gKiBAcGFyYW0geyp9IHVpZCAg57uE5qCH6K+GXHJcbiAqIEBwYXJhbSB7Kn0gdXNlcklkICDnlKjmiLdJRFxyXG4gKiBAcGFyYW0geyp9IHNvdXJjZU9iaiBcclxuICogQHBhcmFtIHsqfSBzdWNjZXNzIFxyXG4gKi9cclxuY29uc3QgZGVsR3JvdXAgPSAodWlkLCB1c2VySWQsIHNvdXJjZU9iaiwgc3VjY2VzcyA9ICgpID0+IHsgfSkgPT4ge1xyXG4gICAgbGV0IHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvY2FyZC9kZWxHcm91cFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwgeyB1c2VySWQ6IHVzZXJJZCwgdWlkOiB1aWQgfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bilcclxufVxyXG5cclxuLyoqXHJcbiAqIOaIkeeahOWIhue7hOWIl+ihqFxyXG4gKiBAcGFyYW0geyp9IHVzZXJJZCAgIOeUqOaIt0lEXHJcbiAqIEBwYXJhbSB7Kn0gc291cmNlT2JqIFxyXG4gKiBAcGFyYW0geyp9IHN1Y2Nlc3MgXHJcbiAqL1xyXG5jb25zdCBncm91cExpc3QgPSAodXNlcklkLCBzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIGxldCB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL2NhcmQvZ3JvdXBMaXN0XCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7IHVzZXJJZDogdXNlcklkIH0sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pXHJcbn1cclxuLyoqXHJcbiAqIOaIkeeahOWQjeeJh+WIl+ihqFxyXG4gKiBAcGFyYW0geyp9IHVzZXJJZCAgIOeUqOaIt0lEXHJcbiAqIEBwYXJhbSB7Kn0gc291cmNlT2JqIFxyXG4gKiBAcGFyYW0geyp9IHN1Y2Nlc3MgXHJcbiAqL1xyXG5jb25zdCBteUNhcmRMaXN0ID0gKHVzZXJJZCwgc291cmNlT2JqLG9mZnNldCxsaW1pdCxzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7XHJcbiAgICBsZXQgdXJsID0gYmFzZVVybCArIHZlcnNpb25TdHIgKyBcIi9jYXJkL215Q2FyZExpc3RcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHsgdXNlcklkOiB1c2VySWQgfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bilcclxufVxyXG4vKipcclxuICog5Yig6Zmk5oiR55qE5ZCN54mHXHJcbiAqIEBwYXJhbSB7Kn0gdXNlcklkICAg55So5oi3SURcclxuICogQHBhcmFtIHsqfSBjYXJkSWQgICDlkI3niYdJRFxyXG4gKiBAcGFyYW0geyp9IHNvdXJjZU9iaiBcclxuICogQHBhcmFtIHsqfSBzdWNjZXNzIFxyXG4gKi9cclxuY29uc3QgZGVsTXlDYXJkID0gKHVzZXJJZCwgY2FyZElkLCBzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIGxldCB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL2NhcmQvZGVsTXlDYXJkXCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7IHVzZXJJZDogdXNlcklkLCBjYXJkSWQ6IGNhcmRJZCB9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKVxyXG59XHJcbi8qKlxyXG4gKiDkv67mlLnmiJHnmoTlkI3niYdcclxuICogQHBhcmFtIHsqfSB1c2VySWQgICDnlKjmiLdJRFxyXG4gKiBAcGFyYW0geyp9IGNhcmRJZCAgIOWQjeeJh0lEXHJcbiAqIEBwYXJhbSB7Kn0gbmFtZSAgIOWQjeensFxyXG4gKiBAcGFyYW0geyp9IGNhcmRQaG9uZSAgIOWQjeeJh+eUteivnVxyXG4gKiBAcGFyYW0geyp9IGNhcmRUaXRsZSAgIOWQjeeJh+iBjOensFxyXG4gKiBAcGFyYW0geyp9IGNvbXBhbnkgICDlhazlj7jlkI3np7BcclxuICogQHBhcmFtIHsqfSB3ZWJzaXRlMSAgIOe9keWdgDFcclxuICogQHBhcmFtIHsqfSB3ZWJzaXRlMiAgIOe9keWdgDJcclxuICogQHBhcmFtIHsqfSBjb21wYW55VGVsICAg5YWs5Y+455S16K+dXHJcbiAqIEBwYXJhbSB7Kn0gd3hObyAgIOW+ruS/oeWPt1xyXG4gKiBAcGFyYW0geyp9IHRhZ3MgICDmoIfnrb5cclxuICogQHBhcmFtIHsqfSBpbmR1c3RyeUlkICAg6KGM5LiaXHJcbiAqIEBwYXJhbSB7Kn0gYnVzaW5lc3NUZXh0ICAg5Lia5Yqh5o+P6L+wXHJcbiAqIEBwYXJhbSB7Kn0gaXNQdWJsaWMgICDmmK/lkKblr7nlpJblhazlvIAw5ZCmMeaYr1xyXG4gKiBAcGFyYW0geyp9IHVzZXJTaWduYXR1cmUgICDkuKrmgKfnrb7lkI1cclxuICogQHBhcmFtIHsqfSBzb3VyY2VPYmogXHJcbiAqIEBwYXJhbSB7Kn0gc3VjY2VzcyBcclxuICovXHJcbmNvbnN0IHVwZGF0ZUNhcmQgPSAodXNlcklkLCBjYXJkSWQsIG5hbWUsIGNhcmRQaG9uZSwgY2FyZFRpdGxlLCBjb21wYW55XHJcbiAgICAsIHdlYnNpdGUxLCB3ZWJzaXRlMiwgY29tcGFueVRlbCwgd3hOb1xyXG4gICAgLCB0YWdzLCBpbmR1c3RyeUlkLCBidXNpbmVzc1RleHQsIGlzUHVibGljLCB1c2VyU2lnbmF0dXJlLCBzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIGxldCB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL2NhcmQvdXBkYXRlQ2FyZFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge1xyXG4gICAgICAgIHVzZXJJZDogdXNlcklkLCBjYXJkSWQ6IGNhcmRJZCxcclxuICAgICAgICBuYW1lOiBuYW1lLCBjYXJkUGhvbmU6IGNhcmRQaG9uZSwgYnVzaW5lc3NUZXh0OiBidXNpbmVzc1RleHQsXHJcbiAgICAgICAgY2FyZFRpdGxlOiBjYXJkVGl0bGUsIGNvbXBhbnk6IGNvbXBhbnksIGlzUHVibGljOiBpc1B1YmxpYyxcclxuICAgICAgICB3ZWJzaXRlMTogd2Vic2l0ZTEsIHdlYnNpdGUyOiB3ZWJzaXRlMiwgdXNlclNpZ25hdHVyZTogdXNlclNpZ25hdHVyZSxcclxuICAgICAgICBjb21wYW55VGVsOiBjb21wYW55VGVsLCB3eE5vOiB3eE5vLFxyXG4gICAgICAgIHRhZ3M6IHRhZ3MsIGluZHVzdHJ5SWQ6IGluZHVzdHJ5SWRcclxuICAgIH0sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pXHJcbn1cclxuLyoqXHJcbiAqIOa3u+WKoOaIkeeahOWQjeeJh1xyXG4gKiBAcGFyYW0geyp9IHVzZXJJZCAgIOeUqOaIt0lEXHJcbiAqIEBwYXJhbSB7Kn0gY2FyZFNuICAg5ZCN54mH57yW5Y+3XHJcbiAqIEBwYXJhbSB7Kn0gbmFtZSAgIOWQjeensFxyXG4gKiBAcGFyYW0geyp9IGNhcmRQaG9uZSAgIOWQjeeJh+eUteivnVxyXG4gKiBAcGFyYW0geyp9IGNhcmRUaXRsZSAgIOWQjeeJh+iBjOensFxyXG4gKiBAcGFyYW0geyp9IGNvbXBhbnkgICDlhazlj7jlkI3np7BcclxuICogQHBhcmFtIHsqfSB3ZWJzaXRlMSAgIOe9keWdgDFcclxuICogQHBhcmFtIHsqfSB3ZWJzaXRlMiAgIOe9keWdgDJcclxuICogQHBhcmFtIHsqfSBjb21wYW55VGVsICAg5YWs5Y+455S16K+dXHJcbiAqIEBwYXJhbSB7Kn0gd3hObyAgIOW+ruS/oeWPt1xyXG4gKiBAcGFyYW0geyp9IHRhZ3MgICDmoIfnrb5cclxuICogQHBhcmFtIHsqfSBpbmR1c3RyeUlkICAg6KGM5LiaXHJcbiAqIEBwYXJhbSB7Kn0gYnVzaW5lc3NUZXh0ICAg5Lia5Yqh5o+P6L+wXHJcbiAqIEBwYXJhbSB7Kn0gaXNQdWJsaWMgICDmmK/lkKblr7nlpJblhazlvIAw5ZCmMeaYr1xyXG4gKiBAcGFyYW0geyp9IHVzZXJTaWduYXR1cmUgICDkuKrmgKfnrb7lkI1cclxuICogQHBhcmFtIHsqfSBzb3VyY2VPYmogXHJcbiAqIEBwYXJhbSB7Kn0gc3VjY2VzcyBcclxuICovXHJcbmNvbnN0IGFkZENhcmQgPSAoY2FyZFNuLCB1c2VySWQsIG5hbWUsIGNhcmRQaG9uZSwgY2FyZFRpdGxlLCBjb21wYW55XHJcbiAgICAsIHdlYnNpdGUxLCB3ZWJzaXRlMiwgY29tcGFueVRlbCwgd3hOb1xyXG4gICAgLCB0YWdzLCBpbmR1c3RyeUlkLCBidXNpbmVzc1RleHQsIGlzUHVibGljLCB1c2VyU2lnbmF0dXJlLCBzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIGxldCB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL2NhcmQvYWRkQ2FyZFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge1xyXG4gICAgICAgIHVzZXJJZDogdXNlcklkLCBjYXJkU246IGNhcmRTbixcclxuICAgICAgICBuYW1lOiBuYW1lLCBjYXJkUGhvbmU6IGNhcmRQaG9uZSwgYnVzaW5lc3NUZXh0OiBidXNpbmVzc1RleHQsXHJcbiAgICAgICAgY2FyZFRpdGxlOiBjYXJkVGl0bGUsIGNvbXBhbnk6IGNvbXBhbnksIGlzUHVibGljOiBpc1B1YmxpYyxcclxuICAgICAgICB3ZWJzaXRlMTogd2Vic2l0ZTEsIHdlYnNpdGUyOiB3ZWJzaXRlMiwgdXNlclNpZ25hdHVyZTogdXNlclNpZ25hdHVyZSxcclxuICAgICAgICBjb21wYW55VGVsOiBjb21wYW55VGVsLCB3eE5vOiB3eE5vLFxyXG4gICAgICAgIHRhZ3M6IHRhZ3MsIGluZHVzdHJ5SWQ6IGluZHVzdHJ5SWRcclxuICAgIH0sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pXHJcbn1cclxuLyoqXHJcbiAqIOiOt+WPluagh+ivhueggVxyXG4gKiBAcGFyYW0geyp9IHVzZXJJZCDnlKjmiLdJRCBcclxuICogQHBhcmFtIHsqfSB0eXBlIOexu+WeizI65ZCN54mHXHJcbiAqIEBwYXJhbSB7Kn0gc3VjY2VzcyBcclxuICogQHBhcmFtIHsqfSBmYWlsIFxyXG4gKi9cclxuY29uc3QgZ2V0UHJvZHVjdFNOID0gKHVzZXJJZCwgdHlwZSwgc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7XHJcbiAgICBsZXQgdXJsID0gYmFzZVVybCArIHZlcnNpb25TdHIgKyBcIi9wcm9kdWN0L2dldFByb2R1Y3RTTlwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwgeyB1c2VySWQ6IHVzZXJJZCwgdHlwZTogdHlwZSB9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKVxyXG59XHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7Kn0gZmlsZVBhdGhzICDmlofku7bot6/lvoTmlbDnu4RcclxuICogQHBhcmFtIHsqfSBzdWNjZXNzVXAg5oiQ5Yqf5LiK5Lyg55qE5Liq5pWwXHJcbiAqIEBwYXJhbSB7Kn0gZmFpbFVwIOS4iuS8oOWksei0peeahOS4quaVsFxyXG4gKiBAcGFyYW0geyp9IGkg5paH5Lu26Lev5b6E5pWw57uE55qE5oyH5qCHXHJcbiAqIEBwYXJhbSB7Kn0gbGVuZ3RoIOaWh+S7tui3r+W+hOaVsOe7hOeahOmVv+W6plxyXG4gKiBAcGFyYW0geyp9IHNjb3VyZUlkIOaWh+S7tlNOXHJcbiAqIEBwYXJhbSB7Kn0gdXNlcklkIOeUqOaIt0lEXHJcbiAqIEBwYXJhbSB7Kn0gc291cmNlVHlwZSAxMeWQjeeJh+WktOWDjzEy5YWs5Y+4bG9nbzEz5Lqn5ZOB5Zu+54mHXHJcbiAqIEBwYXJhbSB7Kn0gc3VjY2VzcyBcclxuICovXHJcbmNvbnN0IHVwbG9hZEZpbGUgPSAoZmlsZVBhdGhzLCBzdWNjZXNzVXAsIGZhaWxVcCwgaSwgbGVuZ3RoLCBzY291cmVJZCwgdXNlcklkLHNvdXJjZVR5cGUsIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdhYWEnLHN1Y2Nlc3MpO1xyXG4gICAgLy8gbGV0IGZuID0gc3VjY2VzcztcclxuICAgIGxldCB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL2ZpbGUvdXBsb2FkRmlsZVwiO1xyXG4gICAgd3gudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgZmlsZVBhdGg6IGZpbGVQYXRoc1tpXSxcclxuICAgICAgICBoZWFkZXI6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLCBkZXZUeXBlOiAxIH0sXHJcbiAgICAgICAgbmFtZTogJ2ZpbGUnLFxyXG4gICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICAgICdzY291cmVJZCc6IHNjb3VyZUlkLFxyXG4gICAgICAgICAgICAndXNlcklkJzogdXNlcklkLFxyXG4gICAgICAgICAgICAnZmlsZVR5cGUnOiAxLC8v5Zu+54mHXHJcbiAgICAgICAgICAgICdzb3VyY2VUeXBlJzogc291cmNlVHlwZSxcclxuICAgICAgICAgICAgJ2RldlR5cGUnOiAxLFxyXG4gICAgICAgICAgICAnbGVuZ3RoJzogbGVuZ3RoLFxyXG4gICAgICAgICAgICAnY291bnQnOiBpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiAocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICBzdWNjZXNzVXArKztcclxuICAgICAgICAgICAgLy8gc3VjY2VzcyhzdWNjZXNzVXApXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGZhaWxVcCsrO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncmVzJywgcmVzKTtcclxuICAgICAgICAgICAgdGlwLnNob3dUb2FzdCgn6LKM5Ly8572R57uc5LiN5aW95ZOm77yB6K+35Zyo572R57uc6aG655WF55qE5pe25YCZ6YeN5paw5pON5L2c77yBJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wbGV0ZTogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWE9JywgaSwgbGVuZ3RoKTtcclxuICAgICAgICAgICAgaWYgKGkgPT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWNoZS5zZXQoXCJudW15XCIsbGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgdGlwLnNob3dUb2FzdCgn5oC75YWxJyArIHN1Y2Nlc3NVcCArICflvKDkuIrkvKDmiJDlip8sJyArIGZhaWxVcCArICflvKDkuIrkvKDlpLHotKXvvIEnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tMScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7ICAvL+mAkuW9kuiwg+eUqHVwbG9hZERJWeWHveaVsFxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3VjY2VzcyxcInR0eXl5XCIpXHJcbiAgICAgICAgICAgICAgICB1cGxvYWRGaWxlKGZpbGVQYXRocywgc3VjY2Vzc1VwLCBmYWlsVXAsIGksIGxlbmd0aCwgc2NvdXJlSWQsIHVzZXJJZCxzb3VyY2VUeXBlLHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog5Yig6Zmk5Zu+54mHXHJcbiAqIEBwYXJhbSB7Kn0gc2NvdXJlSWQgU07noIFcclxuICogQHBhcmFtIHsqfSB1c2VySWQg55So5oi3SWRcclxuICogQHBhcmFtIHsqfSBzb3VyY2VUeXBlIOWbvueJh+exu+Wei1xyXG4gKiBAcGFyYW0geyp9IHNvdXJjZU9iaiBcclxuICogQHBhcmFtIHsqfSBzdWNjZXNzIFxyXG4gKi9cclxuY29uc3QgZGVsZXRlRmlsZSA9IChzY291cmVJZCx1c2VySWQsc291cmNlVHlwZSwgc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7XHJcbiAgICBsZXQgdXJsID0gYmFzZVVybCArIHZlcnNpb25TdHIgKyBcIi9maWxlL2RlbGV0ZUZpbGVcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHsgdXNlcklkOiB1c2VySWQsIHNjb3VyZUlkOiBzY291cmVJZCwgc291cmNlVHlwZTogc291cmNlVHlwZSB9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKVxyXG59XHJcblxyXG4vKipcclxuICog5LqS5Yqo6Zu36L6+XHJcbiAqIEBwYXJhbSB7Kn0gb2Zmc2V0ICAgXHJcbiAqIEBwYXJhbSB7Kn0gbGltaXQgICBcclxuICogQHBhcmFtIHsqfSBzb3VyY2VPYmogXHJcbiAqIEBwYXJhbSB7Kn0gc3VjY2VzcyBcclxuICovXHJcbmNvbnN0IGxpc3QgPSAodXNlcklkLG9mZnNldCwgbGltaXQsIHNvdXJjZU9iaiwgc3VjY2VzcyA9ICgpID0+IHsgfSkgID0+e1xyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvY2FyZC9saXN0XCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7dXNlcklkOnVzZXJJZCwgb2Zmc2V0OiBvZmZzZXQsIGxpbWl0OiBsaW1pdCB9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG4vKipcclxuICog5YiG57uE5ZCN54mH5YiX6KGoXHJcbiAqIEBwYXJhbSB7Kn0gdXNlcklkICAg55So5oi3SURcclxuICogQHBhcmFtIHsqfSBncm91cElkIOWIhue7hElkXHJcbiAqIEBwYXJhbSB7Kn0gc291cmNlT2JqIFxyXG4gKiBAcGFyYW0geyp9IHN1Y2Nlc3MgXHJcbiAqL1xyXG5jb25zdCBteUNvbGxlY3Rpb25MaXN0ID0odXNlcklkLCBncm91cElkLCBvZmZzZXQsIGxpbWl0LCBzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL2NhcmQvbXlDb2xsZWN0aW9uTGlzdFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwgeyBvZmZzZXQ6IG9mZnNldCwgbGltaXQ6IGxpbWl0LCB1c2VySWQ6IHVzZXJJZCwgZ3JvdXBJZDogZ3JvdXBJZCB9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOiiq+aUtuiXj++8jOeCuei1nu+8jOmYheivu+WIl+ihqFxyXG4gKiBAcGFyYW0geyp9IG9wZXJhdGlvblR5cGUgMTrooqvmlLbol48gMjrooqvngrnotZ46MzrooqvpmIXor7s06L2s5Y+RXHJcbiAqIEBwYXJhbSB7Kn0gdXNlcklkIOeZu+W9leeUqOaIt0lEIFxyXG4gKiBAcGFyYW0geyp9IG9mZnNldCBcclxuICogQHBhcmFtIHsqfSBsaW1pdCBcclxuICovXHJcbmNvbnN0IG9wZXJhdGlvbkxpc3QgPSggb3BlcmF0aW9uVHlwZSwgdXNlcklkLCBvZmZzZXQsIGxpbWl0LCBzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL2NhcmQvb3BlcmF0aW9uTGlzdFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwgeyBvZmZzZXQ6IG9mZnNldCwgbGltaXQ6IGxpbWl0LCBvcGVyYXRpb25UeXBlOiBvcGVyYXRpb25UeXBlLCB1c2VySWQ6IHVzZXJJZCB9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG4vKipcclxuICog5ZCN54mH6K+m5oOFXHJcbiAqIEBwYXJhbSB7Kn0gZm9ybVVzZXJJZCDnmbvlvZXnlKjmiLdcclxuICogQHBhcmFtIHsqfSB1aWQg5ZCN54mHSUQgXHJcbiAqL1xyXG5jb25zdCBjYXJkRGV0YWlscyA9KGZvcm1Vc2VySWQsdWlkLCBzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL2NhcmQvY2FyZERldGFpbHNcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHsgZm9ybVVzZXJJZDogZm9ybVVzZXJJZCwgdWlkOiB1aWQgfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbn1cclxuLyoqXHJcbiAqIOeCuei1nu+8jOa1j+iniFxyXG4gKiBAcGFyYW0geyp9IHVzZXJJZCDnmbvorrDnlKjmiLdcclxuICogQHBhcmFtIHsqfSBjYXJkSWQg5ZCN54mHSURcclxuICogQHBhcmFtIHsqfSBvcGVyYXRpb25UeXBlIDI654K56LWeOjM66ZiF6K+7LDQ65YiG5LqrXHJcbiAqIEBwYXJhbSB7Kn0gc291cmNlT2JqIFxyXG4gKiBAcGFyYW0geyp9IHN1Y2Nlc3MgXHJcbiAqL1xyXG5jb25zdCBjYXJkT3BlcmF0aW9uID0odXNlcklkLGNhcmRJZCxvcGVyYXRpb25UeXBlLCBzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL2NhcmQvY2FyZE9wZXJhdGlvblwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwgeyB1c2VySWQ6IHVzZXJJZCwgY2FyZElkOiBjYXJkSWQsIG9wZXJhdGlvblR5cGU6IG9wZXJhdGlvblR5cGUgfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbn1cclxuLyoqXHJcbiAqIOWPlua2iOeCuei1nlxyXG4gKiBAcGFyYW0geyp9IHVzZXJJZCDnmbvorrDnlKjmiLdcclxuICogQHBhcmFtIHsqfSBjYXJkSWQg5ZCN54mHSURcclxuICogQHBhcmFtIHsqfSBvcGVyYXRpb25UeXBlIDI654K56LWeXHJcbiAqIEBwYXJhbSB7Kn0gc291cmNlT2JqIFxyXG4gKiBAcGFyYW0geyp9IHN1Y2Nlc3MgXHJcbiAqL1xyXG5jb25zdCBkZWxDYXJkT3BlcmF0aW9uID0odXNlcklkLGNhcmRJZCxvcGVyYXRpb25UeXBlLCBzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL2NhcmQvZGVsQ2FyZE9wZXJhdGlvblwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwgeyB1c2VySWQ6IHVzZXJJZCwgY2FyZElkOiBjYXJkSWQsIG9wZXJhdGlvblR5cGU6IG9wZXJhdGlvblR5cGUgfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbn1cclxuXHJcbi8v5ZWG5Z+O6aaW6aG15pWw5o2u5o6l5Y+jXHJcbmNvbnN0IGluZGV4c2ggPShzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCc9PT09PT09PT09PT09PT09PT09PT09PT09JylcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvaW5kZXhcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHt9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG4vKipcclxuICog5ZOB54mM6K+m5oOFXHJcbiAqIEBwYXJhbSB7Kn0gaWQgIOeCueWHu+aXtuaQuuW4pueahGlkXHJcbiAqIEBwYXJhbSB7Kn0gc291cmNlT2JqIFxyXG4gKiBAcGFyYW0geyp9IHN1Y2Nlc3MgXHJcbiAqL1xyXG5jb25zdCBCcmFuZERldGFpbCA9KGlkLHNvdXJjZU9iaiwgc3VjY2VzcyA9ICgpID0+IHsgfSkgPT4ge1xyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvc2hvcC9icmFuZERldGFpbFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge2lkOmlkfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbn1cclxuLy/ojrflvpfllYblk4HliJfooahcclxuY29uc3QgQ2F0YWxvZ0xpc3QgPShpZCxwYWdlLHNpemUsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7XHJcbiAgICB2YXIgdXJsID0gYmFzZVVybCArIHZlcnNpb25TdHIgKyBcIi9zaG9wL2NhdGFsb2dcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHticmFuZElkOmlkLG9mZnNldDpwYWdlLGxpbWl0OnNpemV9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG4vL+iOt+W+l+WIhuexu+aVsOaNrlxyXG5jb25zdCBHb29kc0NhdGVnb3J5ID0oaWQsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7XHJcbiAgICB2YXIgdXJsID0gYmFzZVVybCArIHZlcnNpb25TdHIgKyBcIi9zaG9wL2NhdGVnb3J5XCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7aWQ6aWR9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG4vL+iOt+W+l+WIhuexu+aVsOaNrlxyXG4vKipcclxuICogIGNhdGVnb3J5SWQ65YiG57G7aWQgICBicmFuZElk77ya5ZOB54mMaWQgIGtleXdvcmTvvJrlhbPplK7lrZfmkJzntKIgQm9vbGVhbiBpc05ld++8mjHmnIDmlrAsIEJvb2xlYW4gaXNIb3TvvJox5pyA54OtXHJcbiAqICoqL1xyXG5jb25zdCBHb29kc0xpc3QgPShjYXRlZ29yeUlkLGJyYW5kSWQsa2V5d29yZCxpc05ldyxpc0hvdCxvcmRlcixzb3J0LG9mZnNldCxsaW1pdCxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvbGlzdFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge2NhdGVnb3J5SWQ6Y2F0ZWdvcnlJZCxicmFuZElkOmJyYW5kSWQsa2V5d29yZDprZXl3b3JkLGlzTmV3OmlzTmV3LGlzSG90OmlzSG90LG9yZGVyOm9yZGVyLHNvcnQ6c29ydCxvZmZzZXQ6b2Zmc2V0LGxpbWl0OmxpbWl0fSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbn1cclxuLy/ojrflvpfllYblk4HnmoTor6bmg4VcclxuY29uc3QgR29vZHNEZXRhaWwgPShpZCxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvZGV0YWlsXCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7aWQ6aWR9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG4vL+WVhuWTgeivpuaDhemhteeahOWFs+iBlOWVhuWTge+8iOWkp+WutumDveWcqOeci++8iVxyXG5jb25zdCBHb29kc1JlbGF0ZWQgPShpZCxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvcmVsYXRlZFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge2lkOmlkfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbn1cclxuLy/ojrflj5botK3nianovabllYblk4Hku7bmlbBcclxuY29uc3QgQ2FydEdvb2RzQ291bnQgPShzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHtcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvY2FydEdvb2RzY291bnRcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHt9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG4vL+eri+WNs+i0reS5sOWVhuWTgVxyXG5jb25zdCBDYXJ0RmFzdEFkZCA9KGdvb2RzSWQsbnVtYmVyLHByb2R1Y3RJZCxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHsgIFxyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvc2hvcC9jYXJ0RmFzdGFkZFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge2dvb2RzSWQ6Z29vZHNJZCxudW1iZXI6bnVtYmVyLHByb2R1Y3RJZDpwcm9kdWN0SWR9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG5cclxuLy/mt7vliqDllYblk4HliLDotK3nianovaYgXHJcbmNvbnN0IENhcnRBZGQgPShnb29kc0lkLG51bWJlcixwcm9kdWN0SWQsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvY2FydEFkZFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge2dvb2RzSWQ6Z29vZHNJZCxudW1iZXI6bnVtYmVyLHByb2R1Y3RJZDpwcm9kdWN0SWR9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG4vL+a3u+WKoOaIluWPlua2iOaUtuiXj1xyXG5jb25zdCBDb2xsZWN0QWRkT3JEZWxldGUgPSh2YWx1ZUlkLHR5cGUsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIGNvbnNvbGUubG9nKHZhbHVlSWQsdHlwZSxzdWNjZXNzKVxyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvc2hvcC9hZGRvcmRlbGV0ZVwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge3ZhbHVlSWQ6dmFsdWVJZCx0eXBlOnR5cGV9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG4vL+aUtuiXj+WIl+ihqFxyXG5jb25zdCBDb2xsZWN0TGlzdCA9KHR5cGUsb2Zmc2V0LGxpbWl0LHNvdXJjZU9iaiwgc3VjY2VzcyA9ICgpID0+IHsgfSkgPT4geyBcclxuICAgIC8vIGNvbnNvbGUubG9nKHVzZXJJZCx0eXBlLG9mZnNldCxsaW1pdCxzdWNjZXNzKSBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvY29sbGVjdExpc3RcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHt0eXBlOnR5cGUsb2Zmc2V0Om9mZnNldCxsaW1pdDpsaW1pdH0sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pO1xyXG59XHJcblxyXG4vLyBDb2xsZWN0TGlzdDogV3hBcGlSb290ICsgJ3Nob3AvY29sbGVjdExpc3QnLCAvL+aUtuiXj+WIl+ihqCBcclxuXHJcbi8v5LiT6aKY6K+m5oOFXHJcbmNvbnN0IFRvcGljRGV0YWlsID0oaWQsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvdG9waWNEZXRhaWxcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHtpZDppZH0sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pO1xyXG59XHJcblxyXG4vL+ebuOWFs+S4k+mimFxyXG5jb25zdCBUb3BpY1JlbGF0ZWQgPShpZCxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHsgIFxyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvc2hvcC90b3BpY1JlbGF0ZWRcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHtpZDppZH0sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pO1xyXG59XHJcblxyXG4vL+ivhOiuuuWIl+ihqFxyXG5jb25zdCBDb21tZW50TGlzdCA9KHZhbHVlSWQsdHlwZSxwYWdlLHNpemUsc2hvd1R5cGUsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvY29tbWVudExpc3RcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHt2YWx1ZUlkOnZhbHVlSWQsdHlwZUlkOnR5cGUsc2hvd1R5cGU6c2hvd1R5cGUsb2Zmc2V0OnBhZ2UsbGltaXQ6c2l6ZX0sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pO1xyXG59XHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLei0reeJqei9puWFqOmDqOaOpeWPo1xyXG5cclxuLy/ojrflj5botK3nianovabnmoTmlbDmja5cclxuY29uc3QgQ2FydExpc3QgPShzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHsgIFxyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvc2hvcC9jYXJ0SW5kZXhcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHt9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG5cclxuLy/pgInmi6nmiJblj5bmtojpgInmi6nllYblk4FcclxuY29uc3QgQ2FydENoZWNrZWQgPShwcm9kdWN0SWRzLGlzQ2hlY2tlZCxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHsgIFxyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvc2hvcC9jYXJ0Q2hlY2tlZFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge3Byb2R1Y3RJZHM6cHJvZHVjdElkcyxpc0NoZWNrZWQ6aXNDaGVja2VkfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbn1cclxuLy/mm7TmlrDotK3nianovabnmoTllYblk4FcclxuY29uc3QgQ2FydFVwZGF0ZSA9KHByb2R1Y3RJZCxnb29kc0lkLG51bWJlcixpZCxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHsgIFxyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvc2hvcC9jYXJ0VXBkYXRlXCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7cHJvZHVjdElkOnByb2R1Y3RJZCxnb29kc0lkOmdvb2RzSWQsbnVtYmVyOm51bWJlcixpZDppZH0sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pO1xyXG59XHJcbi8v5Yig6Zmk6LSt54mp6L2m55qE5ZWG5ZOBXHJcbmNvbnN0IENhcnREZWxldGUgPShwcm9kdWN0SWRzLHNvdXJjZU9iaiwgc3VjY2VzcyA9ICgpID0+IHsgfSkgPT4geyAgXHJcbiAgICB2YXIgdXJsID0gYmFzZVVybCArIHZlcnNpb25TdHIgKyBcIi9zaG9wL2NhcnREZWxldGVcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHtwcm9kdWN0SWRzOnByb2R1Y3RJZHN9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3loavlhpnorqLljZXlhajpg6jmjqXlj6NcclxuLy8g5LiL5Y2V5YmN5L+h5oGv56Gu6K6kXHJcbmNvbnN0IENhcnRDaGVja291dCA9KGNhcnRJZCxhZGRyZXNzSWQsY291cG9uSWQsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvY2FydENoZWNrb3V0XCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7Y2FydElkOmNhcnRJZCxhZGRyZXNzSWQ6YWRkcmVzc0lkLGNvdXBvbklkOmNvdXBvbklkfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbn1cclxuXHJcbi8vIOaPkOS6pOiuouWNlVxyXG5jb25zdCBPcmRlclN1Ym1pdCA9KGNhcnRJZCxhZGRyZXNzSWQsY291cG9uSWQsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3Avb3JkZXIvc3VibWl0XCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7Y2FydElkOmNhcnRJZCxhZGRyZXNzSWQ6YWRkcmVzc0lkLGNvdXBvbklkOmNvdXBvbklkfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbn1cclxuXHJcbi8vIOiuouWNleeahOmihOaUr+S7mOS8muivnVxyXG5jb25zdCBPcmRlclByZXBheSA9KG9yZGVySWQsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3Avb3JkZXIvcHJlcGF5XCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7b3JkZXJJZDpvcmRlcklkfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5Zyw5Z2A5YWo6YOo5o6l5Y+jXHJcbi8v5pS26LSn5Zyw5Z2A5YiX6KGoXHJcbmNvbnN0IEFkZHJlc3NMaXN0ID0oc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvYWRkcmVzc0xpc3RcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHt9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG4vL+WIoOmZpOaUtui0p+WcsOWdgFxyXG5jb25zdCBBZGRyZXNzRGVsZXRlID0oaWQsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIC8vIGNvbnNvbGUubG9nKHVzZXJJZCxpZCxzb3VyY2VPYmosc3VjY2VzcylcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvYWRkcmVzc0RlbGV0ZVwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge2lkOmlkfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbn1cclxuLy/mlLbotKflnLDlnYDor6bmg4VcclxuY29uc3QgQWRkcmVzc0RldGFpbCA9KGlkLHNvdXJjZU9iaiwgc3VjY2VzcyA9ICgpID0+IHsgfSkgPT4geyAgXHJcbiAgICB2YXIgdXJsID0gYmFzZVVybCArIHZlcnNpb25TdHIgKyBcIi9zaG9wL2FkZHJlc3NEZXRhaWxcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHtpZDppZH0sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pO1xyXG59XHJcbi8v6I635Y+W5Yy65Z+f5YiX6KGoXHJcbmNvbnN0IFJlZ2lvbkxpc3QgPShwaWQsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvcmVnaW9uTGlzdFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge3BpZDpwaWR9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG4vL+S/neWtmOaUtui0p+WcsOWdgFxyXG5jb25zdCBBZGRyZXNzU2F2ZSA9KGlkLG5hbWUsbW9iaWxlLHByb3ZpbmNlSWQsY2l0eUlkLGFyZWFJZCxhZGRyZXNzLGlzRGVmYXVsdCxwcm92aW5jZU5hbWUsY2l0eU5hbWUsY291bnR5TmFtZSxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHsgIFxyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvc2hvcC9hZGRyZXNzU2F2ZVwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge2lkOmlkLG5hbWU6bmFtZSxtb2JpbGU6bW9iaWxlLHByb3ZpbmNlSWQ6cHJvdmluY2VJZCxjaXR5SWQ6Y2l0eUlkLGFyZWFJZDphcmVhSWQsYWRkcmVzczphZGRyZXNzLGlzRGVmYXVsdDppc0RlZmF1bHQscHJvdmluY2VOYW1lOnByb3ZpbmNlTmFtZSxjaXR5TmFtZTpjaXR5TmFtZSxjb3VudHlOYW1lOmNvdW50eU5hbWV9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3or4Torrrlhajpg6jmjqXlj6NcclxuLy/or4TorrrmgLvmlbBcclxuY29uc3QgQ29tbWVudENvdW50ID0odmFsdWVJZCx0eXBlLHNpemUscGFnZSxzaG93VHlwZSxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHsgIFxyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvc2hvcC9jb21tZW50Q291bnRcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHt2YWx1ZUlkOnZhbHVlSWQsdHlwZUlkOnR5cGUsc2l6ZTpzaXplLHBhZ2U6cGFnZSxzaG93VHlwZTpzaG93VHlwZX0sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pO1xyXG59XHJcbi8v5Zu+54mH5LiK5LygXHJcbi8vIGxvZ2VydHlwZSA9IDE0IOivhOiuuuWbvueJhyBcclxuY29uc3QgU3RvcmFnZVVwbG9hZCA9KHNvdXJjZU9iaiwgc3VjY2VzcyA9ICgpID0+IHsgfSkgPT4geyAgXHJcbiAgICB2YXIgdXJsID0gYmFzZVVybCArIHZlcnNpb25TdHIgKyBcIi9zdG9yYWdlL3VwbG9hZFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge30sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pO1xyXG59XHJcbi8v5Y+R6KGo6K+E6K66XHJcbmNvbnN0IENvbW1lbnRQb3N0ID0odXNlcklkLHR5cGVJZCx2YWx1ZUlkLGNvbnRlbnQsc3RhcixoYXNQaWN0dXJlLHBpY1VybHMsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvY29tbWVudFBvc3RcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHt1c2VySWQ6dXNlcklkLHR5cGVJZDp0eXBlSWQsdmFsdWVJZDp2YWx1ZUlkLGNvbnRlbnQ6Y29udGVudCxzdGFyOnN0YXIsaGFzUGljdHVyZTpoYXNQaWN0dXJlLHBpY1VybHM6cGljVXJsc30sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pO1xyXG59XHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3orqLljZXlpITnkIblhajpg6jmjqXlj6NcclxuIC8v6K6i5Y2V5YiX6KGoXHJcbmNvbnN0IE9yZGVyTGlzdCA9KHVzZXJJZCxzaG93VHlwZSxvZmZzZXQsbGltaXQsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3Avb3JkZXIvbGlzdFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge3VzZXJJZDp1c2VySWQsc2hvd1R5cGU6c2hvd1R5cGUsb2Zmc2V0Om9mZnNldCxsaW1pdDpsaW1pdH0sIHNvdXJjZU9iaiwgc3VjY2VzcywgZmFpbEZ1biwgY29tcGxldGVGdW4pO1xyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLei2s+i/ueWIl+ihqOWFqOmDqOaOpeWPo1xyXG4gLy/otrPov7nliJfooahcclxuIGNvbnN0IEZvb3RwcmludExpc3QgPSh1c2VySWQsb2Zmc2V0LGxpbWl0LHNvdXJjZU9iaiwgc3VjY2VzcyA9ICgpID0+IHsgfSkgPT4geyAgXHJcbiAgICB2YXIgdXJsID0gYmFzZVVybCArIHZlcnNpb25TdHIgKyBcIi9zaG9wL2Zvb3RQcmludExpc3RcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHt1c2VySWQ6dXNlcklkLG9mZnNldDpvZmZzZXQsbGltaXQ6bGltaXR9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxuICB9XHJcbi8v5Yig6Zmk6Laz6L+5XHJcbmNvbnN0IEZvb3RwcmludERlbGV0ZSA9KGZvb3RwcmludElkLHNvdXJjZU9iaiwgc3VjY2VzcyA9ICgpID0+IHsgfSkgPT4geyAgXHJcbiAgICB2YXIgdXJsID0gYmFzZVVybCArIHZlcnNpb25TdHIgKyBcIi9zaG9wL2Zvb3RQcmludERlbGV0ZVwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge2Zvb3RwcmludElkOmZvb3RwcmludElkfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbiAgfVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3orqLljZXor6bmg4Xlhajpg6jmjqXlj6NcclxuLy/nianmtYHmn6Xor6JcclxuY29uc3QgRXhwcmVzc1F1ZXJ5ID0oZXhwQ29kZSxleHBObyxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHsgICAgLy/lvoXlrozmiJBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvZXhwcmVzc1F1ZXJ5XCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7ZXhwQ29kZTpleHBDb2RlLGV4cE5vOmV4cE5vfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbiAgfVxyXG4vL+iuouWNleivpuaDhVxyXG5jb25zdCBPcmRlckRldGFpbCA9KG9yZGVySWQsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3Avb3JkZXIvZGV0YWlsXCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7b3JkZXJJZDpvcmRlcklkfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbiAgfVxyXG4gIC8v5Y+W5raI6K6i5Y2VXHJcbmNvbnN0IE9yZGVyQ2FuY2VsID0ob3JkZXJJZCxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHsgIFxyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvc2hvcC9vcmRlci9jYW5jZWxcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHtvcmRlcklkOm9yZGVySWR9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxuICB9XHJcbiAgIC8v6YCA5qy+5Y+W5raI6K6i5Y2VXHJcbmNvbnN0IE9yZGVyUmVmdW5kID0ob3JkZXJJZCxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHsgIFxyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvc2hvcC9vcmRlci9yZWZ1bmRcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHtvcmRlcklkOm9yZGVySWR9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxuICB9XHJcbiAgICAvL+WIoOmZpOiuouWNlVxyXG5jb25zdCBPcmRlckRlbGV0ZSA9KG9yZGVySWQsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3Avb3JkZXIvZGVsZXRlXCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7b3JkZXJJZDpvcmRlcklkfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbiAgfVxyXG4gICAgLy/noa7orqTmlLbotKdcclxuY29uc3QgT3JkZXJDb25maXJtID0ob3JkZXJJZCxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHsgIFxyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvc2hvcC9vcmRlci9jb25maXJtXCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7b3JkZXJJZDpvcmRlcklkfSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbiAgfVxyXG4gICAvL+S7o+ivhOS7t+WVhuWTgeS/oeaBr1xyXG5jb25zdCBPcmRlckNvbW1lbnQgPShvcmRlcklkLGdvb2RzSWQsc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3Avb3JkZXIvY29tbWVudFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge29yZGVySWQ6b3JkZXJJZCxnb29kc0lkOmdvb2RzSWR9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxuICB9XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgIC8v5paw5ZOBXHJcbmNvbnN0IEdvb2RzTmV3ID0oc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvbmV3XCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7fSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbiAgfVxyXG4gICAgIC8v5LiT6aKY5YiX6KGoXHJcbmNvbnN0IFRvcGljTGlzdCA9KG9mZnNldCxsaW1pdCxzb3VyY2VPYmosIHN1Y2Nlc3MgPSAoKSA9PiB7IH0pID0+IHsgIFxyXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2ZXJzaW9uU3RyICsgXCIvc2hvcC90b3BpY0xpc3RcIjtcclxuICAgIGluZGV4VXJscy5yZXF1ZXN0UG9zdEFwaSh1cmwsIHtvZmZzZXQ6b2Zmc2V0LGxpbWl0OmxpbWl0fSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbiAgfVxyXG4gIC8v5ZOB54mM5YiX6KGoXHJcbiAgY29uc3QgQnJhbmRMaXN0ID0ob2Zmc2V0LGxpbWl0LHNvdXJjZU9iaiwgc3VjY2VzcyA9ICgpID0+IHsgfSkgPT4geyAgXHJcbiAgICB2YXIgdXJsID0gYmFzZVVybCArIHZlcnNpb25TdHIgKyBcIi9zaG9wL2JyYW5kTGlzdFwiO1xyXG4gICAgaW5kZXhVcmxzLnJlcXVlc3RQb3N0QXBpKHVybCwge29mZnNldDpvZmZzZXQsbGltaXQ6bGltaXR9LCBzb3VyY2VPYmosIHN1Y2Nlc3MsIGZhaWxGdW4sIGNvbXBsZXRlRnVuKTtcclxuICB9XHJcbiAgIC8v54Ot6ZeoXHJcbiAgIGNvbnN0IEdvb2RzSG90ID0oc291cmNlT2JqLCBzdWNjZXNzID0gKCkgPT4geyB9KSA9PiB7ICBcclxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmVyc2lvblN0ciArIFwiL3Nob3AvaG90XCI7XHJcbiAgICBpbmRleFVybHMucmVxdWVzdFBvc3RBcGkodXJsLCB7fSwgc291cmNlT2JqLCBzdWNjZXNzLCBmYWlsRnVuLCBjb21wbGV0ZUZ1bik7XHJcbiAgfVxyXG5cclxuLy8gICBHb29kc0hvdDogV3hBcGlSb290ICsgJ2dvb2RzL2hvdCcsIC8v54Ot6ZeoIDFcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAvKirmlrnms5UgKi9cclxuICAgIHRhZ2xpc3Q6IHRhZ2xpc3QsXHJcbiAgICBwcm9saXN0OiBwcm9saXN0LFxyXG4gICAgYWRkR3JvdXA6IGFkZEdyb3VwLFxyXG4gICAgdXBkYXRlR3JvdXA6IHVwZGF0ZUdyb3VwLFxyXG4gICAgZGVsR3JvdXA6IGRlbEdyb3VwLFxyXG4gICAgZ3JvdXBMaXN0OiBncm91cExpc3QsXHJcbiAgICBteUNhcmRMaXN0OiBteUNhcmRMaXN0LFxyXG4gICAgYWRkQ2FyZDogYWRkQ2FyZCxcclxuICAgIHVwZGF0ZUNhcmQ6IHVwZGF0ZUNhcmQsXHJcbiAgICBkZWxNeUNhcmQ6IGRlbE15Q2FyZCxcclxuICAgIGdldFByb2R1Y3RTTjogZ2V0UHJvZHVjdFNOLFxyXG4gICAgdXBsb2FkRmlsZTogdXBsb2FkRmlsZSxcclxuICAgIGxpc3Q6IGxpc3QsXHJcbiAgICBteUNvbGxlY3Rpb25MaXN0OiBteUNvbGxlY3Rpb25MaXN0LFxyXG4gICAgaW5kdXN0cnlMaXN0OiBpbmR1c3RyeUxpc3QsXHJcbiAgICBvcGVyYXRpb25MaXN0OiBvcGVyYXRpb25MaXN0LFxyXG4gICAgY2FyZERldGFpbHM6IGNhcmREZXRhaWxzLFxyXG4gICAgZGVsZXRlRmlsZTogZGVsZXRlRmlsZSxcclxuICAgIGNhcmRPcGVyYXRpb246IGNhcmRPcGVyYXRpb24sXHJcbiAgICBkZWxDYXJkT3BlcmF0aW9uOiBkZWxDYXJkT3BlcmF0aW9uLFxyXG4gICAgQnJhbmREZXRhaWw6QnJhbmREZXRhaWwsXHJcbiAgICBpbmRleHNoOmluZGV4c2gsXHJcbiAgICBDYXRhbG9nTGlzdDpDYXRhbG9nTGlzdCxcclxuICAgIEdvb2RzQ2F0ZWdvcnk6R29vZHNDYXRlZ29yeSxcclxuICAgIEdvb2RzRGV0YWlsOkdvb2RzRGV0YWlsLFxyXG4gICAgR29vZHNSZWxhdGVkOkdvb2RzUmVsYXRlZCxcclxuICAgIENhcnRHb29kc0NvdW50OkNhcnRHb29kc0NvdW50LFxyXG4gICAgQ29sbGVjdEFkZE9yRGVsZXRlOkNvbGxlY3RBZGRPckRlbGV0ZSxcclxuICAgIENhcnRGYXN0QWRkOkNhcnRGYXN0QWRkLFxyXG4gICAgQ2FydEFkZDpDYXJ0QWRkLFxyXG4gICAgVG9waWNEZXRhaWw6VG9waWNEZXRhaWwsXHJcbiAgICBUb3BpY1JlbGF0ZWQ6VG9waWNSZWxhdGVkLFxyXG4gICAgQ29tbWVudExpc3Q6Q29tbWVudExpc3QsXHJcbiAgICBDYXJ0TGlzdDpDYXJ0TGlzdCxcclxuICAgIENhcnRDaGVja2VkOkNhcnRDaGVja2VkLFxyXG4gICAgQ2FydFVwZGF0ZTpDYXJ0VXBkYXRlLFxyXG4gICAgQ2FydERlbGV0ZTpDYXJ0RGVsZXRlLFxyXG4gICAgQ2FydENoZWNrb3V0OkNhcnRDaGVja291dCxcclxuICAgIE9yZGVyU3VibWl0Ok9yZGVyU3VibWl0LFxyXG4gICAgT3JkZXJQcmVwYXk6T3JkZXJQcmVwYXksXHJcbiAgICBBZGRyZXNzTGlzdEw6QWRkcmVzc0xpc3QsXHJcbiAgICBBZGRyZXNzRGVsZXRlOkFkZHJlc3NEZWxldGUsXHJcbiAgICBBZGRyZXNzRGV0YWlsOkFkZHJlc3NEZXRhaWwsXHJcbiAgICBSZWdpb25MaXN0OlJlZ2lvbkxpc3QsXHJcbiAgICBBZGRyZXNzU2F2ZTpBZGRyZXNzU2F2ZSxcclxuICAgIENvbW1lbnRDb3VudDpDb21tZW50Q291bnQsXHJcbiAgICBTdG9yYWdlVXBsb2FkOlN0b3JhZ2VVcGxvYWQsXHJcbiAgICBDb21tZW50UG9zdDpDb21tZW50UG9zdCxcclxuICAgIEdvb2RzTGlzdDpHb29kc0xpc3QsXHJcbiAgICBDb2xsZWN0TGlzdDpDb2xsZWN0TGlzdCxcclxuICAgIE9yZGVyTGlzdDpPcmRlckxpc3QsXHJcbiAgICBGb290cHJpbnRMaXN0OkZvb3RwcmludExpc3QsXHJcbiAgICBGb290cHJpbnREZWxldGU6Rm9vdHByaW50RGVsZXRlLFxyXG4gICAgRXhwcmVzc1F1ZXJ5OkV4cHJlc3NRdWVyeSxcclxuICAgIE9yZGVyRGV0YWlsOk9yZGVyRGV0YWlsLFxyXG4gICAgT3JkZXJDYW5jZWw6T3JkZXJDYW5jZWwsXHJcbiAgICBPcmRlclJlZnVuZDpPcmRlclJlZnVuZCxcclxuICAgIE9yZGVyRGVsZXRlOk9yZGVyRGVsZXRlLFxyXG4gICAgT3JkZXJDb25maXJtOk9yZGVyQ29uZmlybSxcclxuICAgIE9yZGVyQ29tbWVudDpPcmRlckNvbW1lbnQsXHJcbiAgICBHb29kc05ldzpHb29kc05ldyxcclxuICAgIFRvcGljTGlzdDpUb3BpY0xpc3QsXHJcbiAgICBCcmFuZExpc3Q6QnJhbmRMaXN0LFxyXG4gICAgR29vZHNIb3Q6R29vZHNIb3QsXHJcbiAgICAvKirlsZ7mgKcgKi9cclxuICAgIGdldFVzZXI6IGdldFVzZXIsXHJcbiAgICBiYXNlSW1nVXJsOiBiYXNlSW1nVXJsXHJcbn07Il19