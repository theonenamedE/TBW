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
    <p
      v-if="props.movies.length === 0"
      class="text-center text-gray-500 py-12 bg-gray-50/60 rounded-lg border border-gray-200"
    >
      No movies found.<br />
      <RouterLink to="/add" class="text-gray-700 font-semibold hover:text-gray-900 transition">
        Add a movie
      </RouterLink>
    </p>

    <ul
      v-auto-animate
      v-else
      class="grid gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-8"
    >
      <li v-for="movie in props.movies" :key="movie.imdbID" v-auto-animate>
        <MovieCard
          :movie="movie"
          :loading="props.loadingImages[movie.imdbID]"
          @loaded="emit('loaded', $event)"
        />
      </li>
    </ul>

    <div v-if="props.isSearch && props.movies.length > 0" class="flex justify-center mt-8">
      <button
        class="btn px-6 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 disabled:opacity-50"
        @click="emit('loadMore')"
        :disabled="props.loadingMore"
      >
        <span v-if="props.loadingMore" class="loading loading-spinner loading-xs mr-2"></span>
        Load more
      </button>
    </div>
  </div>
</template>
