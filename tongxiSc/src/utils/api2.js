
const indexUrls = require("../utils/request")
const tip = require("../utils/tip")
const cache = require("../utils/cache")
// public final static int SUCCESS = 1; // 成功
// public final static int WARN = 2; // 后端提醒
//public final static int ERROR = 3; // 系统错误
// public final static int TOKEN_OUT = 4; // 登录超时

let server = "https://www.tongxikj.com"//生产
let test = "https://www.tongxikj.com/my";//测试
let local = "http://localhost:8085";//本地
var baseUrl = test;
var versionStr = "/api/v1";

/**
 * 图片地址前缀
 */
const baseImgUrl = "http://lele.tongxikj.com";

const getUser = baseUrl + versionStr + '/user/updateUser';



const failFun = (e) => {
    console.log('接口调用失败', e);
}
const completeFun = (e) => {
    console.log('接口调用后执行成功', e);
}

/**
 * 标签列表
 * @param {*} tagType 1资讯标签
 * @param {*} tagStatus 1启用
 * @param {*} sourceObj 回调传参
 * @param {*} success 
 */
const taglist = (tagType, tagStatus, sourceObj, success = () => { }) => {
    let url = baseUrl + versionStr + "/card/tagList";
    indexUrls.requestPostApi(url, { tagType: tagType, tagStatus: tagStatus }, sourceObj, success, failFun, completeFun)
}

/**
 * 行业列表
 * @param {*} sourceObj 回调传参
 * @param {*} success 
 */
const industryList = (sourceObj, success = () => { }) => {
    let url = baseUrl + versionStr + "/card/industryList";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun)
}

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
const prolist = (tagCode, productType, formUserId, toUserId, limit, offset, sourceObj, success = () => { }) => {
    let url = baseUrl + versionStr + "/product/list";
    indexUrls.requestPostApi(url, {
        tagCode: tagCode, productType: productType, formUserId: formUserId, toUserId: toUserId
        , limit: limit, offset: offset
    }, sourceObj, success, failFun, completeFun)
}

/**
 * 添加分组
 * @param {*} groupName 组名
 * @param {*} userId 用户ID
 * @param {*} sourceObj 回调传参
 * @param {*} success 
 */
const addGroup = (groupName, userId, sourceObj, success = () => { }) => {
    let url = baseUrl + versionStr + "/card/addGroup";
    indexUrls.requestPostApi(url, { groupName: groupName, userId: userId }, sourceObj, success, failFun, completeFun)
}

/**
 * 修改组名
 * @param {*} uid 组标识
 * @param {*} groupName  组名
 * @param {*} userId 用户ID
 * @param {*} sourceObj 
 * @param {*} success 
 */
const updateGroup = (uid, groupName, userId, sourceObj, success = () => { }) => {
    let url = baseUrl + versionStr + "/card/updateGroup";
    indexUrls.requestPostApi(url, { groupName: groupName, userId: userId, uid: uid }, sourceObj, success, failFun, completeFun)
}

/**
 * 删除分组
 * @param {*} uid  组标识
 * @param {*} userId  用户ID
 * @param {*} sourceObj 
 * @param {*} success 
 */
const delGroup = (uid, userId, sourceObj, success = () => { }) => {
    let url = baseUrl + versionStr + "/card/delGroup";
    indexUrls.requestPostApi(url, { userId: userId, uid: uid }, sourceObj, success, failFun, completeFun)
}

/**
 * 我的分组列表
 * @param {*} userId   用户ID
 * @param {*} sourceObj 
 * @param {*} success 
 */
const groupList = (userId, sourceObj, success = () => { }) => {
    let url = baseUrl + versionStr + "/card/groupList";
    indexUrls.requestPostApi(url, { userId: userId }, sourceObj, success, failFun, completeFun)
}
/**
 * 我的名片列表
 * @param {*} userId   用户ID
 * @param {*} sourceObj 
 * @param {*} success 
 */
