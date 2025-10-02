import { StyleSheet } from "react-native";
import { Colors, Shadows, Spacing, Typography } from "./theme";

// Common styles used across multiple components
export const CommonStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },

  containerPrimary: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  // Flex utilities
  flex1: {
    flex: 1,
  },

  flexRow: {
    flexDirection: "row",
  },

  flexColumn: {
    flexDirection: "column",
  },

  flexCenter: {
    justifyContent: "center",
    alignItems: "center",
  },

  flexBetween: {
    justifyContent: "space-between",
    alignItems: "center",
  },

  flexStart: {
    justifyContent: "flex-start",
    alignItems: "center",
  },

  flexEnd: {
    justifyContent: "flex-end",
    alignItems: "center",
  },

  // Text styles
  textCenter: {
    textAlign: "center",
  },

  textLeft: {
    textAlign: "left",
  },

  textRight: {
    textAlign: "right",
  },

  // Heading styles
  heading1: {
    ...Typography.heading.h1,
    color: Colors.text.primary,
  },

  heading2: {
    ...Typography.heading.h2,
    color: Colors.text.primary,
  },

  heading3: {
    ...Typography.heading.h3,
    color: Colors.text.primary,
  },

  heading4: {
    ...Typography.heading.h4,
    color: Colors.text.primary,
  },

  // Body text styles
  bodyLarge: {
    ...Typography.body.large,
    color: Colors.text.secondary,
  },

  bodyMedium: {
    ...Typography.body.medium,
    color: Colors.text.secondary,
  },

  bodySmall: {
    ...Typography.body.small,
    color: Colors.text.tertiary,
  },

  // Button styles
  button: {
    paddingHorizontal: Spacing.layout.buttonPadding,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.button,
  },

  buttonPrimary: {
    backgroundColor: Colors.primary,
  },

  buttonSecondary: {
    backgroundColor: Colors.background.primary,
    borderWidth: 1,
    borderColor: Colors.border.medium,
  },

  buttonSuccess: {
    backgroundColor: Colors.success,
  },

  buttonError: {
    backgroundColor: Colors.error,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  // Button text styles
  buttonTextPrimary: {
    ...Typography.button.medium,
    color: Colors.text.inverse,
  },

  buttonTextSecondary: {
    ...Typography.button.medium,
    color: Colors.text.secondary,
  },

  // Input styles
  input: {
    paddingHorizontal: Spacing.layout.inputPadding,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    fontSize: Typography.fontSize.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
    backgroundColor: Colors.background.primary,
  },

  inputFocused: {
    borderColor: Colors.primary,
  },

  inputError: {
    borderColor: Colors.error,
  },

  // Label styles
  label: {
    ...Typography.label,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },

  // Card styles
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    padding: Spacing.layout.cardPadding,
    ...Shadows.card,
  },

  cardHeader: {
    marginBottom: Spacing.lg,
  },

  // Section styles
  section: {
    margin: Spacing.layout.sectionMargin,
    padding: Spacing.layout.cardPadding,
    borderRadius: 16,
    backgroundColor: Colors.background.primary,
    ...Shadows.card,
  },

  sectionTitle: {
    ...Typography.heading.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },

  // Header styles
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.layout.headerPadding,
    paddingTop: Spacing.component.headerPaddingTop,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  // Modal styles
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.overlay,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    backgroundColor: Colors.background.primary,
    borderRadius: 20,
    marginHorizontal: Spacing.layout.screenPadding,
    maxHeight: "80%",
    ...Shadows.modal,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  // Spacing utilities
  marginXs: { margin: Spacing.xs },
  marginSm: { margin: Spacing.sm },
  marginMd: { margin: Spacing.md },
  marginLg: { margin: Spacing.lg },
  marginXl: { margin: Spacing.xl },

  paddingXs: { padding: Spacing.xs },
  paddingSm: { padding: Spacing.sm },
  paddingMd: { padding: Spacing.md },
  paddingLg: { padding: Spacing.lg },
  paddingXl: { padding: Spacing.xl },

  // Border radius utilities
  rounded: { borderRadius: 8 },
  roundedMd: { borderRadius: 12 },
  roundedLg: { borderRadius: 16 },
  roundedXl: { borderRadius: 20 },
  roundedFull: { borderRadius: 9999 },
});
