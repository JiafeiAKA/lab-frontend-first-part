<script setup lang="ts">
import { defineProps } from 'vue'
import { type Organization } from '@/types'

// Define props to accept an organization object
defineProps<{
  organization: Organization
}>()
</script>

<template>
  <!-- <RouterLink :to="{ name: 'organization-detail-view', params: { id: organization.id } }"> -->
  <div
    class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp"
  >
    <h2 class="text-xl font-bold">{{ organization.name }}</h2>
    <span class="text-sm">{{ organization.address }}</span
    ><br />
    <span class="text-sm">{{ organization.contact }}</span
    ><br />
    <span class="text-sm">{{ organization.email }}</span
    ><br />
    <span class="text-sm">{{ organization.website }}</span>
  </div>
  <!-- </RouterLink> -->
</template>
