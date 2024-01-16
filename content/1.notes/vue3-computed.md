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

### 介紹

監聽響應式的變化，預設是 readonly，只會有 getter (取值)。computed 可以使用 getter & setter，需要透過屬性裡建立物件的方法來創建 `getter` & `setter`。

### getter

是指負責計算 computed 中響應式變數的變化，並可以回傳其結果。computed 屬性預設為 getter，通常是唯讀的，所以不能夠 `computedValue.value = newValue` 這樣的方式來重新賦值。

簡單來說，就是 computed 所賦值的變數，不能夠重新賦值。

以下為 computed 範例

```tsx
import { ref, computed } from 'vue'

const count = ref(0)

const computedValue = computed(() => {
  return count.value * 2
})

console.log(computedValue.value) // 此時會計算 count.value * 2
```

### setter

什麼時候會使用到 setter ? 當你想對 computed 所創建的變數重新賦值時，就必須用 setter 的方式創建 computed。觸發順序為 setter → getter，如果 getter 中的響應式變數沒有被觸發到，computed 變數也不會有新的回傳值。

```tsx
const price = ref()
const discount = ref()

const total = computed(() => {
	get(){
		return price.value * discount.value
	}
	set(newValue){
		discount.value = newValue
	}
})

const changeComputed = () => {
	total.value = Number(Math.random().toFixed(1))
}
```

## 認識 watch

## 參考

[computed 的 get 與 set 運作機制](https://ithelp.ithome.com.tw/articles/10275281?sc=iThomeR)
