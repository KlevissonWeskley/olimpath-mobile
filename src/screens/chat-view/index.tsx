import { useEffect, useRef, useState } from "react"
import { ActivityIndicator, ScrollView, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute, useNavigation } from "@react-navigation/native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Controller, useForm } from "react-hook-form"
import Markdown from 'react-native-markdown-display'

import { ChatHeader, Input, UserQuestion, AiAnswer } from "../new-chat/styles"
import { COLORS } from "../../constants/colors"
import { TextBase } from "../../components/text"
import { api } from "../../lib/axios"
import { useUser } from "@clerk/clerk-expo"
import { GoogleGenAI } from "@google/genai"
import { prompt } from "../../constants/prompt"

type RouteParams = {
  chatId: string
}

type Message = {
  id: string
  content?: string
  sender: "USER" | "AI"
  createdAt: string
}

type FormData = {
  question: string
}

export function ChatView() {
  const scrollRef = useRef<ScrollView>(null)
  const { user } = useUser()
  const route = useRoute()
  const navigation = useNavigation()
  const { chatId } = route.params as RouteParams

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  const { control, handleSubmit, reset } = useForm<FormData>()

  async function fetchMessages() {
    try {
      const res = await api.get(`chat/${chatId}`)
      setMessages(res.data.chat.messages)
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err)
    } finally {
      setLoading(false)
    }
  }

  async function onSubmit(data: FormData) {
    const content = data.question.trim()
    if (!content) return

    reset()
    setSending(true)

    const userMsg: Message = {
        id: String(Date.now()),
        content,
        sender: "USER",
        createdAt: new Date().toISOString()
    }

    setMessages((prev) => [
        ...prev,
        userMsg,
        {
            id: String(Date.now() + 1),
            content: undefined,
            sender: "AI",
            createdAt: new Date().toISOString()
        }
    ])
    try {
        // 1. Salva a pergunta do usuário
        await api.post(`chat/${chatId}/message`, {
            content,
            sender: "USER"
        })

        const API_KEY = process.env.EXPO_PUBLIC_API_KEY_GEMINI

        const ai = new GoogleGenAI({ apiKey: API_KEY })

        // 2. Gera resposta da Gemini
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `${prompt} A pergunta é: ${content}`
        })

        const aiText = response.text

        // 3. Salva a resposta da IA
        await api.post(`chat/${chatId}/message`, {
            content: aiText,
            sender: "AI"
        })

        // 4. Atualiza localmente
        setMessages((prev) => {
            const updated = [...prev]
            const lastIndex = updated.findLastIndex(msg => msg.sender === "AI" && !msg.content)
            if (lastIndex !== -1) {
                updated[lastIndex].content = aiText
            }
            return updated
        })

    } catch (err) {
        console.error("Erro ao enviar mensagem:", err)
    } finally {
        setSending(false)
        setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true })
        }, 300)
    }
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.gray900, flex: 1 }}>
        <ChatHeader>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left" size={30} color={COLORS.gray100} />
                </TouchableOpacity>

                <MaterialCommunityIcons name="robot" size={40} color={COLORS.purple200} />
            </View>

            <View>
                <TextBase variant='semiBold' size={20} color={COLORS.gray100}>OlimpIA</TextBase>
                <TextBase variant="regular" color={COLORS.green300}>Online</TextBase>
            </View>
        </ChatHeader>

        <ScrollView
            ref={scrollRef}
            style={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
        >
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.purple300} />
            ) : (
            messages.map((msg, index) => (
                <View key={msg.id || index}>
                    {msg.sender === "USER" ? (
                        <UserQuestion>
                            <TextBase variant="regular" color={COLORS.white}>
                                {msg.content}
                            </TextBase>
                        </UserQuestion>
                    ) : (
                        <AiAnswer>
                            {msg.content === undefined ? (
                                <TextBase style={{ color: COLORS.gray400, fontStyle: 'italic' }}>
                                    Buscando sabedoria... 🤖
                                </TextBase>
                            ) : (
                                <Markdown
                                    style={{
                                        body: { color: COLORS.gray100, fontSize: 16 },
                                        strong: { fontWeight: 'bold' },
                                        link: { color: COLORS.purple300 },
                                    }}
                                >
                                    {msg.content}
                                </Markdown>
                            )}
                        </AiAnswer>
                    )}
                </View>
            ))
            )}
        </ScrollView>

        <View style={{ padding: 10 }}>
            <Controller
            control={control}
            name="question"
            render={({ field: { onChange, value } }) => (
                <Input>
                <TextInput
                    placeholder="Escreva sua mensagem..."
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    style={{ flex: 1, color: COLORS.gray100 }}
                    placeholderTextColor={COLORS.gray100}
                />
                <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={sending}>
                    <MaterialCommunityIcons
                    name="send"
                    color={COLORS.purple300}
                    size={35}
                    />
                </TouchableOpacity>
                </Input>
            )}
            />
        </View>
        </SafeAreaView>
    )
}