const myCardList = (userId, sourceObj,offset,limit,success = () => { }) => {
    let url = baseUrl + versionStr + "/card/myCardList";
    indexUrls.requestPostApi(url, { userId: userId }, sourceObj, success, failFun, completeFun)
}
/**
 * 删除我的名片
 * @param {*} userId   用户ID
 * @param {*} cardId   名片ID
 * @param {*} sourceObj 
 * @param {*} success 
 */
const delMyCard = (userId, cardId, sourceObj, success = () => { }) => {
    let url = baseUrl + versionStr + "/card/delMyCard";
    indexUrls.requestPostApi(url, { userId: userId, cardId: cardId }, sourceObj, success, failFun, completeFun)
}
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
const updateCard = (userId, cardId, name, cardPhone, cardTitle, company
    , website1, website2, companyTel, wxNo
    , tags, industryId, businessText, isPublic, userSignature, sourceObj, success = () => { }) => {
    let url = baseUrl + versionStr + "/card/updateCard";
    indexUrls.requestPostApi(url, {
        userId: userId, cardId: cardId,
        name: name, cardPhone: cardPhone, businessText: businessText,
        cardTitle: cardTitle, company: company, isPublic: isPublic,
        website1: website1, website2: website2, userSignature: userSignature,
        companyTel: companyTel, wxNo: wxNo,
        tags: tags, industryId: industryId
    }, sourceObj, success, failFun, completeFun)
}
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
const addCard = (cardSn, userId, name, cardPhone, cardTitle, company
    , website1, website2, companyTel, wxNo
    , tags, industryId, businessText, isPublic, userSignature, sourceObj, success = () => { }) => {
    let url = baseUrl + versionStr + "/card/addCard";
    indexUrls.requestPostApi(url, {
        userId: userId, cardSn: cardSn,
        name: name, cardPhone: cardPhone, businessText: businessText,
        cardTitle: cardTitle, company: company, isPublic: isPublic,
        website1: website1, website2: website2, userSignature: userSignature,
        companyTel: companyTel, wxNo: wxNo,
        tags: tags, industryId: industryId
    }, sourceObj, success, failFun, completeFun)
}
/**
 * 获取标识码
 * @param {*} userId 用户ID 
 * @param {*} type 类型2:名片
 * @param {*} success 
 * @param {*} fail 
 */
const getProductSN = (userId, type, sourceObj, success = () => { }) => {
    let url = baseUrl + versionStr + "/product/getProductSN";
    indexUrls.requestPostApi(url, { userId: userId, type: type }, sourceObj, success, failFun, completeFun)
}

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
const uploadFile = (filePaths, successUp, failUp, i, length, scoureId, userId,sourceType, success = () => { }) => {
    // console.log('aaa',success);
    // let fn = success;
    let url = baseUrl + versionStr + "/file/uploadFile";
    wx.uploadFile({
        url: url,
        filePath: filePaths[i],
        header: { 'Content-Type': 'application/x-www-form-urlencoded', devType: 1 },
        name: 'file',
        formData: {
            'scoureId': scoureId,
            'userId': userId,
            'fileType': 1,//图片
            'sourceType': sourceType,
            'devType': 1,
            'length': length,
            'count': i
        },
        success: (resp) => {
            successUp++;
            // success(successUp)
        },
        fail: (res) => {
            failUp++;
            // console.log('res', res);
            tip.showToast('貌似网络不好哦！请在网络顺畅的时候重新操作！');
        },
        complete: (res) => {
            i++;
            success(res)
            // console.log('aa=', i, length);
            if (i == length) {
                // cache.set("numy",length)
                tip.showToast('总共' + successUp + '张上传成功,' + failUp + '张上传失败！', function () {
                    // console.log('-----------------------------1');
                    success()
                });
            }
            else {  //递归调用uploadDIY函数
                // console.log(success,"ttyyy")
                uploadFile(filePaths, successUp, failUp, i, length, scoureId, userId,sourceType,success);
            }
        },
    });
}

/**
 * 删除图片
 * @param {*} scoureId SN码
 * @param {*} userId 用户Id
 * @param {*} sourceType 图片类型
 * @param {*} sourceObj 
 * @param {*} success 
 */
