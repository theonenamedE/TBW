<script setup lang="ts">
import type { MovieDetailsType } from '@/types/Movie'
import { computed, ref } from 'vue'
import ErrorAlert from './alerts/ErrorAlert.vue'
import { useMoviesStore } from '@/stores/movies'

const props = defineProps<{ movie: MovieDetailsType | undefined }>()

const imageLoaded = ref(false)
const store = useMoviesStore()

const alreadyAdded = computed(() =>
  props.movie ? store.movieList.some((movie) => movie.imdbID === props.movie!.imdbID) : false,
)
</script>

<template>
  <ErrorAlert v-if="props.movie?.Error" :message="props.movie.ErrorMessage" />


    <!-- Loading state -->
    <div v-if="props.movie === undefined" class="flex justify-center items-center">
      <span class="loading loading-ring loading-lg text-primary"></span>
    </div>

    <!-- Hero content -->
    <div
      v-else
      class="flex flex-col lg:flex-row gap-12 items-center max-w-6xl w-full
             bg-white/70 backdrop-blur-md border border-gray-200/60
             shadow-md rounded-xl p-8 transition"
      v-motion-fade-visible-once
    >
      <!-- Poster -->
      <figure class="flex-shrink-0">
        <span v-if="!imageLoaded" class="loading loading-ring loading-lg text-primary"></span>
        <img
          v-show="imageLoaded"
          :src="props.movie.Poster"
          alt="Poster"
          class="w-full max-w-sm rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
          @load="imageLoaded = true"
        />
      </figure>

      <!-- Text -->
      <div class="flex-1">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          {{ props.movie.Title }}
          <span class="text-gray-400 text-lg font-normal">({{ props.movie.Year }})</span>
        </h1>

        <p class="text-gray-600 leading-relaxed mb-6">{{ props.movie.Plot }}</p>

        <!-- Badges -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            class="px-3 py-1 rounded-md text-sm
                   bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300"
          >
            Language: {{ props.movie.Language }}
          </span>
          <span
            class="px-3 py-1 rounded-md text-sm
                   bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300"
          >
            Country: {{ props.movie.Country }}
          </span>
          <span
            class="px-3 py-1 rounded-md text-sm
                   bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300"
          >
            IMDB Rating: {{ props.movie.imdbRating }}
          </span>
        </div>

        <!-- Actions -->
        <div class="card-actions">
          <button
            v-if="!alreadyAdded"
            class="btn px-6 bg-gradient-to-r from-gray-100 to-gray-200
                   border border-gray-300 text-gray-700 hover:from-gray-200 hover:to-gray-300"
            @click="store.addMovie(props.movie)"
          >
            Add to list
          </button>
          <button
            v-else
            class="btn px-6 bg-gradient-to-r from-red-50 to-red-100
                   border border-red-200 text-red-600 hover:from-red-100 hover:to-red-200"
            @click="store.removeMovie(props.movie.imdbID)"
          >
            Remove from list
          </button>
        </div>
      </div>
    </div>
  
</template>
