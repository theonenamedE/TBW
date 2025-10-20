<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
import { computed } from 'vue'
import type { MovieType } from '@/types/Movie'

const props = defineProps<{
  movie: MovieType
  loading: boolean | undefined
}>()

const emit = defineEmits<{ (e: 'loaded', id: string): void }>()

const store = useMoviesStore()

const alreadyAdded = computed(() =>
  store.movieList.some((movie) => movie.imdbID === props.movie.imdbID),
)
</script>

<template>
  <div class="card card-side bg-base-100 shadow-md hover:shadow-lg transition rounded-sm">
    <router-link :to="{ name: 'details', params: { id: props.movie.imdbID } }">
      <figure
        class="overflow-hidden flex items-center justify-center bg-gray-100 aspect-[2/3] w-32 sm:w-40 md:w-48 rounded-l-sm"
      >
        <span v-if="props.loading" class="loading loading-ring loading-xl text-primary"></span>

        <img
          v-show="!props.loading"
          :src="props.movie.Poster"
          :alt="props.movie.Title"
          class="object-cover w-full h-full"
          @load="emit('loaded', props.movie.imdbID)"
        />
      </figure>
    </router-link>
    <div class="card-body p-4">
      <router-link :to="{ name: 'details', params: { id: props.movie.imdbID } }">
        <h2 class="card-title text-lg">{{ props.movie.Title }}</h2>
        <p class="text-sm text-gray-500">{{ props.movie.Year }}</p>
      </router-link>
      <div v-if="!alreadyAdded" class="card-actions justify-end mt-auto">
        <button class="btn btn-sm btn-primary" @click="store.addMovie(props.movie)">Add</button>
      </div>
      <div v-else class="card-actions justify-end mt-auto">
        <button class="btn btn-sm btn-error" @click="store.removeMovie(props.movie.imdbID)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
