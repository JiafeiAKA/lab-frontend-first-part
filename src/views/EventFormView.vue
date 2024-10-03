<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Create an Event</h1>
      <form @submit.prevent="saveEvent" class="space-y-6">
        <div>
          <BaseInput v-model="event.category" type="text" aria-placeholder="Category" class="field" />
          <h3>Name & Describe your event</h3>
        </div>
  
        <div>
          <BaseInput v-model="event.title" type="text" label="Title" />
        </div>
  
        <div>
          <BaseInput v-model="event.description" type="text" label="Description" />
        </div>
  
        <div>
          <BaseInput v-model="event.location" type="text" label="Location" />
        </div>
  
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              v-model="event.date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label for="time" class="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              id="time"
              v-model="event.time"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
  
        <div>
          <label for="organizer" class="block text-sm font-medium text-gray-700">Organizer</label>
          <input
            type="text"
            id="organizer"
            v-model="event.organizer"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Who's organizing this event?"
          />
        </div>
  
        <div class="flex items-center">
          <input
            type="checkbox"
            id="petsAllowed"
            v-model="event.petsAllowed"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="petsAllowed" class="ml-2 block text-sm text-gray-900"> Pets Allowed </label>
        </div>
        <p>Pets Allowed: {{ event.petsAllowed }}</p>
  
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import type { Event } from '@/types'
  import EventService from '@/services/EventService'
  import { useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue';
  
  const event = ref<Event>({
    id: 0,
    category: '',
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    petsAllowed: false,
    organizer: {
      id: 0,
      name: ''
    }
  })
  
  const router = useRouter()
  
  function saveEvent() {
    EventService.saveEvent(event.value)
      .then((response) => {
        router.push({ name: 'event-list-view', params: { id: response.data.id } })
      })
      .catch(() => {
        router.push({ name: 'network-error-view' })
      })
  }
  </script>