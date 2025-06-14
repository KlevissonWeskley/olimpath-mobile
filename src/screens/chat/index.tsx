import { ActivityIndicator, FlatList, View, Dimensions, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ButtonNewChat, ChatHeader, ChatCard } from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { ChatEmpty } from '../../components/chat-empty'
import { TextBase } from '../../components/text'
import { useNavigation } from '@react-navigation/native'
import { ChatNavigatiorRoutesProps } from '../../routes/chat.stack'
import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { useUser } from '@clerk/clerk-expo'
import { Text } from 'react-native'
import Toast from 'react-native-toast-message'

type ChatProps = {
  id: string
  title: string | null
  createdAt: string
  updatedAt: string
  messages: {
    content: string
  }[]
}

export function Chat() {
  const navigation = useNavigation<ChatNavigatiorRoutesProps>()
  const [chats, setChats] = useState<ChatProps[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  async function fetchChats() {
    try {
      const res = await api.get(`chats/${user?.id}`)
      setChats(res.data.chats)
    } catch (err) {
      console.error('Erro ao buscar chats:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChats()
  }, [])

  async function handleDeleteChat(chatId: string) {
    try {
      await api.delete(`chat/delete/${chatId}`)
      fetchChats()
      
      Toast.show({
        type: 'success',
        text1: 'Chat deletado',
        text1Style: { fontSize: 16 }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray900 }}>
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

        <View style={{ flex: 1, paddingTop: 10 }}>
            {loading ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={COLORS.purple200} size="large" />
                </View>
            ) : chats.length === 0 ? (
                <ChatEmpty />
            ) : (
            <FlatList
                data={chats}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
                renderItem={({ item }) => (
                    <ChatCard
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('chatView', { chatId: item.id })}
                        style={{
                          marginBottom: 10,
                        }}
                        key={item.id}
                    >
                        <View>
                          <TextBase size={16} color={COLORS.gray100}>
                              {item.title || 'Sem título'}
                          </TextBase>

                          <Text
                              style={{ fontSize: 14, color: COLORS.gray400, marginTop: 4, maxWidth: '90%' }}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                          >
                              Última: {item.messages[0]?.content || 'Sem mensagens'}
                          </Text>
                        </View>

                        <TouchableOpacity onPress={() => handleDeleteChat(item.id)}>
                          <MaterialCommunityIcons 
                            name='trash-can-outline'
                            color={COLORS.red300}
                            size={24}
                          />
                        </TouchableOpacity>
                    </ChatCard>
                )}
            />
            )}
        </View>

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
