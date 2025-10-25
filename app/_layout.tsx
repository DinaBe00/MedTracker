import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import { useEffect } from "react";

// Configure notification behavior (so notifications show properly)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldSetBadge: false, // Badge not set
    shouldShowBanner: true, // Banner shown
    shouldShowList: true, // List shown
    shouldPlaySound: false, // Sound disabled
  }),
});

export default function Rootlayout() {
  // Ask for notification permission only once, when the app starts
  useEffect(() => {
    const setup = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Tillatelse til varsler ble ikke gitt!");
      }
    };
    setup();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Status bar styling */}
      <StatusBar style="auto" />
      <Stack>
        {/* Navigation stack */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/*Add medication screen */}
        <Stack.Screen
          name="add/index"
          options={{
            title: "Legg til medisin",
            headerStyle: { backgroundColor: "#eaf0f2ff" },
            headerTintColor: "#040708ff",
            headerBackTitle: "Tilbake",
          }}
        />
        {/* Fallback Not Found screen */}
        <Stack.Screen name="+not-found" options={{}} />
      </Stack>
    </GestureHandlerRootView>
  );
}
