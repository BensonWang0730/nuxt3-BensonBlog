<script setup>
// 用來做目錄的
const slug = useRoute().params.slug.toString().replace(/,/g, '/')
const { data: blog } = await useAsyncData(slug, () => {
  return queryContent(slug).findOne()
})
</script>

<template>
  <main>
    <ContentDoc />
  </main>
</template>
