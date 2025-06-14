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

export const ButtonNewChat = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  border-bottom-right-radius: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.purple500};
  position: absolute;
  bottom: 20px;
  right: 20px;
`

export const ChatCard = styled.TouchableOpacity`
  width: 100%;
  padding: 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.gray600};
  background-color: ${COLORS.gray800};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
