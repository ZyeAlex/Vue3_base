/*
 * @Description: URL处理
 * @Author: Zye
 * @Date: 2022-11-21
 */

// 字符串拼接
export const query = (keyValue: object | null) => {
    return keyValue
        ? '?' +
        Object.keys(keyValue)
            .filter((key) => keyValue[key] !== undefined && keyValue[key] !== null)
            .map((key) => encodeURI(key) + '=' + encodeURI(keyValue[key]))
            .join('&')
        : ''
}