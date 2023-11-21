/*
 * @Description: 对象处理
 * @Author: Zye
 * @Date: 2022-09-08
 */

/** 从对象数组中获取key项
 *
 * @param _obj_arr 数据数组
 * @param _key_name 要寻找的key
 * @param _key_value 要寻找的value
 * @param _found_key_name 要获取值得key
 */
export const getObject = (
  _obj_arr: Object[],
  _key_name: string,
  _key_value: any,
  _found_key_name?: string
) => {
  let obj =
    _obj_arr.find((v) =>
      typeof _key_value == 'function'
        ? _key_value(v[_key_name])
        : v[_key_name] == _key_value
    ) || new Object()
  return _found_key_name ? obj[_found_key_name] : obj
}

/** 过滤属性
 * 
 * @param obj 对象
 * @param arrs 属性
 * @returns 
 */
export const filterObject = (obj: object, ...arrs: string[]) => {
  const _obj = {}
  arrs.forEach(v => _obj[v] = obj[v])
  return _obj
}

/** 遗弃属性
 * 
 * @param obj 对象
 * @param arrs 属性
 * @returns 
 */
export const splitObject = (obj: object, ...arrs: string[]) => {
  const _obj = {}
  Object.keys(obj).forEach(v => {
    if (!arrs.includes(v)) {
      _obj[v] = obj[v]
    }
  })
  return _obj
}

/** 数组扁平化
 *
 * @param _arr_list 高维数组
 * @param deep 深度 默认0(无穷)
 * @returns
 */
export const getArray = (_arr_list: any[], deep = 0): any[] => {
  function _get_array(_arr_list: any[], deep = 0, _arr: any[] = []): any[] {
    return _arr.concat(
      ..._arr_list.map((v: any) =>
        deep - 1 && Array.isArray(v) ? _get_array(v, deep - 1) : v
      )
    )
  }
  return _get_array(_arr_list, deep)
}

