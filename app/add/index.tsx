import { View, StyleSheet } from "react-native";
import AddMedicationForm from "@/components/AddMedicationForm";


/* AddMedicationPage
    - Page wrapper for the AddMedicationForm component */
export default function AddMedicationPage() {
  return (
    <View style={styles.container}>
      <AddMedicationForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#317f9bff",
    padding: 16,
  },
});