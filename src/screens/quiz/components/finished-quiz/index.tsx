import { SafeAreaView } from "react-native-safe-area-context"
import { TextBase } from "../../../../components/text"
import { TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { quiz } from "../../../../../quiz"
import { CardFinishedQuiz, FinishedQuizContainer } from "./styles"
import { COLORS } from "../../../../constants/colors"

type FinishedQuizProps = {
    score: number
}

export function FinishedQuiz({ score }: FinishedQuizProps) {
    const navigation = useNavigation();

    return (
        <FinishedQuizContainer>
            <CardFinishedQuiz>
                <MaterialCommunityIcons 
                    name="trophy" size={60} 
                    color="#FFD700" 
                />

                <TextBase variant="bold" size={22} style={{ marginTop: 20 }} color={COLORS.purple200}>
                    Quiz Finalizado!
                </TextBase>

                <TextBase size={18} style={{ marginTop: 10 }} color={COLORS.purple100}>
                    Você acertou {score} de {quiz.questions.length} perguntas.
                </TextBase>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        marginTop: 30,
                        padding: 15,
                        backgroundColor: "#ddd",
                        borderRadius: 8,
                    }}
                >
                    <TextBase>Voltar</TextBase>
                </TouchableOpacity>
            </CardFinishedQuiz>
        </FinishedQuizContainer>
    )
}