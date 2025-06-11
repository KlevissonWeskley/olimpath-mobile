import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Olympiads } from '../screens/olympiads'
import { OlympiadChosen } from '../screens/olympiad-chosen'
import { VideoLesson } from '../screens/video-lesson'

export type OlympiadsStackProps = {
    olympiads: undefined
    olympiadChosen: { olympiadId: string }
    videoLesson: { linkVideo: string }
}

export type OlympiadsNavigatiorRoutesProps = NativeStackNavigationProp<OlympiadsStackProps>

const { Navigator, Screen } = createNativeStackNavigator<OlympiadsStackProps>()

export function OlympiadsStack() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='olympiads' component={Olympiads} /> 
            <Screen name='olympiadChosen' component={OlympiadChosen} />
            <Screen name='videoLesson' component={VideoLesson} />
        </Navigator>
    )
}