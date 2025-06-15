import { useEffect, useState } from "react"
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { QuizContainer } from "./styles"
import { TextBase } from "../../components/text"
import { COLORS } from "../../constants/colors"
import { FinishedQuiz } from "./components/finished-quiz"
import { api } from "../../lib/axios"
import { useUser } from "@clerk/clerk-expo"

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

export function Quiz() {
  const [quizData, setQuizData] = useState<QuizProps>()
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const { user } = useUser()

  const navigation = useNavigation()

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await api.get('/quiz/today')
        setQuizData(response.data.quiz)
        setAnswers(Array(response.data.quiz.questions.length).fill(null))
      } catch (err) {
        console.error('Erro ao buscar quiz:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuiz()
  }, [])

  if (loading || !quizData) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.gray900 }}>
        <ActivityIndicator size="large" color={COLORS.purple500} />
      </SafeAreaView>
    )
  }

  const currentQuestion = quizData.questions[currentIndex]
  const selectedOption = answers[currentIndex]
  const score = answers.filter((a, i) => a === quizData.questions[i].correctAnswer).length
  const isLastQuestion = currentIndex === quizData.questions.length - 1

  function handleAnswer(option: string) {
    const updatedAnswers = [...answers]
    updatedAnswers[currentIndex] = option
    setAnswers(updatedAnswers)
  }

  async function goToNext() {
    if (isLastQuestion) {
      try {
        const userId = user?.id
        await api.get(`/gamification/users/${userId}/quiz/score`)
      } catch (err: any) {
        console.log("Erro ao registrar pontuação:", err?.response?.data || err.message)
      }

      setShowResult(true)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  function goToPrevious() {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1)
  }

  function getOptionStyle(option: string) {
    return {
      backgroundColor: selectedOption === option ? "#d4edda" : COLORS.gray100
    }
  }

  if (showResult) {
    return <FinishedQuiz score={score} total={quizData.questions.length} />
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: COLORS.gray900 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={30} color={COLORS.gray100} />
        </TouchableOpacity>
        <TextBase variant="semiBold" size={18} color={COLORS.gray100}>{quizData.quizTitle}</TextBase>
      </View>

      <QuizContainer>
        <TextBase variant="bold" size={16} style={{ marginBottom: 16 }} color={COLORS.gray100}>
          {currentQuestion.question}
        </TextBase>

        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAnswer(option)}
            style={{
              padding: 15,
              borderRadius: 8,
              marginBottom: 10,
              ...getOptionStyle(option),
            }}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}

        <View style={{ flexDirection: 'row', marginTop: 20, gap: 10 }}>
          <TouchableOpacity
            onPress={goToPrevious}
            disabled={currentIndex === 0}
            style={{
              backgroundColor: currentIndex === 0 ? COLORS.gray50 : COLORS.purple500,
              padding: 12,
              borderRadius: 8,
              flex: 1,
              alignItems: 'center'
            }}
          >
            <TextBase color={currentIndex === 0 ? COLORS.black : COLORS.white}>Voltar</TextBase>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={goToNext}
            disabled={selectedOption == null}
            style={{
              backgroundColor: selectedOption != null ? COLORS.purple500 : '#ccc',
              padding: 12,
              borderRadius: 8,
              flex: 1,
              alignItems: 'center'
            }}
          >
            <TextBase color={selectedOption != null ? COLORS.white : COLORS.black}>{isLastQuestion ? "Finalizar" : "Próxima"}</TextBase>
          </TouchableOpacity>
        </View>
      </QuizContainer>
    </SafeAreaView>
  )
}
