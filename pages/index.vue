<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="mx-auto max-w-[600px]">
    <div class="flex flex-row items-center justify-between gap-5 sm:gap-10">
      <img
        src="/head.jpeg"
        alt="頭像"
        class="h-[100px] w-[100px] rounded-full object-cover sm:h-[180px] sm:w-[180px]"
      />
      <div>
        <h1>Benson Wang</h1>
        <p>Hello, I'm Benson, Welcome to my web！</p>
        <p class="flex items-center gap-1">
          <Icon icon="ic:baseline-alternate-email" class="h-4 w-4" /> benson95217@gmail.com
        </p>
      </div>
    </div>
    <div class="my-20">
      <ContentDoc class="prose dark:prose-invert" />
    </div>
  </div>
</template>

<style scoped></style>
