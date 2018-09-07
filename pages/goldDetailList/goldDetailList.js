// pages/goldDetailList/goldDetailList.js
import api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goldDeatailList: [],
    haveDetail: true,
    date: '',
    nextPage: 1,
    startDate: '',
    endDate: '',
    monthStr: '选择月份查看明细',
    dateStamp: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      startDate: this.getFirstDayOfYear(new Date()),
      endDate: new Date()
    })
    this.getGoldDetailList()
  },

  // 获取数据
  getGoldDetailList() {
    wx.showNavigationBarLoading()
    api.getAgentBalanceList({
      data: {
        page: this.data.nextPage,
        date: this.data.dateStamp
      },
      success: res => {
        if (res.data.success) {
          let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
          this.setData({
            goldDeatailList: this.data.goldDeatailList.concat(res.data.result.lists),
            haveDetail: true,
            nextPage: nextPage
          })
        } else {
          this.setData({
            haveDetail: false
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

  // 获取datePicker的选择
  bindDateChange(e) {
    this.setData({
      goldDeatailList: [],
      nextPage: 1,
      date: e.detail.value,
      dateStamp: Math.round(new Date(e.detail.value).getTime() / 1000),
      monthStr: `${new Date(e.detail.value).getMonth() + 1}月`
    })
    wx.setNavigationBarTitle({
      title: `金币结算明细 ${new Date(e.detail.value).getMonth() + 1}月`
    })
    this.getGoldDetailList();
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
    this.data.nextPage ? this.getGoldDetailList() : ''
  }
})