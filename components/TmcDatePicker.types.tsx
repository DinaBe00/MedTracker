
// Props interface for the TmcDatePicker component
export interface TmcDatePickerProps {
  value: Date; // The current selected date shown in picker
  onChange: (date: Date) => void; // Callback triggered when user selects a new date -> receives the selected date
  label?: string; // Optional text displayed above the date picker
  minDate?: Date; // Optinonal minimum selectable date, so user can't select earlier dates than this. 
}