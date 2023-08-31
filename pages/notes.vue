<script setup>
// fetchContentNavigation 回傳值比較簡潔
// const { data: blogNav } = await useAsyncData('navigation', () => {
//   return fetchContentNavigation(queryContent('/'))
// })

const { data: notesList } = await useAsyncData('notesList', () => {
  return queryContent('notes').sort({ date: -1 }).find()
})
</script>

<template>
  <div class="mx-auto flex max-w-[500px] flex-col">
    <p>一個紀錄筆記的地方，主要寫給自己看的，同時複習一下增加記憶！</p>
    <ul>
      <li
        v-for="(note, key) in notesList"
        :key="key"
        class="my-8 border-b-2 border-themeBorder py-4"
      >
        <NuxtLink :to="note._path" class="text-2xl font-bold hover:translate-x-3">
          {{ note.title }}
        </NuxtLink>
        <p class="line-clamp-1 text-themeText opacity-60">{{ note.description }}</p>
        <p>{{ note.date }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
