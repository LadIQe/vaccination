import { createApp, createSSRApp, h } from 'vue'
import { store, storeKey } from './store'

import App from './App.vue'
import Modal from '@/components/common/Modal.vue'
import router from './router'

export default function () {
  const rootComponent = {
    render: () => h(App),
    components: { App }
  }

  const app = (typeof window === 'undefined' ? createSSRApp : createApp)(rootComponent)

  app.use(router)
  app.use(store, storeKey)

  app.component('Modal', Modal)

  return {
    app,
    router,
    store
  }
}
