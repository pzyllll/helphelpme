import axios from 'axios'

const apiClient = axios.create({
  baseURL: ('https://my-json-server.typicode.com/DHT0120/lab2db/'),
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents() {
    return apiClient.get('/student')
  }
}
