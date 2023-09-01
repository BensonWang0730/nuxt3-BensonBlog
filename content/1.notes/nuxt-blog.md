---
title: 'nuxt-content 做部落格'
date: '2023-09-01'
description: '這遍直接紀錄遇到的問題以及如何解決'
tags:
  - Nuxt3
  - nuxt-content
  - Blog
  - TailwindCSS
---

# nuxt-content 做部落格

這遍主要紀錄遇到的問題以及如何解決

一些之前沒用的技術：

- @nuxt/content
- @tailwindcss/typography

## 問題

### 如何做文章導覽列？如何取得 markdown 內容？

首先我們先暸解 `queryContent()` 跟 `<ContentDoc/>`

`queryContent()` 帶入資料夾名稱或是路徑，主要會是收尋 content 資料夾內的檔案

`<ContentDoc>` 用來縣市你寫的 markdown 內容，通常會在加上 typography 提供的 prose class 標籤。主要透過 `<ContentRenderer>` 跟 `<ContentQuery>` 做出來的

> It uses `<ContentRenderer>` and `<ContentQuery>` under the hood. - [官方](https://content.nuxtjs.org/api/components/content-doc)

### 如何控制文章排序？

抓取文章中的 date 屬性，並透過 `sort()` -1 又新到舊，前題是文章中的 date 要先寫好。<br>雖然 nuxt-content 有提供透過資料結構命名加上前綴 1. 2. 3. 達到排序的功能，但考量到未來順序更動會需要大量的手動變更。

content/notes/nuxt-blog.md

```
---
title: 'nuxt-content 做部落格'
date: '2023-09-01'
description: '這遍直接紀錄遇到的問題以及如何解決'
tags:
  - Nuxt3
  - nuxt-content
  - Blog
  - TailwindCSS
---
```

pages/notes.vue

```
const { data: notesList } = await useAsyncData('notesList', () => {
  return queryContent('notes').sort({ date: -1 }).find()
})
```

目前也有個疑惑，不知道 date 可不可以不手動輸入，依照創建檔案時間直接寫入？

### 頁面的 transition 怎麼做？

我們可以用 `<Transition>` 元件的方式，也可以直接寫在 nuxt.config 中，這邊我們將 router-view 出入時會用到的標籤直接加入樣式，如以下：

assets/css/tailwind.css

```css class='mt-0'
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: scale(0.99);

  // 這下面應該是可以不用加的，加的關係是因為切換時有不正常抖動
  position: absolute;
  top: 10%;
  right: 0;
  left: 0;
}
```

設定 nuxt.config，加入 pageTransition 的設定，name 屬性要輸入的值 .**page**-enter-from 開頭的 page，可以依照個人設定更改。

```
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  content: {
    markdown: {}
  },
  app: {
    head: {
      title: 'Benson Blog',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      charset: 'utf-8',
      link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }]
    },
    pageTransition: { name: 'page' }
  }
})
```

## 參考資源

https://www.youtube.com/watch?v=hDJGGzyaYx8

教學影片的 repo：<br>
https://github.com/BayBreezy/contentv2-nuxt3

我的 repo：<br>
https://github.com/BensonWang0730/nuxt3-BensonBlog
