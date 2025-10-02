import React, { useState } from 'react';
import {
  Clipboard,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PaymentPopupStyles as styles } from '../styles/components/PaymentPopup.styles';
import { CustomModal } from './CustomModal';

interface PaymentInfo {
  adminPhone: string;
  amount: string;
  message: string;
  adminName?: string;
}

interface PaymentPopupProps {
  visible: boolean;
  paymentInfo: PaymentInfo;
  onClose: () => void;
}

export const PaymentPopup: React.FC<PaymentPopupProps> = ({
  visible,
  paymentInfo,
  onClose,
}) => {
  const [currentToast, setCurrentToast] = useState<string>('');
  const toastOpacity = useSharedValue(0);
  const hideTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const toastAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: toastOpacity.value,
      transform: [
        {
          translateY: withSpring(toastOpacity.value === 1 ? 0 : -20),
        },
      ],
    };
  });

  const showToast = (message: string) => {
    // Clear timeout cũ nếu có
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    // Nếu đang có toast hiển thị, ẩn nó trước
    if (currentToast) {
      toastOpacity.value = withTiming(0, { duration: 200 });
      setTimeout(() => {
        setCurrentToast(message);
        toastOpacity.value = withTiming(1, { duration: 300 });
      }, 200);
    } else {
      // Hiển thị toast mới
      setCurrentToast(message);
      toastOpacity.value = withTiming(1, { duration: 300 });
    }
    
    // Tự động ẩn sau 3 giây (tăng thời gian để user đọc được)
    hideTimeoutRef.current = setTimeout(() => {
      toastOpacity.value = withTiming(0, { duration: 300 });
      setTimeout(() => {
        setCurrentToast('');
      }, 300);
    }, 3000);
  };

  // Cleanup timeout khi component unmount
  React.useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyToClipboard = async (text: string, label: string, showAlert: boolean = true) => {
    try {
      await Clipboard.setString(text);
      if (showAlert) {
        showToast(`Đã copy ${label}`);
      }
    } catch (error) {
      showToast('Lỗi copy');
    }
  };

  const handleOpenMoMo = async () => {
    // Copy số điện thoại admin trước
    await handleCopyToClipboard(paymentInfo.adminPhone, 'số điện thoại admin', false);
    
    // Mở MoMo app
    try {
      const momoUrl = 'momo://app';
      const canOpen = await Linking.canOpenURL(momoUrl);
      if (canOpen) {
        await Linking.openURL(momoUrl);
        showToast('Đã mở MoMo! SĐT đã copy');
        // Đóng popup sau 3.5 giây để user có thể thấy toast
        setTimeout(() => {
          onClose();
        }, 3500);
      } else {
        // Fallback to MoMo web
        await Linking.openURL('https://nhantien.momo.vn/');
        showToast('Đã mở MoMo Web! SĐT đã copy');
        setTimeout(() => {
          onClose();
        }, 3500);
      }
    } catch (error) {
      showToast('Không thể mở MoMo');
    }
  };

  const handleCopyAll = async () => {
    const allInfo = `Thanh toán MoMo\nSố điện thoại: ${paymentInfo.adminPhone}\nSố tiền: ${paymentInfo.amount.replace(/[^\d]/g, '')}\nNội dung: ${paymentInfo.message}`;
    await handleCopyToClipboard(allInfo, 'tất cả thông tin');
  };

  return (
    <CustomModal
      visible={visible}
      title=""
      onBackdropPress={onClose}
      showCloseButton={true}
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces={true}
        scrollEnabled={true}
        nestedScrollEnabled={true}
      >
        {/* Header với gradient */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>💰</Text>
          </View>
          <Text style={styles.headerTitle}>Thanh toán MoMo</Text>
          <Text style={styles.headerSubtitle}>Thông tin chi tiết</Text>
        </View>

        {/* Amount highlight card */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Số tiền cần thanh toán</Text>
          <TouchableOpacity 
            style={styles.amountContainer}
            onPress={() => handleCopyToClipboard(paymentInfo.amount.replace(/[^\d]/g, ''), 'số tiền', true)}
          >
            <Text style={styles.amountValue}>{paymentInfo.amount}</Text>
            <View style={styles.copyBadge}>
              <Text style={styles.copyBadgeText}>Chạm để copy</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Payment details */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Text style={styles.detailIconText}>👤</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Người nhận</Text>
              <Text style={styles.detailValue}>{paymentInfo.adminName || 'Admin'}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Text style={styles.detailIconText}>📱</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Số điện thoại</Text>
              <TouchableOpacity onPress={() => handleCopyToClipboard(paymentInfo.adminPhone, 'số điện thoại', true)}>
                <Text style={styles.detailValueCopyable}>{paymentInfo.adminPhone}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.copyIcon}
              onPress={() => handleCopyToClipboard(paymentInfo.adminPhone, 'số điện thoại', true)}
            >
              <Text style={styles.copyIconText}>📋</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.detailRow, styles.detailRowLast]}>
            <View style={styles.detailIcon}>
              <Text style={styles.detailIconText}>💬</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Nội dung chuyển khoản</Text>
              <TouchableOpacity onPress={() => handleCopyToClipboard(paymentInfo.message, 'nội dung', true)}>
                <Text style={styles.detailValueCopyable}>{paymentInfo.message}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.copyIcon}
              onPress={() => handleCopyToClipboard(paymentInfo.message, 'nội dung', true)}
            >
              <Text style={styles.copyIconText}>📋</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* Action buttons trong scroll */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleOpenMoMo}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonIcon}>🚀</Text>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.primaryButtonTitle}>Mở MoMo</Text>
                <Text style={styles.primaryButtonSubtitle}>Tự động copy & mở app</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleCopyAll}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonIcon}>📋</Text>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.secondaryButtonTitle}>Copy tất cả</Text>
                <Text style={styles.secondaryButtonSubtitle}>Copy toàn bộ thông tin</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Extra space */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Toast notification */}
      {currentToast && (
        <Animated.View style={[styles.toast, toastAnimatedStyle]}>
          <Text style={styles.toastIcon}>✅</Text>
          <Text style={styles.toastText}>{currentToast}</Text>
        </Animated.View>
      )}
    </CustomModal>
  );
};

export default PaymentPopup;

// Styles moved to ../styles/components/PaymentPopup.styles.ts