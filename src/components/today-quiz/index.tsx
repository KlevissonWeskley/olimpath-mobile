import { Image, View } from "react-native";

import todayQuizImage from '../../assets/today-quiz-image.png'
import { TodayQuizContainer } from "./styles";
import { COLORS } from "../../constants/colors";
import { TextBase } from "../text";
import { quiz } from "../../../quiz";

type TodayQuizProps = {
    navigate: () => void
}

export function TodayQuiz({ navigate }: TodayQuizProps) {
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