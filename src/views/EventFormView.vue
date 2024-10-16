<template>
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-2xl font-semibold text-gray-800 mb-6">Create an Event</h1>
    <form @submit.prevent="saveEvent" class="space-y-4">
      <div class="space-y-1">
        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
        <BaseInput
          v-model="event.category"
          type="text"
          id="category"
          placeholder="e.g., Conference, Workshop, Meetup"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div class="space-y-1">
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <BaseInput
          v-model="event.title"
          type="text"
          id="title"
          placeholder="Enter event title"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div class="space-y-1">
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          v-model="event.description"
          id="description"
          rows="3"
          placeholder="Describe your event..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <div class="space-y-1">
        <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
        <BaseInput
          v-model="event.location"
          type="text"
          id="location"
          placeholder="Enter event location"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-1">
          <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
          <BaseInput
            v-model="event.date"
            type="date"
            id="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="space-y-1">
          <label for="time" class="block text-sm font-medium text-gray-700">Time</label>
          <BaseInput
            v-model="event.time"
            type="time"
            id="time"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div class="space-y-1">
        <label for="organizer" class="block text-sm font-medium text-gray-700">Select an Organizer</label>
<!--        <select v-model="event.organizer.id" id="organizer" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">-->
<!--          <option v-for="option in organizers" :value="option.id" :key="option.id">-->
<!--            {{ option.name }}-->
<!--          </option>-->
<!--        </select>-->
        <BaseSelect v-model="event.organizer.id" :options="organizers"
        label="Organizer"/>
      </div>

      <div class="flex items-center">
        <BaseInput
          type="checkbox"
          id="petAllowed"
          v-model="event.petAllowed"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label for="petAllowed" class="ml-2 block text-sm text-gray-700">Pets Allowed</label>
      </div>
      <h3>The image of the Event</h3>
      <ImageUpload v-model="event.images"/>

      <button
        type="submit"
        :disabled="!event.category || !event.title || !event.description"
        class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create Event
      </button>

    </form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Event } from '@/types'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'
import OrganizerService from '@/services/OrganizerService'
import BaseSelect from '@/components/BaseSelect.vue'
import ImageUpload from '@/components/ImageUpload.vue'
const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petAllowed: false,
  organizer: {
    id: 0,
    name: ''
  },
  Images:[]
})

const router = useRouter()
const organizers = ref<Organizer[]>([])
onMounted(()=>{
  OrganizerService.getOrganizers()
    .then((response)=>{
      organizers.value = response.data
    })
    .catch(()=>{
      router.push({name:'network-error-view'})
    })
})

function saveEvent() {
  EventService.saveEvent(event.value)
    .then((response) => {
      router.push({ name: 'event-list-view', params: { id: response.data.id } })
    })
    .catch((error) => {
      console.error('Failed to create event:', error)
      router.push({ name: 'network-error-view' })
    })
}
</script>

<!--<script setup lang="ts">-->
<!--import type { Event, Organizer } from '@/types';-->
<!--import { onMounted, ref } from 'vue';-->
<!--import EventService from '@/services/EventService';-->
<!--import OrganizerService from '@/services/OrganizerService';-->
<!--import ImageUpload from '@/components/ImageUpload.vue';-->
<!--import { useRouter } from 'vue-router';-->
<!--import { useMessageStore } from '@/stores/message';-->
<!--import BaseInput from '@/components/BaseInput.vue';-->
<!--import BaseSelect from '@/components/BaseSelect.vue';-->

<!--const event = ref<Event>({-->
<!--  id: 0,-->
<!--  category: '',-->
<!--  title: '',-->
<!--  description: '',-->
<!--  location: '',-->
<!--  date: '',-->
<!--  time: '',-->
<!--  petsAllowed: false,-->
<!--  organizer: {-->
<!--    id: 0,-->
<!--    name: ''-->
<!--  },-->
<!--  images: []-->
<!--})-->

<!--const router = useRouter()-->
<!--const store = useMessageStore()-->
<!--function saveEvent() {-->
<!--  EventService.saveEvent(event.value)-->
<!--    .then((response) => {-->
<!--      router.push({ name: 'event-detail-view', params: { id: response.data.id } })-->
<!--      store.updateMessage('You are successfully add a new event for ' + response.data.title)-->
<!--      setTimeout(() => {-->
<!--        store.resetMessage()-->
<!--      }, 3000)-->
<!--    })-->
<!--    .catch(() => {-->
<!--      router.push({ name: 'network-error-view' })-->
<!--    })-->
<!--}-->

<!--const organizers = ref<Organizer[]>([])-->
<!--onMounted(() => {-->
<!--  OrganizerService.getOrganizers()-->
<!--    .then((response) => {-->
<!--      organizers.value = response.data-->
<!--    })-->
<!--    .catch(() => {-->
<!--      router.push({ name: 'network-error-view' })-->
<!--    })-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--  <div class="max-w-xl mx-auto p-8">-->
<!--    <h1 class="text-center text-2xl font-bold mb-6 text-gray-800">Create an Event</h1>-->
<!--    <form @submit.prevent="saveEvent" class="space-y-4">-->
<!--      &lt;!&ndash; Category &ndash;&gt;-->
<!--      <div class="space-y-2">-->
<!--        <BaseInput v-model="event.category" type="text" label="Category" class="w-full p-3 border border-gray-300 rounded-md" />-->
<!--      </div>-->

<!--      &lt;!&ndash; Name & Description &ndash;&gt;-->
<!--      <h3 class="text-lg font-semibold text-gray-700 mt-4">Name & Describe Your Event</h3>-->
<!--      <div class="space-y-2">-->
<!--        <BaseInput v-model="event.title" type="text" label="Title" class="w-full p-3 border border-gray-300 rounded-md" />-->
<!--      </div>-->
<!--      <div class="space-y-2">-->
<!--        <BaseInput v-model="event.description" type="text" label="Description" class="w-full p-3 border border-gray-300 rounded-md min-h-[100px]" />-->
<!--      </div>-->

<!--      &lt;!&ndash; Location &ndash;&gt;-->
<!--      <h3 class="text-lg font-semibold text-gray-700 mt-4">Where is Your Event?</h3>-->
<!--      <div class="space-y-2">-->
<!--        <BaseInput v-model="event.location" type="text" label="Location" class="w-full p-3 border border-gray-300 rounded-md" />-->
<!--      </div>-->

<!--      &lt;!&ndash; Organizer &ndash;&gt;-->
<!--      <h3 class="text-lg font-semibold text-gray-700 mt-4">Who is your Organizer?</h3>-->
<!--      <label>Select an Organizer</label>-->
<!--      <BaseSelect v-model="event.organizer.id" :options="organizers" label="Organizer" />-->

<!--      <h3>The image of the Event</h3>-->
<!--      <ImageUpload v-model="event.images" />-->
<!--      <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg font-semibold mt-6">-->
<!--        Submit-->
<!--      </button>-->
<!--    </form>-->

<!--    <pre class="bg-gray-800 text-white p-4 rounded-md mt-6">{{ event }}</pre>-->
<!--  </div>-->
<!--</template>-->