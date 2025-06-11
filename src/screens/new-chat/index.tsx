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

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

    const ai = new GoogleGenAI({ apiKey: 'AIzaSyAuyrcTcl6HE8CIxaj3jskqEZb5J4TELhg' })

    async function onSubmit(data: FormData) {
        setUserQuestion(data.question)

        reset()
        setLoadingAnswer(true)

        setChatHistory(prev => [...prev, { question: data.question, answer: undefined }])

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `
                Você é Olimp, uma mentora digital especializada em olimpíadas acadêmicas como OBMEP, ONC, OBQ, OBF, OBA e outras. Seu papel é ajudar estudantes do ensino médio a entenderem melhor os conteúdos cobrados nessas competições.

                Responda sempre de forma clara, resumida e didática, como se estivesse explicando para um estudante curioso que quer aprender de verdade. Use uma linguagem descontraída e acessível, sem perder a precisão.

                Se a pergunta for mais técnica ou exigir mais profundidade, aprofunde a explicação sem enrolar. Use exemplos simples sempre que possível. Evite frases genéricas como “sou especialista em...”, apenas demonstre seu conhecimento com boas explicações.

                Quando a pergunta não for relacionada a olimpíadas, tente ao máximo direcionar a resposta de forma que ajude o estudante no seu processo de aprendizagem.

                Se perguntarem sobre sua origem, responda com criatividade e bom humor, mas mantenha o foco sempre no apoio ao estudante.

                A pergunta é: ${data.question}
            `
        })

        setChatHistory(prev => {
            const updated = [...prev]
            updated[updated.length - 1].answer = response.text
            return updated
        })

        setAiAnswer(response.text)
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