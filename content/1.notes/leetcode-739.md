---
title: 'Leetcode - 739.Daily Temperatures'
date: '2023-12-21'
description: '刷題 stack 資料結構，難度 medium'
tags:
  - Leetcode
  - medium
  - stack
---

# Leetcode - 739.Daily Temperatures

### **Description：**

Given an array of integers `temperatures` represents the daily temperatures, return *an array* `answer` *such that* `answer[i]` *is the number of days you have to wait after the* `ith` *day to get a warmer temperature*. If there is no future day for which this is possible, keep `answer[i] == 0` instead.

計算比當日溫度更高溫的日的間隔，如果沒有則回傳 0

**Example：**

```jsx
Input: temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
Output: [1, 1, 4, 2, 1, 1, 0, 0]
```

### 我的解法

因為這題是被歸類在 stack 資料解構中，不過自己的解法好像沒有應用使用 stack，在 Submit 後，卡在了 47/28 testcases \[ 99,99,99,99… \]，比較全部相同的數所造成的 **`Time Limit Exceeded`**

**解題思路：**

ㄧ個指標當作當前位置，並向後方數做比較（有點像暴力解）。因為結果是陣列的，所以就先創一個 stack 的陣列，每當找出 gap 便 push 進去陣列。

**Solution：**

```jsx
var dailyTemperatures = function (temperatures) {
  const stack = []
  let pointer = 0
  let gap = 1

  while (pointer < temperatures.length) {
    if (temperatures[pointer] >= temperatures[pointer + gap]) {
      gap++
    } else if (pointer + gap === temperatures.length) {
      gap = 0
      stack.push(gap)
      pointer++
    } else {
      pointer++, stack.push(gap)
      gap = 1
    }
  }

  return stack
}
```

### 參考解法

需要特別考慮到如果所有數都相同，就不需要一個比完全部，第二個又要再比到最後，可以將未找到較大的數放入 stack 中，找到時在 pop 做計算。

**解題思路：**

一開始將所有的 gap 都預設為 0，先將 (溫度、index) push 到 stack 中，如果下一個溫度比當前高，就可以將其 pop 出來，並將下一個的 push 進去，pop 出的在跟 push 入的 index 相減存入 res 中。主要變成跟 stack 中的數做比較，實作上還要在想想 bottom-up 跟 top-down 兩種方式。

```jsx
stack = [(t, index)]
res = [0, 0, 0, 0]
```

**Solution：**

```jsx
var dailyTemperatures = function (temperatures) {
  let lens = temperatures.length
  let res = new Array(lens).fill(0)

  let stack = []

  for (let i = 0; i < lens; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      let index = stack.pop()
      res[index] = i - index
    }
    stack.push(i)
  }
  return res
}
```

### 參考資料

[[LeetCode] 739. Daily Temperatures](https://medium.com/tomsnote/leetcode-739-daily-temperatures-70e003af6116)
