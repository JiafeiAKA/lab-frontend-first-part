<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'
import { useMessageStore } from '@/stores/message'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  event: Event
  id: string
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const { event } = toRefs(props)
const store = useMessageStore()
const router = useRouter()

const edit = () => {
  store.updateMessage('You have successfully edited ' + props.event.title)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}
</script>

<template>
  <p class="text-lg font-semibold mb-4">Edit event here</p>
  <button
    @click="edit"
    class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    Edit
  </button>
</template>
