// pages/myWallet/myWallet.js
import api from '../../api/api.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [{
      title: '收入明细',
      name: 'detailIncome'
    }, {
      title: '提现明细',
      name: 'detailWithdraw'
    }], //nav
    navIndex: 0, //nav当前
    walletInfo: { //默认我的钱包信息
      lastMonthEarnings: '0',
      totalEarnings: '0'
    },
    incomeList: [], //收入明细
    haveIncome: true, //是否有收入明细
    incomeNextpage: 1, //收入明细nextpage
    withdrawList: [], //提现明细数据
    haveWithdraw: true, //是否提现明细
    withdrawNextPage: 1, //提现明细nextpage
    currentTemplate: 'detailIncome',
    userInfo: null,
    moneyLoading: true,
    balance: 0,   //结算金额
    hasInfo: false   //是否已获取到用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.getMyWalletData();
    this.GetDetailIncome();
    this.GetDetailWithdraw();
  },
  // 获取收入明细
  getMyWalletData() {
    api.getMyWallet({
      success: res => {
        this.setData({
          walletInfo: res.data
        })
      }
    })
  },
  // nav点击
  navTouch(e) {
    this.setData({
      currentTemplate: e.currentTarget.dataset.name
    })
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  // 收入明细
  GetDetailIncome() {
    api.getDetailIncome({
      data: {
        page: this.data.incomeNextpage
      },
      success: res => {
        wx.hideLoading()
        if (res.data.success) {
          let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
          this.setData({
            incomeList: this.data.incomeList.concat(res.data.result.lists),
            incomeNextpage: nextPage,
            haveIncome: true
          })
        } else {
          this.setData({
            haveIncome: false
          })
        }
      }
    })
  },

  // 提现明细
  GetDetailWithdraw() {
    api.getDetailWithdraw({
      data: {
        page: this.data.withdrawNextPage
      },
      success: res => {
        if (res.data.success) {
          let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
          this.setData({
            withdrawList: this.data.withdrawList.concat(res.data.result.lists),
            withdrawNextPage: nextPage,
            haveWithdraw: true
          })
        } else {
          this.setData({
            haveWithdraw: false
          })
        }
      }
    })
  },

  // 去提现
  withdraw() {
    if (this.data.userInfo.is_bind_mobile) {
      wx.navigateTo({
        url: '/pages/money/withdraw/withdraw',
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '您还没有绑定手机号码，无法提现；先绑定手机号码再操作提现。',
        confirmText: '去绑定',
        confirmColor: "#f35",
        success: res => {
          res.confirm ? wx.navigateTo({
            url: `/pages/bindMobile/bindMobile?isbindpassword=${this.data.userInfo.is_set_password}&title=绑定手机号`,
          }) : ''
        }
      })
    }
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
      moneyLoading: true,
      hasInfo: false
    })
    app.updateUserInfo().then(res => {
      this.setData({
        userInfo: res,
        balance: res.balance,
        hasInfo: true,
        moneyLoading: false
      })
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
    if (this.data.currentTemplate == 'detailIncome') {
      this.data.incomeNextpage ? this.GetDetailIncome() : ''
    } else {
      this.data.withdrawNextPage ? this.GetDetailWithdraw() : ''
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})