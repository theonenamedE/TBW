<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
import { computed, ref } from 'vue'
import type { MovieType } from '@/types/Movie'

const props = defineProps<{
  movie: MovieType
  loading: boolean | undefined
}>()

const emit = defineEmits<{ (e: 'loaded', id: string): void }>()

const store = useMoviesStore()
const imageLoadFailed = ref(false)

const alreadyAdded = computed(() =>
  store.movieList.some((movie) => movie.imdbID === props.movie.imdbID),
)
</script>

<template>
  <div class="card bg-base-100 shadow-sm hover:shadow-md transition rounded-sm w-full h-full">
    <router-link :to="{ name: 'details', params: { id: props.movie.imdbID } }">
      <figure v-motion-fade-visible-once
        class="overflow-hidden flex items-center justify-center bg-gray-100 aspect-[2/3] rounded-t-sm"
      >
        <span v-if="props.loading" class="loading loading-ring loading-xl text-primary"></span>

        <div v-else-if="imageLoadFailed" class="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-12 h-12 text-gray-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        <img
          v-show="!props.loading && !imageLoadFailed"
          :src="props.movie.Poster"
          :alt="props.movie.Title"
          class="object-cover w-full h-full"
          @load="emit('loaded', props.movie.imdbID)"
          @error="
            () => {
              imageLoadFailed = true
              emit('loaded', props.movie.imdbID)
            }
          "
        />
      </figure>
    </router-link>

    <div class="card-body p-4 flex flex-col">
      <router-link :to="{ name: 'details', params: { id: props.movie.imdbID } }">
        <h2 class="card-title text-lg">{{ props.movie.Title }}</h2>
        <p class="text-sm text-gray-500">{{ props.movie.Year }}</p>
      </router-link>

      <div class="card-actions justify-end mt-auto">
        <button
          v-if="!alreadyAdded"
          class="btn btn-sm btn-primary"
          @click="store.addMovie(props.movie)"
        >
          Add
        </button>
        <button v-else class="btn btn-sm btn-error" @click="store.removeMovie(props.movie.imdbID)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
