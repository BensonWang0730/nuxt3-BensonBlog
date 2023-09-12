<script setup lang="ts">
const projectInfo = [
  {
    file: '/project/inkedsoul.jpeg',
    name: '刺青師媒合平台',
    description: '',
    link: 'https://inked-soul.vercel.app/'
  },
  {
    file: '/project/bensonblog.jpg',
    name: '個人部落格',
    description: '',
    link: 'https://benson-blog-fawn.vercel.app/'
  },
  {
    file: '/project/househotel.jpg',
    name: '訂房旅館',
    description: '',
    link: 'https://bensonwang0730.github.io/HouseHotel/'
  }
]
</script>

<template>
  <section>
    <ul class="grid grid-cols-2 gap-8 sm:grid-cols-3">
      <li
        v-for="(item, key) in projectInfo"
        :key="key"
        class="max-w-[400px] overflow-hidden rounded-lg border"
      >
        <img :src="item.file" alt="" class="border-b object-cover" />
        <div class="p-3">
          <p class="font-bold">{{ item.name }}</p>
          <a
            class="underline opacity-60 duration-200 hover:opacity-80"
            :href="item.link"
            target="_blank"
            >前往查看</a
          >
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
