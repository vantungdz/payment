import { StyleSheet } from "react-native";
import { Colors, Shadows, Spacing, Typography } from "../theme";

export const AdminPopupStyles = StyleSheet.create({
  container: {
    minHeight: 200,
  },

  // Header
  header: {
    marginBottom: Spacing.layout.screenPadding,
    alignItems: "center",
  },

  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },

  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: "center",
  },

  // Content sections
  section: {
    marginBottom: Spacing.layout.screenPadding,
  },

  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },

  // User info
  userInfo: {
    backgroundColor: Colors.background.tertiary,
    padding: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.md,
  },

  userName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },

  userPhone: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
  },

  // Amount display
  amountContainer: {
    backgroundColor: Colors.successLight,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  amountLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginBottom: Spacing.xs,
  },

  amountValue: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.successDark,
  },

  // Bulk payment styles
  bulkContainer: {
    marginBottom: Spacing.lg,
  },

  bulkTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },

  bulkSummary: {
    backgroundColor: Colors.background.tertiary,
    padding: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.md,
  },

  bulkSummaryText: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },

  bulkTotal: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.successDark,
  },

  // User list
  userList: {
    maxHeight: 200,
  },

  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background.primary,
    borderRadius: 8,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  userItemInfo: {
    flex: 1,
  },

  userItemName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
  },

  userItemPhone: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginTop: 2,
  },

  userItemAmount: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.successDark,
  },

  // Description
  description: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.md,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },

  // Buttons
  buttonContainer: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },

  button: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButton: {
    backgroundColor: Colors.background.tertiary,
    borderWidth: 1,
    borderColor: Colors.border.medium,
  },

  cancelButtonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.secondary,
  },

  confirmButton: {
    backgroundColor: Colors.primary,
    ...Shadows.button,
  },

  confirmButtonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.inverse,
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

  // Empty state
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxxl,
  },

  emptyText: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.tertiary,
    textAlign: "center",
  },

  // Payment card styles
  paymentCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border.light,
    ...Shadows.card,
  },

  cardHeader: {
    marginBottom: Spacing.md,
  },

  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },

  infoLabel: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.tertiary,
    flex: 1,
  },

  infoValue: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    flex: 2,
    textAlign: "right",
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border.light,
    marginVertical: Spacing.md,
  },

  amountSection: {
    alignItems: "center",
    paddingVertical: Spacing.md,
  },

  descriptionSection: {
    marginTop: Spacing.md,
  },

  descriptionLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginBottom: Spacing.xs,
  },

  descriptionValue: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    fontStyle: "italic",
  },

  // Summary card styles
  summaryCard: {
    backgroundColor: Colors.background.tertiary,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  summaryHeader: {
    marginBottom: Spacing.md,
  },

  summaryTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.xs,
  },

  summaryLabel: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.tertiary,
  },

  summaryValue: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
  },

  totalAmount: {
    color: Colors.successDark,
    fontWeight: Typography.fontWeight.bold,
  },

  // Participants list
  participantsList: {
    marginBottom: Spacing.lg,
  },

  participantsTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },

  participantsScroll: {
    maxHeight: 150,
  },

  participantCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background.primary,
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  participantInfo: {
    flex: 1,
  },

  participantName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
  },

  participantPhone: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginTop: 2,
  },

  participantAmount: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.successDark,
  },

  // Split money popup styles
  splitContainer: {
    minHeight: 200,
  },

  splitHeader: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  splitTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },

  splitSubtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: "center",
  },

  splitCard: {
    backgroundColor: Colors.background.tertiary,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  splitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },

  splitLabel: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.tertiary,
  },

  splitValue: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
  },

  totalMoney: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.bold,
  },

  perPersonAmount: {
    color: Colors.successDark,
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.lg,
  },

  splitInfo: {
    backgroundColor: Colors.infoLight,
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.lg,
  },

  splitInfoText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.infoDark,
    textAlign: "center",
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
  },
});
