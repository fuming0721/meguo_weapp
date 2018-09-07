// pages/exchangeRecord/exchangeRecord.js
import api from '../../api/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: [],
    haveRecord: true,
    nextPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getRecord()
  },

  // 获取金币兑换记录
  getRecord() {
    api.goldExchangeRecord({
      success: res => {
        if (res.data.success) {
          let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
          this.setData({
            recordList: this.data.recordList.concat(res.data.result.lists),
            haveRecord: true,
            nextPage: nextPage
          })
        } else {
          this.setData({
            haveRecord: false
          })
        }
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.data.nextPage ? this.getRecord() : ''
  }
})