import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    //baseURL:'https://my-json-server.typicode.com/pzyllll/helphelpmedb',
    withCredentials: false,
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async getPage(perPage: number, page: number) {
    const start = (page - 1) * perPage
    return apiClient.get(`/countryGolds?_limit=${perPage}&_start=${start}`)
  },

  async getTotal() {
    return apiClient.get('/countryGolds')
  },

  async getDetail(id: number) {
    return apiClient.get('/countryGolds/' + id)
  },

  async getProjects(countryId: number, perPage: number, page: number) {
    const start = (page - 1) * perPage
    const response = await apiClient.get(`/projects?countryId=${countryId}`)
    const countryProjects = response.data[0]?.projects || []

    const paginatedProjects = countryProjects.slice(start, start + perPage)

    return {
      data: paginatedProjects,
      total: countryProjects.length
    }
  }
}
