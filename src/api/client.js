import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

axios.defaults.withCredentials = true

let isRefreshing = false
let failedQueue = []

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve()
  })

  failedQueue = []
}



api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    const isAuthRoute =
      originalRequest.url?.includes('/auth/login/') ||
      originalRequest.url?.includes('/auth/register/') ||
      originalRequest.url?.includes('/auth/logout/') ||
      originalRequest.url?.includes('/refresh/')

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(() => api(originalRequest))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // FIXED: ensure refresh always hits correct endpoint
        await api.post('/refresh/')

        processQueue(null)

        return api(originalRequest)

      } catch (refreshError) {
        processQueue(refreshError)

        if (window.location.pathname !== '/login/') {
          window.location.href = '/login/'
        }

        return Promise.reject(refreshError)

      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

// Auth
export const authApi = {
  login: (data) => api.post('/auth/login/', data),
  logout: () => api.post('/auth/logout/'),
  register: (data) => api.post('/auth/register/', data),
  me: () => api.get('/auth/me/'),
  refresh: () => api.post('/refresh/'), 
}

// Jobs
export const jobsApi = {
  list: (params) => api.get('/jobs/', { params }),
  detail: (id) => api.get(`/jobs/jobdetail/${id}/`),
  trending: () => api.get('/jobs/trending/'),
  saved: () => api.get('/jobs/saved/'),
  savedIds: () => api.get('/jobs/saved-id/'),
  save: (id) => api.post(`/jobs/${id}/save/`),
  unsave: (id) => api.post(`/jobs/${id}/unsave/`),
  apply: (id) => api.post(`/jobs/${id}/apply/`),
  isSaved:(jobId) => api.post(`/jobs/checkJobSavedStatus/`,{ jobId }),
  isApplied:(jobId) => api.post(`/jobs/checkJobAppliedStatus/`,{ jobId })
}

// Messages
export const messagesApi = {
  profileMessages:() => api.post('/mymessages/')
}

// Applications
export const applicationsApi = {
  list: () => api.get('/jobs/applications/'),
  withdraw: (jobId) => api.delete(`/jobs/applications/${jobId}/withdraw/`),
}

// Teacher
export const teacherApi = {
  profile: () => api.get('/teacher/profile/'),
  update: (data) => api.patch('/teacher/profile/', data),
}

// Schools
export const schoolsApi = {
  list: (params) => api.get('/schools/', { params }),
  follow:(schoolId) => api.post('/schools/follow/',{schoolId}),
  unfollow:(schoolId) => api.post('/schools/unfollow/',{schoolId}),
  checkFollowing:(schoolId) => api.post('/schools/checkFollow/',{schoolId})
}

// Metadata
export const metaApi = {
  get: () => api.get('/metadata/'),
}

export default api