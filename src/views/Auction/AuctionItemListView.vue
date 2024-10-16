<script setup lang="ts">
import AuctionItemCard from '@/components/AuctionItemCard.vue';
import { ref, onMounted, computed, watchEffect } from 'vue';
import AuctionItemService from '@/services/AuctionItemService';
import type { AuctionItem } from '@/types'
import { useRouter } from 'vue-router';

const router = useRouter();

const auctionItems = ref<AuctionItem[] | null>(null);
const totalItems = ref(0);
const keyword = ref('');
const isLoading = ref(false);

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
});

const page = computed(() => props.page);

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalItems.value / 3);
  return page.value < totalPages;
});

onMounted(() => {
  watchEffect(() => {
    updateKeyword('');
  });
});

function updateKeyword(value: string) {
  isLoading.value = true;
  let queryFunction;

  if (value === '') {
    if (page.value !== undefined) {
      queryFunction = AuctionItemService.getAuctionItems(3, page.value);
    } else {
      console.error('Page value is undefined');
      isLoading.value = false;
      return;
    }
  } else {
    queryFunction = AuctionItemService.searchAuctionItemsByDescription(value, 3, page.value);
  }

  queryFunction
    .then((response) => {
      auctionItems.value = response.data;
      totalItems.value = response.headers['x-total-count'];
      isLoading.value = false;
    })
    .catch(() => {
      router.push({ name: 'NetworkError' });
      isLoading.value = false;
    });
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold text-indigo-800 mb-8 text-center">Auction Items</h1>

    <div class="mb-12 max-w-md mx-auto">
      <div class="relative">
        <input
          v-model="keyword"
          type="text"
          placeholder="Search by description..."
          @input="updateKeyword(keyword)"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
    </div>

    <div v-else-if="auctionItems && auctionItems.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <AuctionItemCard
        v-for="auctionItem in auctionItems"
        :key="auctionItem.id"
        :auction-item="auctionItem"
        class="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
      ></AuctionItemCard>
    </div>

    <div v-else class="text-center py-16 bg-gray-50 rounded-lg">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No auction items found</h3>
      <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
    </div>

    <div class="flex justify-between items-center mt-12">
      <RouterLink
        id="page-prev"
        :to="{ name: 'auction-item', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors duration-300 flex items-center"
      >
        <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Prev Page
      </RouterLink>
      <div v-else class="w-[100px]"></div>

      <span class="text-gray-600 font-medium">Page {{ page }}</span>

      <RouterLink
        id="page-next"
        :to="{ name: 'auction-item', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors duration-300 flex items-center"
      >
        Next Page
        <svg class="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </RouterLink>
      <div v-else class="w-[100px]"></div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styles can be added here if needed */
</style>