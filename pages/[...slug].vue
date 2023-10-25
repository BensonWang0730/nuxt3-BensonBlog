<script setup>
const { path } = useRoute()
// const slug = useRoute().params.slug.toString().replace(/,/g, '/')

const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})

// const { data: navigation } = await useAsyncData('navigation', () => {
//   return queryContent(path).findOne()
// })
// 用來做目錄的
const toc = computed(() => {
  if (!data.value) return []
  const items = data.value.body?.children
  // console.log(items)
  if (!items) return []
  const toc = []
  const tags = ['h2', 'h3', 'h4', 'h5', 'h6']
  items.forEach((item) => {
    if (tags.includes(item.tag)) {
      toc.push({
        id: item.props.id,
        title: item.props.id.toString().replace(/-/g, ' '),
        depth: Number(item.tag.replace(/h/g, ''))
      })
    }
  })
  return toc
})
</script>

<template>
  <main class="flex h-fit items-start gap-10">
    <div
      v-if="data"
      class="sticky right-0 top-10 hidden w-[220px] rounded-lg border border-themeBorder p-8 opacity-80 xl:inline-block"
    >
      <h2 class="mb-2 text-lg font-medium">目錄</h2>
      <ul class="space-y-2">
        <li v-for="item in toc" :key="item.id">
          <NuxtLink
            class="line-clamp-1 uppercase"
            :class="{
              'ml-2': item.depth == 2,
              'ml-4 text-sm': item.depth > 2
            }"
            :to="`#${item.id}`"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
      <!-- {{ toc }} -->
    </div>
    <!-- 暫時作法 xl:pr-[100px] -->
    <div v-if="data" class="mx-auto max-w-[1000px] 2xl:pr-[100px]">
      <ContentRenderer
        :value="data"
        class="prose mx-auto max-w-[1000px] dark:prose-invert prose-headings:no-underline before:prose-headings:content-['#'] prose-h1:text-center before:prose-h1:content-[''] prose-a:no-underline prose-pre:bg-gray-100 dark:prose-pre:bg-black"
      />
      <div class="my-8">
        <a
          v-for="tag in data.tags"
          :key="tag"
          :href="`/notes/tags/${tag}`"
          class="mr-3 inline-block rounded-lg bg-gray-400 px-4 py-2 text-sm font-semibold text-gray-100 duration-300 last:mr-0 hover:bg-opacity-90"
        >
          # {{ tag }}
        </a>
      </div>
    </div>

    <div v-if="!data" class="mx-auto">
      <!-- <ContentDoc class="prose dark:prose-invert prose-headings:no-underline prose-h1:text-center" /> -->
      <p>⛔️ 這篇文章目前沒有內容 ⛔️</p>
    </div>
  </main>
</template>
