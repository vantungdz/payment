// Color palette for the PaySplit app
export const Colors = {
  // Primary colors
  primary: "#667eea",
  primaryDark: "#5a67d8",
  primaryLight: "#7c3aed",

  // Secondary colors
  secondary: "#764ba2",
  accent: "#f093fb",

  // Neutral colors
  white: "#ffffff",
  black: "#000000",
  gray: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },

  // Semantic colors
  success: "#10b981",
  successLight: "#d1fae5",
  successDark: "#059669",

  error: "#ef4444",
  errorLight: "#fecaca",
  errorDark: "#dc2626",

  warning: "#f59e0b",
  warningLight: "#fef3c7",
  warningDark: "#d97706",

  info: "#3b82f6",
  infoLight: "#dbeafe",
  infoDark: "#2563eb",

  // Background colors
  background: {
    primary: "#ffffff",
    secondary: "#f8fafc",
    tertiary: "#f1f5f9",
  },

  // Text colors
  text: {
    primary: "#1a1a1a",
    secondary: "#374151",
    tertiary: "#64748b",
    inverse: "#ffffff",
    muted: "#9ca3af",
  },

  // Border colors
  border: {
    light: "#e2e8f0",
    medium: "#cbd5e1",
    dark: "#94a3b8",
  },

  // Overlay colors
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.3)",

  // Transparent colors
  transparent: "transparent",

  // Gradient colors
  gradient: {
    primary: ["#667eea", "#764ba2"],
    success: ["#10b981", "#059669"],
    error: ["#ef4444", "#dc2626"],
    warning: ["#f59e0b", "#d97706"],
  },
} as const;

export type ColorKey = keyof typeof Colors;
