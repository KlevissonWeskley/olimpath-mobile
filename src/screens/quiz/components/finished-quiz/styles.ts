import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { COLORS } from '../../../../constants/colors'
import { Platform } from 'react-native'

export const FinishedQuizContainer = styled(SafeAreaView)`
    flex: 1;
    padding: 20px; 
    justify-content: center; 
    align-items: center;
    background-color: ${COLORS.gray900};
`

export const CardFinishedQuiz = styled.View`
    background-color: ${COLORS.gray600};
    padding: 20px;
    border-radius: 8px;
    align-items: center;
`