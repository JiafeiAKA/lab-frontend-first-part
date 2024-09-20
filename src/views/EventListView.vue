<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import OrganizationCard from '@/components/OrganizationCard.vue'
import { type Event, type Organization } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EventService from '@/services/EventService'
import OrganizationService from '@/services/OrganizationService'

// States for events and organizations
const events = ref<Event[] | null>(null)
const organizations = ref<Organization[] | null>(null)
const totalEvents = ref(0)
const totalOrganizations = ref(0)

// Computed properties for pagination
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / getPageSize())
  return page.value < totalPages
})
const hasNextOrgPage = computed(() => {
  const totalPages = Math.ceil(totalOrganizations.value / getPageSize())
  return page.value < totalPages
})

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

const page = computed(() => props.page)
const router = useRouter()
const route = useRoute()

// Get the page size from the query parameter or use a default value
const getPageSize = () => {
  const pageSize = Number(route.query.pageSize)
  return isNaN(pageSize) ? 3 : pageSize
}

// Fetch events and organizations data on mount
onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(getPageSize(), page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = Number(response.headers['x-total-count'])
      })
      .catch(() => {
        router.push({ name: 'network-error-view' })
      })

    OrganizationService.getOrganizations(getPageSize(), page.value)
      .then((response) => {
        organizations.value = response.data
        totalOrganizations.value = Number(response.headers['x-total-count'])
      })
      .catch(() => {
        router.push({ name: 'network-error-view' })
      })
  })
})

// Update the URL with the new page size
const updatePageSize = (pageSize: number) => {
  router.push({ query: { ...route.query, pageSize } })
}
</script>

<template>
  <h1 class="text-center text-2xl font-bold mb-4">Events For Good</h1>
  <div class="flex flex-col items-center">
    <!-- Event Cards (check if events are not null) -->
    <EventCard v-if="events" v-for="event in events" :key="event.id" :event="event" />

    <!-- Organizations Section (check if organizations are not null) -->
    <h1 class="text-center text-2xl font-bold mb-4">Organizations List</h1>
    <div class="flex flex-col items-center">
      <OrganizationCard
        v-if="organizations"
        v-for="organization in organizations"
        :key="organization.id"
        :organization="organization"
      />
    </div>

    <!-- Pagination Controls for Events -->
    <div class="flex w-72 justify-between mt-4">
      <!-- Previous Page Link -->
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: getPageSize() } }"
        rel="prev"
        v-if="page > 1"
        class="text-blue-500 hover:text-blue-700 text-left flex-1"
      >
        &#60; Prev Page
      </RouterLink>

      <!-- Next Page Link for Events -->
      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: getPageSize() } }"
        rel="next"
        v-if="hasNextPage"
        class="text-blue-500 hover:text-blue-700 text-right flex-1"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>
