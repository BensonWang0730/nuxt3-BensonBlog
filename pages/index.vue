<script setup>
// 會在 server side fetch 資料回來
const { data: blogNav } = await useAsyncData('navigation', () => {
  return fetchContentNavigation(queryContent('/'))
})
</script>

<template>
  <div>
    <BaseNav />
    <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div>{{ blogNav }}</div>
      <!-- <div v-for="(b, i) in blogNav[0].children" :key="`blogNavItem-${b._path}-${i}`">
      <div class="rounded-lg border-2 px-5 py-7">
        <h2>
          {{ b.title }}
        </h2>
      </div>
    </div> -->
    </div>
  </div>
</template>

<style scoped></style>
