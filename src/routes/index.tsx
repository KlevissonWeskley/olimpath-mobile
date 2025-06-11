import { DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { View } from 'react-native'
import { COLORS } from '../constants/colors'
import { useAuth } from '@clerk/clerk-expo'

export function Routes() {
  const { isSignedIn } = useAuth()
  const theme = DefaultTheme;
  theme.colors.background = COLORS.gray400
  
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gray400 }}>
        {isSignedIn ? <AppRoutes /> : <AuthRoutes />}
        {/* <AppRoutes /> */}
    </View>
  )
}