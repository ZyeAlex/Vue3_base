import axios from 'axios'

const req = axios.create({
    timeout: 1000 * 60 * 5
})

// 请求
req.interceptors.request.use((config: any) => {
    return config
})

// 响应
req.interceptors.response.use((response: any) => {
    const { data } = response
    return data
})

export default req