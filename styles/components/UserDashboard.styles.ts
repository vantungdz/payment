import { StyleSheet } from "react-native";
import { Colors, Shadows, Spacing, Typography } from "../theme";

export const UserDashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },

  // Header styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.layout.headerPadding,
    paddingTop: Spacing.component.headerPaddingTop,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  userInfo: {
    flex: 1,
  },

  welcomeText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },

  roleText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginTop: 2,
  },

  logoutButton: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },

  logoutButtonText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
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

  // Participant info
  participantInfo: {
    backgroundColor: Colors.background.tertiary,
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.md,
  },

  participantLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginBottom: Spacing.xs,
  },

  participantDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  participantName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
  },

  participantAmount: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.successDark,
  },

  participantStatus: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginTop: Spacing.xs,
  },

  statusPaid: {
    color: Colors.successDark,
  },

  statusPending: {
    color: Colors.warningDark,
  },

  // Payment button
  paymentButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    alignItems: "center",
    marginTop: Spacing.md,
    ...Shadows.button,
  },

  paymentButtonDisabled: {
    backgroundColor: Colors.gray[400],
    opacity: 0.6,
  },

  paymentButtonText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },

  // Date display
  paymentDate: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.muted,
    textAlign: "right",
    marginTop: Spacing.sm,
  },

  // Empty state
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

  // Loading state
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxxl,
  },

  loadingText: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.tertiary,
    marginTop: Spacing.md,
  },

  // Additional styles for UserDashboard_New
  logoutText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },

  summary: {
    margin: Spacing.layout.sectionMargin,
  },

  summaryCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: Spacing.xl,
    alignItems: "center",
    ...Shadows.card,
  },

  summaryTitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.inverse,
    marginBottom: Spacing.sm,
  },

  summaryAmount: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.inverse,
    marginBottom: Spacing.xs,
  },

  summaryCount: {
    fontSize: Typography.fontSize.sm,
    color: "rgba(255,255,255,0.8)",
  },

  // Payment card styles
  paymentCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
    ...Shadows.sm,
  },

  paidCard: {
    backgroundColor: Colors.background.tertiary,
    borderColor: Colors.successLight,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },

  cardInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },

  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },

  cardFrom: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginBottom: Spacing.xs,
  },

  cardDate: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.muted,
  },

  cardAmount: {
    alignItems: "flex-end",
  },

  amountText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.error,
  },

  paidAmount: {
    color: Colors.successDark,
  },

  // Payment button
  payButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    alignItems: "center",
    ...Shadows.button,
  },

  payButtonText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },

  // Paid status
  paidStatus: {
    backgroundColor: Colors.successLight,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
    alignItems: "center",
  },

  paidStatusText: {
    color: Colors.successDark,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },

  // Empty state
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },

  // Quick actions
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  quickAction: {
    alignItems: "center",
    padding: Spacing.md,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: Spacing.xs,
  },

  quickActionIcon: {
    fontSize: Typography.fontSize.xl,
    marginBottom: Spacing.sm,
  },

  quickActionText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    textAlign: "center",
  },
});
