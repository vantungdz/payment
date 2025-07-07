import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from './config';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

class ApiService {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const token = await AsyncStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getAuthHeaders();
      
      const config: RequestInit = {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      };

      const url = `${this.baseURL}${endpoint}`;
      console.log('Making API request to:', url);
      console.log('Request config:', { method: config.method, headers: config.headers });
      
      if (config.body) {
        console.log('Request body:', config.body);
      }

      const response = await fetch(url, config);
      const data = await response.json();

      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      return {
        success: true,
        data: data.success ? data : { ...data, success: true },
        message: data.message,
      };
    } catch (error: any) {
      console.error('API Error:', error);
      return {
        success: false,
        message: error.message || 'Network error occurred',
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Save token to AsyncStorage
  async saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem('token', token);
  }

  // Remove token from AsyncStorage
  async removeToken(): Promise<void> {
    await AsyncStorage.removeItem('token');
  }

  // Get token from AsyncStorage
  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('token');
  }
}

export default new ApiService();
