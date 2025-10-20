<script setup lang="ts">
import { loadMoreMovies, searchMovies } from '@/lib/api'
import { onMounted, ref, watch } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import MovieList from '@/components/MovieList.vue'
import type { MovieType } from '@/types/Movie'
import ErrorAlert from '@/components/alerts/ErrorAlert.vue'
import { useSearchPageStore } from '@/stores/movies'

const movies = ref<MovieType[]>()
const seachError = ref<string>('')
const searchQuery = ref('')
const loadingImages = ref<Record<string, boolean>>({})
const searchPage = ref(1)
const isSearching = ref(false)
const isLoadingMore = ref(false)

const state = useSearchPageStore()

async function searchMovie() {
  try {
    isSearching.value = true
    searchPage.value = 1
    const result = await searchMovies(searchQuery.value)
    if (!result.Response) {
      movies.value = []
      seachError.value = result.ErrorMessage
      return
    }
    seachError.value = ''
    const previouslyLoaded = Object.keys(loadingImages.value).filter((id) =>
      result.Search.some((m: MovieType) => m.imdbID === id),
    )
    movies.value = result.Search

    state.setState(searchPage.value, searchQuery.value, result.Search)

    for (const m of result.Search) {
      if (previouslyLoaded.includes(m.imdbID)) {
        continue
      }
      loadingImages.value[m.imdbID] = true
    }
  } catch (error) {
    movies.value = []
    console.error(error)
    seachError.value = (error as Error).message
  } finally {
    isSearching.value = false
  }
}

async function loadMore() {
  try {
    isLoadingMore.value = true
    searchPage.value++
    const result = await loadMoreMovies(searchQuery.value, searchPage.value)
    movies.value?.push(...result.Search)
    state.setState(searchPage.value, searchQuery.value, movies.value ? movies.value : [])
    for (const m of result.Search) {
      loadingImages.value[m.imdbID] = true
    }
  } catch (error) {
    searchPage.value = 1
    seachError.value = (error as Error).message
  } finally {
    isLoadingMore.value = false
  }
}

function handleLoaded(id: string) {
  loadingImages.value[id] = false
}

onMounted(() => {
  if (
    state.searchQuery !== '' &&
    state.searchPage !== 0 &&
    state.movieList !== undefined &&
    state.movieList.length > 0
  ) {
    searchQuery.value = state.searchQuery
    searchPage.value = state.searchPage
    movies.value = state.movieList
  }
})

let timeoutId: number | null = null

watch(searchQuery, () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  timeoutId = window.setTimeout(() => {
    if (searchQuery.value.length > 2) {
      searchMovie()
    }
    timeoutId = null
  }, 500)
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">Add a Movie</h1>

    <SearchBar v-model="searchQuery" @submit="searchMovie" />

    <div v-if="isSearching" class="flex justify-center my-12">
      <span class="loading loading-ring loading-lg"></span>
    </div>

    <MovieList
      v-else-if="movies && movies.length > 0"
      :movies="movies"
      :loading-images="loadingImages"
      :loading-more="isLoadingMore"
      @loaded="handleLoaded"
      @loadMore="loadMore"
      :is-search="true"
    />

    <p v-else class="text-center text-gray-500">Search for a movie to add it to your list</p>

    <div class="flex justify-center pt-2">
      <ErrorAlert v-if="seachError" :message="seachError" />
    </div>
  </div>
</template>
