<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
import MovieList from '@/components/MovieList.vue'

const store = useMoviesStore()
</script>

<template>
  <div class="container mx-auto px-4 py-12" v-motion-fade-visible-once>
    <h1
      class="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent"
    >
      Movie Library
    </h1>
    <MovieList
      v-auto-animate
      v-if="store.movieList"
      :movies="store.movieList"
      :loading-more="false"
      :is-search="false"
    />
  </div>
</template>

<style scoped></style>
