<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void; (e: 'submit'): void }>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const localQuery = ref(props.modelValue)

function onSubmit() {
  emit('submit')
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="join flex justify-center mb-8">
      <label class="input join-item">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          placeholder="Search for a movie"
          required
          :value="props.modelValue"
          @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
      </label>
      <button class="btn btn-neutral join-item">Search</button>
    </div>
  </form>
</template>
