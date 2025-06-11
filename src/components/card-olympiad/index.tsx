import { Image, ImageSourcePropType, TouchableOpacityProps } from "react-native";
import { TextBase } from "../text";
import { CardOlympiadContainer } from "./styles";
import { COLORS } from "../../constants/colors";

type CardOlympiadTypes = TouchableOpacityProps & {
    icon?: ImageSourcePropType
    name: string
}

export function CardOlympiad({ icon, name, ...rest }: CardOlympiadTypes) {
    return (
        <CardOlympiadContainer {...rest}>
            <Image 
                source={icon}
                style={{ width: 150, height: 150, borderRadius: 6 }}
            />

            <TextBase variant="semiBold" size={20} color={COLORS.gray100}>{name}</TextBase>
        </CardOlympiadContainer>
    )
}