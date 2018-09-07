// prod
const baseUrl = "https://m.meguo.com";

// dev
// const baseUrl = "https://m.dev.develop.miguo.cn";
const wxRequst = (params, url) => {
  wx.request({
    url: url,
    method: params.method,
    data: params.data || {},
    header: params.header || {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      params.success && params.success(res)
    },
    fail: (err) => {
      params.fail && params.fail(err);
      console.log(err);
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

// 首页_banner图片
const getBannerImg = parmas => {
  wxRequst(parmas, baseUrl + '/api/threads/carousel-pic')
};
// 首页_9.9包邮 && 首页_今日精选 && 9快9包邮 && 二级分类
const getGoodsList = parmas => {
  wxRequst(parmas, baseUrl + '/api/threads/good-lists')
};
// 首页_小编种草 && 小编说_小编种草
const getEditorSayList = parmas => {
  wxRequst(parmas, baseUrl + '/api/threads/editor-list')
};
// 详情页商品信息
const getGoodsDetail = parmas => {
  wxRequst(parmas, baseUrl + '/api/threads/detail')
};
// 详情页查看更多商品信息
const getDetailMoreImg = parmas => {
  wxRequst(parmas, baseUrl + '/hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1/?type=jsonp&dataType=jsonp&callback=mtopjsonp')
};
// 详情页商品信息
const getDetailNewGoods = parmas => {
  wxRequst(parmas, baseUrl + '/api/threads/hot')
};
// 获取详情页点赞和收藏状态
const getDetailLikeInfo = parmas => {
  wxRequst(parmas, baseUrl + '/api/threads/detail-extension')
};
// 详情页点赞
const prosLike = parmas => {
  wxRequst(parmas, baseUrl + '/api/threads/rating')
};
// 获取淘口令
const getTaokouling = parmas => {
  wxRequst(parmas, baseUrl + '/api/threads/tao-kou-ling')
};
// 二级分类页图标
const getSubCategoryIcon = parmas => {
  wxRequst(parmas, baseUrl + '/api/threads/sub-category')
};
// 猜你喜欢
const getGuessYoulike = parmas => {
  wxRequst(parmas, baseUrl + '/api/threads/tao-list')
};
// 搜券热门词
const getHotwords = parmas => {
  wxRequst(parmas, baseUrl + '/api/search/recommend')
};
// 超级搜券
const getSearchData = parmas => {
  wxRequst(parmas, baseUrl + '/api/coupon/list')
};
// 专辑
const getAlbumList = parmas => {
  wxRequst(parmas, baseUrl + '/api/threads/album-list')
};
// 搜券的详情页
const getTBgoodsList = parmas => {
  wxRequst(parmas, baseUrl + '/api/threads/search-goods')
};
// 搜券详情页淘口令
const getCoupnTaokouling = parmas => {
  wxRequst(parmas, baseUrl + '/api/coupon/tao-kou-ling')
};
// 未登录获取足迹数据
const getfootprintNoLogin = (parmas, nextPage) => {
  wxRequst(parmas, baseUrl + '/api/threads/footprint-lists?page=' + nextPage)
};
// 获取access_token
const gettoken = (parmas) => {
  wxRequst(parmas, baseUrl + '/api/user/wechat-mini-program-login')
};
// 获取用户信息
const getUserInfo = (parmas) => {
  wxRequst(parmas, baseUrl + '/api/wx-mini-program/user-info?t=' + Date.parse(new Date()))
};
// 绑定邀请码
const bindInvitationCode = (parmas) => {
  wxRequst(parmas, baseUrl + '/api/wx-mini-program/bind-invitation-code?access_token=' + wx.getStorageSync('access_token'))
};
// 我的金币
const getMyGold = (parmas) => {
  wxRequst(parmas, baseUrl + '/api/wx-mini-program/my-gold?access_token=' + wx.getStorageSync('access_token'))
};
// 兑换金币
const goldExchange = (parmas) => {
  wxRequst(parmas, baseUrl + '/api/wx-mini-program/coin2cash?access_token=' + wx.getStorageSync('access_token'))
};
// 金币兑换记录
const goldExchangeRecord = (parmas) => {
  wxRequst(parmas, baseUrl + '/api/wx-mini-program/exchange-list?access_token=' + wx.getStorageSync('access_token'))
};
// 订单找回
const orderTrack = (parmas) => {
  wxRequst(parmas, baseUrl + '/api/wx-mini-program/retrieve-orders?access_token=' + wx.getStorageSync('access_token'))
};
// 金币结算明细
const getAgentBalanceList = (parmas) => {
  wxRequst(parmas, baseUrl + '/api/wx-mini-program/agent-balance-list?access_token=' + wx.getStorageSync('access_token'))
};
// 粉丝订单（全部订单明细）
const getOrderList = (parmas) => {
  wxRequst(parmas, baseUrl + '/api/wx-mini-program/agent-orders?access_token=' + wx.getStorageSync('access_token'))
};

module.exports = {
  getBannerImg,
  getGoodsList,
  getEditorSayList,
  getGoodsDetail,
  getDetailMoreImg,
  getDetailNewGoods,
  getDetailLikeInfo,
  prosLike,
  getTaokouling,
  getSubCategoryIcon,
  getGuessYoulike,
  getHotwords,
  getSearchData,
  getAlbumList,
  getTBgoodsList,
  getCoupnTaokouling,
  getfootprintNoLogin,
  gettoken,
  getUserInfo,
  bindInvitationCode,
  getMyGold,
  goldExchange,
  goldExchangeRecord,
  orderTrack,
  getAgentBalanceList,
  getOrderList
}