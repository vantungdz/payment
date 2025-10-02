import { StyleSheet } from "react-native";
import { Spacing } from "../theme";

export const CollapsibleStyles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },

  content: {
    marginTop: Spacing.sm,
    marginLeft: Spacing.xl,
  },
});
