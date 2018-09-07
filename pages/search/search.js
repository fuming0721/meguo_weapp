// pages/search/search.js
const app = getApp();
import api from '../../api/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: '', //搜索词
    shopIndex: 0, //商城index
    shopArr: [], //nav的内容
    hotSearchWord: [], //搜索热词
    isShowSearchResult: false, //是否显示搜索结果
    searchType: 'coupon', //默认搜索类别
    nextPage: 1, //页数
    searchDataList: [], //搜索结果数据
    noGoods: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      shopArr: app.globalData.SearchshopArr,
      shopIndex: app.globalData.SearchShopIndex,
      nextPage: 1,
      searchDataList: []
    })
    if (options.keywords) {
      this.setData({
        nextPage: 1,
        searchDataList: [],
        keywords: options.keywords
      })
      this.startSearch();
    }

  },

  // 输入中
  inputC(opt) {
    this.setData({
      keywords: opt.detail.value
    })
  },

  // 热词搜索点击
  hotSearchTap(opt) {
    this.setData({
      keywords: opt.currentTarget.dataset.words,
    })
    this.goSearch()
  },

  // 清除搜索词
  clearValue() {
    this.setData({
      keywords: ''
    })
  },

  // 输入框获取焦点
  inputs() {
    this.setData({
      isShowSearchResult: false
    })
  },

  // 商城切换
  changeShop(opt) {
    app.globalData.SearchShopIndex = opt.currentTarget.dataset.shopindex
    this.setData({
      shopIndex: app.globalData.SearchShopIndex
    });
    this.startSearch()
  },

  // 获取热门搜索keywords
  getHotSearch() {
    let timer = new Date().getTime();
    api.getHotwords({
      data: {
        t: timer
      },
      success: res => {
        this.setData({
          hotSearchWord: res.data.result,
        })
      }
    })
  },

  // 顶部搜索的搜索
  goSearch() {
    this.setData({
      shopIndex: 0,
      searchType: 'default'
    })
    this.startSearch()
  },

  // 搜索前的步骤
  startSearch(opt) {
    if (this.data.keywords.length == 0) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
    } else {
      this.setData({
        nextPage: 1,
        searchDataList: [],
      })
      this.search()
    }
  },

  // 搜索
  search() {
    api.getSearchData({
      data: {
        keyword: this.data.keywords,
        page: this.data.nextPage,
        sort: this.data.searchType,
        mall: this.data.shopArr[this.data.shopIndex].type,
      },
      success: (res => {
        if (res.data.success) {
          let nextPage = +res.data.list.currentPage + 1 > +res.data.list.totalPage ? false : +res.data.list.currentPage + 1;
          this.setData({
            searchDataList: this.data.searchDataList.concat(res.data.list.list),
            nextPage: nextPage,
            isShowSearchResult: true
          })
        } else {
          this.setData({
            nextPage: false,
            isShowSearchResult: true
          })
        }
      })
    })
  },

  // 条件筛选
  sortNavClick(opt) {
    let searchtypeStr = opt.currentTarget.dataset;
    this.setData({
      searchType: searchtypeStr.searchtype
    });
    this.startSearch()
  },

  // 去详情页
  goDetail(opt) {
    let paramsData = opt.currentTarget.dataset;
    console.log(paramsData)
    wx.navigateTo({
      url: `/pages/detailForSearch/detailForSearch?id=${paramsData.id}&couponamount=${paramsData.couponamount}&couponTotalCount=${paramsData.coupontotalcount}`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // this.setData({
    //   shopIndex: app.globalData.SearchShopIndex,
    //   isShowSearchResult: false
    // })
    this.getHotSearch()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.data.nextPage ? this.search() : ''
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})