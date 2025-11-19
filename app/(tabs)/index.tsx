import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

export default function Index() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={styles.content}>Edit app/index.tsx to edit this screen.</Text>
      <TouchableWithoutFeedback onPress={toggleDarkMode}>
        <Text>Toggle {isDarkMode ? "Dark" : "Light"} Mode</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    fontSize: 18,
  },
  link: {
    color: "#00f"
  }
})

