/*
 * @Description: 对象处理
 * @Author: Zye
 * @Date: 2022-09-08
 */

// const kv = [
//   {
//     key:1,
//     value:'a'
//   }
// ]
// const a = getObject(kv,'key',1,'value') //'a'

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
