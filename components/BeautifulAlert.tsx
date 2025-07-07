import React, { useState } from 'react';
import { CustomModal } from './CustomModal';

export interface BeautifulAlertButton {
  text: string;
  onPress?: () => void;
  style?: 'primary' | 'secondary' | 'danger' | 'success';
  icon?: string;
  disabled?: boolean;
}

interface AlertState {
  visible: boolean;
  title: string;
  message: string;
  buttons: BeautifulAlertButton[];
  showCloseButton: boolean;
}

class BeautifulAlertManager {
  private static instance: BeautifulAlertManager;
  private setState?: (state: AlertState) => void;

  static getInstance(): BeautifulAlertManager {
    if (!BeautifulAlertManager.instance) {
      BeautifulAlertManager.instance = new BeautifulAlertManager();
    }
    return BeautifulAlertManager.instance;
  }

  setStateManager(setState: (state: AlertState) => void) {
    this.setState = setState;
  }

  show(
    title: string,
    message: string,
    buttons: BeautifulAlertButton[] = [],
    options?: { showCloseButton?: boolean }
  ) {
    if (!this.setState) return;

    const formattedTitle = this.formatTitle(title);
    const formattedMessage = this.formatMessage(message);
    
    // Nếu không có buttons, thêm button OK mặc định
    const finalButtons = buttons.length > 0 ? buttons : [
      { text: 'OK', style: 'primary' as const }
    ];

    this.setState({
      visible: true,
      title: formattedTitle,
      message: formattedMessage,
      buttons: finalButtons,
      showCloseButton: options?.showCloseButton !== false,
    });
  }

  hide() {
    if (!this.setState) return;
    this.setState({
      visible: false,
      title: '',
      message: '',
      buttons: [],
      showCloseButton: true,
    });
  }

  private formatTitle(title: string): string {
    // Thêm emoji phù hợp dựa trên nội dung title
    if (title.includes('Lỗi') || title.includes('Error')) {
      return `❌ ${title}`;
    }
    if (title.includes('Thành công') || title.includes('Đã copy') || title.includes('Success')) {
      return `✅ ${title}`;
    }
    if (title.includes('Xác nhận') || title.includes('Confirm')) {
      return `🤔 ${title}`;
    }
    if (title.includes('Hướng dẫn') || title.includes('Guide')) {
      return `📋 ${title}`;
    }
    if (title.includes('MoMo') || title.includes('Thanh toán')) {
      return `💰 ${title}`;
    }
    if (title.includes('Copy') || title.includes('Sao chép')) {
      return `📄 ${title}`;
    }
    if (title.includes('Chọn') || title.includes('Select')) {
      return `🎯 ${title}`;
    }
    
    return `💬 ${title}`;
  }

  private formatMessage(message: string): string {
    // Không format message nếu chứa thông tin tiền tệ
    if (message.includes('VND') || message.includes('₫') || message.includes('Số tiền:')) {
      return message;
    }
    
    // Format message với line breaks
    return message
      .replace(/\n\n/g, '\n\n') // Giữ nguyên double line breaks
      .replace(/(\d+\.)(?=\s)/g, '\n$1') // Chỉ thêm line break trước numbered lists (có space sau)
      .replace(/^(\d+\.)/, '$1') // Remove line break ở đầu nếu có
      .trim();
  }

  // Các method helper cho các loại alert phổ biến
  success(title: string, message: string, onOk?: () => void) {
    this.show(title, message, [
      { text: 'Tuyệt vời! 👍', onPress: onOk, style: 'success' }
    ]);
  }

  error(title: string, message: string, onOk?: () => void) {
    this.show(title, message, [
      { text: 'Đã hiểu 😞', onPress: onOk, style: 'danger' }
    ]);
  }

  confirm(
    title: string, 
    message: string, 
    onConfirm: () => void, 
    onCancel?: () => void,
    confirmText: string = 'Xác nhận',
    cancelText: string = 'Hủy'
  ) {
    this.show(title, message, [
      { text: `${cancelText} ❌`, style: 'secondary', onPress: () => { onCancel?.(); this.hide(); } },
      { text: `${confirmText} ✅`, onPress: () => { onConfirm(); this.hide(); }, style: 'primary' }
    ]);
  }

