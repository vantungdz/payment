import React, { useState } from 'react';
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { CustomModal } from './CustomModal';

interface AdminAction {
  type: 'single' | 'bulk';
  title: string;
  description: string;
  amount?: number;
  user?: any;
  users?: any[];
  onConfirm: () => void;
}

interface AdminPopupProps {
  visible: boolean;
  action: AdminAction | null;
  onClose: () => void;
}

export const AdminPopup: React.FC<AdminPopupProps> = ({
  visible,
  action,
  onClose,
}) => {
  const [fadeAnim] = useState(new Animated.Value(1));

  if (!action) return null;

  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const renderSinglePayment = () => {
    if (!action.user || !action.amount) return null;

    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.title}>💳 Gửi yêu cầu thanh toán</Text>
          <Text style={styles.subtitle}>Xác nhận thông tin trước khi gửi</Text>
        </View>

        <View style={styles.paymentCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Thông tin thanh toán</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Người nhận:</Text>
            <Text style={styles.infoValue}>{action.user.fullName}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại:</Text>
            <Text style={styles.infoValue}>{action.user.phone}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{action.user.email}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Số tiền cần thanh toán:</Text>
            <Text style={styles.amountValue}>{formatMoney(action.amount)}</Text>
          </View>
          
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionLabel}>Mô tả:</Text>
            <Text style={styles.descriptionValue}>{action.description}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>❌ Hủy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.confirmButton]} 
            onPress={() => {
              action.onConfirm();
              onClose();
            }}
          >
            <Text style={styles.confirmButtonText}>📤 Gửi yêu cầu</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const renderBulkPayment = () => {
    if (!action.users) return null;

    const totalAmount = action.users.reduce((sum, req) => sum + req.amount, 0);

    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.title}>📤 Gửi tất cả yêu cầu</Text>
          <Text style={styles.subtitle}>Gửi {action.users.length} yêu cầu thanh toán</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>📊 Tổng quan</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Số người:</Text>
            <Text style={styles.summaryValue}>{action.users.length} người</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tổng tiền:</Text>
            <Text style={[styles.summaryValue, styles.totalAmount]}>{formatMoney(totalAmount)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Mô tả:</Text>
            <Text style={styles.summaryValue}>{action.description}</Text>
          </View>
        </View>

        <View style={styles.participantsList}>
          <Text style={styles.participantsTitle}>👥 Danh sách người thanh toán:</Text>
          <ScrollView style={styles.participantsScroll} showsVerticalScrollIndicator={false}>
            {action.users.map((req, index) => (
              <View key={index} style={styles.participantCard}>
                <View style={styles.participantInfo}>
                  <Text style={styles.participantName}>{req.user.fullName}</Text>
                  <Text style={styles.participantPhone}>{req.user.phone}</Text>
                </View>
                <Text style={styles.participantAmount}>{formatMoney(req.amount)}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>❌ Hủy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.confirmButton]} 
            onPress={() => {
              action.onConfirm();
              onClose();
            }}
          >
            <Text style={styles.confirmButtonText}>🚀 Gửi tất cả</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const getTitle = () => {
    switch (action.type) {
      case 'single':
        return '💳 Gửi yêu cầu thanh toán';
      case 'bulk':
        return '📤 Gửi tất cả yêu cầu';
      default:
        return '💰 Xác nhận';
    }
  };

  return (
    <CustomModal
      visible={visible}
      title={getTitle()}
      onBackdropPress={onClose}
      showCloseButton={true}
    >
      {action.type === 'single' ? renderSinglePayment() : renderBulkPayment()}
    </CustomModal>
  );
};

interface SplitMoneyPopupProps {
  visible: boolean;
  totalAmount: number;
  selectedUsers: number;
  includeSelf: boolean;
  perPerson: number;
  onConfirm: () => void;
  onClose: () => void;
}

export const SplitMoneyPopup: React.FC<SplitMoneyPopupProps> = ({
  visible,
  totalAmount,
  selectedUsers,
  includeSelf,
  perPerson,
  onConfirm,
  onClose,
}) => {
  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const totalPeople = selectedUsers + (includeSelf ? 1 : 0);

  return (
    <CustomModal
      visible={visible}
      title="⚡ Chia đều tự động"
      onBackdropPress={onClose}
      showCloseButton={true}
    >
      <View style={styles.splitContainer}>
        <View style={styles.splitHeader}>
          <Text style={styles.splitTitle}>💰 Chia tiền tự động</Text>
          <Text style={styles.splitSubtitle}>Xác nhận phân chia số tiền</Text>
        </View>

        <View style={styles.splitCard}>
          <View style={styles.splitRow}>
            <Text style={styles.splitLabel}>Tổng số tiền:</Text>
            <Text style={[styles.splitValue, styles.totalMoney]}>{formatMoney(totalAmount)}</Text>
          </View>
          
          <View style={styles.splitRow}>
            <Text style={styles.splitLabel}>Số người tham gia:</Text>
            <Text style={styles.splitValue}>
              {totalPeople} người {includeSelf && '(bao gồm bạn)'}
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.splitRow}>
            <Text style={styles.splitLabel}>Mỗi người trả:</Text>
            <Text style={[styles.splitValue, styles.perPersonAmount]}>{formatMoney(perPerson)}</Text>
          </View>
        </View>

        <View style={styles.splitInfo}>
          <Text style={styles.splitInfoText}>
            {includeSelf 
              ? `✅ Bạn cũng sẽ được tính vào danh sách thanh toán với số tiền ${formatMoney(perPerson)}`
              : 'ℹ️ Bạn sẽ không phải thanh toán (chỉ là người tạo yêu cầu)'
            }
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>❌ Hủy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.confirmButton]} 
            onPress={() => {
              onConfirm();
              onClose();
            }}
          >
            <Text style={styles.confirmButtonText}>⚡ Chia đều</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
  },
  
  // Header
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Payment Card
  paymentCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cardHeader: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 12,
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#28a745',
  },
  descriptionSection: {
    alignItems: 'center',
  },
  descriptionLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  descriptionValue: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Summary Card
  summaryCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  summaryHeader: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#bbdefb',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976d2',
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#1565c0',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#0d47a1',
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: '700',
  },

  // Participants
  participantsList: {
    marginBottom: 20,
  },
  participantsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 12,
  },
  participantsScroll: {
    maxHeight: 200,
  },
  participantCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 2,
  },
  participantPhone: {
    fontSize: 12,
    color: '#6c757d',
  },
  participantAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#28a745',
  },

  // Split Money Popup
  splitContainer: {
    minHeight: 250,
  },
  splitHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },
  splitTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  splitSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  splitCard: {
    backgroundColor: '#f3e5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ce93d8',
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  splitLabel: {
    fontSize: 14,
    color: '#7b1fa2',
    fontWeight: '500',
  },
  splitValue: {
    fontSize: 14,
    color: '#4a148c',
    fontWeight: '600',
  },
  totalMoney: {
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: '700',
  },
  perPersonAmount: {
    fontSize: 18,
    color: '#1976d2',
    fontWeight: '700',
  },
  splitInfo: {
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
  splitInfoText: {
    fontSize: 13,
    color: '#2e7d32',
    textAlign: 'center',
    lineHeight: 18,
  },

  // Buttons
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cancelButtonText: {
    color: '#6c757d',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AdminPopup;
