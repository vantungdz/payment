// Spacing system for consistent margins and paddings
export const Spacing = {
  // Base spacing unit (4px)
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,

  // Specific spacing values
  none: 0,
  tiny: 2,
  small: 6,
  medium: 10,
  large: 14,
  huge: 18,
  massive: 28,

  // Layout spacing
  layout: {
    screenPadding: 20,
    sectionMargin: 16,
    cardPadding: 20,
    buttonPadding: 16,
    inputPadding: 16,
  },

  // Component specific spacing
  component: {
    headerPaddingTop: 50,
    headerPadding: 20,
    formMaxWidth: 400,
    buttonHeight: 48,
    inputHeight: 52,
    iconSize: 24,
    avatarSize: 40,
  },
} as const;

export type SpacingKey = keyof typeof Spacing;
