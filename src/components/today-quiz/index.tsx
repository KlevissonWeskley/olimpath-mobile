import { useEffect, useState } from "react"
import { ActivityIndicator, Image, View } from "react-native"

import todayQuizImage from '../../assets/today-quiz-image.png'
import { TodayQuizContainer } from "./styles"
import { COLORS } from "../../constants/colors"
import { TextBase } from "../text"
import { api } from "../../lib/axios"

type TodayQuizProps = {
  navigate: () => void
}

type QuizProps = {
  quizTitle: string
  todayQuizTitle: string
  description: string
  questions: {
    id: number
    question: string
    options: string[]
    correctAnswer: string
  }[]
}

export function TodayQuiz({ navigate }: TodayQuizProps) {
  const [quiz, setQuiz] = useState<QuizProps | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await api.get('/quiz/today')
        setQuiz(response.data.quiz)
      } catch (err) {
        console.error('Erro ao carregar quiz do dia:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuiz()
  }, [])

  if (loading || !quiz) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="small" color={COLORS.purple500} />
      </View>
    )
  }

  return (
    <TodayQuizContainer onPress={navigate}>
      <View style={{ flex: 1, maxWidth: 200 }}>
        <TextBase variant="regular" color={COLORS.gray200}>Desafio de hoje!</TextBase>
        <TextBase variant="semiBold" size={22} color={COLORS.gray100}>Quiz do dia</TextBase>
        <TextBase variant="regular" color={COLORS.gray200}>{quiz.todayQuizTitle}</TextBase>
      </View>

      <Image
        source={todayQuizImage}
        style={{ width: 100, height: 100, borderRadius: 6 }}
      />
    </TodayQuizContainer>
  )
}
