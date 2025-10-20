<script setup lang="ts"></script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-5xl font-bold text-center mb-12">
        Welcome to <br /><span class="text-6xl font-bold text-center gradient-text"
          >To Be Watched</span
        >
      </h1>

      <p class="text-xl text-center mb-12">
        A simple and beautiful movie list app built with Vue 3 and Tailwind CSS (daisyUI).
      </p>
      <RouterLink to="/add" class="btn btn-primary btn-lg">Get Started</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(to right, black 0%, red 50%, blue 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: gradient 3s ease infinite alternate;
}

@keyframes gradient {
  0% {
    background-position: left center;
  }
  100% {
    background-position: right center;
  }
  50% {
    animation-play-state: paused;
  }
}
</style>