const deleteFile = (scoureId,userId,sourceType, sourceObj, success = () => { }) => {
    let url = baseUrl + versionStr + "/file/deleteFile";
    indexUrls.requestPostApi(url, { userId: userId, scoureId: scoureId, sourceType: sourceType }, sourceObj, success, failFun, completeFun)
}

/**
 * 互动雷达
 * @param {*} offset   
 * @param {*} limit   
 * @param {*} sourceObj 
 * @param {*} success 
 */
const list = (userId,offset, limit, sourceObj, success = () => { })  =>{
    var url = baseUrl + versionStr + "/card/list";
    indexUrls.requestPostApi(url, {userId:userId, offset: offset, limit: limit }, sourceObj, success, failFun, completeFun);
}
/**
 * 分组名片列表
 * @param {*} userId   用户ID
 * @param {*} groupId 分组Id
 * @param {*} sourceObj 
 * @param {*} success 
 */
const myCollectionList =(userId, groupId, offset, limit, sourceObj, success = () => { }) => {
    var url = baseUrl + versionStr + "/card/myCollectionList";
    indexUrls.requestPostApi(url, { offset: offset, limit: limit, userId: userId, groupId: groupId }, sourceObj, success, failFun, completeFun);
}

/**
 * 被收藏，点赞，阅读列表
 * @param {*} operationType 1:被收藏 2:被点赞:3:被阅读4转发
 * @param {*} userId 登录用户ID 
 * @param {*} offset 
 * @param {*} limit 
 */
const operationList =( operationType, userId, offset, limit, sourceObj, success = () => { }) => {
    var url = baseUrl + versionStr + "/card/operationList";
    indexUrls.requestPostApi(url, { offset: offset, limit: limit, operationType: operationType, userId: userId }, sourceObj, success, failFun, completeFun);
}
/**
 * 名片详情
 * @param {*} formUserId 登录用户
 * @param {*} uid 名片ID 
 */
const cardDetails =(formUserId,uid, sourceObj, success = () => { }) => {
    var url = baseUrl + versionStr + "/card/cardDetails";
    indexUrls.requestPostApi(url, { formUserId: formUserId, uid: uid }, sourceObj, success, failFun, completeFun);
}
/**
 * 点赞，浏览
 * @param {*} userId 登记用户
 * @param {*} cardId 名片ID
 * @param {*} operationType 2:点赞:3:阅读,4:分享
 * @param {*} sourceObj 
 * @param {*} success 
 */
const cardOperation =(userId,cardId,operationType, sourceObj, success = () => { }) => {
    var url = baseUrl + versionStr + "/card/cardOperation";
    indexUrls.requestPostApi(url, { userId: userId, cardId: cardId, operationType: operationType }, sourceObj, success, failFun, completeFun);
}
/**
 * 取消点赞
 * @param {*} userId 登记用户
 * @param {*} cardId 名片ID
 * @param {*} operationType 2:点赞
 * @param {*} sourceObj 
 * @param {*} success 
 */
const delCardOperation =(userId,cardId,operationType, sourceObj, success = () => { }) => {
    var url = baseUrl + versionStr + "/card/delCardOperation";
    indexUrls.requestPostApi(url, { userId: userId, cardId: cardId, operationType: operationType }, sourceObj, success, failFun, completeFun);
}

//商城首页数据接口
const indexsh =(sourceObj, success = () => { }) => {
    console.log('=========================')
    var url = baseUrl + versionStr + "/shop/index";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
}
/**
 * 品牌详情
 * @param {*} id  点击时携带的id
 * @param {*} sourceObj 
 * @param {*} success 
 */
