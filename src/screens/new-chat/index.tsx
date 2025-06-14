import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { AiAnswer, ChatHeader, Input, UserQuestion } from "./styles";
import { TextBase } from "../../components/text";
import { COLORS } from "../../constants/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-native-markdown-display'
import { api } from "../../lib/axios";
import { useUser } from "@clerk/clerk-expo";
import { prompt } from "../../constants/prompt";

type FormData = {
    question: string
}

type ChatEntry = {
  question: string,
  answer?: string
}

export function NewChat() {
    const [userQuestion, setUserQuestion] = useState('')
    const [aiAnswer, setAiAnswer] = useState<string | undefined>()
    const [loadingAnswer, setLoadingAnswer] = useState(false)
    const [chatHistory, setChatHistory] = useState<ChatEntry[]>([])
    const navigation = useNavigation()
    const { user } = useUser()

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

    const API_KEY = process.env.EXPO_PUBLIC_API_KEY_GEMINI

    const ai = new GoogleGenAI({ apiKey: API_KEY })

    async function onSubmit(data: FormData) {
        const { question } = data

        reset()
        setLoadingAnswer(true)

        // Atualiza o histórico localmente com a pergunta
        setChatHistory(prev => [...prev, { question, answer: undefined }])

        let createdChatId = ''
        try {
            // 1. Cria o chat
            console.time('criando chat...')
            const chatRes = await api.post('chat/create', {
                userId: user?.id, 
                title: null,
            })
            console.timeEnd('chat criado...')

            createdChatId = chatRes.data.chat.id

            // 2. Salva a pergunta como mensagem do USER
            console.time('salvando pergunta...')
            await api.post(`chat/${createdChatId}/message`, {
                content: question,
                sender: 'USER',
            })
            console.timeEnd('pergunta salva...')
        } catch (err: any) {
            console.error('❌ Erro ao criar chat ou mensagem do usuário:')
            console.error('Mensagem:', err.message)

            if (err.response) {
                console.error('Status:', err.response.status)
                console.error('Dados:', err.response.data)
                console.error('Headers:', err.response.headers)
            } else if (err.request) {
                console.error('Request feita mas sem resposta:', err.request)
            } else {
                console.error('Erro ao configurar requisição:', err.message)
            }

            setLoadingAnswer(false)
            return
        }

        // 3. Gera resposta da IA
        console.time('gerando resposta...')
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `${prompt} A pergunta é: ${question}`
        })

        const aiText = response.text
        console.timeEnd('resposta gerada...')

        // 4. Salva a resposta da IA como mensagem da AI
        try {
            console.time('salvando resposta...')
            await api.post(`chat/${createdChatId}/message`, {
                content: aiText,
                sender: 'AI',
            })
            console.timeEnd('resposta salva...')
        } catch (err) {
            console.error('Erro ao salvar resposta da IA:', err)
        }

        // 5. Atualiza o histórico local com a resposta
        setChatHistory(prev => {
            const updated = [...prev]
            updated[updated.length - 1].answer = aiText
            return updated
        })

        setAiAnswer(aiText)
        setLoadingAnswer(false)
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.gray900, flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <ChatHeader>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons 
                            name='arrow-left'
                            size={30}
                            color={COLORS.gray100}
                        />
                    </TouchableOpacity>

                    <MaterialCommunityIcons 
                        name='robot'
                        size={40}
                        color={COLORS.purple200}
                    />
                </View>

                <View>
                    <TextBase variant='semiBold' size={20} color={COLORS.gray100}>OlimpIA</TextBase>
                    <TextBase variant="regular" color={COLORS.green300}>Online</TextBase> 
                </View>
            </ChatHeader>

            <ScrollView style={{ padding: 20, width: '100%', flex: 1 }} showsVerticalScrollIndicator={false}>
                {chatHistory.map((entry, index) => (
                    <View key={index}>
                        <UserQuestion>
                            <TextBase variant="regular" color={COLORS.white}>
                            {entry.question}
                            </TextBase>
                        </UserQuestion>

                        {entry.answer === undefined ? (
                            <AiAnswer>
                                <TextBase style={{ color: COLORS.gray400, fontStyle: 'italic' }}>
                                    Buscando sabedoria... 🤖
                                </TextBase>
                            </AiAnswer>
                        ) : (
                            <AiAnswer>
                                <Markdown
                                    style={{
                                        body: { color: COLORS.gray100, fontSize: 16 },
                                        strong: { fontWeight: 'bold' },
                                        link: { color: COLORS.purple300 },
                                    }}
                                >
                                    {entry.answer}
                                </Markdown>
                            </AiAnswer>
                        )}
                    </View>
                ))}
            </ScrollView>


            <View style={{ padding: 10 }}>
                <Controller 
                    control={control}
                    name="question"
                    render={({ field: { onChange, value } }) => (
                        <Input>
                            <TextInput 
                                placeholder="Pergunte alguma coisa"
                                value={value}
                                onChangeText={onChange}
                                autoCapitalize="none"
                                style={{ flex: 1, color: COLORS.gray100 }}
                                placeholderTextColor={COLORS.gray100}
                            />

                            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
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