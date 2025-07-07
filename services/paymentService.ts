import apiService from './apiService';
import { User } from './authService';
import { ENDPOINTS } from './config';

export interface PaymentParticipant {
  user: string;
  name: string;
  phone: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  paidAt?: string;
  momoTransactionId?: string;
}

export interface PaymentRequest {
  _id: string;
  title: string;
  description?: string;
  totalAmount: number;
  createdBy: User;
  participants: PaymentParticipant[];
  status: 'draft' | 'sent' | 'completed' | 'cancelled';
  dueDate?: string;
  sentAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentData {
  title: string;
  description?: string;
  totalAmount: number;
  participants: {
    name: string;
    phone: string;
    amount: number;
  }[];
  dueDate?: string;
}

export interface PaymentStats {
  // Admin stats
  totalRequests?: number;
  completedRequests?: number;
  pendingRequests?: number;
  totalAmount?: number;
  completedAmount?: number;
  
  // User stats
  totalOwed?: number;
  totalPaid?: number;
  pendingPayments?: number;
  completedPayments?: number;
}

class PaymentService {
  async createPaymentRequest(data: CreatePaymentData) {
    return apiService.post<{ paymentRequest: PaymentRequest }>(ENDPOINTS.PAYMENTS, data);
  }

  async getPaymentRequests(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);

    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return apiService.get<{
      paymentRequests: PaymentRequest[];
      pagination: {
        current: number;
        pages: number;
        total: number;
      };
    }>(`${ENDPOINTS.PAYMENTS}${query}`);
  }

  async getPaymentRequest(id: string) {
    return apiService.get<{ paymentRequest: PaymentRequest }>(`${ENDPOINTS.PAYMENTS}/${id}`);
  }

  async sendPaymentRequest(id: string) {
    return apiService.put<{ paymentRequest: PaymentRequest }>(ENDPOINTS.PAYMENT_SEND(id));
  }

  async markPaymentAsPaid(paymentId: string, participantId: string, momoTransactionId?: string) {
    return apiService.put<{ paymentRequest: PaymentRequest }>(
      ENDPOINTS.PAYMENT_PAY(paymentId, participantId),
      momoTransactionId ? { momoTransactionId } : undefined
    );
  }

  async deletePaymentRequest(id: string) {
    return apiService.delete(`${ENDPOINTS.PAYMENTS}/${id}`);
  }

  async getDashboardStats() {
    return apiService.get<{ stats: PaymentStats }>(ENDPOINTS.PAYMENT_STATS);
  }
}

export default new PaymentService();
