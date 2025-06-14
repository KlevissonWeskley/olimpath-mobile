import { Modal, Animated } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { TextBase } from '../text'
import { COLORS } from '../../constants/colors'
import {
  Overlay,
  Box,
  ProgressBackground,
  ProgressBarAnimated
} from './styles'

type Props = {
  visible: boolean
  onFinish: () => void
}

export function LoadingProgressModal({ visible, onFinish }: Props) {
  const progress = useRef(new Animated.Value(0)).current
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (visible) {
      setStep(0)
      progress.setValue(0)

      Animated.timing(progress, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: false,
      }).start(() => {
        setStep(2)
        setTimeout(() => {
          onFinish()
        }, 1000)
      })

      setTimeout(() => setStep(1), 2000)
      setTimeout(() => setStep(2), 4000)
    }
  }, [visible])

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  const messages = ['Gerando simulado...', 'Quase lá...', 'Feito!']

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Overlay>
        <Box>
          <TextBase size={18} variant="semiBold" color={COLORS.gray100}>
            {messages[step]}
          </TextBase>

          <ProgressBackground>
            <ProgressBarAnimated
              style={{ width: widthInterpolated }}
            />
          </ProgressBackground>
        </Box>
      </Overlay>
    </Modal>
  )
}
