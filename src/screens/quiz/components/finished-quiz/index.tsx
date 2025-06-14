import { TextBase } from "../../../../components/text"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { CardFinishedQuiz, FinishedQuizContainer } from "./styles"
import { COLORS } from "../../../../constants/colors"

type FinishedQuizProps = {
  score: number
  total: number
}

export function FinishedQuiz({ score, total }: FinishedQuizProps) {
  const navigation = useNavigation()

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
          Você acertou {score} de {total} perguntas.
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