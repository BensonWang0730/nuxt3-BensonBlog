---
title: 'Node.js - Google OAuth2.0'
date: '2023-10-24'
description: '透過 mongoDB 加上 express，實作後端 google oauth'
tags:
  - node.js
  - google oauth
---

# Node.js - Google OAuth2.0

## 用途

第三方登入使用

- 授權委託，例：google 把使用者的 key 發出去
- 用戶交互的安全協議，但並不是身份認證協議
- 產生 JWT Token 存在 cookie

<!-- ![Untitled](https://www.notion.so/OAuth2-0-d5a596b00e3b4c8c999faa80cc0cf2c2?pvs=4#3ed5ec29722b4b048763ea170facc654) -->

## 常見用詞

- Resource Owner
  使用第三方登入的使用者，使用者本身
- Client
  取的使用者授權的網頁，網頁本身
- Authorization Server
  掌管授權的，Resource Owner 使用者確認完後，發放 Grant 授權狀給 client 網頁。
  有 Grant 才能取 Token，會回到你指定的 redirect_url
- scope
  決定跟使用者要哪些資料，例如：名稱、照片

OAuth2.0 共分 4 種授權類型流程

1. **Authorization Code Grant Flow （目前的做法）**
2. Implicit Grant Flow
3. Resource Owner Password Credentials Grant Flow
4. Client Credentials Grant Flow

## 如何使用

主要會分成兩隻 API：

1. Client 向 Authorization server 發送，其中設置包括 google api console 申請的 client_id、client_secret、redirect_url。

   並使用 `google-auth-library` 套件夾帶以上設置

   這隻 API 發送的方式會以 **form 的方式 post**，因爲使用一般發送會跳錯

   ```js
   const express = require('express')
   const router = express.Router()

   const { OAuth2Client } = require('google-auth-library')
   const jwt = require('jsonwebtoken')
   require('dotenv').config()

   // google 申請的（在 Google developer console）
   const { GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY, JWT_SECRET, HOST } = process.env
   const client = new OAuth2Client({
     clientId: GOOGLE_CLIENT_ID,
     clientSecret: GOOGLE_SECRET_KEY,
     redirectUri: 'http://127.0.0.1:5173/' // google develooer console 設定的要一樣
   })
   ```

2. 成功取得 client 授權後，解析重新導向回來的 url 中 query 的 code，也就是前一隻設定的 redirect_url 回傳加上的 code

   ```js
   // 回傳路由
   router.get('/callback', async (req, res) => {
     const { code } = req.query

     try {
       // 用授權碼換取 token
       const { tokens } = await client.getToken(code)
       client.setCredentials(tokens)

       // 透過 access token 在換取資料
       const userInfo = await client.request({
         url: 'https://www.googleapis.com/oauth2/v3/userinfo'
       })

       // 創建 JWT
       const token = jwt.sign(userInfo.data, JWT_SECRET)
       // 將 JWT 儲存在 Cookie，前端可從 Cookie 中讀取值
       res.cookie('token', token)
       res.redirect('/') // 跳轉回前端頁面
     } catch (error) {
       next(error)
     }
   })
   ```

還是有看到很多與上面兩個範例兩個不同的做法，可能是套件版本不同

Google API Console 創建自己的 OAuth

[[教學] Google OAuth 2.0 申請與使用指南 | 辛比誌](https://xenby.com/b/245-教學-google-oauth-2-0-申請與使用指南)

## 結論

用戶同意授權後，grant 會寫在 redirect_url 上的 query code，發 callback api 取得 token，在向 Authorization Server (google) 發送請求，才會取得用戶的資料。

在 redirect_url 花了很多時間，一開始誤以爲是會傳到網頁上，在去發 callback api，不過看到文章介紹 grant 顯示在 query 不是安全的做法（原本也覺得怪怪的），了解後才發現「 callback 在 Google API Console 就要設定好」。

前端尚未成功，後端扔需努力

## 參考資料

[從 Google 第三方登入看 OAuth2.0](https://fufong79570.medium.com/從google第三方登入看oauth2-0-9ed2a98a5e98)

[[筆記] 認識 OAuth 2.0：一次了解各角色、各類型流程的差異](https://medium.com/麥克的半路出家筆記/筆記-認識-oauth-2-0-一次了解各角色-各類型流程的差異-c42da83a6015)

[Google 的第三方登入 (web 前端實作)](https://dwatow.github.io/2021/06-15-google-sign-in-oauth/)

[Javascript OAuth2 Google Login & Logout Example Using Access Token in Browser](https://www.youtube.com/watch?v=bOd4eFqIg00)

[OAuth 2.0 筆記 (1) 世界觀 – Yu-Cheng Chuang’s Blog](https://blog.yorkxin.org/posts/oauth2-1-introduction/?source=post_page-----b750821cde90--------------------------------)
