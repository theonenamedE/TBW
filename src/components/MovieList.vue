<script setup lang="ts">
import MovieCard from './MovieCard.vue'
import type { MovieType } from '@/types/Movie'

const props = defineProps<{
  movies: MovieType[]
  loadingImages: Record<string, boolean>
  loadingMore: boolean
  isSearch: boolean
}>()

const emit = defineEmits<{ (e: 'loaded', id: string): void; (e: 'loadMore'): void }>()
</script>

<template>
  <div>
    <p v-if="props.movies.length === 0" class="text-center text-gray-500 py-12">
      No movies found.<br />
      <RouterLink to="/add" class="text-black font-bold">Add a movie</RouterLink>
    </p>

    <ul v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="movie in props.movies" :key="movie.imdbID">
        <MovieCard
          :movie="movie"
          :loading="props.loadingImages[movie.imdbID]"
          @loaded="emit('loaded', $event)"
        />
      </li>
    </ul>
    <div v-if="props.isSearch && props.movies.length > 0" class="flex justify-center mt-8">
      <button
        class="btn btn-outline btn-secondary"
        @click="emit('loadMore')"
        :disabled="props.loadingMore"
      >
        <span v-if="props.loadingMore" class="loading loading-spinner loading-xs mr-2"></span>
        Load more
      </button>
    </div>
  </div>
</template>
