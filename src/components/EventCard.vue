<script setup lang="ts">
import { computed } from 'vue'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
}>()

const formattedDate = computed(() => {
  return new Date(props.event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const hasImage = computed(() => !!props.event.image)
</script>

<template>
  <div class="flex justify-center">
    <RouterLink
      :to="{ name: 'event-detail-view', params: { id: event.id } }"
      class="block w-full max-w-sm group"
    >
      <div
        class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform group-hover:-translate-y-1"
      >
        <!-- Event Image -->
        <div class="relative h-48 overflow-hidden">
          <img
            v-if="hasImage"
            :src="event.image"
            :alt="event.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div
            v-else
            class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-lg font-semibold"
          >
            {{ event.title }}
          </div>
          <!-- Category Tag -->
          <div class="absolute top-4 right-4 bg-white bg-opacity-90 text-blue-600 px-3 py-1 rounded-full text-xs font-bold shadow-md">
            {{ event.category }}
          </div>
        </div>

        <div class="p-6">
          <!-- Event Title -->
          <h2 class="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {{ event.title }}
          </h2>
          <!-- Event Description -->
          <p class="text-gray-600 mb-4 line-clamp-2">{{ event.description }}</p>
          <!-- Event Details -->
          <div class="space-y-2 mb-4">
            <!-- Date -->
            <div class="flex items-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formattedDate }}</span>
            </div>
            <!-- Time -->
            <div class="flex items-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ event.time }}</span>
            </div>
            <!-- Location -->
            <div class="flex items-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{{ event.location }}</span>
            </div>
          </div>
          <!-- Organizer and View Details -->
          <div class="flex flex-col space-y-4 pt-4 border-t border-gray-200">
            <div class="flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="font-semibold">{{ event.organizer.name }}</span>
            </div>
            <div class="text-blue-600 font-bold group-hover:text-blue-800 transition-colors duration-300 flex items-center justify-end">
              View Details
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>