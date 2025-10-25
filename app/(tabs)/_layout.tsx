import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// TabLayout defines the bottom tab navigation for the app
export default function Tablayout() {
  return (
    // Define the tab navigator and its global styling options
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#317f9bff", //Active tab icon/text color
        headerStyle: { backgroundColor: "#eff1f2ff" }, // Header background
        headerShadowVisible: false, // Removes header shadow to make it look more clean
        headerTintColor: "#191818ff", // Header text/icon color
      }}
    >
      {/* Home tab — displays main app screen */}
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "MedTracker", // Title in the header bar
          title: "Home", // Label name shown in the tab bar
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"} // Change icon based on focus
              color={color}
              size={27}
            />
          ),
        }}
      />

      {/* Settings tab — displays app settings screen */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings", // Label navn shown in the tab bar
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"} // Change icon based on focus
              color={color}
              size={27}
            />
          ),
        }}
      />
    </Tabs>
  );
}
