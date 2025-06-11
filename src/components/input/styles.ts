import { TextInput } from 'react-native'
import styled from 'styled-components/native'
import { COLORS } from '../../constants/colors'

export const Container = styled(TextInput)`
    flex: 1;

    min-height: 56px;
    max-height: 56px;

    color: ${COLORS.white};
    background-color: ${COLORS.gray300};
    font-family: sans-serif;
    font-size: 16px;
 
    border-radius: 6px;
    padding: 16px;
`