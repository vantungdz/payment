import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const animationSequence = Animated.sequence([
      // Logo fade in and scale up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // Text slide up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      // Wait a bit
      Animated.delay(1200),
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start(() => {
      onFinish();
    });
  }, []);

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: 'center',
        }}
      >
        {/* Logo Icon */}
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: 'rgba(255,255,255,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
            borderWidth: 3,
            borderColor: 'rgba(255,255,255,0.3)',
          }}
        >
          <Text style={{ fontSize: 50, color: 'white' }}>💰</Text>
        </View>

        {/* App Name */}
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: 10,
              textShadowColor: 'rgba(0,0,0,0.3)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 4,
            }}
          >
            PaySplit
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              fontWeight: '300',
            }}
          >
            Chia tiền dễ dàng, thanh toán nhanh chóng
          </Text>
        </Animated.View>
      </Animated.View>

      {/* Loading indicator */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 100,
          opacity: fadeAnim,
        }}
      >
        <Text
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 14,
          }}
        >
          Đang khởi tạo...
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}
