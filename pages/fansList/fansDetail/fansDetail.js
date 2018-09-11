// pages/fansList/fansDetail/fansDetail.js
import api from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: 0,
    nextPage: 1,
    fansList: [],
    isSec: true   //第二层
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showNavigationBarLoading()
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.setData({
      uid: options.uid
    })
    this.getFansDetailList()
  },

  // 获取数据
  getFansDetailList() {
    api.fansDetailList({
      data: {
        uid: this.data.uid,
        page: this.data.nextPage
      },
      success: res => {
        if (res.data.success) {
          let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
          this.setData({
            fansList: this.data.fansList.concat(res.data.result.lists),
            nextPage: nextPage
          })
        } else {
          this.setData({
            nextPage: false
          })
        }
        wx.hideNavigationBarLoading();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.data.nextPage ? this.getFansDetailList() : ''
  }
})