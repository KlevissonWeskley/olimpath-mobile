import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { COLORS } from '../../constants/colors'

export const HomeContainer = styled(SafeAreaView)`
    flex: 1;
    padding: 20px;
    background-color: ${COLORS.gray900};
`

export const Gamification = styled.View`
    margin-top: 32px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const CardGamification = styled.View`
    width: 110px;
    height: 110px;
    border-radius: 8px;
    padding: 10px;
    background-color: ${COLORS.bege};
    align-items: center;
    justify-content: center;
`

export const OlympiadRecent = styled.TouchableOpacity`
    width: 100%;
    padding: 16px;
    border: 1px solid ${COLORS.white};
    border-radius: 6px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`