import React, { useState } from 'react';
import {
    Animated,
    Clipboard,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { BeautifulAlert } from './BeautifulAlert';
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
  const [currentStep, setCurrentStep] = useState<'options' | 'guide' | 'copy'>('options');
  const [fadeAnim] = useState(new Animated.Value(1));

  const animateTransition = (callback: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      callback();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleCopyToClipboard = async (text: string, label: string) => {
    try {
      await Clipboard.setString(text);
      BeautifulAlert.copySuccess(label, text, () => {
        // Không đóng popup chính, chỉ hiển thị thông báo copy
      });
    } catch (error) {
      BeautifulAlert.error('Lỗi copy', 'Không thể copy vào clipboard');
    }
  };

  const handleMoMoGuide = async () => {
    // Copy admin phone trước
    await handleCopyToClipboard(paymentInfo.adminPhone, 'số điện thoại admin');
    
    // Mở MoMo app
    try {
      const momoUrl = 'momo://app';
      const canOpen = await Linking.canOpenURL(momoUrl);
      if (canOpen) {
        await Linking.openURL(momoUrl);
      } else {
        // Fallback to MoMo web
        await Linking.openURL('https://nhantien.momo.vn/');
      }
    } catch (error) {
      console.log('Không thể mở MoMo app:', error);
    }

    // Chuyển sang màn hình hướng dẫn
    animateTransition(() => setCurrentStep('guide'));
  };

  const handleCopyAll = async () => {
    const allInfo = `Thanh toán MoMo\nSố điện thoại: ${paymentInfo.adminPhone}\nSố tiền: ${paymentInfo.amount}\nNội dung: ${paymentInfo.message}`;
    await handleCopyToClipboard(allInfo, 'tất cả thông tin');
  };

  const handleWebLink = async () => {
    try {
      const webUrl = `https://nhantien.momo.vn/${paymentInfo.adminPhone}`;
      await Linking.openURL(webUrl);
      onClose();
    } catch (error) {
      BeautifulAlert.error('Lỗi', 'Không thể mở link MoMo web');
    }
  };

  const renderOptionsStep = () => (
    <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
      <View style={styles.paymentSummary}>
        <Text style={styles.summaryTitle}>💰 Thông tin thanh toán</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Người nhận:</Text>
          <Text style={styles.summaryValue}>{paymentInfo.adminName || paymentInfo.adminPhone}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Số tiền:</Text>
          <Text style={[styles.summaryValue, styles.amountText]}>{paymentInfo.amount}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Nội dung:</Text>
          <Text style={styles.summaryValue}>{paymentInfo.message}</Text>
        </View>
      </View>

      <Text style={styles.optionsTitle}>Chọn cách thanh toán:</Text>
      
      <TouchableOpacity style={[styles.optionButton, styles.primaryOption]} onPress={handleMoMoGuide}>
        <Text style={styles.optionIcon}>🚀</Text>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>Mở MoMo + Hướng dẫn</Text>
          <Text style={styles.optionDescription}>Mở app MoMo và xem hướng dẫn từng bước</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.optionButton, styles.secondaryOption]} onPress={handleCopyAll}>
        <Text style={styles.optionIcon}>📋</Text>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>Copy tất cả thông tin</Text>
          <Text style={styles.optionDescription}>Copy toàn bộ thông tin thanh toán</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.optionButton, styles.secondaryOption]} onPress={() => animateTransition(() => setCurrentStep('copy'))}>
        <Text style={styles.optionIcon}>📄</Text>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>Copy từng thông tin</Text>
          <Text style={styles.optionDescription}>Copy riêng SĐT, số tiền, nội dung</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.optionButton, styles.tertiaryOption]} onPress={handleWebLink}>
        <Text style={styles.optionIcon}>🌐</Text>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>Mở link MoMo web</Text>
          <Text style={styles.optionDescription}>Mở trang web MoMo trên trình duyệt</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderGuideStep = () => (
    <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
      <View style={styles.guideHeader}>
        <Text style={styles.guideTitle}>📋 Hướng dẫn thanh toán MoMo</Text>
        <Text style={styles.guideSubtitle}>📞 Số điện thoại admin đã được copy sẵn!</Text>
      </View>

      <ScrollView style={styles.guideSteps}>
        <View style={styles.guideStep}>
          <Text style={styles.stepNumber}>1️⃣</Text>
          <Text style={styles.stepText}>Trong app MoMo, chọn <Text style={styles.boldText}>"Chuyển tiền"</Text></Text>
        </View>

        <View style={styles.guideStep}>
          <Text style={styles.stepNumber}>2️⃣</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepText}>Nhập hoặc paste số điện thoại:</Text>
            <TouchableOpacity 
              style={styles.copyField}
              onPress={() => handleCopyToClipboard(paymentInfo.adminPhone, 'số điện thoại')}
            >
              <Text style={styles.copyFieldText}>{paymentInfo.adminPhone}</Text>
              <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.guideStep}>
          <Text style={styles.stepNumber}>3️⃣</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepText}>Nhập số tiền:</Text>
            <TouchableOpacity 
              style={styles.copyField}
              onPress={() => handleCopyToClipboard(paymentInfo.amount.replace(/[^\d]/g, ''), 'số tiền')}
            >
              <Text style={[styles.copyFieldText, styles.amountText]}>{paymentInfo.amount}</Text>
              <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.guideStep}>
          <Text style={styles.stepNumber}>4️⃣</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepText}>Nhập nội dung chuyển tiền:</Text>
            <TouchableOpacity 
              style={styles.copyField}
              onPress={() => handleCopyToClipboard(paymentInfo.message, 'nội dung')}
            >
              <Text style={styles.copyFieldText}>{paymentInfo.message}</Text>
              <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.guideButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.secondaryButton]} 
          onPress={() => animateTransition(() => setCurrentStep('copy'))}
        >
          <Text style={styles.secondaryButtonText}>📋 Menu copy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryButton]} 
          onPress={onClose}
        >
          <Text style={styles.primaryButtonText}>✅ Đã hiểu</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderCopyStep = () => (
    <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
      <Text style={styles.copyTitle}>📄 Copy thông tin thanh toán</Text>
      <Text style={styles.copySubtitle}>Chọn thông tin cần copy:</Text>

      <View style={styles.copyOptions}>
        <TouchableOpacity 
          style={styles.copyOption}
          onPress={() => handleCopyToClipboard(paymentInfo.adminPhone, 'số điện thoại')}
        >
          <Text style={styles.copyOptionIcon}>📞</Text>
          <View style={styles.copyOptionContent}>
            <Text style={styles.copyOptionLabel}>Số điện thoại</Text>
            <Text style={styles.copyOptionValue}>{paymentInfo.adminPhone}</Text>
          </View>
          <Text style={styles.copyIcon}>📋</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.copyOption}
          onPress={() => handleCopyToClipboard(paymentInfo.amount.replace(/[^\d]/g, ''), 'số tiền')}
        >
          <Text style={styles.copyOptionIcon}>💰</Text>
          <View style={styles.copyOptionContent}>
            <Text style={styles.copyOptionLabel}>Số tiền</Text>
            <Text style={[styles.copyOptionValue, styles.amountText]}>{paymentInfo.amount}</Text>
          </View>
          <Text style={styles.copyIcon}>📋</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.copyOption}
          onPress={() => handleCopyToClipboard(paymentInfo.message, 'nội dung')}
        >
          <Text style={styles.copyOptionIcon}>💬</Text>
          <View style={styles.copyOptionContent}>
            <Text style={styles.copyOptionLabel}>Nội dung</Text>
            <Text style={styles.copyOptionValue}>{paymentInfo.message}</Text>
          </View>
          <Text style={styles.copyIcon}>📋</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.copyButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.secondaryButton]} 
          onPress={() => animateTransition(() => setCurrentStep('options'))}
        >
          <Text style={styles.secondaryButtonText}>⬅️ Quay lại</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryButton]} 
          onPress={onClose}
        >
          <Text style={styles.primaryButtonText}>✅ Xong</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const getTitle = () => {
    switch (currentStep) {
      case 'guide':
        return '💰 Hướng dẫn thanh toán';
      case 'copy':
        return '📄 Copy thông tin';
      default:
        return '💰 Thanh toán MoMo';
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'guide':
        return renderGuideStep();
      case 'copy':
        return renderCopyStep();
      default:
        return renderOptionsStep();
    }
  };

  return (
    <CustomModal
      visible={visible}
      title={getTitle()}
      onBackdropPress={onClose}
      showCloseButton={true}
    >
      {renderContent()}
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    minHeight: 200,
  },
  
  // Payment Summary Styles
  paymentSummary: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#495057',
    marginBottom: 12,
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
    color: '#6c757d',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  amountText: {
    color: '#28a745',
    fontWeight: '700',
    fontSize: 16,
  },

  // Options Styles
  optionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  primaryOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  secondaryOption: {
    backgroundColor: '#f8f9fa',
    borderColor: '#e9ecef',
  },
  tertiaryOption: {
    backgroundColor: '#fff',
    borderColor: '#dee2e6',
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6c757d',
  },

  // Guide Styles
  guideHeader: {
    marginBottom: 20,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#495057',
    textAlign: 'center',
    marginBottom: 8,
  },
  guideSubtitle: {
    fontSize: 14,
    color: '#28a745',
    textAlign: 'center',
    fontWeight: '600',
  },
  guideSteps: {
    maxHeight: 300,
    marginBottom: 20,
  },
  guideStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepNumber: {
    fontSize: 18,
    marginRight: 12,
    marginTop: 2,
  },
  stepContent: {
    flex: 1,
  },
  stepText: {
    fontSize: 15,
    color: '#495057',
    lineHeight: 22,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: '700',
    color: '#007AFF',
  },
  copyField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e9ecef',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  copyFieldText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '600',
    flex: 1,
  },
  copyIcon: {
    fontSize: 16,
    marginLeft: 8,
  },

  // Copy Styles
  copyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#495057',
    textAlign: 'center',
    marginBottom: 8,
  },
  copySubtitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
  },
  copyOptions: {
    marginBottom: 20,
  },
  copyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  copyOptionIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  copyOptionContent: {
    flex: 1,
  },
  copyOptionLabel: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
    marginBottom: 4,
  },
  copyOptionValue: {
    fontSize: 15,
    color: '#495057',
    fontWeight: '600',
  },

  // Button Styles
  guideButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  copyButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  secondaryButtonText: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentPopup;
