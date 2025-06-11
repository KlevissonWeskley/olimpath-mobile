import styled from 'styled-components/native'
import { COLORS } from '../../constants/colors'

export const ChatHeader = styled.View`
    padding: 20px;
    flex-direction: row;
    width: 100%;
    gap: 20px;
    background-color: ${COLORS.gray800};
    align-items: center;
`

export const Input = styled.View`
    width: 100%;
    background-color: ${COLORS.gray700};
    flex-direction: row;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
    border-radius: 8px;
    border: 1px solid ${COLORS.purple200};
`

export const UserQuestion = styled.View`
    max-width: 80%;
    background-color: ${COLORS.purple300};
    padding: 12px;
    align-self: flex-end;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
    margin-bottom: 30px;
`   

export const AiAnswer = styled.View`
    background-color: ${COLORS.gray600};
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    padding: 12px;
    max-width: 80%;
    align-self: flex-start;
    margin-bottom: 30px;
`