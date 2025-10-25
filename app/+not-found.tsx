import { GlobalStyles } from "@/styles/GlobalStyles";
import { Stack, router } from "expo-router";
import { View, Pressable, Text } from "react-native";


// If a route is not found on web, show a simple 404 error code on screen. 
export default function NotFoundScreen() {
  return (
    <>
      {/* Set page header title */}
      <Stack.Screen options={{ title: "Page Not Found" }} />
      {/* Main content container, with the message shown */}
      <View style={[GlobalStyles.centeredContainer, {backgroundColor:"#317f9bff"}]}>
        <Text style={GlobalStyles.notFoundTitle}>NB! Page Not Found</Text>

          {/* Button to navigate back to the home screen */}
          <Pressable
            style={({ pressed }) => [
              GlobalStyles.notFoundButton,
              pressed && GlobalStyles.notFoundButtonPressed, 
            ]}
            onPress={() => router.push("/")} // Navigate to home page
          >
            <Text style={GlobalStyles.notFoundButtonText}>Go Home</Text>
          </Pressable>
        </View>
    </>
  );
}

