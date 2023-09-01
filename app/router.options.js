// 待理解
export default {
  scrollBehavior(to, _, savedPosition) {
    const nuxtApp = useNuxtApp()

    // 記錄之前的位置
    if (savedPosition) {
      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce('page:finish', () => {
          setTimeout(() => {
            resolve(savedPosition), 50
          })
        })
      })
    }

    // 目錄點擊，到你要的標題
    if (to.hash) {
      setTimeout(() => {
        const heading = document.querySelector(to.hash)

        return window.scrollTo({
          top: heading.offsetTop,
          behavior: 'smooth'
        })
      })
      return
    }
  }
}
