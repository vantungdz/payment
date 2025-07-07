import {
    Alert,
    AlertButton,
} from 'react-native';

export interface CustomAlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
  icon?: string;
}

export class CustomAlert {
  static show(
    title: string,
    message: string,
    buttons: CustomAlertButton[] = [],
    options?: { cancelable?: boolean }
  ) {
    // Thêm emoji và format title
    const formattedTitle = this.formatTitle(title);
    const formattedMessage = this.formatMessage(message);
    
    // Convert custom buttons to Alert buttons
    const alertButtons: AlertButton[] = buttons.map(button => ({
      text: button.icon ? `${button.icon} ${button.text}` : button.text,
      onPress: button.onPress,
      style: button.style || 'default'
    }));

    Alert.alert(
      formattedTitle,
      formattedMessage,
      alertButtons,
      options
    );
  }

  private static formatTitle(title: string): string {
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

  private static formatMessage(message: string): string {
    // Không format message nếu chứa thông tin tiền tệ
    if (message.includes('VND') || message.includes('₫') || message.includes('Số tiền:')) {
      return message;
    }
    
    // Format message với line breaks và emoji
    return message
      .replace(/\n\n/g, '\n\n') // Giữ nguyên double line breaks
      .replace(/(\d+\.)(?=\s)/g, '\n$1') // Chỉ thêm line break trước numbered lists (có space sau)
      .replace(/^(\d+\.)/, '$1') // Remove line break ở đầu nếu có
      .trim();
  }

  // Các method helper cho các loại alert phổ biến
  static success(title: string, message: string, onOk?: () => void) {
    this.show(title, message, [
      { text: 'Tuyệt vời!', onPress: onOk, icon: '👍' }
    ]);
  }

  static error(title: string, message: string, onOk?: () => void) {
    this.show(title, message, [
      { text: 'Đã hiểu', onPress: onOk, icon: '😞' }
    ]);
  }

  static confirm(
    title: string, 
    message: string, 
    onConfirm: () => void, 
    onCancel?: () => void,
    confirmText: string = 'Xác nhận',
    cancelText: string = 'Hủy'
  ) {
    this.show(title, message, [
      { text: cancelText, style: 'cancel', onPress: onCancel, icon: '❌' },
      { text: confirmText, onPress: onConfirm, icon: '✅' }
    ]);
  }

  static copySuccess(item: string, value: string, onContinue?: () => void) {
    this.show(
      `Đã copy ${item}!`,
      `${value} đã được copy vào clipboard.`,
      [
        { text: 'Copy thêm', onPress: onContinue, icon: '📋' },
        { text: 'Xong', style: 'cancel', icon: '👍' }
      ]
    );
  }

  static paymentOptions(
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
        { text: 'Mở MoMo + Hướng dẫn', onPress: onMoMoGuide, icon: '🚀' },
        { text: 'Copy tất cả thông tin', onPress: onCopyAll, icon: '📋' },
        { text: 'Mở link MoMo web', onPress: onWebLink, icon: '🌐' },
        { text: 'Hủy', style: 'cancel', icon: '❌' }
      ]
    );
  }

  static paymentGuide(
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
        { text: 'Mở menu copy', onPress: onOpenCopyMenu, icon: '📋' },
        { text: 'OK, đã hiểu', icon: '👍' }
      ]
    );
  }

  static copyMenu(
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
        { text: 'Copy SĐT', onPress: onCopyPhone, icon: '📞' },
        { text: 'Copy số tiền', onPress: onCopyAmount, icon: '💰' },
        { text: 'Copy nội dung', onPress: onCopyMessage, icon: '💬' },
        { text: 'Đóng', style: 'cancel', icon: '❌' }
      ]
    );
  }
}

export default CustomAlert;
