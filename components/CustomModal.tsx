import React from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

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
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, animation]);

  const modalTransform = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
    opacity: animation,
  };

  const backdropOpacity = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5],
    }),
  };

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
        <Animated.View style={[styles.backdrop, backdropOpacity]} />
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View style={styles.backdropTouchable}>
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.modal, modalTransform]}>
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
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  backdropTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
    maxWidth: width - 40,
    minWidth: width * 0.8,
    maxHeight: height * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  button: {
    flex: 1,
    minWidth: 120,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  secondaryButtonText: {
    color: '#495057',
  },
  dangerButton: {
    backgroundColor: '#dc3545',
  },
  dangerButtonText: {
    color: '#fff',
  },
  successButton: {
    backgroundColor: '#28a745',
  },
  successButtonText: {
    color: '#fff',
  },
});

export default CustomModal;
