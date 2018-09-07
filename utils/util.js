const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


//处理本地存储足迹
const setFootprints = id => {
  let timeDay = "footPrintTimeStamp" + new Date(new Date().toLocaleDateString()).getTime() / 1000;
  let footPrintsArr = wx.getStorageSync(timeDay) || []
  let repeatFootindex = footPrintsArr.findIndex(item => item == id);
  repeatFootindex > -1 ? footPrintsArr.splice(repeatFootindex, 1) : '';
  footPrintsArr.push(id);
  footPrintsArr.length > 50 ? footPrintsArr.splice(0, 1) : '';
  wx.setStorage({
    key: timeDay,
    data: footPrintsArr
  });

  try {
    let res = wx.getStorageInfoSync()
    let allFootprintKyes = res.keys.filter(item => item.includes('footPrintTimeStamp'))
    if (allFootprintKyes.length > 10) {
      try {
        wx.removeStorageSync(allFootprintKyes[0])
      } catch (e) {
        console.log(e)
      }
    }
  } catch (e) {
    console.log(e)
  }
};

module.exports = {
  formatTime,
  setFootprints
}