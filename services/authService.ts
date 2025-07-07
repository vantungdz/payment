import apiService from './apiService';
import { ENDPOINTS } from './config';

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  fullName: string;
  role: 'admin' | 'user';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  phone: string;
  fullName: string;
  role?: 'admin' | 'user';
}

export interface AuthResponse {
  token: string;
  user: User;
}

class AuthService {
  async login(credentials: LoginCredentials) {
    const response = await apiService.post<AuthResponse>(ENDPOINTS.LOGIN, credentials);
    
    if (response.success && response.data) {
      await apiService.saveToken(response.data.token);
      return response;
    }
    
    return response;
  }

  async register(userData: RegisterData) {
    const response = await apiService.post<AuthResponse>(ENDPOINTS.REGISTER, userData);
    
    if (response.success && response.data) {
      await apiService.saveToken(response.data.token);
      return response;
    }
    
    return response;
  }

  async getCurrentUser() {
    return apiService.get<{ user: User }>(ENDPOINTS.ME);
  }

  async logout() {
    const response = await apiService.post(ENDPOINTS.LOGOUT);
    await apiService.removeToken();
    return response;
  }

  async checkAuthStatus(): Promise<User | null> {
    const token = await apiService.getToken();
    if (!token) return null;

    const response = await this.getCurrentUser();
    if (response.success && response.data) {
      return response.data.user;
    }

    // Token invalid, remove it
    await apiService.removeToken();
    return null;
  }
}

export default new AuthService();
