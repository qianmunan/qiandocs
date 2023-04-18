import DefaultTheme from 'vitepress/theme'
import { EnhanceAppContext, inBrowser, Theme, useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import { nextTick, onMounted, watch } from 'vue'
import './style/var.css'
import './style/global.css'
import './style/main.css'
import './style/demo.css'
import './style/utils.css'
import 'uno.css'


const theme: Theme = {
    ...DefaultTheme,
    enhanceApp({ router, app }: EnhanceAppContext) {
        if ( inBrowser ){
        } 
    }, 
    setup() {
        const route = useRoute()
        const initZoom = () => {
          mediumZoom('.main img', { background: 'var(--vp-c-bg)' }) // Should there be a new?
        }
        onMounted(() => {
          initZoom()
        })
        watch(
          () => route.path,
          () => nextTick(() => initZoom()),
        )
      },
}

export default theme