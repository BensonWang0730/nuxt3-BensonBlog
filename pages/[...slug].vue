<script setup>
// 用來做目錄的
// const slug = useRoute().params.slug.toString().replace(/,/g, '/')
// const { data: blog } = await useAsyncData(slug, () => {
//   return queryContent(slug).findOne()
// })

//////
const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})
</script>

<template>
  <main v-if="data" class="mx-auto max-w-[1000px]">
    <ContentRenderer
      :value="data"
      class="prose mx-auto max-w-[1000px] dark:prose-invert prose-headings:no-underline prose-h1:text-center"
    />
    <div class="my-8">
      <a
        v-for="tag in data.tags"
        :key="tag"
        :href="`/notes/tags/${tag}`"
        class="mr-3 inline-block rounded-lg bg-gray-400 px-4 py-2 text-sm font-semibold text-gray-100 last:mr-0"
      >
        # {{ tag }}
      </a>
    </div>
  </main>

  <main v-if="!data">
    <!-- <ContentDoc class="prose dark:prose-invert prose-headings:no-underline prose-h1:text-center" /> -->
    <p>加班施工中</p>
  </main>
</template>
