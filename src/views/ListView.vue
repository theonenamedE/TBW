<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
import MovieList from '@/components/MovieList.vue'
import { onMounted, ref } from 'vue'

const loadingImages = ref<Record<string, boolean>>({})

const store = useMoviesStore()

function handleLoaded(id: string) {
  loadingImages.value[id] = false
}

onMounted(() => {
  loadingImages.value = Object.fromEntries(store.movieList.map((movie) => [movie.imdbID, true]))
})
</script>

<template>
  <div class="container mx-auto px-4 py-8" v-motion-fade-visible-once>
    <MovieList
      v-auto-animate
      v-if="store.movieList"
      :movies="store.movieList"
      :loading-images="loadingImages"
      :loading-more="false"
      @loaded="handleLoaded"
      :is-search="false"
    />
  </div>
</template>

<style scoped></style>
