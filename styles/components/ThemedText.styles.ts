import { StyleSheet } from "react-native";
import { Typography } from "../theme";

export const ThemedTextStyles = StyleSheet.create({
  default: {
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.md,
  },

  defaultSemiBold: {
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },

  title: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    lineHeight: Typography.lineHeight.tight * Typography.fontSize.xxxl,
  },

  subtitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },

  link: {
    lineHeight: Typography.lineHeight.loose * Typography.fontSize.md,
    fontSize: Typography.fontSize.md,
  },
});
