//app.js
import api from './api/api.js';
App({
  onLaunch: function() {
    // 获取设备信息
    wx.getSystemInfo({
      success: res => {
        this.globalData.sysInfo = res
      },
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] && !this.globalData.userInfo) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.updateUserInfo()
        }else{
          console.log('没有授权')
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  updateUserInfo () {
    let userInfo = new Promise((resolve, reject)=>{
      if (wx.getStorageSync('access_token')) {
        api.getUserInfo({
          data: {
            access_token: wx.getStorageSync('access_token')
          },
          success: res => {
            if (res.data.success) {
              this.globalData.userInfo = res.data;
            } else {
              this.globalData.userInfo = null
            }
            resolve(res.data);
          }
        })
      }else {
        resolve(null);
      }
    })
    return userInfo
  },
  globalData: {
    userInfo: null,
    sysInfo: null,
    SearchshopArr: [ //商城列表
      {
        name: '搜淘宝',
        index: 0,
        type: 'taobao'
      },
      {
        name: '搜天猫',
        index: 1,
        type: 'tmall'
      },
      // {
      //   name: '搜京东',
      //   index: 2,
      //   type: 'jd'
      // },
    ],
    SearchShopIndex: 0
  }

})