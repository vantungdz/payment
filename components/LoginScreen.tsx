import { BeautifulAlert } from '@/components/BeautifulAlert';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { LoginScreenStyles as styles } from '../styles/components/LoginScreen.styles';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  
  // Reanimated shared values
  const fadeValue = useSharedValue(0);
  const slideValue = useSharedValue(50);
  const buttonScale = useSharedValue(1);

  // Initial animation
  useEffect(() => {
    fadeValue.value = withTiming(1, { duration: 1000 });
    slideValue.value = withSpring(0, {
      damping: 15,
      stiffness: 100,
    });
  }, []);

  // Animated styles
  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeValue.value,
      transform: [{ translateY: slideValue.value }],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  // Button press animation
  const animateButtonPress = () => {
    buttonScale.value = withTiming(0.95, { duration: 100 }, () => {
      buttonScale.value = withTiming(1, { duration: 100 });
    });
  };

  const handleLogin = async () => {
    if (!username || !password) {
      BeautifulAlert.error('Lỗi', 'Vui lòng nhập tài khoản và mật khẩu');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      setIsLoading(false);

      if (!success) {
        BeautifulAlert.error('Đăng nhập thất bại', 'Tài khoản hoặc mật khẩu không đúng');
      }
    } catch (error) {
      setIsLoading(false);
      BeautifulAlert.error('Lỗi kết nối', 'Không thể kết nối đến server. Vui lòng thử lại.');
    }
  };

  const handleRegister = async () => {
    if (!username || !password || !email || !phone || !fullName) {
      BeautifulAlert.error('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    setIsLoading(true);
    const success = await register({
      username,
      password,
      email,
      phone,
      fullName,
      role,
    });
    setIsLoading(false);

    if (!success) {
      BeautifulAlert.error('Đăng ký thất bại', 'Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const handleSubmit = () => {
    if (isLoginMode) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    // Clear form when switching modes
    setUsername('');
    setPassword('');
    setEmail('');
    setPhone('');
    setFullName('');
    setRole('user');
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo and Title */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoEmoji}>💰</Text>
            </View>
            <Text style={styles.title}>PaySplit</Text>
            <Text style={styles.subtitle}>
              {isLoginMode ? 'Đăng nhập để tiếp tục' : 'Tạo tài khoản mới'}
            </Text>
          </View>

          {/* Login/Register Form */}
          <Animated.View style={[styles.form, formAnimatedStyle]}>
            {!isLoginMode && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Họ và tên</Text>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Nhập họ và tên"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tài khoản</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Nhập tài khoản"
                placeholderTextColor="rgba(255,255,255,0.7)"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {!isLoginMode && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Nhập email"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
            )}

            {!isLoginMode && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Nhập số điện thoại"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  keyboardType="phone-pad"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mật khẩu</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Nhập mật khẩu"
                placeholderTextColor="rgba(255,255,255,0.7)"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {!isLoginMode && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Vai trò</Text>
                <View style={styles.roleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      role === 'user' && styles.roleButtonActive,
                    ]}
                    onPress={() => setRole('user')}
                  >
                    <Text
                      style={[
                        styles.roleButtonText,
                        role === 'user' && styles.roleButtonTextActive,
                      ]}
                    >
                      Người dùng
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      role === 'admin' && styles.roleButtonActive,
                    ]}
                    onPress={() => setRole('admin')}
                  >
                    <Text
                      style={[
                        styles.roleButtonText,
                        role === 'admin' && styles.roleButtonTextActive,
                      ]}
                    >
                      Quản trị viên
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <Animated.View style={buttonAnimatedStyle}>
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={() => {
                  animateButtonPress();
                  setTimeout(handleSubmit, 100);
                }}
                disabled={isLoading}
                activeOpacity={0.8}
              >
              <Text style={styles.loginButtonText}>
                {isLoading 
                  ? (isLoginMode ? '🔄 Đang đăng nhập...' : '🔄 Đang đăng ký...') 
                  : (isLoginMode ? 'Đăng nhập' : 'Đăng ký')
                }
              </Text>
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity style={styles.switchModeButton} onPress={toggleMode}>
              <Text style={styles.switchModeText}>
                {isLoginMode 
                  ? 'Chưa có tài khoản? Đăng ký ngay' 
                  : 'Đã có tài khoản? Đăng nhập ngay'
                }
              </Text>
            </TouchableOpacity>

          </Animated.View>

          {/* Features */}
          <View style={styles.features}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>👥</Text>
              <Text style={styles.featureText}>Chia tiền nhóm</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>💳</Text>
              <Text style={styles.featureText}>Thanh toán MoMo</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>📱</Text>
              <Text style={styles.featureText}>Dễ sử dụng</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

// Styles moved to ../styles/components/LoginScreen.styles.ts