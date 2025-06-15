import { DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { View } from 'react-native'
import { COLORS } from '../constants/colors'
import { useAuth } from '@clerk/clerk-expo'
import { ActivityIndicator } from 'react-native'

export function Routes() {
  const { isSignedIn, isLoaded } = useAuth()
  const theme = DefaultTheme;
  theme.colors.background = COLORS.gray400

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.gray900 }}>
        <ActivityIndicator size="large" color={COLORS.purple500} />
      </View>
    );
  }
  
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gray400 }}>
        {isSignedIn ? <AppRoutes /> : <AuthRoutes />}
    </View>
  )
}