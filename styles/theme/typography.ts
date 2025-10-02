// Typography system for consistent text styling
export const Typography = {
  // Font sizes
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
  },

  // Font weights
  fontWeight: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Text styles
  heading: {
    h1: {
      fontSize: 32,
      fontWeight: "700" as const,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 24,
      fontWeight: "700" as const,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 20,
      fontWeight: "600" as const,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: 18,
      fontWeight: "600" as const,
      lineHeight: 1.4,
    },
  },

  // Body text styles
  body: {
    large: {
      fontSize: 18,
      fontWeight: "400" as const,
      lineHeight: 1.6,
    },
    medium: {
      fontSize: 16,
      fontWeight: "400" as const,
      lineHeight: 1.5,
    },
    small: {
      fontSize: 14,
      fontWeight: "400" as const,
      lineHeight: 1.4,
    },
  },

  // Button text styles
  button: {
    large: {
      fontSize: 18,
      fontWeight: "600" as const,
    },
    medium: {
      fontSize: 16,
      fontWeight: "600" as const,
    },
    small: {
      fontSize: 14,
      fontWeight: "500" as const,
    },
  },

  // Caption and helper text
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 1.3,
  },

  // Label text
  label: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
} as const;

export type TypographyKey = keyof typeof Typography;
