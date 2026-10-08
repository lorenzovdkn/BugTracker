import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './style.css'
import App from './App.vue'
import router from './router/index.ts'

createApp(App).use(router).mount('#app')
