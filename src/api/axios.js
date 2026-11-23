import axios from 'axios'


const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL


const api = axios.create({
    baseURL: `${BACKEND_BASE_URL}/api/v1`,
    withCredentials: true
})

const SKIP_REFRESH = ['auth/login', 'auth/signup', 'auth/refresh', 'auth/logout']

const PUBLIC_PATHS = ['/', '/login', '/signup', '/forget-password', '/reset-password']

let refreshPromise = null

const refreshAccessToken = () => {

    if (!refreshPromise) {
        refreshPromise = api.post('/auth/refresh').finally(() => {
            refreshPromise = null
        })
    }

    return refreshPromise
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {

        const original = error.config
        const status = error.response?.status
        const url = (original?.url || '').replace(/^\//, '')

        const shouldRefresh = original && (status === 401 || status === 403) && !original._retry && !SKIP_REFRESH.some((p) => url.startsWith(p))

        if (!shouldRefresh) {
            return Promise.reject(error)
        }

        original._retry = true

        try {

            await refreshAccessToken()
            return api(original)

        } catch (refreshError) {

            const refreshStatus = refreshError.response?.status

            // only a real "session is over" answer logs the owner out
            if ([401, 403, 404, 406].includes(refreshStatus)) {
                localStorage.removeItem('keepLoggedIn')
                if (!PUBLIC_PATHS.includes(window.location.pathname)) {
                    window.location.href = '/login'
                }
            }
            return Promise.reject(error)

        }
    }
)

export default api