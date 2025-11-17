import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

/**
 * API Error class for better error handling
 */
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

/**
 * API Response type
 */
export interface APIResponse<T = any> {
  data: T
  success: boolean
  message?: string
}

/**
 * API Error Response type
 */
interface APIErrorResponse {
  message?: string
  error?: string
  [key: string]: any
}

/**
 * Creates an axios instance with default configuration
 */
function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add any auth tokens here if needed
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<APIErrorResponse>) => {
      const message = error.response?.data?.message || error.response?.data?.error || error.message || 'An error occurred'
      const statusCode = error.response?.status

      throw new APIError(message, statusCode, error.response?.data)
    }
  )

  return instance
}

/**
 * API Client class
 */
class APIClient {
  private instance: AxiosInstance

  constructor() {
    this.instance = createAxiosInstance()
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config)
    return response.data
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(url, data, config)
    return response.data
  }

  /**
   * PUT request
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(url, data, config)
    return response.data
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.patch(url, data, config)
    return response.data
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config)
    return response.data
  }
}

// Export singleton instance
export const apiClient = new APIClient()

// Export individual methods for convenience
export const api = {
  get: apiClient.get.bind(apiClient),
  post: apiClient.post.bind(apiClient),
  put: apiClient.put.bind(apiClient),
  patch: apiClient.patch.bind(apiClient),
  delete: apiClient.delete.bind(apiClient),
}