const BrandDetail =(id,sourceObj, success = () => { }) => {
    var url = baseUrl + versionStr + "/shop/brandDetail";
    indexUrls.requestPostApi(url, {id:id}, sourceObj, success, failFun, completeFun);
}
//获得商品列表
const CatalogList =(id,page,size,sourceObj, success = () => { }) => {
    var url = baseUrl + versionStr + "/shop/catalog";
    indexUrls.requestPostApi(url, {brandId:id,offset:page,limit:size}, sourceObj, success, failFun, completeFun);
}
//获得分类数据
const GoodsCategory =(id,sourceObj, success = () => { }) => {
    var url = baseUrl + versionStr + "/shop/category";
    indexUrls.requestPostApi(url, {id:id}, sourceObj, success, failFun, completeFun);
}
//获得分类数据
/**
 *  categoryId:分类id   brandId：品牌id  keyword：关键字搜索 Boolean isNew：1最新, Boolean isHot：1最热
 * **/
const GoodsList =(categoryId,brandId,keyword,isNew,isHot,order,sort,offset,limit,sourceObj, success = () => { }) => {
    var url = baseUrl + versionStr + "/shop/list";
    indexUrls.requestPostApi(url, {categoryId:categoryId,brandId:brandId,keyword:keyword,isNew:isNew,isHot:isHot,order:order,sort:sort,offset:offset,limit:limit}, sourceObj, success, failFun, completeFun);
}
//获得商品的详情
const GoodsDetail =(id,sourceObj, success = () => { }) => {
    var url = baseUrl + versionStr + "/shop/detail";
    indexUrls.requestPostApi(url, {id:id}, sourceObj, success, failFun, completeFun);
}
//商品详情页的关联商品（大家都在看）
const GoodsRelated =(id,sourceObj, success = () => { }) => {
    var url = baseUrl + versionStr + "/shop/related";
    indexUrls.requestPostApi(url, {id:id}, sourceObj, success, failFun, completeFun);
}
//获取购物车商品件数
const CartGoodsCount =(sourceObj, success = () => { }) => {
    var url = baseUrl + versionStr + "/shop/cartGoodscount";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
}
//立即购买商品
const CartFastAdd =(goodsId,number,productId,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/cartFastadd";
    indexUrls.requestPostApi(url, {goodsId:goodsId,number:number,productId:productId}, sourceObj, success, failFun, completeFun);
}

//添加商品到购物车 
const CartAdd =(goodsId,number,productId,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/cartAdd";
    indexUrls.requestPostApi(url, {goodsId:goodsId,number:number,productId:productId}, sourceObj, success, failFun, completeFun);
}
//添加或取消收藏
const CollectAddOrDelete =(valueId,type,sourceObj, success = () => { }) => {  
    console.log(valueId,type,success)
    var url = baseUrl + versionStr + "/shop/addordelete";
    indexUrls.requestPostApi(url, {valueId:valueId,type:type}, sourceObj, success, failFun, completeFun);
}
//收藏列表
const CollectList =(type,offset,limit,sourceObj, success = () => { }) => { 
    // console.log(userId,type,offset,limit,success) 
    var url = baseUrl + versionStr + "/shop/collectList";
    indexUrls.requestPostApi(url, {type:type,offset:offset,limit:limit}, sourceObj, success, failFun, completeFun);
}

// CollectList: WxApiRoot + 'shop/collectList', //收藏列表 

//专题详情
const TopicDetail =(id,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/topicDetail";
    indexUrls.requestPostApi(url, {id:id}, sourceObj, success, failFun, completeFun);
}

//相关专题
const TopicRelated =(id,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/topicRelated";
    indexUrls.requestPostApi(url, {id:id}, sourceObj, success, failFun, completeFun);
}

//评论列表
const CommentList =(valueId,type,page,size,showType,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/commentList";
    indexUrls.requestPostApi(url, {valueId:valueId,typeId:type,showType:showType,offset:page,limit:size}, sourceObj, success, failFun, completeFun);
}


//-----------------------------购物车全部接口

//获取购物车的数据
const CartList =(sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/cartIndex";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
}

