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

const pageWidth = ref()
const menuStatus = ref(false)
const toggleMenu = () => {
  menuStatus.value = !menuStatus.value
}
const handleResize = () => {
  pageWidth.value = window.innerWidth
  if (pageWidth.value >= 640) {
    menuStatus.value = true
  } else {
    menuStatus.value = false
  }
}
if (process.client) {
  window.addEventListener('resize', handleResize)
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
    <nav
      class="container mx-auto gap-5 px-4 py-3 sm:flex sm:h-auto sm:items-center sm:justify-between sm:px-0 sm:py-5"
    >
      <div class="flex justify-between">
        <NuxtLink to="/" class="my-link font-bold">Benson Wang</NuxtLink>
        <Icon icon="ic:baseline-menu" class="h-6 w-6 sm:hidden" @click="toggleMenu" />
      </div>
      <Transition name="menu">
        <ul v-show="menuStatus" class="my-4 grid sm:my-0 sm:grid-cols-3 sm:gap-5">
          <li v-for="(item, key) in navigation" :key="key" class="my-2 font-bold sm:my-0">
            <NuxtLink :to="item.href" class="my-link"> {{ item.name }}</NuxtLink>
          </li>
        </ul>
      </Transition>
      <Transition name="menu">
        <div v-show="menuStatus" class="rounded-full p-1">
          <Icon
            :icon="darkMode ? 'ic:outline-nightlight-round' : 'ic:outline-light-mode'"
            class="h-6 w-6 rotate-[-30deg] cursor-pointer duration-300 ease-in-out"
            @click="setTheme(darkMode ? 'light' : 'dark')"
          />
        </div>
      </Transition>

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
