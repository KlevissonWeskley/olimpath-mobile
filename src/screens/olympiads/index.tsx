import { TextBase } from "../../components/text";
import { ScrollView, View } from "react-native";
import { OlympiadsContainer } from "./styles";
import { COLORS } from "../../constants/colors";
import { ActivityIndicator, Divider } from "react-native-paper";

import obmepLogo from '../../assets/obmep-logo.png'
import obfLogo from '../../assets/obf-logo.png'
import obqLogo from '../../assets/obq-logo.png'
import obiLogo from '../../assets/obi-logo.png'
import obbLogo from '../../assets/obb-logo.png'
import obrLogo from '../../assets/obr-logo.png'
import onfilLogo from '../../assets/onfil-logo.png'
import onhbLogo from '../../assets/onhb-logo.png'
import oblLogo from '../../assets/obl-logo.png'
import obaLogo from '../../assets/oba-logo.png'
import oncLogo from '../../assets/onc-logo.png'
import opLogo from '../../assets/op-logo.png'

import { CardOlympiad } from "../../components/card-olympiad";
import { useNavigation } from "@react-navigation/native";
import { OlympiadsNavigatiorRoutesProps } from "../../routes/olympiads.stack";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

type OlympiadsData = {
    id: string,
    name: string,
    description: string,
}

export function Olympiads() {
    const [olympiadsData, setOlympiadsData] = useState<OlympiadsData[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation<OlympiadsNavigatiorRoutesProps>()

    const olympiadIcons: Record<string, any> = {
        OBMEP: obmepLogo,
        OBF: obfLogo,
        OBQ: obqLogo,
        ONC: oncLogo,
        OBI: obiLogo,
        OBB: obbLogo,
        OBL: oblLogo,
        OBR: obrLogo,
        ONFIL: onfilLogo,
        ONHB: onhbLogo,
        OBA: obaLogo,
        OP: opLogo,
    }

    async function getOlympiads() {
        try {
            setIsLoading(true)
            const response = await api.get('/olympiads/getAll')

            setOlympiadsData(response.data.olympiads)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getOlympiads()
    }, [])

    return (
        <OlympiadsContainer>
            <View style={{ gap: 10 }}>
                <TextBase variant='bold' size={22} color={COLORS.gray100}>Olimpíadas</TextBase>
                <TextBase variant='medium' size={15} color={COLORS.gray200}>Escolha pra qual olimpíada quer se preparar!</TextBase>

                <Divider style={{ height: 1 }} />
            </View>

            {isLoading ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator /> 
                </View>
            ) : (
                <ScrollView contentContainerStyle={{ paddingTop: 32 }} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 16 }}>
                        {olympiadsData.map((olympiad) => (
                            <CardOlympiad 
                                key={olympiad.name}
                                name={olympiad.name}
                                icon={olympiadIcons[olympiad.name] ?? opLogo} 
                                onPress={() => navigation.navigate('olympiadChosen', { olympiadId: olympiad.id })}
                            />
                        ))}
                    </View>
                </ScrollView>
            )}
        </OlympiadsContainer>
    )
}