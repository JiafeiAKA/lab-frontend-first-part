<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: String
}>()
const { event } = toRefs(props)
</script>
<template>
    <p class="text-lg font-semibold text-gray-800 mb-2">{{ event.title }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
</template>
