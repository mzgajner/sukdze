import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ui({
      ui: {
        button: {
          variants: {
            block: {
              true: {
                leadingIcon: 'me-auto',
              },
            },
          },
        },
        card: {
          slots: {
            header: 'p-3 sm:px-4',
            body: 'p-3 sm:p-4',
            footer: 'p-3 sm:px-4',
          },
        },
        colors: {
          primary: 'violet',
        },
        icons: {
          // chevronDoubleLeft: '',
          // chevronDoubleRight: '',
          // chevronDown: '',
          // chevronLeft: '',
          // chevronRight: '',
          // arrowLeft: '',
          // arrowRight: '',
          // check: '',
          // close: '',
          // ellipsis: '',
          // external: '',
          loading: 'i-ant-design:loading-outlined',
          // minus: '',
          // search: '',
        },
      },
    }),
  ],
})
