import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { TmcDatePickerProps } from "./TmcDatePicker.types";
import { GlobalStyles } from "@/styles/GlobalStyles";

// A reasuable date picker component for iOS/Android 
export const TmcDatePicker: React.FC<TmcDatePickerProps> = ({
  value,
  onChange,
  label,
  minDate,
}) => {
  // State to control visibility of the native date picker
  const [show, setShow] = React.useState(false);

  // Handler when the date is changed in the picker
  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // On mobile, hide the picker after selection
    if (Platform.OS !== "web") setShow(false);

    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  // Open the date picker
  const openPicker = () => setShow(true);

  return (
    <View style={GlobalStyles.datePickerContainer}>
       {/* Optional label displayed above the button */}
      {label && <Text style={GlobalStyles.datePickerLabel}>{label}</Text>}

      {/* Button that opens the date picker */}
      <TouchableOpacity onPress={openPicker} style={GlobalStyles.datePickerButton}>
        <Text style={GlobalStyles.datePickerButtonText}>{value.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {/* Native Date Picker */}
      {show && (
        <DateTimePicker
          value={value} // Current selected date
          mode="date" // Pick date
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={minDate} // Optional minimum selected date
          onChange={onDateChange} // Callback when date changes
        />
      )}
    </View>
  );
};


