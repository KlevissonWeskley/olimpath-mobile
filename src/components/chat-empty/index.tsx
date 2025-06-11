import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ChatEmptyContainer } from "./styles";
import { COLORS } from "../../constants/colors";
import { TextBase } from "../text";

export function ChatEmpty() {
    return (
        <ChatEmptyContainer>
            <MaterialCommunityIcons 
                name="message-text-outline"
                size={40}
                color={COLORS.gray300}
            />

            <TextBase variant="regular" color={COLORS.gray300}>Você ainda não possui nenhum chat aberto.</TextBase>
        </ChatEmptyContainer>
    )
}