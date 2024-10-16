<script setup lang="ts">
import { ref } from "vue";
import { type AuctionItem } from '@/types'

const props = defineProps<{
  auctionItem: AuctionItem
}>()

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(value);
}
</script>

<template>
  <div class="auction-item-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ auctionItem.name }}</h3>
      <p class="text-gray-600 mb-4">{{ auctionItem.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-500">Successful Bid:</span>
        <span class="text-lg font-bold text-green-600">{{ formatCurrency(auctionItem.successfulBid) }}</span>
      </div>
    </div>
    <div class="bg-gray-100 px-4 py-2 mt-2">
      <button class="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300">
        View Details
      </button>
    </div>
  </div>
</template>

<style scoped>
.auction-item-card {
  width: 100%;
  max-width: 300px;
}
</style>