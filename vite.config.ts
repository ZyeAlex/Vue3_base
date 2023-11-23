import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, UserConfigExport, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  // 根据env配置解析代理http地址
  const http = (urlName: string, protocol = 'http', url = '', port = env['VITE_PORT_' + urlName]) => {
    if (env.VITE_PORT) {
      let [from, to] = env.VITE_PORT.split('-')
      port = port.replace(from, to)
    }
    url = url || env['VITE_URL_' + urlName] || env.VITE_URL + ':' + port
    return protocol + '://' + url
  }
  const ws = (urlName: string) => {
    return http(urlName, 'ws', env['VITE_WS_' + urlName])
  }
  // 配置项
  const config: UserConfigExport = {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 引入全局变量文件
          additionalData: `
            // @import '@/styles/index.scss';
            @import '@/styles/theme/index.scss';
          `
        }
      }
    },
    server: {
      https: false,
      host: '0.0.0.0',
      port: Number(env.VITE_PORT_LOCAL),
      proxy: {
        '/api': {
          target: http('API'),
          ws: false,
          changeOrigin: false,
        }
      }
    }
  }
  // element引入
  const fullImportElementPlus = () => {
    return <Plugin>{
      name: 'fullImportElementPlus',
      transform(code, id) {
        if (id.includes('/src/main.ts')) {
          const prepend = `import ElementPlus from 'element-plus';import zhCn from 'element-plus/es/locale/lang/zh-cn';`
          code = code.replace(
            '.mount(',
            ($1) => `.use(ElementPlus,{ locale: zhCn })` + $1
          )
          return prepend + code
        }
        return code
      },
    }
  }
  if (mode == 'production') {
    config.plugins?.push(
      Components({
        resolvers: [ElementPlusResolver()],
      })
    )
  } else {
    config.plugins?.push(fullImportElementPlus())
  }
  return config
}
)

