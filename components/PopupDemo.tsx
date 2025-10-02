import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { PopupDemoStyles as styles } from '../styles/components/PopupDemo.styles';
import { AdminPopup, SplitMoneyPopup } from './AdminPopup';
import { BeautifulAlert } from './BeautifulAlert';
import PaymentPopup from './PaymentPopup';

export default function PopupDemo() {
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [showSplitPopup, setShowSplitPopup] = useState(false);
  const [adminAction, setAdminAction] = useState<any>(null);

  const demoPaymentInfo = {
    adminPhone: '0123456789',
    amount: '2.000.000 ₫',
    message: 'Tiền phòng tháng 12 - Demo User',
    adminName: 'Admin Demo',
  };

  const handleBeautifulAlerts = () => {
    BeautifulAlert.success('Thành công! 🎉', 'Popup đẹp đã được kích hoạt!');
    
    setTimeout(() => {
      BeautifulAlert.show('Thông báo 📢', 'Đây là popup thông báo với icon tự động!', [
        { text: 'Tuyệt vời! 👍', style: 'primary' }
      ]);
    }, 2000);

    setTimeout(() => {
      BeautifulAlert.error('Lỗi ❌', 'Đây là popup lỗi với animation đẹp!');
    }, 4000);

    setTimeout(() => {
      BeautifulAlert.confirm(
        'Xác nhận 🤔',
        'Bạn có muốn tiếp tục không?',
        () => BeautifulAlert.success('Đồng ý! ✅', 'Bạn đã chọn Đồng ý!'),
        () => BeautifulAlert.show('Hủy bỏ 🚫', 'Bạn đã chọn Hủy bỏ!', [
          { text: 'OK 👌', style: 'secondary' }
        ])
      );
    }, 6000);
  };

  const handlePaymentPopup = () => {
    setShowPaymentPopup(true);
  };

  const handleAdminSinglePopup = () => {
    setAdminAction({
      type: 'single',
      title: 'Gửi yêu cầu thanh toán',
      description: 'Tiền phòng tháng 12 - Demo',
      amount: 2000000,
      user: {
        fullName: 'Nguyễn Văn A',
        phone: '0123456789',
        email: 'nguyenvana@demo.com'
      },
      onConfirm: () => {
        BeautifulAlert.success('Thành công! 🎉', 'Đã gửi yêu cầu thanh toán cho Nguyễn Văn A!');
      }
    });
    setShowAdminPopup(true);
  };

  const handleAdminBulkPopup = () => {
    setAdminAction({
      type: 'bulk',
      title: 'Gửi tất cả yêu cầu',
      description: 'Tiền phòng tháng 12 - Demo Bulk',
      users: [
        {
          user: { fullName: 'Nguyễn Văn A', phone: '0123456789' },
          amount: 2000000
        },
        {
          user: { fullName: 'Trần Thị B', phone: '0987654321' },
          amount: 2000000
        },
        {
          user: { fullName: 'Lê Văn C', phone: '0555666777' },
          amount: 2000000
        }
      ],
      onConfirm: () => {
        BeautifulAlert.success('Thành công! 🎉', 'Đã gửi 3 yêu cầu thanh toán!');
      }
    });
    setShowAdminPopup(true);
  };

  const handleSplitPopup = () => {
    setShowSplitPopup(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎨 Demo Popup Đẹp Mới</Text>
        <Text style={styles.subtitle}>Trải nghiệm giao diện popup đã được nâng cấp</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Beautiful Alerts</Text>
        <Text style={styles.description}>
          Thay thế Alert.alert native với popup đẹp, animation mượt
        </Text>
        <TouchableOpacity style={styles.demoButton} onPress={handleBeautifulAlerts}>
          <Text style={styles.buttonText}>✨ Xem Demo Beautiful Alerts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💳 Payment Popup (User)</Text>
        <Text style={styles.description}>
          Popup thanh toán đa bước cho user: chọn phương thức → hướng dẫn → copy thông tin
        </Text>
        <TouchableOpacity style={styles.demoButton} onPress={handlePaymentPopup}>
          <Text style={styles.buttonText}>💰 Demo Payment Flow</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👨‍💼 Admin Single Request</Text>
        <Text style={styles.description}>
          Popup xác nhận gửi yêu cầu thanh toán cho 1 người
        </Text>
        <TouchableOpacity style={styles.demoButton} onPress={handleAdminSinglePopup}>
          <Text style={styles.buttonText}>📤 Demo Single Request</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Admin Bulk Requests</Text>
        <Text style={styles.description}>
          Popup xác nhận gửi nhiều yêu cầu thanh toán cùng lúc
        </Text>
        <TouchableOpacity style={styles.demoButton} onPress={handleAdminBulkPopup}>
          <Text style={styles.buttonText}>📋 Demo Bulk Requests</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Split Money Popup</Text>
        <Text style={styles.description}>
          Popup xác nhận chia tiền đều cho nhiều người
        </Text>
        <TouchableOpacity style={styles.demoButton} onPress={handleSplitPopup}>
          <Text style={styles.buttonText}>💸 Demo Split Money</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🎉 Tất cả popup đã được nâng cấp với giao diện đẹp, animation mượt, và UX tốt hơn!
        </Text>
      </View>

      {/* Popups */}
      <PaymentPopup
        visible={showPaymentPopup}
        paymentInfo={demoPaymentInfo}
        onClose={() => setShowPaymentPopup(false)}
      />

      <AdminPopup
        visible={showAdminPopup}
        action={adminAction}
        onClose={() => {
          setShowAdminPopup(false);
          setAdminAction(null);
        }}
      />

      <SplitMoneyPopup
        visible={showSplitPopup}
        totalAmount={6000000}
        selectedUsers={3}
        includeSelf={false}
        perPerson={2000000}
        onConfirm={() => {
          setShowSplitPopup(false);
          BeautifulAlert.success('Thành công! 🎉', 'Đã chia 6.000.000đ cho 3 người, mỗi người 2.000.000đ');
        }}
        onClose={() => setShowSplitPopup(false)}
      />
    </ScrollView>
  );
}

// Styles moved to ../styles/components/PopupDemo.styles.ts