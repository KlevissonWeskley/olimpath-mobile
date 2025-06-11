import { Image, TouchableOpacity, View } from "react-native";
import { TextBase } from "../text";

export function MaterialCard() {
    return (
        <TouchableOpacity>
            <View>
                <Image />

                <View>
                    <TextBase variant="medium" size={16}>Encontros de Geometria</TextBase>

                    <TextBase variant="regular" size={12}>Neste primeiro do módulo de Geometria serão apresentados os conceitos e os resultados mais básicos envolvidos na construção da Geometria.</TextBase>

                    <TextBase variant="bold" size={14}>PIC</TextBase>
                </View>
            </View>
        </TouchableOpacity>
    )
}