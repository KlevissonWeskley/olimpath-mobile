import styled from 'styled-components/native'
import { COLORS } from '../../constants/colors'

export const ModalContainer = styled.SafeAreaView`
    background-color: rgba(0,0,0,0.4);
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const ModalContent = styled.View`
    width: 85%;
    background-color: ${COLORS.gray600};
    padding: 20px;
    border-radius: 6px;
`

export const LogoutButton = styled.Text`
    text-align: center;
    font-family: 'Inter_700Bold';
    font-size: 20px;
    color: ${COLORS.red300};
`

export const CancelButton = styled.Text`
    text-align: center;
    font-family: 'Inter_700Bold';
    font-size: 20px;
    color: ${COLORS.gray100};
`