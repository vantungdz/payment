import { Dimensions, StyleSheet } from "react-native";
import { Colors, Shadows, Spacing, Typography } from "../theme";

const { width, height } = Dimensions.get("window");

export const CustomModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.overlay,
  },

  backdropTouchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  modal: {
    backgroundColor: Colors.background.primary,
    borderRadius: 20,
    marginHorizontal: Spacing.layout.screenPadding,
    maxWidth: width - 40,
    minWidth: width * 0.8,
    maxHeight: height * 0.8, // Quay lại maxHeight
    overflow: "hidden",
    ...Shadows.modal,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  // Header styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    flex: 1,
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background.tertiary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: Spacing.md,
  },

  closeButtonText: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.tertiary,
    fontWeight: Typography.fontWeight.semibold,
  },

  // Content styles
  content: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.layout.screenPadding,
  },

  message: {
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.md,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
    fontWeight: Typography.fontWeight.medium,
  },

  // Button container styles
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },

  // Button styles
  button: {
    flex: 1,
    minWidth: 120,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.layout.screenPadding,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: "center",
  },

  // Primary button
  primaryButton: {
    backgroundColor: Colors.primary,
  },

  primaryButtonText: {
    color: Colors.text.inverse,
  },

  // Secondary button
  secondaryButton: {
    backgroundColor: Colors.background.tertiary,
    borderWidth: 1,
    borderColor: Colors.border.medium,
  },

  secondaryButtonText: {
    color: Colors.text.secondary,
  },

  // Danger button
  dangerButton: {
    backgroundColor: Colors.error,
    ...Shadows.sm,
  },

  dangerButtonText: {
    color: Colors.text.inverse,
    fontWeight: Typography.fontWeight.bold,
  },

  // Success button
  successButton: {
    backgroundColor: Colors.success,
  },

  successButtonText: {
    color: Colors.text.inverse,
  },
});
