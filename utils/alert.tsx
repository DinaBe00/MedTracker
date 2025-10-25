import { Alert, Platform } from "react-native";


/* Type definition for alert button options */
type AlertOption = {
  text: string;
  onPress?: () => void;
  style: "default" | "cancel" | "destructive";
};

/* Custom alert for web since React Native's Alert API isn't supported on web
 */
const alertPolyfill = (
  title?: string | undefined,
  message?: string | undefined,
  options?: AlertOption[],
  extra?: any
): void => {
  // Show simple confimr dialog with title and message
  const result = window.confirm(
    [title, message].filter(Boolean).join("\n")
  );

  if (result) {
    // If user confirms -> trigger non-cancel action (e.g., "OK" or Delete)
    const confirmOption = options?.find(({ style }) => style !== "cancel");
    confirmOption && confirmOption.onPress?.();
  } else {
    // Else, user cancels -> trigger cancel callback if available 
    const cancelOption = options?.find(({ style }) => style === "cancel");
    cancelOption && cancelOption.onPress?.();
  }
};

/* 
- On web -> use alertPolfyill() 
- On iOS/Android -> use native Alert.alert()
   */
const alert = Platform.OS === "web" ? alertPolyfill : Alert.alert;

export default alert;
