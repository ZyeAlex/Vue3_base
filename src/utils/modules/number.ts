/*
 * @Description: 数字处理
 * @Author: Zye
 * @Date: 2021-11-04
 */

/** 保留小数
 *
 * @param _num 数字
 * @param _parseFloat 保留小数位数
 * @returns
 */
export const  Num = (_num: string | number, _parseFloat = 2) =>{
  if (!_num) return 0
  if (typeof _num == 'string') {
    _num = parseFloat(_num)
  }
  return Number(_num.toFixed(_parseFloat))
}

