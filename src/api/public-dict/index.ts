import http from '../const'
import { query } from '@/utils'

// // 示例
export const getDict = (params) => {
    return http.get('/url' + query(params))
}