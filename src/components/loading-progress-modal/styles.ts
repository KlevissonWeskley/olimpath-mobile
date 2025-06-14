import styled from 'styled-components/native'
import { Animated } from 'react-native'
import { COLORS } from '../../constants/colors'

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`

export const Box = styled.View`
  background-color: ${COLORS.gray800};
  padding: 24px;
  border-radius: 12px;
  width: 80%;
  align-items: center;
`

export const ProgressBackground = styled.View`
  width: 100%;
  height: 12px;
  background-color: ${COLORS.gray600};
  border-radius: 8px;
  margin-top: 20px;
  overflow: hidden;
`

export const ProgressBarAnimated = styled(Animated.View)`
  height: 100%;
  background-color: ${COLORS.purple500};
`
