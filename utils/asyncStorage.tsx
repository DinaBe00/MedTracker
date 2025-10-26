import AsyncStorage from "@react-native-async-storage/async-storage";
import { Medication } from "@/components/AddMedicationForm";
import * as Notifications from "expo-notifications";

// Storage key for medication data in AsyncStorage
const MED_KEY = "medications";

// Extended the medication interface to include unique ID -> used for list rendering and deletion
export interface MedicationWithId extends Medication {
  id: number;
}

/* ----- Save new medication locally ------ */
export const saveMed = async (newMed: Medication) => {
  try {
    // Retrive existing medication from AsynStorage
    const storedMed = await AsyncStorage.getItem(MED_KEY);
    const meds: Medication[] = storedMed ? JSON.parse(storedMed) : [];

    // Add new medication
    meds.push(newMed);

    // Save updated list back to AsyncStorage
    await AsyncStorage.setItem(MED_KEY, JSON.stringify(meds));
  } catch (error) {
    console.log("Problems with saving medication", error);
  }
};

/* ----- Load all medication from local storage ------ */
export const loadMedication = async (): Promise<MedicationWithId[]> => {
  try {
     // Retrive stored medication list
    const storedMed = await AsyncStorage.getItem(MED_KEY);
    const meds: Medication[] = storedMed ? JSON.parse(storedMed) : [];

  // Add an index-based ID to each medication (for rendering & deletion)
    const medsIndexed = meds.map((med, index) => ({
      ...med,
      id: index,
    }));

    return medsIndexed;
  } catch (error) {
    console.log("Problems with loading medication:", error);
    return [];
  }
};

/* ----- Delete a medication by its ID ------ */
export const deleteMedication = async (idToDelete: number) => {
  try {
    // Retrieve current medications
    const storedMed = await AsyncStorage.getItem(MED_KEY);
    if (!storedMed) return;

    const meds: Medication[] = JSON.parse(storedMed);
    const medToDel = meds[idToDelete];

    // Cancel scheduled notification for this specific medication if exists
    if (medToDel?.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        medToDel.notificationId
      );
    }

    // Remove the medication from the list
    const updatedMeds = meds.filter((_, index) => index !== idToDelete);

    // Save updated list back to AsyncStorage
    await AsyncStorage.setItem(MED_KEY, JSON.stringify(updatedMeds));
    
    // A check to verify deletion and load new storage state
    const verify = await AsyncStorage.getItem(MED_KEY);
    console.log("Storage after saving delete:", JSON.parse(verify || "[]"));
  } catch (error) {
    console.log("Problems with deleting medication:", error);
  }
};


