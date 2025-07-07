import apiService from './apiService';
import { User } from './authService';
import { ENDPOINTS } from './config';

class UserService {
  async searchUsers(query: string) {
    return apiService.get<{ users: User[] }>(`${ENDPOINTS.USER_SEARCH}?q=${encodeURIComponent(query)}`);
  }

  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.role) queryParams.append('role', params.role);

    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return apiService.get<{
      users: User[];
      pagination: {
        current: number;
        pages: number;
        total: number;
      };
    }>(`${ENDPOINTS.USERS}${query}`);
  }

  async getUser(id: string) {
    return apiService.get<{ user: User }>(`${ENDPOINTS.USERS}/${id}`);
  }

  async updateUser(id: string, data: {
    fullName?: string;
    phone?: string;
    email?: string;
  }) {
    return apiService.put<{ user: User }>(`${ENDPOINTS.USERS}/${id}`, data);
  }

  async deactivateUser(id: string) {
    return apiService.delete(`${ENDPOINTS.USERS}/${id}`);
  }
}

export default new UserService();
