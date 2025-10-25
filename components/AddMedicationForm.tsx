import React from "react";
import {
  TextInput,
  Text,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveMed } from "@/utils/asyncStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native";
import alert from "@/utils/alert";
import { router } from "expo-router";
import { TmcDatePicker } from "./TmcDatePicker";
import * as Notifications from "expo-notifications";
import { toLocalISOTimeString } from "@/utils/timeUtils";
import { toCustomISODateString } from "@/utils/dateUtils";
import { GlobalStyles } from "@/styles/GlobalStyles";

// Define the Medication interface — structure for storing a medication entry
export interface Medication {
  name: string;
  dose: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  reminderTime?: string;
  notificationId?: string;
}

// Component is AddMedicationForm
// Allow the user to add a new medication, set dosage/frequancy, 
// optional end date and reminder time.
export default function AddMedicationForm() {
  // --- State variables for form fields ---
  const [name, setName] = React.useState("");
  const [dose, setDose] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [reminderTime, setReminderTime] = React.useState(new Date());
  const [showTimePicker, setShowTimePicker] = React.useState(false);

  // --- Handle form submission ---
  const handleSubmit = async () => {
     // Validate required fields
    if (!name || !dose || !frequency) {
      alert("Feilmelding", "Vennligst fyll ut alle feltene");
      return;
    }

    let notificationId: string | undefined;

    // Schedule a daily reminder notification (only on the phone (iOS/Android))
    if (Platform.OS !== "web") {
      // Schedule notification at selected time (daily)
      const trigger = new Date(reminderTime);
      const now = new Date();

      // If selected time has already passed, schedule for the next day 
      if (trigger <= now) {
        trigger.setDate(trigger.getDate() + 1);
      }

      notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Tid for medisin 💊",
          body: `Ta ${dose} av ${name}`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
          hour: trigger.getHours(),
          minute: trigger.getMinutes(),
          repeats: true, // Repeat daily
        },
      });
    } else {
      console.log("Skipping notifications — not supported on web.");
    }

    // Create a new medication object
    const addNewMed: Medication = {
      name,
      dose,
      frequency,
      startDate: toCustomISODateString(startDate),
      endDate: endDate ? toCustomISODateString(endDate) : undefined,
      reminderTime:
        Platform.OS !== "web" ? toLocalISOTimeString(reminderTime) : undefined,
      notificationId,
    };

    // Save medication on local storage
    await saveMed(addNewMed);
    alert("Suksess", "Medisin lagt til!");

    // Reset the medication form
    setName("");
    setDose("");
    setFrequency("");
    setStartDate(new Date());
    setEndDate(null);

    // Navigate back to home (web → "/", mobile → back)
    setTimeout(() => {
      if (Platform.OS === "web") {
        router.push("/");
      } else {
        router.back();
      }
    }, 800);
  };

  // --- Render the medication form ---
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Text style={GlobalStyles.titleLWhite}>Legg til medisin</Text>

      {/* Name of medication input */}
      <TextInput
        style={GlobalStyles.input}
        placeholder="Medikamentnavn"
        value={name}
        onChangeText={setName}
      />

      {/* Dose input*/}
      <TextInput
        style={GlobalStyles.input}
        placeholder="Dose (f.eks 200 mg)"
        value={dose}
        onChangeText={setDose}
      />

      {/* Frequency input */}
      <TextInput
        style={GlobalStyles.input}
        placeholder="Dosering (f.eks en tablett dag og en kveld)"
        value={frequency}
        onChangeText={setFrequency}
      />

      {/* Start Date picker */}
      <TmcDatePicker
        label="Startdato"
        value={startDate}
        onChange={setStartDate}
        minDate={new Date()}
      />

      {/* Optional end Date picker */}
      <TmcDatePicker
        label="Sluttdato (valgfritt)"
        value={endDate || new Date()}
        onChange={setEndDate}
        minDate={startDate}
      />

      {/* Reminder / Time Picker (only allowed on phone(iOS/Android)*/}
      {Platform.OS !== "web" && (
        <>
         {/* Button to open time picker */}
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            style={GlobalStyles.button}
          >
            <Text style={GlobalStyles.buttonText}>
              {`Påminnelse: ${toLocalISOTimeString(reminderTime)}`}
            </Text>
          </TouchableOpacity>

          {/* Time picker modal */}
          {showTimePicker && (
            <DateTimePicker
              value={reminderTime}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selected) => {
                setShowTimePicker(false);
                if (selected) setReminderTime(selected);
              }}
            />
          )}
        </>
      )}

      {/* Submit button */}
      <TouchableOpacity style={[GlobalStyles.button, GlobalStyles.buttonSpace]} onPress={handleSubmit}>
        <Text style={GlobalStyles.buttonText}>Legg til</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
