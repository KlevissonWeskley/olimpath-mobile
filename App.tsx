import { Lexend_300Light, Lexend_400Regular, Lexend_500Medium, Lexend_600SemiBold, Lexend_700Bold, useFonts } from '@expo-google-fonts/lexend'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { RegisterContextProvider } from './src/context/RegisterContext';
import Toast from 'react-native-toast-message'

export default function App() {
  const [fontsLoaded] = useFonts({
    Lexend_300Light,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
  })

  const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string

  return (
    <NavigationContainer>
      <PaperProvider>
        <SafeAreaProvider>
          { fontsLoaded ? (
            <RegisterContextProvider>
                <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_PUBLISHABLE_KEY}>
                  <Routes />
                  <Toast />
                </ClerkProvider>
            </RegisterContextProvider>
          ) : (
            <ActivityIndicator style={{ flex: 1 }} />
          )}
        </SafeAreaProvider>
      </PaperProvider>
    </NavigationContainer>
  )
}