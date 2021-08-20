import createApp from './app'

export default async function (url: string) {
  const { app, router, store } = createApp()

  await router.push(url)
  await router.isReady()

  return {
    app,
    router,
    store
  }
}
