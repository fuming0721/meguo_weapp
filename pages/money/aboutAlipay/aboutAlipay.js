// pages/money/aboutAlipay/aboutAlipay.js
import api from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide_mobile: '', //电话号码
    name: '', //真实姓名
    nameIsOk: false, //真实姓名ok
    alipayNum: '', //支付宝账号
    alipayNumIsOk: false, //支付宝账号ok
    code: '', //验证码   
    codeIsOk: false, //验证码ok
    disabledGetCode: false, //禁用获取验证码
    typeColor: 'default',  //获取验证码的按钮颜色
    isLoading: false,   //正在获取验证码
    codeSending: false, //发送获取验证码的请求（返回ture时，开始显示倒计时）
    times: 59, //倒计时
    isBinding: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(opt) {
    wx.setNavigationBarTitle({
      title: opt.title,
    })
    this.setData({
      hide_mobile: opt.hide_mobile.toString()
    })
  },

  // 监听真实姓名的输入
  nameInput(e) {
    if (e.detail.value.length > 0) {
      this.setData({
        nameIsOk: true,
        name: e.detail.value
      })
    } else {
      this.setData({
        nameIsOk: false,
        name: e.detail.value
      })
    }
  },

  // 监听支付宝账号的输入
  alipayNumInput(e) {
    if (e.detail.value.length > 0) {
      this.setData({
        alipayNumIsOk: true,
        alipayNum: e.detail.value
      })
    } else {
      this.setData({
        alipayNumIsOk: false,
        alipayNum: e.detail.value
      })
    }
  },

  // 监听验证码的输入
  codeInput(e) {
    if (e.detail.value.length > 0) {
      this.setData({
        codeIsOk: true,
        code: e.detail.value
      })
    } else {
      this.setData({
        codeIsOk: false,
        code: e.detail.value
      })
    }
  },

  // 输入框清除
  clearValue(opt) {
    let index = opt.currentTarget.dataset.index;
    switch (index) {
      case '0':
        this.setData({
          name: '',
          nameIsOk: false
        })
        break
      case '1':
        this.setData({
          alipayNum: '',
          alipayNumIsOk: false
        })
        break
      case '2':
        this.setData({
          code: '',
          codeIsOk: false
        })
        break
    }
  },
// 获取验证码
  getCode(){
    this.setData({
      isLoading: true,
      disabledGetCode: true,
      typeColor: 'primary'
    })
    api.bindPayGetCode({
      success: res => {
        this.setData({
          isLoading: false
        })
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
        if (res.data.success) {
          this.getCodeSuccess()
        } else {
          this.setData({
            disabledGetCode: false,
            typeColor: 'default'
          })
        }
      }
    })
  },
  getCodeSuccess() {
    this.setData({
      codeSending: true,
      disabledGetCode: true
    })
    let ti = 58;
    let timer = setInterval(() => {
      if (ti <= 0) {
        this.setData({
          disabledGetCode: false,
          codeSending: false,
          typeColor: 'default'
        });
        clearInterval(timer);
      }
      this.setData({
        times: ti--
      })
    }, 1000)
  },

  bindingAlipay(){
    this.setData({
      isBinding: true
    })
    api.bindAliPay({
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        name: this.data.name,
        account: this.data.alipayNum,
        code: this.data.code
      },
      success: res=>{
        if (res.data.success) {
          wx.showModal({
            title: '恭喜您',
            content: res.data.message,
            showCancel: false,
            confirmText: '知道了',
            confirmColor: '#f35',
            success: e => {
              e.confirm ? wx.navigateBack() : ''
            }
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: res.data.message,
            showCancel: false,
            confirmText: '知道了',
            confirmColor: '#f35',
          })
          this.setData({
            isBinding: false
          })
        }
      }
    })
  }
})