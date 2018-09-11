const app = getApp()
import api from '../../api/api.js';
import utils from '../../utils/util.js';
Page({
  data: {
    userInfo: null, //获取全局userinfo
    encryptedData: '',
    iv: '',
    loginCode: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    myService: [{
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
        icon: 'iconfont jdd-yaoqing',
        name: '邀请好友',
        bgcolor: '#97B169',
        page: "/pages/inviteFriends/inviteFriends"
      },
    ],
    myService2: [{
        icon: 'iconfont jdd-collect',
        name: '收藏',
        bgcolor: '#ECBB23',
        page: "/pages/myCollection/myCollection"
      },
      {
        icon: 'iconfont jdd-jiaoya',
        name: '足迹',
        bgcolor: '#60D1C3',
        page: "/pages/footprint/footprint"
      },
      {
        icon: 'iconfont jdd-kefu',
        name: '客服',
        bgcolor: '#7BA6EC',
        page: "/pages/customerService/customerService"
      },
      {
        icon: 'iconfont jdd-bangzhu',
        name: '帮助中心',
        bgcolor: '#ec6100',
        page: '/pages/help/help'
      }
    ]
  },
  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  // 点击登录
  bindgetuserinfo(e) {
    if (e.detail.userInfo) {
      wx.login({
        success: res => {
          this.setData({
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            loginCode: res.code
          })
          this.getToken()
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '必须授权登录之后才能获取佣金',
        confirmText: '知道了',
        showCancel: false
      })
    }
  },

  // 获取token
  getToken() {
    wx.showLoading({
      title: '登录中..',
      mask: true
    })
    api.gettoken({
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        code: this.data.loginCode,
        encryptedData: this.data.encryptedData,
        iv: this.data.iv
      },
      success: res => {
        if (res.data.success) {
          wx.setStorageSync('access_token', res.data.result.access_token)
          this.fetchUserInfo()
        } else {
          wx.showToast({
            title: res.data.message,
            duration: 1500,
            icon: 'none',
            mask: true
          })
        }
      }
    })
  },

  // 登录成功获取信息
  fetchUserInfo() {
    api.getUserInfo({
      data: {
        access_token: wx.getStorageSync('access_token')
      },
      success: res => {
        if (res.data.success) {
          this.setData({
            userInfo: res.data
          })
          app.globalData.userInfo = res.data
          wx.hideLoading()
          wx.showToast({
            title: '欢迎回来',
            duration: 1500,
            icon: 'none',
            mask: true
          })
        } else {
          app.globalData.userInfo = null;
          wx.showToast({
            title: res.data.message,
            duration: 1500,
            icon: 'none',
            mask: true
          })
        }
      }
    })
  },

  // 复制邀请码
  copyInvitationCode(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.code
    })
  },
  anniu(e){
    console.log(e)
    // wx.showToast({
    //   title: e.currentTarget.dataset
    // })
  },
  // 我的服务页面跳转
  pageJump(e) {
    let pageName = e.currentTarget.dataset.pagename
    if (pageName == '/pages/myCollection/myCollection' && !this.data.userInfo) {
      wx.showModal({
        title: '提示',
        content: '必须授权登录之后才能查看收藏',
        confirmText: '知道了',
        showCancel: false
      })
    } else {
      wx.navigateTo({
        url: pageName,
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
})