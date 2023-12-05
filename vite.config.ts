import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, UserConfigExport, Plugin } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const root = process.cwd()
  function pathResolve(dir: string) {
    return resolve(root, '.', dir)
  }
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
      UnoCSS({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            scale: 1.2,
            warn: true,
          }),
        ],
        shortcuts: {
          frc: 'flex items-center justify-center',
          fcc: 'flex flex-col items-center justify-center',
          fcb: 'flex flex-col items-center justify-between',
          frb: 'flex items-center justify-between',
          fre: 'flex items-center justify-evenly',
          full: 'w-full h-full',
          cp: 'cursor-pointer',
        },
        transformers: [transformerDirectives(), transformerVariantGroup()],
      }),
      createSvgIconsPlugin({
        iconDirs: [pathResolve('src/assets/svgs')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 引入全局变量文件
          additionalData: `
            @import '@/styles/theme/index.scss';
            @import '@/styles/element/index.scss';
          `,
        },
      },
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
        },
      },
    },
  }
  // element引入
  const fullImportElementPlus = () => {
    return <Plugin>{
      name: 'fullImportElementPlus',
      transform(code, id) {
        if (id.includes('/src/main.ts')) {
          const prepend = `import ElementPlus from 'element-plus';import zhCn from 'element-plus/es/locale/lang/zh-cn';`
          code = code.replace('.mount(', ($1) => `.use(ElementPlus,{ locale: zhCn })` + $1)
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
})
