import { useState } from "react"
import { TouchableOpacity, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { quiz } from "../../../quiz"
import { useNavigation } from "@react-navigation/native"
import { QuizContainer } from "./styles"
import { TextBase } from "../../components/text"
import { COLORS } from "../../constants/colors"
import { FinishedQuiz } from "./components/finished-quiz"

export function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(quiz.questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const navigation = useNavigation();
  const currentQuestion = quiz.questions[currentIndex];
  const selectedOption = answers[currentIndex];

  function handleAnswer(option: string) {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = option;
    setAnswers(updatedAnswers);
  }

  function goToNext() {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  }

  function goToPrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }

  function getOptionStyle(option: string) {
    return {
      backgroundColor: selectedOption === option ? "#d4edda" : COLORS.gray100
    };
  }

  const score = answers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length;
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  if (showResult) {
    return (
      <FinishedQuiz score={score} />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: COLORS.gray900 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={30} color={COLORS.gray100} />
        </TouchableOpacity>
        <TextBase variant="semiBold" size={18} color={COLORS.gray100}>{quiz.quizTitle}</TextBase>
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
  );
}