//选择或取消选择商品
const CartChecked =(productIds,isChecked,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/cartChecked";
    indexUrls.requestPostApi(url, {productIds:productIds,isChecked:isChecked}, sourceObj, success, failFun, completeFun);
}
//更新购物车的商品
const CartUpdate =(productId,goodsId,number,id,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/cartUpdate";
    indexUrls.requestPostApi(url, {productId:productId,goodsId:goodsId,number:number,id:id}, sourceObj, success, failFun, completeFun);
}
//删除购物车的商品
const CartDelete =(productIds,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/cartDelete";
    indexUrls.requestPostApi(url, {productIds:productIds}, sourceObj, success, failFun, completeFun);
}

//------------------------------填写订单全部接口
// 下单前信息确认
const CartCheckout =(cartId,addressId,couponId,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/cartCheckout";
    indexUrls.requestPostApi(url, {cartId:cartId,addressId:addressId,couponId:couponId}, sourceObj, success, failFun, completeFun);
}

// 提交订单
const OrderSubmit =(cartId,addressId,couponId,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/order/submit";
    indexUrls.requestPostApi(url, {cartId:cartId,addressId:addressId,couponId:couponId}, sourceObj, success, failFun, completeFun);
}

// 订单的预支付会话
const OrderPrepay =(orderId,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/order/prepay";
    indexUrls.requestPostApi(url, {orderId:orderId}, sourceObj, success, failFun, completeFun);
}

//------------------------------地址全部接口
//收货地址列表
const AddressList =(sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/addressList";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
}
//删除收货地址
const AddressDelete =(id,sourceObj, success = () => { }) => {  
    // console.log(userId,id,sourceObj,success)
    var url = baseUrl + versionStr + "/shop/addressDelete";
    indexUrls.requestPostApi(url, {id:id}, sourceObj, success, failFun, completeFun);
}
//收货地址详情
const AddressDetail =(id,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/addressDetail";
    indexUrls.requestPostApi(url, {id:id}, sourceObj, success, failFun, completeFun);
}
//获取区域列表
const RegionList =(pid,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/regionList";
    indexUrls.requestPostApi(url, {pid:pid}, sourceObj, success, failFun, completeFun);
}
//保存收货地址
const AddressSave =(id,name,mobile,provinceId,cityId,areaId,address,isDefault,provinceName,cityName,countyName,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/addressSave";
    indexUrls.requestPostApi(url, {id:id,name:name,mobile:mobile,provinceId:provinceId,cityId:cityId,areaId:areaId,address:address,isDefault:isDefault,provinceName:provinceName,cityName:cityName,countyName:countyName}, sourceObj, success, failFun, completeFun);
}

//------------------------------评论全部接口
//评论总数
const CommentCount =(valueId,type,size,page,showType,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/commentCount";
    indexUrls.requestPostApi(url, {valueId:valueId,typeId:type,size:size,page:page,showType:showType}, sourceObj, success, failFun, completeFun);
}
//图片上传
// logertype = 14 评论图片 
const StorageUpload =(sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/storage/upload";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
}
//发表评论
const CommentPost =(userId,typeId,valueId,content,star,hasPicture,picUrls,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/commentPost";
    indexUrls.requestPostApi(url, {userId:userId,typeId:typeId,valueId:valueId,content:content,star:star,hasPicture:hasPicture,picUrls:picUrls}, sourceObj, success, failFun, completeFun);
}


//------------------------------订单处理全部接口
 //订单列表
const OrderList =(userId,showType,offset,limit,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/order/list";
    indexUrls.requestPostApi(url, {userId:userId,showType:showType,offset:offset,limit:limit}, sourceObj, success, failFun, completeFun);
}

//------------------------------足迹列表全部接口
 //足迹列表
 const FootprintList =(userId,offset,limit,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/footPrintList";
    indexUrls.requestPostApi(url, {userId:userId,offset:offset,limit:limit}, sourceObj, success, failFun, completeFun);
  }
//删除足迹
const FootprintDelete =(footprintId,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/footPrintDelete";
    indexUrls.requestPostApi(url, {footprintId:footprintId}, sourceObj, success, failFun, completeFun);
  }

