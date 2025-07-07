import { AdminPopup, SplitMoneyPopup } from '@/components/AdminPopup';
import { BeautifulAlert } from '@/components/BeautifulAlert';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { User } from '@/services/authService';
import paymentService, { PaymentRequest } from '@/services/paymentService';
import userService from '@/services/userService';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function AdminDashboard() {
  const [total, setTotal] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<{[key: string]: {selected: boolean, amount: number}}>({});
  const [includeSelf, setIncludeSelf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  
  // Popup states
  const [showSplitPopup, setShowSplitPopup] = useState(false);
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [adminAction, setAdminAction] = useState<any>(null);
  
  const colorScheme = useColorScheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    loadPaymentRequests();
    loadUsers();
  }, []);

  const loadPaymentRequests = async () => {
    try {
      const response = await paymentService.getPaymentRequests();
      if (response.success && response.data) {
        setPaymentRequests(response.data.paymentRequests || []);
      }
    } catch (error) {
      console.log('Error loading payment requests:', error);
    }
  };

  const loadUsers = async () => {
    try {
      console.log('Loading users...');
      const response = await userService.getUsers();
      console.log('Users response:', response);
      
      if (response.success && response.data) {
        const allUsers = response.data.users || [];
        // Lọc bỏ user hiện tại (admin) khỏi danh sách - so sánh bằng username
        const filteredUsers = allUsers.filter((u: any) => u.username !== user?.username);
        setUsers(filteredUsers);
        console.log('Loaded users:', filteredUsers);
      }
    } catch (error) {
      console.log('Error loading users:', error);
    }
  };

  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Format number with thousands separator while typing
  const formatNumber = (value: string): string => {
    // Remove all non-digits
    const number = value.replace(/\D/g, '');
    // Add thousands separator
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Parse formatted number back to plain number
  const parseNumber = (value: string): number => {
    return Number(value.replace(/,/g, '')) || 0;
  };

  const handleTotalChange = (value: string) => {
    const formatted = formatNumber(value);
    setTotal(formatted);
  };

  const handleAmountChange = (userId: string, value: string) => {
    const formatted = formatNumber(value);
    const numericValue = parseNumber(formatted);
    
    setSelectedUsers(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        amount: numericValue
      }
    }));
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => ({
      ...prev,
      [userId]: {
        selected: !prev[userId]?.selected,
        amount: prev[userId]?.amount || 0
      }
    }));
  };

  const autoSplit = () => {
    if (!total) {
      BeautifulAlert.error('Lỗi', 'Vui lòng nhập tổng tiền');
      return;
    }
    
    const selectedUserIds = Object.keys(selectedUsers).filter(id => selectedUsers[id]?.selected);
    if (selectedUserIds.length === 0) {
      BeautifulAlert.error('Lỗi', 'Vui lòng chọn ít nhất một người để chia tiền');
      return;
    }
    
    const totalAmount = parseNumber(total);
    const totalPeople = selectedUserIds.length + (includeSelf ? 1 : 0);
    const perPerson = Math.round(totalAmount / totalPeople);
    
    // Hiển thị popup chia tiền đẹp
    setShowSplitPopup(true);
  };

  const handleSplitConfirm = () => {
    const selectedUserIds = Object.keys(selectedUsers).filter(id => selectedUsers[id]?.selected);
    const totalAmount = parseNumber(total);
    const totalPeople = selectedUserIds.length + (includeSelf ? 1 : 0);
    const perPerson = Math.round(totalAmount / totalPeople);
    
    const updated = { ...selectedUsers };
    selectedUserIds.forEach(userId => {
      if (updated[userId]) {
        updated[userId].amount = perPerson;
      }
    });
    
    if (includeSelf && user) {
      const adminData = users.find(u => u.phone === user.phone);
      if (adminData && adminData.id) {
        updated[adminData.id] = {
          selected: true,
          amount: perPerson
        };
      }
    }
    
    setSelectedUsers(updated);
    setShowSplitPopup(false);
    BeautifulAlert.success('Thành công', 'Đã chia tiền đều cho tất cả mọi người!');
  };

  const handleAdminPopupConfirm = () => {
    if (adminAction && adminAction.onConfirm) {
      adminAction.onConfirm();
      setShowAdminPopup(false);
      setAdminAction(null);
    }
  };

  const sendPaymentRequest = async (user: User, amount: number) => {
    if (amount <= 0) {
      BeautifulAlert.error('Lỗi', 'Số tiền phải lớn hơn 0');
      return;
    }

    // Hiển thị popup xác nhận đẹp
    setAdminAction({
      type: 'single',
      title: 'Gửi yêu cầu thanh toán',
      description: description || 'Yêu cầu thanh toán',
      amount: amount,
      user: user,
      onConfirm: async () => {
        try {
          setIsLoading(true);
          
          // Tạo payment request trong database
          const response = await paymentService.createPaymentRequest({
            title: description || 'Yêu cầu thanh toán',
            description: description || 'Yêu cầu thanh toán',
            totalAmount: amount,
            participants: [{
              name: user.fullName,
              phone: user.phone,
              amount: amount
            }]
          });

          if (response.success) {
            // Reload payment requests
            await loadPaymentRequests();
            
            BeautifulAlert.success('Thành công', 'Yêu cầu thanh toán đã được tạo và gửi thành công');
          } else {
            BeautifulAlert.error('Lỗi', 'Không thể tạo yêu cầu thanh toán');
          }
        } catch (error) {
          console.log('Error creating payment request:', error);
          BeautifulAlert.error('Lỗi', 'Có lỗi xảy ra khi tạo yêu cầu');
        } finally {
          setIsLoading(false);
        }
      }
    });
    setShowAdminPopup(true);
  };

  const sendAllRequests = async () => {
    const validRequests = Object.keys(selectedUsers)
      .filter(userId => selectedUsers[userId]?.selected && selectedUsers[userId]?.amount > 0)
      .map(userId => {
        const user = users.find((u: any) => u._id === userId);
        return user ? { user, amount: selectedUsers[userId].amount } : null;
      })
      .filter(Boolean) as { user: any; amount: number }[];

    // Thêm admin vào danh sách nếu "bao gồm bản thân" được chọn
    let allParticipants = [...validRequests];
    if (includeSelf) {
      // Tính số tiền admin cần đóng dựa trên chia đều
      const selectedUserIds = Object.keys(selectedUsers).filter(id => selectedUsers[id]?.selected);
      if (selectedUserIds.length > 0) {
        const totalAmount = parseNumber(total);
        const totalPeople = selectedUserIds.length + 1; // +1 cho admin
        const adminAmount = Math.round(totalAmount / totalPeople);
        
        allParticipants.push({
          user: {
            _id: user?.id || 'admin',
            fullName: user?.fullName || 'Admin',
            phone: user?.phone || '0000000000'
          },
          amount: adminAmount
        });
      }
    }
    
    if (allParticipants.length === 0) {
      BeautifulAlert.error('Lỗi', 'Không có người nào hợp lệ để gửi yêu cầu');
      return;
    }

    // Hiển thị popup xác nhận bulk payment
    setAdminAction({
      type: 'bulk',
      title: 'Gửi tất cả yêu cầu',
      description: description || 'Yêu cầu thanh toán',
      users: allParticipants,
      onConfirm: async () => {
        try {
          setIsLoading(true);
          
          // Tạo payment request trong database
          const totalAmount = allParticipants.reduce((sum, req) => sum + req.amount, 0);
          const response = await paymentService.createPaymentRequest({
            title: description || 'Yêu cầu thanh toán',
            description: description || 'Yêu cầu thanh toán',
            totalAmount,
            participants: allParticipants.map(req => ({
              name: req.user.fullName,
              phone: req.user.phone,
              amount: req.amount
            }))
          });

          if (response.success) {
            // Reload payment requests
            await loadPaymentRequests();
            
            const successMessage = includeSelf 
              ? `Đã tạo và gửi thành công ${validRequests.length} yêu cầu thanh toán (bạn cũng được bao gồm)`
              : `Đã tạo và gửi thành công ${validRequests.length} yêu cầu thanh toán`;
            BeautifulAlert.success('Thành công', successMessage);
          } else {
            BeautifulAlert.error('Lỗi', 'Không thể tạo yêu cầu thanh toán');
          }
        } catch (error) {
          console.log('Error creating payment requests:', error);
          BeautifulAlert.error('Lỗi', 'Có lỗi xảy ra khi tạo yêu cầu');
        } finally {
          setIsLoading(false);
        }
      }
    });
    setShowAdminPopup(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Xin chào, {user?.username} 👋</Text>
          <Text style={styles.roleText}>Quản trị viên</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ThemedView>

      {/* Payment Creation Form */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          🧾 Tạo yêu cầu thanh toán
        </ThemedText>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mô tả:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="VD: Tiền phòng tháng 12"
            placeholderTextColor="#6b7280"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tổng tiền:</Text>
          <TextInput
            style={styles.input}
            value={total}
            onChangeText={handleTotalChange}
            placeholder="VD: 6,000,000"
            keyboardType="numeric"
            placeholderTextColor="#6b7280"
          />
        </View>

        {/* Include Self Checkbox */}
        <View style={styles.inputGroup}>
          <View style={styles.includeSelfSection}>
            <TouchableOpacity 
              style={styles.includeSelfContainer}
              onPress={() => setIncludeSelf(!includeSelf)}
            >
              <View style={[styles.checkbox, includeSelf && styles.checkboxSelected]}>
                {includeSelf && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.includeSelfLabel}>
                Bao gồm bản thân khi chia đều
              </Text>
            </TouchableOpacity>
            <Text style={styles.includeSelfHint}>
              {includeSelf ? '✅ Admin sẽ được tính vào khi chia tiền' : 'ℹ️ Admin sẽ không phải đóng tiền'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.autoSplitButton} onPress={autoSplit}>
          <Text style={styles.autoSplitText}>⚡ Chia đều tự động</Text>
        </TouchableOpacity>
      </ThemedView>

      {/* Users Selection */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          👥 Chọn người thanh toán ({Object.keys(selectedUsers).filter(id => selectedUsers[id]?.selected).length} được chọn)
        </ThemedText>

        {users.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Đang tải danh sách người dùng...</Text>
          </View>
        ) : (
          users.map((userItem: any) => {
            const isSelected = selectedUsers[userItem._id]?.selected || false;
            const amount = selectedUsers[userItem._id]?.amount || 0;
            
            return (
              <View key={userItem._id} style={[styles.userCard, isSelected && styles.userCardSelected]}>
                <TouchableOpacity 
                  style={styles.userHeader}
                  onPress={() => toggleUserSelection(userItem._id)}
                >
                  <View style={styles.userInfoRow}>
                    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                      {isSelected && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userName}>{userItem.fullName}</Text>
                      <Text style={styles.userContact}>{userItem.phone}</Text>
                      <Text style={styles.userEmail}>{userItem.email}</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {isSelected && (
                  <View style={styles.amountSection}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Số tiền:</Text>
                      <TextInput
                        style={styles.input}
                        value={amount > 0 ? formatNumber(amount.toString()) : ''}
                        onChangeText={(value) => handleAmountChange(userItem._id, value)}
                        placeholder="VD: 2,000,000"
                        keyboardType="numeric"
                        placeholderTextColor="#6b7280"
                      />
                    </View>

                    <View style={styles.userFooter}>
                      <Text style={styles.amountDisplay}>
                        {amount > 0 ? formatMoney(amount) : 'Chưa có số tiền'}
                      </Text>
                      <TouchableOpacity
                        style={[styles.sendButton, amount <= 0 && styles.sendButtonDisabled]}
                        onPress={() => sendPaymentRequest(userItem, amount)}
                        disabled={amount <= 0}
                      >
                        <Text style={styles.sendButtonText}>Gửi yêu cầu</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            );
          })
        )}

        <TouchableOpacity style={styles.sendAllButton} onPress={sendAllRequests}>
          <Text style={styles.sendAllButtonText}>📤 Gửi tất cả yêu cầu đã chọn</Text>
        </TouchableOpacity>
      </ThemedView>

      {/* Payment Requests History */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          📊 Lịch sử yêu cầu thanh toán
        </ThemedText>
        
        {paymentRequests.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Chưa có yêu cầu thanh toán nào</Text>
          </View>
        ) : (
          paymentRequests.map((request) => (
            <View key={request._id} style={styles.paymentRequest}>
              <View style={styles.paymentHeader}>
                <Text style={styles.paymentTitle}>{request.title}</Text>
                <Text style={[styles.paymentStatus, 
                  request.status === 'completed' && styles.statusCompleted,
                  request.status === 'sent' && styles.statusSent,
                  request.status === 'draft' && styles.statusDraft
                ]}>
                  {request.status === 'completed' ? '✅ Hoàn thành' :
                   request.status === 'sent' ? '📤 Đã gửi' : '📝 Bản nháp'}
                </Text>
              </View>
              
              <Text style={styles.paymentAmount}>
                {formatMoney(request.totalAmount)}
              </Text>
              
              <Text style={styles.paymentDescription}>
                {request.description}
              </Text>
              
              <View style={styles.participantsList}>
                {request.participants.map((participant, index) => (
                  <View key={index} style={styles.participant}>
                    <Text style={styles.participantName}>
                      {participant.name} ({participant.phone})
                    </Text>
                    <Text style={styles.participantAmount}>
                      {formatMoney(participant.amount)}
                    </Text>
                    <Text style={[styles.participantStatus,
                      participant.status === 'paid' && styles.statusPaid,
                      participant.status === 'pending' && styles.statusPending
                    ]}>
                      {participant.status === 'paid' ? '✅ Đã thanh toán' : '⏳ Chờ thanh toán'}
                    </Text>
                  </View>
                ))}
              </View>
              
              <Text style={styles.paymentDate}>
                Tạo: {new Date(request.createdAt).toLocaleDateString('vi-VN')}
              </Text>
            </View>
          ))
        )}
      </ThemedView>

      {/* Popup Components */}
      <SplitMoneyPopup
        visible={showSplitPopup}
        totalAmount={parseNumber(total)}
        selectedUsers={Object.keys(selectedUsers).filter(id => selectedUsers[id]?.selected).length}
        includeSelf={includeSelf}
        perPerson={Math.round(parseNumber(total) / (Object.keys(selectedUsers).filter(id => selectedUsers[id]?.selected).length + (includeSelf ? 1 : 0)))}
        onConfirm={handleSplitConfirm}
        onClose={() => setShowSplitPopup(false)}
      />

      <AdminPopup
        visible={showAdminPopup}
        action={adminAction}
        onClose={() => {
          setShowAdminPopup(false);
          setAdminAction(null);
        }}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
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
  inputGroup: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  includeSelfSection: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  includeSelfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  includeSelfLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4b5563',
    marginLeft: 12,
    flex: 1,
  },
  includeSelfHint: {
    fontSize: 13,
    color: '#64748b',
    marginLeft: 36,
    fontStyle: 'italic',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#4b5563',
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#1f2937', // Màu text tối để dễ đọc
  },
  autoSplitButton: {
    backgroundColor: '#8b5cf6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  autoSplitText: {
    color: 'white',
    fontWeight: '600',
  },
  personCard: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  personHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  personIndex: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  removeButton: {
    backgroundColor: '#ef4444',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  personInputs: {
    gap: 8,
  },
  nameInput: {
    flex: 1,
  },
  phoneInput: {
    flex: 1,
  },
  amountInput: {
    flex: 1,
  },
  personFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  amountDisplay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  sendButton: {
    backgroundColor: '#ec4899',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  userCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  userCardSelected: {
    borderColor: '#3b82f6',
    borderWidth: 2,
  },
  userHeader: {
    padding: 16,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  userContact: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 1,
  },
  userEmail: {
    fontSize: 13,
    color: '#9ca3af',
  },
  amountSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  userFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  sendAllButton: {
    backgroundColor: '#059669',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  sendAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  paymentRequest: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: '#374151',
  },
  paymentStatus: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  statusCompleted: {
    backgroundColor: '#d1fae5',
    color: '#059669',
  },
  statusSent: {
    backgroundColor: '#dbeafe',
    color: '#2563eb',
  },
  statusDraft: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
  },
  paymentAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  participantsList: {
    gap: 8,
    marginBottom: 12,
  },
  participant: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  participantName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 4,
  },
  participantAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  participantStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusPaid: {
    color: '#059669',
  },
  statusPending: {
    color: '#d97706',
  },
  paymentDate: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'right',
  },
});
