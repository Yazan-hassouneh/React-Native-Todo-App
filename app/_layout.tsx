import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={indexOptions}></Stack.Screen>
    </Stack>
  )
}


const indexOptions = {
  // title: "Home"
}