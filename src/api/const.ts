import axios from 'axios'

const http = axios.create({
    timeout: 1000 * 60 * 5,
})

// 请求
http.interceptors.request.use((config: any) => {
    return config
})

// 响应
http.interceptors.response.use(
    (response: any) => {
        const { data: { code, data, message } } = response
        switch (code) {
            case 200:
                return data
        }
        return Promise.reject(message)
    },
    (reject: any) => {
        return Promise.reject(reject)
    }
)

export default http