import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Home } from '../screens/home'
import { Quiz } from '../screens/quiz'

type HomeStackProps = {
    home: undefined
    quiz: undefined
}

export type HomeNavigatiorRoutesProps = NativeStackNavigationProp<HomeStackProps>

const { Navigator, Screen } = createNativeStackNavigator<HomeStackProps>()

export function HomeStack() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='home' component={Home} /> 
            <Screen name='quiz' component={Quiz} />
        </Navigator>
    )
}