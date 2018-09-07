// pages/footPrint/footprint.js
import api from '../../api/api.js';
import utils from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasFootprint: false,
    footprintStr: null,
    nextPage: 1,
    footprintAlldata: [],
    footprintGroupList: [],
    nowDate: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.formatFootPrintsArr();
  },

  // 包装所有浏览记录
  formatFootPrintsArr() {
    try {
      let res = wx.getStorageInfoSync()
      let allFootprintKyes = res.keys.filter(item => item.includes('footPrintTimeStamp'))
      if (allFootprintKyes.length > 0) {
        let allFootArr = allFootprintKyes.map(key => {
          return {
            [key.slice(18)]: wx.getStorageSync(key)
          }
        })
        this.setData({
          footprintStr: Object.assign(...allFootArr),
          hasFootprint: true
        })
        // 在有浏览记录的时候才请求数据
        this.getFootprintData()
      } else {
        this.setData({
          hasFootprint: false
        })
      }
    } catch (e) {
      console.log(e)
    }
  },

  // 获取数据
  getFootprintData() {
    api.getfootprintNoLogin({
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: JSON.stringify(this.data.footprintStr)
      },
      success: res => {
        if (res.data.success) {
          let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
          this.setData({
            footprintAlldata: this.data.footprintAlldata.concat(res.data.result.articals),
            nextPage: nextPage
          })
          this.arrayGroup()
        } else {
          this.setData({
            hasFootprint: false
          })
        }
      }
    }, this.data.nextPage)
  },

  // 分组浏览记录数据
  arrayGroup() {
    // 时间戳数组
    let timaStampArr = this.data.footprintAlldata.map(item => item.browsing_time)
    // 去重
    timaStampArr = Array.from(new Set(timaStampArr));
    // 包装成分组的对象
    let groupFootprint = timaStampArr.map(time => {
      return {
        'time': time,
        'data': this.data.footprintAlldata.filter(item => item.browsing_time == time)
      }
    })
    this.setData({
      footprintGroupList: groupFootprint
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
      nowDate: parseInt(new Date().getTime() / 1000) 
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
    this.data.nextPage ? this.getFootprintData() : ''
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})