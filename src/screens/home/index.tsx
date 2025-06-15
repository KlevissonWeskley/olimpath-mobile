import { Image, ScrollView, View } from 'react-native'
import { Header } from '../../components/header'
import { TodayQuiz } from '../../components/today-quiz'
import { CardGamification, Gamification, HomeContainer, OlympiadRecent } from './styles'
import { TextBase } from '../../components/text'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { HomeNavigatiorRoutesProps } from '../../routes/home.stack'
import { useUser } from '@clerk/clerk-expo'
import { useRegister } from '../../hooks/useRegister'
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/axios'

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
import Toast from 'react-native-toast-message'
import { RootNavigation } from '../../routes/app.routes'

type RecentWatchedProps = {
    olympiadId: string
    name: string
    totalVideos: number
    watchedVideos: number
}

type GamificationProps = {
    alreadyDoneToday: boolean
    dailyQuizCount: number
    points: number
    rankingPosition: number
}

export function Home() {
    const navigation = useNavigation<HomeNavigatiorRoutesProps>()
    const { user, isLoaded } = useUser()
    const { signInWithClerk } = useRegister()
    const [recentWatched, setRecentWatched] = useState<RecentWatchedProps[]>([])
    const rootNavigation = useNavigation<RootNavigation>()
    const [gamification, setGamification] = useState<GamificationProps>()

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

    async function getOlympiadsRecents() {
        try {
            const response = await api.get(`/users/${user?.id}/recent-watched`)

            setRecentWatched(response.data)
        } catch (err: any) {
            if (err.response) {
                console.log("Status:", err.response.status)
                console.log("Data do erro:", JSON.stringify(err.response.data, null, 2))
            } else if (err.request) {
                // A requisição foi feita, mas não teve resposta
                console.log("Erro na requisição:", err.request)
            } else {
                // Outro erro
                console.log("Erro desconhecido:", err.message)
            }
        }
    }

    async function getGamification() {
        try {
            const response = await api.get(`/users/by-email/${user?.emailAddresses}`)

            setGamification(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getOlympiadsRecents()
            getGamification()
        }, [])
    )

    useEffect(() => {
        if (isLoaded && user && user.primaryEmailAddress?.emailAddress) {
            const name = user.fullName || "Usuário"
            const email = user.primaryEmailAddress.emailAddress
            const avatarUrl = user.imageUrl

            signInWithClerk({ id: user.id, name, email, avatarUrl })
        }

        Toast.show({
            type: 'success',
            text1: `Olá, ${user?.firstName}`,
            text1Style: { fontSize: 18 },
            text2: 'Seja bem vindo ao OlimPath!',
            text2Style: { fontSize: 14 }
        })
    }, [isLoaded, user])

    return (
        <HomeContainer>
            <Header />

            <TodayQuiz navigate={() => navigation.navigate('quiz')} isAnswered={gamification?.alreadyDoneToday} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 32 }}>
                    <TextBase variant='bold' size={24} color={COLORS.gray100}>Desempenho</TextBase>

                    <Gamification>
                        <CardGamification>
                            <MaterialCommunityIcons 
                                name='medal'
                                size={50}
                                color={COLORS.gold}
                            /> 

                            <TextBase color={COLORS.gold100} variant='semiBold' style={{ textAlign: 'center' }} size={20}>{gamification?.rankingPosition}°</TextBase>
                        </CardGamification>

                        <CardGamification>
                            <MaterialCommunityIcons 
                                name='star-circle'
                                size={50}
                                color={COLORS.gold}
                            /> 
                            
                            <TextBase color={COLORS.gold100} variant='semiBold' style={{ textAlign: 'center' }} size={20}>{gamification?.points}</TextBase>
                        </CardGamification>

                        <CardGamification>
                            <MaterialCommunityIcons 
                                name='fire'
                                size={50}
                                color={gamification?.alreadyDoneToday ? COLORS.gold : COLORS.gray400}
                            /> 

                            <TextBase color={COLORS.gold100} variant='semiBold' style={{ textAlign: 'center' }} size={20}>{gamification?.dailyQuizCount}</TextBase>
                        </CardGamification>
                    </Gamification>
                </View>

                <View>
                    <TextBase variant='bold' size={24} color={COLORS.gray100}>Recentes</TextBase>

                    <View style={{ marginTop: 32 }}>
                        {recentWatched.length > 0 ? 
                            recentWatched.map((olympiad) => {
                                const watched = olympiad.watchedVideos
                                const total = olympiad.totalVideos
                                const porcentagem = (watched / total) * 100

                                return (
                                    <View style={{ marginBottom: 24 }} key={olympiad.olympiadId}>
                                        <OlympiadRecent onPress={() => rootNavigation.navigate('Olimpíadas', {
                                            screen: 'olympiadChosen',
                                            params: {
                                                olympiadId: olympiad.olympiadId,
                                            }
                                        })}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                <Image 
                                                    source={olympiadIcons[olympiad.name] ?? opLogo}
                                                    style={{ width: 70, height: 70, borderRadius: 6 }}
                                                />
                                                <TextBase variant='bold' color={COLORS.gray100}>{olympiad.name}</TextBase>
                                            </View>

                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <AnimatedCircularProgress
                                                    size={70}
                                                    width={8}
                                                    fill={porcentagem}
                                                    tintColor={COLORS.purple500}
                                                    backgroundColor="#E0E0E0"
                                                    rotation={0}
                                                    lineCap="round"
                                                >
                                                    {() => (
                                                        <TextBase variant="bold" style={{ textAlign: 'center' }} size={12} color={COLORS.gray100}>
                                                            {`${watched}/${total}`}
                                                        </TextBase>
                                                    )}
                                                </AnimatedCircularProgress>
                                            </View>
                                        </OlympiadRecent>
                                    </View>
                                )
                            })
                        : (
                            <View style={{ backgroundColor: COLORS.gray700, padding: 12, borderRadius: 8 }}>
                                <TextBase color={COLORS.gray100} variant='regular' size={16}>Você ainda não começou nenhuma olimpíada.</TextBase>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </HomeContainer>
    )
}