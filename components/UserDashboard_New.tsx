import { BeautifulAlert } from '@/components/BeautifulAlert';
import PaymentPopup from '@/components/PaymentPopup';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import paymentService, { PaymentRequest } from '@/services/paymentService';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedPaymentInfo, setSelectedPaymentInfo] = useState<{
    adminPhone: string;
    amount: string;
    message: string;
    adminName?: string;
  } | null>(null);
  
  useEffect(() => {
    loadPaymentRequests();
  }, []);

  const loadPaymentRequests = async () => {
    try {
      const response = await paymentService.getPaymentRequests();
      if (response.success && response.data) {
        // Filter only requests where current user is a participant
        const userRequests = response.data.paymentRequests.filter(request =>
          request.participants.some(p => p.phone === user?.phone)
        );
        setPaymentRequests(userRequests);
      }
    } catch (error) {
      console.log('Error loading payment requests:', error);
    }
  };

  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handlePayment = (request: PaymentRequest) => {
    // Find current user's participant info
    const userParticipant = request.participants.find(p => p.phone === user?.phone);
    if (!userParticipant) {
      BeautifulAlert.error('Lỗi', 'Không tìm thấy thông tin thanh toán của bạn');
      return;
    }

    const adminPhone = request.createdBy.phone || '0123456789';
    const amount = userParticipant.amount;
    const message = `${request.title} - ${user?.username}`;
    const adminName = request.createdBy.username || 'Admin';

    console.log('=== PAYMENT DEBUG INFO ===');
    console.log('Admin phone:', adminPhone);
    console.log('Amount:', amount);
    console.log('Message:', message);
    console.log('User:', user?.username);
    console.log('Request createdBy:', request.createdBy);

    // Set payment info và hiển thị popup đẹp
    setSelectedPaymentInfo({
      adminPhone,
      amount: formatMoney(amount),
      message,
      adminName
    });
    setShowPaymentPopup(true);
  };

  // Helper function to get user's participant status
  const getUserParticipantStatus = (request: PaymentRequest) => {
    const userParticipant = request.participants.find(p => p.phone === user?.phone);
    return userParticipant?.status || 'pending';
  };

  // Helper function to get user's amount for a request
  const getUserAmount = (request: PaymentRequest) => {
    const userParticipant = request.participants.find(p => p.phone === user?.phone);
    return userParticipant?.amount || 0;
  };

  const pendingRequests = paymentRequests.filter(r => getUserParticipantStatus(r) === 'pending');
  const paidRequests = paymentRequests.filter(r => getUserParticipantStatus(r) === 'paid');
  const totalPending = pendingRequests.reduce((sum, r) => sum + getUserAmount(r), 0);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Xin chào, {user?.username} 👋</Text>
          <Text style={styles.roleText}>Người dùng</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ThemedView>

      {/* Summary */}
      <ThemedView style={styles.summary}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>💰 Tổng cần thanh toán</Text>
          <Text style={styles.summaryAmount}>{formatMoney(totalPending)}</Text>
          <Text style={styles.summaryCount}>{pendingRequests.length} yêu cầu chưa thanh toán</Text>
        </View>
      </ThemedView>

      {/* Pending Payments */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          ⏳ Cần thanh toán ({pendingRequests.length})
        </ThemedText>
        
        {pendingRequests.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎉</Text>
            <Text style={styles.emptyText}>Bạn không có khoản nào cần thanh toán!</Text>
          </View>
        ) : (
          pendingRequests.map((request) => (
            <View key={request._id} style={styles.paymentCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{request.title}</Text>
                  <Text style={styles.cardFrom}>Từ: {request.createdBy.username}</Text>
                  <Text style={styles.cardDate}>{formatDate(request.createdAt)}</Text>
                </View>
                <View style={styles.cardAmount}>
                  <Text style={styles.amountText}>{formatMoney(getUserAmount(request))}</Text>
                </View>
              </View>
              
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => handlePayment(request)}
              >
                <Text style={styles.payButtonText}>💳 Thanh toán ngay</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ThemedView>

      {/* Payment History */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          ✅ Đã thanh toán ({paidRequests.length})
        </ThemedText>
        
        {paidRequests.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyText}>Chưa có lịch sử thanh toán</Text>
          </View>
        ) : (
          paidRequests.map((request) => (
            <View key={request._id} style={[styles.paymentCard, styles.paidCard]}>
              <View style={styles.cardHeader}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{request.title}</Text>
                  <Text style={styles.cardFrom}>Từ: {request.createdBy.username}</Text>
                  <Text style={styles.cardDate}>{formatDate(request.createdAt)}</Text>
                </View>
                <View style={styles.cardAmount}>
                  <Text style={[styles.amountText, styles.paidAmount]}>
                    {formatMoney(getUserAmount(request))}
                  </Text>
                </View>
              </View>
              
              <View style={styles.paidStatus}>
                <Text style={styles.paidStatusText}>✅ Đã thanh toán</Text>
              </View>
            </View>
          ))
        )}
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          🚀 Thao tác nhanh
        </ThemedText>
        
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionIcon}>📞</Text>
            <Text style={styles.quickActionText}>Liên hệ Admin</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionIcon}>💡</Text>
            <Text style={styles.quickActionText}>Hướng dẫn</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionIcon}>📊</Text>
            <Text style={styles.quickActionText}>Báo cáo</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Payment Popup */}
      {selectedPaymentInfo && (
        <PaymentPopup
          visible={showPaymentPopup}
          paymentInfo={selectedPaymentInfo}
          onClose={() => {
            setShowPaymentPopup(false);
            setSelectedPaymentInfo(null);
          }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  roleText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
  },
  summary: {
    margin: 16,
    marginBottom: 0,
  },
  summaryCard: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  summaryCount: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  section: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#374151',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  paymentCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  paidCard: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  cardFrom: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  cardAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  paidAmount: {
    color: '#059669',
  },
  payButton: {
    backgroundColor: '#ec4899',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  paidStatus: {
    alignItems: 'center',
    padding: 8,
  },
  paidStatusText: {
    color: '#059669',
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickAction: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    flex: 1,
    marginHorizontal: 4,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4b5563',
    textAlign: 'center',
  },
});
