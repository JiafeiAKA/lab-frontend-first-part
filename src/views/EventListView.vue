<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { ref, computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EventService from '@/services/EventService'
import BaseInput from '@/components/BaseInput.vue'

// ตั้งค่าตัวแปรสำหรับเก็บ events, keyword, page และ pageSize
const events = ref([])
const totalEvents = ref(0)
const keyword = ref('')
const page = ref(1)
const pageSize = ref(3)

const router = useRouter()
const route = useRoute()

// ฟังก์ชันสำหรับ fetch ข้อมูล events จาก API
const fetchEvents = () => {
  let queryFunction
  if (keyword.value === '') {
    queryFunction = EventService.getEvents(pageSize.value, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, pageSize.value, page.value)
  }

  queryFunction
    .then((response) => {
      events.value = response.data
      totalEvents.value = Number(response.headers['x-total-count'])
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}

// ดักการเปลี่ยนแปลงของ keyword และเรียก fetchEvents เมื่อ keyword เปลี่ยน
watchEffect(() => {
  fetchEvents()
})

// ฟังก์ชันสำหรับอัปเดต keyword และรีเซ็ต page กลับเป็นหน้าแรก
const updateKeyword = () => {
  page.value = 1
  fetchEvents()
}

// คำนวณว่ามีหน้าถัดไปหรือไม่
const hasNextPage = computed(() => {
  return page.value < Math.ceil(totalEvents.value / pageSize.value)
})

// คำนวณว่ามีหน้าที่ผ่านมาแล้วหรือไม่
const hasPreviousPage = computed(() => {
  return page.value > 1
})

// ตรวจสอบ query string สำหรับ page และ pageSize ใน URL
const queryPage = Number(route.query.page)
if (isNaN(queryPage) || queryPage < 1) {
  page.value = 1
} else {
  page.value = queryPage
}

const queryPageSize = Number(route.query.pageSize)
if (isNaN(queryPageSize) || queryPageSize < 1) {
  pageSize.value = 3
} else {
  pageSize.value = queryPageSize
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-center text-4xl font-bold mb-8 text-indigo-700">Events For Good</h1>

    <div class="max-w-md mx-auto mb-8">
      <BaseInput
        v-model="keyword"
        type="text"
        label="Search events..."
        class="w-full"
        @input="updateKeyword"
      />
    </div>

    <div class="space-y-6">
      <EventCard v-for="event in events" :key="event.id" :event="event" class="shadow-lg rounded-lg overflow-hidden" />
    </div>

    <div class="flex justify-between mt-8">
      <!-- ปุ่มสำหรับ Previous Page -->
      <RouterLink
        v-if="hasPreviousPage"
        :to="{ name: 'event-list-view', query: { page: page.value - 1, pageSize: pageSize.value } }"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        &larr; Previous Page
      </RouterLink>
      <div v-else class="invisible">Placeholder</div>

      <!-- แสดงจำนวนหน้าปัจจุบันและหน้าทั้งหมด -->
      <span class="text-gray-600">Page {{ page }} of {{ Math.ceil(totalEvents / pageSize) }}</span>

      <!-- ปุ่มสำหรับ Next Page -->
      <RouterLink
        v-if="hasNextPage"
        :to="{ name: 'event-list-view', query: { page: page.value + 1, pageSize: pageSize.value } }"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Next Page &rarr;
      </RouterLink>
      <div v-else class="invisible">Placeholder</div>
    </div>
  </div>
</template>