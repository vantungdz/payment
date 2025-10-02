import { Dimensions, StyleSheet } from "react-native";
import { Colors, Shadows, Spacing, Typography } from "../theme";

const { width } = Dimensions.get("window");

export const LoginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: Spacing.layout.screenPadding,
  },

  // Header styles
  header: {
    alignItems: "center",
    marginBottom: Spacing.xxxl + Spacing.sm,
  },

  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.layout.screenPadding,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },

  logoEmoji: {
    fontSize: 40,
  },

  title: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.inverse,
    marginBottom: Spacing.sm,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  subtitle: {
    fontSize: Typography.fontSize.md,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },

  // Form styles
  form: {
    width: "100%",
    maxWidth: Spacing.component.formMaxWidth,
    alignSelf: "center",
  },

  inputContainer: {
    marginBottom: Spacing.layout.screenPadding,
  },

  label: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.inverse,
    marginBottom: Spacing.sm,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: Spacing.layout.inputPadding,
    fontSize: Typography.fontSize.md,
    color: Colors.text.inverse,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  // Button styles
  loginButton: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    padding: Spacing.layout.buttonPadding,
    alignItems: "center",
    marginTop: Spacing.md,
    ...Shadows.button,
  },

  loginButtonDisabled: {
    opacity: 0.7,
  },

  loginButtonText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },

  // Role selection styles
  roleContainer: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },

  roleButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
  },

  roleButtonActive: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderColor: "rgba(255,255,255,0.6)",
  },

  roleButtonText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },

  roleButtonTextActive: {
    color: Colors.text.inverse,
    fontWeight: Typography.fontWeight.bold,
  },

  // Switch mode button
  switchModeButton: {
    marginTop: Spacing.layout.screenPadding,
    alignItems: "center",
    padding: Spacing.md,
  },

  switchModeText: {
    fontSize: Typography.fontSize.sm,
    color: "rgba(255,255,255,0.8)",
    textDecorationLine: "underline",
  },

  // Features section
  features: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Spacing.xxxl + Spacing.sm,
    paddingTop: Spacing.xxxl - Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },

  feature: {
    alignItems: "center",
    flex: 1,
  },

  featureIcon: {
    fontSize: Typography.fontSize.xl,
    marginBottom: Spacing.sm,
  },

  featureText: {
    fontSize: Typography.fontSize.xs,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },
});
