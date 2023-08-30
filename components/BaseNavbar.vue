<script setup lang="ts">
import { Icon } from '@iconify/vue'

type Theme = 'light' | 'dark'

const LOCAL_STORAGE_THEME_KEY = 'theme'
const route = { name: 'index' }

const navigation = [
  { name: 'Notes', href: '/notes', current: route.name.includes('note') },
  { name: 'Project', href: '/project', current: route.name.includes('project') },
  { name: 'Contact', href: '/contact', current: route.name === 'contact' }
]

const darkMode = useState('theme', () => false)
const emit = defineEmits(['darkMode'])
const setTheme = (newTheme: Theme) => {
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  darkMode.value = newTheme === 'dark'
  emit('darkMode', darkMode.value)
}

onMounted(() => {
  const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches
  const themeFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme

  if (themeFromLocalStorage) {
    setTheme(themeFromLocalStorage)
  } else {
    setTheme(isDarkModePreferred ? 'dark' : 'light')
  }
})
</script>

<template>
  <div class="border-b border-themeBorder">
    <nav class="container mx-auto gap-5 py-5 sm:flex sm:items-center sm:justify-between">
      <NuxtLink to="/" class="my-link font-bold">Benson Wang</NuxtLink>
      <ul class="grid sm:grid-cols-3 sm:gap-5">
        <li v-for="(item, key) in navigation" :key="key" class="font-bold">
          <NuxtLink :to="item.href" class="my-link"> {{ item.name }}</NuxtLink>
        </li>
      </ul>

      <div class="rounded-full p-1">
        <Icon
          :icon="darkMode ? 'ic:outline-nightlight-round' : 'ic:outline-light-mode'"
          class="h-6 w-6 cursor-pointer duration-300 ease-in-out"
          @click="setTheme(darkMode ? 'light' : 'dark')"
        />
      </div>

      <!-- <ContentNavigation v-slot="{ navigation }">
        <div v-for="link of navigation" :key="link._path">
          <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
        </div>
      </ContentNavigation> -->
    </nav>
  </div>
</template>

<style scoped>
.my-link:hover {
  @apply text-gray-500 duration-300 ease-in-out;
}
.router-link-active {
  @apply text-gray-500;
}
</style>
