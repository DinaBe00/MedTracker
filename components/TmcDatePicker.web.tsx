import React from "react";
import DatePicker from "react-datepicker";
// @ts-ignore
import "react-datepicker/dist/react-datepicker.css";
import { TmcDatePickerProps } from "./TmcDatePicker.types";

// A reasuable date picker component for web
// Uses react-datepicker under the hood
export const TmcDatePicker: React.FC<TmcDatePickerProps> = ({
  value,
  onChange,
  label,
  minDate,
}) => {
  return (
    <div style={{ marginBottom: 15 }}>
      {/* Optional label shown above the date picker */}
      {label && (
        <label
          style={{
            color: "white",
            display: "block",
            marginBottom: 10,
          }}
        >
          {label}
        </label>
      )}
      {/* Main date picker input */}
      <DatePicker
        selected={value}
        onChange={(date) => date && onChange(date)}
        minDate={minDate} // Prevent user from selecting earlier dates
        dateFormat="dd.MM.yyyy" // Display format for selected date
        className="react-datepicker__input-container" // Custom styling hook
      />
    </div>
  );
};
