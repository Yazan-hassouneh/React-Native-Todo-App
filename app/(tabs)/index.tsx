import Header from "@/components/Header";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { createIndexStyles } from "@/styles";
import { useQuery } from "convex/react";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, Text, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { isDarkMode, toggleDarkMode, colors } = useTheme()
  const styles = createIndexStyles(colors);
  const todos = useQuery(api.todos.getTodos);

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar barStyle={colors.statusBarStyle}></StatusBar>
      <SafeAreaView style={styles.safeArea}>
        <Header></Header>
        <TouchableWithoutFeedback onPress={toggleDarkMode} >
          <Text>Toggle {isDarkMode ? "Dark" : "Light"} Mode</Text>
        </TouchableWithoutFeedback>
        {todos?.map(({ _id, text }) => <Text key={_id}>{text}</Text>)}
      </SafeAreaView>
    </LinearGradient>
  );
}


