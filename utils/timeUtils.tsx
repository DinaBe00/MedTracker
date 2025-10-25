// Returns local time in HH:mm format (ISO-like)
export const toLocalISOTimeString = (date: Date): string => {
  // Used to formatting the time correctly. For numbers less than 10 should be represented
  // with two digits by adding a leading "0", e.g 5 minutes => should be : 05
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};
