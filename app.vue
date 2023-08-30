<template>
  <div
    :class="{
      'theme-light': !darkMode,
      'theme-dark dark': darkMode
    }"
    class="flex min-h-screen flex-col bg-themeBackground text-themeText duration-500 ease-in-out"
  >
    <BaseNavbar @dark-mode="handleDarkMode" />
    <div class="container mx-auto my-10 grow">
      <NuxtPage />
    </div>
    <BaseFooter />
  </div>
</template>

<script setup>
const darkMode = ref(false)
const handleDarkMode = (value) => {
  darkMode.value = value
}
</script>
