---
title: 'Vue Lifecycle'
date: '2023-08-23'
description: '了解 Vue 運作模式，知道什麼地方可以做什麼事！'
tags:
  - Vue2
  - Vue3
---

# Vue 生命週期

## 為什麼需要了解

了解 Vue 運作模式，知道什麼地方可以做什麼事！

例如：在 beforeMount() 階段就無法進行 DOM 結構操作。在什麼時候可以發送 API ?

## 生命週期介紹

主要以 Vue3 生命週期說明，了解組件「從掛載到銷毀的整個過程」，主要分成的事件如下：

---

onBeforeMount → onMounted → onBeforeUpdate → onUpdate → onBeforeUnmount → onUnmounted

---

個人理解上會分成 3 個部分

1. Mounted 掛載上去
2. Update 是件更新
3. Unmount 卸載

為什麼要卸載？是為了釋放資源，當事件不需要時就可以使用（定時器、是件監聽），防止接收到不必要的更新。

## 測試 code

<div class='flex flex-col md:flex-row justify-between gap-8  '>
<div class='w-full sm:w-1/2'>
vue2

```js
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello from Vue 2!'
    };
  },
  beforeCreate() {
    console.log('Vue 2: beforeCreate');
  },
  created() {
    console.log('Vue 2: created');
  },
  beforeMount() {
    console.log('Vue 2: beforeMount');
  },
  mounted() {
    console.log('Vue 2: mounted');
  },
  beforeUpdate() {
    console.log('Vue 2: beforeUpdate');
  },
  updated() {
    console.log('Vue 2: updated');
  },
  beforeDestroy() {
    console.log('Vue 2: beforeDestroy');
  },
  destroyed() {
    console.log('Vue 2: destroyed');
  }
};
</script>

```

</div>
<div class='w-full sm:w-1/2'>
vue3

```js
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

export default {
  setup() {
    const message = ref('Hello from Vue 3!')

    onBeforeMount(() => {
      console.log('Vue 3: onBeforeMount')
    })
    onMounted(() => {
      console.log('Vue 3: onMounted')
    })
    onBeforeUpdate(() => {
      console.log('Vue 3: onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('Vue 3: onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('Vue 3: onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('Vue 3: onUnmounted')
    })

    return {
      message
    }
  }
}
</script>
```

</div>
</div>
