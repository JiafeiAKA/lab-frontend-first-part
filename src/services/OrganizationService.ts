import axios from 'axios'
import type { Organization } from '@/types'
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getOrganizations(perPage: Number, page: Number) {
    return apiClient.get('/organizations?_limit=' + perPage + '&_page=' + page)
  },
  getOrganization(id: number) {
    return apiClient.get('/organizations/' + id)
  },
  saveOrganization(organization: Organization) {
    return apiClient.post('/organizations', organization)
  }
}