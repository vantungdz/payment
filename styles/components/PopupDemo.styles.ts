import { StyleSheet } from "react-native";
import { Colors, Shadows, Spacing, Typography } from "../theme";

export const PopupDemoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },

  header: {
    padding: Spacing.layout.screenPadding,
    paddingTop: Spacing.component.headerPaddingTop,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    textAlign: "center",
  },

  section: {
    margin: Spacing.layout.sectionMargin,
    padding: Spacing.layout.cardPadding,
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    ...Shadows.card,
  },

  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },

  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: Spacing.md,
    ...Shadows.button,
  },

  buttonText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },

  secondaryButton: {
    backgroundColor: Colors.secondary,
  },

  successButton: {
    backgroundColor: Colors.success,
  },

  warningButton: {
    backgroundColor: Colors.warning,
  },

  errorButton: {
    backgroundColor: Colors.error,
  },

  // Additional styles for PopupDemo
  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: "center",
    marginTop: Spacing.sm,
  },

  description: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
    marginBottom: Spacing.lg,
  },

  demoButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: Spacing.md,
    ...Shadows.button,
  },

  footer: {
    margin: Spacing.layout.sectionMargin,
    padding: Spacing.layout.cardPadding,
    backgroundColor: Colors.successLight,
    borderRadius: 16,
    alignItems: "center",
  },

  footerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.successDark,
    textAlign: "center",
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
});
