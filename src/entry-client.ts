import createApp from './app'

declare let window: any

const { app, store, router } = createApp()

;(async (a, s, r) => {
  const initStore = window.INITIAL_STORE

  await r.isReady()

  if (initStore) {
    s.replaceState(initStore)
  }

  a.mount('#app', true)
})(app, store, router)
