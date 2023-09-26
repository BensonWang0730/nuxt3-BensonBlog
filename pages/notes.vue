<script setup>
const box = ref(null)
const data = ref(false)

const { data: notesList } = await useAsyncData('notesList', () => {
  return queryContent('notes').sort({ date: -1 }).find()
})

const lazyLoading = () => {
  const option = { threshold: 1 }
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      console.log('hi')
    }
  }, option)
  observer.observe(box.value)
}

onMounted(() => {
  lazyLoading()
})
</script>

<template>
  <div class="mx-auto flex max-w-[500px] flex-col">
    <p>一個寫筆記給自己看的地方，同時複習增加一下記憶！</p>
    <ul>
      <li
        v-for="(note, key) in notesList"
        :key="key"
        class="my-8 border-b-2 border-themeBorder py-4"
      >
        <NuxtLink
          :to="note._path"
          class="block text-2xl font-bold duration-300 hover:translate-x-1"
        >
          {{ note.title }}
        </NuxtLink>
        <p class="line-clamp-1 text-themeText opacity-60">{{ note.description }}</p>
        <p>{{ note.date }}</p>
      </li>
    </ul>
    <div ref="box"></div>
    <SkeletonNote v-if="data" />
  </div>
</template>

<style scoped></style>
