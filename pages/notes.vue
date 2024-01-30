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

const allTags = computed(() => {
  if (typeof notesList.value === 'object') {
    return countAllTags(notesList.value)
  }
})

const countAllTags = (data) => {
  let tagsTotal = 0

  const result = data.reduce((group, item) => {
    item.tags.forEach((tag) => {
      if (group[tag]) {
        group[tag]++
      } else {
        group[tag] = 1
      }
      tagsTotal++
    })
    return group
  }, {})

  result['tagsTotal'] = tagsTotal
  return result
}

onMounted(() => {
  lazyLoading()
})
</script>

<template>
  <div class="relative grid grid-cols-1 items-start md:grid-cols-3">
    <div class="order-1"></div>
    <div class="sticky top-20 order-3">
      <ul class="flex flex-wrap gap-2 pl-20 pt-20">
        <li
          v-for="(count, tag) in allTags"
          :key="tag"
          class="rounded-lg bg-gray-400 px-2 py-1 text-sm font-semibold text-gray-100 duration-300"
        >
          {{ tag }}
        </li>
      </ul>
    </div>

    <div class="order-2 mx-auto flex max-w-[500px] flex-col">
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
          <ul class="flex flex-wrap gap-2 pt-1">
            <li
              v-for="tag in note.tags"
              :key="tag"
              class="rounded-lg bg-gray-400 px-4 py-1 text-sm font-semibold text-gray-100 duration-300"
            >
              {{ tag }}
            </li>
          </ul>
        </li>
      </ul>
      <div ref="box"></div>
      <SkeletonNote v-if="data" />
    </div>
  </div>
</template>

<style scoped></style>
