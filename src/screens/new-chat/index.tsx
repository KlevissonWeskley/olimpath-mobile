import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { AiAnswer, ChatHeader, Input, UserQuestion } from "./styles";
import { TextBase } from "../../components/text";
import { COLORS } from "../../constants/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
    const [chatId, setChatId] = useState<string | null>(null)

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

    const API_KEY = process.env.EXPO_PUBLIC_API_KEY_GEMINI

    const ai = new GoogleGenAI({ apiKey: API_KEY })

    useEffect(() => {
        async function initChat() {
            try {
                const res = await api.post('/chat/create', {
                    userId: user?.id,
                    title: null,
                })
                setChatId(res.data.chat.id)
            } catch (err) {
                console.error('Erro ao criar chat:', err)
            }
        }

        initChat()
    }, [])

    async function onSubmit(data: FormData) {
        if (!chatId) return;

        const { question } = data;

        reset();
        setLoadingAnswer(true);

        const newEntry: ChatEntry = { question, answer: undefined };
        setChatHistory(prev => [...prev, newEntry]);

        const entryIndex = chatHistory.length;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: `${prompt} A pergunta é: ${question}`
            })

            const aiText = response.text;

            setChatHistory(prev => {
                const updated = [...prev];
                updated[entryIndex] = { ...updated[entryIndex], answer: aiText };
                return updated;
            });

            api.post(`/chat/${chatId}/message`, {
                content: question,
                sender: 'USER',
            }).catch(err => console.error('Erro ao salvar pergunta:', err));

            api.post(`/chat/${chatId}/message`, {
                content: aiText,
                sender: 'AI',
            }).catch(err => console.error('Erro ao salvar resposta:', err));

        } catch (err) {
            console.error('Erro ao gerar resposta da IA:', err);
        }

        setLoadingAnswer(false);
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