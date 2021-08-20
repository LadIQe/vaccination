import { createApp, createSSRApp, h } from 'vue'
import { store, storeKey } from './store'

import App from './App.vue'
import router from './router'

export default function () {
  const rootComponent = {
    render: () => h(App),
    components: { App }
  }

  const app = (typeof window === 'undefined' ? createSSRApp : createApp)(rootComponent)

  app.use(router)
  app.use(store, storeKey)

  return {
    app,
    router,
    store
  }
}