  copySuccess(item: string, value: string, onContinue?: () => void) {
    this.show(
      `Đã copy ${item}!`,
      `${value} đã được copy vào clipboard.`,
      [
        { text: 'Copy thêm 📋', onPress: () => { onContinue?.(); this.hide(); }, style: 'secondary' },
        { text: 'Xong 👍', style: 'success', onPress: () => this.hide() }
      ]
    );
  }

  paymentOptions(
    amount: string,
    message: string,
    onMoMoGuide: () => void,
    onCopyAll: () => void,
    onWebLink: () => void
  ) {
    this.show(
      'Chọn cách thanh toán MoMo',
      `💰 Số tiền: ${amount}\n💬 Nội dung: ${message}`,
      [
        { text: 'Mở MoMo + Hướng dẫn 🚀', onPress: () => { onMoMoGuide(); this.hide(); }, style: 'primary' },
        { text: 'Copy tất cả thông tin 📋', onPress: () => { onCopyAll(); this.hide(); }, style: 'secondary' },
        { text: 'Mở link MoMo web 🌐', onPress: () => { onWebLink(); this.hide(); }, style: 'secondary' },
        { text: 'Hủy ❌', style: 'danger', onPress: () => this.hide() }
      ]
    );
  }

  paymentGuide(
    adminPhone: string,
    amount: string,
    message: string,
    onOpenCopyMenu: () => void
  ) {
    this.show(
      'Hướng dẫn thanh toán MoMo',
      `📞 Số điện thoại admin đã được copy sẵn!\n\n` +
      `📋 Làm theo 4 bước trong MoMo:\n` +
      `1️⃣ Chọn "Chuyển tiền"\n` +
      `2️⃣ Paste: ${adminPhone}\n` +
      `3️⃣ Nhập số tiền: ${amount}\n` +
      `4️⃣ Nhập nội dung: ${message}`,
      [
        { text: 'Mở menu copy 📋', onPress: () => { onOpenCopyMenu(); this.hide(); }, style: 'primary' },
        { text: 'OK, đã hiểu 👍', style: 'success', onPress: () => this.hide() }
      ]
    );
  }

  copyMenu(
    adminPhone: string,
    amount: string,
    message: string,
    onCopyPhone: () => void,
    onCopyAmount: () => void,
    onCopyMessage: () => void
  ) {
    this.show(
      'Copy thông tin thanh toán',
      `Chọn thông tin cần copy:\n\n📞 SĐT: ${adminPhone}\n💰 Số tiền: ${amount}\n💬 Nội dung: ${message}`,
      [
        { text: 'Copy SĐT 📞', onPress: () => { onCopyPhone(); }, style: 'secondary' },
        { text: 'Copy số tiền 💰', onPress: () => { onCopyAmount(); }, style: 'secondary' },
        { text: 'Copy nội dung 💬', onPress: () => { onCopyMessage(); }, style: 'secondary' },
        { text: 'Đóng ❌', style: 'danger', onPress: () => this.hide() }
      ]
    );
  }
}

// Provider component
export const BeautifulAlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alertState, setAlertState] = useState<AlertState>({
    visible: false,
    title: '',
    message: '',
    buttons: [],
    showCloseButton: true,
  });

  React.useEffect(() => {
    BeautifulAlertManager.getInstance().setStateManager(setAlertState);
  }, []);

  const handleButtonPress = (button: BeautifulAlertButton) => {
    // Nếu button không có custom onPress, tự động đóng modal
    if (button.onPress) {
      button.onPress();
    } else {
      BeautifulAlertManager.getInstance().hide();
    }
  };

  const handleBackdropPress = () => {
    if (alertState.showCloseButton) {
      BeautifulAlertManager.getInstance().hide();
    }
  };

  return (
    <>
      {children}
      <CustomModal
        visible={alertState.visible}
        title={alertState.title}
        message={alertState.message}
        buttons={alertState.buttons.map(button => ({
          ...button,
          onPress: () => handleButtonPress(button),
        }))}
        onBackdropPress={handleBackdropPress}
        showCloseButton={alertState.showCloseButton}
      />
    </>
  );
};

// Export singleton instance
export const BeautifulAlert = BeautifulAlertManager.getInstance();

export default BeautifulAlert;
