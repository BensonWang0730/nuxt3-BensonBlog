---
title: 'Side Affect'
date: '2024-1-25'
description: '在錯誤使用 computed 的情況下，遇到的問題，並一路由 Side Affect 看到 Pure Function。之後會在看看什麼是 Functional Programming。'
tags:
  - Side Affect
  - Computed
  - Function Programming
---

### 什麼是 Side Affect ?

---

外部變數、函式傳入的參數改動，都有會有 Side Affect。
主要講的就是改動有沒有影響到原始變數，例如有些陣列方法，會修改到原陣列 (例：splice)，有些則是回傳新的陣列 (例：slice)。

```tsx
let arr = [1, 2, 3, 4, 5]

arr.splice(0, 2) // arr -> [1,2] impure function
```

### 什麼是 Pure Function ?

---

- 輸入輸出結果固定（丟什麼變數進入，就丟什麼出來）
- 不會引用到，不是該 scope 的變數
- 沒有任何 Side Effect

## Functional Programming

瞭解了 Pure Function 就來認識 Functional Programming。

使用 FP 的主要目的，分別為以下：

- 純函式（Pure Function）: 給定相同的輸入，總是產生相同的輸出。得代碼更容易測試、理解且易於維護。
- 不可變的（Immutable）：倡導不改變原始資料，如使用 JS Array method，`splice`、`shift`、`unshift`、`pop` … 都是會改變原始資料（mutable）的，應自行創建改寫為 Immutable function，有助於處理並行性，因為沒有共享的狀態，減少了競態條件的可能性。
- 避免共享狀態
- 聲名式風格（Declarative）

### Array method : Mutable → Immutable

---

初始值

```jsx
const color = ['red', 'yellow', 'blue']
```

`push`

```jsx
// mutable
const newColor = colors.push('purple', 'green')

console.log(colors) // ['red', 'yellow', 'blue', 'purple', 'green']
console.log(newColor) // 5 <- 陣列長度
```

```jsx
// immutable 不會改變到原始陣列
const purePush = (array, newArray) => [...array, ...newArray]
const newArray = purePush(color, ['purple', 'green'])

console.log(colors) // ['red', 'yellow', 'blue']
console.log(newArray) // ['red', 'yellow', 'blue', 'purple', 'green']
```

---

### 參考資料

[JavaScript: Functional Programming 函式編程概念](https://totoroliu.medium.com/javascript-functional-programming-函式編程概念-e8f4e778fc08)

[Functional Programming in JS ](https://ithelp.ithome.com.tw/articles/10234554)
