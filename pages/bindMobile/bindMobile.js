// pages/bindMobile/bindMobile.js
import api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: null, //手机号码
    code: null, //验证码
    password: null, //密码
    disableGetcodeBtn: true, //禁用获取验证码按钮
    disableSubmit: true,
    codeSending: false, //发送获取验证码的请求（返回ture时，开始显示倒计时）
    times: 59, //倒计时
    btnLoading: false, //发送获取验证码的请求（返回结果钱）
    binding: false, //正在提交绑定
    phoneIsOK: false, //手机号码是否合格
    codeISOK: false, //验证码是否合格
    passwordIsOK: false, //密码是否合格
    is_set_password: false //是否设置了密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(opt) {
    wx.setNavigationBarTitle({
      title: opt.title,
    })
    this.setData({
      is_set_password: opt.isbindpassword
    })
  },

  //手机号码输入
  mobileInput(e) {
    this.setData({
      phoneNum: e.detail.value
    })

    if ((/^1[34578]\d{9}$/.test(e.detail.value)) && e.detail.cursor == 11) {
      this.setData({
        phoneIsOK: true
      })
    } else {
      this.setData({
        phoneIsOK: false
      })
    }

    if (this.data.phoneIsOK && !this.data.codeSending) {
      this.setData({
        disableGetcodeBtn: false
      })
    } else {
      this.setData({
        disableGetcodeBtn: true
      })
    }


  },
  // 清除电话号码
  clearNum() {
    this.setData({
      phoneNum: '',
      disableGetcodeBtn: true,
      phoneIsOK: false
    })
  },

  //验证码输入
  codeInput(e) {
    this.setData({
      code: e.detail.value
    })
    if (e.detail.cursor == 6) {
      this.setData({
        codeISOK: true
      })
    } else {
      this.setData({
        codeISOK: false
      })
    }
  },
  // 清除验证码
  clearCode() {
    this.setData({
      code: '',
      codeISOK: false
    })
  },

  // 密码输入
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
    if ((/^[\da-zA-Z]{6,15}$/.test(e.detail.value))) {
      this.setData({
        passwordIsOK: true
      })
    } else {
      this.setData({
        passwordIsOK: false
      })
    }
  },
  // 清除密码
  clearPassword() {
    this.setData({
      password: '',
      passwordIsOK: false
    })
  },

  getCode() {
    this.setData({
      btnLoading: true,
      disableGetcodeBtn: true
    })
    api.getCode({
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        action: 'init_mobile',
        mobile: this.data.phoneNum
      },
      success: res => {
        this.setData({
          btnLoading: false
        })
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
        if (res.data.success) {
          this.getCodeSuccess()
        } else {
          this.setData({
            disableGetcodeBtn: false
          })
        }
      }
    })
  },

  getCodeSuccess() {
    this.setData({
      codeSending: true,
      disableGetcodeBtn: true
    })
    let ti = 58;
    let timer = setInterval(() => {
      if (ti <= 0) {
        this.setData({
          disableGetcodeBtn: false,
          codeSending: false
        });
        clearInterval(timer);
      }
      this.setData({
        times: ti--
      })
    }, 1000)
  },

  // 提交绑定
  bindMobile() {
    this.setData({
      binding: true
    })
    if (this.data.is_set_password == 'false') {
      api.initMobile(this.params())
    } else {
      api.bindMobile(this.params())
    }
  },

  params() {
    return {
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        mobile: this.data.phoneNum,
        code: this.data.code,
        password: this.data.password
      },
      success: res => {
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
            binding: false
          })
        }
      }
    }
  }
})