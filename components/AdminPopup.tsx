import React, { useState } from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { AdminPopupStyles as styles } from '../styles/components/AdminPopup.styles';
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

export default AdminPopup;

// Styles moved to ../styles/components/AdminPopup.styles.ts