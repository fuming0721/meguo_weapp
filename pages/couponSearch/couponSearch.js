// pages/couponSearch/couponSearch.js
import muneList from '../../utils/menuIcon.js';
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopIndex: 0, //商城index
    shopArr: [],
    keywords:'',    // 搜索词
    haveValue: false,   // 搜索框是否有值
    menuNavList: muneList,   //二级目录图标
    conpunNum: 0   //发现多少优惠券
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      shopArr: app.globalData.SearchshopArr,
      shopIndex: app.globalData.SearchShopIndex
    })
    this.setConpunNum()
  },

  // 随机设置今日发现优惠券
  setConpunNum(){
    this.setData({
      conpunNum: Math.floor(Math.random() * (6999999 - 3000000 + 1) + 3000000)
    })
  },

  // 商城切换
  changeShop(opt) {
    app.globalData.SearchShopIndex = opt.currentTarget.dataset.shopindex
    this.setData({
      shopIndex: app.globalData.SearchShopIndex
    })
  },

  //搜索框输入中
  model(opt) {
    if (opt.detail.value.length) {
      this.setData({
        haveValue: true,
        keywords: opt.detail.value
      })
    } else {
      this.setData({
        haveValue: false,
        keywords: ''
      })
    }
  },

  //搜索
  startSearch(opt){
    if (this.data.keywords.length==0){
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
    }else{
      wx.navigateTo({
        url: `/pages/search/search?keywords=${this.data.keywords}&`,
      })
    }
  },

  // 清除vlaue
  clearValue() {
    this.setData({
      haveValue: false,
      keywords: ''
    })
  },

  // 跳转到二级分类
  toCategory(opt) {
    wx.navigateTo({
      url: `/pages/category/category?id=${opt.currentTarget.dataset.cate_id}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      shopIndex: app.globalData.SearchShopIndex
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.setData({
      conpunNum: 0
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})