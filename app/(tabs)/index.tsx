import { Text, TouchableOpacity, View } from "react-native";
import MedicationList from "@/components/MedicationList";
import { useRouter } from "expo-router";
import { GlobalStyles } from "@/styles/GlobalStyles";

export default function Home() {
  const router = useRouter();
  return (
    <View
      style={[
        GlobalStyles.container,
        { backgroundColor: "#317f9bff", paddingTop: 10 },
      ]}
    >
      {/* Welcome message*/}
      <Text style={GlobalStyles.titleSWite}>
        Velkommen til appen som hjelper deg med å huske å ta dine medisiner!
      </Text>

      {/* Add medication button - navigates to the Add screen */}
      <TouchableOpacity
        style={[
          GlobalStyles.button,
          {
            borderRadius: 30,
            alignSelf: "center",
            marginVertical: 15,
            paddingHorizontal: 20,
          },
        ]}
        onPress={() => router.push("/add")}
      >
        <Text
          style={[
            GlobalStyles.buttonText,
            { color: "#317f9bff", fontWeight: "bold", fontSize: 16 },
          ]}
        >
          +Legg til
        </Text>
      </TouchableOpacity>

      {/* List of added medication */}
      <View style={GlobalStyles.container}>
        <MedicationList />
      </View>
    </View>
  );
}

