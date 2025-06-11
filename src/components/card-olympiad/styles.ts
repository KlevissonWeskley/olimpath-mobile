import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { COLORS } from '../../constants/colors'

export const CardOlympiadContainer = styled(TouchableOpacity)`
    padding: 10px;
    width: 170px;
    border: 1px solid ${COLORS.gray300};
    border-radius: 6px;
    align-items: center;
    gap: 10px;
`