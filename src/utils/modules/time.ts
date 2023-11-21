/*
 * @Description: 时间处理
 * @Author: Zye
 * @Date: 2022-06-22
 */

/** 时间格式化
 *
 * @param {Date | string | number} date 时间 / 时间格式字符串 / 时间戳
 * @param {string | 1 | 2 | 3 | 4 | 5} fomtter 格式字符串或预设方案数字
 * 预设方案：
 *
 * 1 -> 1970-01-01 00:00:00 (默认)
 *
 * 2 ->  1970-1-1 0:0:0
 *
 * 3 ->  1970-01-01
 *
 * 4 ->  1970-1-1
 *
 * 5 ->  1970-01-01 00:00:00 星期一
 *
 * 格式字符串：
 *
 * 年:Y
 * 月:M
 * 日:D
 * 时:h
 * 分:m
 * 秒:s
 * 周:w
 *
 * @example
 *
 * getDate(date,1) -> '1970-01-01 00:00:00'
 * getDate(date,'D')   -> '30'
 * getDate(date,'YYYY年MM月DD日 hh:mm:ss w') -> '1970年01月30日 01:00:00 星期一'
 *
 *
 * @returns fomtter time
 */
const getDate = (date?: Date | string | number | null, fomtter: _Fomtter = 'YYYY-MM-DD hh:mm:ss'): string => {
  let ret
  if (!date) {
    date = _far_time()
  }
  if (typeof fomtter == 'number') {
    fomtter = _presetstall_fomtter[fomtter] as string
  }
  let _d = getDateObject(date)

  let keys = {
    'Y+': _d.year,
    'M+': _d.month,
    'D+': _d.day,
    'h+': _d.hour,
    'm+': _d.minutes,
    's+': _d.seconds,
    'w+': _d.week,
  }

  for (let key in keys) {
    ret = new RegExp('(' + key + ')').exec(fomtter)
    if (ret) {
      fomtter = fomtter.replace(ret[1], keys[key].padStart(ret[1].length, '0'))
    }
  }
  return fomtter
}

/** 获取特殊时间节点
 *
 * @param dateType {'weekstart' | 'weekend' | 'monthstart' | 'monthend' | 'yearstart' | 'yearend' | 'weekbefore' |'weekafter'| 'monthbefore' | 'yearbefore' | 'yearafter'} 获取特殊时间
 * @param fomtter {string | 1 | 2 | 3 | 4 | 5} fomtter 格式字符串或预设方案数字
 *
 * dateType:
 *
 *  - weekstart  —— 本周起始日期
 *
 *  - weekend    —— 本周结束日期
 *
 *  - weekbefore —— 一周前日期
 *
 *  - weekafter —— 一周后日期
 *
 *  - monthstart —— 本月起始日期
 *
 *  - monthend   —— 本月结束日期
 *
 *  - monthbefore—— 一个月前日期
 *
 *  - yearstart  —— 今年1月1日
 *
 *  - yearend    —— 今年12月31日
 *
 *  - yearbefore —— 一年前日期
 *
 *  - yearafter —— 一年后日期
 *
 * fomtter: 参考 getDate
 *
 * @returns Date | string
 */
const getSpecialDate = (dateType: _DateType, date: Date | null = new Date(_far_time()), fomtter?: _Fomtter): string | Date => {
  if (!date) {
    date = new Date(_far_time()) as Date
  }
  const _s_b_o_e = (_i_b?: boolean, _date = date as Date) => {
    if (_i_b) {
      _date.setHours(0)
      _date.setMinutes(0)
      _date.setSeconds(0)
    } else {
      _date.setHours(23)
      _date.setMinutes(59)
      _date.setSeconds(59)
    }
  }
  const _i_f = (date: string | number | Date) => {
    let _date = new Date(date)
    return fomtter ? getDate(_date, fomtter) : _date
  }
  switch (dateType) {
    case 'daybefore':
      return _i_f(new Date(date.getTime() - 24 * 60 * 60 * 1000))
    case 'dayafter':
      return _i_f(new Date(date.getTime() + 24 * 60 * 60 * 1000))
    case 'weekstart':
      _s_b_o_e(true)
      return _i_f(new Date(date.getTime() - (date.getDay() - 1) * 24 * 60 * 60 * 1000))
    case 'weekstart7': //从周日开始
      _s_b_o_e(true)
      return _i_f(new Date(date.getTime() - (date.getDay()) * 24 * 60 * 60 * 1000))
    case 'weekend':
      _s_b_o_e()
      return _i_f(new Date(date.getTime() + (7 - date.getDay()) * 24 * 60 * 60 * 1000))
    case 'weekbefore':
      _s_b_o_e(true)
      return _i_f(new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000))
    case 'weekafter':
      _s_b_o_e(true)
      return _i_f(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000))
    case 'monthstart':
      _s_b_o_e(true)
      return _i_f(new Date(date.getFullYear(), date.getMonth(), 1))
    case 'monthend':
      date = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      _s_b_o_e()
      return _i_f(date)
    case 'monthbefore':
      _s_b_o_e(true)
      date.setMonth(date.getMonth() - 1)
      return _i_f(date)
    case 'monthafter':
      _s_b_o_e(true)
      date.setMonth(date.getMonth() + 1)
      return _i_f(date)
    case 'yearstart':
      _s_b_o_e(true)
      date.setMonth(0)
      date.setDate(1)
      return _i_f(date)
    case 'yearend':
      _s_b_o_e()
      date.setMonth(11)
      date.setDate(31)
      return _i_f(date)
    case 'yearbefore':
      _s_b_o_e(true)
      date.setFullYear(date.getFullYear() - 1)
      return _i_f(date)
    case 'yearafter':
      _s_b_o_e()
      date.setFullYear(date.getFullYear() + 1)
      return _i_f(date)
  }
}

/** 获取时间
 * 
 */
const getDateObject = (date: Date | string | number = _far_time()) => {
  if (typeof date == 'string' || typeof date == 'number') {
    date = new Date(date) as Date
  }
  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString(),
    day: date.getDate().toString(),
    hour: date.getHours().toString(),
    minutes: date.getMinutes().toString(),
    seconds: date.getSeconds().toString(),
    week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()],
  }
}

type _DateType =
  | 'daybefore'
  | 'dayafter'
  | 'weekstart'
  | 'weekstart7'
  | 'weekend'
  | 'monthstart'
  | 'monthafter'
  | 'monthend'
  | 'yearstart'
  | 'yearend'
  | 'weekbefore'
  | 'weekafter'
  | 'monthbefore'
  | 'yearbefore'
  | 'yearafter'
type _Fomtter = string | 1 | 2 | 3 | 4 | 5

const _presetstall_fomtter = {
  1: 'YYYY-MM-DD hh:mm:ss',
  2: 'YYYY-M-D h:m:s',
  3: 'YYYY-MM-DD',
  4: 'YYYY-MM-D',
  5: 'YYYY-MM-DD hh:mm:ss w',
}

// 服务器时间戳 减去 客户端时间戳
let _time_diff = 0

// 同步时间
// async function getDiff() {
//   let t_a = _local_time(),
//     t_b
//   let v: any = await serverTime()
//   t_b = _local_time()
//   if (_time_diff) {
//     _time_diff = (_time_diff + v.data - t_a / 2 - t_b / 2) / 2
//   } else {
//     _time_diff = v.data - t_a / 2 - t_b / 2
//   }
// }

// 获取本地时间戳
const _local_time = () => new Date().getTime()

// 获取服务器时间戳
const _far_time = () => _local_time() + _time_diff

export {
  getDate, getSpecialDate, getDateObject
}