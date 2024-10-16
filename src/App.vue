<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount, mdiAccountPlus, mdiLogin, mdiLogout } from '@mdi/js';

const store = useMessageStore();
const router = useRouter();
const authStore = useAuthStore();
const { message } = storeToRefs(store);

function logout() {
  authStore.logout();
  router.push({ name: 'login' });
}

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

if (token && user) {
  authStore.reload(token, JSON.parse(user));
} else {
  authStore.logout();
}
</script>

<template>
  <div id="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper">
        <nav class="p-[30px] text-center">

          <nav class="flex">
            <!-- สำหรับผู้ใช้ที่ยังไม่ได้เข้าสู่ระบบ -->
            <ul v-if="!authStore.currentUserName" class="flex nav-bar ml-auto">
              <li class="nav-item px-2">
                <router-link to="/register" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccountPlus" />
                    <span class="ml-3">Sign Up</span>
                  </div>
                </router-link>
              </li>
              <li class="nav-item px-2">
                <router-link to="/login" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogin" />
                    <span class="ml-3">Login</span>
                  </div>
                </router-link>
              </li>
            </ul>

            <!-- สำหรับผู้ใช้ที่เข้าสู่ระบบแล้ว -->
            <ul v-if="authStore.currentUserName" class="flex nav-bar ml-auto">
              <li class="nav-item px-2">
                <router-link to="/profile" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccount" />
                    <span class="ml-3">{{ authStore.currentUserName }}</span>
                  </div>
                </router-link>
              </li>
              <li class="nav-item px-2">
                <a class="nav-link hover:cursor-pointer" @click="logout">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogout" />
                    <span class="ml-3">LogOut</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          <RouterLink
            to="/"
            class="font-bold"
            exact
            exact-active-class="text-green-500"
          >Home</RouterLink>
          |

          <RouterLink
            :to="{ name: 'about' }"
            exact
            exact-active-class="text-green-500"
            class="font-bold"
          >About</RouterLink>
          |
          <RouterLink
            :to="{ name: 'organizer-list-view' }"
            class="font-bold"
            exact
            exact-active-class="text-green-500"
          >Organizer</RouterLink>
          <span v-if="authStore.isAdmin">|
          <RouterLink
            :to="{ name: 'add-event' }"
            exact
            exact-active-class="text-green-500"
            class="font-bold"
          >New Event</RouterLink>
          </span>
          <span v-if="authStore.isAdmin">|
          <RouterLink
            :to="{ name: 'add-organizer' }"
            exact
            exact-active-class="text-green-500"
            class="font-bold"
          >New Organizer</RouterLink>
          </span>
        </nav>
      </div>
    </header>
  </div>

  <RouterView />
</template>

