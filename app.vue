<template>
  <div
    :class="{
      'theme-light': !darkMode,
      'theme-dark': darkMode
    }"
    class="h-screen bg-themeBackground text-themeText"
  >
    <!-- <div :class="darkMode ? 'dark' : ''"> -->
    <BaseNavbar @dark-mode="handleDarkMode" />
    <div class="container mx-auto">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
const darkMode = ref(false)
const handleDarkMode = (value) => {
  darkMode.value = value
}
</script>
