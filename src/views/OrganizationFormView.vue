<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Add New Organization</h1>
      <form @submit.prevent="saveOrganization" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Organization Name</label>
          <input
            type="text"
            id="name"
            v-model="organization.name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter organization name"
          />
        </div>
  
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            v-model="organization.address"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter address"
          />
        </div>
  
        <div>
          <label for="contact" class="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            id="contact"
            v-model="organization.contact"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter contact details"
          />
        </div>
  
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="organization.email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter email address"
          />
        </div>
  
        <div>
          <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="text"
            id="website"
            v-model="organization.website"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter website URL"
          />
        </div>
  
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Organization
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import OrganizationService from '@/services/OrganizationService'
  
  const organization = ref({
    name: '',
    address: '',
    contact: '',
    email: '',
    website: ''
  })
  
  const isSubmitting = ref(false) // Track the submit state
  const router = useRouter()
  
  function saveOrganization() {
    if (isSubmitting.value) return // Prevent submission if already submitting
  
    isSubmitting.value = true // Set submit state to true
    OrganizationService.saveOrganization(organization.value)
      .then(() => {
        router.push({ name: 'event-list-view' })
      })
      .catch(() => {
        router.push({ name: 'network-error-view' })
      })
      .finally(() => {
        isSubmitting.value = false // Reset submit state after submission
      })
  }
  </script>
  