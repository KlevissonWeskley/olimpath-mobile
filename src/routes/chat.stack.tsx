import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Chat } from '../screens/chat'
import { NewChat } from '../screens/new-chat'
import { ChatView } from '../screens/chat-view'

type ChatStackProps = {
    chat: undefined
    newChat: undefined
    chatView: { chatId: string }
}

export type ChatNavigatiorRoutesProps = NativeStackNavigationProp<ChatStackProps>

const { Navigator, Screen } = createNativeStackNavigator<ChatStackProps>()

export function ChatStack() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='chat' component={Chat} /> 
            <Screen name='newChat' component={NewChat} />
            <Screen name='chatView' component={ChatView} />
        </Navigator>
    )
}