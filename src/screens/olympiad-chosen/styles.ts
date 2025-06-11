import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

export const OlympiadChosenContainer = styled(SafeAreaView)`
    flex: 1;
    background-color: ${COLORS.gray900};
`

export const ButtonGenerateSimulation = styled.TouchableOpacity`
    background-color: ${COLORS.purple500};
    border-radius: 8px;
    padding: 12px;
`

export const AccordionContainer = styled(TouchableOpacity)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${COLORS.gray800};
    padding: 16px;
    border-radius: 4px;
`