import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { COLORS } from '../../constants/colors'

export const LibraryContainer = styled(SafeAreaView)`
    flex: 1;
    padding: 20px;
    background-color: ${COLORS.gray900};
`

export const Input = styled.View`
    width: 100%;
    background-color: ${COLORS.gray700};
    flex-direction: row-reverse;
    gap: 16px;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    margin-top: 36px;
    margin-bottom: 36px;
`

export const ButtonPdf = styled.TouchableOpacity`
    padding: 12px; 
    background-color: ${COLORS.gray700}; 
    border-radius: 8px;
    margin-bottom: 10px; 
    flex-direction: row;
    align-items: center; 
    justify-content: space-between;
`