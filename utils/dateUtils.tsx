type TYear = `${number}${number}${number}${number}`;
type TMonth = `${number}${number}`;
type TDay = `${number}${number}`;

export type TDateISODate = `${TYear}-${TMonth}-${TDay}`;

/**
 * Returns an ISO-like date string in YYYY-MM-DD format (UTC).
 * Example: "2025-10-26"
 */
export const toCustomISODateString = (date: Date): TDateISODate => {

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth()+1).toString().padStart(2, "0"); // months are 0-indexed
  const day = date.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}` as TDateISODate;
};
