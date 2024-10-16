// import './assets/main.css'
import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Uploader from 'vue-media-upload';
import '@/services/AxiosInterceptorSetup.ts'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'

const app = createApp(App)
import { inject } from '@vercel/analytics'
inject()

app.use(createPinia())
app.use(router)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Uploader', Uploader);

app.mount('#app')
