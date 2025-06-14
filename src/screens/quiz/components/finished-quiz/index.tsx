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

  const getMessage = () => {
    const percentage = (score / total) * 100

    if (percentage === 100) {
      return "🎉 Parabéns! Você gabaritou! 🏆"
    } else if (percentage >= 80) {
      return "🔥 Mandou bem! Quase perfeito. 👏"
    } else if (percentage >= 50) {
      return "💪 Bom trabalho! Dá pra melhorar. 😉"
    } else {
      return "😓 Não desanima! Bora estudar mais e tentar de novo. 📚"
    }
  }

  return (
    <FinishedQuizContainer>
      <CardFinishedQuiz>
        <MaterialCommunityIcons 
          name="trophy" size={60} 
          color="#FFD700" 
        />

        <TextBase variant="bold" size={22} style={{ marginTop: 20 }} color={COLORS.purple200}>
          Finalizado!
        </TextBase>

        <TextBase size={18} style={{ marginTop: 10 }} color={COLORS.purple100}>
          Você acertou {score} de {total} perguntas.
        </TextBase>

        <TextBase size={16} style={{ marginTop: 12, textAlign: 'center' }} color={COLORS.gray100}>
          {getMessage()}
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
