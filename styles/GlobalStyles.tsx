import { StyleSheet } from "react-native";
import { Colors } from "./colors";
import { Typography } from "./typography";

export const GlobalStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Titles
  titleXL: {
    ...Typography.titleXL,
    color: Colors.primary,
    textAlign: "center",
  },
  titleLWhite: {
    ...Typography.titleL,
    color: Colors.white,
    textAlign: "center",
    marginBottom: 25,
  },
  titleMWhite: {
    ...Typography.titleM,
    color: Colors.white,
    textAlign: "center",
  },
  titleSWite: {
    ...Typography.textM,
    color: Colors.white,
    textAlign: "center",
    marginBottom: 20,
  },

  // Text
  textPrimary: {
    color: Colors.textPrimary,
    textAlign: "center",
  },
  textWhite: {
    color: Colors.white,
    textAlign: "center",
  },
  textButton: {
    color: Colors.textSecondary,
    fontWeight: "bold",
    fontSize: Typography.textM.fontSize,
    textAlign: "center",
  },

  // Buttons
  button: {
    backgroundColor: Colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 16,
    width: "60%",
  },
  buttonSmall: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.textSecondary,
    fontWeight: "bold",
    fontSize: Typography.textM.fontSize,
    textAlign: "center",
  },
  buttonSpace: {
    marginTop: 20,
  },

  // TextInput
  input: {
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 15,
    padding: 25,
    backgroundColor: Colors.white,
    color: Colors.black,
  },

  // Cards
  medCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 25,
    marginBottom: 12,
    alignSelf: "center",
    width: "60%",
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 25,
    marginBottom: 12,
    alignSelf: "center",
    width: "60%",
  },
  deleteCard: {
    backgroundColor: Colors.danger,
  },
  // Medication List
  medListContainer: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 20, 
  },
  medListTitle: {
    ...Typography.titleM,
    color: Colors.white,
    textAlign: "center",
    marginBottom: 15, // spacing below title
  },
  medListEmptyText: {
    ...Typography.textM,
    color: Colors.white,
    textAlign: "center",
    marginTop: 40,
  },

  // Medication info
  medInfo: {
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
  medName: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
  },
  medDetails: {
    fontSize: 20,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  medReminder: {
    fontSize: 16,
    color: Colors.primary,
    textAlign: "center",
    marginTop: 4,
  },
  medActive: {
    color: Colors.primary,
    fontWeight: "600",
  },

  // Delete buttons
  deleteButton: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  deleteText: {
    fontWeight: "bold",
  },
  swipeDeleteButton: {
    backgroundColor: Colors.danger,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 120,
    marginVertical: 10,
  },

  // Empty state
  emptyText: {
    color: Colors.white,
    textAlign: "center",
    marginTop: 40,
    fontSize: Typography.textS.fontSize,
  },

  // DatePicker
  datePickerContainer: { marginBottom: 15 },
  datePickerLabel: { color: Colors.white, marginBottom: 8, fontSize: 17 },
  datePickerButton: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
  },
  datePickerButtonText: { color: Colors.black, fontSize: 15 },

  // NotFound Page
  notFoundTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 10,
  },
  notFoundButton: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  notFoundButtonPressed: {
    backgroundColor: "#e5e7eb",
  },
  notFoundButtonText: {
    color: Colors.primary,
    fontWeight: "800",
    fontSize: 17,
  },
});
