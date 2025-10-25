import { GlobalStyles } from "@/styles/GlobalStyles";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

// Component: MedicationItem
// Renders a single medication entry with delete methods
// On web: tap to reveal delete button
// On iOS/Android: swipe left to reveal delete button
export default function MedicationItem({ item, confirmDel }: any) {
  // Track which item is active (for showing delete state on web)
  const [activeDelId, setActiveDelId] = useState<string | null>(null);
  const isActive = activeDelId === item.id;

  // --- Render medication details ---
  const renderMedicationInfo = () => (
    <View style={GlobalStyles.medInfo}>
      <Text style={GlobalStyles.medName}>{item.name}</Text>
      <Text style={GlobalStyles.medDetails}>{item.dose}</Text>
      <Text style={GlobalStyles.medDetails}>{item.frequency}</Text>

      {/* Start & End Dates */}
      {item.startDate && (
        <Text style={GlobalStyles.medDetails}>
          Start: {new Date(item.startDate).toLocaleDateString()}
        </Text>
      )}
      {item.endDate ? (
        <Text style={GlobalStyles.medDetails}>
          Slutt: {new Date(item.endDate).toLocaleDateString()}
        </Text>
      ) : (
        <Text style={[GlobalStyles.medDetails, GlobalStyles.medActive]}>Aktiv</Text>
      )}

      {/*Reminder time (if set) */}
      {item.reminderTime && (
        <Text style={GlobalStyles.medReminder}>⏰ Påminnelse:{item.reminderTime}</Text>
      )}
    </View>
  );

  // --- Web version (no swipe, click to reveal delete) ---
  if (Platform.OS === "web") {
    return (
      <TouchableOpacity
        onPress={() => setActiveDelId(isActive ? null : item.id)}
        style={[
          GlobalStyles.medCard,
          isActive && GlobalStyles.deleteCard, // red background for delete
        ]}
      >
        {renderMedicationInfo()}

        {isActive && (
          <TouchableOpacity
            style={GlobalStyles.deleteButton}
            onPress={() => confirmDel(item.id, item.name)}
          >
            <Text style={GlobalStyles.deleteText}>Slett</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }

  // --- Mobile version (swipe to delete) ---
  return (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          style={GlobalStyles.swipeDeleteButton}
          onPress={() => confirmDel(item.id, item.name)}
        >
          <Text style={GlobalStyles.deleteText}>Slett</Text>
        </TouchableOpacity>
      )}
    >
      <View style={GlobalStyles.medCard}>{renderMedicationInfo()}</View>
    </Swipeable>
  );
}

