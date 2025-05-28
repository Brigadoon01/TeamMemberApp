import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { ThemeProvider } from '../context/ThemeContext'

export default function RootLayout() {
  return (
    <ThemeProvider>
      <>
        <StatusBar style="light" backgroundColor="#1a1a1a" />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              title: "Team Members",
            }}
          />
        </Stack>
      </>
    </ThemeProvider>
  )
}
