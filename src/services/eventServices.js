import axios from 'axios'
import { apiUrl } from './config'
const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
export default {
  getData(fileJson, params) {
    return apiClient.get(fileJson, { params })
  },
  postData(fileJson, formData) {
    return apiClient.post(fileJson, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  putData(fileJson, formData) {
    return apiClient.put(fileJson, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
}
