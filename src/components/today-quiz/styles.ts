import styled from 'styled-components/native'
import { COLORS } from '../../constants/colors'

export const TodayQuizContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding: 15px;
    border: 2px solid ${COLORS.gray100};
    border-radius: 6px;
    justify-content: space-between;
    overflow: hidden;
    margin-bottom: 32px;
`