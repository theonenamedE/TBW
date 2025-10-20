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
  <ErrorAlert class="" v-if="props.movie?.Error" :message="props.movie.ErrorMessage" />

  <div v-else class="hero bg-base-200 min-h-screen rounded-md">
    <!-- Loading state for hero content -->
    <div v-if="props.movie === undefined" class="hero-content">
      <span class="loading loading-ring loading-lg text-primary"></span>
    </div>

    <!-- Actual hero content -->
    <div v-else class="hero bg-base-200 min-h-screen rounded-md">
      <div class="hero-content flex-col lg:flex-row gap-12">
        <!-- Poster -->
        <figure class="flex-shrink-0">
          <span v-if="!imageLoaded" class="loading loading-ring loading-lg text-primary"></span>
          <img
            v-show="imageLoaded"
            :src="props.movie.Poster"
            alt="Poster"
            class="w-full max-w-lg rounded-lg shadow-2xl"
            @load="imageLoaded = true"
          />
        </figure>

        <!-- Text -->
        <div class="max-w-2xl">
          <h1 class="text-5xl font-bold">
            {{ props.movie.Title }}
            <span class="text-gray-500 text-sm">({{ props.movie.Year }})</span>
          </h1>
          <p class="py-6">{{ props.movie.Plot }}</p>
          <div class="flex flex-wrap gap-2">
            <span class="badge badge-dash badge-primary">
              Language: {{ props.movie.Language }}
            </span>
            <span class="badge badge-dash badge-secondary">
              Country: {{ props.movie.Country }}
            </span>
            <span class="badge badge-dash badge-info">
              IMDB Rating: {{ props.movie.imdbRating }}
            </span>
          </div>
          <div v-if="!alreadyAdded" class="card-actions mt-4">
            <button class="btn -sm btn-primary" @click="store.addMovie(props.movie)">
              Add to list
            </button>
          </div>
          <div v-else class="card-actions mt-4">
            <button class="btn btn-error" @click="store.removeMovie(props.movie.imdbID)">
              Remove from list
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
