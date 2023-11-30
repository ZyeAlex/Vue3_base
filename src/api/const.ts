import axios from 'axios'

const http = axios.create({
    timeout: 1000 * 60 * 5,
})

// 请求
http.interceptors.request.use((config: any) => {
    return config
})

// 响应
http.interceptors.response.use((response: any) => {
    const { data } = response
    return data
})

export default http