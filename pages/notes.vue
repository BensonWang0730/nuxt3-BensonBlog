<script setup>
// fetchContentNavigation 回傳值比較簡潔
// const { data: blogNav } = await useAsyncData('navigation', () => {
//   return fetchContentNavigation(queryContent('/'))
// })

const { data: notesList } = await useAsyncData('notesList', () => {
  return queryContent('notes').find()
})
</script>

<template>
  <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
    <p>This is my notes</p>
    <!-- <div>{{ notesList }}</div> -->
    <ul>
      <li
        v-for="(note, key) in notesList"
        :key="key"
        class="my-8 border-b-2 border-themeBorder py-4"
      >
        <NuxtLink :to="note._path" class="text-2xl font-bold hover:translate-x-3">
          {{ note.title }}
        </NuxtLink>
        <p class="text-gray-500">{{ note.description }}</p>
        <p>{{ note.navigation.date }}</p>
      </li>
    </ul>
    <!-- <ul>
      <li v-for="(note, key) in blogNav" :key="key">
        {{ note.title }}
      </li>
    </ul> -->
    <!-- <div v-for="(b, i) in blogNav[0].children" :key="`blogNavItem-${b._path}-${i}`">
      <div class="rounded-lg border-2 px-5 py-7">
        <h2>
          {{ b.title }}
        </h2>
      </div>
    </div> -->
  </div>
</template>

<style scoped></style>
