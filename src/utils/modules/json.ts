/*
 * @Description:展示JSON
 * @Author: Zye
 * @Date: 2022-09-30
 */

/** 将JSON数据转换为表达式
 *
 * @param params JSON字符串
 * @returns 页面字符串
 */
export function JSONString(params: any, _space = 4, _first_level = true): string {
  // 数组
  if (Array.isArray(params)) {
    if (!params.length) return '[],'
    // 是否含有对象
    if (params.some((v) => v && typeof v == 'object')) {
      return removeTail(
        `[
        <div contenteditable style="display:flex">
          <div contenteditable>${'&nbsp'.repeat(_space)}</div><div contenteditable>${removeTail(
          params.reduce((s, v, i) => s + '<div contenteditable>' + JSONString(v, _space, false) + '</div>', ''),
          true
        )}</div>
        </div>
        <div contenteditable>],</div>`,
        _first_level
      )
    } else {
      return removeTail(
        `[
          <div contenteditable style="display:flex">
            <div contenteditable>${'&nbsp'.repeat(_space)}</div><div contenteditable>${removeTail(params.reduce((s, v) => s + JSONString(v, _space, false), '').slice(0, -1), true)}</div>
          </div>
        <div contenteditable>],</div>`,
        _first_level
      )
    }
  }
  // 对象
  else if (typeof params == 'object' && params !== null) {
    let keys = Object.keys(params)
    if (!keys.length) return '{},'
    return removeTail(
      `{
      <div contenteditable style="display:flex">
        <div contenteditable>${'&nbsp'.repeat(_space)}</div><div contenteditable>
          ${removeTail(
        keys.reduce((s, key) => s + '<div contenteditable>' + key + ':&nbsp;' + JSONString(params[key], _space, false) + '</div>', ''),
        true
      )}
        </div>
      </div>
      <div contenteditable>},</div>`,
      _first_level
    )
  }
  // 文本
  else {
    return removeTail(`${typeof params == 'string' ? '"' + params + '"' : params},`, _first_level)
  }
}

function removeTail(str: string, transform?: boolean) {
  if (!transform) return str
  let arr = str.split(',')
  console.log(arr.slice(0, -1).join(',') + arr[arr.length - 1])
  return arr.slice(0, -1).join(',') + arr[arr.length - 1]
}


