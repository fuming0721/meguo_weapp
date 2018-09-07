// pages/fansOrder/fansOrder.js
import api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: ['全部', '已付款', '已结算', '已失效'], //nav
    currentIndex: 0, //navINdex
    orderList: [], //列表
    nextPage: 1, //页数
    haveList: true, //是否有列表
    date: '', //
    startDate: '',
    endDate: '',
    monthStr: '月份',
    dateStamp: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      startDate: this.getFirstDayOfYear(new Date()),
      endDate: new Date()
    })
    this.getOrderList()
  },


  // nav切换
  navChange(e) {
    let paramsData = e.currentTarget.dataset
    if (paramsData.index != this.data.currentIndex) {
      this.setData({
        currentIndex: paramsData.index,
        orderList: [],
        nextPage: 1,
        dateStamp: 0,
        monthStr: '月份'
      });
      wx.setNavigationBarTitle({
        title: '粉丝订单'
      })
      this.getOrderList();
    }
  },

  // 获取list数据
  getOrderList() {
    wx.showNavigationBarLoading()
    api.getOrderList({
      data: {
        type: this.data.currentIndex,
        page: this.data.nextPage,
        date: this.data.dateStamp
      },
      success: res => {
        if (res.data.success) {
          let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
          this.setData({
            orderList: this.data.orderList.concat(res.data.result.lists),
            nextPage: nextPage,
            haveList: true
          })
        } else {
          this.setData({
            haveList: false
          })
        }
        wx.hideNavigationBarLoading()
      }
    })
  },

  // 获取本年份第一月
  getFirstDayOfYear(date) {
    date.setDate(1);
    date.setMonth(0);
    return date;
  },

  // 月份选择
  bindDateChange(e) {
    this.setData({
      orderList: [],
      nextPage: 1,
      date: e.detail.value,
      dateStamp: Math.round(new Date(e.detail.value).getTime() / 1000),
      monthStr: `${new Date(e.detail.value).getMonth() + 1}月`
    })
    wx.setNavigationBarTitle({
      title: `${new Date(e.detail.value).getMonth() + 1}月粉丝订单`
    })
    this.getOrderList();
  },

  // 订单号复制
  copyOrderNum(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.ordernum.toString()
    })
  },

  //去详情页
  toDetail(opt) {
    let paramsData = opt.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detailForSearch/detailForSearch?id=${paramsData.id}&couponamount=${paramsData.couponamount}&couponTotalCount=${paramsData.coupontotalcount}`
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
    this.data.nextPage ? this.getOrderList() : ''
  }
})