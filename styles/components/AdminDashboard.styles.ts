import { Dimensions, StyleSheet } from "react-native";
import { Colors, Shadows, Spacing, Typography } from "../theme";

const { width } = Dimensions.get("window");

export const AdminDashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
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

  userInfoExpanded: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },

  welcomeText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.secondary,
    flexShrink: 1,
    textAlign: "center",
  },

  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  roleText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    textAlign: "center",
    marginRight: 4,
  },

  arrowIcon: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.tertiary,
  },

  // User menu dropdown styles
  userMenuDropdown: {
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    ...Shadows.dropdown,
  },

  userMenuContent: {
    padding: Spacing.layout.cardPadding,
    paddingTop: Spacing.md,
  },

  fullUsernameText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },

  userDetailsText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginBottom: Spacing.sm,
  },

  userRoleText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.success,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.lg,
  },

  menuDivider: {
    height: 1,
    backgroundColor: Colors.border.light,
    marginBottom: Spacing.lg,
  },

  dropdownLogoutButton: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  dropdownLogoutText: {
    color: Colors.text.inverse,
    fontWeight: Typography.fontWeight.semibold,
    fontSize: Typography.fontSize.md,
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
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },

  // Form styles
  inputGroup: {
    marginBottom: Spacing.xl,
  },

  label: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },

  input: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    padding: Spacing.layout.inputPadding,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  // Include self section styles
  includeSelfSection: {
    marginTop: Spacing.sm,
  },

  includeSelfContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.border.medium,
    marginRight: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  checkmark: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },

  includeSelfLabel: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    flex: 1,
  },

  includeSelfHint: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    fontStyle: "italic",
  },

  // Button styles
  autoSplitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    alignItems: "center",
    ...Shadows.button,
  },

  autoSplitText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },

  sendAllButton: {
    backgroundColor: Colors.success,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    alignItems: "center",
    marginTop: Spacing.lg,
    ...Shadows.button,
  },

  sendAllButtonText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },

  // User selection styles
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  userItemSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.background.tertiary,
  },

  userInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },

  userName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },

  userPhone: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginTop: 2,
  },

  amountInput: {
    width: 120,
    backgroundColor: Colors.background.primary,
    borderRadius: 8,
    padding: Spacing.sm,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.border.light,
    textAlign: "right",
  },

  // Payment request styles
  paymentRequestItem: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
    ...Shadows.sm,
  },

  paymentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },

  paymentDescription: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    flex: 1,
    marginRight: Spacing.md,
  },

  paymentStatus: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: "hidden",
  },

  statusCompleted: {
    backgroundColor: Colors.successLight,
    color: Colors.successDark,
  },

  statusSent: {
    backgroundColor: Colors.infoLight,
    color: Colors.infoDark,
  },

  statusDraft: {
    backgroundColor: Colors.warningLight,
    color: Colors.warningDark,
  },

  paymentAmount: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.successDark,
    marginBottom: Spacing.sm,
  },

  participantsList: {
    marginBottom: Spacing.md,
  },

  participantItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.xs,
  },

  participantName: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    flex: 1,
  },

  participantAmount: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    marginRight: Spacing.sm,
  },

  participantStatus: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
  },

  statusPaid: {
    color: Colors.successDark,
  },

  statusPending: {
    color: Colors.warningDark,
  },

  paymentDate: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.muted,
    textAlign: "right",
  },

  // Empty state styles
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxxl,
  },

  emptyText: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.tertiary,
    textAlign: "center",
  },
});
