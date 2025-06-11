import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ButtonNewChat, ChatHeader } from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { ChatEmpty } from '../../components/chat-empty'
import { TextBase } from '../../components/text'
import { useNavigation } from '@react-navigation/native'
import { ChatNavigatiorRoutesProps } from '../../routes/chat.stack'

export function Chat() {
    const navigation = useNavigation<ChatNavigatiorRoutesProps>()

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.gray900 }}>
            <ChatHeader>
                <MaterialCommunityIcons 
                    name='robot'
                    size={40}
                    color={COLORS.purple200}
                />

                <View>
                    <TextBase variant='semiBold' size={20} color={COLORS.gray100}>OlimpIA</TextBase>
                </View>
            </ChatHeader>

            <ChatEmpty />
            
            <ButtonNewChat onPress={() => navigation.navigate('newChat')}>
                <MaterialCommunityIcons 
                    name='plus'
                    size={50}
                    color={COLORS.white}
                />
            </ButtonNewChat>

        </SafeAreaView>
    )
}