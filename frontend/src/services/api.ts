import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { ApiResponse } from '../types/portfolio'

// Create axios instance with base configuration
const createApiInstance = (): AxiosInstance => {
    // Use proper Vite environment variable with fallback
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

    console.log('🚀 API Base URL:', baseURL)

    const instance = axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    // Request interceptor
    instance.interceptors.request.use(
        (config) => {
            console.log(`📤 Making ${config.method?.toUpperCase()} request to: ${config.url}`)
            return config
        },
        (error) => {
            console.error('❌ Request interceptor error:', error)
            return Promise.reject(error)
        }
    )

    // Response interceptor
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            console.log(`📥 Response from ${response.config.url}: ${response.status}`)
            return response
        },
        (error: AxiosError) => {
            console.error('❌ Response interceptor error:', error.response?.status, error.message)

            // Handle common error scenarios
            if (error.response?.status === 404) {
                console.warn('⚠️ Resource not found')
            } else if (error.response?.status === 500) {
                console.error('💥 Server error occurred')
            } else if (error.code === 'ECONNABORTED') {
                console.error('⏰ Request timeout')
            } else if (error.code === 'ERR_NETWORK') {
                console.error('🌐 Network error - check if backend is running')
            }

            return Promise.reject(error)
        }
    )

    return instance
}

// API instance
export const api = createApiInstance()

// Generic API call wrapper
export const apiCall = async <T>(
    request: () => Promise<AxiosResponse<ApiResponse<T>>>
): Promise<T> => {
    try {
        const response = await request()

        if (response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.error || 'API call failed')
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Enhanced error handling with more context
            let message = 'An error occurred'

            if (error.code === 'ERR_NETWORK') {
                message = 'Unable to connect to the server. Please check if the backend is running on http://localhost:8080'
            } else if (error.response?.data?.error) {
                message = error.response.data.error
            } else if (error.response?.data?.message) {
                message = error.response.data.message
            } else if (error.message) {
                message = error.message
            }

            throw new Error(message)
        }
        throw error
    }
}

// Health check
export const healthCheck = async (): Promise<string> => {
    return apiCall(() => api.get<ApiResponse<string>>('/portfolio/health'))
}
