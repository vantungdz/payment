import { BeautifulAlert } from '@/components/BeautifulAlert';
import PaymentPopup from '@/components/PaymentPopup';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import paymentService, { PaymentRequest } from '@/services/paymentService';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { UserDashboardStyles as styles } from '../styles/components/UserDashboard.styles';

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

// Styles moved to ../styles/components/UserDashboard.styles.ts