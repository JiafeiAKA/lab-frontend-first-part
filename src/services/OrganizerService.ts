import apiClient from '@/services/AxiosClient'
export default {
  getOrganizers() {
    return apiClient.get('/organizers');
  },
  getOrganizer(id: number) {
    return apiClient.get(`/organizers/${id}`)
  },
  saveOrganizer(organizer: Organizer) {
    return apiClient.post('/organizers', organizer)
  }

};