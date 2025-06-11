import { TouchableOpacity } from "react-native"
import { TextBase } from "../text"
import { COLORS } from "../../constants/colors"

type FilterProps = {
    item: string
    isSelected: boolean
    onPress: () => void
}

export function Filter({ item, isSelected, onPress }: FilterProps) {
    return (
        <TouchableOpacity 
            style={{
                paddingHorizontal: 16,
                height: 40,
                backgroundColor: isSelected ? COLORS.purple300 : COLORS.gray700,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: 80
            }}
            onPress={onPress}
        >
            <TextBase variant="medium" size={14} color={isSelected ? COLORS.white : COLORS.gray100}>{item}</TextBase>
        </TouchableOpacity>
    )
}