// pages/myGold/myGold.js
import api from '../../api/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconNav: [{
        icon: 'iconfont jdd-yaoqing',
        name: '邀请好友',
        bgcolor: '#97B169',
        page: "/pages/inviteFriends/inviteFriends"
      },
      {
        icon: 'iconfont jdd-dingdan',
        name: '粉丝订单',
        bgcolor: '#E74B94',
        page: "/pages/fansOrder/fansOrder"
      },
      {
        icon: 'iconfont jdd-fans',
        name: '我的粉丝',
        bgcolor: '#F7A1A1',
        page: "/pages/fansList/myFans/myFans"
      },
      {
        icon: 'iconfont jdd-kefu',
        name: '客服',
        bgcolor: '#7BA6EC',
        page: "/pages/customerService/customerService"
      },
    ],
    thisMonthEarnings: {
      title: '本月预估金币',
      message: "本月内创建的所有订单预估金币收益"
    },
    lastMonthEarnings: {
      title: '上月预估金币',
      message: "上月内创建的所有订单预估金币收益"
    },
    lastMonthJiesuan: {
      title: '上月结算金币',
      message: "上一个自然月内购物确定收货的订单金币收益，每月25日结算。"
    },
    todayPayments: {
      title: '今日付款笔数',
      message: "今日内所有付款的订单数量，包含有效订单和失效订单"
    },
    todayEarnings: {
      title: '今日预估金币',
      message: "今天内创建的有效订单预估金币收益"
    },
    yesterdatyPayments: {
      title: '昨日付款笔数',
      message: "昨日所有付款的订单数量，包含有效订单和失效订单"
    },
    yesterdatyEarnings: {
      title: '昨日预估金币',
      message: "昨日创建的有效订单预估金币收益"
    },
    myGoldInfo: {
      gold: 0,
      lastMonthEarnings: 0,
      lastMonthForecastEarnings: 0,
      thisMonthForecastEarnings: 0,
      todayForecastEarnings: 0,
      todayPaidOrderNum: 0,
      totalExchange: 0,
      yesterdayForecastEarnings: 0,
      yesterdayPaidOrderNum: 0
    }
  },

  // 获取金币收益说明
  getMsg(text) {
    let goldType = text.currentTarget.dataset.mark;
    let goldMessage = this.data[goldType];
    wx.showModal({
      title: goldMessage.title,
      content: goldMessage.message,
      confirmText: '知道了',
      showCancel: false,
      confirmColor: "#f35"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMyGold()
  },

  // 获取我的金币信息
  getMyGold() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    api.getMyGold({
      success: res => {
        if (res.data.success) {
          this.setData({
            myGoldInfo: res.data.result
          })
          wx.hideLoading()
        }
      }
    })
  },

  // 选择是否兑换金币
  selectExchange() {
    if (this.data.myGoldInfo.gold < 1) {
      wx.showModal({
        title: '温馨提示',
        content: '抱歉，没有金币可兑换；请先去购物后提交订单号领取。比心心，加油喔。',
        confirmText: '知道了',
        showCancel: false,
        confirmColor: "#f35"
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '您确定需要把全部金币兑换成现金吗？',
        confirmText: '兑换',
        confirmColor: "#f35",
        success: res => {
          res.confirm ? this.goldExchange() : ''
        }
      })
    }
  },
  // 金币兑换
  goldExchange() {
    api.goldExchange({
      success: res => {
        if (res.data.success) {
          this.getMyGold()
          getApp().updateUserInfo()
          wx.showModal({
            title: '恭喜您',
            content: res.data.message,
            confirmText: '前往查看',
            confirmColor: "#f35",
            success: res => {
              res.confirm ? wx.navigateTo({
                url: '/pages/exchangeRecord/exchangeRecord',
              }) : ''
            }
          })
        }else{
          wx.showModal({
            title: '温馨提示',
            content: res.data.message,
            confirmText: '知道了',
            showCancel: false,
            confirmColor: "#f35"
          })
        }
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})