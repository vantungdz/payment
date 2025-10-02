// Main theme export file
export { Colors } from "./colors";
export { Shadows } from "./shadows";
export { Spacing } from "./spacing";
export { Typography } from "./typography";

// Combined theme object
import { Colors } from "./colors";
import { Shadows } from "./shadows";
import { Spacing } from "./spacing";
import { Typography } from "./typography";

export const Theme = {
  colors: Colors,
  spacing: Spacing,
  typography: Typography,
  shadows: Shadows,
} as const;

export type ThemeType = typeof Theme;
