import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';

export const LoginContainer = styled(SafeAreaView)`
    flex: 1;
    background-color: ${COLORS.gray900};
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

export const GoogleButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${COLORS.purple500};
    padding: 14px 24px;
    border-radius: 12px;
    margin-bottom: 40px;
`;

export const IconWrapper = styled.View`
    margin-right: 12px;
`;
