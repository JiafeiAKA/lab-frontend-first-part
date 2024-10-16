<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'

const props = defineProps<{
  event: Event
  id: string
}>()
const { event } = toRefs(props)
</script>

<template>
  <div class="p-4 bg-white shadow-md rounded-lg max-w-lg mx-auto">
    <p class="text-lg font-semibold text-gray-800 mb-2">{{ event.title }} @ {{ event.location }}</p>
    <p class="text-gray-600">
      {{ event.description }}
    </p>
    <div class="flex flex-row flex-wrap justify-center">
      <img v-for="image in event.images" :key="image" :src="image" alt="events image"
           class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg" />
    </div>
  </div>
</template>
