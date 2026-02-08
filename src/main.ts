import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './ui/App.vue'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
