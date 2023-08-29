<script setup></script>

<template>
  <nav class="hover:text-gray-700">
    <ContentNavigation v-slot="{ navigation }">
      <div v-for="link of navigation" :key="link._path">
        <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
      </div>
    </ContentNavigation>
  </nav>
</template>

<style scoped></style>
