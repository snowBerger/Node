import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()
    // https://meum.icarbonx.com/report?plan=Meum&type=DigitalLife&pId=100
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) return reject({ code: 404 })
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) return Component.asyncData({ store, route: router.currentRoute})
      })).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}