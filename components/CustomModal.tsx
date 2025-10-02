import React from 'react';
import {
    Dimensions,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { CustomModalStyles as styles } from '../styles/components/CustomModal.styles';

const { width, height } = Dimensions.get('window');

export interface CustomModalButton {
  text: string;
  onPress?: () => void;
  style?: 'primary' | 'secondary' | 'danger' | 'success';
  icon?: string;
  disabled?: boolean;
}

interface CustomModalProps {
  visible: boolean;
  title: string;
  message?: string;
  buttons?: CustomModalButton[];
  onBackdropPress?: () => void;
  animationType?: 'slide' | 'fade' | 'none';
  showCloseButton?: boolean;
  children?: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  message,
  buttons = [],
  onBackdropPress,
  animationType = 'fade',
  showCloseButton = true,
  children,
}) => {
  const animationProgress = useSharedValue(visible ? 1 : 0);

  React.useEffect(() => {
    if (visible) {
      animationProgress.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
    } else {
      animationProgress.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(animationProgress.value, [0, 1], [0.8, 1]),
        },
      ],
      opacity: animationProgress.value,
    };
  });

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animationProgress.value, [0, 1], [0, 0.5]),
    };
  });

  const getButtonStyle = (style?: string) => {
    switch (style) {
      case 'primary':
        return [styles.button, styles.primaryButton];
      case 'danger':
        return [styles.button, styles.dangerButton];
      case 'success':
        return [styles.button, styles.successButton];
      default:
        return [styles.button, styles.secondaryButton];
    }
  };

  const getButtonTextStyle = (style?: string) => {
    switch (style) {
      case 'primary':
        return [styles.buttonText, styles.primaryButtonText];
      case 'danger':
        return [styles.buttonText, styles.dangerButtonText];
      case 'success':
        return [styles.buttonText, styles.successButtonText];
      default:
        return [styles.buttonText, styles.secondaryButtonText];
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
        </TouchableWithoutFeedback>
        <View style={styles.backdropTouchable}>
            <Animated.View style={[styles.modal, modalAnimatedStyle]}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {showCloseButton && onBackdropPress && (
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onBackdropPress}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Content */}
              <View style={styles.content}>
                {message && <Text style={styles.message}>{message}</Text>}
                {children}
              </View>

              {/* Buttons */}
              {buttons.length > 0 && (
                <View style={styles.buttonContainer}>
                  {buttons.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      style={getButtonStyle(button.style)}
                      onPress={button.onPress}
                      disabled={button.disabled}
                      activeOpacity={0.8}
                    >
                      <Text style={getButtonTextStyle(button.style)}>
                        {button.icon && `${button.icon} `}{button.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </Animated.View>
          </View>
      </View>
    </Modal>
  );
};

// Styles moved to ../styles/components/CustomModal.styles.ts