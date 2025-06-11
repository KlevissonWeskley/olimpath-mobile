import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { COLORS } from '../../constants/colors'

export const OlympiadsContainer = styled(SafeAreaView)`
    flex: 1;
    padding: 20px;
    background-color: ${COLORS.gray900};
`
