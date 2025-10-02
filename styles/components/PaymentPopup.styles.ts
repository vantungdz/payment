import { StyleSheet } from "react-native";
import { Colors, Shadows, Spacing, Typography } from "../theme";

export const PaymentPopupStyles = StyleSheet.create({
  // Container styles
  container: {
    maxHeight: 600, // Giữ maxHeight để scroll hoạt động
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md, // Giảm padding cuối
  },

  // Header styles
  header: {
    alignItems: "center",
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
    ...Shadows.card,
  },

  headerIconText: {
    fontSize: 28,
  },

  headerTitle: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },

  headerSubtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Amount card styles
  amountCard: {
    backgroundColor: Colors.successLight,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    alignItems: "center",
    ...Shadows.card,
  },

  amountLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.successDark,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.sm,
  },

  amountContainer: {
    alignItems: "center",
  },

  amountValue: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.successDark,
    marginBottom: Spacing.sm,
  },

  copyBadge: {
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
  },

  copyBadgeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.successDark,
    fontWeight: Typography.fontWeight.medium,
  },

  // Details card styles
  detailsCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  detailRowLast: {
    borderBottomWidth: 0,
  },

  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.tertiary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },

  detailIconText: {
    fontSize: Typography.fontSize.lg,
  },

  detailContent: {
    flex: 1,
  },

  detailLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.xs,
  },

  detailValue: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    fontWeight: Typography.fontWeight.semibold,
  },

  detailValueCopyable: {
    fontSize: Typography.fontSize.md,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
    textDecorationLine: "underline",
  },

  copyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Spacing.sm,
  },

  copyIconText: {
    fontSize: Typography.fontSize.md,
  },

  // Tip card styles
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.infoLight,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },

  tipIcon: {
    fontSize: Typography.fontSize.lg,
    marginRight: Spacing.md,
  },

  tipText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.infoDark,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },

  // Action buttons - In scroll
  actionButtons: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: 0, // Không padding dưới
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },

  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    ...Shadows.button,
  },

  secondaryButton: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    ...Shadows.sm,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  buttonIcon: {
    fontSize: Typography.fontSize.lg,
    marginRight: Spacing.sm,
  },

  buttonTextContainer: {
    flex: 1,
  },

  primaryButtonTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.inverse,
    marginBottom: Spacing.xs,
  },

  primaryButtonSubtitle: {
    fontSize: Typography.fontSize.xs,
    color: "rgba(255,255,255,0.8)",
    fontWeight: Typography.fontWeight.medium,
  },

  secondaryButtonTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },

  secondaryButtonSubtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Toast notification
  toast: {
    position: "absolute",
    top: Spacing.lg,
    left: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: Colors.successDark,
    borderRadius: 12,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1000,
    ...Shadows.card,
  },

  toastIcon: {
    fontSize: Typography.fontSize.lg,
    marginRight: Spacing.sm,
  },

  toastText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.inverse,
  },
});
