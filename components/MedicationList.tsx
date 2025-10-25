import React, { useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import {
  deleteMedication,
  loadMedication,
  MedicationWithId,
} from "@/utils/asyncStorage";
import { useFocusEffect } from "expo-router";
import alert from "@/utils/alert";
import MedicationItem from "./MedicationItem";
import { GlobalStyles } from "@/styles/GlobalStyles";

// Component: MedicationList
// Displays a list of saved medications with support for deletion and empty state.
export default function MedicationList() {
  const [medications, setMedications] = useState<MedicationWithId[]>([]);

  /* Fetch medications from storage and sort them
    - Sorted by startDate (oldest first)
    - Medication without a startDate is moved to the bottom*/
  const fetchMeds = async () => {
    const meds = await loadMedication();

    const sorted = meds.sort((a, b) => {
      if (!a.startDate) return 1; // move no-date meds to bottom
      if (!b.startDate) return -1;

      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

    setMedications(sorted);
  };

  // Load medications when this screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchMeds();
    }, [])
  );

  // Confirmation first, than delete a medication
  const confirmDel = (id: number, name: string) => {
    alert("Bekreft sletting", `Er du sikker på at du vil slette "${name}"?`, [
      { text: "Avbryt", style: "cancel" },
      {
        text: "Slett",
        style: "destructive",
        onPress: async () => {
          await deleteMedication(id);
          await fetchMeds(); // List refreshed after deletion
        },
      },
    ]);
  };

  /* 
     Render
     - Header title
     - Empty state if no medications
     - FlatList of MedicationItem components */
  return (
    <View style={GlobalStyles.medListContainer}>
      <Text style={GlobalStyles.medListTitle}>Dine medisiner</Text>

      {medications.length === 0 ? (
        // Show message if no medications have been added
        <Text style={GlobalStyles.medListTitle}>Ingen medisiner lagt til ennå</Text>
      ) : (
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            /*Handles UI for each item(tap/swipe/delete) */
            <MedicationItem item={item} confirmDel={confirmDel} />
          )}
        />
      )}
    </View>
  );
}

