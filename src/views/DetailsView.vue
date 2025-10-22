<script setup lang="ts">
import MediaDetails from '@/components/MediaDetails.vue'
import { getMovieDetails, getSeriesDetails } from '@/lib/api'
import type { MovieDetailsType } from '@/types/Movie'
import type { TvSeriesDetailsType } from '@/types/TvSeries'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const movie = ref<MovieDetailsType | null>()
const tvSeries = ref<TvSeriesDetailsType | null>()

onMounted(async () => {
  try {
    if (route.params.id && route.params.type === 'movie') {
      movie.value = await getMovieDetails(route.params.id as string)
    } else if (route.params.id && route.params.type === 'tv') {
      tvSeries.value = await getSeriesDetails(route.params.id as string)
    } else {
    }
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div
      v-if="(route.params.type === 'movie' && !movie) || (route.params.type === 'tv' && !tvSeries)"
      class="flex justify-center items-center"
    >
      <span class="loading loading-ring loading-lg text-primary"></span>
    </div>
    <MediaDetails
      v-if="movie || tvSeries"
      :type="(route.params.type as 'movie' | 'tv') || undefined"
      :movie="movie"
      :tv-series="tvSeries"
      v-motion-fade-visible-once
    />
  </div>
</template>

<style scoped></style>
