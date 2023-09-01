---
title: 'computed 跟 watch 的差異'
date: '2023-08-23'
description: 'computed : 有「快取」的特性，根據依賴值的變化去計算結果（多對一）
，watch : 支援「非同步」，監聽一個值的變化去做一系列的事情（一對多）'
tags:
  - Vue3
  - computed
  - watch
---

# computed 跟 watch 的差異

- computed : 有「快取」的特性，根據依賴值的變化去計算結果（多對一）

- watch : 支援「非同步」，監聽一個值的變化去做一系列的事情（一對多）

兩者效能上會是以 computed 較好。「快取」意味著當計算屬性所依賴的數據沒有發生變化時，計算結果會被緩存，下一次訪問時可以**直接返回緩存的值，而不需要重新計算**。

## 認識 computed

## 認識 watch
