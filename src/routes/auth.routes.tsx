import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Login } from '../screens/login'

type AuthRoutes = {
  login: undefined
}

export type AuthNavigatiorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='login' component={Login} />
    </Navigator>
  )
}