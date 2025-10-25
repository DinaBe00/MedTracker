import { GlobalStyles } from "@/styles/GlobalStyles";
import { View, Text} from "react-native";


/* Placeholder page for app settings
    - Not finished yet */
export default function Settings() {
  return (
    <View style={[GlobalStyles.container, {backgroundColor:"#317f9bff", justifyContent: "center"}]}>
      <Text style={GlobalStyles.titleMWhite}>Innstillinger kommer snart...</Text>
    </View>
  );
}


