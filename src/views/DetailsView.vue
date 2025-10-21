<script setup lang="ts">
import MovieDetails from '@/components/MovieDetails.vue'
import { getMovie } from '@/lib/api'
import type { MovieDetailsType } from '@/types/Movie'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const movie = ref<MovieDetailsType>()

onMounted(async () => {
  try {
    const response = await getMovie(route.params.id as string)
    movie.value = response
  } catch (error) {
    console.error(error)
    movie.value = {
      Title: '',
      Year: '',
      imdbID: '',
      Type: '',
      Poster: '',
      Plot: '',
      Language: '',
      Country: '',
      imdbRating: '',
      Error: true,
      ErrorMessage: (error as Error).message,
    }
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <MovieDetails :movie="movie" v-motion-fade-visible-once />
  </div>
</template>

<style scoped></style>
