import { resolve } from 'path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { SearchPlugin } from '@pzy915/vitepress-plugin-search'

export default defineConfig(async () => {
  return {
    server: {
      hmr: {
        overlay: false,
      },
      fs: {
        allow: [
          resolve(__dirname, '..'),
        ],
      },
    },
    plugins: [
      // custom
      SearchPlugin({
        previewLength: 20,
        buttonLabel: '搜索',
        placeholder: '文章搜索',
        tokenize: 'full',
      }),
      // plugins
      Components({
        dirs: resolve(__dirname, '.vitepress/theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          IconsResolver({
            componentPrefix: '',
          }),
        ],
        dts: './.vitepress/components.d.ts',
        transformer: 'vue3',
        
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        defaultStyle: 'display: inline-block',
      }),
      UnoCSS(),
    ],
  }
})
