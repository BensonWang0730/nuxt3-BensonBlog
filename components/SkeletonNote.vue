<script setup></script>
<template>
  <div class="my-8 border-b-2 border-themeBorder py-4">
    <p class="load h-6 w-1/3 rounded-full"></p>
    <p class="load line-clamp-1 h-4 w-3/4 rounded-full"></p>
    <p class="load h-4 w-1/4 rounded-full"></p>
  </div>
</template>
<style scoped>
p {
  margin: 6px 0;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
.load {
  background: linear-gradient(
      100deg,
      rgba(256, 256, 256, 0) 30%,
      rgba(256, 256, 256, 0.5) 50%,
      rgba(256, 256, 256, 0) 30%
    )
    var(--skeleton);
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 2s loading ease-in-out infinite;
}
</style>
