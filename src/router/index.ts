import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventEditView from '@/views/event/EditView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import AddEventView from '@/views/EventFormView.vue'
import OrganizerFormView from '@/views/Organizer/OrganizerFormView.vue'
import OrganizerListView from '@/views/Organizer/OrganizerListView.vue'
// import AddOrganizationtView from '@/views/OrganizationFormView.vue'
import AuctionItemListView from '@/views/Auction/AuctionItemListView.vue'
import SignUpView from '@/views/SignUpView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'
import LoginView from '@/views/LoginView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') })
    },
    {
      path: '/register',
      name: 'register',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
    ,

    {
      path: '/organizers',
      name: 'organizer-list-view',
      component: OrganizerListView,
      props: (route) => ({
        page: parseInt(route.query?.page?.toString() || '1'),
        perPage: parseInt(route.query?.per_page?.toString() || '2')
      })
    },
    {
      path: '/auction-item',
      name: 'auction-item',
      component: AuctionItemListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEventView
    },
    {
      path: '/add-organizer',
      name: 'add-organizer',
      component: OrganizerFormView
    },
    {
      path: '/organizers',
      name: 'organizer-list-view',
      component: OrganizerListView,
      props: (route) => ({
        page: parseInt(route.query?.page?.toString() || '1'),
        perPage: parseInt(route.query?.per_page?.toString() || '2')
      })
    },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: EventLayoutView,
      props: true,
      beforeEnter: async (to) => {
        //put API call here
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        try {
          const response = await EventService.getEvent(id)
          //need to set up the data for the event
          eventStore.setEvent(response.data)
        } catch (error) {
          if ((error as any).response && (error as any).response.status === 404) {
            return {
              name: '404-resource-view',
              params: { resource: 'event' }
            }
          } else {
            return { name: 'network-error-view' }
          }
        }
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView,
          props: true
        }
      ]
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  nProgress.start()
})
router.afterEach(() => {
  nProgress.done()
})

export default router