//------------------------------订单详情全部接口
//物流查询
const ExpressQuery =(expCode,expNo,sourceObj, success = () => { }) => {    //待完成
    var url = baseUrl + versionStr + "/shop/expressQuery";
    indexUrls.requestPostApi(url, {expCode:expCode,expNo:expNo}, sourceObj, success, failFun, completeFun);
  }
//订单详情
const OrderDetail =(orderId,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/order/detail";
    indexUrls.requestPostApi(url, {orderId:orderId}, sourceObj, success, failFun, completeFun);
  }
  //取消订单
const OrderCancel =(orderId,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/order/cancel";
    indexUrls.requestPostApi(url, {orderId:orderId}, sourceObj, success, failFun, completeFun);
  }
   //退款取消订单
const OrderRefund =(orderId,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/order/refund";
    indexUrls.requestPostApi(url, {orderId:orderId}, sourceObj, success, failFun, completeFun);
  }
    //删除订单
const OrderDelete =(orderId,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/order/delete";
    indexUrls.requestPostApi(url, {orderId:orderId}, sourceObj, success, failFun, completeFun);
  }
    //确认收货
const OrderConfirm =(orderId,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/order/confirm";
    indexUrls.requestPostApi(url, {orderId:orderId}, sourceObj, success, failFun, completeFun);
  }
   //代评价商品信息
const OrderComment =(orderId,goodsId,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/order/comment";
    indexUrls.requestPostApi(url, {orderId:orderId,goodsId:goodsId}, sourceObj, success, failFun, completeFun);
  }

//------------------------------
     //新品
const GoodsNew =(sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/new";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
  }
     //专题列表
const TopicList =(offset,limit,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/topicList";
    indexUrls.requestPostApi(url, {offset:offset,limit:limit}, sourceObj, success, failFun, completeFun);
  }
  //品牌列表
  const BrandList =(offset,limit,sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/brandList";
    indexUrls.requestPostApi(url, {offset:offset,limit:limit}, sourceObj, success, failFun, completeFun);
  }
   //热门
   const GoodsHot =(sourceObj, success = () => { }) => {  
    var url = baseUrl + versionStr + "/shop/hot";
    indexUrls.requestPostApi(url, {}, sourceObj, success, failFun, completeFun);
  }

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
    BrandDetail:BrandDetail,
    indexsh:indexsh,
    CatalogList:CatalogList,
    GoodsCategory:GoodsCategory,
    GoodsDetail:GoodsDetail,
    GoodsRelated:GoodsRelated,
    CartGoodsCount:CartGoodsCount,
    CollectAddOrDelete:CollectAddOrDelete,
    CartFastAdd:CartFastAdd,
    CartAdd:CartAdd,
    TopicDetail:TopicDetail,
    TopicRelated:TopicRelated,
    CommentList:CommentList,
    CartList:CartList,
    CartChecked:CartChecked,
    CartUpdate:CartUpdate,
    CartDelete:CartDelete,
    CartCheckout:CartCheckout,
    OrderSubmit:OrderSubmit,
    OrderPrepay:OrderPrepay,
    AddressListL:AddressList,
    AddressDelete:AddressDelete,
    AddressDetail:AddressDetail,
    RegionList:RegionList,
    AddressSave:AddressSave,
    CommentCount:CommentCount,
    StorageUpload:StorageUpload,
    CommentPost:CommentPost,
    GoodsList:GoodsList,
    CollectList:CollectList,
    OrderList:OrderList,
    FootprintList:FootprintList,
    FootprintDelete:FootprintDelete,
    ExpressQuery:ExpressQuery,
    OrderDetail:OrderDetail,
    OrderCancel:OrderCancel,
    OrderRefund:OrderRefund,
    OrderDelete:OrderDelete,
    OrderConfirm:OrderConfirm,
    OrderComment:OrderComment,
    GoodsNew:GoodsNew,
    TopicList:TopicList,
    BrandList:BrandList,
    GoodsHot:GoodsHot,
    /**属性 */
    getUser: getUser,
    baseImgUrl: baseImgUrl
};



